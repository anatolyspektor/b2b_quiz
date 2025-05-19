import { supabase } from "@/lib/supabase"

function getUTMParams() {
  const params = new URLSearchParams(window.location.search)
  return {
    source: params.get("utm_source") || "",
    medium: params.get("utm_medium") || "",
    campaign: params.get("utm_campaign") || "",
    term: params.get("utm_term") || "",
    content: params.get("utm_content") || "",
  }
}


export const trackEvent = async ({
  event,
  sessionId,
  device,
  variant = localStorage.getItem("variant") || '',
  test_name = localStorage.getItem("test_name") || '',
  metadata = {}
}) => {
  const referer = document.referrer || window.location.href
  const utmKey = `utm_saved`
  const trackKey = `tracked_${event}_${sessionId}`

  if (localStorage.getItem(trackKey)) return

  const shouldSendUTM = !localStorage.getItem(utmKey)
  const fullMetadata = {
    ...metadata,
    ...(shouldSendUTM ? { utm: getUTMParams() } : {}),
  }

  try {
    const { error } = await supabase.from("events").insert({
      event,
      session_id: sessionId,
      device,
      referer,
      metadata: fullMetadata,
      variant,
      test_name,
    })

    if (error) throw error

    localStorage.setItem(trackKey, "true")
    if (shouldSendUTM) {
      localStorage.setItem(utmKey, "true")
    }
  } catch (err) {
    console.error("❌ Failed to send event", err)
  }
}
