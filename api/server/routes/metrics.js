import express from "express";
import { initDB } from "../db.js";

const router = express.Router();
const db = await initDB();

router.get("/", async (req, res) => {
  try {
    const impressions = await db.get(`
      SELECT COUNT(DISTINCT session_id) AS impressions 
      FROM events 
      WHERE event = 'optin_impression'
    `);

    const clicks = await db.get(`
      SELECT COUNT(DISTINCT session_id) AS clicks 
      FROM events 
      WHERE event = 'optin_click'
    `);

    const completed = await db.get(`
      SELECT COUNT(DISTINCT session_id) AS completed 
      FROM events 
      WHERE event = 'quiz_complete'
    `);

    const quizSteps = await db.all(`
      SELECT event, COUNT(DISTINCT session_id) AS count
      FROM events
      WHERE event LIKE 'quiz_step_%'
      GROUP BY event
      ORDER BY event
    `);

    const byDevice = await db.all(`
      SELECT device, COUNT(DISTINCT session_id) AS count 
      FROM events 
      GROUP BY device
    `);

    // 👇 Get impressions + completions per UTM campaign
    const rawCampaigns = await db.all(`
      SELECT 
        json_extract(oi.metadata, '$.utm.campaign') AS campaign,
        SUM(CASE WHEN e.event = 'optin_impression' THEN 1 ELSE 0 END) AS impressions,
        SUM(CASE WHEN e.event = 'quiz_complete' THEN 1 ELSE 0 END) AS completions
      FROM events e
      JOIN events oi
        ON e.session_id = oi.session_id
       AND oi.event = 'optin_impression'
      WHERE campaign IS NOT NULL
      GROUP BY campaign
      ORDER BY impressions DESC
    `);

    // 👇 Quiz steps grouped by UTM campaign
    const rawSteps = await db.all(`
      SELECT 
        json_extract(oi.metadata, '$.utm.campaign') AS campaign,
        e.event AS step,
        COUNT(DISTINCT e.session_id) AS count
      FROM events e
      JOIN events oi
        ON e.session_id = oi.session_id
       AND oi.event = 'optin_impression'
      WHERE e.event LIKE 'quiz_step_%'
        AND campaign IS NOT NULL
      GROUP BY campaign, step
      ORDER BY campaign, step
    `);

    // 👇 Group steps under each campaign object
    const stepsByCampaign = {};
    for (const row of rawSteps) {
      if (!stepsByCampaign[row.campaign]) {
        stepsByCampaign[row.campaign] = {};
      }
      stepsByCampaign[row.campaign][row.step] = row.count;
    }

    const utmFunnel = rawCampaigns.map((c) => ({
      campaign: c.campaign,
      impressions: c.impressions,
      completions: c.completions,
      steps: stepsByCampaign[c.campaign] || {},
    }));

    res.json({
      impressions: impressions?.impressions || 0,
      clicks: clicks?.clicks || 0,
      completed: completed?.completed || 0,
      quizSteps,
      byDevice,
      utmFunnel,
    });
  } catch (err) {
    console.error("❌ Failed to load metrics:", err);
    res.status(500).json({ error: "Failed to load metrics" });
  }
});

export default router;
