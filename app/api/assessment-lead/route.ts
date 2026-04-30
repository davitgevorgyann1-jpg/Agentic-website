import { NextResponse } from 'next/server'

/**
 * /api/assessment-lead
 *
 * Receives a completed assessment + lead context and:
 *   1. Logs the lead (always — visible in Vercel function logs)
 *   2. If RESEND_API_KEY env var is set, also emails NOTIFICATION_EMAIL
 *      with the lead details. Reply-to is the lead's email, so hitting
 *      Reply in the inbox sends straight to them.
 *
 * SETUP (one-time, in Vercel dashboard → project → Environment Variables):
 *   RESEND_API_KEY      = (from resend.com — free tier, 100 emails/mo)
 *   NOTIFICATION_EMAIL  = davit.gevorgyann1@gmail.com
 *
 * The Resend "onboarding@resend.dev" sender works without domain
 * verification. To send from leads@davitgevorgyan.com later, verify the
 * domain in Resend (DNS records) and update FROM_ADDRESS below.
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

async function sendNotification(payload: AssessmentLeadPayload): Promise<void> {
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

    // 2. Try to send email notification (no-op if env vars missing)
    try {
      await sendNotification(payload)
    } catch (err) {
      // Log but don't fail the request — the lead is already captured in logs
      console.error('[assessment-lead] notification failed:', err)
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[assessment-lead] error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
