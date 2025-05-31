import { supabase } from "@/lib/supabase"

export const getMetrics = async () => {
  const { data: events, error } = await supabase
    .from("events")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error

  // Funnel totals
  const impressions = new Set(events.filter(e => e.event === "optin_impression").map(e => e.session_id)).size
  const clicks = new Set(events.filter(e => e.event === "optin_click").map(e => e.session_id)).size
  const completed = new Set(events.filter(e => e.event === "quiz_complete").map(e => e.session_id)).size
  const callsBooked = new Set(events.filter(e => e.event === "call_booked").map(e => e.session_id)).size

  // Devices
  const byDevice = Object.entries(
    events.reduce((acc, e) => {
      const device = e.device || "unknown"
      acc[device] = acc[device] || new Set()
      acc[device].add(e.session_id)
      return acc
    }, {})
  ).map(([device, set]) => ({ device, count: set.size }))

  // Quiz Steps
  const quizSteps = Object.entries(
    events.reduce((acc, e) => {
      if (!e.event.startsWith("quiz_step_")) return acc
      acc[e.event] = acc[e.event] || new Set()
      acc[e.event].add(e.session_id)
      return acc
    }, {})
  ).map(([step, set]) => ({ event: step, count: set.size }))

  // UTM Campaigns + Variants (nested structure)
  const nestedUTMMap = {}

  events.forEach(e => {
    const utm = e.metadata?.utm || {}
    const campaign = utm.campaign || "No UTM"
    const medium = utm.medium || "No Medium"
    const content = utm.content || "No Content"
    const variant = e.variant || "unknown"
    const session = e.session_id

    if (!nestedUTMMap[campaign]) nestedUTMMap[campaign] = {}
    if (!nestedUTMMap[campaign][medium]) nestedUTMMap[campaign][medium] = {}
    if (!nestedUTMMap[campaign][medium][content]) nestedUTMMap[campaign][medium][content] = {}
    if (!nestedUTMMap[campaign][medium][content][variant]) {
      nestedUTMMap[campaign][medium][content][variant] = {
        variant,
        impressions: new Set(),
        conversions: new Set(),
      }
    }

    if (e.event === "optin_impression") nestedUTMMap[campaign][medium][content][variant].impressions.add(session)
    if (e.event === "optin_click") nestedUTMMap[campaign][medium][content][variant].conversions.add(session)
  })

  const utmFunnelsDetailed = Object.entries(nestedUTMMap).map(([campaign, mediums]) => ({
    campaign,
    mediums: Object.entries(mediums).map(([medium, contents]) => ({
      medium,
      contents: Object.entries(contents).map(([content, variants]) => ({
        content,
        variants: Object.values(variants).map(v => {
          const impressions = v.impressions.size
          const conversions = v.conversions.size
          const conversionRate = impressions > 0 ? Math.round((conversions / impressions) * 100) : 0
          return {
            variant: v.variant,
            impressions,
            conversions,
            conversionRate,
          }
        })
      }))
    }))
  }))

  // A/B Test Groups
  const testGroups = {}

  events.forEach(e => {
    const testName = e.test_name
    const variant = e.variant
    if (!testName || !variant) return

    testGroups[testName] = testGroups[testName] || {}
    const group = testGroups[testName]

    group[variant] = group[variant] || {
      variant,
      impressions: new Set(),
      conversions: new Set(),
      quizSteps: {},
    }

    if (e.event === "optin_impression") group[variant].impressions.add(e.session_id)
    if (e.event === "optin_click") group[variant].conversions.add(e.session_id)

    if (e.event.startsWith("quiz_step_")) {
      group[variant].quizSteps[e.event] = group[variant].quizSteps[e.event] || new Set()
      group[variant].quizSteps[e.event].add(e.session_id)
    }
  })

  const byVariantTest = Object.entries(testGroups).map(([testName, variants]) => ({
    test_name: testName,
    variants: Object.values(variants).map(v => {
      const impressions = v.impressions.size
      const conversions = v.conversions.size
      return {
        variant: v.variant,
        impressions,
        conversions,
        conversionRate: impressions > 0 ? Math.round((conversions / impressions) * 100) : 0,
        quizSteps: Object.fromEntries(
          Object.entries(v.quizSteps).map(([step, set]) => [step, set.size])
        ),
      }
    }),
  }))

  return {
    impressions,
    clicks,
    completed,
    callsBooked,
    byDevice,
    quizSteps,
    byVariantTest,
    utmFunnelsDetailed,
  }
}
