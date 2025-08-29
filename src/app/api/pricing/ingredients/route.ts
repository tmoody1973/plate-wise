import { NextRequest, NextResponse } from 'next/server'
import { getKrogerAccessToken } from '@/lib/external-apis/kroger-oauth'
import { buildSearchTerms, classifyCategory, scoreProductDetailed, type IngredientInput } from '@/lib/external-apis/kroger-matching'
import { krogerService } from '@/lib/external-apis/kroger-service'

// moved to kroger-matching.ts

function normalizeUnit(u: string) {
  const s = u.toLowerCase()
  if (['g', 'gram', 'grams'].includes(s)) return 'g'
  if (['kg', 'kilogram', 'kilograms'].includes(s)) return 'kg'
  if (['lb', 'pound', 'pounds'].includes(s)) return 'lb'
  if (['oz', 'ounce', 'ounces'].includes(s)) return 'oz'
  if (['ml', 'milliliter', 'milliliters'].includes(s)) return 'ml'
  if (['l', 'liter', 'liters'].includes(s)) return 'l'
  if (['each', 'ea', 'unit', 'piece'].includes(s)) return 'each'
  return s
}

function parseSize(size?: string): { qty: number; unit: string } | null {
  if (!size) return null
  // Support fluid ounces as volume and ounces as weight
  const m = size.match(/([\d.]+)\s*(fl\s*oz|floz|oz|ounce|ounces|lb|pound|g|gram|kg|kilogram|ml|milliliter|l|liter|ct|count)/i)
  if (!m) return null
  const qty = parseFloat(m[1])
  const unit = m[2].toLowerCase()
  return { qty, unit }
}

function toGrams(qty: number, unit: string): number | null {
  switch (unit) {
    case 'g':
    case 'gram':
      return qty
    case 'kg':
    case 'kilogram':
      return qty * 1000
    case 'oz':
    case 'ounce':
    case 'ounces':
      return qty * 28.3495
    case 'lb':
    case 'pound':
      return qty * 453.592
    default:
      return null
  }
}

function toMilliliters(qty: number, unit: string): number | null {
  switch (unit) {
    case 'ml':
    case 'milliliter':
      return qty
    case 'l':
    case 'liter':
      return qty * 1000
    case 'fl oz':
    case 'floz':
      return qty * 29.5735
    case 'oz': // if ambiguous oz used for volume in size strings
      return qty * 29.5735
    default:
      return null
  }
}

// culinary volume helper for ingredient units
function toCulinaryMl(qty: number, unit: string): number | null {
  const u = unit.toLowerCase()
  switch (u) {
    case 'ml': case 'milliliter': return qty
    case 'l': case 'liter': return qty * 1000
    case 'cup': case 'cups': return qty * 240
    case 'tbsp': case 'tablespoon': case 'tablespoons': return qty * 15
    case 'tsp': case 'teaspoon': case 'teaspoons': return qty * 5
    case 'fl oz': case 'floz': return qty * 29.5735
    // sometimes recipes use 'oz' for fluid oz; assume volume
    case 'oz': return qty * 29.5735
    default: return null
  }
}

function toCulinaryGrams(qty: number, unit: string): number | null {
  const u = unit.toLowerCase()
  switch (u) {
    case 'g': case 'gram': case 'grams': return qty
    case 'kg': case 'kilogram': case 'kilograms': return qty * 1000
    case 'lb': case 'pound': case 'pounds': return qty * 453.592
    case 'oz': case 'ounce': case 'ounces': return qty * 28.3495
    default: return null
  }
}

