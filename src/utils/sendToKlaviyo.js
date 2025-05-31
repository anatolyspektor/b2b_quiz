export async function sendToKlaviyo({ name, email, score, zone, color, workHrs, bleedPerWeek, revenue }) {
  // Only production
  const isProd = import.meta.env.MODE === "production";
  if (!isProd || typeof window === "undefined" || typeof window.fbq !== "function") return;

  const webhookUrl = import.meta.env.VITE_SEND_TO_KLAVYIO;

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        score,
        zone,
        color,
        workHrs,
        bleedPerWeek,
        revenue,
      }),
    });

    if (!response.ok) {
      console.error("Klaviyo send failed:", await response.text());
    }
  } catch (err) {
    console.error("Error sending to Klaviyo:", err);
  }
}

export async function markKlaviyoCallBooked(email) {
  const webhookUrl = import.meta.env.VITE_KLAVYIO_SET_CALL_BOOKED;

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) throw new Error("Failed to mark call_booked");
    return true;
  } catch (err) {
    console.error("Klaviyo call_booked update failed:", err.message);
    return false;
  }
}
