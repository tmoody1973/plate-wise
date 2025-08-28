/**
 * Spoonacular API Integration
 * Provides comprehensive recipe database access, search, and analysis
 */

// Types for Spoonacular API integration
export interface SpoonacularRecipe {
  id: number;
  title: string;
  summary: string;
  image: string;
  imageType: string;
  servings: number;
  readyInMinutes: number;
  preparationMinutes?: number;
  cookingMinutes?: number;
  aggregateLikes: number;
  healthScore: number;
  spoonacularScore: number;
  pricePerServing: number;
  cheap: boolean;
  creditsText: string;
  sourceName: string;
  sourceUrl: string;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  occasions: string[];
  instructions: string;
  analyzedInstructions: AnalyzedInstruction[];
  extendedIngredients: ExtendedIngredient[];
  nutrition?: NutritionData;
  winePairing?: WinePairing;
  taste?: TasteProfile;
}

export interface ExtendedIngredient {
  id: number;
  aisle: string;
  image: string;
  consistency: string;
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: string[];
  measures: {
    us: Measure;
    metric: Measure;
  };
}

export interface Measure {
  amount: number;
  unitShort: string;
  unitLong: string;
}

export interface AnalyzedInstruction {
  name: string;
  steps: InstructionStep[];
}

export interface InstructionStep {
  number: number;
  step: string;
  ingredients: IngredientReference[];
  equipment: EquipmentReference[];
  length?: {
    number: number;
    unit: string;
  };
}

export interface IngredientReference {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}

export interface EquipmentReference {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}

export interface NutritionData {
  nutrients: Nutrient[];
  properties: NutritionProperty[];
  flavonoids: Nutrient[];
  ingredients: IngredientNutrition[];
  caloricBreakdown: CaloricBreakdown;
  weightPerServing: WeightPerServing;
}

export interface Nutrient {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
}

export interface NutritionProperty {
  name: string;
  amount: number;
  unit: string;
}

export interface IngredientNutrition {
  id: number;
  name: string;
  amount: number;
  unit: string;
  nutrients: Nutrient[];
}

export interface CaloricBreakdown {
  percentProtein: number;
  percentFat: number;
  percentCarbs: number;
}

export interface WeightPerServing {
  amount: number;
  unit: string;
}

export interface WinePairing {
  pairedWines: string[];
  pairingText: string;
  productMatches: WineProduct[];
}

export interface WineProduct {
  id: number;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  averageRating: number;
  ratingCount: number;
  score: number;
  link: string;
}

export interface TasteProfile {
  sweetness: number;
  saltiness: number;
  sourness: number;
  bitterness: number;
  savoriness: number;
  fattiness: number;
  spiciness: number;
}

export interface RecipeSearchParams {
  query?: string;
  cuisine?: string;
  diet?: string;
  intolerances?: string;
  equipment?: string;
  includeIngredients?: string;
  excludeIngredients?: string;
  type?: string;
  instructionsRequired?: boolean;
  fillIngredients?: boolean;
  addRecipeInformation?: boolean;
  addRecipeNutrition?: boolean;
  author?: string;
  tags?: string;
  recipeBoxId?: number;
  titleMatch?: string;
  maxReadyTime?: number;
  minServings?: number;
  maxServings?: number;
  minCalories?: number;
  maxCalories?: number;
  minCarbs?: number;
  maxCarbs?: number;
  minProtein?: number;
  maxProtein?: number;
  minFat?: number;
  maxFat?: number;
  minAlcohol?: number;
  maxAlcohol?: number;
  minCaffeine?: number;
  maxCaffeine?: number;
  minCopper?: number;
  maxCopper?: number;
  minCalcium?: number;
  maxCalcium?: number;
  minCholine?: number;
  maxCholine?: number;
  minCholesterol?: number;
  maxCholesterol?: number;
  minFluoride?: number;
  maxFluoride?: number;
  minSaturatedFat?: number;
  maxSaturatedFat?: number;
  minVitaminA?: number;
  maxVitaminA?: number;
  minVitaminC?: number;
  maxVitaminC?: number;
  minVitaminD?: number;
  maxVitaminD?: number;
  minVitaminE?: number;
  maxVitaminE?: number;
  minVitaminK?: number;
  maxVitaminK?: number;
  minVitaminB1?: number;
  maxVitaminB1?: number;
  minVitaminB2?: number;
  maxVitaminB2?: number;
  minVitaminB5?: number;
  maxVitaminB5?: number;
  minVitaminB3?: number;
  maxVitaminB3?: number;
  minVitaminB6?: number;
  maxVitaminB6?: number;
  minVitaminB12?: number;
  maxVitaminB12?: number;
  minFiber?: number;
  maxFiber?: number;
  minFolate?: number;
  maxFolate?: number;
  minFolicAcid?: number;
  maxFolicAcid?: number;
  minIodine?: number;
  maxIodine?: number;
  minIron?: number;
  maxIron?: number;
  minMagnesium?: number;
  maxMagnesium?: number;
  minManganese?: number;
  maxManganese?: number;
  minPhosphorus?: number;
  maxPhosphorus?: number;
  minPotassium?: number;
  maxPotassium?: number;
  minSelenium?: number;
  maxSelenium?: number;
  minSodium?: number;
  maxSodium?: number;
  minSugar?: number;
  maxSugar?: number;
  minZinc?: number;
  maxZinc?: number;
  offset?: number;
  number?: number;
  limitLicense?: boolean;
  ranking?: number;
  ignorePantry?: boolean;
}

