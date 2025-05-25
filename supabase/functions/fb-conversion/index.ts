import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "*",
  "Content-Type": "application/json"
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("OK", {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const body = await req.json();
    const { event_name, email, session_id, timestamp, event_id, url } = body;

    if (!["Lead", "Schedule"].includes(event_name)) {
      return new Response(JSON.stringify({ message: "Ignored event" }), {
        status: 200,
        headers: corsHeaders,
      });
    }

    const hashedEmail = email ? await hashEmail(email) : undefined;

    const res = await fetch(Deno.env.get("FB_TRACKING_URL"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [
          {
            event_name,
            event_time: timestamp || Math.floor(Date.now() / 1000),
            event_id,
            event_source_url: url || "https://scalecheck.co",
            action_source: "website",
            user_data: {
              em: hashedEmail ? [hashedEmail] : undefined,
              client_user_agent: req.headers.get("user-agent") || "",
            },
          },
        ],
        access_token: Deno.env.get("FB_SECRET_TOKEN"),
      }),
    });

    const json = await res.json();
    return new Response(JSON.stringify(json), { status: 200, headers: corsHeaders });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message || "Unknown error" }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});

async function hashEmail(email: string) {
  const buffer = new TextEncoder().encode(email.trim().toLowerCase());
  const digest = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, "0")).join("");
}
