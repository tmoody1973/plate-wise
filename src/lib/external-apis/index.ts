/**
 * External APIs Index
 * Unified exports for all external API integrations
 */

// AI Services
export * from './bedrock-service';
export { aiServiceFactory, generateAIMealPlan, getIngredientSubstitutions, analyzeRecipeAuthenticity, getBudgetOptimization, translateWithCulturalContext, parseRecipeInput, checkAIHealth } from '../ai';

// Grocery and Pricing Services
export * from './kroger-service';
export * from './price-comparison';

// Recipe and Nutrition Services
export * from './spoonacular-service';
export * from './edamam-service';
export * from './recipe-service';

// Voice Services
export * from './elevenlabs-service';
export * from './voice-interface';

// Location Services
export * from './google-places-service';
export * from './usda-service';
export * from './location-service';

// Service instances for direct use
export { krogerService } from './kroger-service';
export { priceComparisonService } from './price-comparison';
export { spoonacularService } from './spoonacular-service';
export { edamamService } from './edamam-service';
export { recipeService } from './recipe-service';
export { elevenLabsService } from './elevenlabs-service';
export { voiceInterfaceService } from './voice-interface';
export { googlePlacesService } from './google-places-service';
export { usdaService } from './usda-service';
export { locationService } from './location-service';

/**
 * API Health Check Service
 * Provides unified health checking for all external APIs
 */
