import { NextRequest, NextResponse } from 'next/server'
import { getSubscription, createVideoSubmission, uploadVideo } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const email = formData.get('email') as string
  const playerTag = formData.get('playerTag') as string
  const playerName = formData.get('playerName') as string
  const file = formData.get('video') as File

  if (!email || !playerTag || !playerName || !file) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const isOwner = email === process.env.OWNER_EMAIL
  const tier = isOwner ? 'elite' : await getSubscription(email)
  if (tier !== 'elite') {
    return NextResponse.json({ error: 'Elite subscription required' }, { status: 403 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const filename = `${Date.now()}-${playerTag.replace('#', '')}.mp4`
  const videoUrl = await uploadVideo(buffer, filename)

  const id = await createVideoSubmission({ email, playerTag, playerName, videoUrl })
  return NextResponse.json({ id })
}
