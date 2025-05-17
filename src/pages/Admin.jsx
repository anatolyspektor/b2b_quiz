import { useEffect, useState } from "react"
import { getMetrics } from "@/utils/getMetrics"

export default function Admin() {
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMetrics()
      .then(data => {
        setMetrics(data)
        setLoading(false)
      })
      .catch(err => {
        console.error("❌ Failed to load metrics", err)
        setLoading(false)
      })
  }, [])

  if (loading || !metrics) return <div className="p-8 text-lg">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-8 space-y-10">
      <div>
        <h1 className="text-2xl font-bold">📊 Funnel Dashboard</h1>
        <p className="text-sm text-gray-500">Live view of quiz engagement stats</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Stat label="Impressions" value={metrics.impressions} />
        <Stat label="Clicks" value={metrics.clicks} />
        <Stat label="Completions" value={metrics.completed} />
      </div>

      <Section title="📱 Devices">
        <div className="grid grid-cols-2 gap-3">
          {metrics.byDevice.map(d => (
            <Stat key={d.device} label={d.device} value={d.count} />
          ))}
        </div>
      </Section>

      <Section title="🧩 Quiz Steps">
        <div className="grid grid-cols-3 gap-4">
          {metrics.quizSteps.map(s => (
            <Stat key={s.event} label={s.event} value={s.count} />
          ))}
        </div>
      </Section>

      <Section title="📈 UTM Funnels">
        {metrics.utmFunnel.map(c => (
          <div
            key={c.campaign}
            className="border rounded-lg p-4 bg-white shadow-sm space-y-2"
          >
            <div className="font-semibold text-lg">{c.campaign}</div>
            <div className="text-sm">Impressions: {c.impressions}</div>
            <div className="text-sm">Completions: {c.completions}</div>

            <ul className="list-disc list-inside text-sm pl-4">
              {Object.entries(c.steps).map(([step, count]) => (
                <li key={step}>{step}: {count}</li>
              ))}
            </ul>
          </div>
        ))}
      </Section>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm text-center">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-xl font-bold">{value}</div>
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
