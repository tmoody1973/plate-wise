/**
 * Google Places API Integration
 * Provides local store discovery, specialty market finding, and location services
 */

// Types for Google Places API integration
export interface PlaceResult {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
    viewport?: {
      northeast: { lat: number; lng: number };
      southwest: { lat: number; lng: number };
    };
  };
  types: string[];
  business_status?: string;
  opening_hours?: {
    open_now: boolean;
    periods?: OpeningPeriod[];
    weekday_text?: string[];
  };
  photos?: PlacePhoto[];
  price_level?: number;
  rating?: number;
  user_ratings_total?: number;
  vicinity?: string;
  plus_code?: {
    compound_code: string;
    global_code: string;
  };
}

export interface OpeningPeriod {
  close?: {
    day: number;
    time: string;
  };
  open: {
    day: number;
    time: string;
  };
}

export interface PlacePhoto {
  height: number;
  width: number;
  photo_reference: string;
  html_attributions: string[];
}

export interface PlaceDetails extends PlaceResult {
  formatted_phone_number?: string;
  international_phone_number?: string;
  website?: string;
  url?: string;
  utc_offset?: number;
  reviews?: PlaceReview[];
  address_components?: AddressComponent[];
  adr_address?: string;
  icon?: string;
  icon_background_color?: string;
  icon_mask_base_uri?: string;
  reference?: string;
  scope?: string;
}

export interface PlaceReview {
  author_name: string;
  author_url?: string;
  language: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface NearbySearchRequest {
  location: string; // lat,lng
  radius: number;
  type?: string;
  keyword?: string;
  language?: string;
  minprice?: number;
  maxprice?: number;
  name?: string;
  opennow?: boolean;
  rankby?: 'prominence' | 'distance';
  pagetoken?: string;
}

export interface TextSearchRequest {
  query: string;
  location?: string; // lat,lng
  radius?: number;
  language?: string;
  minprice?: number;
  maxprice?: number;
  opennow?: boolean;
  type?: string;
  pagetoken?: string;
}

export interface GroceryStore {
  id: string;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  phone?: string;
  website?: string;
  rating?: number;
  priceLevel?: number;
  openNow?: boolean;
  openingHours?: string[];
  storeType: 'supermarket' | 'grocery' | 'specialty' | 'ethnic' | 'organic' | 'farmers_market';
  specialties: string[];
  distance?: number;
  photos: string[];
  reviews: {
    rating: number;
    text: string;
    author: string;
    date: string;
  }[];
}

export interface SpecialtyMarket extends GroceryStore {
  culturalFocus: string[];
  authenticIngredients: string[];
  languagesSpoken: string[];
  culturalEvents?: string[];
}

/**
 * Google Places Service
 * Handles location-based store discovery and place information
 */
export class GooglePlacesService {
  private baseURL = 'https://maps.googleapis.com/maps/api/place';
  private apiKey: string;
  private requestCount = 0;
  private dailyLimit = 1000; // Typical API limit
  private lastResetDate = new Date().toDateString();

  constructor() {
    this.apiKey = process.env.GOOGLE_PLACES_API_KEY || '';
    
    if (!this.apiKey) {
      throw new Error('Google Places API key not configured');
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
      throw new Error('Daily API limit reached for Google Places');
    }
    
    this.requestCount++;
  }

