
const API = "http://localhost:3001";

export const saveCustomer = async ({ name, email, sessionId, device }) => {
  try {
    await fetch(`${API}/customer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, sessionId, device }),
    });
  } catch (err) {
    console.error("❌ Failed to save customer", err);
  }
};