export class APIHealthService {
  /**
   * Check health of all external APIs
   */
  static async checkAllAPIs(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    services: Record<string, { status: 'up' | 'down' | 'degraded'; responseTime?: number; error?: string }>;
  }> {
    const services: Record<string, { status: 'up' | 'down' | 'degraded'; responseTime?: number; error?: string }> = {};
    
    // Check AI services
    try {
      const aiHealth = await checkAIHealth();
      services.bedrock = {
        status: aiHealth.status === 'healthy' ? 'up' : 'down',
      };
    } catch (error) {
      services.bedrock = {
        status: 'down',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }

    // Check Kroger API
    try {
      const startTime = Date.now();
      await krogerService.getStoreLocations('12345', 5);
      services.kroger = {
        status: 'up',
        responseTime: Date.now() - startTime,
      };
    } catch (error) {
      services.kroger = {
        status: 'down',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }

    // Check Spoonacular API
    try {
      const startTime = Date.now();
      const usage = spoonacularService.getUsageStats();
      services.spoonacular = {
        status: usage.remaining > 0 ? 'up' : 'degraded',
        responseTime: Date.now() - startTime,
      };
    } catch (error) {
      services.spoonacular = {
        status: 'down',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }

    // Check Edamam API
    try {
      const startTime = Date.now();
      const usage = edamamService.getUsageStats();
      services.edamam = {
        status: usage.remaining > 0 ? 'up' : 'degraded',
        responseTime: Date.now() - startTime,
      };
    } catch (error) {
      services.edamam = {
        status: 'down',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }

    // Check ElevenLabs API
    try {
      const startTime = Date.now();
      const usage = elevenLabsService.getUsageStats();
      services.elevenlabs = {
        status: usage.remaining > 0 ? 'up' : 'degraded',
        responseTime: Date.now() - startTime,
      };
    } catch (error) {
      services.elevenlabs = {
        status: 'down',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }

    // Check Google Places API
    try {
      const startTime = Date.now();
      const usage = googlePlacesService.getUsageStats();
      services.googlePlaces = {
        status: usage.remaining > 0 ? 'up' : 'degraded',
        responseTime: Date.now() - startTime,
      };
    } catch (error) {
      services.googlePlaces = {
        status: 'down',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }

    // Check USDA API
    try {
      const startTime = Date.now();
      const usage = usdaService.getUsageStats();
      services.usda = {
        status: usage.remaining > 0 ? 'up' : 'degraded',
        responseTime: Date.now() - startTime,
      };
    } catch (error) {
      services.usda = {
        status: 'down',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }

    // Determine overall status
    const serviceStatuses = Object.values(services).map(service => service.status);
    const downCount = serviceStatuses.filter(status => status === 'down').length;
    const degradedCount = serviceStatuses.filter(status => status === 'degraded').length;

    let overallStatus: 'healthy' | 'degraded' | 'unhealthy';
    if (downCount === 0 && degradedCount === 0) {
      overallStatus = 'healthy';
    } else if (downCount <= 2) {
      overallStatus = 'degraded';
    } else {
      overallStatus = 'unhealthy';
    }

    return {
      status: overallStatus,
      services,
    };
  }

  /**
   * Get usage statistics for all APIs
   */
  static getAllUsageStats(): Record<string, { requestCount: number; limit: number; remaining: number }> {
    return {
      spoonacular: spoonacularService.getUsageStats(),
      edamam: edamamService.getUsageStats(),
      elevenlabs: elevenLabsService.getUsageStats(),
      googlePlaces: googlePlacesService.getUsageStats(),
      usda: usdaService.getUsageStats(),
    };
  }
}

/**
 * API Configuration Validator
 * Validates that all required API keys are configured
 */
export class APIConfigValidator {
  /**
   * Validate all API configurations
   */
  static validateConfigurations(): {
    valid: boolean;
    missing: string[];
    warnings: string[];
  } {
    const missing: string[] = [];
    const warnings: string[] = [];

    // Check required environment variables
    const requiredVars = [
      'AWS_REGION',
      'AWS_ACCESS_KEY_ID', 
      'AWS_SECRET_ACCESS_KEY',
      'KROGER_CLIENT_ID',
      'KROGER_CLIENT_SECRET',
      'SPOONACULAR_API_KEY',
      'ELEVENLABS_API_KEY',
      'GOOGLE_PLACES_API_KEY',
    ];

    const optionalVars = [
      'EDAMAM_RECIPE_APP_ID',
      'EDAMAM_RECIPE_APP_KEY',
      'EDAMAM_NUTRITION_APP_ID',
      'EDAMAM_NUTRITION_APP_KEY',
      'USDA_NUTRITION_API_KEY',
    ];

    requiredVars.forEach(varName => {
      if (!process.env[varName]) {
        missing.push(varName);
      }
    });

    optionalVars.forEach(varName => {
      if (!process.env[varName]) {
        warnings.push(`Optional API key ${varName} not configured - some features may be limited`);
      }
    });

    return {
      valid: missing.length === 0,
      missing,
      warnings,
    };
  }
}

/**
 * Convenience functions for common operations
 */

/**
 * Search for recipes across all sources
 */
export async function searchAllRecipes(
  query: string,
  culturalPreferences: string[] = [],
  dietaryRestrictions: string[] = [],
  maxResults: number = 20
) {
  return recipeService.searchRecipes({
    query,
    cuisines: culturalPreferences,
    diets: dietaryRestrictions,
    limit: maxResults,
  });
}

/**
 * Find local food sources
 */
export async function findLocalFoodSources(
  location: { lat: number; lng: number },
  culturalPreferences: string[] = [],
  radius: number = 10
) {
  return locationService.getLocalFoodMap(location, radius, culturalPreferences);
}

/**
 * Get comprehensive meal planning with AI
 */
export async function generateComprehensiveMealPlan(
  userPreferences: {
    culturalCuisines: string[];
    dietaryRestrictions: string[];
    budgetLimit: number;
    householdSize: number;
    location: { lat: number; lng: number };
  }
) {
  // Generate AI meal plan
  const mealPlan = await generateAIMealPlan({
    userId: 'user',
    budgetConstraints: {
      monthlyLimit: userPreferences.budgetLimit,
      householdSize: userPreferences.householdSize,
      currentSpending: 0,
    },
    nutritionalGoals: {
      calorieTarget: 2000,
      macroTargets: { protein: 150, carbs: 250, fat: 65 },
      healthGoals: [],
    },
    culturalPreferences: userPreferences.culturalCuisines,
    timeframe: {
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    dietaryRestrictions: userPreferences.dietaryRestrictions,
    cookingConstraints: {
      skillLevel: 'intermediate',
      availableTime: 60,
      equipment: ['stove', 'oven', 'microwave'],
    },
  });

  // Get local food sources
  const localSources = await findLocalFoodSources(
    userPreferences.location,
    userPreferences.culturalCuisines
  );

  return {
    mealPlan,
    localSources,
    estimatedCost: mealPlan.totalCost,
    culturalBalance: mealPlan.culturalBalance,
  };
}

/**
 * Get voice-enabled cooking assistance
 */
export async function startVoiceCookingSession(
  userId: string,
  language: string = 'en-US',
  culturalContext: string = 'general'
) {
  return voiceInterfaceService.startVoiceSession(userId, language, culturalContext);
}