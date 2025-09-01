/**
 * Perplexity Recipe Search Service
 * Unified recipe search using Perplexity API for better consistency with pricing
 */

export interface PerplexityRecipeSearchRequest {
  query: string;
  country?: string;
  includeIngredients?: string[];
  excludeIngredients?: string[];
  maxResults?: number;
  culturalCuisine?: string;
  dietaryRestrictions?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface RecipeIngredient {
  name: string; // Using 'name' for consistency with pricing API
  amount: number;
  unit: string;
  notes?: string;
}

export interface RecipeInstruction {
  step: number;
  text: string;
}

export interface PerplexityRecipe {
  title: string;
  description: string;
  cuisine: string;
  culturalOrigin: string[];
  ingredients: RecipeIngredient[];
  instructions: RecipeInstruction[];
  nutritionalInfo?: {
    calories: number;
    protein_g: number;
    fat_g: number;
    carbs_g: number;
  };
  metadata: {
    sourceUrl: string;
    servings: number;
    totalTimeMinutes: number;
    difficulty: 'easy' | 'medium' | 'hard';
  };
  tags: string[];
}

export interface PerplexityRecipeSearchResponse {
  recipes: PerplexityRecipe[];
  success: boolean;
  error?: string;
  sources: string[];
}

class PerplexityRecipeSearchService {
  private apiKey: string;
  private baseURL = 'https://api.perplexity.ai/chat/completions';

  constructor() {
    this.apiKey = process.env.PERPLEXITY_API_KEY || '';
    if (!this.apiKey) {
      console.warn('Perplexity API key not found. Recipe search will be unavailable.');
    }
  }

