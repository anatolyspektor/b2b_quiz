import { supabase } from "@/lib/supabase"

export const getMetrics = async () => {
  const { data: events, error } = await supabase
    .from("events")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error

  const impressions = new Set(events.filter(e => e.event === "optin_impression").map(e => e.session_id)).size
  const clicks = new Set(events.filter(e => e.event === "optin_click").map(e => e.session_id)).size
  const completed = new Set(events.filter(e => e.event === "quiz_complete").map(e => e.session_id)).size

  const byDevice = Object.entries(
    events.reduce((acc, e) => {
      const device = e.device || "unknown"
      acc[device] = acc[device] || new Set()
      acc[device].add(e.session_id)
      return acc
    }, {})
  ).map(([device, set]) => ({ device, count: set.size }))

  const quizSteps = Object.entries(
    events.reduce((acc, e) => {
      if (!e.event.startsWith("quiz_step_")) return acc
      acc[e.event] = acc[e.event] || new Set()
      acc[e.event].add(e.session_id)
      return acc
    }, {})
  ).map(([step, set]) => ({ event: step, count: set.size }))

  const campaignData = {}
  const stepsByCampaign = {}

  events.forEach(e => {
    const campaign = e.metadata?.utm?.campaign
    if (!campaign) return

    campaignData[campaign] = campaignData[campaign] || { impressions: 0, completions: 0 }

    if (e.event === "optin_impression") campaignData[campaign].impressions++
    if (e.event === "quiz_complete") campaignData[campaign].completions++

    if (e.event.startsWith("quiz_step_")) {
      stepsByCampaign[campaign] = stepsByCampaign[campaign] || {}
      stepsByCampaign[campaign][e.event] = stepsByCampaign[campaign][e.event] || new Set()
      stepsByCampaign[campaign][e.event].add(e.session_id)
    }
  })

  const utmFunnel = Object.entries(campaignData).map(([campaign, data]) => ({
    campaign,
    impressions: data.impressions,
    completions: data.completions,
    steps: Object.fromEntries(
      Object.entries(stepsByCampaign[campaign] || {}).map(([step, set]) => [step, set.size])
    ),
  }))

  return {
    impressions,
    clicks,
    completed,
    byDevice,
    quizSteps,
    utmFunnel,
  }
}
