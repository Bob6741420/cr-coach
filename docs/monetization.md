# Monetization

## Model

Three-tier freemium. Free gets players in the door, Pro unlocks the full stats dashboard, Elite adds personal human video review.

## Tiers

### Free
- Overall trophies, win rate, total battles
- 5 most recent battle results
- Current deck
- Goal: show enough to prove value, leave them wanting more

### Pro — $4.99/month
- Full battle history analysis (last 25 battles)
- Win rate broken down by deck
- Top cards/archetypes beating them (with counts)
- Card level analysis (which cards are underleveled vs. max)
- Week-over-week trophy trend chart
- Win/loss streak history

### Elite — $19.99/month
- Everything in Pro
- Upload 1 gameplay video per month (screen recording of a match)
- Personal timestamped review left by you within 48 hours
- Comments like "at 2:30 you should have held your Fireball here"
- Direct feedback on their specific mistakes — not generic advice

## Revenue Math

| Subscribers | Pro only | Elite only | Mixed (80% Pro / 20% Elite) |
|------------|----------|------------|------------------------------|
| 50 | $250/mo | $1,000/mo | $400/mo |
| 100 | $499/mo | $2,000/mo | $799/mo |
| 200 | $998/mo | $4,000/mo | $1,598/mo |

## Elite Capacity Warning

At $19.99/month you should cap Elite at ~20 subscribers to start. 20 videos/month is ~5 per week — manageable. If demand exceeds that, raise the price or add a waitlist.

## Payment

Stripe handles subscriptions, billing, and payouts. Players subscribe with their email; that email is checked each time they access Pro features.

## Growth Strategy

1. Post side-by-side comparisons (free vs. pro view) on TikTok/YouTube Shorts
2. Share in r/ClashRoyale and CR Discord servers — "built a tool that shows what's actually beating you"
3. Free tier is shareable — players send their tag to friends, friends discover the tool
4. No paid ads needed to start

## Risks

- RoyaleAPI is free and covers raw stats (mitigation: focus on UX and interpretation, not raw data)
- CR API could change (mitigation: cache data, monitor Supercell developer updates)
- Low conversion from free to paid (mitigation: make the Pro preview tantalizing — show blurred/locked cards in the free view)
