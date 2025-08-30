import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { RecipesResponse } from '@/lib/recipes/schema'
import { recipesJsonSchema } from '@/lib/recipes/schema'
import { upsertRecipes } from '@/lib/recipes/db'

function stripCodeFences(s: string) {
  let t = (s || '').trim()
  t = t.replace(/^```json\s*/i, '')
  t = t.replace(/^```\s*/i, '')
  t = t.replace(/\s*```\s*$/i, '')
  return t
}

function tryExtractJsonObject(s: string): any | null {
  const text = s
  const len = text.length
  let start = -1
  for (let i = 0; i < len; i++) {
    const ch = text[i]
    if (ch === '{' || ch === '[') { start = i; break }
  }
  if (start === -1) return null
  let depth = 0
  let inStr = false
  let esc = false
  const open = text[start]
  const close = open === '{' ? '}' : ']'
  for (let i = start; i < len; i++) {
    const ch = text[i]
    if (inStr) {
      if (esc) { esc = false; continue }
      if (ch === '\\') { esc = true; continue }
      if (ch === '"') inStr = false
      continue
    } else {
      if (ch === '"') { inStr = true; continue }
      if (ch === open) depth++
      else if (ch === close) {
        depth--
        if (depth === 0) {
          const candidate = text.slice(start, i + 1)
          try { return JSON.parse(candidate) } catch { /* continue */ }
        }
      }
    }
  }
  return null
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const raw: string = body?.raw || ''
    if (!raw || typeof raw !== 'string') {
      return NextResponse.json({ error: 'raw text required' }, { status: 400 })
    }

    // First, try to parse/repair locally
    let text = stripCodeFences(raw)
    let json: any = null
    try { json = JSON.parse(text) } catch { json = tryExtractJsonObject(text) }

    // If still not valid, ask OpenAI to repair into our schema
    if (json == null) {
      const apiKey = process.env.OPENAI_API_KEY
      if (!apiKey) return NextResponse.json({ error: 'Missing OPENAI_API_KEY' }, { status: 500 })
      const client = new OpenAI({ apiKey })
      const instructions = 'Repair and return a single, strictly valid JSON object that conforms to the provided schema. Do not include any extra text.'
      const resp = await client.responses.create({
        model: process.env.OPENAI_RESPONSES_MODEL || 'gpt-5-nano',
        text: {
          format: {
            type: 'json_schema',
            name: (recipesJsonSchema as any).name,
            schema: (recipesJsonSchema as any).schema,
            strict: (recipesJsonSchema as any).strict,
          } as any,
          verbosity: 'low' as any,
        } as any,
        instructions,
        input: text,
        reasoning: { effort: 'low' } as any,
        parallel_tool_calls: false,
        max_output_tokens: 2200,
      } as any)
      const out = (resp as any).output_text
      if (!out) return NextResponse.json({ error: 'repair_failed' }, { status: 500 })
      try { json = JSON.parse(out) } catch { json = tryExtractJsonObject(out) }
      if (json == null) return NextResponse.json({ error: 'repair_unparseable' }, { status: 500 })
    }

    // Validate against Zod
    const parsed = RecipesResponse.safeParse(json)
    if (!parsed.success) {
      const issues = parsed.error.issues.slice(0, 5).map(i => `${i.path.join('.')}: ${i.message}`).join('; ')
      return NextResponse.json({ error: `schema_mismatch: ${issues}` }, { status: 422 })
    }
    const data = parsed.data

    // Upsert and return
    const { rows } = await upsertRecipes(data.recipes as any)
    return NextResponse.json({ ok: true, rows, results: data })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'failed' }, { status: 500 })
  }
}

