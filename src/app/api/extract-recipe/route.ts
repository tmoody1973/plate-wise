import { NextRequest, NextResponse } from 'next/server'

function absolutize(url: string, base: string): string | null {
  try { return new URL(url, base).toString() } catch { return null }
}

function extractFromJsonLd(html: string, baseUrl: string): string[] {
  const out: string[] = []
  const scripts = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
  for (const m of scripts) {
    const json = (m[1] || '').trim()
    try {
      const data = JSON.parse(json)
      const nodes: any[] = Array.isArray(data) ? data : (data?.['@graph'] && Array.isArray(data['@graph']) ? data['@graph'] : [data])
      for (const node of nodes) {
        const t = node?.['@type']
        const types = (Array.isArray(t) ? t : [t]).filter(Boolean).map((x: any) => String(x).toLowerCase())
        if (types.includes('recipe')) {
          const img = node?.image
          if (typeof img === 'string') {
            const abs = absolutize(img, baseUrl); if (abs) out.push(abs)
          } else if (Array.isArray(img)) {
            for (const it of img) {
              if (typeof it === 'string') { const abs = absolutize(it, baseUrl); if (abs) out.push(abs) }
              else if (it && typeof it === 'object' && typeof it.url === 'string') { const abs = absolutize(it.url, baseUrl); if (abs) out.push(abs) }
            }
          } else if (img && typeof img === 'object' && typeof img.url === 'string') {
            const abs = absolutize(img.url, baseUrl); if (abs) out.push(abs)
          }
        }
      }
    } catch {}
  }
  return out
}

function extractMetaContent(html: string, re: RegExp, baseUrl: string): string[] {
  const out: string[] = []
  const m1 = html.match(re)
  if (m1 && m1[1]) { const abs = absolutize(m1[1], baseUrl); if (abs) out.push(abs) }
  return out
}

function extractFromArticleImages(html: string, baseUrl: string): string[] {
  const out: string[] = []
  const body = html.slice(html.toLowerCase().indexOf('<body'))
  const imgRe = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi
  let m: RegExpExecArray | null
  while ((m = imgRe.exec(body)) !== null) {
    const src = m[1]
    const abs = absolutize(src, baseUrl)
    if (abs) out.push(abs)
    if (out.length > 10) break
  }
  return out
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const pageUrl = String(body?.url || '')
    if (!pageUrl) return NextResponse.json({ error: 'Missing url' }, { status: 400 })
    let u: URL
    try { u = new URL(pageUrl) } catch { return NextResponse.json({ error: 'Invalid url' }, { status: 400 }) }
    if (!/^https?:$/.test(u.protocol)) return NextResponse.json({ error: 'Unsupported protocol' }, { status: 400 })

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)
    const res = await fetch(pageUrl, {
      headers: {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/537.36 Chrome/123 Safari/537.36',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      cache: 'no-store',
      redirect: 'follow',
      signal: controller.signal,
    } as RequestInit).finally(() => clearTimeout(timeout))
    if (!res.ok) return NextResponse.json({ error: `Fetch failed: ${res.status}` }, { status: 502 })
    const html = await res.text()

    const images = [
      ...extractFromJsonLd(html, pageUrl),
      // og:image (any attribute order)
      ...extractMetaContent(html, /<meta[^>]+property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i, pageUrl),
      ...extractMetaContent(html, /<meta[^>]+content=["']([^"']+)["'][^>]*property=["']og:image["'][^>]*>/i, pageUrl),
      // twitter:image
      ...extractMetaContent(html, /<meta[^>]+name=["']twitter:image["'][^>]*content=["']([^"']+)["'][^>]*>/i, pageUrl),
      ...extractMetaContent(html, /<meta[^>]+content=["']([^"']+)["'][^>]*name=["']twitter:image["'][^>]*>/i, pageUrl),
      // link rel=image_src
      ...extractMetaContent(html, /<link[^>]+rel=["']image_src["'][^>]+href=["']([^"']+)["'][^>]*>/i, pageUrl),
      // fallback imgs
      ...extractFromArticleImages(html, pageUrl),
    ].filter(Boolean)

    const unique = Array.from(new Set(images)).filter(u => u.startsWith('http'))
    return NextResponse.json({ images: unique })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'failed' }, { status: 500 })
  }
}

