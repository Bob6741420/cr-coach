import TagInput from '@/components/TagInput'

const FREE_FEATURES = ['Trophies & win rate', 'Arena & player lookup', 'Battle count']
const PRO_FEATURES = ['Win rate by deck', 'Cards beating you most', 'Card level analysis', 'Plain English insights', 'What to do next']
const ELITE_FEATURES = ['Everything in Pro', 'Submit a gameplay video', 'Personal review by a real player', 'Timestamped feedback', '48-hour turnaround']

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center space-y-8">
        <div className="space-y-4">
          <span className="inline-block bg-blue-800/60 border border-blue-700 text-blue-300 text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide uppercase">
            Real battle data · No AI · No fluff
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">CR Coach</h1>
          <p className="text-blue-200 text-lg sm:text-xl max-w-md mx-auto leading-relaxed">
            See exactly what&apos;s beating you, which cards need leveling, and what to do about it — in plain English.
          </p>
        </div>
        <TagInput />
        <p className="text-blue-400 text-sm">Free to try · No account needed</p>
        <details className="text-sm text-blue-400 cursor-pointer">
          <summary className="hover:text-blue-200 transition-colors">How do I find my tag?</summary>
          <p className="mt-2 text-blue-300 text-xs max-w-xs mx-auto leading-relaxed">
            Open Clash Royale → tap your profile picture (top left) → your tag is shown below your name starting with #. Type it in above.
          </p>
        </details>
        <a href="#pricing" className="text-blue-500 text-xs hover:text-blue-300 transition-colors">
          See pricing ↓
        </a>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-5xl mx-auto px-6 pb-24 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-white">Simple Pricing</h2>
          <p className="text-blue-300">Enter your tag for free. Upgrade when you want the full picture.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Free */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Free</p>
              <p className="text-4xl font-black text-white mt-2">$0</p>
            </div>
            <ul className="space-y-2">
              {FREE_FEATURES.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="text-gray-500">✓</span> {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Pro */}
          <div className="bg-blue-600/20 border-2 border-blue-500 rounded-2xl p-6 space-y-5 relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="bg-blue-500 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide">Most Popular</span>
            </div>
            <div>
              <p className="text-blue-400 text-xs font-bold uppercase tracking-widest">Pro</p>
              <div className="flex items-end gap-1 mt-2">
                <p className="text-4xl font-black text-white">$4.99</p>
                <p className="text-gray-400 text-sm mb-1">/month</p>
              </div>
            </div>
            <ul className="space-y-2">
              {PRO_FEATURES.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-200">
                  <span className="text-blue-400">✓</span> {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Elite */}
          <div className="bg-purple-600/20 border border-purple-500/50 rounded-2xl p-6 space-y-5">
            <div>
              <p className="text-purple-400 text-xs font-bold uppercase tracking-widest">Elite</p>
              <div className="flex items-end gap-1 mt-2">
                <p className="text-4xl font-black text-white">$19.99</p>
                <p className="text-gray-400 text-sm mb-1">/month</p>
              </div>
            </div>
            <ul className="space-y-2">
              {ELITE_FEATURES.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-200">
                  <span className="text-purple-400">✓</span> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm">
          Try it free first — enter your tag above. No credit card needed.
        </p>
      </section>
    </main>
  )
}
