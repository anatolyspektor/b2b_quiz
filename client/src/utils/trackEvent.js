import { API } from "./api";



function getUTMParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get("utm_source") || "",
    medium: params.get("utm_medium") || "",
    campaign: params.get("utm_campaign") || "",
    term: params.get("utm_term") || "",
    content: params.get("utm_content") || "",
  };
}

export const trackEvent = async ({ event, sessionId, device, metadata = {} }) => {
  const referer = document.referrer || window.location.href;
  const utmKey = `utm_saved`;
  const trackKey = `tracked_${event}_${sessionId}`;

  // avoid duplicate event tracking per session
  if (localStorage.getItem(trackKey)) return;

  // decide if we should send UTM (only once per session)
  const shouldSendUTM = !localStorage.getItem(utmKey);
  const fullMetadata = {
    ...metadata,
    ...(shouldSendUTM ? { utm: getUTMParams() } : {}),
  };

  try {
    await fetch(`${API}/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        sessionId,
        device,
        referer,
        metadata: fullMetadata,
      }),
    });

    // mark that we’ve saved this event and UTM
    localStorage.setItem(trackKey, "true");
    if (shouldSendUTM) {
      localStorage.setItem(utmKey, "true");
    }
  } catch (err) {
    console.error("❌ Failed to send event", err);
  }
};
