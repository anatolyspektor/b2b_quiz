const questions = [
  // 1 ─────────────── time invested
  {
    field: "weeklyHours",
    question: "How many hours did you work last week?",
    type: "select",
    options: [
      { label: "Less than 40", weight: 20 },
      { label: "40–50",        weight: 15 },
      { label: "51–60",        weight: 10 },
      { label: "61–70",        weight: 5  },
      { label: "71+",          weight: 0  },
    ],
  },

  // 2 ─────────────── process documentation
  {
    field: "processDocs",
    question: "Do you have all the important processes documented and regularly updated?",
    type: "select",
    options: [
      { label: "Yes", weight: 20 },
      { label: "No",  weight: 0  },
    ],
  },

  // 3 ─────────────── daily interruptions
  {
    field: "dailyInterrupts",
    question: "How many times do team members ask you quick questions each day?",
    type: "select",
    options: [
      { label: "0–5",  weight: 20 },
      { label: "6–10", weight: 15 },
      { label: "11–20",weight: 10 },
      { label: "21–30",weight: 5  },
      { label: "31+",  weight: 0  },
    ],
  },

  // 4 ─────────────── ops / inventory tracking  (multi-select → keep best score)
  {
    field: "opsTracking",
    question: "How do you keep track of what your business makes and sells? (select all that apply)",
    type: "select",
    multi: true,
    options: [
      { label: "Special tools",                weight: 20 },
      { label: "Simple software",              weight: 15 },
      { label: "Spreadsheets",                 weight: 10 },
      { label: "In my head / paper notes",     weight: 5  },
      { label: "We don’t really track it",     weight: 0  },
    ],
  },

  // 5 ─────────────── personal energy
  {
    field: "energyLevel",
    question: "How do you feel on Monday mornings?",
    type: "select",
    options: [
      { label: "Full of energy and ready", weight: 20 },
      { label: "A little tired but okay",  weight: 15 },
      { label: "Very tired",               weight: 10 },
      { label: "Almost burned out",        weight: 5  },
      { label: "Totally burned out",       weight: 0  },
    ],
  },

  // (Not scored – purely demographic / segmentation)
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
