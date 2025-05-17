export const getSessionId = () => {
  let sessionId = localStorage.getItem("session_id");

  if (!sessionId) {
    sessionId = crypto.randomUUID(); // ✅ built into modern browsers
    localStorage.setItem("session_id", sessionId);
  }

  return sessionId;
};
