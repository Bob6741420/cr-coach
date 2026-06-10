import TagInput from '@/components/TagInput'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center">
      <div className="text-center space-y-8 px-6 max-w-xl">
        <div className="space-y-3">
          <h1 className="text-6xl font-black text-white tracking-tight">CR Coach</h1>
          <p className="text-blue-200 text-xl">
            Enter your tag. See exactly what&apos;s beating you — and why.
          </p>
        </div>

        <div className="flex justify-center">
          <TagInput />
        </div>

        <div className="flex justify-center gap-8 text-sm text-blue-300">
          <span>✓ Free preview</span>
          <span>✓ Real battle data</span>
          <span>✓ Full dashboard $4.99/mo</span>
        </div>
      </div>
    </main>
  )
}
