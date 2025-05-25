// supabase/functions/fb-conversion/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
    if (req.method === "OPTIONS") {
    return new Response("OK", {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "*",
      },
    })
  }

  const body = await req.json();
  const { event_name, email, session_id, timestamp, event_id } = body;


  const response = await fetch(
    Deno.env.get("FB_TRACKING_URL"),
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [
          {
            event_name,
            event_time: timestamp || Math.floor(Date.now() / 1000),
            event_id,
            user_data: {
              em: email ? [hashEmail(email)] : undefined,
              client_user_agent: req.headers.get("user-agent"),
            },
            event_source_url: body.url || "https://scalecheck.co",
            action_source: "website",
          },
        ],
        access_token: Deno.env.get("FB_TRACKING_TOKEN"),
      }),
    }
  );

  const resJson = await response.json();
     return new Response(JSON.stringify(resJson), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // or use your domain instead of "*"
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    });
});

function hashEmail(email: string) {
  return crypto.subtle
    .digest("SHA-256", new TextEncoder().encode(email.trim().toLowerCase()))
    .then((hashBuffer) =>
      Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
    );
}
