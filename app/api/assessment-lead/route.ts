import { NextResponse } from 'next/server'

/**
 * /api/assessment-lead
 *
 * Receives a completed assessment + lead context and stores it.
 * Currently logs to the Vercel function log (visible in the Vercel dashboard).
 *
 * To enable real email notifications:
 *   1. Add an env var (e.g. RESEND_API_KEY) in Vercel.
 *   2. Replace the `console.log` block below with the email-send call.
 *
 * Example with Resend (npm i resend):
 *   import { Resend } from 'resend'
 *   const resend = new Resend(process.env.RESEND_API_KEY)
 *   await resend.emails.send({
 *     from: 'leads@davitgevorgyan.com',
 *     to: 'davit.gevorgyann1@gmail.com',
 *     subject: `New assessment lead — ${email} (${role}, ${companyStage}, ${scores.overall}/100)`,
 *     text: JSON.stringify({ email, role, companyStage, note, scores, answers }, null, 2),
 *   })
 */

interface AssessmentLeadPayload {
  email: string
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

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<AssessmentLeadPayload>
    const email = (body.email ?? '').trim()
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

    // Log to Vercel function log — visible in the dashboard until email integration is wired.
    console.log('[assessment-lead]', JSON.stringify({
      timestamp: new Date().toISOString(),
      email,
      role,
      companyStage,
      note: note || null,
      scores,
      answers,
    }))

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[assessment-lead] error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
