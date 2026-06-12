import type { CRPlayer } from './clash-royale'
import type { DeckWinRate, LossPattern, CardLevel } from './stats'

export interface Insight {
  type: 'warning' | 'tip' | 'good'
  title: string
  body: string
}

const COUNTER_TIPS: Record<string, string> = {
  'P.E.K.K.A': 'Surround it with swarm cards like Skeleton Army, Goblin Gang, or Minion Horde.',
  'Mega Knight': 'Swarm it on landing — it can\'t one-shot a full swarm. Skeleton Army works great.',
  'Lava Hound': 'Save air-targeting troops and high damage spells for when it pops into pups.',
  'Hog Rider': 'A building placed in the center (Cannon, Inferno Tower) stops it every single time.',
  'Royal Giant': 'Inferno Tower or Tesla melts it before it can do damage. Place it in the center.',
  'Balloon': 'Keep an air-targeting troop ready — Minions, Mega Minion, or Inferno Dragon.',
  'Miner': 'Protect towers with cheap troops and don\'t let your opponent build elixir leads.',
  'Goblin Barrel': 'Log, Arrows, or any area spell counters it perfectly. Practice the timing.',
  'Goblin Giant': 'Target the spear goblins first with a spell, then focus the giant with tanks.',
  'Electro Giant': 'Keep your troops spread out so it can\'t chain the zap — use buildings to bait it.',
  'Ram Rider': 'Swarm it from behind with cheap troops — the snare makes it hard to use with pushes.',
  'Witch': 'A Log or Arrows kills the skeletons and can damage the Witch. Outrun her skeleton spawn.',
  'Sparky': 'Zap or Log resets her charge. Keep your troops spread so she can\'t chain.',
  'Inferno Dragon': 'Zap or any spell resets its charge. Distract it with a cheap card.',
  'Electro Wizard': 'Pair him with a tank — he resets, but can\'t stop a full push alone.',
}

export function generateInsights(
  player: CRPlayer,
  deckWinRates: DeckWinRate[],
  lossPatterns: LossPattern[],
  cardLevels: CardLevel[],
): Insight[] {
  const insights: Insight[] = []

  // Trophy drop
  const trophyGap = player.bestTrophies - player.trophies
  if (trophyGap >= 300) {
    insights.push({
      type: 'warning',
      title: `You're ${trophyGap} trophies below your best`,
      body: 'A big drop usually means your deck or card levels aren\'t keeping up with opponents at your peak. Check what\'s beating you most below.',
    })
  }

  // Overall win rate
  const overallWinRate = Math.round((player.wins / Math.max(player.battleCount, 1)) * 100)
  if (overallWinRate >= 58) {
    insights.push({
      type: 'good',
      title: `${overallWinRate}% career win rate — solid`,
      body: 'You win more than you lose overall. The improvements below can push you even higher.',
    })
  }

  // Recent deck performance
  const mainDeck = deckWinRates[0]
  if (mainDeck && mainDeck.battles >= 8) {
    if (mainDeck.winRate < 45) {
      insights.push({
        type: 'warning',
        title: `Your deck is losing more than winning (${mainDeck.winRate}% over ${mainDeck.battles} games)`,
        body: 'This deck isn\'t working well for you right now. Try swapping out your weakest card or look for a different deck that counters what\'s beating you.',
      })
    } else if (mainDeck.winRate >= 60) {
      insights.push({
        type: 'good',
        title: `Your deck is hot right now (${mainDeck.winRate}% over ${mainDeck.battles} games)`,
        body: 'Keep playing this deck. Focus your upgrade resources on the most underleveled card.',
      })
    }
  }

  // Top loss threat
  const topThreat = lossPatterns[0]
  if (topThreat && topThreat.count >= 3) {
    const tip = COUNTER_TIPS[topThreat.card]
    insights.push({
      type: 'tip',
      title: `${topThreat.card} shows up in ${topThreat.count} of your losses`,
      body: tip ?? `Your deck might not have a great answer to ${topThreat.card}. Consider adding a card that directly counters it.`,
    })
  }

  // Second loss threat if significantly different card
  if (lossPatterns.length >= 2 && lossPatterns[1].count >= 3 && lossPatterns[1].card !== lossPatterns[0]?.card) {
    const tip = COUNTER_TIPS[lossPatterns[1].card]
    if (tip) {
      insights.push({
        type: 'tip',
        title: `${lossPatterns[1].card} also appears in ${lossPatterns[1].count} losses`,
        body: tip,
      })
    }
  }

  // Underleveled cards
  const worstCard = cardLevels[0]
  if (worstCard && worstCard.gap >= 4) {
    insights.push({
      type: 'warning',
      title: `${worstCard.name} is ${worstCard.gap} levels below max (${worstCard.level}/${worstCard.maxLevel})`,
      body: 'Underleveled cards lose one-on-one to max-level versions. Upgrading this should be your top priority in the Shop.',
    })
  } else if (worstCard && worstCard.gap >= 2) {
    insights.push({
      type: 'tip',
      title: `${worstCard.name} could use upgrading (${worstCard.level}/${worstCard.maxLevel})`,
      body: 'A couple level gaps won\'t break you, but closing them gives you an edge in close matchups.',
    })
  } else if (cardLevels.length > 0 && cardLevels.every(c => c.gap === 0)) {
    insights.push({
      type: 'good',
      title: 'All your cards are max level',
      body: 'No level disadvantages — your losses are pure strategy. Focus on learning the counters above.',
    })
  }

  return insights
}
