const questions = [

  // 1 ─────────────── process documentation → rewritten emotionally
  {
    field: "processDocs",
    question: "If you vanished for 2 weeks, what would break first?",
    type: "select",
    options: [
      { label: "Nothing — it runs without me", weight: 20 },
      { label: "Some stuff might slow down",   weight: 15 },
      { label: "I'd get calls hourly",         weight: 10 },
      { label: "It’d collapse by day 3",       weight: 0  },
    ],
  },

  // 2 ─────────────── time invested → reframed
  {
    field: "weeklyHours",
    question: "What does a normal work week look like for you?",
    type: "select",
    options: [
      { label: "I mostly oversee and review",  weight: 20 },
      { label: "I lead, but have free blocks", weight: 15 },
      { label: "I'm deep in ops most days",    weight: 10 },
      { label: "Every hour is booked solid",   weight: 5  },
      { label: "Chaos — I’m everywhere",       weight: 0  },
    ],
  },

  // 3 ─────────────── daily interruptions → reframed
  {
    field: "dailyInterrupts",
    question: "How often does your team need you to unblock something?",
    type: "select",
    options: [
      { label: "Rarely — they know what to do", weight: 20 },
      { label: "A few questions a day",         weight: 15 },
      { label: "Constant Slack/DMs",            weight: 10 },
      { label: "I’m the bottleneck daily",      weight: 0  },
    ],
  },

  // 4 ─────────────── ops tracking → reframed but field-safe
  {
    field: "opsTracking",
    question: "How do you keep track of what gets made, sold, and shipped? (select all that apply)",
    type: "select",
    multi: true,
    options: [
      { label: "Real-time dashboards",          weight: 20 },
      { label: "Simple software we update",     weight: 15 },
      { label: "Spreadsheets + manual review",  weight: 10 },
      { label: "Mostly in my head",             weight: 5  },
      { label: "Honestly… we don’t",            weight: 0  },
    ],
  },

  // 5 ─────────────── personal energy → reframed
  {
    field: "energyLevel",
    question: "How do you feel about your business… really?",
    type: "select",
    options: [
      { label: "Excited — it gives me energy",   weight: 20 },
      { label: "Proud but tired",                weight: 15 },
      { label: "Trapped in the day-to-day",      weight: 10 },
      { label: "Exhausted but pushing through",  weight: 5  },
      { label: "Done — I want out",              weight: 0  },
    ],
  },

  // ─────────────── segmentation (unchanged)
  {
    field: "revenue",
    question: "How much money did your business make last year?",
    type: "select",
    options: [
      { label: "Less than $1M" },
      { label: "$1M–$3M" },
      { label: "$3M–$5M" },
      { label: "$5M–$10M" },
      { label: "$10M–$25M" },
      { label: "$25M–$100M" },
      { label: "$100M+" },
    ],
  },
];

export default questions;