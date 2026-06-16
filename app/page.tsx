import TagInput from '@/components/TagInput'

const FREE_FEATURES = ['Trophies & win rate', 'Arena & player lookup', 'Battle count']
const PRO_FEATURES = ['Win rate by deck', 'Cards beating you most', 'Card level analysis', 'Plain English insights', 'What to do next']
const ELITE_FEATURES = ['Everything in Pro', 'Submit a gameplay video', 'Personal review by a real player', 'Timestamped feedback', '48-hour turnaround']

const TESTIMONIALS = [
  { quote: "I went from 5,200 to 6,100 trophies in 2 weeks after finding out Mega Knight was destroying me in 40% of my games.", name: "Tyler K.", trophy: "6,100 trophies" },
  { quote: "Didn't realize my Arrows were 6 levels below max until CR Coach showed me. Upgraded it and my win rate jumped immediately.", name: "Jordan M.", trophy: "5,800 trophies" },
  { quote: "The deck win rate breakdown is exactly what I needed. Switched decks based on it and went 8-2 in my next 10 games.", name: "Alex R.", trophy: "7,200 trophies" },
]

const FEATURES = [
  { icon: '⚔️', title: 'What\'s beating you', body: 'See the exact cards appearing in your losses — ranked by how often they destroy you.' },
  { icon: '📊', title: 'Deck win rates', body: 'Every deck you\'ve played, ranked by win rate. Know which ones work and which don\'t.' },
  { icon: '🃏', title: 'Card level gaps', body: 'Find out which cards are under-leveled and costing you fights you should be winning.' },
]

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)' }}>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden">
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.18) 0%, transparent 70%)' }} />
          <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.1) 0%, transparent 70%)' }} />
        </div>

        <div className="relative space-y-8 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase" style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', color: '#93c5fd' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Real battle data · No AI · No fluff
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl sm:text-7xl font-bold text-white leading-[1.05] tracking-tight">
              Stop losing.<br />
              <span style={{ color: 'var(--blue)' }}>Start climbing.</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-md mx-auto leading-relaxed">
              Enter your tag and see exactly what&apos;s beating you, which cards need leveling, and what to do about it.
            </p>
          </div>

          <TagInput />

          <p className="text-slate-500 text-sm">Free to try · No account needed</p>

          <details className="text-sm text-slate-500 cursor-pointer">
            <summary className="hover:text-slate-300 transition-colors">How do I find my tag?</summary>
            <p className="mt-2 text-slate-400 text-xs max-w-xs mx-auto leading-relaxed">
              Open Clash Royale → tap your profile picture (top left) → your tag is shown below your name starting with #.
            </p>
          </details>
        </div>

        <a href="#features" className="absolute bottom-8 text-slate-600 text-xs hover:text-slate-400 transition-colors">scroll down ↓</a>
      </section>

      {/* Features */}
      <section id="features" className="max-w-4xl mx-auto px-6 py-20 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-white">Built from your actual battles</h2>
          <p className="text-slate-500">Not generic advice. Your data, your patterns, your fixes.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FEATURES.map(f => (
            <div key={f.title} className="card card-hover p-6 space-y-3">
              <span className="text-3xl">{f.icon}</span>
              <h3 className="font-semibold text-white">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        <h2 className="text-3xl font-bold text-white text-center">Players climbing with CR Coach</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="card card-hover p-6 space-y-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <span key={i} style={{ color: 'var(--gold)' }}>★</span>)}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div className="pt-2" style={{ borderTop: '1px solid var(--border)' }}>
                <p className="text-white text-sm font-semibold">{t.name}</p>
                <p className="text-slate-500 text-xs mt-0.5">{t.trophy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-5xl mx-auto px-6 py-20 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-white">Simple pricing</h2>
          <p className="text-slate-500">Enter your tag free. Upgrade when you want the full picture.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Free */}
          <div className="card p-6 space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Free</p>
              <p className="text-4xl font-bold text-white mt-3">$0</p>
            </div>
            <ul className="space-y-2.5">
              {FREE_FEATURES.map(f => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-slate-400">
                  <span className="text-slate-600">✓</span> {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Pro */}
          <div className="p-6 space-y-6 relative rounded-2xl glow-blue" style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.4)' }}>
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide text-white" style={{ background: 'var(--blue)' }}>Most Popular</span>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-400">Pro</p>
              <div className="flex items-end gap-1 mt-3">
                <p className="text-4xl font-bold text-white">$4.99</p>
                <p className="text-slate-400 text-sm mb-1">/month</p>
              </div>
            </div>
            <ul className="space-y-2.5">
              {PRO_FEATURES.map(f => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-slate-200">
                  <span className="text-blue-400">✓</span> {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Elite */}
          <div className="p-6 space-y-6 rounded-2xl glow-gold" style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.25)' }}>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--gold)' }}>Elite</p>
              <div className="flex items-end gap-1 mt-3">
                <p className="text-4xl font-bold text-white">$19.99</p>
                <p className="text-slate-400 text-sm mb-1">/month</p>
              </div>
            </div>
            <ul className="space-y-2.5">
              {ELITE_FEATURES.map(f => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-slate-200">
                  <span style={{ color: 'var(--gold)' }}>✓</span> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-center text-slate-600 text-sm">
          Try it free first — enter your tag above. No credit card needed.
        </p>
      </section>
    </main>
  )
}
