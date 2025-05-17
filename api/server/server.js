import express from 'express';
import cors from 'cors';
import { initDB } from './db.js';
import metricsRoutes from "./routes/metrics.js";


const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use("/metrics", metricsRoutes);

let db;

// POST /track → saves an event
app.post('/track', async (req, res) => {
  const { event, sessionId, device, metadata, referer } = req.body;
  console.log("📦 Incoming Event:", req.body);

  try {
    if (!event || !sessionId || !device) {
      console.warn("⚠️ Skipping invalid event payload:", req.body);
      return res.status(400).send("Missing required fields");
    }

    await db.run(
      `INSERT INTO events (event, session_id, device, referer, metadata)
       VALUES (?, ?, ?, ?, ?)`,
      [
        event,
        sessionId,
        device || 'unknown',
        referer || '',
        JSON.stringify(metadata || {})
      ]
    );

    res.json({ success: true });
  } catch (err) {
    console.error('❌ Failed to save event:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /customer → saves customer info
app.post('/customer', async (req, res) => {
  const { name, email, sessionId, device } = req.body;

  try {
    await db.run(
      `INSERT INTO customers (name, email, session_id, device)
       VALUES (?, ?, ?, ?)`,
      [name, email, sessionId, device || 'unknown']
    );

    res.json({ success: true });
  } catch (err) {
    console.error('❌ Failed to save customer:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start server
const start = async () => {
  db = await initDB();
  app.listen(PORT, () => {
    console.log(`✅ Metrics server listening at http://localhost:${PORT}`);
  });
};

start();
