# Product Definition

## What Is It

A personalized Clash Royale stats dashboard. Players enter their in-game tag and get a clean, visual breakdown of their actual performance — what they're winning with, what's beating them, and how they're trending over time. Not generic tips: their real numbers, displayed in a way that feels built just for them.

## Target Audience

Casual Clash Royale players (roughly Trophy Road 3000–7000) who want to understand their own game better without wading through raw data on RoyaleAPI.

## Core Value Proposition

"Your stats, actually explained."

## Differentiator vs RoyaleAPI

RoyaleAPI shows raw data. This shows *what it means* — win rates by deck type, which card archetypes are beating you, whether you're improving week over week — in a clean, personal layout that feels like it was made for that specific player.

## Phases

### Phase 1 — MVP (Build This First)
- Player enters their in-game tag
- App fetches their battle history from the Clash Royale API
- Shows a personalized dashboard:
  - Win/loss record and win rate
  - Most-played decks and win rate per deck
  - Top 3 deck archetypes that beat them most
  - Current card levels vs. max (are their cards underleveled?)
  - Arena and trophy trend
- Free: basic summary (trophies, overall win rate, 5 recent battles)
- Pro: full dashboard (deck analysis, loss patterns, card levels, trends)

### Phase 2 — Elite Video Review ($19.99/month)
- Elite subscribers upload a screen recording of a gameplay session
- A private review page is created for each submission
- You watch the video and leave timestamped comments (e.g. "at 2:30 you over-committed — wait for the counter-push here")
- Player gets notified by email when their review is ready
- Capped at 20 Elite subscribers to keep it manageable
- Software needed: video upload (Cloudflare R2 or Supabase storage), review interface, email notifications

### Phase 3 — Progress Tracking
- Week-over-week trophy and win rate charts
- "You improved 4% this week" summary cards
- Streak tracking (win/loss streaks)

## No AI Involved

All insights are derived directly from the player's real battle data — no AI-generated text, no black-box coaching. Players can trust what they see because it's just their own numbers.
