create table if not exists subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  stripe_customer_id text not null unique,
  stripe_subscription_id text not null unique,
  tier text not null default 'pro',
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists video_submissions (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  player_tag text not null,
  player_name text not null,
  video_url text not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists video_comments (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references video_submissions(id) on delete cascade,
  timestamp_seconds integer not null,
  comment text not null,
  created_at timestamptz not null default now()
);