  /**
   * Make authenticated API request
   */
  private async makeRequest<T>(
    endpoint: string,
    params: Record<string, any> = {}
  ): Promise<T> {
    this.checkRateLimit();

    const url = new URL(`${this.baseURL}${endpoint}`);
    url.searchParams.append('key', this.apiKey);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value.toString());
      }
    });

    try {
      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`Google Places API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
        throw new Error(`Google Places API error: ${data.status} - ${data.error_message || 'Unknown error'}`);
      }

      return data;
    } catch (error) {
      console.error(`Google Places API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Find nearby grocery stores and supermarkets
   */
  async findNearbyGroceryStores(
    location: { lat: number; lng: number },
    radius: number = 5000,
    options: {
      openNow?: boolean;
      minRating?: number;
      priceLevel?: number[];
    } = {}
  ): Promise<GroceryStore[]> {
    const request: NearbySearchRequest = {
      location: `${location.lat},${location.lng}`,
      radius,
      type: 'grocery_or_supermarket',
      opennow: options.openNow,
    };

    try {
      const response = await this.makeRequest<{ results: PlaceResult[] }>('/nearbysearch/json', request);
      const stores = await Promise.all(
        response.results.map(place => this.convertToGroceryStore(place, location))
      );

      // Filter by rating and price level if specified
      return stores.filter(store => {
        if (options.minRating && store.rating && store.rating < options.minRating) {
          return false;
        }
        if (options.priceLevel && store.priceLevel && !options.priceLevel.includes(store.priceLevel)) {
          return false;
        }
        return true;
      });
    } catch (error) {
      console.error('Failed to find nearby grocery stores:', error);
      return [];
    }
  }

  /**
   * Find specialty markets by cultural focus
   */
  async findSpecialtyMarkets(
    location: { lat: number; lng: number },
    culturalFocus: string[],
    radius: number = 10000
  ): Promise<SpecialtyMarket[]> {
    const specialtyMarkets: SpecialtyMarket[] = [];

    // Search for different types of specialty markets
    const searchTerms = this.generateSpecialtySearchTerms(culturalFocus);

    for (const searchTerm of searchTerms) {
      try {
        const request: TextSearchRequest = {
          query: `${searchTerm} near ${location.lat},${location.lng}`,
          location: `${location.lat},${location.lng}`,
          radius,
          type: 'grocery_or_supermarket',
        };

        const response = await this.makeRequest<{ results: PlaceResult[] }>('/textsearch/json', request);
        
        for (const place of response.results) {
          const specialtyMarket = await this.convertToSpecialtyMarket(place, location, culturalFocus);
          if (specialtyMarket) {
            specialtyMarkets.push(specialtyMarket);
          }
        }
      } catch (error) {
        console.error(`Failed to search for ${searchTerm}:`, error);
      }
    }

    // Remove duplicates and sort by distance
    const uniqueMarkets = this.removeDuplicateMarkets(specialtyMarkets);
    return uniqueMarkets.sort((a, b) => (a.distance || 0) - (b.distance || 0));
  }

  /**
   * Get detailed information about a specific place
   */
  async getPlaceDetails(placeId: string): Promise<PlaceDetails | null> {
    try {
      const response = await this.makeRequest<{ result: PlaceDetails }>('/details/json', {
        place_id: placeId,
        fields: 'name,formatted_address,formatted_phone_number,website,rating,reviews,opening_hours,photos,price_level,types',
      });

      return response.result;
    } catch (error) {
      console.error(`Failed to get place details for ${placeId}:`, error);
      return null;
    }
  }

  /**
   * Search for stores by text query
   */
  async searchStores(
    query: string,
    location?: { lat: number; lng: number },
    radius: number = 10000
  ): Promise<GroceryStore[]> {
    const request: TextSearchRequest = {
      query,
      location: location ? `${location.lat},${location.lng}` : undefined,
      radius: location ? radius : undefined,
      type: 'grocery_or_supermarket',
    };

    try {
      const response = await this.makeRequest<{ results: PlaceResult[] }>('/textsearch/json', request);
      return Promise.all(
        response.results.map(place => this.convertToGroceryStore(place, location))
      );
    } catch (error) {
      console.error('Store search failed:', error);
      return [];
    }
  }

  /**
   * Find stores with specific amenities or services
   */
  async findStoresWithAmenities(
    location: { lat: number; lng: number },
    amenities: string[],
    radius: number = 5000
  ): Promise<GroceryStore[]> {
    const stores: GroceryStore[] = [];

    for (const amenity of amenities) {
      try {
        const query = `grocery store ${amenity}`;
        const storesWithAmenity = await this.searchStores(query, location, radius);
        stores.push(...storesWithAmenity);
      } catch (error) {
        console.error(`Failed to find stores with ${amenity}:`, error);
      }
    }

    return this.removeDuplicateStores(stores);
  }

  /**
   * Get photo URL for a place photo
   */
  getPhotoUrl(
    photoReference: string,
    maxWidth: number = 400,
    maxHeight?: number
  ): string {
    const params = new URLSearchParams({
      photoreference: photoReference,
      maxwidth: maxWidth.toString(),
      key: this.apiKey,
    });

    if (maxHeight) {
      params.append('maxheight', maxHeight.toString());
    }

    return `${this.baseURL}/photo?${params.toString()}`;
  }

  /**
   * Calculate distance between two points
   */
  private calculateDistance(
    point1: { lat: number; lng: number },
    point2: { lat: number; lng: number }
  ): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(point2.lat - point1.lat);
    const dLng = this.toRadians(point2.lng - point1.lng);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRadians(point1.lat)) * Math.cos(this.toRadians(point2.lat)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  /**
   * Convert Google Places result to GroceryStore
   */
  private async convertToGroceryStore(
    place: PlaceResult,
    userLocation?: { lat: number; lng: number }
  ): Promise<GroceryStore> {
    const distance = userLocation 
      ? this.calculateDistance(userLocation, place.geometry.location)
      : undefined;

    const storeType = this.determineStoreType(place);
    const specialties = this.extractSpecialties(place);

    return {
      id: place.place_id,
      name: place.name,
      address: place.formatted_address,
      location: place.geometry.location,
      rating: place.rating,
      priceLevel: place.price_level,
      openNow: place.opening_hours?.open_now,
      openingHours: place.opening_hours?.weekday_text,
      storeType,
      specialties,
      distance,
      photos: place.photos?.map(photo => this.getPhotoUrl(photo.photo_reference)) || [],
      reviews: [], // Would be populated from place details
    };
  }

  /**
   * Convert Google Places result to SpecialtyMarket
   */
  private async convertToSpecialtyMarket(
    place: PlaceResult,
    userLocation: { lat: number; lng: number },
    culturalFocus: string[]
  ): Promise<SpecialtyMarket | null> {
    const baseStore = await this.convertToGroceryStore(place, userLocation);
    
    // Determine if this is actually a specialty market
    const culturalMatch = this.analyzeCulturalMatch(place, culturalFocus);
    if (culturalMatch.score < 0.3) {
      return null; // Not culturally relevant enough
    }

    return {
      ...baseStore,
      culturalFocus: culturalMatch.cultures,
      authenticIngredients: culturalMatch.ingredients,
      languagesSpoken: culturalMatch.languages,
      culturalEvents: culturalMatch.events,
    };
  }

  /**
   * Determine store type based on place data
   */
  private determineStoreType(place: PlaceResult): GroceryStore['storeType'] {
    const name = place.name.toLowerCase();
    const types = place.types.map(type => type.toLowerCase());

    if (name.includes('farmers market') || types.includes('farmers_market')) {
      return 'farmers_market';
    }
    
    if (name.includes('organic') || name.includes('whole foods') || name.includes('natural')) {
      return 'organic';
    }
    
    if (this.isEthnicMarket(name)) {
      return 'ethnic';
    }
    
    if (name.includes('specialty') || name.includes('gourmet')) {
      return 'specialty';
    }
    
    if (types.includes('supermarket') || name.includes('supermarket')) {
      return 'supermarket';
    }
    
    return 'grocery';
  }

  /**
   * Check if store is an ethnic market
   */
  private isEthnicMarket(name: string): boolean {
    const ethnicKeywords = [
      'asian', 'chinese', 'japanese', 'korean', 'thai', 'vietnamese',
      'indian', 'pakistani', 'bangladeshi',
      'mexican', 'latino', 'hispanic',
      'middle eastern', 'persian', 'turkish', 'lebanese',
      'african', 'ethiopian', 'somali',
      'european', 'italian', 'german', 'polish', 'russian',
      'halal', 'kosher', 'international'
    ];

    return ethnicKeywords.some(keyword => name.includes(keyword));
  }

  /**
   * Extract specialties from place data
   */
  private extractSpecialties(place: PlaceResult): string[] {
    const specialties: string[] = [];
    const name = place.name.toLowerCase();

    // Extract from name
    if (name.includes('organic')) specialties.push('Organic Products');
    if (name.includes('fresh')) specialties.push('Fresh Produce');
    if (name.includes('meat')) specialties.push('Butcher/Meat');
    if (name.includes('seafood') || name.includes('fish')) specialties.push('Seafood');
    if (name.includes('bakery') || name.includes('bread')) specialties.push('Bakery');
    if (name.includes('deli')) specialties.push('Deli');
    if (name.includes('wine') || name.includes('liquor')) specialties.push('Wine & Spirits');

    return specialties;
  }

  /**
   * Generate search terms for specialty markets
   */
  private generateSpecialtySearchTerms(culturalFocus: string[]): string[] {
    const baseTerms = ['grocery store', 'market', 'food store', 'supermarket'];
    const culturalTerms: Record<string, string[]> = {
      'asian': ['asian grocery', 'chinese market', 'korean store', 'japanese market', 'thai grocery'],
      'mexican': ['mexican market', 'latino grocery', 'hispanic store', 'mercado'],
      'indian': ['indian grocery', 'south asian market', 'pakistani store', 'bangladeshi market'],
      'middle_eastern': ['middle eastern market', 'persian grocery', 'turkish store', 'halal market'],
      'african': ['african market', 'ethiopian grocery', 'somali store'],
      'european': ['european deli', 'italian market', 'german store', 'polish grocery'],
      'kosher': ['kosher market', 'kosher grocery', 'jewish market'],
      'organic': ['organic market', 'natural foods', 'whole foods', 'health food store'],
    };

    const searchTerms = [...baseTerms];
    
    culturalFocus.forEach(culture => {
      const terms = culturalTerms[culture.toLowerCase()];
      if (terms) {
        searchTerms.push(...terms);
      }
    });

    return searchTerms;
  }

  /**
   * Analyze cultural match for specialty markets
   */
  private analyzeCulturalMatch(
    place: PlaceResult,
    culturalFocus: string[]
  ): {
    score: number;
    cultures: string[];
    ingredients: string[];
    languages: string[];
    events: string[];
  } {
    const name = place.name.toLowerCase();
    const address = place.formatted_address.toLowerCase();
    
    let score = 0;
    const matchedCultures: string[] = [];
    const ingredients: string[] = [];
    const languages: string[] = [];
    const events: string[] = [];

    // Check for cultural keywords in name and address
    culturalFocus.forEach(culture => {
      const cultureLower = culture.toLowerCase();
      if (name.includes(cultureLower) || address.includes(cultureLower)) {
        score += 0.4;
        matchedCultures.push(culture);
        
        // Add typical ingredients and languages for this culture
        const culturalData = this.getCulturalData(culture);
        ingredients.push(...culturalData.ingredients);
        languages.push(...culturalData.languages);
        events.push(...culturalData.events);
      }
    });

    // Check for general ethnic market indicators
    const ethnicKeywords = ['international', 'ethnic', 'world', 'global', 'imported'];
    if (ethnicKeywords.some(keyword => name.includes(keyword))) {
      score += 0.2;
    }

    return {
      score: Math.min(1, score),
      cultures: matchedCultures,
      ingredients,
      languages,
      events,
    };
  }

  /**
   * Get cultural data for a specific culture
   */
  private getCulturalData(culture: string): {
    ingredients: string[];
    languages: string[];
    events: string[];
  } {
    const culturalData: Record<string, any> = {
      'asian': {
        ingredients: ['soy sauce', 'rice', 'noodles', 'tofu', 'sesame oil'],
        languages: ['Chinese', 'Japanese', 'Korean', 'Thai', 'Vietnamese'],
        events: ['Chinese New Year', 'Mid-Autumn Festival'],
      },
      'mexican': {
        ingredients: ['tortillas', 'beans', 'chili peppers', 'corn', 'avocado'],
        languages: ['Spanish'],
        events: ['Cinco de Mayo', 'Day of the Dead'],
      },
      'indian': {
        ingredients: ['spices', 'lentils', 'basmati rice', 'curry', 'naan'],
        languages: ['Hindi', 'Tamil', 'Gujarati', 'Punjabi'],
        events: ['Diwali', 'Holi'],
      },
      'middle_eastern': {
        ingredients: ['pita bread', 'hummus', 'olive oil', 'dates', 'lamb'],
        languages: ['Arabic', 'Persian', 'Turkish', 'Hebrew'],
        events: ['Ramadan', 'Eid'],
      },
    };

    return culturalData[culture.toLowerCase()] || {
      ingredients: [],
      languages: [],
      events: [],
    };
  }

  /**
   * Remove duplicate stores from array
   */
  private removeDuplicateStores(stores: GroceryStore[]): GroceryStore[] {
    const seen = new Set<string>();
    return stores.filter(store => {
      if (seen.has(store.id)) {
        return false;
      }
      seen.add(store.id);
      return true;
    });
  }

  /**
   * Remove duplicate specialty markets from array
   */
  private removeDuplicateMarkets(markets: SpecialtyMarket[]): SpecialtyMarket[] {
    const seen = new Set<string>();
    return markets.filter(market => {
      if (seen.has(market.id)) {
        return false;
      }
      seen.add(market.id);
      return true;
    });
  }

  /**
   * Get usage statistics
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
 * Singleton instance of GooglePlacesService
 */
export const googlePlacesService = new GooglePlacesService();