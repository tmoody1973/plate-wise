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
const GroceryPricing = dynamic(() => import('@/components/recipes/GroceryPricing').then(m => m.GroceryPricing), { ssr: false });
const PricingPanel = dynamic(() => import('@/components/recipes/PricingPanel').then(m => m.PricingPanel), { ssr: false });
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
  const [findingStores, setFindingStores] = useState(false);
  const [pricingDetails, setPricingDetails] = useState<Array<{ name: string; unitPrice: number; estimatedCost: number; product?: any; topCandidates?: any[]; confidence?: number; explain?: any; packages?: number; packageSize?: string; portionCost?: number }>>([]);
  const [openCandidateIndex, setOpenCandidateIndex] = useState<number | null>(null);
  const [openExplainIndex, setOpenExplainIndex] = useState<number | null>(null);
  const [openQuickIndex, setOpenQuickIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [searchOffset, setSearchOffset] = useState<number>(0);
  const [pricedOnly, setPricedOnly] = useState<boolean>(true);
  const [ephemeralPreferred, setEphemeralPreferred] = useState<Array<{ name: string; productId: string }>>([]);
  const jsonRef = React.useRef<any>(null);
  const quickRef = React.useRef<HTMLDivElement | null>(null);

  // Close chooser with ESC
  useEffect(() => {
    if (openQuickIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenQuickIndex(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openQuickIndex])

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

  // Perform typed search within modal; supports pagination via offset
  const performSearch = async (idx: number, append = false) => {
    try {
      if (idx == null || !recipe) return
      setSearchLoading(true)
      const baseName = recipe?.ingredients[idx]?.name || ''
      const payload: any = { name: baseName, query: searchQuery || baseName, limit: 12, offset: append ? searchOffset : 0, pricedOnly };
      if (selectedStore.id) payload.locationId = selectedStore.id; else if (zipInput || profile?.location?.zipCode) payload.zip = (zipInput || profile?.location?.zipCode);
      const resp = await fetch('/api/pricing/alternatives', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (resp.ok) {
        const json = await resp.json();
        const top = json?.data?.topCandidates || [];
        setPricingDetails(prev => prev.map((r, i) => {
          if (i !== idx) return r
          const merged = append ? [ ...(r.topCandidates||[]), ...top ] : top
          return { ...r, topCandidates: merged }
        }));
        setSearchOffset(prev => append ? prev + (top.length || 0) : (top.length || 0))
      } else {
        const text = await resp.text().catch(()=> '')
        console.warn('[pricing] search failed', resp.status, text)
        addToast({ type: 'error', title: 'Search failed', message: 'Try a different query.' })
      }
    } catch (e) {
      console.warn('search error', e)
      addToast({ type: 'error', title: 'Search error', message: 'Network issue while searching.' })
    } finally {
      setSearchLoading(false)
    }
  }

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
      const res = await fetch('/api/pricing/ingredients', {
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
      // If candidate is tied to a different store (from nearby fallback), honor that
      const mappedStoreId = candidate.storeId || selectedStore.id || (profile as any)?.preferences?.defaultStore?.id;
      const mappedStoreName = candidate.storeName || selectedStore.name || (profile as any)?.preferences?.defaultStore?.name;
      const storeId = mappedStoreId;
      if (!storeId) {
        alert('Select a store first.');
        return;
      }
      // Optimistically update the UI with the selected candidate
      setPricingDetails(prev => prev.map((r, i) => {
        if (i !== rowIndex) return r
        const next = { ...r }
        next.product = { description: candidate.description, items: [{ price: { regular: candidate.price }, size: candidate.size }], images: candidate.image ? [{ url: candidate.image }] : [] }
        next.estimatedCost = typeof candidate.price === 'number' && candidate.price > 0 ? candidate.price : r.estimatedCost
        return next
      }))
      const ingredientName = recipe?.ingredients[rowIndex]?.name || '';
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
      // If we picked a different store, switch the selectedStore so pricing matches the chosen price context
      if (candidate.storeId && candidate.storeId !== selectedStore.id) {
        setSelectedStore({ id: candidate.storeId, name: mappedStoreName })
      }
      if (ingredientName) {
        await refreshLivePrices([{ name: ingredientName, productId: candidate.productId }]);
      } else {
        await refreshLivePrices();
      }
      addToast({ type: 'success', title: 'Updated pricing', message: `Using: ${candidate.description || 'selected product'}` });
    } catch (e) {
      console.warn('Failed to use candidate', e);
      addToast({ type: 'error', title: 'Could not save selection', message: 'Please try again.' });
    }
  };

  // Fetch alternatives using our pricing API and open quick review chooser
  const fetchAlternativesFor = async (idx: number) => {
    try {
      console.debug('[pricing] search alternatives click', { idx })
      if (pricingDetails[idx]?.topCandidates && pricingDetails[idx].topCandidates.length > 0) {
        setSearchQuery(recipe?.ingredients[idx]?.name || '')
        setOpenQuickIndex(idx);
        return;
      }
      // seed search with ingredient name
      setSearchQuery(recipe?.ingredients[idx]?.name || '')
      setSearchOffset(0)
      const payload: any = { name: (recipe?.ingredients[idx]?.name || ''), limit: 12, pricedOnly };
      if (selectedStore.id) payload.locationId = selectedStore.id; else if (zipInput || profile?.location?.zipCode) payload.zip = (zipInput || profile?.location?.zipCode);
      const resp = await fetch('/api/pricing/alternatives', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (resp.ok) {
        const json = await resp.json();
        const top = json?.data?.topCandidates || [];
        setPricingDetails(prev => prev.map((r, i) => i === idx ? { ...r, topCandidates: top } : r));
        setSearchOffset(top.length || 0)
      } else {
        const text = await resp.text().catch(()=>'')
        console.warn('[pricing] alternatives failed', resp.status, text)
        addToast({ type: 'error', title: 'Search failed', message: 'Could not load alternatives for this item.' })
      }
    } catch (e) {
      console.warn('Failed to fetch alternatives', e);
      addToast({ type: 'error', title: 'Search failed', message: 'Network or API error while searching.' })
    } finally {
      setOpenQuickIndex(idx);
      // Bring the quick review section into view for the user
      setTimeout(() => {
        try { quickRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch {}
      }, 0);
    }
  };

  const fetchStores = async () => {
    try {
      setFindingStores(true)
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
    } finally {
      setFindingStores(false)
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
      if (m1) return parseInt(m1[1]!, 10);
      const re2 = new RegExp(`${label}\\s*:?\\s*(\\d+)\\s*(h|hr|hour|hours)(?:\\s*(\\d+)\\s*(min|minutes))?`, 'i');
      const m2 = text.match(re2);
      if (m2) return toMinutes(parseInt(m2[1]!, 10), m2[3] ? parseInt(m2[3]!, 10) : 0);
      return undefined;
    };

    const findTotal = (): number | undefined => {
      const ready = text.match(/ready\\s*in\\s*:?\\s*(\\d+)\\s*(min|minutes)/i);
      if (ready) return parseInt(ready[1]!, 10);
      const totalMin = text.match(/total\\s*time\\s*:?\\s*(\\d+)\\s*(min|minutes)/i);
      if (totalMin) return parseInt(totalMin[1]!, 10);
      const totalHour = text.match(/total\\s*time\\s*:?\\s*(\\d+)\\s*(h|hr|hour|hours)(?:\\s*(\\d+)\\s*(min|minutes))?/i);
      if (totalHour) return toMinutes(parseInt(totalHour[1]!, 10), totalHour[3] ? parseInt(totalHour[3]!, 10) : 0);
      return undefined;
    };

    const findServings = (): number | undefined => {
      const m = text.match(/(servings?|serves)\\s*:?\\s*(\\d+)/i);
      if (m) return parseInt(m[2]!, 10);
      return undefined;
    };

    const findCostPerServing = (): number | undefined => {
      const withServing = text.match(/(cost|price)[^\n]*?(per\\s*serving)[^\n]*?(\$?\d+(?:\.\d{1,2})?)/i);
      if (withServing) return num(String(withServing[3] || '').replace('$', ''));
      const plain = text.match(/\$\s?(\d+(?:\.\d{1,2})?)\s*(?:per\\s*serving)/i);
      if (plain) return num(plain[1]!);
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

      {/* Grocery Pricing (Overview) */}
      {pricingDetails.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <GroceryPricing
            recipe={recipe}
            items={pricingDetails.map((row, i) => ({
              id: i,
              original: `${recipe.ingredients[i]?.amount ?? ''} ${recipe.ingredients[i]?.unit ?? ''} ${recipe.ingredients[i]?.name ?? row.name}`.trim(),
              matched: row.product?.description || 'No match found',
              priceLabel: (() => {
                const p = row.product?.items?.find((it:any)=>it?.price?.promo || it?.price?.regular)?.price
                const price = p?.promo ?? p?.regular
                if (typeof price === 'number' && row.packageSize) return `$${price.toFixed(2)} per ${row.packageSize}`
                return undefined
              })(),
              estimatedCost: row.estimatedCost || 0,
              needsReview: (row.confidence ?? 1) < 0.5 || !row.product,
              confidence: row.confidence ?? 1,
              packages: row.packages,
              packageSize: row.packageSize,
              portionCost: row.portionCost,
            }))}
            zipValue={zipInput}
            selectedStoreName={selectedStore.name || (profile as any)?.preferences?.defaultStore?.name}
            isDefaultStore={Boolean(selectedStore.id && selectedStore.id === (profile as any)?.preferences?.defaultStore?.id)}
            isSearchingStore={findingStores}
            refreshing={refreshingPrices}
            onZipChange={setZipInput}
            onFindStore={fetchStores}
            onSetDefault={saveDefaultStore}
            onRefreshPrices={() => refreshLivePrices()}
            onSearchItem={(idx) => fetchAlternativesFor(idx)}
            onReviewItem={(idx) => fetchAlternativesFor(idx)}
          />
        </div>
      )}

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


          </div>

          {/* Quick Review Modal */}
          <div ref={quickRef} />
          {openQuickIndex !== null && pricingDetails[openQuickIndex] && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/40" onClick={() => setOpenQuickIndex(null)} />
              <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-3xl mx-4 p-5 sm:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 pr-4">
                    <div className="text-xl font-semibold text-gray-900">Review match for <span className="text-blue-700">{pricingDetails[openQuickIndex].name}</span></div>
                    <div className="mt-3 flex items-center gap-2">
                      <input
                        value={searchQuery}
                        onChange={(e)=>setSearchQuery(e.target.value)}
                        onKeyDown={(e)=>{ if (e.key==='Enter') performSearch(openQuickIndex,false) }}
                        placeholder="Search Kroger products"
                        className="w-full sm:w-80 px-3 py-2 border border-gray-300 rounded-lg"
                      />
                      <button
                        onClick={()=>performSearch(openQuickIndex,false)}
                        disabled={searchLoading}
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-60"
                      >{searchLoading? 'Searching…' : 'Search'}</button>
                      <label className="ml-2 inline-flex items-center gap-2 text-sm text-gray-700">
                        <input type="checkbox" checked={pricedOnly} onChange={(e)=>{ setPricedOnly(e.target.checked); performSearch(openQuickIndex,false) }} />
                        Priced only
                      </label>
                    </div>
                  </div>
                  <button onClick={() => setOpenQuickIndex(null)} className="text-sm text-gray-600 hover:text-gray-900">Close</button>
                </div>
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                  {(() => { const current = pricingDetails[openQuickIndex]!; return (current.topCandidates || []).map((c: any, j: number) => (
                    <div key={`modal_cand_${openQuickIndex}_${j}`} className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3 min-w-0">
                        {c.image && <img src={c.image} alt="" className="w-12 h-12 object-cover rounded" />}
                        <div className="min-w-0">
                          <div className="text-gray-900 text-base truncate">{highlightMatch(c.description || 'Product', normalizedTokens(searchQuery || current.name))}</div>
                          <div className="text-xs text-gray-500 truncate">{c.size || ''} {c.category ? `• ${c.category}` : ''}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {c.storeName && (
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 border border-gray-200" title="Store providing this price">{c.storeName}</span>
                        )}
                        <div className="text-base font-medium text-gray-900">{(c.price || 0) > 0 ? `$${(c.price || 0).toFixed(2)}` : 'Not priced'}</div>
                        <button onClick={() => useCandidate(openQuickIndex!, c)} className="px-4 py-2 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700">Use this</button>
                      </div>
                    </div>
                  )) })()}
                  {(() => { const current = pricingDetails[openQuickIndex]!; return (!current.topCandidates || current.topCandidates.length === 0) })() && (
                    <div className="text-sm text-gray-700">Fetching alternatives…</div>
                  )}
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={()=>performSearch(openQuickIndex,true)}
                    disabled={searchLoading}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-60"
                  >{searchLoading ? 'Loading…' : 'Load more'}</button>
                </div>
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
              {activeTab === 'scaling' && (
                pricingDetails.length > 0 ? (
                  <PricingPanel
                    items={pricingDetails.map((row, i) => ({
                      id: i,
                      original: `${recipe.ingredients[i]?.amount ?? ''} ${recipe.ingredients[i]?.unit ?? ''} ${recipe.ingredients[i]?.name ?? row.name}`.trim(),
                      matched: row.product?.description || 'No match found',
                      priceLabel: (() => {
                        const p = row.product?.items?.find((it:any)=>it?.price?.promo || it?.price?.regular)?.price
                        const price = p?.promo ?? p?.regular
                        if (typeof price === 'number' && row.packageSize) return `$${price.toFixed(2)} per ${row.packageSize}`
                        return undefined
                      })(),
                      estimatedCost: row.estimatedCost || 0,
                      needsReview: (row.confidence ?? 1) < 0.5 || !row.product,
                      confidence: row.confidence ?? 1,
                      packages: row.packages,
                      packageSize: row.packageSize,
                      portionCost: row.portionCost,
                      packagePrice: row.packagePrice,
                    }))}
                    totalEstimated={pricingDetails.reduce((s, r) => s + (r.estimatedCost || 0), 0)}
                    onReview={(idx) => fetchAlternativesFor(idx)}
                    onSearch={(idx) => fetchAlternativesFor(idx)}
                  />
                ) : (
                  <RecipeScaling recipe={recipe} />
                )
              )}
              {activeTab === 'reviews' && renderReviewsTab()}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