export interface RecipeSearchResult {
  results: SpoonacularRecipe[];
  offset: number;
  number: number;
  totalResults: number;
}

export interface SimilarRecipe {
  id: number;
  title: string;
  imageType: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
}

export interface RecipeInformation extends SpoonacularRecipe {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  sustainable: boolean;
  lowFodmap: boolean;
  weightWatcherSmartPoints: number;
  gaps: string;
  preparationMinutes: number;
  cookingMinutes: number;
  aggregateLikes: number;
  healthScore: number;
  creditsText: string;
  license: string;
  sourceName: string;
  pricePerServing: number;
  extendedIngredients: ExtendedIngredient[];
  id: number;
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  image: string;
  imageType: string;
  summary: string;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  occasions: string[];
  instructions: string;
  analyzedInstructions: AnalyzedInstruction[];
  originalId?: number;
  spoonacularSourceUrl: string;
}

/**
 * Spoonacular API Service
 * Handles recipe search, detailed recipe information, and nutrition analysis
 */
export class SpoonacularService {
  private baseURL = 'https://api.spoonacular.com';
  private apiKey: string;
  private requestCount = 0;
  private dailyLimit = 150; // Free tier limit
  private lastResetDate = new Date().toDateString();

  constructor() {
    this.apiKey = process.env.SPOONACULAR_API_KEY || '';
    
    if (!this.apiKey) {
      throw new Error('Spoonacular API key not configured');
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
      throw new Error('Daily API limit reached for Spoonacular');
    }
    
    this.requestCount++;
  }

  /**
   * Make authenticated API request
   */
  private async makeRequest<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    this.checkRateLimit();