function estimateCost(ing: IngredientInput, product: any, servings?: number): { unitPrice: number; estimatedCost: number; packages?: number; packageSize?: string } {
  const price = product?.items?.[0]?.price?.regular ?? product?.price?.regular ?? 0
  if (!price) return { unitPrice: 0, estimatedCost: 0 }

  const sizeInfo = parseSize(product?.items?.[0]?.size || product?.size)
  const unit = normalizeUnit(ing.unit)

  // Prefer package purchase logic when product comes in a package with known size
  if (sizeInfo) {
    const ps = sizeInfo
    // Try weight first
    const ingG = toCulinaryGrams(ing.amount, unit)
    const prodG = toGrams(ps.qty, ps.unit)
    if (ingG && prodG && prodG > 0) {
      const packages = Math.ceil(ingG / prodG)
      const estimatedCost = packages * price
      const unitPrice = price / prodG
      const label = `${ps.qty} ${ps.unit}`
      return { unitPrice, estimatedCost, packages, packageSize: label }
    }
    // Try volume next
    const ingMl = toCulinaryMl(ing.amount, unit)
    const prodMl = toMilliliters(ps.qty, ps.unit)
    if (ingMl && prodMl && prodMl > 0) {
      const packages = Math.ceil(ingMl / prodMl)
      const estimatedCost = packages * price
      const unitPrice = price / prodMl
      const label = `${ps.qty} ${ps.unit}`
      return { unitPrice, estimatedCost, packages, packageSize: label }
    }
    // Count-based packages (e.g., "1 ct")
    if (ps.unit === 'ct' || ps.unit === 'count') {
      // Heuristic: multi-serve items default to 1 package per recipe unless explicitly >1
      const isMultiServe = /\b(pie\s*(crust|shell)|pizza\s*(crust|dough))\b/i.test(ing.name)
      let reqPieces = Math.max(1, Math.ceil(ing.amount))
      if (isMultiServe && servings && reqPieces === servings) {
        // Common data quirk: amount equals servings; assume 1 package is intended
        reqPieces = 1
      }
      const perPack = Math.max(1, Math.ceil(ps.qty))
      const packages = Math.ceil(reqPieces / perPack)
      const estimatedCost = packages * price
      const unitPrice = price / perPack
      const label = `${ps.qty} ${ps.unit}`
      return { unitPrice, estimatedCost, packages, packageSize: label }
    }
  }

  // Fallback: treat as each/unit
  const qty = Math.max(1, Math.ceil(ing.amount))
  return { unitPrice: price, estimatedCost: price * qty, packages: qty, packageSize: 'each' }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const ingredients: IngredientInput[] = body?.ingredients || []
    const zip: string | undefined = body?.zip
    let locationId: string | undefined = body?.locationId
    const servings: number = body?.servings || 1
    const preferred: Array<{ name: string; productId: string }> = body?.preferredProductIds || []
    if (!ingredients.length) return NextResponse.json({ error: 'ingredients required' }, { status: 400 })

    const useMock = (process.env.NEXT_PUBLIC_KROGER_MOCK ?? 'true') !== 'false' || !process.env.KROGER_CLIENT_ID || !process.env.KROGER_CLIENT_SECRET

    // Mock fallback path (no credentials or explicitly enabled mock)
    if (useMock) {
      const perIngredient: Array<{ name: string; unitPrice: number; estimatedCost: number; product?: any; topCandidates?: any[]; confidence?: number; explain?: any }>
        = []
      let totalCost = 0
      for (const ing of ingredients) {
        // use krogerService mock products
        const products = await krogerService.searchProducts({ query: ing.name, limit: 3 })
        const product = products[0]
        const unitPrice = product?.price?.regular || 1
        const estimatedCost = unitPrice * Math.max(1, ing.amount)
        totalCost += estimatedCost
        perIngredient.push({
          name: ing.name,
          unitPrice,
          estimatedCost,
          product,
          topCandidates: products.slice(0, 3).map(p => ({
            productId: p.id,
            description: p.name,
            price: p.price?.regular || 1,
            image: p.images?.[0]?.url,
            category: p.categories?.[0],
            size: p.size,
            confidence: 0.9,
          })),
          confidence: 0.9,
          explain: { titleSim: 1, sizeProximity: 0.5, categoryMatched: true },
        })
      }
      const costPerServing = totalCost / Math.max(servings, 1)
      return NextResponse.json({ data: { perIngredient, totalCost, costPerServing, locationId: locationId || 'mock-location', storeName: 'Mock Kroger' } })
    }

    let token: string
    try {
      token = await getKrogerAccessToken()
    } catch (e: any) {
      return NextResponse.json({ error: `oauth_failed: ${e?.message || 'could not get token'}` }, { status: 502 })
    }

    // Resolve a default locationId from zip if missing
    let storeName: string | undefined
    if (!locationId && zip) {
      const locRes = await fetch(`https://api.kroger.com/v1/locations?filter.zipCode.near=${encodeURIComponent(zip)}&filter.limit=1`, {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      })
      if (locRes.ok) {
        const data = await locRes.json()
        const store = data?.data?.[0]
        if (store) {
          locationId = store.locationId
          storeName = store.name
        }
      } else {
        const text = await locRes.text().catch(() => '')
        return NextResponse.json({ error: `locations_failed: ${locRes.status} ${text?.slice(0,200)}` }, { status: 502 })
      }
    }

    const perIngredient: Array<{ name: string; unitPrice: number; estimatedCost: number; product?: any; topCandidates?: any[] }> = []
    let totalCost = 0

    for (const ing of ingredients) {
      // Preferred product path: fetch exact product by id if provided for this ingredient
      const pref = preferred.find(p => p?.name?.toLowerCase?.().trim() === ing.name.toLowerCase().trim() && p.productId)
      if (pref && pref.productId && locationId) {
        const url = `https://api.kroger.com/v1/products?filter.productId=${encodeURIComponent(pref.productId)}&filter.locationId=${encodeURIComponent(locationId)}&filter.limit=1`
        const resp = await fetch(url, { headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' } })
        if (resp.ok) {
          const data = await resp.json()
          const prod = data?.data?.[0]
          if (prod) {
      const { unitPrice, estimatedCost, packages, packageSize } = estimateCost(ing, prod, servings)
            totalCost += estimatedCost
            perIngredient.push({ name: ing.name, unitPrice, estimatedCost, product: prod, topCandidates: [], packages, packageSize })
            continue
          }
        }
      }
      // Multi-pass search with re-ranking
      const terms = buildSearchTerms(ing)
      const categoryHint = classifyCategory(ing.name)
      let candidates: any[] = []
      for (const t of terms) {
        const params = [
          `filter.term=${encodeURIComponent(t)}`,
          locationId ? `filter.locationId=${encodeURIComponent(locationId)}` : '',
          'filter.limit=20',
        ].filter(Boolean).join('&')
        const url = `https://api.kroger.com/v1/products?${params}`
        const resp = await fetch(url, { headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' } })
        if (resp.ok) {
          const data = await resp.json()
          const products = data?.data || []
          candidates.push(...products)
        }
        if (candidates.length >= 20) break
      }
      // Deduplicate candidates by productId
      const unique: Record<string, any> = {}
      for (const c of candidates) {
        const id = c?.productId || c?.upc || JSON.stringify(c).slice(0,50)
        if (!unique[id]) unique[id] = c
      }
      const uniqueList = Object.values(unique)
      let product: any | null = null
      if (uniqueList.length > 0) {
        const scored = uniqueList.map(p => ({ p, d: scoreProductDetailed(ing, p, categoryHint) }))
          .sort((a,b) => b.s - a.s)
        // patch: adapt accessors after change
        // Provide fallback for .s
        const withScores = scored.map(x => ({ p: x.p, s: (x as any).s ?? x.d.score, d: x.d }))
        withScores.sort((a,b)=> b.s - a.s)
        product = withScores[0]?.p || null
        const clamp = (x: number) => Math.max(0, Math.min(1, x))
        const top = withScores.slice(0,3).map(x => ({
          productId: x.p?.productId,
          description: x.p?.description || x.p?.items?.[0]?.description,
          price: x.p?.items?.[0]?.price?.promo ?? x.p?.items?.[0]?.price?.regular ?? 0,
          image: x.p?.images?.[0]?.sizes?.[0]?.url || x.p?.images?.[0]?.url,
          category: (x.p?.categories || [])[0],
          size: x.p?.items?.[0]?.size,
          confidence: clamp(x.s),
          signals: {
            titleSim: x.d.titleSim,
            sizeProximity: x.d.sizeProximity,
            categoryMatched: x.d.categoryMatched,
          }
        }))
        // attach top candidates for UI override later
        // will be added below when we push perIngredient entry
        var topCandidates = top
        var selectedConfidence = clamp(withScores[0]?.s || 0)
        var explain = {
          titleSim: withScores[0]?.d.titleSim,
          sizeProximity: withScores[0]?.d.sizeProximity,
          categoryMatched: withScores[0]?.d.categoryMatched,
          categoryHint,
          availability: withScores[0]?.d.availability,
          promo: withScores[0]?.d.promo,
          soupPenaltyApplied: withScores[0]?.d.soupPenaltyApplied,
          price: withScores[0]?.d.price,
        }
      }

      if (!product) {
        perIngredient.push({ name: ing.name, unitPrice: 0, estimatedCost: 0, topCandidates: [] })
        continue
      }

      const { unitPrice, estimatedCost, packages, packageSize } = estimateCost(ing, product, servings)
      totalCost += estimatedCost
      perIngredient.push({ name: ing.name, unitPrice, estimatedCost, product, topCandidates: (typeof topCandidates !== 'undefined' ? topCandidates : []), confidence: (typeof selectedConfidence !== 'undefined' ? selectedConfidence : 1), explain, packages, packageSize })
    }

    const costPerServing = totalCost / Math.max(servings, 1)
    return NextResponse.json({ data: { perIngredient, totalCost, costPerServing, locationId, storeName } })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'failed' }, { status: 500 })
  }
}
