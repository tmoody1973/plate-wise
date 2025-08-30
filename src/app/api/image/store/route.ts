import { NextRequest, NextResponse } from 'next/server'
import { createClient as createSbClient } from '@supabase/supabase-js'
import crypto from 'crypto'

export const runtime = 'nodejs'

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) throw new Error('Supabase not configured')
  return createSbClient(url, key)
}

async function loadBytes(url: string) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)
  const res = await fetch(url, {
    redirect: 'follow',
    headers: {
      'User-Agent': 'PlateWise-ImageStore/1.0',
      'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
      'Referer': `${new URL(url).origin}/`,
    } as any,
    signal: controller.signal,
  })
  clearTimeout(timeout)
  if (!res.ok) throw new Error(`fetch_failed_${res.status}`)
  const ct = (res.headers.get('content-type') || '').toLowerCase()
  if (!ct.startsWith('image/')) throw new Error('not_image')
  const lenHeader = res.headers.get('content-length')
  const MAX_BYTES = 15 * 1024 * 1024
  if (lenHeader && Number(lenHeader) > MAX_BYTES) throw new Error('too_large')
  const ab = await res.arrayBuffer()
  if (ab.byteLength > MAX_BYTES) throw new Error('too_large')
  return { bytes: Buffer.from(ab), type: ct }
}

async function maybeSharpResize(bytes: Buffer): Promise<{ out: Buffer; type: string } | null> {
  try {
    const sharp = (await import('sharp')).default
    const out = await sharp(bytes).resize({ width: 640, withoutEnlargement: true }).toFormat('webp', { quality: 82 }).toBuffer()
    return { out, type: 'image/webp' }
  } catch {
    return null
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({})) as { url?: string; bucket?: string; key?: string }
    const url = body.url?.trim()
    if (!url) return NextResponse.json({ error: 'url required' }, { status: 400 })
    const bucket = body.bucket || 'recipe-images'
    // We will compute content hash from bytes for dedupe

    const sb = getSupabase()
    try { await sb.storage.createBucket(bucket, { public: true }) } catch {}

    const { bytes, type } = await loadBytes(url)
    const contentHash = crypto.createHash('sha256').update(bytes).digest('hex')
    const key = body.key || `${contentHash}.webp`
    const resized = await maybeSharpResize(bytes)
    const uploadBytes = resized?.out || bytes
    const contentType = resized?.type || type

    // Delete if exists then upload
    // If file with same hash already exists, skip upload
    try {
      const { data: listed } = await sb.storage.from(bucket).list(undefined, { search: key })
      if (Array.isArray(listed) && listed.some(f => f.name === key)) {
        const { data } = sb.storage.from(bucket).getPublicUrl(key)
        return NextResponse.json({ ok: true, public_url: data.publicUrl, image_hash: contentHash, reused: true })
      }
    } catch {}

    await sb.storage.from(bucket).remove([key]).catch(() => {})
    const { error: upErr } = await sb.storage.from(bucket).upload(key, uploadBytes, { contentType, upsert: true })
    if (upErr) return NextResponse.json({ error: 'upload_failed', details: upErr.message }, { status: 500 })

    const { data } = sb.storage.from(bucket).getPublicUrl(key)
    return NextResponse.json({ ok: true, public_url: data.publicUrl, image_hash: contentHash, reused: false })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'failed' }, { status: 500 })
  }
}
