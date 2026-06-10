import { NextRequest, NextResponse } from 'next/server'
import { addComment, getComments, markSubmissionReviewed } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email')
  const submissionId = req.nextUrl.searchParams.get('submissionId')
  if (email !== process.env.OWNER_EMAIL) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const comments = await getComments(submissionId!)
  return NextResponse.json({ comments })
}

export async function POST(req: NextRequest) {
  const { email, submissionId, timestampSeconds, comment, markDone } = await req.json()
  if (email !== process.env.OWNER_EMAIL) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (comment) {
    await addComment({ submissionId, timestampSeconds, comment })
  }
  if (markDone) {
    await markSubmissionReviewed(submissionId)
  }
  return NextResponse.json({ ok: true })
}
