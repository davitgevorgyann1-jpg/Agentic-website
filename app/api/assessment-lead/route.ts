import { NextResponse } from 'next/server'

/**
 * /api/assessment-lead
 *
 * Receives a completed assessment + lead context and:
 *   1. Logs the lead (always — visible in Vercel function logs)
 *   2. If TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID env vars are set,
 *      sends a push notification to that Telegram chat.
 *   3. If RESEND_API_KEY + NOTIFICATION_EMAIL env vars are set, also
 *      emails the lead details with reply-to set to the lead's email.
 *
 * Each notification channel is independent — set one, both, or neither.
 *
 * ─── TELEGRAM SETUP (recommended, ~5 minutes) ─────────────────────────
 *   1. In Telegram, message @BotFather: /newbot
 *      Give it a name + handle. BotFather replies with a bot token.
 *   2. Search for your new bot, open the chat, hit "Start".
 *   3. Get your chat ID: message @userinfobot — it replies with your ID.
 *   4. In Vercel → Environment Variables, add:
 *        TELEGRAM_BOT_TOKEN = (the token from step 1)
 *        TELEGRAM_CHAT_ID   = (your numeric ID from step 3)
 *
 * ─── EMAIL (RESEND) SETUP (optional) ──────────────────────────────────
 *   1. Sign up at resend.com (free tier).
 *   2. Create an API key.
 *   3. In Vercel → Environment Variables, add:
 *        RESEND_API_KEY     = (the key)
 *        NOTIFICATION_EMAIL = davit.gevorgyann1@gmail.com
 *
 * The default Resend sender (onboarding@resend.dev) works without
 * domain verification. For leads@davitgevorgyan.com later, verify the
 * domain in Resend and update FROM_ADDRESS below.
 */

const FROM_ADDRESS = 'Davit Gevorgyan Leads <onboarding@resend.dev>'

interface AssessmentLeadPayload {
  email: string
  websiteUrl?: string
  role: string
  companyStage: string
  note?: string
  scores: {
    overall: number
    strategy: number
    operations: number
    alignment: number
  }
  answers: Record<string, number>
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function formatLeadEmailBody(p: AssessmentLeadPayload): string {
  const pad = (n: number) => `${n}%`.padEnd(5)
  const lines = [
    `Score: ${p.scores.overall}/100`,
    ``,
    `  Strategy:    ${pad(p.scores.strategy)}`,
    `  Operations:  ${pad(p.scores.operations)}`,
    `  Alignment:   ${pad(p.scores.alignment)}`,
    ``,
    `─────────────────────────────────────────────`,
    ``,
    `Email:    ${p.email}`,
    `Website:  ${p.websiteUrl || '(not provided)'}`,
    `Role:     ${p.role}`,
    `Stage:    ${p.companyStage}`,
    ``,
    `Note from them:`,
    p.note ? p.note : '(no note)',
    ``,
    `─────────────────────────────────────────────`,
    ``,
    `Reply directly to this email to respond — it goes straight to them.`,
  ]
  return lines.join('\n')
}

async function sendEmailNotification(payload: AssessmentLeadPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const recipient = process.env.NOTIFICATION_EMAIL

  if (!apiKey || !recipient) {
    // Graceful degradation: route still succeeds, just no email sent.
    return
  }

  const subject = `Assessment lead — ${payload.email} (${payload.scores.overall}/100, ${payload.role})`
  const text = formatLeadEmailBody(payload)

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: recipient,
      reply_to: payload.email,
      subject,
      text,
    }),
  })

  if (!res.ok) {
    const errBody = await res.text().catch(() => '(no body)')
    console.error('[assessment-lead] resend error:', res.status, errBody)
  }
}

// Escape characters that would break Telegram's MarkdownV2 parsing.
function tgEscape(s: string): string {
  return s.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, (m) => `\\${m}`)
}

function formatTelegramMessage(p: AssessmentLeadPayload): string {
  const lines = [
    `🔔 *New assessment lead*`,
    ``,
    `*Score:* ${p.scores.overall}/100`,
    `_Strategy ${p.scores.strategy}% · Operations ${p.scores.operations}% · Alignment ${p.scores.alignment}%_`,
    ``,
    `📧 ${tgEscape(p.email)}`,
    `🌐 ${p.websiteUrl ? tgEscape(p.websiteUrl) : '_not provided_'}`,
    `👤 ${tgEscape(p.role)}`,
    `🏢 ${tgEscape(p.companyStage)}`,
  ]
  if (p.note) {
    lines.push('', `_Note:_ ${tgEscape(p.note)}`)
  }
  return lines.join('\n')
}

async function sendTelegramNotification(payload: AssessmentLeadPayload): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    // Graceful degradation: route still succeeds, just no telegram push sent.
    return
  }

  const text = formatTelegramMessage(payload)

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'MarkdownV2',
      disable_web_page_preview: true,
    }),
  })

  if (!res.ok) {
    const errBody = await res.text().catch(() => '(no body)')
    console.error('[assessment-lead] telegram error:', res.status, errBody)
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<AssessmentLeadPayload>
    const email = (body.email ?? '').trim()
    const websiteUrl = (body.websiteUrl ?? '').trim()
    const role = (body.role ?? '').trim()
    const companyStage = (body.companyStage ?? '').trim()
    const note = (body.note ?? '').trim()
    const scores = body.scores
    const answers = body.answers

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }
    if (!role) {
      return NextResponse.json({ error: 'Role is required' }, { status: 400 })
    }
    if (!companyStage) {
      return NextResponse.json({ error: 'Company stage is required' }, { status: 400 })
    }
    if (!scores || typeof scores.overall !== 'number') {
      return NextResponse.json({ error: 'Invalid scores' }, { status: 400 })
    }

    const payload: AssessmentLeadPayload = {
      email,
      websiteUrl: websiteUrl || undefined,
      role,
      companyStage,
      note: note || undefined,
      scores,
      answers: answers ?? {},
    }

    // 1. Always log (visible in Vercel function logs)
    console.log('[assessment-lead]', JSON.stringify({
      timestamp: new Date().toISOString(),
      ...payload,
    }))

    // 2. Fire all notification channels in parallel. Each is independently
    //    no-op when its env vars are missing. Failures in either don't
    //    fail the request — the lead is already captured in logs.
    await Promise.allSettled([
      sendTelegramNotification(payload),
      sendEmailNotification(payload),
    ])

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[assessment-lead] error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