  /**
   * Search for recipes using Perplexity AI
   */
  async searchRecipes(request: PerplexityRecipeSearchRequest): Promise<PerplexityRecipeSearchResponse> {
    if (!this.apiKey) {
      return {
        recipes: [],
        success: false,
        error: 'Perplexity API key not configured',
        sources: []
      };
    }

    try {
      const prompt = this.buildRecipeSearchPrompt(request);
      
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'sonar',
          messages: [
            {
              role: 'system',
              content: 'You are a recipe search assistant. Always return ONLY valid JSON in the exact format requested. Do not include any explanatory text, reasoning, or commentary outside the JSON.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 3000,
          temperature: 0.1,
          return_citations: true,
          search_domain_filter: [
            'allrecipes.com', 'food.com', 'epicurious.com', 'simplyrecipes.com',
            'seriouseats.com', 'bonappetit.com', 'foodnetwork.com', 'tasteofhome.com',
            'delish.com', 'foodandwine.com'
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`Perplexity API error: ${response.status}`);
      }

      const result = await response.json();
      const content = result.choices[0]?.message?.content;
      
      console.log('🤖 Perplexity recipe search response length:', content?.length || 0);
      console.log('🤖 First 1000 chars:', content?.substring(0, 1000));
      
      if (!content) {
        throw new Error('No content received from Perplexity API');
      }

      // Parse the JSON response
      const recipes = this.parseRecipeSearchResponse(content);
      console.log('📊 Parsed recipes count:', recipes.length);
      
      return {
        recipes,
        success: true,
        sources: result.citations || []
      };

    } catch (error) {
      console.error('Perplexity recipe search error:', error);
      
      return {
        recipes: [],
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        sources: []
      };
    }
  }

  /**
   * Build a structured prompt for recipe search
   */
  private buildRecipeSearchPrompt(request: PerplexityRecipeSearchRequest): string {
    const { query, country, includeIngredients, excludeIngredients, maxResults, culturalCuisine, dietaryRestrictions, difficulty } = request;
    
    let searchCriteria = `Search for "${query}" recipes`;
    
    if (culturalCuisine) {
      searchCriteria += ` from ${culturalCuisine} cuisine`;
    }
    
    if (country && country !== 'United States') {
      searchCriteria += ` popular in ${country}`;
    }

    let filters = '';
    if (includeIngredients && includeIngredients.length > 0) {
      filters += `\n- MUST include: ${includeIngredients.join(', ')}`;
    }
    if (excludeIngredients && excludeIngredients.length > 0) {
      filters += `\n- MUST NOT include: ${excludeIngredients.join(', ')}`;
    }
    if (dietaryRestrictions && dietaryRestrictions.length > 0) {
      filters += `\n- Dietary restrictions: ${dietaryRestrictions.join(', ')}`;
    }
    if (difficulty) {
      filters += `\n- Difficulty level: ${difficulty}`;
    }

    return `${searchCriteria}

Find ${maxResults || 3} high-quality recipes from reputable cooking websites.${filters}

For each recipe, provide:
1. Complete ingredient list with specific amounts and units
2. Step-by-step instructions
3. Nutritional information (if available)
4. Cultural origin and cuisine type
5. Cooking time and difficulty
6. Source URL

CRITICAL REQUIREMENTS:
- Use "name" field for ingredients (not "item")
- Include precise amounts as numbers (e.g., 2, not "2" as string)
- Include proper units (cups, tablespoons, pounds, etc.)
- Ensure all ingredients have amounts specified
- If amount is unclear, estimate reasonably (e.g., "1 onion" = 1 each)

Format response as JSON:
{
  "recipes": [
    {
      "title": "Recipe Name",
      "description": "Brief description of the dish",
      "cuisine": "Cuisine type",
      "culturalOrigin": ["Culture 1", "Culture 2"],
      "ingredients": [
        {
          "name": "ingredient name",
          "amount": 2.5,
          "unit": "cups",
          "notes": "optional preparation notes"
        }
      ],
      "instructions": [
        {
          "step": 1,
          "text": "Detailed instruction text"
        }
      ],
      "nutritionalInfo": {
        "calories": 450,
        "protein_g": 25,
        "fat_g": 15,
        "carbs_g": 35
      },
      "metadata": {
        "sourceUrl": "https://example.com/recipe",
        "servings": 4,
        "totalTimeMinutes": 60,
        "difficulty": "medium"
      },
      "tags": ["dinner", "healthy", "quick"]
    }
  ]
}

Return ONLY the JSON, no additional text.`;
  }

  /**
   * Parse Perplexity's recipe search response
   */
  private parseRecipeSearchResponse(content: string): PerplexityRecipe[] {
    try {
      // Clean the content
      const cleanedContent = content.trim();
      
      // Remove any code fences
      const jsonContent = cleanedContent
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/```\s*$/i, '');

      const parsed = JSON.parse(jsonContent);
      
      if (parsed.recipes && Array.isArray(parsed.recipes)) {
        return parsed.recipes.map((recipe: any) => this.normalizeRecipe(recipe));
      }

      throw new Error('Invalid recipe response structure - no recipes array found');
    } catch (error) {
      console.error('❌ Error parsing recipe search response:', error);
      return [];
    }
  }

  /**
   * Normalize recipe data to ensure consistency
   */
  private normalizeRecipe(recipe: any): PerplexityRecipe {
    const ingredients = (recipe.ingredients || []).map((ing: any, index: number) => ({
      name: ing.name || ing.item || `Unknown ingredient ${index + 1}`,
      amount: typeof ing.amount === 'number' ? ing.amount : (parseFloat(ing.amount) || 1),
      unit: ing.unit || 'unit',
      notes: ing.notes || ''
    }));
    
    return {
      title: recipe.title || 'Untitled Recipe',
      description: recipe.description || '',
      cuisine: recipe.cuisine || 'International',
      culturalOrigin: Array.isArray(recipe.culturalOrigin) ? recipe.culturalOrigin : [recipe.cuisine || 'International'],
      ingredients,
      instructions: (recipe.instructions || []).map((inst: any, index: number) => ({
        step: inst.step || (index + 1),
        text: inst.text || inst.instruction || ''
      })),
      nutritionalInfo: recipe.nutritionalInfo ? {
        calories: recipe.nutritionalInfo.calories || 0,
        protein_g: recipe.nutritionalInfo.protein_g || 0,
        fat_g: recipe.nutritionalInfo.fat_g || 0,
        carbs_g: recipe.nutritionalInfo.carbs_g || 0
      } : undefined,
      metadata: {
        sourceUrl: recipe.metadata?.sourceUrl || recipe.source || '',
        servings: recipe.metadata?.servings || recipe.servings || 4,
        totalTimeMinutes: recipe.metadata?.totalTimeMinutes || recipe.total_time_minutes || 30,
        difficulty: recipe.metadata?.difficulty || recipe.difficulty || 'medium'
      },
      tags: Array.isArray(recipe.tags) ? recipe.tags : []
    };
  }

  /**
   * Health check for Perplexity API
   */
  async healthCheck(): Promise<boolean> {
    if (!this.apiKey) return false;

    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'sonar',
          messages: [
            {
              role: 'user',
              content: 'Hello, this is a health check. Please respond with "OK".'
            }
          ],
          max_tokens: 10
        })
      });

      return response.ok;
    } catch {
      return false;
    }
  }
}

export const perplexityRecipeSearchService = new PerplexityRecipeSearchService();