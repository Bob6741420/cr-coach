import { NextRequest, NextResponse } from 'next/server'
import { getAllSubmissions } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email')
  if (email !== process.env.OWNER_EMAIL) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const submissions = await getAllSubmissions()
  return NextResponse.json({ submissions })
}
