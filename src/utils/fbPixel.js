export const trackFbEvent = (eventName, params = {}) => {
  const isProd = import.meta.env.MODE === "production";
  const isAdminRoute = window.location.pathname.includes("funnel-stats");

  if (!isProd || isAdminRoute) return;

  if (typeof window.fbq !== "function") {
    setTimeout(() => {
      if (typeof window.fbq === "function") {
        window.fbq("track", eventName, params);
      }
    }, 1000); // wait 1 second
    return;
  }

  try {
    window.fbq("track", eventName, params);
  } catch (err) {
    console.warn(`❌ FB Pixel event failed: ${eventName}`, err);
  }
};
