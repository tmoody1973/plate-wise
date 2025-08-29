import { NextRequest, NextResponse } from 'next/server'
import { getKrogerAccessToken } from '@/lib/external-apis/kroger-oauth'
import { buildSearchTerms, classifyCategory, scoreProductDetailed } from '@/lib/external-apis/kroger-matching'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const name: string = body?.name
    const zip: string | undefined = body?.zip
    let locationId: string | undefined = body?.locationId
    if (!name) return NextResponse.json({ error: 'name required' }, { status: 400 })

    let token: string
    try {
      token = await getKrogerAccessToken()
    } catch (e: any) {
      return NextResponse.json({ error: `oauth_failed: ${e?.message || 'could not get token'}` }, { status: 502 })
    }

    // Resolve a default locationId from zip if missing
    if (!locationId && zip) {
      const locRes = await fetch(`https://api.kroger.com/v1/locations?filter.zipCode.near=${encodeURIComponent(zip)}&filter.limit=1`, {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      })
      if (locRes.ok) {
        const data = await locRes.json()
        const store = data?.data?.[0]
        if (store) {
          locationId = store.locationId
        }
      }
    }

    const terms = buildSearchTerms({ name, amount: 1, unit: 'each' })
    const categoryHint = classifyCategory(name)
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

    const unique: Record<string, any> = {}
    for (const c of candidates) {
      const id = c?.productId || c?.upc || JSON.stringify(c).slice(0,50)
      if (!unique[id]) unique[id] = c
    }
    const uniqueList = Object.values(unique)
    const scored = uniqueList.map(p => ({ p, d: scoreProductDetailed({ name, amount: 1, unit: 'each' }, p, categoryHint) }))
      .map(x => ({
        productId: x.p?.productId,
        description: x.p?.description || x.p?.items?.[0]?.description,
        price: x.p?.items?.[0]?.price?.promo ?? x.p?.items?.[0]?.price?.regular ?? 0,
        image: x.p?.images?.[0]?.sizes?.[0]?.url || x.p?.images?.[0]?.url,
        category: (x.p?.categories || [])[0],
        size: x.p?.items?.[0]?.size,
        confidence: Math.max(0, Math.min(1, x.d.score)),
        signals: { titleSim: x.d.titleSim, sizeProximity: x.d.sizeProximity, categoryMatched: x.d.categoryMatched },
      }))
      .sort((a,b) => b.confidence - a.confidence)

    return NextResponse.json({ data: { topCandidates: scored.slice(0,3) } })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'failed' }, { status: 500 })
  }
}

