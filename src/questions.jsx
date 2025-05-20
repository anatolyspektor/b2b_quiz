const questions = [
  {
    field: "weeklyHours",
    question: "How many hours did you work last week?",
    type: "select",
    options: [
      { label: "Less than 40", weight: 5 },
      { label: "40–50", weight: 10 },
      { label: "51–60", weight: 15 },
      { label: "61–70", weight: 18 },
      { label: "71+", weight: 22 }
    ]
  },
  {
    field: "processDocs",
    question: "Do you have all the important process documented and regularly updated?",
    type: "select",
    options: [
      { label: "Yes", weight: 0 },
      { label: "No", weight: 20 }
    ]
  },
  {
    field: "dailyInterrupts",
    question: "How many times do team members ask you quick questions each day?",
    type: "select",
    options: [
      { label: "0–5", weight: 0 },
      { label: "6–10", weight: 7 },
      { label: "11–20", weight: 10 },
      { label: "21–30", weight: 15 },
      { label: "31+", weight: 23 }
    ]
  },
  {
    field: "opsTracking",
    question: "How do you keep track of what your business makes and sells? (select all that apply)",
    type: "select",
    multi: true,
    options: [
      { label: "In my head / paper notes", weight: 20 },
      { label: "Spreadsheets", weight: 6 },
      { label: "Simple software", weight: 4 },
      { label: "Special tools", weight: 1 },
      { label: "We don’t really track it", weight: 8 }
    ]
  },
  {
    field: "energyLevel",
    question: "How do you feel on Monday mornings?",
    type: "select",
    options: [
      { label: "Full of energy and ready", weight: 0 },
      { label: "A little tired but okay", weight: 2 },
      { label: "Very tired", weight: 5 },
      { label: "Almost burned out", weight: 7 },
      { label: "Totally burned out", weight: 15 }
    ]
  },
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
      { label: "$100M+" }
    ]
  }
];

export default questions;
