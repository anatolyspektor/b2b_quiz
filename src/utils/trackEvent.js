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
  metadata = {},
  variant = localStorage.getItem("variant") || 'NO A/B',
  test_name = localStorage.getItem("test_name") || '',
}) => {
  const isProd = import.meta.env.MODE === "production";
  if (!isProd || typeof window === "undefined" || typeof window.fbq !== "function") return;

  const referer = document.referrer || window.location.href;
  const utmKey = `utm_saved`;
  const trackKey = `tracked_${event}_${sessionId}`;
  if (localStorage.getItem(trackKey)) return;

  const fullMetadata = {
    ...metadata,
    quiz_version: localStorage.getItem("quiz_version") || '',
    campaign: localStorage.getItem("campaign") || '',
    utm: getUTMParams(),
  };

  try {
    const { error } = await supabase.from("events").insert({
      event,
      session_id: sessionId,
      device,
      referer,
      metadata: fullMetadata,
      variant,
      test_name,
    });

    if (error) throw error;

    localStorage.setItem(trackKey, "true");
  
  } catch (err) {
    console.error("❌ Failed to send event", err);
  }
};
