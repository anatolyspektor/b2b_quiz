import { serve } from "https://deno.land/std/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "*",
  "Content-Type": "application/json",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const body = await req.json();
    const KLAVIYO_API_KEY = Deno.env.get("KLAVIYO_API_KEY");

    if (!KLAVIYO_API_KEY) {
      return new Response(JSON.stringify({ error: "Missing API Key" }), {
        status: 500,
        headers: corsHeaders,
      });
    }

    // 1. Create or update the profile
    const profileRes = await fetch("https://a.klaviyo.com/api/profiles/", {
      method: "POST",
      headers: {
        "Authorization": `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        "Content-Type": "application/json",
        "revision": "2023-10-15",
      },
      body: JSON.stringify({
        data: {
          type: "profile",
          attributes: {
            email: body.email,
            properties: {
              name: body.name,
              score: body.score,
              zone: body.zone,
              workHrs: body.workHrs,
              bleedPerWeek: body.bleedPerWeek,
              revenue: body.revenue,
              chokePoints: body.chokePoints,
              quiz_complete: true,
              call_booked: false,
            },
          },
        },
      }),
    });

    const profileJson = await profileRes.json();

    if (!profileRes.ok) {
      return new Response(JSON.stringify({ error: "Profile creation failed", details: profileJson }), {
        status: profileRes.status,
        headers: corsHeaders,
      });
    }

    const profileId = profileJson.data?.id;

    if (!profileId) {
      return new Response(JSON.stringify({ error: "Missing profile ID from Klaviyo response" }), {
        status: 500,
        headers: corsHeaders,
      });
    }

    // 2. Add profile to list
    const listRes = await fetch("https://a.klaviyo.com/api/lists/TjiSLz/relationships/profiles/", {
      method: "POST",
      headers: {
        "Authorization": `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        "Content-Type": "application/json",
        "revision": "2023-10-15",
      },
      body: JSON.stringify({
        data: [
          {
            type: "profile",
            id: profileId,
          },
        ],
      }),
    });

    const listResText = await listRes.text();

    if (!listRes.ok) {
      return new Response(JSON.stringify({ error: "List add failed", details: listResText }), {
        status: listRes.status,
        headers: corsHeaders,
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: corsHeaders,
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});
