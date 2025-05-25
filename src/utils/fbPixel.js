const isProd = import.meta.env.MODE === "production";
const isAdminRoute = window.location.pathname.includes("funnel-stats");

export const trackFbEvent = (eventName, params = {}) => {
  if (!isProd || isAdminRoute || typeof window.fbq !== "function") return;

  try {
    window.fbq("track", eventName, params);
  } catch (err) {
    console.warn(`❌ FB Pixel event failed: ${eventName}`, err);
  }
};