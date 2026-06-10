import { createClient } from '@supabase/supabase-js'

function getClient() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export type SubscriptionTier = 'pro' | 'elite'

export async function getSubscription(email: string): Promise<SubscriptionTier | null> {
  const { data } = await getClient()
    .from('subscribers')
    .select('tier')
    .eq('email', email)
    .eq('status', 'active')
    .single()
  return data ? (data.tier as SubscriptionTier) : null
}

export async function saveSubscriber(params: {
  email: string
  stripeCustomerId: string
  stripeSubscriptionId: string
  tier: SubscriptionTier
}): Promise<void> {
  await getClient().from('subscribers').upsert({
    email: params.email,
    stripe_customer_id: params.stripeCustomerId,
    stripe_subscription_id: params.stripeSubscriptionId,
    tier: params.tier,
    status: 'active',
    updated_at: new Date().toISOString(),
  })
}

export async function cancelSubscriber(stripeSubscriptionId: string): Promise<void> {
  await getClient()
    .from('subscribers')
    .update({ status: 'cancelled', updated_at: new Date().toISOString() })
    .eq('stripe_subscription_id', stripeSubscriptionId)
}

export interface VideoSubmission {
  id: string
  email: string
  player_tag: string
  player_name: string
  video_url: string
  status: string
  created_at: string
}

export interface VideoComment {
  id: string
  submission_id: string
  timestamp_seconds: number
  comment: string
  created_at: string
}

export async function createVideoSubmission(params: {
  email: string
  playerTag: string
  playerName: string
  videoUrl: string
}): Promise<string> {
  const { data } = await getClient()
    .from('video_submissions')
    .insert({
      email: params.email,
      player_tag: params.playerTag,
      player_name: params.playerName,
      video_url: params.videoUrl,
      status: 'pending',
    })
    .select('id')
    .single()
  return data!.id
}

export async function getAllSubmissions(): Promise<VideoSubmission[]> {
  const { data } = await getClient()
    .from('video_submissions')
    .select('*')
    .order('created_at', { ascending: false })
  return data ?? []
}

export async function getSubmission(id: string): Promise<VideoSubmission | null> {
  const { data } = await getClient()
    .from('video_submissions')
    .select('*')
    .eq('id', id)
    .single()
  return data
}

export async function getComments(submissionId: string): Promise<VideoComment[]> {
  const { data } = await getClient()
    .from('video_comments')
    .select('*')
    .eq('submission_id', submissionId)
    .order('timestamp_seconds', { ascending: true })
  return data ?? []
}

export async function addComment(params: {
  submissionId: string
  timestampSeconds: number
  comment: string
}): Promise<void> {
  await getClient().from('video_comments').insert({
    submission_id: params.submissionId,
    timestamp_seconds: params.timestampSeconds,
    comment: params.comment,
  })
}

export async function markSubmissionReviewed(id: string): Promise<void> {
  await getClient()
    .from('video_submissions')
    .update({ status: 'reviewed' })
    .eq('id', id)
}

export async function uploadVideo(file: Buffer, filename: string): Promise<string> {
  const { data } = await getClient()
    .storage
    .from('videos')
    .upload(filename, file, { contentType: 'video/mp4', upsert: false })
  if (!data) throw new Error('Upload failed')
  const { data: urlData } = getClient().storage.from('videos').getPublicUrl(data.path)
  return urlData.publicUrl
}
