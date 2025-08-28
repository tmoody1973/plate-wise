/**
 * Profile service for managing user profile data
 * Handles CRUD operations for user profiles in Supabase
 */

import { createClient } from '@/lib/supabase/client';
import type { UserProfile } from '@/types';
import type { ProfileSetupData } from '@/components/profile/ProfileSetupWizard';

export interface ProfileServiceResult<T = any> {
  data?: T;
  error?: string;
  success: boolean;
}

export class ProfileService {
  private supabase = createClient();

  /**
   * Create or update user profile from setup wizard data
   */
  async saveProfileSetupData(userId: string, setupData: ProfileSetupData): Promise<ProfileServiceResult<UserProfile>> {
    try {
      // Transform setup data to match database schema
      const profileData = {
        id: userId,
        email: '', // Will be populated from auth user
        name: setupData.personalInfo.name,
        location: setupData.personalInfo.location,
        preferences: {
          languages: setupData.personalInfo.languages,
          primaryLanguage: setupData.personalInfo.primaryLanguage,
          culturalCuisines: setupData.culturalPreferences.culturalCuisines,
          dietaryRestrictions: setupData.dietaryRestrictions.dietaryRestrictions,
          allergies: setupData.dietaryRestrictions.allergies,
          dislikes: setupData.dietaryRestrictions.dislikes,
          culturalBackground: setupData.culturalPreferences.culturalBackground,
          traditionalCookingMethods: setupData.culturalPreferences.traditionalCookingMethods,
          religiousRestrictions: setupData.dietaryRestrictions.religiousRestrictions,
        },
        budget_settings: {
          monthlyLimit: setupData.budgetSettings.monthlyLimit,
          householdSize: setupData.budgetSettings.householdSize,
          shoppingFrequency: setupData.budgetSettings.shoppingFrequency,
          priorityCategories: setupData.budgetSettings.priorityCategories,
        },
        nutritional_goals: {
          calorieTarget: setupData.nutritionalGoals.calorieTarget,
          macroTargets: setupData.nutritionalGoals.macroTargets,
          healthGoals: setupData.nutritionalGoals.healthGoals,
          activityLevel: setupData.nutritionalGoals.activityLevel,
        },
        cooking_profile: {
          skillLevel: setupData.cookingProfile.skillLevel,
          availableTime: setupData.cookingProfile.availableTime,
          equipment: setupData.cookingProfile.equipment,
          mealPrepPreference: setupData.cookingProfile.mealPrepPreference,
          cookingFrequency: setupData.cookingProfile.cookingFrequency,
        },
      };

      // Get user email from auth
      const { data: { user }, error: userError } = await this.supabase.auth.getUser();
      if (userError || !user) {
        return {
          error: 'User not authenticated',
          success: false,
        };
      }

      profileData.email = user.email || '';

      // Upsert profile data
      const { data, error } = await this.supabase
        .from('user_profiles')
        .upsert(profileData, {
          onConflict: 'id',
          ignoreDuplicates: false,
        })
        .select()
        .single();

      if (error) {
        console.error('Error saving profile:', error);
        return {
          error: `Failed to save profile: ${error.message}`,
          success: false,
        };
      }

      // Transform database data back to UserProfile type
      const userProfile: UserProfile = {
        id: data.id,
        email: data.email,
        name: data.name,
        location: data.location,
        preferences: data.preferences,
        budget: {
          monthlyLimit: data.budget_settings.monthlyLimit,
          householdSize: data.budget_settings.householdSize,
          shoppingFrequency: data.budget_settings.shoppingFrequency,
        },
        nutritionalGoals: data.nutritional_goals,
        cookingProfile: data.cooking_profile,
        savedStores: [], // Will be loaded separately
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
      };

      return {
        data: userProfile,
        success: true,
      };
    } catch (error) {
      console.error('Error in saveProfileSetupData:', error);
      return {
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        success: false,
      };
    }
  }

  /**
   * Get user profile by ID
   */
  async getProfile(userId: string): Promise<ProfileServiceResult<UserProfile>> {
    try {
      const { data, error } = await this.supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // Profile not found
          return {
            error: 'Profile not found',
            success: false,
          };
        }
        return {
          error: `Failed to fetch profile: ${error.message}`,
          success: false,
        };
      }

      // Transform database data to UserProfile type
      const userProfile: UserProfile = {
        id: data.id,
        email: data.email,
        name: data.name,
        location: data.location,
        preferences: data.preferences,
        budget: {
          monthlyLimit: data.budget_settings.monthlyLimit,
          householdSize: data.budget_settings.householdSize,
          shoppingFrequency: data.budget_settings.shoppingFrequency,
        },
        nutritionalGoals: data.nutritional_goals,
        cookingProfile: data.cooking_profile,
        savedStores: [], // Will be loaded separately
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
      };

