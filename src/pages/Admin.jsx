import { useEffect, useState } from "react"
import { getMetrics } from "@/utils/getMetrics"
import { supabase } from "@/lib/supabase"

export default function Admin() {
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    const data = await getMetrics()
    setMetrics(data)
    setLoading(false)
  }

  const handleResetStats = async () => {
    const confirmed = window.confirm("Are you sure you want to delete all event data? This cannot be undone.")
    if (!confirmed) return

    const { error } = await supabase.from("events").delete().not("session_id", "is", null)

    if (error) {
      alert("❌ Failed to reset stats")
      console.error("Delete error:", error)
      return
    }

    await loadData()
    alert("✅ Stats have been reset.")
  }

  if (loading || !metrics) return <div className="p-8 text-lg">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-8 space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">📊 2 Minute Quiz Dashboard</h1>
          <p className="text-sm text-gray-500">Live view of quiz engagement stats</p>
        </div>
        <button
          onClick={handleResetStats}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm"
        >
          Reset Stats
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <Stat label="Page Views" value={metrics.impressions} />
        <Stat
          label="Opt In Clicks"
          value={metrics.clicks}
          conversionRate={metrics.impressions > 0 ? Math.round((metrics.clicks / metrics.impressions) * 100) : undefined}
        />
        <Stat
          label="Emails Collected"
          value={metrics.completed}
          conversionRate={metrics.clicks > 0 ? Math.round((metrics.completed / metrics.clicks) * 100) : undefined}
        />
        <Stat
          label="Calls Booked"
          value={metrics.callsBooked}
          conversionRate={
            metrics.completed > 0
              ? Math.round((metrics.callsBooked / metrics.completed) * 100)
              : undefined
          }
        />
      </div>

      <Section title="🧩 Quiz Steps Drop Off">
        <div className="grid grid-cols-7 gap-4">
          {Array.from({ length: 6 }).map((_, i) => {
            const stepEvent = `quiz_step_${i + 1}`
            const current = metrics.quizSteps.find(s => s.event === stepEvent)?.count || 0
            const prev = i === 0 ? current : metrics.quizSteps.find(s => s.event === `quiz_step_${i}`)?.count || 0
            const dropped = current < prev
            const percentDrop = dropped && prev > 0 ? Math.round(((prev - current) / prev) * 100) : undefined

            return <Stat key={stepEvent} label={`Question ${i + 1}`} value={current} red={dropped} percentDrop={percentDrop} />
          })}

          {(() => {
            const q6 = metrics.quizSteps.find(s => s.event === "quiz_step_6")?.count || 0
            const completed = metrics.completed
            const dropped = completed < q6
            const percentDrop = dropped && q6 > 0 ? Math.round(((q6 - completed) / q6) * 100) : undefined

            return <Stat label="Quiz Complete" value={completed} red={dropped} percentDrop={percentDrop} />
          })()}
        </div>
      </Section>

      <Section title="📈 AD Campaigns A/B Tested">
        {(metrics.utmFunnelsDetailed || []).map(({ campaign, mediums }) => (
          <div key={`campaign_${campaign}`} className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800">{campaign}</h3>

            {mediums.map(({ medium, contents }) => (
              <div key={`medium_${campaign}_${medium}`} className="space-y-4 pl-4 border-l-2 border-blue-300">
                <h4 className="text-lg font-semibold text-gray-800">Medium: {medium}</h4>

                {contents.map(({ content, variants }) => (
                  <div key={`content_${campaign}_${medium}_${content}`} className="space-y-2 pl-4 border-l border-gray-200">
                    <h5 className="text-md font-semibold text-gray-800">Content: {content}</h5>

                    <div className="grid grid-cols-2 gap-4">
                      {variants.map(v => (
                        <div key={`variant_${campaign}_${medium}_${content}_${v.variant}`} className="border rounded-lg p-4 bg-gray-50 space-y-2">
                          <div className="text-lg font-semibold text-center">Variant {v.variant}</div>
                          <div className="grid grid-cols-2 gap-3">
                            <MiniStat
                              label="Views"
                              value={v.impressions}
                              secondary={
                                v.impressions > 0
                                  ? Math.round(
                                      (v.impressions /
                                        variants.reduce((sum, x) => sum + x.impressions, 0)) * 100
                                    )
                                  : 0
                              }
                              secondaryClass="text-yellow-500"
                            />
                            <MiniStat
                              label="Clicks"
                              value={v.conversions}
                              secondary={v.conversionRate}
                              secondaryClass="text-green-600"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </Section>
    </div>
  )
}

function Stat({ label, value, percentDrop, conversionRate, red }) {
  const isDrop = percentDrop < 0
  const dropPercent = Math.abs(percentDrop)
  const showDrop = percentDrop !== undefined && conversionRate === undefined
  const showConversion = conversionRate !== undefined

  return (
    <div className="rounded-xl p-6 text-center shadow-sm bg-white">
      <div className="text-base font-medium text-gray-600">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
      {showDrop && (
        <div className={`text-sm font-medium ${isDrop ? "text-green-600" : "text-red-600"}`}>
          {isDrop ? "↑" : "↓"} {dropPercent}%
        </div>
      )}
      {showConversion && (
        <div className="text-sm font-medium text-green-600">
          {conversionRate}%
        </div>
      )}
    </div>
  )
}

function MiniStat({ label, value, percentDiff, secondary, secondaryClass = "" }) {
  return (
    <div className="bg-white rounded-md px-3 py-2 text-center shadow-sm">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-xl font-bold">
        {value !== undefined && value !== null ? value : "N/A"}
        {secondary !== undefined && (
          <span className={`ml-1 text-xs font-semibold ${secondaryClass}`}>({secondary}%)</span>
        )}
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </div>
  )
}
