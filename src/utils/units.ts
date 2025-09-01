export type Unit =
  | 'tsp'
  | 'tbsp'
  | 'cup'
  | 'oz'      // ounce (weight)
  | 'fl_oz'   // fluid ounce (volume)
  | 'g'
  | 'kg'
  | 'lb'
  | 'ml'
  | 'l'
  | 'each'

const unitAliases: Record<string, Unit> = {
  teaspoon: 'tsp', teaspoons: 'tsp', tsp: 'tsp',
  tablespoon: 'tbsp', tablespoons: 'tbsp', tbsp: 'tbsp',
  cup: 'cup', cups: 'cup',
  ounce: 'oz', ounces: 'oz', oz: 'oz',
  'fl oz': 'fl_oz', floz: 'fl_oz', 'fluid ounce': 'fl_oz', 'fluid ounces': 'fl_oz',
  gram: 'g', grams: 'g', g: 'g',
  kilogram: 'kg', kilograms: 'kg', kg: 'kg',
  pound: 'lb', pounds: 'lb', lb: 'lb', lbs: 'lb',
  milliliter: 'ml', milliliters: 'ml', ml: 'ml',
  liter: 'l', liters: 'l', l: 'l',
  each: 'each', unit: 'each', piece: 'each', ct: 'each', count: 'each'
}

export function normalizeUnit(u?: string | null): Unit | undefined {
  if (!u) return undefined
  const key = String(u).toLowerCase().trim()
  return unitAliases[key] as Unit | undefined
}

// Base to grams (weight) or ml (volume). For fl_oz and volume units we use water density (1 g/ml) as an approximation
const unitToGrams: Partial<Record<Unit, number>> = {
  tsp: 4.2,
  tbsp: 12.6,
  cup: 201.6,
  oz: 28.3495,
  fl_oz: 29.5735, // approximated as grams via water density
  g: 1,
  kg: 1000,
  lb: 453.592,
  ml: 1,
  l: 1000,
}

export function convert(amount: number, from: Unit, to: Unit): number {
  if (from === to) return amount
  const fromF = unitToGrams[from]
  const toF = unitToGrams[to]
  if (fromF == null || toF == null) return amount // unknown mapping; return passthrough
  const grams = amount * fromF
  return grams / toF
}

export function parsePackSize(size?: string | null): { qty: number; unit: Unit } | null {
  if (!size) return null
  const s = String(size).toLowerCase()
  const m = s.match(/([\d.]+)\s*(fl\s*oz|floz|oz|ounce|ounces|lb|pound|g|gram|kg|kilogram|ml|milliliter|l|liter|ct|count|each)/i)
  if (!m) return null
  const qty = parseFloat(m[1]!)
  const rawUnit = m[2]?.toLowerCase()
  let unit: Unit | undefined
  if (rawUnit === 'fl oz' || rawUnit === 'floz') unit = 'fl_oz'
  else unit = normalizeUnit(rawUnit)
  if (!unit) return null
  // Normalise count/each to 'each' with qty in pieces
  if (unit === 'each') return { qty: Math.max(1, qty), unit: 'each' }
  return { qty, unit }
}

export function estimatePacksNeeded(quantity: number, unit: Unit, packSize: number, packUnit: Unit): number {
  // Each-count packs: assume packSize is pieces; need ceil(quantity/packSize)
  if (packUnit === 'each') {
    const pieces = Math.max(1, Math.ceil(quantity))
    const perPack = Math.max(1, Math.ceil(packSize))
    return Math.max(1, Math.ceil(pieces / perPack))
  }
  // Convert requested quantity to grams baseline and compute packs
  const neededG = convert(quantity, unit, 'g')
  const packG = convert(packSize, packUnit, 'g')
  if (!isFinite(neededG) || !isFinite(packG) || packG <= 0) return 1
  return Math.max(1, Math.ceil(neededG / packG))
}

export function estimateIngredientCost(params: {
  quantity: number
  unit: string
  packSize: number
  packUnit: string
  packPrice: number
}): { packsNeeded: number; estimatedCost: number } {
  const unit = normalizeUnit(params.unit) ?? 'each'
  const pUnit = normalizeUnit(params.packUnit) ?? 'each'
  const packsNeeded = estimatePacksNeeded(params.quantity, unit, params.packSize, pUnit)
  const estimatedCost = packsNeeded * Math.max(0, params.packPrice || 0)
  return { packsNeeded, estimatedCost }
}

