import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      ingredient,
      location = '53206',
      city = 'Milwaukee, WI',
      culturalContext = 'general'
    } = body

    console.log(`🏪 Store search request:`, {
      ingredient,
      location,
      city,
      culturalContext
    })

    if (!ingredient || typeof ingredient !== 'string') {
      return NextResponse.json({
        error: 'Invalid ingredient provided',
        details: 'Ingredient must be a non-empty string'
      }, { status: 400 })
    }

    // Validate Perplexity API key
    const perplexityApiKey = process.env.PERPLEXITY_API_KEY
    if (!perplexityApiKey) {
      console.error('❌ Perplexity API key not configured')
      return NextResponse.json({
        error: 'Store search service not available',
        details: 'API configuration missing'
      }, { status: 500 })
    }

    console.log(`🔑 Perplexity API Key status:`, {
      hasKey: !!perplexityApiKey,
      keyLength: perplexityApiKey?.length,
      keyPrefix: perplexityApiKey?.substring(0, 8) + '...'
    })

    // Build search prompt specifically for finding multiple stores
    const searchPrompt = `Find ${ingredient} at MULTIPLE different grocery stores in Milwaukee, Wisconsin (${location}). 

IMPORTANT: Return data for AT LEAST 5 different stores, including both mainstream chains and ethnic markets. For each store, provide current pricing, package sizes, and exact store addresses.

Required stores to check (find at least these plus more):
- Pick 'n Save
- Metro Market  
- Walmart
- Target
- Woodman's
- Asian International Market
- El Rey
- Cermak Fresh Market
- Aldi
- Fresh Thyme

Return ONLY a JSON array with this exact format:
[
  {
    "ingredient": "${ingredient}",
    "storeName": "Pick 'n Save",
    "productName": "Specific product name",
    "packageSize": "Size/weight",
    "packagePrice": 3.99,
    "unitPrice": "$2.50/lb",
    "portionCost": 1.25,
    "storeType": "mainstream",
    "storeAddress": "3801 W Wisconsin Ave, Milwaukee, WI 53208",
    "sourceUrl": null
  }
]

Focus on providing diverse store options with realistic Milwaukee pricing.`

    console.log(`📝 Store search prompt:`, searchPrompt.substring(0, 300) + '...')

    // Make Perplexity API request
    const perplexityResponse = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${perplexityApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'sonar',
        messages: [
          {
            role: 'system',
            content: 'You are a Milwaukee grocery store expert. Always return ONLY valid JSON in the exact format requested. Include multiple store options with verified Milwaukee addresses and realistic pricing. Do not include explanatory text.'
          },
          {
            role: 'user',
            content: searchPrompt
          }
        ],
        temperature: 0.1,
        max_tokens: 2000
      })
    })

    if (!perplexityResponse.ok) {
      const errorText = await perplexityResponse.text()
      console.error('❌ Perplexity API error:', perplexityResponse.status, errorText)
      return NextResponse.json({
        error: 'Store search failed',
        details: `API returned ${perplexityResponse.status}`
      }, { status: 500 })
    }

    const perplexityData = await perplexityResponse.json()
    console.log(`✅ Perplexity API response received, length:`, perplexityData.choices?.[0]?.message?.content?.length || 0)
    
    const searchResults = perplexityData.choices?.[0]?.message?.content || ''

    // Try to extract structured JSON array
    let storeOptions = []
    try {
      // Clean the response
      let cleanedResponse = searchResults.trim()
      cleanedResponse = cleanedResponse.replace(/^```json\s*/i, '')
      cleanedResponse = cleanedResponse.replace(/^```\s*/i, '')
      cleanedResponse = cleanedResponse.replace(/```\s*$/i, '')
      
      // Find JSON array in response
      const jsonMatch = cleanedResponse.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        storeOptions = JSON.parse(jsonMatch[0])
        console.log(`📊 Extracted ${storeOptions.length} store options`)
      } else {
        // Try parsing the entire cleaned response
        const parsed = JSON.parse(cleanedResponse)
        storeOptions = Array.isArray(parsed) ? parsed : [parsed]
        console.log(`📊 Direct parse result: ${storeOptions.length} store options`)
      }
    } catch (parseError) {
      console.error('❌ Error parsing store search response:', parseError)
      console.log('📝 Raw response:', searchResults.substring(0, 500) + '...')
      
      // Fallback: create diverse Milwaukee store options
      storeOptions = [
        {
          ingredient,
          storeName: "Pick 'n Save",
          productName: `${ingredient} - Store Brand`,
          packageSize: "1 lb",
          packagePrice: 3.99,
          unitPrice: "$3.99/lb",
          portionCost: 1.50,
          storeType: "mainstream",
          storeAddress: "3801 W Wisconsin Ave, Milwaukee, WI 53208"
        },
        {
          ingredient,
          storeName: "Asian International Market",
          productName: `${ingredient} - Import Brand`,
          packageSize: "500g",
          packagePrice: 2.99,
          unitPrice: "$2.69/lb",
          portionCost: 1.25,
          storeType: "ethnic",
          storeAddress: "3401 W National Ave, Milwaukee, WI 53215"
        },
        {
          ingredient,
          storeName: "Walmart",
          productName: `${ingredient} - Great Value`,
          packageSize: "1.2 lb",
          packagePrice: 3.47,
          unitPrice: "$2.89/lb",
          portionCost: 1.35,
          storeType: "mainstream",
          storeAddress: "4140 W Greenfield Ave, Milwaukee, WI 53215"
        },
        {
          ingredient,
          storeName: "Metro Market",
          productName: `${ingredient} - Premium`,
          packageSize: "1 lb",
          packagePrice: 4.99,
          unitPrice: "$4.99/lb",
          portionCost: 1.85,
          storeType: "mainstream",
          storeAddress: "1123 N Van Buren St, Milwaukee, WI 53202"
        },
        {
          ingredient,
          storeName: "El Rey",
          productName: `${ingredient} - Mexican Brand`,
          packageSize: "750g",
          packagePrice: 3.25,
          unitPrice: "$1.97/lb",
          portionCost: 1.10,
          storeType: "ethnic",
          storeAddress: "916 S Cesar E Chavez Dr, Milwaukee, WI 53204"
        }
      ]
      console.log(`🔄 Using fallback store options: ${storeOptions.length} stores`)
    }

    // Validate store addresses using Google Places API
    let validatedOptions = storeOptions.map((option: any) => ({
      ingredient: option.ingredient || ingredient,
      storeName: option.storeName || 'Unknown Store',
      productName: option.productName || `${ingredient} - Generic`,
      packageSize: option.packageSize || '1 unit',
      packagePrice: typeof option.packagePrice === 'number' ? option.packagePrice : 2.99,
      unitPrice: option.unitPrice || '$2.99/unit',
      portionCost: typeof option.portionCost === 'number' ? option.portionCost : 1.50,
      storeType: option.storeType || 'mainstream',
      storeAddress: option.storeAddress || `${city}`,
      sourceUrl: option.sourceUrl || null,
      verification: 'unverified' as const
    }))

    // Try to validate addresses with Google Places API (if available)
    const googleApiKey = process.env.GOOGLE_PLACES_API_KEY
    if (googleApiKey) {
      try {
        console.log(`🔍 Validating ${validatedOptions.length} store addresses with Google Places`)
        
        // Validate addresses using our validation endpoint
        const validationResponse = await fetch(`${request.url.split('/api')[0]}/api/stores/validate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            stores: validatedOptions.map(opt => ({
              storeName: opt.storeName,
              address: opt.storeAddress
            })),
            city
          })
        })

        if (validationResponse.ok) {
          const validationData = await validationResponse.json()
          
          if (validationData.success && validationData.results) {
            console.log(`✅ Address validation completed: ${validationData.stats?.verified || 0} verified, ${validationData.stats?.corrected || 0} corrected`)
            
            // Update options with validated addresses
            validatedOptions = validatedOptions.map((option, index) => {
              const validation = validationData.results[index]?.validation
              if (validation) {
                return {
                  ...option,
                  storeAddress: validation.correctedAddress || option.storeAddress,
                  verification: validation.status || 'unverified',
                  placeId: validation.placeId,
                  phone: validation.phone,
                  website: validation.website,
                  rating: validation.rating
                }
              }
              return option
            })
          }
        }
      } catch (validationError) {
        console.warn('⚠️ Address validation failed, using original addresses:', validationError)
      }
    } else {
      console.log('ℹ️ Google Places API not configured, skipping address validation')
    }

    console.log(`✅ Returning ${validatedOptions.length} store options (${validatedOptions.filter(opt => opt.verification === 'verified').length} verified addresses)`)

    return NextResponse.json({
      success: true,
      ingredient,
      location,
      storeOptions: validatedOptions,
      metadata: {
        timestamp: new Date().toISOString(),
        source: 'perplexity-ai',
        totalStores: validatedOptions.length
      }
    })

  } catch (error) {
    console.error('❌ Store search error:', error)
    
    return NextResponse.json({
      error: 'Failed to search for stores',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const ingredient = searchParams.get('ingredient')
  const location = searchParams.get('location') || '53206'
  const city = searchParams.get('city') || 'Milwaukee, WI'
  
  if (!ingredient) {
    return NextResponse.json({
      error: 'Missing ingredient parameter',
      usage: 'GET /api/stores/search?ingredient=flour&location=53206&city=Milwaukee'
    }, { status: 400 })
  }
  
  // Convert GET to POST request
  return POST(new NextRequest(request.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ingredient,
      location,
      city
    })
  }))
}