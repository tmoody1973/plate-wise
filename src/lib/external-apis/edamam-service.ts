/**
 * Edamam API Integration
 * Provides nutritional analysis, recipe parsing, and food database access
 */

// Types for Edamam API integration
export interface EdamamNutritionAnalysis {
  uri: string;
  yield: number;
  calories: number;
  totalWeight: number;
  dietLabels: string[];
  healthLabels: string[];
  cautions: string[];
  totalNutrients: Record<string, NutrientInfo>;
  totalDaily: Record<string, NutrientInfo>;
  ingredients: ParsedIngredient[];
  totalNutrientsKCal: Record<string, NutrientInfo>;
}

export interface NutrientInfo {
  label: string;
  quantity: number;
  unit: string;
}

export interface ParsedIngredient {
  text: string;
  parsed: Array<{
    quantity: number;
    measure: string;
    foodMatch: string;
    food: string;
    foodId: string;
    weight: number;
    retainedWeight: number;
    nutrients: Record<string, NutrientInfo>;
    measureURI: string;
    status: string;
  }>;
}

export interface EdamamRecipe {
  uri: string;
  label: string;
  image: string;
  images: {
    THUMBNAIL: ImageInfo;
    SMALL: ImageInfo;
    REGULAR: ImageInfo;
    LARGE?: ImageInfo;
  };
  source: string;
  url: string;
  shareAs: string;
  yield: number;
  dietLabels: string[];
  healthLabels: string[];
  cautions: string[];
  ingredientLines: string[];
  ingredients: EdamamIngredient[];
  calories: number;
  totalWeight: number;
  totalTime: number;
  cuisineType: string[];
  mealType: string[];
  dishType: string[];
  totalNutrients: Record<string, NutrientInfo>;
  totalDaily: Record<string, NutrientInfo>;
  digest: DigestInfo[];
}

export interface ImageInfo {
  url: string;
  width: number;
  height: number;
}

export interface EdamamIngredient {
  text: string;
  quantity: number;
  measure: string;
  food: string;
  weight: number;
  foodCategory: string;
  foodId: string;
  image: string;
}

export interface DigestInfo {
  label: string;
  tag: string;
  schemaOrgTag: string;
  total: number;
  hasRDI: boolean;
  daily: number;
  unit: string;
  sub?: DigestInfo[];
}

export interface FoodSearchResult {
  text: string;
  parsed: ParsedFood[];
  hints: FoodHint[];
  _links: {
    next?: {
      href: string;
      title: string;
    };
  };
}

export interface ParsedFood {
  food: FoodInfo;
  quantity: number;
  measure: MeasureInfo;
}

export interface FoodHint {
  food: FoodInfo;
  measures: MeasureInfo[];
}

export interface FoodInfo {
  foodId: string;
  label: string;
  knownAs: string;
  nutrients: Record<string, number>;
  category: string;
  categoryLabel: string;
  image?: string;
  servingsPerContainer?: number;
}

export interface MeasureInfo {
  uri: string;
  label: string;
  weight: number;
  qualified?: Array<{
    qualifiers: Array<{
      uri: string;
      label: string;
    }>;
    weight: number;
  }>;
}

export interface RecipeSearchParams {
  q?: string;
  app_id?: string;
  app_key?: string;
  from?: number;
  to?: number;
  ingr?: string;
  diet?: string[];
  health?: string[];
  cuisineType?: string[];
  mealType?: string[];
  dishType?: string[];
  calories?: string;
  time?: string;
  imageSize?: 'THUMBNAIL' | 'SMALL' | 'REGULAR' | 'LARGE';
  random?: boolean;
  field?: string[];
}

export interface NutritionAnalysisRequest {
  title?: string;
  ingr: string[];
  summary?: string;
  yield?: number;
  time?: number;
  img?: string;
  prep?: string[];
}

/**
 * Edamam API Service
 * Handles nutrition analysis, recipe search, and food database queries
 */
export class EdamamService {
  private recipeBaseURL = 'https://api.edamam.com/api/recipes/v2';
  private nutritionBaseURL = 'https://api.edamam.com/api/nutrition-details';
  private foodBaseURL = 'https://api.edamam.com/api/food-database/v2';
  
  private recipeAppId: string;
  private recipeAppKey: string;
  private nutritionAppId: string;
  private nutritionAppKey: string;
  private foodAppId: string;
  private foodAppKey: string;

  private requestCount = 0;
  private dailyLimit = 1000; // Typical API limit
  private lastResetDate = new Date().toDateString();

