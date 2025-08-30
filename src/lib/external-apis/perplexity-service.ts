/**
 * Perplexity API Service for Grocery Price Fallback
 * Used when Kroger API is unavailable or doesn't have pricing data
 */

interface PerplexityPriceRequest {
  ingredients: string[];
  location: string; // zip code or city, state
  storePreference?: string; // e.g., "Walmart", "Target", "local grocery stores"
}

interface PerplexityPriceResponse {
  ingredient: string;
  estimatedPrice: number;
  unit: string;
  store: string;
  confidence: number; // 0-1 scale
  source: string;
  lastUpdated: string;
  notes?: string;
}

interface PerplexityAPIResponse {
  data: PerplexityPriceResponse[];
  success: boolean;
  error?: string;
  fallbackUsed: boolean;
}

class PerplexityPricingService {
  private apiKey: string;
  private baseURL = 'https://api.perplexity.ai/chat/completions';

  constructor() {
    this.apiKey = process.env.PERPLEXITY_API_KEY || '';
    if (!this.apiKey) {
      console.warn('Perplexity API key not found. Fallback pricing will be unavailable.');
    }
  }

  /**
   * Get grocery prices for ingredients using Perplexity AI
   */
  async getIngredientPrices(request: PerplexityPriceRequest): Promise<PerplexityAPIResponse> {
    if (!this.apiKey) {
      return {
        data: [],
        success: false,
        error: 'Perplexity API key not configured',
        fallbackUsed: true
      };
    }

    try {
      const prompt = this.buildPricingPrompt(request);
      
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: 'You are a grocery pricing expert. Always return valid JSON with current grocery prices.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 2000,
          temperature: 0.1,
          return_citations: true,
          search_domain_filter: ['walmart.com', 'target.com', 'kroger.com', 'safeway.com', 'instacart.com']
        })
      });

      if (!response.ok) {
        throw new Error(`Perplexity API error: ${response.status}`);
      }

      const result = await response.json();
      const content = result.choices[0]?.message?.content;
      
      if (!content) {
        throw new Error('No content received from Perplexity API');
      }

      // Parse the JSON response from Perplexity
      const priceData = this.parsePerplexityResponse(content);
      
      return {
        data: priceData,
        success: true,
        fallbackUsed: true
      };

    } catch (error) {
      console.error('Perplexity pricing service error:', error);
      
      // Return estimated prices as last resort
      return {
        data: this.getEstimatedPrices(request.ingredients),
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        fallbackUsed: true
      };
    }
  }

  /**
   * Build a structured prompt for Perplexity to get grocery prices
   */
  private buildPricingPrompt(request: PerplexityPriceRequest): string {
    const { ingredients, location, storePreference } = request;
    
    return `
Find current grocery prices for the following ingredients in ${location}:

Ingredients: ${ingredients.join(', ')}
${storePreference ? `Preferred stores: ${storePreference}` : 'Any major grocery stores (Walmart, Target, Kroger, Safeway, etc.)'}

Please return the results in this exact JSON format:
{
  "prices": [
    {
      "ingredient": "ingredient name",
      "estimatedPrice": 0.00,
      "unit": "per lb/per item/per oz",
      "store": "store name",
      "confidence": 0.8,
      "source": "website or source",
      "lastUpdated": "2025-01-30",
      "notes": "any relevant notes about the price or product"
    }
  ]
}

Requirements:
- Use current 2025 prices
- Include confidence score (0-1) based on how recent/reliable the price is
- Specify the unit (per pound, per item, per ounce, etc.)
- Include store name where price was found
- Add notes for any assumptions or variations
- Focus on common grocery stores in the ${location} area
- Return only valid JSON, no additional text
`;
  }

  /**
   * Parse Perplexity's response and extract price data
   */
  private parsePerplexityResponse(content: string): PerplexityPriceResponse[] {
    try {
      // Extract JSON from the response (Perplexity might include extra text)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in Perplexity response');
      }

      const parsed = JSON.parse(jsonMatch[0]);
      
      if (parsed.prices && Array.isArray(parsed.prices)) {
        return parsed.prices.map((price: any) => ({
          ingredient: price.ingredient || '',
          estimatedPrice: parseFloat(price.estimatedPrice) || 0,
          unit: price.unit || 'each',
          store: price.store || 'Unknown',
          confidence: parseFloat(price.confidence) || 0.5,
          source: price.source || 'Perplexity Search',
          lastUpdated: price.lastUpdated || new Date().toISOString().split('T')[0],
          notes: price.notes || ''
        }));
      }

      throw new Error('Invalid price data structure');
    } catch (error) {
      console.error('Error parsing Perplexity response:', error);
      return [];
    }
  }

  /**
   * Fallback estimated prices when all else fails
   */
  private getEstimatedPrices(ingredients: string[]): PerplexityPriceResponse[] {
    // Basic price estimates based on common grocery items
    const priceEstimates: Record<string, { price: number; unit: string }> = {
      // Proteins
      'chicken breast': { price: 6.99, unit: 'per lb' },
      'ground beef': { price: 5.99, unit: 'per lb' },
      'salmon': { price: 12.99, unit: 'per lb' },
      'eggs': { price: 3.49, unit: 'per dozen' },
      
      // Vegetables
      'onion': { price: 1.99, unit: 'per lb' },
      'tomato': { price: 2.99, unit: 'per lb' },
      'carrot': { price: 1.49, unit: 'per lb' },
      'potato': { price: 2.99, unit: 'per 5lb bag' },
      'bell pepper': { price: 1.99, unit: 'each' },
      
      // Pantry items
      'rice': { price: 2.99, unit: 'per 2lb bag' },
      'flour': { price: 3.49, unit: 'per 5lb bag' },
      'olive oil': { price: 7.99, unit: 'per 16oz bottle' },
      'salt': { price: 1.99, unit: 'per container' },
      'sugar': { price: 3.99, unit: 'per 4lb bag' }
    };

    return ingredients.map(ingredient => {
      const normalizedIngredient = ingredient.toLowerCase().trim();
      const estimate = priceEstimates[normalizedIngredient] || { price: 2.99, unit: 'estimated' };
      
      return {
        ingredient,
        estimatedPrice: estimate.price,
        unit: estimate.unit,
        store: 'Estimated Average',
        confidence: 0.3, // Low confidence for estimates
        source: 'PlateWise Estimates',
        lastUpdated: new Date().toISOString().split('T')[0],
        notes: 'Estimated price - actual prices may vary'
      };
    });
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
          model: 'llama-3.1-sonar-small-128k-online',
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

export const perplexityPricingService = new PerplexityPricingService();
export type { PerplexityPriceRequest, PerplexityPriceResponse, PerplexityAPIResponse };