    const url = new URL(`${this.baseURL}${endpoint}`);
    url.searchParams.append('apiKey', this.apiKey);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value.toString());
      }
    });

    try {
      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`Spoonacular API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Spoonacular API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Search for recipes with comprehensive filtering
   */
  async searchRecipes(params: RecipeSearchParams): Promise<RecipeSearchResult> {
    const endpoint = '/recipes/complexSearch';
    
    try {
      const result = await this.makeRequest<RecipeSearchResult>(endpoint, {
        ...params,
        addRecipeInformation: true,
        fillIngredients: true,
        number: params.number || 12,
      });

      return {
        ...result,
        results: result.results.map(recipe => this.normalizeRecipe(recipe)),
      };
    } catch (error) {
      console.error('Recipe search failed:', error);
      return {
        results: [],
        offset: 0,
        number: 0,
        totalResults: 0,
      };
    }
  }

  /**
   * Get detailed recipe information by ID
   */
  async getRecipeInformation(
    recipeId: number,
    includeNutrition: boolean = true
  ): Promise<RecipeInformation | null> {
    const endpoint = `/recipes/${recipeId}/information`;
    
    try {
      const recipe = await this.makeRequest<RecipeInformation>(endpoint, {
        includeNutrition,
      });

      return this.normalizeRecipe(recipe) as RecipeInformation;
    } catch (error) {
      console.error(`Failed to get recipe information for ${recipeId}:`, error);
      return null;
    }
  }

  /**
   * Get similar recipes
   */
  async getSimilarRecipes(recipeId: number, number: number = 3): Promise<SimilarRecipe[]> {
    const endpoint = `/recipes/${recipeId}/similar`;
    
    try {
      return await this.makeRequest<SimilarRecipe[]>(endpoint, { number });
    } catch (error) {
      console.error(`Failed to get similar recipes for ${recipeId}:`, error);
      return [];
    }
  }

  /**
   * Search recipes by ingredients
   */
  async searchByIngredients(
    ingredients: string[],
    number: number = 12,
    ranking: number = 1,
    ignorePantry: boolean = true
  ): Promise<SpoonacularRecipe[]> {
    const endpoint = '/recipes/findByIngredients';
    
    try {
      const results = await this.makeRequest<any[]>(endpoint, {
        ingredients: ingredients.join(','),
        number,
        ranking,
        ignorePantry,
      });

      return results.map(recipe => this.normalizeRecipe(recipe));
    } catch (error) {
      console.error('Ingredient-based search failed:', error);
      return [];
    }
  }

  /**
   * Search recipes by cuisine type with cultural filtering
   */
  async searchByCuisine(
    cuisine: string,
    filters: Partial<RecipeSearchParams> = {},
    number: number = 12
  ): Promise<SpoonacularRecipe[]> {
    const searchParams: RecipeSearchParams = {
      cuisine,
      number,
      addRecipeInformation: true,
      fillIngredients: true,
      ...filters,
    };

    const result = await this.searchRecipes(searchParams);
    return result.results;
  }

  /**
   * Get random recipes with filters
   */
  async getRandomRecipes(
    limitLicense: boolean = true,
    tags?: string,
    number: number = 1
  ): Promise<SpoonacularRecipe[]> {
    const endpoint = '/recipes/random';
    
    try {
      const result = await this.makeRequest<{ recipes: SpoonacularRecipe[] }>(endpoint, {
        limitLicense,
        tags,
        number,
      });

      return result.recipes.map(recipe => this.normalizeRecipe(recipe));
    } catch (error) {
      console.error('Random recipe fetch failed:', error);
      return [];
    }
  }

  /**
   * Analyze recipe nutrition
   */
  async analyzeRecipeNutrition(
    ingredients: string[],
    servings: number = 1
  ): Promise<NutritionData | null> {
    const endpoint = '/recipes/analyzeInstructions';
    
    try {
      return await this.makeRequest<NutritionData>(endpoint, {
        ingredients: ingredients.join('\n'),
        servings,
      });
    } catch (error) {
      console.error('Nutrition analysis failed:', error);
      return null;
    }
  }

  /**
   * Get recipe price breakdown
   */
  async getRecipePriceBreakdown(recipeId: number): Promise<any> {
    const endpoint = `/recipes/${recipeId}/priceBreakdownWidget.json`;
    
    try {
      return await this.makeRequest<any>(endpoint);
    } catch (error) {
      console.error(`Failed to get price breakdown for recipe ${recipeId}:`, error);
      return null;
    }
  }

  /**
   * Search for recipes with cultural authenticity scoring
   */
  async searchCulturalRecipes(
    culturalCuisines: string[],
    dietaryRestrictions: string[] = [],
    maxReadyTime?: number,
    number: number = 12
  ): Promise<Array<SpoonacularRecipe & { culturalScore: number }>> {
    const recipes: Array<SpoonacularRecipe & { culturalScore: number }> = [];

    for (const cuisine of culturalCuisines) {
      try {
        const cuisineRecipes = await this.searchByCuisine(cuisine, {
          diet: dietaryRestrictions.join(','),
          maxReadyTime,
          number: Math.ceil(number / culturalCuisines.length),
        });

        const scoredRecipes = cuisineRecipes.map(recipe => ({
          ...recipe,
          culturalScore: this.calculateCulturalScore(recipe, cuisine),
        }));

        recipes.push(...scoredRecipes);
      } catch (error) {
        console.error(`Failed to search recipes for cuisine ${cuisine}:`, error);
      }
    }

    // Sort by cultural score and return top results
    return recipes
      .sort((a, b) => b.culturalScore - a.culturalScore)
      .slice(0, number);
  }

  /**
   * Get recipe equipment requirements
   */
  async getRecipeEquipment(recipeId: number): Promise<EquipmentReference[]> {
    try {
      const recipe = await this.getRecipeInformation(recipeId);
      if (!recipe) return [];

      const equipment = new Set<EquipmentReference>();
      
      recipe.analyzedInstructions.forEach(instruction => {
        instruction.steps.forEach(step => {
          step.equipment.forEach(eq => equipment.add(eq));
        });
      });

      return Array.from(equipment);
    } catch (error) {
      console.error(`Failed to get equipment for recipe ${recipeId}:`, error);
      return [];
    }
  }

  /**
   * Calculate cultural authenticity score
   */
  private calculateCulturalScore(recipe: SpoonacularRecipe, targetCuisine: string): number {
    let score = 0;

    // Base score for matching cuisine
    if (recipe.cuisines.includes(targetCuisine)) {
      score += 50;
    }

    // Bonus for traditional ingredients (simplified)
    const traditionalIngredients = this.getTraditionalIngredients(targetCuisine);
    const recipeIngredients = recipe.extendedIngredients?.map(ing => ing.name.toLowerCase()) || [];
    
    const matchingIngredients = traditionalIngredients.filter(traditional =>
      recipeIngredients.some(ingredient => ingredient.includes(traditional))
    );
    
    score += matchingIngredients.length * 10;

    // Bonus for authentic cooking methods (would need more sophisticated analysis)
    if (recipe.instructions) {
      const traditionalMethods = this.getTraditionalMethods(targetCuisine);
      const hasTraditionalMethod = traditionalMethods.some(method =>
        recipe.instructions.toLowerCase().includes(method)
      );
      
      if (hasTraditionalMethod) {
        score += 20;
      }
    }

    // Penalty for fusion or non-traditional elements
    const fusionKeywords = ['fusion', 'modern', 'twist', 'inspired'];
    const hasFusionElements = fusionKeywords.some(keyword =>
      recipe.title.toLowerCase().includes(keyword) ||
      recipe.summary?.toLowerCase().includes(keyword)
    );
    
    if (hasFusionElements) {
      score -= 15;
    }

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Get traditional ingredients for a cuisine (simplified)
   */
  private getTraditionalIngredients(cuisine: string): string[] {
    const traditionalIngredients: Record<string, string[]> = {
      'italian': ['olive oil', 'tomato', 'basil', 'parmesan', 'mozzarella', 'garlic'],
      'mexican': ['cumin', 'chili', 'lime', 'cilantro', 'avocado', 'corn'],
      'indian': ['turmeric', 'cumin', 'coriander', 'garam masala', 'ginger', 'garlic'],
      'chinese': ['soy sauce', 'ginger', 'garlic', 'sesame oil', 'rice wine', 'scallion'],
      'japanese': ['soy sauce', 'miso', 'sake', 'mirin', 'nori', 'wasabi'],
      'thai': ['fish sauce', 'lime', 'chili', 'coconut milk', 'lemongrass', 'basil'],
      'french': ['butter', 'wine', 'herbs', 'cream', 'shallot', 'thyme'],
      'mediterranean': ['olive oil', 'lemon', 'herbs', 'feta', 'olives', 'tomato'],
    };

    return traditionalIngredients[cuisine.toLowerCase()] || [];
  }

  /**
   * Get traditional cooking methods for a cuisine (simplified)
   */
  private getTraditionalMethods(cuisine: string): string[] {
    const traditionalMethods: Record<string, string[]> = {
      'italian': ['sauté', 'simmer', 'bake', 'grill'],
      'mexican': ['grill', 'roast', 'char', 'steam'],
      'indian': ['curry', 'tandoor', 'steam', 'fry'],
      'chinese': ['stir-fry', 'steam', 'braise', 'deep-fry'],
      'japanese': ['steam', 'grill', 'simmer', 'raw'],
      'thai': ['stir-fry', 'curry', 'steam', 'grill'],
      'french': ['sauté', 'braise', 'roast', 'poach'],
      'mediterranean': ['grill', 'roast', 'sauté', 'bake'],
    };

    return traditionalMethods[cuisine.toLowerCase()] || [];
  }

  /**
   * Normalize recipe data from Spoonacular API
   */
  private normalizeRecipe(recipe: any): SpoonacularRecipe {
    return {
      id: recipe.id,
      title: recipe.title,
      summary: recipe.summary?.replace(/<[^>]*>/g, '') || '', // Remove HTML tags
      image: recipe.image,
      imageType: recipe.imageType || 'jpg',
      servings: recipe.servings || 1,
      readyInMinutes: recipe.readyInMinutes || 0,
      preparationMinutes: recipe.preparationMinutes,
      cookingMinutes: recipe.cookingMinutes,
      aggregateLikes: recipe.aggregateLikes || 0,
      healthScore: recipe.healthScore || 0,
      spoonacularScore: recipe.spoonacularScore || 0,
      pricePerServing: recipe.pricePerServing || 0,
      cheap: recipe.cheap || false,
      creditsText: recipe.creditsText || '',
      sourceName: recipe.sourceName || '',
      sourceUrl: recipe.sourceUrl || '',
      cuisines: recipe.cuisines || [],
      dishTypes: recipe.dishTypes || [],
      diets: recipe.diets || [],
      occasions: recipe.occasions || [],
      instructions: recipe.instructions || '',
      analyzedInstructions: recipe.analyzedInstructions || [],
      extendedIngredients: recipe.extendedIngredients || [],
      nutrition: recipe.nutrition,
      winePairing: recipe.winePairing,
      taste: recipe.taste,
    };
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
 * Singleton instance of SpoonacularService
 */
export const spoonacularService = new SpoonacularService();