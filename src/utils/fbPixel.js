export const trackFbEvent = (eventName, params = {}) => {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;

  const eventID = crypto.randomUUID();

  try {
    // 1. Send client-side Pixel
    window.fbq("track", eventName, {
      ...params,
      eventID,
    });

    const webhookUrl = import.meta.env.VITE_FB_WEBHOOK_URL;

    fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: eventName,
        event_id: eventID,
        ...params,
      }),
    });
  } catch (err) {
    console.warn(`❌ FB Pixel + API tracking failed: ${eventName}`, err);
  }
};

