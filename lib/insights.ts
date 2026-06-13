import type { CRPlayer, BattleLogEntry } from './clash-royale'
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
  'Sparky': 'Zap or Electro Wizard resets her charge (stuns only — Log doesn\'t work). Keep your troops spread so she can\'t chain.',
  'Inferno Dragon': 'Zap, Freeze, or Electro Wizard resets its charge — stuns and freezes are the only things that work. Distract it with a cheap card first.',
  'Electro Wizard': 'Pair him with a tank — he resets, but can\'t stop a full push alone.',
}

export function generateInsights(
  player: CRPlayer,
  deckWinRates: DeckWinRate[],
  lossPatterns: LossPattern[],
  cardLevels: CardLevel[],
  battles: BattleLogEntry[],
): Insight[] {
  const insights: Insight[] = []

  const totalBattles = battles.length
  const recentLosses = battles.filter(b => {
    const team = b.team[0]
    const opp = b.opponent[0]
    return team && opp && team.crowns < opp.crowns
  }).length
  const recentWins = totalBattles - recentLosses
  const recentWinRate = totalBattles > 0 ? Math.round((recentWins / totalBattles) * 100) : 0
  const lossPercent = 100 - recentWinRate

  // Trophy drop
  const trophyGap = player.bestTrophies - player.trophies
  if (trophyGap >= 300) {
    insights.push({
      type: 'warning',
      title: `You're ${trophyGap} trophies below your best (${player.trophies.toLocaleString()} vs ${player.bestTrophies.toLocaleString()})`,
      body: 'A drop this big usually means your deck or card levels aren\'t keeping up at your peak trophy range. The cards beating you below are likely the reason.',
    })
  }

  // Loss rate at current trophy range
  if (totalBattles >= 10 && lossPercent >= 40) {
    insights.push({
      type: 'warning',
      title: `${lossPercent}% of players at ${player.arena.name} are beating you`,
      body: `In your last ${totalBattles} battles you won ${recentWins} and lost ${recentLosses}. At ${player.trophies.toLocaleString()} trophies, closing that gap starts with the fixes below.`,
    })
  } else if (totalBattles >= 10 && recentWinRate >= 60) {
    insights.push({
      type: 'good',
      title: `You're beating ${recentWinRate}% of players at ${player.arena.name}`,
      body: `${recentWins}W / ${recentLosses}L in your last ${totalBattles} battles. You're performing well — small improvements below can push you even higher.`,
    })
  }

  // Recent deck performance
  const mainDeck = deckWinRates[0]
  if (mainDeck && mainDeck.battles >= 8) {
    if (mainDeck.winRate < 45) {
      insights.push({
        type: 'warning',
        title: `Your deck is losing more than winning — ${mainDeck.winRate}% over ${mainDeck.battles} games`,
        body: `${mainDeck.wins}W / ${mainDeck.battles - mainDeck.wins}L with this deck. That's a losing record. Try swapping your weakest card or pick a deck that counters what's beating you.`,
      })
    } else if (mainDeck.winRate >= 60) {
      insights.push({
        type: 'good',
        title: `Your deck is working — ${mainDeck.winRate}% over ${mainDeck.battles} games`,
        body: `${mainDeck.wins}W / ${mainDeck.battles - mainDeck.wins}L. Keep playing this deck and focus resources on leveling your weakest card.`,
      })
    }
  }

  // Top loss threat
  const topThreat = lossPatterns[0]
  if (topThreat && topThreat.count >= 3) {
    const pct = Math.round((topThreat.count / Math.max(totalBattles, 1)) * 100)
    const tip = COUNTER_TIPS[topThreat.card]
    insights.push({
      type: 'tip',
      title: `${topThreat.card} appears in ${topThreat.count} of your losses — that's ${pct}% of all your recent games`,
      body: tip ?? `Your deck doesn't have a reliable answer to ${topThreat.card}. Consider adding a card that directly counters it.`,
    })
  }

  // Second loss threat
  if (lossPatterns.length >= 2 && lossPatterns[1].count >= 3) {
    const tip = COUNTER_TIPS[lossPatterns[1].card]
    if (tip) {
      const pct = Math.round((lossPatterns[1].count / Math.max(totalBattles, 1)) * 100)
      insights.push({
        type: 'tip',
        title: `${lossPatterns[1].card} also shows up in ${lossPatterns[1].count} losses (${pct}% of games)`,
        body: tip,
      })
    }
  }

  // Underleveled cards
  const worstCard = cardLevels[0]
  if (worstCard && worstCard.gap >= 4) {
    insights.push({
      type: 'warning',
      title: `${worstCard.name} is ${worstCard.gap} levels below max — it loses every direct fight`,
      body: `At ${worstCard.level}/16, your ${worstCard.name} gets out-damaged by fully leveled versions. This costs you games even when you play correctly. Upgrade it first.`,
    })
  } else if (worstCard && worstCard.gap >= 2) {
    insights.push({
      type: 'tip',
      title: `${worstCard.name} is ${worstCard.gap} levels below max (${worstCard.level}/16)`,
      body: 'A 2-level gap won\'t always decide fights, but closing it gives you an edge in the close matchups that matter most.',
    })
  } else if (cardLevels.length > 0 && cardLevels.every(c => c.gap === 0)) {
    insights.push({
      type: 'good',
      title: 'All your cards are max level',
      body: 'No level disadvantages at all — your losses are purely about strategy and matchups, not card levels.',
    })
  }

  return insights
}