      return {
        data: userProfile,
        success: true,
      };
    } catch (error) {
      console.error('Error in getProfile:', error);
      return {
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        success: false,
      };
    }
  }

  /**
   * Update specific profile fields
   */
  async updateProfile(userId: string, updates: Partial<UserProfile>): Promise<ProfileServiceResult<UserProfile>> {
    try {
      console.log('ProfileService: Updating profile for user:', userId);
      console.log('ProfileService: Updates received:', updates);
      
      // First, get the current profile to merge with updates
      const currentProfile = await this.getProfile(userId);
      if (!currentProfile.success || !currentProfile.data) {
        return {
          error: 'Profile not found for update',
          success: false,
        };
      }

      // Transform UserProfile updates to database schema with proper merging
      const dbUpdates: any = {
        updated_at: new Date().toISOString(),
      };

      if (updates.name !== undefined) dbUpdates.name = updates.name;
      if (updates.location !== undefined) {
        // Merge location updates with existing location data
        dbUpdates.location = {
          ...currentProfile.data.location,
          ...updates.location,
        };
      }
      if (updates.preferences !== undefined) {
        // Merge preferences updates with existing preferences data
        dbUpdates.preferences = {
          ...currentProfile.data.preferences,
          ...updates.preferences,
        };
      }
      if (updates.budget !== undefined) {
        // Merge budget updates with existing budget data
        dbUpdates.budget_settings = {
          ...currentProfile.data.budget,
          ...updates.budget,
        };
      }
      if (updates.nutritionalGoals !== undefined) {
        // Merge nutritional goals updates with existing data
        dbUpdates.nutritional_goals = {
          ...currentProfile.data.nutritionalGoals,
          ...updates.nutritionalGoals,
          // Handle nested macroTargets properly
          macroTargets: {
            ...currentProfile.data.nutritionalGoals.macroTargets,
            ...(updates.nutritionalGoals.macroTargets || {}),
          },
        };
      }
      if (updates.cookingProfile !== undefined) {
        // Merge cooking profile updates with existing data
        dbUpdates.cooking_profile = {
          ...currentProfile.data.cookingProfile,
          ...updates.cookingProfile,
        };
      }

      console.log('ProfileService: Database updates with merging:', dbUpdates);

      const { data, error } = await this.supabase
        .from('user_profiles')
        .update(dbUpdates)
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        console.error('ProfileService: Database update error:', error);
        return {
          error: `Failed to update profile: ${error.message}`,
          success: false,
        };
      }

      console.log('ProfileService: Database update successful:', data);

      // Transform back to UserProfile type
      const userProfile: UserProfile = {
        id: data.id,
        email: data.email,
        name: data.name,
        location: data.location,
        preferences: data.preferences,
        budget: {
          monthlyLimit: data.budget_settings.monthlyLimit,
          householdSize: data.budget_settings.householdSize,
          shoppingFrequency: data.budget_settings.shoppingFrequency,
        },
        nutritionalGoals: data.nutritional_goals,
        cookingProfile: data.cooking_profile,
        savedStores: [], // Will be loaded separately
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
      };

      return {
        data: userProfile,
        success: true,
      };
    } catch (error) {
      console.error('Error in updateProfile:', error);
      return {
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        success: false,
      };
    }
  }

  /**
   * Check if user has completed profile setup
   */
  async hasCompletedSetup(userId: string): Promise<ProfileServiceResult<boolean>> {
    try {
      const { data, error } = await this.supabase
        .from('user_profiles')
        .select('name, location, preferences, budget_settings, nutritional_goals, cooking_profile')
        .eq('id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // Profile not found, setup not completed
          return {
            data: false,
            success: true,
          };
        }
        return {
          error: `Failed to check setup status: ${error.message}`,
          success: false,
        };
      }

      // Check if essential fields are populated
      const hasEssentialData = !!(
        data.name &&
        data.location?.zipCode &&
        data.preferences?.languages?.length > 0 &&
        data.budget_settings?.monthlyLimit &&
        data.nutritional_goals?.calorieTarget &&
        data.cooking_profile?.skillLevel
      );

      return {
        data: hasEssentialData,
        success: true,
      };
    } catch (error) {
      console.error('Error in hasCompletedSetup:', error);
      return {
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        success: false,
      };
    }
  }

  /**
   * Delete user profile
   */
  async deleteProfile(userId: string): Promise<ProfileServiceResult<void>> {
    try {
      const { error } = await this.supabase
        .from('user_profiles')
        .delete()
        .eq('id', userId);

      if (error) {
        return {
          error: `Failed to delete profile: ${error.message}`,
          success: false,
        };
      }

      return {
        success: true,
      };
    } catch (error) {
      console.error('Error in deleteProfile:', error);
      return {
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        success: false,
      };
    }
  }

  /**
   * Export user data for privacy compliance
   */
  async exportUserData(userId: string): Promise<ProfileServiceResult<any>> {
    try {
      // Get profile data
      const profileResult = await this.getProfile(userId);
      if (!profileResult.success || !profileResult.data) {
        return {
          error: 'Failed to fetch profile data for export',
          success: false,
        };
      }

      // Get additional user data from related tables
      const [recipesResult, budgetResult, storesResult] = await Promise.all([
        this.getUserRecipeData(userId),
        this.getUserBudgetData(userId),
        this.getUserStoreData(userId),
      ]);

      const exportData = {
        exportInfo: {
          exportDate: new Date().toISOString(),
          userId,
          version: '1.0',
        },
        profile: profileResult.data,
        recipes: recipesResult.data || {},
        budget: budgetResult.data || {},
        stores: storesResult.data || [],
      };

      return {
        data: exportData,
        success: true,
      };
    } catch (error) {
      console.error('Error in exportUserData:', error);
      return {
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        success: false,
      };
    }
  }

  /**
   * Get user recipe data for export
   */
  private async getUserRecipeData(userId: string): Promise<ProfileServiceResult<any>> {
    try {
      const [recipes, collections, ratings, mealPlans, shoppingLists] = await Promise.all([
        this.supabase.from('recipes').select('*').eq('author_id', userId),
        this.supabase.from('recipe_collections').select('*').eq('user_id', userId),
        this.supabase.from('recipe_ratings').select('*').eq('user_id', userId),
        this.supabase.from('meal_plans').select('*').eq('user_id', userId),
        this.supabase.from('shopping_lists').select('*').eq('user_id', userId),
      ]);

      return {
        data: {
          customRecipes: recipes.data || [],
          collections: collections.data || [],
          ratings: ratings.data || [],
          mealPlans: mealPlans.data || [],
          shoppingLists: shoppingLists.data || [],
        },
        success: true,
      };
    } catch (error) {
      console.error('Error fetching user recipe data:', error);
      return {
        error: error instanceof Error ? error.message : 'Failed to fetch recipe data',
        success: false,
      };
    }
  }

  /**
   * Get user budget data for export
   */
  private async getUserBudgetData(userId: string): Promise<ProfileServiceResult<any>> {
    try {
      const [budgetPeriods, transactions] = await Promise.all([
        this.supabase.from('budget_periods').select('*').eq('user_id', userId),
        this.supabase.from('transactions').select('*').eq('user_id', userId),
      ]);

      return {
        data: {
          budgetPeriods: budgetPeriods.data || [],
          transactions: transactions.data || [],
        },
        success: true,
      };
    } catch (error) {
      console.error('Error fetching user budget data:', error);
      return {
        error: error instanceof Error ? error.message : 'Failed to fetch budget data',
        success: false,
      };
    }
  }

  /**
   * Get user store data for export
   */
  private async getUserStoreData(userId: string): Promise<ProfileServiceResult<any>> {
    try {
      const { data, error } = await this.supabase
        .from('saved_stores')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        return {
          error: `Failed to fetch store data: ${error.message}`,
          success: false,
        };
      }

      return {
        data: data || [],
        success: true,
      };
    } catch (error) {
      console.error('Error fetching user store data:', error);
      return {
        error: error instanceof Error ? error.message : 'Failed to fetch store data',
        success: false,
      };
    }
  }

  /**
   * Perform complete account deletion with data cleanup
   */
  async deleteUserAccount(userId: string): Promise<ProfileServiceResult<void>> {
    try {
      // Delete data in correct order to respect foreign key constraints
      const deletionTasks = [
        // Delete dependent records first
        this.supabase.from('recipe_ratings').delete().eq('user_id', userId),
        this.supabase.from('recipe_collections').delete().eq('user_id', userId),
        this.supabase.from('transactions').delete().eq('user_id', userId),
        this.supabase.from('shopping_lists').delete().eq('user_id', userId),
        this.supabase.from('meal_plans').delete().eq('user_id', userId),
        this.supabase.from('budget_periods').delete().eq('user_id', userId),
        this.supabase.from('saved_stores').delete().eq('user_id', userId),
        this.supabase.from('user_follows').delete().or(`follower_id.eq.${userId},following_id.eq.${userId}`),
        
        // Delete user-created recipes
        this.supabase.from('recipes').delete().eq('author_id', userId),
        
        // Delete profile last
        this.supabase.from('user_profiles').delete().eq('id', userId),
      ];

      // Execute all deletion tasks
      const results = await Promise.allSettled(deletionTasks);
      
      // Check for any failures
      const failures = results.filter(result => result.status === 'rejected');
      if (failures.length > 0) {
        console.error('Some deletion tasks failed:', failures);
        return {
          error: 'Some data could not be deleted. Please contact support.',
          success: false,
        };
      }

      return {
        success: true,
      };
    } catch (error) {
      console.error('Error in deleteUserAccount:', error);
      return {
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        success: false,
      };
    }
  }
}

// Export singleton instance
export const profileService = new ProfileService();