  constructor() {
    this.recipeAppId = process.env.EDAMAM_RECIPE_APP_ID || '';
    this.recipeAppKey = process.env.EDAMAM_RECIPE_APP_KEY || '';
    this.nutritionAppId = process.env.EDAMAM_NUTRITION_APP_ID || '';
    this.nutritionAppKey = process.env.EDAMAM_NUTRITION_APP_KEY || '';
    this.foodAppId = process.env.EDAMAM_FOOD_APP_ID || '';
    this.foodAppKey = process.env.EDAMAM_FOOD_APP_KEY || '';
    
    if (!this.recipeAppId || !this.recipeAppKey) {
      console.warn('Edamam Recipe API credentials not configured');
    }
    
    if (!this.nutritionAppId || !this.nutritionAppKey) {
      console.warn('Edamam Nutrition API credentials not configured');
    }
    
    if (!this.foodAppId || !this.foodAppKey) {
      console.warn('Edamam Food Database API credentials not configured');
    }
  }

  /**
   * Check rate limiting before making requests
   */
  private checkRateLimit(): void {
    const today = new Date().toDateString();
    
    if (today !== this.lastResetDate) {
      this.requestCount = 0;
      this.lastResetDate = today;
    }
    
    if (this.requestCount >= this.dailyLimit) {
      throw new Error('Daily API limit reached for Edamam');
    }
    
    this.requestCount++;
  }

