import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

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

  const body = await req.json()

  const webhookUrl = "https://hooks.slack.com/services/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"

  const slackPayload = {
    text: body.text || "📞 New Event",
    blocks: body.blocks || [],
  }

  const slackRes = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(slackPayload),
  })

  return new Response(JSON.stringify({ ok: slackRes.ok }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // 👈 This is the key line
    },
  })
})
