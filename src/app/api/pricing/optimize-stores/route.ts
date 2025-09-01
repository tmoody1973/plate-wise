import { NextRequest, NextResponse } from 'next/server'
import { shoppingOptimizer } from '@/lib/pricing/shopping-optimizer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      ingredients,
      preferredStore = "Pick 'n Save",
      location = '53206',
      existingPricingData
    } = body

    console.log(`🎯 Store optimization request:`, {
      ingredientCount: ingredients?.length || 0,
      preferredStore,
      location,
      hasExistingData: !!existingPricingData
    })

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return NextResponse.json({
        error: 'Invalid ingredients provided',
        details: 'Ingredients must be a non-empty array'
      }, { status: 400 })
    }

    // Validate ingredient format
    const validIngredients = ingredients.filter(ing => 
      ing && typeof ing.name === 'string' && ing.name.trim().length > 0
    ).map(ing => ({
      name: ing.name.trim(),
      amount: typeof ing.amount === 'number' ? ing.amount : 1,
      unit: typeof ing.unit === 'string' ? ing.unit : ''
    }))

    if (validIngredients.length === 0) {
      return NextResponse.json({
        error: 'No valid ingredients found',
        details: 'Each ingredient must have a name property'
      }, { status: 400 })
    }

    console.log(`📝 Processing ${validIngredients.length} valid ingredients`)

    // Run optimization
    const optimizedPlan = await shoppingOptimizer.optimizeForOneStore(
      validIngredients,
      preferredStore,
      location,
      existingPricingData
    )

    console.log(`✅ Optimization complete:`, {
      efficiency: optimizedPlan.efficiency,
      totalStores: optimizedPlan.totalStores,
      totalCost: optimizedPlan.totalCost,
      estimatedTime: optimizedPlan.estimatedTime
    })

    return NextResponse.json({
      success: true,
      plan: optimizedPlan,
      suggestions: shoppingOptimizer.suggestOptimalStrategy(
        validIngredients,
        location
      ),
      metadata: {
        processedIngredients: validIngredients.length,
        timestamp: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('❌ Store optimization error:', error)
    
    return NextResponse.json({
      error: 'Failed to optimize shopping plan',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const location = searchParams.get('location') || '53206'
  
  try {
    // Return available optimization strategies
    const mockIngredients = [
      { name: 'cabbage', amount: 3, unit: 'cups' },
      { name: 'bacon', amount: 0.25, unit: 'lb' }
    ]
    
    const strategies = shoppingOptimizer.suggestOptimalStrategy(
      mockIngredients,
      location
    )
    
    return NextResponse.json({
      success: true,
      strategies,
      availableStores: [
        "Pick 'n Save",
        "Metro Market", 
        "Asian International Market",
        "Aldi",
        "Walmart",
        "Woodman's Market"
      ],
      location
    })
    
  } catch (error) {
    console.error('❌ Error getting optimization strategies:', error)
    
    return NextResponse.json({
      error: 'Failed to get optimization strategies',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}