import { v4 as uuid } from "uuid";

export const getSessionId = () => {
  let sessionId = localStorage.getItem("session_id");

  if (!sessionId) {
    sessionId = uuid();
    localStorage.setItem("session_id", sessionId);
  }

  return sessionId;
};