  /**
   * Make authenticated API request
   */
  private async makeRequest<T>(
    url: string,
    appId: string,
    appKey: string,
    params: Record<string, any> = {},
    method: 'GET' | 'POST' = 'GET',
    body?: any
  ): Promise<T> {
    this.checkRateLimit();

    const requestUrl = new URL(url);
    requestUrl.searchParams.append('app_id', appId);
    requestUrl.searchParams.append('app_key', appKey);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(v => requestUrl.searchParams.append(key, v.toString()));
        } else {
          requestUrl.searchParams.append(key, value.toString());
        }
      }
    });

    const requestOptions: RequestInit = {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    };

    if (body && method === 'POST') {
      requestOptions.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(requestUrl.toString(), requestOptions);
      
      if (!response.ok) {
        throw new Error(`Edamam API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Edamam API request failed for ${url}:`, error);
      throw error;
    }
  }

  /**
   * Search for recipes with comprehensive filtering
   */
  async searchRecipes(params: RecipeSearchParams): Promise<{ hits: Array<{ recipe: EdamamRecipe }> }> {
    if (!this.recipeAppId || !this.recipeAppKey) {
      throw new Error('Edamam Recipe API credentials not configured');
    }

    try {
      const searchParams = {
        type: 'public',
        ...params,
        from: params.from || 0,
        to: params.to || 20,
      };

      return await this.makeRequest<{ hits: Array<{ recipe: EdamamRecipe }> }>(
        this.recipeBaseURL,
        this.recipeAppId,
        this.recipeAppKey,
        searchParams
      );
    } catch (error) {
      console.error('Edamam recipe search failed:', error);
      return { hits: [] };
    }
  }

  /**
   * Get detailed nutrition analysis for ingredients
   */
  async analyzeNutrition(request: NutritionAnalysisRequest): Promise<EdamamNutritionAnalysis | null> {
    if (!this.nutritionAppId || !this.nutritionAppKey) {
      throw new Error('Edamam Nutrition API credentials not configured');
    }

    try {
      return await this.makeRequest<EdamamNutritionAnalysis>(
        this.nutritionBaseURL,
        this.nutritionAppId,
        this.nutritionAppKey,
        {},
        'POST',
        request
      );
    } catch (error) {
      console.error('Edamam nutrition analysis failed:', error);
      return null;
    }
  }

  /**
   * Search for food items in the database
   */
  async searchFood(
    query: string,
    category?: string,
    nutrients?: string[]
  ): Promise<FoodSearchResult | null> {
    if (!this.foodAppId || !this.foodAppKey) {
      throw new Error('Edamam Food Database API credentials not configured');
    }

    try {
      const params: Record<string, any> = {
        ingr: query,
      };

      if (category) {
        params.category = category;
      }

      if (nutrients && nutrients.length > 0) {
        params.nutrients = nutrients;
      }

      return await this.makeRequest<FoodSearchResult>(
        `${this.foodBaseURL}/parser`,
        this.foodAppId,
        this.foodAppKey,
        params
      );
    } catch (error) {
      console.error('Edamam food search failed:', error);
      return null;
    }
  }

  /**
   * Get nutrition data for specific food item
   */
  async getFoodNutrition(
    foodId: string,
    measureURI: string,
    quantity: number = 1
  ): Promise<EdamamNutritionAnalysis | null> {
    if (!this.foodAppId || !this.foodAppKey) {
      throw new Error('Edamam Food Database API credentials not configured');
    }

    try {
      const request = {
        ingredients: [
          {
            quantity,
            measureURI,
            foodId,
          },
        ],
      };

      return await this.makeRequest<EdamamNutritionAnalysis>(
        `${this.foodBaseURL}/nutrients`,
        this.foodAppId,
        this.foodAppKey,
        {},
        'POST',
        request
      );
    } catch (error) {
      console.error('Edamam food nutrition analysis failed:', error);
      return null;
    }
  }

  /**
   * Search recipes by cuisine with cultural filtering
   */
  async searchByCuisine(
    cuisine: string,
    dietaryRestrictions: string[] = [],
    healthLabels: string[] = [],
    maxTime?: number,
    maxResults: number = 20
  ): Promise<EdamamRecipe[]> {
    const params: RecipeSearchParams = {
      cuisineType: [cuisine],
      diet: dietaryRestrictions,
      health: healthLabels,
      to: maxResults,
    };

    if (maxTime) {
      params.time = `1-${maxTime}`;
    }

    try {
      const result = await this.searchRecipes(params);
      return result.hits.map(hit => hit.recipe);
    } catch (error) {
      console.error(`Failed to search recipes for cuisine ${cuisine}:`, error);
      return [];
    }
  }

  /**
   * Analyze recipe for cultural authenticity and nutrition
   */
  async analyzeRecipeComprehensively(
    recipeName: string,
    ingredients: string[],
    servings: number = 4,
    culturalOrigin?: string
  ): Promise<{
    nutrition: EdamamNutritionAnalysis | null;
    culturalScore: number;
    healthScore: number;
    recommendations: string[];
  }> {
    // Get nutrition analysis
    const nutrition = await this.analyzeNutrition({
      title: recipeName,
      ingr: ingredients,
      yield: servings,
    });

    // Calculate cultural authenticity score
    const culturalScore = culturalOrigin 
      ? await this.calculateCulturalScore(ingredients, culturalOrigin)
      : 0;

    // Calculate health score based on nutrition
    const healthScore = nutrition ? this.calculateHealthScore(nutrition) : 0;

    // Generate recommendations
    const recommendations = this.generateRecommendations(nutrition, culturalScore, healthScore);

    return {
      nutrition,
      culturalScore,
      healthScore,
      recommendations,
    };
  }

  /**
   * Parse recipe text and extract structured data
   */
  async parseRecipeText(recipeText: string): Promise<{
    ingredients: string[];
    estimatedNutrition: EdamamNutritionAnalysis | null;
  }> {
    // Simple ingredient extraction (would need more sophisticated NLP)
    const lines = recipeText.split('\n');
    const ingredients = lines
      .filter(line => this.looksLikeIngredient(line))
      .map(line => line.trim());

    let estimatedNutrition = null;
    if (ingredients.length > 0) {
      estimatedNutrition = await this.analyzeNutrition({
        title: 'Parsed Recipe',
        ingr: ingredients,
      });
    }

    return {
      ingredients,
      estimatedNutrition,
    };
  }

  /**
   * Get nutritional recommendations based on dietary goals
   */
  async getNutritionalRecommendations(
    currentNutrition: EdamamNutritionAnalysis,
    goals: {
      calories?: number;
      protein?: number;
      carbs?: number;
      fat?: number;
      fiber?: number;
      sodium?: number;
    }
  ): Promise<string[]> {
    const recommendations: string[] = [];

    // Calorie recommendations
    if (goals.calories && currentNutrition.calories > goals.calories * 1.1) {
      recommendations.push('Consider reducing portion sizes or using lower-calorie ingredients');
    } else if (goals.calories && currentNutrition.calories < goals.calories * 0.9) {
      recommendations.push('Consider adding healthy fats or complex carbohydrates to meet calorie goals');
    }

    // Protein recommendations
    const protein = currentNutrition.totalNutrients.PROCNT?.quantity || 0;
    if (goals.protein && protein < goals.protein * 0.8) {
      recommendations.push('Add lean protein sources like beans, fish, or poultry');
    }

    // Fiber recommendations
    const fiber = currentNutrition.totalNutrients.FIBTG?.quantity || 0;
    if (goals.fiber && fiber < goals.fiber * 0.7) {
      recommendations.push('Include more vegetables, fruits, or whole grains for fiber');
    }

    // Sodium recommendations
    const sodium = currentNutrition.totalNutrients.NA?.quantity || 0;
    if (goals.sodium && sodium > goals.sodium * 1.2) {
      recommendations.push('Reduce salt and use herbs and spices for flavor instead');
    }

    return recommendations;
  }

  /**
   * Calculate cultural authenticity score based on ingredients
   */
  private async calculateCulturalScore(ingredients: string[], culturalOrigin: string): Promise<number> {
    let score = 0;
    const traditionalIngredients = this.getTraditionalIngredients(culturalOrigin);
    
    for (const ingredient of ingredients) {
      const isTraditional = traditionalIngredients.some(traditional =>
        ingredient.toLowerCase().includes(traditional.toLowerCase())
      );
      
      if (isTraditional) {
        score += 10;
      }
    }

    // Normalize score to 0-100 range
    return Math.min(100, score);
  }

  /**
   * Calculate health score based on nutrition data
   */
  private calculateHealthScore(nutrition: EdamamNutritionAnalysis): number {
    let score = 50; // Base score

    // Positive factors
    const fiber = nutrition.totalNutrients.FIBTG?.quantity || 0;
    const protein = nutrition.totalNutrients.PROCNT?.quantity || 0;
    const vitaminC = nutrition.totalNutrients.VITC?.quantity || 0;
    const calcium = nutrition.totalNutrients.CA?.quantity || 0;

    score += Math.min(20, fiber * 2); // Up to 20 points for fiber
    score += Math.min(15, protein * 0.5); // Up to 15 points for protein
    score += Math.min(10, vitaminC * 0.1); // Up to 10 points for vitamin C
    score += Math.min(5, calcium * 0.01); // Up to 5 points for calcium

    // Negative factors
    const saturatedFat = nutrition.totalNutrients.FASAT?.quantity || 0;
    const sodium = nutrition.totalNutrients.NA?.quantity || 0;
    const sugar = nutrition.totalNutrients.SUGAR?.quantity || 0;

    score -= Math.min(15, saturatedFat * 0.5); // Penalty for saturated fat
    score -= Math.min(20, sodium * 0.001); // Penalty for sodium
    score -= Math.min(10, sugar * 0.2); // Penalty for sugar

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Generate recommendations based on analysis
   */
  private generateRecommendations(
    nutrition: EdamamNutritionAnalysis | null,
    culturalScore: number,
    healthScore: number
  ): string[] {
    const recommendations: string[] = [];

    if (culturalScore < 50) {
      recommendations.push('Consider using more traditional ingredients to increase cultural authenticity');
    }

    if (healthScore < 60) {
      recommendations.push('Add more vegetables and reduce processed ingredients for better nutrition');
    }

    if (nutrition) {
      const sodium = nutrition.totalNutrients.NA?.quantity || 0;
      if (sodium > 2300) { // Daily recommended limit
        recommendations.push('This recipe is high in sodium. Consider reducing salt or using herbs for flavor');
      }

      const fiber = nutrition.totalNutrients.FIBTG?.quantity || 0;
      if (fiber < 5) {
        recommendations.push('Add whole grains or vegetables to increase fiber content');
      }
    }

    return recommendations;
  }

  /**
   * Check if a line looks like an ingredient
   */
  private looksLikeIngredient(line: string): boolean {
    const ingredientPatterns = [
      /^\d+/,  // Starts with number
      /cup|cups|tablespoon|tablespoons|teaspoon|teaspoons|pound|pounds|ounce|ounces/i,
      /\d+\s*(cup|tbsp|tsp|lb|oz|g|kg|ml|l)/i,
    ];

    return ingredientPatterns.some(pattern => pattern.test(line.trim()));
  }

  /**
   * Get traditional ingredients for a cuisine (simplified)
   */
  private getTraditionalIngredients(cuisine: string): string[] {
    const traditionalIngredients: Record<string, string[]> = {
      'italian': ['olive oil', 'tomato', 'basil', 'parmesan', 'mozzarella', 'garlic', 'oregano'],
      'mexican': ['cumin', 'chili', 'lime', 'cilantro', 'avocado', 'corn', 'beans'],
      'indian': ['turmeric', 'cumin', 'coriander', 'garam masala', 'ginger', 'garlic', 'curry'],
      'chinese': ['soy sauce', 'ginger', 'garlic', 'sesame oil', 'rice wine', 'scallion'],
      'japanese': ['soy sauce', 'miso', 'sake', 'mirin', 'nori', 'wasabi', 'dashi'],
      'thai': ['fish sauce', 'lime', 'chili', 'coconut milk', 'lemongrass', 'basil'],
      'french': ['butter', 'wine', 'herbs', 'cream', 'shallot', 'thyme'],
      'mediterranean': ['olive oil', 'lemon', 'herbs', 'feta', 'olives', 'tomato'],
    };

    return traditionalIngredients[cuisine.toLowerCase()] || [];
  }

  /**
   * Get API usage statistics
   */
  getUsageStats(): { requestCount: number; dailyLimit: number; remaining: number } {
    return {
      requestCount: this.requestCount,
      dailyLimit: this.dailyLimit,
      remaining: this.dailyLimit - this.requestCount,
    };
  }
}

/**
 * Singleton instance of EdamamService
 */
export const edamamService = new EdamamService();