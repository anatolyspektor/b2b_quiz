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
    if (score >= 60) return { zone: "YELLOW", color: "bg-yellow-400 text-gray-900" };
    return { zone: "RED", color: "bg-red-600" };
  };


export const moneyLost = (workHrs, revenueLabel, hourlyRate = 250) => {
  const benchmark = getBenchmarkHours(revenueLabel);
  const extraHours = Math.max(workHrs - benchmark, 0);
  return extraHours * hourlyRate;
};

export const getChokePoints = (a) => {
  const points = [];

  if (a.processDocs === "None") points.push("No documented SOPs – staff must ask you before every shipment.");
  if (["1–3", "4–7", "8–15"].includes(a.processDocs)) points.push("<strong>Insufficient SOPs</strong> – most work still depends on your input.");
  if (a.dailyInterrupts && a.dailyInterrupts !== "0–5") points.push(`<strong>${a.dailyInterrupts}</strong> staff interruptions per day turns you into the help desk.`);
  if (["Tired but coping", "Running on fumes", "Close to burnout", "Already burnt out"].includes(a.energyLevel)) {
    points.push(`Energy warning – you're currently <strong>${a.energyLevel.toLowerCase()}</strong>. Time to reclaim mental space.`);
  }
  const ops = a.opsTracking || [];


  if (ops.some(opt => ["Spreadsheets", "Simple software"].includes(opt))) {
    points.push("<strong>Tracking is basic</strong> – hard to spot errors or delegate confidently.");
  } else if (ops.some(opt => ["In my head / paper notes", "We don’t really track it"].includes(opt))) {
    points.push("Ops & inventory tracking is unreliable or non-existent.");
  }

  if (["51–60", "61–70", "71+"].includes(a.weeklyHours)) points.push(`Working <strong>${a.weeklyHours}</strong> hours/week – you're the engine *and* the brakes.`);

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
  const bleedPerWeek = moneyLost(workHrs,answers.revenue);

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


