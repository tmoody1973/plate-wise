'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  Star, 
  DollarSign, 
  Globe, 
  ChefHat,
  Heart,
  Share2,
  Edit,
  Trash2
} from 'lucide-react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/AppLayout';
import dynamic from 'next/dynamic';
const RecipeScaling = dynamic(() => import('@/components/recipes/RecipeScaling').then(m => m.RecipeScaling), { ssr: false });
import { recipeService } from '@/lib/recipes/recipe-service';
import { useProfileSetup } from '@/hooks/useProfileSetup';
import type { Recipe } from '@/types';
import { useAuthContext } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/toast';

export default function RecipeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const recipeId = params.id as string;

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'scaling' | 'reviews'>('overview');
  const [isFavorited, setIsFavorited] = useState(false);
  const { user } = useAuthContext();
  const { addToast } = useToast();
  const { profile } = useProfileSetup();
  const [refreshingPrices, setRefreshingPrices] = useState(false);
  const [zipInput, setZipInput] = useState<string>('');
  const [stores, setStores] = useState<Array<{ id: string; name: string }>>([]);
  const [selectedStore, setSelectedStore] = useState<{ id?: string; name?: string }>({});
  const [pricingDetails, setPricingDetails] = useState<Array<{ name: string; unitPrice: number; estimatedCost: number; product?: any; topCandidates?: any[]; confidence?: number; explain?: any; packages?: number; packageSize?: string }>>([]);
  const [openCandidateIndex, setOpenCandidateIndex] = useState<number | null>(null);
  const [openExplainIndex, setOpenExplainIndex] = useState<number | null>(null);
  const [openQuickIndex, setOpenQuickIndex] = useState<number | null>(null);
  const [ephemeralPreferred, setEphemeralPreferred] = useState<Array<{ name: string; productId: string }>>([]);

  const normalizedTokens = (name: string) => name.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
  const highlightMatch = (text: string, tokens: string[]) => {
    if (!text) return text;
    const parts = text.split(/(\s+)/);
    return (
      <>
        {parts.map((p, i) => {
          const lower = p.toLowerCase();
          const hit = tokens.some(t => t && lower.includes(t));
          return hit ? <mark key={i} className="px-0.5 bg-yellow-100 text-gray-900 rounded-sm">{p}</mark> : <span key={i}>{p}</span>;
        })}
      </>
    );
  };

  useEffect(() => {
    loadRecipe();
  }, [recipeId]);

  const loadRecipe = async () => {
    try {
      setLoading(true);
      const recipeData = await recipeService.getRecipeById(recipeId);
      
      if (!recipeData) {
        setError('Recipe not found');
        return;
      }

      setRecipe(recipeData);
    } catch (error) {
      console.error('Failed to load recipe:', error);
      setError('Failed to load recipe');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleEdit = () => {
    router.push('/recipes' as any); // TODO: Implement edit page
  };

  const handleDelete = async () => {
    if (!recipe || !confirm('Are you sure you want to delete this recipe?')) {
      return;
    }

    try {
      const success = await recipeService.deleteRecipe(recipeId, recipe.authorId || '');
      if (success) {
        router.push('/recipes');
      } else {
        alert('Failed to delete recipe');
      }
    } catch (error) {
      console.error('Failed to delete recipe:', error);
      alert('Failed to delete recipe');
    }
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    // TODO: Implement favorite functionality
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe?.title,
        text: recipe?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Recipe link copied to clipboard!');
    }
  };

  const normalizeName = (s: string) => s.toLowerCase().trim();

  const buildPreferredList = () => {
    try {
      const mappings = ((profile as any)?.preferences?.productMappings) || {};
      const storeKey = selectedStore.id || ((profile as any)?.preferences?.defaultStore?.id) || '';
      const storeMap = (mappings as any)[storeKey] || {};
      if (!recipe) return [] as Array<{ name: string; productId: string }>;
      return recipe.ingredients.map(i => {
        const key = normalizeName(i.name);
        const pid = storeMap[key];
        return pid ? { name: i.name, productId: pid } : null;
      }).filter(Boolean) as Array<{ name: string; productId: string }>;
    } catch {
      return [];
    }
  };

  const refreshLivePrices = async (extraPreferred?: Array<{ name: string; productId: string }>) => {
    if (!recipe) return;
    try {
      setRefreshingPrices(true);
      const extras = Array.isArray(extraPreferred) ? extraPreferred : [];
      const payload = {
        ingredients: recipe.ingredients.map(i => ({ name: i.name, amount: i.amount, unit: i.unit })),
        zip: selectedStore.id ? undefined : (zipInput || profile?.location?.zipCode),
        locationId: selectedStore.id,
        servings: recipe.metadata.servings,
        preferredProductIds: [
          ...buildPreferredList(),
          ...extras,
          ...ephemeralPreferred,
        ],
      };
      const res = await fetch('/api/pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(async () => ({ error: await res.text().catch(() => `HTTP ${res.status}`) }))
        throw new Error(typeof err?.error === 'string' ? err.error : `Pricing failed: ${res.status}`)
      }
      const json = await res.json();
      const data = json.data;
      if (data) {
        const per = data.perIngredient || [];
        setPricingDetails(per);
        // Auto-open change list for ambiguous item (low confidence)
        const ambiguousIndex = per.findIndex((p: any) => (p.confidence ?? 1) < 0.5);
        if (ambiguousIndex >= 0) {
          setActiveTab('scaling');
          setOpenCandidateIndex(ambiguousIndex);
        }
        if (data.locationId) setSelectedStore({ id: data.locationId, name: data.storeName });
        const updated = await recipeService.updateRecipe({
          id: recipe.id,
          costAnalysis: {
            totalCost: data.totalCost,
            costPerServing: data.costPerServing,
            storeComparison: [],
            seasonalTrends: [],
            bulkBuyingOpportunities: [],
            couponSavings: [],
            alternativeIngredients: [],
          },
        } as any, user?.id || '');
        if (updated) setRecipe(updated);
      }
    } catch (e: any) {
      console.warn('Failed to refresh prices', e);
      addToast({ type: 'error', title: 'Could not refresh prices', message: e?.message || 'Check credentials or try again.' });
    } finally {
      setRefreshingPrices(false);
    }
  };

  const useCandidate = async (rowIndex: number, candidate: any) => {
    try {
      if (!user) return alert('Please sign in to save preferences.');
      const storeId = selectedStore.id || (profile as any)?.preferences?.defaultStore?.id;
      if (!storeId) {
        alert('Select a store first.');
        return;
      }
      const ingredientName = recipe!.ingredients[rowIndex].name;
      const key = normalizeName(ingredientName);
      const prefs = (profile as any)?.preferences || {};
      const updatedMappings = {
        ...(prefs.productMappings || {}),
        [storeId]: {
          ...((prefs.productMappings || {})[storeId] || {}),
          [key]: candidate.productId,
        },
      };
      const { profileService } = await import('@/lib/profile/profile-service');
      const res = await profileService.updateProfile(user.id, { preferences: { ...prefs, productMappings: updatedMappings } } as any);
      if (!res.success) throw new Error(res.error || 'Failed to save mapping');
      // Also apply immediately for this refresh cycle
      setEphemeralPreferred(prev => {
        const next = prev.filter(p => p.name.toLowerCase().trim() !== ingredientName.toLowerCase().trim());
        next.push({ name: ingredientName, productId: candidate.productId });
        return next;
      });
      setOpenCandidateIndex(null);
      setOpenQuickIndex(null);
      await refreshLivePrices([{ name: ingredientName, productId: candidate.productId }]);
      addToast({ type: 'success', title: 'Updated pricing', message: `Using: ${candidate.description || 'selected product'}` });
    } catch (e) {
      console.warn('Failed to use candidate', e);
      addToast({ type: 'error', title: 'Could not save selection', message: 'Please try again.' });
    }
  };

  const fetchStores = async () => {
    try {
      const zip = (zipInput || profile?.location?.zipCode || '').trim();
      if (!zip) {
        alert('Enter a ZIP code to find nearby stores');
        return;
      }
      const res = await fetch(`/api/kroger/locations?zip=${encodeURIComponent(zip)}`);
      if (!res.ok) throw new Error(`Store lookup failed: ${res.status}`);
      const json = await res.json();
      const list = (json.data || []).map((s: any) => ({ id: s.id as string, name: s.name as string }));
      setStores(list);
      if (list[0]) setSelectedStore(list[0]);
    } catch (e) {
      console.warn('Failed to fetch stores', e);
      alert('Could not load stores. Check ZIP and try again.');
    }
  };

  useEffect(() => {
    setZipInput(profile?.location?.zipCode || '');
    const def = (profile as any)?.preferences?.defaultStore;
    if (def?.id) {
      setSelectedStore({ id: def.id, name: def.name });
    }
  }, [profile?.location?.zipCode]);

  const saveDefaultStore = async () => {
    try {
      if (!user || !selectedStore.id) return;
      const updates: any = {
        preferences: {
          ...(profile as any)?.preferences,
          defaultStore: { id: selectedStore.id, name: selectedStore.name, zip: zipInput || profile?.location?.zipCode },
        },
      };
      const { profileService } = await import('@/lib/profile/profile-service');
      const res = await profileService.updateProfile(user.id, updates);
      if (!res.success) throw new Error(res.error || 'Failed to save default store');
      alert('Default store saved');
    } catch (e) {
      console.warn('Failed to save default store', e);
      alert('Could not save default store. Try again.');
    }
  };

  const handleRate = () => {
    // TODO: Implement rating modal
    console.log('Rate recipe');
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
  };

  const averageRating = recipe?.ratings.length 
    ? recipe.ratings.reduce((sum, r) => sum + r.rating, 0) / recipe.ratings.length 
    : 0;

  // Heuristic: extract missing time/cost metadata from description text when not stored in fields
  const derivedMeta = useMemo(() => {
    const text = recipe?.description || '';
    const toMinutes = (h?: number, m?: number) => (h || 0) * 60 + (m || 0);
    const num = (s?: string) => (s ? parseFloat(s) : NaN);

    const findTime = (label: string): number | undefined => {
      // e.g., "Prep Time: 15 min" or "prep: 1 hr 20 min"
      const re1 = new RegExp(`${label}\\s*:?\\s*(\\d+)\\s*(min|minutes)`, 'i');
      const m1 = text.match(re1);
      if (m1) return parseInt(m1[1], 10);
      const re2 = new RegExp(`${label}\\s*:?\\s*(\\d+)\\s*(h|hr|hour|hours)(?:\\s*(\\d+)\\s*(min|minutes))?`, 'i');
      const m2 = text.match(re2);
      if (m2) return toMinutes(parseInt(m2[1], 10), m2[3] ? parseInt(m2[3], 10) : 0);
      return undefined;
    };

    const findTotal = (): number | undefined => {
      const ready = text.match(/ready\\s*in\\s*:?\\s*(\\d+)\\s*(min|minutes)/i);
      if (ready) return parseInt(ready[1], 10);
      const totalMin = text.match(/total\\s*time\\s*:?\\s*(\\d+)\\s*(min|minutes)/i);
      if (totalMin) return parseInt(totalMin[1], 10);
      const totalHour = text.match(/total\\s*time\\s*:?\\s*(\\d+)\\s*(h|hr|hour|hours)(?:\\s*(\\d+)\\s*(min|minutes))?/i);
      if (totalHour) return toMinutes(parseInt(totalHour[1], 10), totalHour[3] ? parseInt(totalHour[3], 10) : 0);
      return undefined;
    };

    const findServings = (): number | undefined => {
      const m = text.match(/(servings?|serves)\\s*:?\\s*(\\d+)/i);
      if (m) return parseInt(m[2], 10);
      return undefined;
    };

    const findCostPerServing = (): number | undefined => {
      const withServing = text.match(/(cost|price)[^\n]*?(per\\s*serving)[^\n]*?(\$?\d+(?:\.\d{1,2})?)/i);
      if (withServing) return num(withServing[3].replace('$', ''));
      const plain = text.match(/\$\s?(\d+(?:\.\d{1,2})?)\s*(?:per\\s*serving)/i);
      if (plain) return num(plain[1]);
      return undefined;
    };

    const prep = findTime('prep');
    const cook = findTime('cook');
    const total = findTotal();
    const servings = findServings();
    const costPerServing = findCostPerServing();

    return { prep, cook, total, servings, costPerServing };
  }, [recipe?.description]);

  // Persist backfilled metadata/cost if missing and derivable
  useEffect(() => {
    const persistIfNeeded = async () => {
      if (!recipe || !user) return;

      const metadataUpdates: any = { ...recipe.metadata };
      let hasMetaUpdate = false;

      if (!metadataUpdates.servings && derivedMeta.servings) {
        metadataUpdates.servings = derivedMeta.servings;
        hasMetaUpdate = true;
      }
      if (!metadataUpdates.prepTime && derivedMeta.prep) {
        metadataUpdates.prepTime = derivedMeta.prep;
        hasMetaUpdate = true;
      }
      if (!metadataUpdates.cookTime && derivedMeta.cook) {
        metadataUpdates.cookTime = derivedMeta.cook;
        hasMetaUpdate = true;
      }
      if (!metadataUpdates.totalTime && (derivedMeta.total || (derivedMeta.prep || 0) + (derivedMeta.cook || 0))) {
        metadataUpdates.totalTime = derivedMeta.total || ((derivedMeta.prep || 0) + (derivedMeta.cook || 0));
        hasMetaUpdate = true;
      }

      let costUpdates: any = recipe.costAnalysis ? { ...recipe.costAnalysis } : undefined;
      let hasCostUpdate = false;
      if ((costUpdates?.costPerServing == null || costUpdates.costPerServing === 0) && derivedMeta.costPerServing != null) {
        if (!costUpdates) {
          // initialize minimal cost analysis if missing
          (metadataUpdates as any); // keep TS happy without altering types
        }
        const existing = recipe.costAnalysis || {
          totalCost: 0,
          costPerServing: 0,
          storeComparison: [],
          seasonalTrends: [],
          bulkBuyingOpportunities: [],
          couponSavings: [],
          alternativeIngredients: [],
        };
        existing.costPerServing = derivedMeta.costPerServing as number;
        // If servings known, estimate totalCost
        if ((metadataUpdates.servings || recipe.metadata.servings) && !existing.totalCost) {
          const s = metadataUpdates.servings || recipe.metadata.servings;
          existing.totalCost = (derivedMeta.costPerServing as number) * s;
        }
        costUpdates = existing;
        hasCostUpdate = true;
      }

      if (!hasMetaUpdate && !hasCostUpdate) return;

      try {
        const updated = await recipeService.updateRecipe({
          id: recipe.id,
          ...(hasMetaUpdate ? { metadata: metadataUpdates } : {}),
          ...(hasCostUpdate ? { costAnalysis: costUpdates } : {}),
        } as any, user.id);
        if (updated) {
          setRecipe(updated);
        }
      } catch (e) {
        console.warn('Non-blocking: failed to persist derived metadata/cost', e);
      }
    };
    void persistIfNeeded();
  }, [recipe?.id, user?.id, derivedMeta.prep, derivedMeta.cook, derivedMeta.total, derivedMeta.servings, derivedMeta.costPerServing]);

  if (loading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
            <span className="ml-3 text-gray-600">Loading recipe...</span>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  if (error || !recipe) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😞</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Recipe Not Found</h2>
            <p className="text-gray-600 mb-6">{error || 'The recipe you\'re looking for doesn\'t exist.'}</p>
            <button
              onClick={handleBack}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Go Back
            </button>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  const renderOverviewTab = () => (
    <div className="space-y-8">
      {/* Recipe Info Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <Clock className="w-6 h-6 text-gray-600 mx-auto mb-2" />
          <div className="font-medium text-gray-900">{
            formatTime(
              recipe.metadata.totalTime ||
              (recipe.metadata.prepTime + recipe.metadata.cookTime) ||
              derivedMeta.total ||
              (derivedMeta.prep || 0) + (derivedMeta.cook || 0)
            )
          }</div>
          <div className="text-sm text-gray-600">Total Time</div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <Users className="w-6 h-6 text-gray-600 mx-auto mb-2" />
          <div className="font-medium text-gray-900">{recipe.metadata.servings || derivedMeta.servings || 0}</div>
          <div className="text-sm text-gray-600">Servings</div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <ChefHat className="w-6 h-6 text-gray-600 mx-auto mb-2" />
          <div className="font-medium text-gray-900 capitalize">{recipe.metadata.difficulty}</div>
          <div className="text-sm text-gray-600">Difficulty</div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <DollarSign className="w-6 h-6 text-gray-600 mx-auto mb-2" />
          <div className="font-medium text-gray-900">
            ${
              (recipe.costAnalysis?.costPerServing ?? derivedMeta.costPerServing ?? 0).toFixed(2)
            }
          </div>
          <div className="text-sm text-gray-600 flex items-center justify-center space-x-2">
            <span>Per Serving</span>
            {pricingDetails.length > 0 && (
              <button
                onClick={() => {
                  // open the most ambiguous or most expensive item
                  let idx = pricingDetails.findIndex((p: any) => (p.confidence ?? 1) < 0.5);
                  if (idx < 0) {
                    idx = pricingDetails.reduce((best, cur, i, arr) => cur.estimatedCost > (arr[best]?.estimatedCost || 0) ? i : best, 0);
                  }
                  // Quick review popover in-place on Overview
                  setOpenQuickIndex(idx >= 0 ? idx : null);
                }}
                className="text-xs text-blue-600 hover:text-blue-800"
                title="Review item matches"
              >Review</button>
            )}
          </div>
        </div>
      </div>

      {/* Ingredients */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Ingredients</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <span className="text-gray-900">
                {ingredient.amount} {ingredient.unit} {ingredient.name}
              </span>
              {ingredient.culturalName && (
                <span className="text-sm text-orange-600 italic">
                  ({ingredient.culturalName})
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Instructions</h3>
        <div className="space-y-4">
          {recipe.instructions.map((instruction, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center text-sm font-medium">
                {instruction.step}
              </div>
              <div className="flex-1">
                <p className="text-gray-900">{instruction.description}</p>
                {instruction.culturalTechnique && (
                  <p className="text-sm text-orange-600 mt-1 italic">
                    Traditional technique: {instruction.culturalTechnique}
                  </p>
                )}
                {instruction.estimatedTime && (
                  <p className="text-sm text-gray-500 mt-1">
                    Estimated time: {instruction.estimatedTime} minutes
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nutritional Information */}
      {recipe.nutritionalInfo && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Nutritional Information</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{Math.round(recipe.nutritionalInfo.calories)}</div>
              <div className="text-sm text-gray-600">Calories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{Math.round(recipe.nutritionalInfo.protein)}g</div>
              <div className="text-sm text-gray-600">Protein</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{Math.round(recipe.nutritionalInfo.carbs)}g</div>
              <div className="text-sm text-gray-600">Carbs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{Math.round(recipe.nutritionalInfo.fat)}g</div>
              <div className="text-sm text-gray-600">Fat</div>
            </div>
          </div>
        </div>
      )}

      {/* Cultural Context */}
      {recipe.culturalOrigin.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-orange-900 mb-4 flex items-center">
            <Globe className="w-6 h-6 mr-2" />
            Cultural Context
          </h3>
          <div className="space-y-3">
            <div>
              <span className="font-medium text-orange-800">Origin: </span>
              <span className="text-orange-700">{recipe.culturalOrigin.join(', ')}</span>
            </div>
            <div>
              <span className="font-medium text-orange-800">Cuisine: </span>
              <span className="text-orange-700 capitalize">{recipe.cuisine}</span>
            </div>
            <div>
              <span className="font-medium text-orange-800">Authenticity Score: </span>
              <div className="inline-flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(recipe.metadata.culturalAuthenticity / 2)
                        ? 'fill-orange-400 text-orange-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-orange-700">
                  ({recipe.metadata.culturalAuthenticity}/10)
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderReviewsTab = () => (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Reviews & Ratings</h3>
          <button
            onClick={handleRate}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Write Review
          </button>
        </div>
        
        {recipe.ratings.length > 0 ? (
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
              <div className="flex items-center justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(averageRating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-600">{recipe.ratings.length} reviews</div>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">No reviews yet. Be the first to review this recipe!</p>
        )}
      </div>

      {/* Reviews List */}
      {recipe.reviews.length > 0 && (
        <div className="space-y-4">
          {recipe.reviews.map((review, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-medium text-gray-900">{review.userName}</div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </div>
              </div>
              <p className="text-gray-700">{review.review}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Recipes
            </button>
            
          <div className="flex items-center space-x-2">
              {/* Selected store badge */}
              <span className="hidden md:inline-flex items-center px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs mr-1">
                {selectedStore.name || (profile as any)?.preferences?.defaultStore?.name
                  ? `Store: ${selectedStore.name || (profile as any)?.preferences?.defaultStore?.name}`
                  : 'Store: Any'}
              </span>
              <div className="hidden md:flex items-center space-x-2 mr-2">
                <input
                  value={zipInput}
                  onChange={e => setZipInput(e.target.value)}
                  placeholder="ZIP"
                  className="w-24 px-2 py-1 border border-gray-300 rounded"
                />
                <button
                  onClick={fetchStores}
                  className="px-2 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded border border-gray-200"
                >Find Stores</button>
                <select
                  value={selectedStore.id || ''}
                  onChange={e => setSelectedStore({ id: e.target.value, name: stores.find(s => s.id === e.target.value)?.name })}
                  className="px-2 py-1 border border-gray-300 rounded"
                >
                  <option value="">Any nearby</option>
                  {stores.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
                <button
                  onClick={saveDefaultStore}
                  disabled={!selectedStore.id}
                  className="px-2 py-1 text-sm bg-green-100 text-green-700 hover:bg-green-200 rounded border border-green-200 disabled:opacity-50"
                  title="Set as your default store"
                >Set Default</button>
              </div>
              <button
                onClick={() => refreshLivePrices()}
                disabled={refreshingPrices}
                className="p-2 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg transition-colors disabled:opacity-50"
                title="Refresh live ingredient prices from Kroger"
              >
                {refreshingPrices ? (
                  <span className="inline-flex items-center"><span className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-700 mr-2"></span>Refreshing</span>
                ) : (
                  <DollarSign className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={handleFavorite}
                className={`p-2 rounded-lg transition-colors ${
                  isFavorited
                    ? 'bg-red-100 text-red-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
              
              <button
                onClick={handleShare}
                className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
              
              {recipe.source === 'user' && (
                <>
                  <button
                    onClick={handleEdit}
                    className="p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-lg transition-colors"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={handleDelete}
                    className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Recipe Header */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{recipe.title}</h1>
                {recipe.description && (
                  <p className="text-gray-600 mb-4">{recipe.description}</p>
                )}
                
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Globe className="w-4 h-4 mr-1" />
                    {recipe.culturalOrigin.join(', ')}
                  </span>
                  
                  {averageRating > 0 && (
                    <span className="flex items-center">
                      <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                      {averageRating.toFixed(1)} ({recipe.ratings.length})
                    </span>
                  )}
                  
                  <span className="capitalize">{recipe.source} recipe</span>
                </div>
              </div>
            </div>

          {/* Tags */}
          {recipe.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Pricing results */}
          {pricingDetails.length > 0 && (
            <div className="mt-6 border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-md font-semibold text-gray-900">Live Pricing Details</h3>
                {selectedStore.name && (
                  <div className="text-sm text-gray-600">Store: {selectedStore.name}</div>
                )}
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-gray-600">
                      <th className="text-left py-2 pr-4">Ingredient</th>
                      <th className="text-left py-2 pr-4">Match</th>
                      <th className="text-right py-2">Est. Cost</th>
                      <th className="text-right py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingDetails.map((row: any, idx) => (
                      <>
                        <tr key={`row_${idx}`} className="border-t border-gray-100">
                          <td className="py-2 pr-4 text-gray-900">{row.name}</td>
                          <td className="py-2 pr-4 text-gray-600">
                            <div className="flex items-center space-x-2">
                              { (row.product?.images?.[0]?.sizes?.[0]?.url || row.product?.images?.[0]?.url) && (
                                <img src={row.product?.images?.[0]?.sizes?.[0]?.url || row.product?.images?.[0]?.url} alt="" className="w-8 h-8 object-cover rounded" />
                              )}
                              <span>{row.product?.description || row.product?.items?.[0]?.upc || '—'}</span>
                              {typeof row.confidence === 'number' && (
                                <span className={`text-xs px-2 py-0.5 rounded ${row.confidence < 0.5 ? 'bg-red-100 text-red-700' : row.confidence < 0.75 ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}
                                  title={(() => {
                                    const parts: string[] = [`Confidence ${Math.round((row.confidence||0)*100)}%`];
                                    if (row.explain) {
                                      if (!row.explain.categoryMatched && row.explain.categoryHint) parts.push(`Category mismatch (expected ${row.explain.categoryHint})`)
                                      if (row.explain.titleSim < 0.5) parts.push('Low title similarity')
                                      if (row.explain.soupPenaltyApplied) parts.push('Soup penalized for produce')
                                    }
                                    return parts.join(' • ')
                                  })()}>
                                  {row.confidence < 0.5 ? 'Low' : row.confidence < 0.75 ? 'Med' : 'High'}
                                </span>
                              )}
                              {row.explain && (
                                <button
                                  onClick={() => setOpenExplainIndex(openExplainIndex === idx ? null : idx)}
                                  className="text-xs text-gray-500 hover:text-gray-700"
                                >Why?</button>
                              )}
                            </div>
                          </td>
                          <td className="py-2 text-right text-gray-900">
                            <div className="flex items-center justify-end space-x-2">
                              {row.packages && row.packageSize && (
                                <span className="text-xs text-gray-500 bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5">
                                  {row.packages} × {row.packageSize}
                                </span>
                              )}
                              <span>${row.estimatedCost.toFixed(2)}</span>
                            </div>
                          </td>
                          <td className="py-2 text-right">
                            <button
                              onClick={async () => {
                                if (!(row.topCandidates && row.topCandidates.length > 0)) {
                                  // Fetch alternatives on demand
                                  try {
                                    const payload: any = { name: recipe!.ingredients[idx].name };
                                    if (selectedStore.id) payload.locationId = selectedStore.id; else if (zipInput || profile?.location?.zipCode) payload.zip = (zipInput || profile?.location?.zipCode);
                                    const resp = await fetch('/api/pricing/alternatives', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(payload) });
                                    if (resp.ok) {
                                      const json = await resp.json();
                                      const top = json?.data?.topCandidates || [];
                                      setPricingDetails(prev => prev.map((r, i) => i === idx ? { ...r, topCandidates: top } : r));
                                    }
                                  } catch {}
                                }
                                setOpenCandidateIndex(openCandidateIndex === idx ? null : idx)
                              }}
                              className="text-xs text-blue-600 hover:text-blue-800"
                            >{openCandidateIndex === idx ? 'Hide' : 'Change'}</button>
                          </td>
                        </tr>
                        {openExplainIndex === idx && row.explain && (
                          <tr key={`why_${idx}`} className="bg-white">
                            <td colSpan={4} className="py-3 px-4">
                              <div className="text-xs text-gray-700 space-y-1">
                                <div><span className="font-medium">Title match:</span> {Math.round((row.explain.titleSim || 0)*100)}%</div>
                                <div><span className="font-medium">Category:</span> {row.explain.categoryMatched ? 'Matched' : `Did not match`} {row.explain.categoryHint ? `(expected ${row.explain.categoryHint})` : ''}</div>
                                <div><span className="font-medium">Size proximity:</span> {Math.round((row.explain.sizeProximity || 0)*100)}%</div>
                                <div><span className="font-medium">Availability:</span> {row.explain.availability || 'unknown'} {row.explain.promo ? '• Promo' : ''}</div>
                                {row.explain.soupPenaltyApplied && <div className="text-red-600">Soup penalized for produce ingredient.</div>}
                              </div>
                            </td>
                          </tr>
                        )}
                        {openCandidateIndex === idx && (
                          <tr key={`cands_${idx}`} className="bg-gray-50">
                            <td colSpan={4} className="py-3 px-4">
                              <div className="space-y-2">
                                {(row.topCandidates && row.topCandidates.length > 0) ? row.topCandidates.map((c: any, j: number) => (
                                  <div key={`cand_${idx}_${j}`} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                      {c.image && <img src={c.image} alt="" className="w-10 h-10 object-cover rounded" />}
                                      <div>
                                        <div className="text-gray-900">{c.description || 'Product'}</div>
                                        <div className="text-xs text-gray-500">{c.size || ''} {c.category ? `• ${c.category}` : ''}</div>
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                      <div className="text-sm text-gray-900">${(c.price || 0).toFixed(2)}</div>
                                      <button
                                        onClick={() => useCandidate(idx, c)}
                                        className="px-2 py-1 text-xs rounded bg-green-600 text-white hover:bg-green-700"
                                      >Use this</button>
                                    </div>
                                  </div>
                                )) : (
                                  <div className="text-xs text-gray-600">Loading alternatives…</div>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            )}
          </div>

          {/* Quick Review Popover (Overview) */}
          {activeTab === 'overview' && openQuickIndex !== null && pricingDetails[openQuickIndex] && (
            <div className="mt-4 p-4 border border-blue-200 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-blue-900">Review match for <span className="font-medium">{pricingDetails[openQuickIndex].name}</span></div>
                <button onClick={() => setOpenQuickIndex(null)} className="text-xs text-blue-700 hover:text-blue-900">Close</button>
              </div>
              <div className="space-y-2">
                {(pricingDetails[openQuickIndex].topCandidates || []).map((c: any, j: number) => (
                  <div key={`quick_${openQuickIndex}_${j}`} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {c.image && <img src={c.image} alt="" className="w-8 h-8 object-cover rounded" />}
                      <div>
                        <div className="text-gray-900 text-sm">{highlightMatch(c.description || 'Product', normalizedTokens(pricingDetails[openQuickIndex].name))}</div>
                        <div className="text-xs text-gray-500">{c.size || ''} {c.category ? `• ${c.category}` : ''}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-sm text-gray-900">${(c.price || 0).toFixed(2)}</div>
                      <button onClick={() => useCandidate(openQuickIndex, c)} className="px-2 py-1 text-xs rounded bg-green-600 text-white hover:bg-green-700">Use this</button>
                    </div>
                  </div>
                ))}
                {(!pricingDetails[openQuickIndex].topCandidates || pricingDetails[openQuickIndex].topCandidates.length === 0) && (
                  <div className="text-xs text-blue-800">No alternatives available. Try changing the store or refreshing prices.</div>
                )}
              </div>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-lg">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'scaling', label: 'Scaling & Cost' },
                  { id: 'reviews', label: 'Reviews' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-orange-500 text-orange-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'overview' && renderOverviewTab()}
              {activeTab === 'scaling' && <RecipeScaling recipe={recipe} />}
              {activeTab === 'reviews' && renderReviewsTab()}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
