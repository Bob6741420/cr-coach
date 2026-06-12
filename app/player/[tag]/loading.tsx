export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto space-y-6 animate-pulse">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="h-8 w-40 bg-gray-200 rounded-lg" />
            <div className="h-4 w-28 bg-gray-200 rounded" />
          </div>
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm text-center space-y-2">
              <div className="h-3 w-12 bg-gray-200 rounded mx-auto" />
              <div className="h-7 w-16 bg-gray-200 rounded mx-auto" />
            </div>
          ))}
        </div>

        {/* Current deck */}
        <div className="bg-white rounded-xl p-6 shadow-sm space-y-3">
          <div className="h-4 w-28 bg-gray-200 rounded" />
          <div className="flex gap-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-14 h-16 bg-gray-200 rounded-lg flex-1" />
            ))}
          </div>
        </div>

        {/* Dashboard unlock */}
        <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
          <div className="h-5 w-48 bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-10 w-full bg-gray-200 rounded-lg" />
          <div className="h-12 w-full bg-gray-200 rounded-xl" />
        </div>
      </div>
    </main>
  )
}
