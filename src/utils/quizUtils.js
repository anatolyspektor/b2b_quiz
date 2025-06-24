// utils/quizUtils.js
import questions from "../questions";

export const calculateScore = (answers) => {
  return questions.reduce((sum, q) => {
    const val = answers[q.field];
    const option = q.options?.find((opt) => opt.label === val);
    return sum + (option?.weight || 0);
  }, 0);
};

export const rangeMidpoint = (label) => {
  if (!label || typeof label !== "string") return 0;
  const sanitized = label.replace(/[$,]/g, "");
  const match = sanitized.match(/(\d+)[^\d]+(\d+)/);
  if (match) {
    const low = parseInt(match[1]);
    const high = parseInt(match[2]);
    return Math.round((low + high) / 2);
  }
  if (/Less than (\d+)/.test(sanitized)) return parseInt(sanitized.match(/\d+/)[0]) * 0.5;
  if (/(\d+)\+/.test(sanitized)) return parseInt(sanitized.match(/\d+/)[0]) * 1.2;
  return parseInt(sanitized.match(/\d+/)?.[0] || "0");
};

  export const zoneLabel = (score) => {
    if (score >= 80) return { zone: "GREEN", color: "bg-green-500" };
    if (score >= 30) return { zone: "YELLOW", color: "bg-yellow-400 text-gray-900" };
    return { zone: "RED", color: "bg-red-600" };
  };


export const moneyLost = (scoreZone) => {
  switch (scoreZone) {
    case "RED":
      return "$5K – $10K+ / week";
    case "YELLOW":
      return "$1K – $5K / week";
    case "GREEN":
      return "Minimal — you're in control";
    default:
      return "Unknown";
  }
};

export const getChokePoints = (a) => {
  const points = [];

  // Process docs
  switch (a.processDocs) {
    case "I'd get calls hourly":
      points.push("Team would call you constantly — you’re still the ops brain.");
      break;
    case "It’d collapse by day 3":
      points.push("You’re holding the whole system together. Not scalable.");
      break;
    case "Some stuff might slow down":
      points.push("Partial dependency on you — progress stalls without you.");
      break;
  }

  // Time invested
  switch (a.weeklyHours) {
    case "I'm deep in ops most days":
      points.push("You’re buried in daily work — no space to actually lead.");
      break;
    case "Every hour is booked solid":
      points.push("Zero margin — your calendar runs you.");
      break;
    case "Chaos — I’m everywhere":
      points.push("You’re putting out fires instead of building fireproof systems.");
      break;
  }

  // Interruptions
  switch (a.dailyInterrupts) {
    case "Constant Slack/DMs":
      points.push("You’re on-call 24/7 — can’t step away without pings.");
      break;
    case "I’m the bottleneck daily":
      points.push("Every decision flows through you — ops can’t breathe.");
      break;
    case "A few questions a day":
      points.push("Your team still depends on you too much for day-to-day.");
      break;
  }

  // Ops tracking (multi)
  const ops = a.opsTracking || [];
  if (ops.includes("Spreadsheets + manual review")) {
    points.push("You track things manually — easy to miss errors.");
  }
  if (ops.includes("Mostly in my head")) {
    points.push("Info lives in your head — can’t delegate what’s not documented.");
  }
  if (ops.includes("Honestly… we don’t")) {
    points.push("You have no real tracking — massive blind spot.");
  }

  // Energy
  switch (a.energyLevel) {
    case "Trapped in the day-to-day":
      points.push("You feel stuck in the weeds — not running the business, just surviving it.");
      break;
    case "Exhausted but pushing through":
      points.push("You're pushing hard but close to burning out.");
      break;
    case "Done — I want out":
      points.push("Burnout alert — you’re checked out mentally.");
      break;
  }

  return points;
};


export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const handleOptionAnswer = ({ value, question, prevAnswers }) => {
  const updatedAnswers = { ...prevAnswers };

  if (question.multi) {
    const currentVals = updatedAnswers[question.field] || [];
    updatedAnswers[question.field] = currentVals.includes(value)
      ? currentVals.filter((v) => v !== value)
      : [...currentVals, value];
  } else {
    updatedAnswers[question.field] = value;
  }

  return updatedAnswers;
};

export const isAnswerSelected = ({ question, answers, value }) => {
  const val = answers[question?.field];
  return question?.multi
    ? Array.isArray(val) && val.includes(value)
    : val === value;
};

export const generateScorecard = (answers) => {
  const score = calculateScore(answers);
  const workHrs = Math.max(rangeMidpoint(answers.weeklyHours), 1);
  const chokePoints = getChokePoints(answers); // HTML version
  const chokePointsNoHTML = chokePoints.map(p =>
    p.replace(/<\/?[^>]+(>|$)/g, "")
  );
  const { zone, color } = zoneLabel(score);
  const bleedPerWeek = moneyLost(zone);

  return {
    score,
    workHrs,
    zone,
    color,
    bleedPerWeek,
    chokePoints: chokePointsNoHTML, // for Supabase + Slack
    chokePointsHTML: chokePoints,   // for frontend
  };
};

export const getBenchmarkHours = (revenueLabel) => {
  switch (revenueLabel) {
    case "Less than $1M":
      return 40;
    case "$1M–$3M":
      return 40;
    case "$3M–$5M":
      return 40;
    case "$5M–$10M":
      return 35;
    case "$10M–$25M":
      return 30;
    case "$25M–$100M":
    case "$100M+":
      return 40;
    default:
      return 40; // fallback for unknown values
  }
};


