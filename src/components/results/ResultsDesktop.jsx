import React, { useMemo } from "react";
import Cal from "@calcom/embed-react";
import {
  calculateScore,
  rangeMidpoint,
  zoneLabel,
  moneyLost,
  getChokePoints,
} from "../../utils/quizUtils";

export default function Results({ name = "Founder", email = "", answers = "" }) {
  const score = useMemo(() => calculateScore(answers), [answers]);
  const { zone, color } = zoneLabel(score);
  const workHrs = Math.max(rangeMidpoint(answers.weeklyHours), 1);
  const bleed = moneyLost(workHrs).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const chokePoints = getChokePoints(answers);

  return (
    <div className="bg-[#275659] text-[#F1FDED] min-h-screen flex flex-col items-center gap-14 py-16 px-4 sm:px-8 lg:px-32">
      <header className="text-center space-y-2">
        <h1 className="text-5xl font-extrabold">
          FREEDOM <span className="text-5xl font-extrabold text-[#FF8257]">SCORECARD</span> RESULTS
        </h1>
        <p className="text-[#F1FDED]/70 text-sm max-w-xl mx-auto">
          The raw truth about how much your business relies on you.
        </p>
      </header>

      <section className="w-full max-w-4xl p-8 rounded-2xl shadow-lg bg-white text-[#275659] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-wider text-gray-500">Dependency Score</p>
            <div className={`inline-flex items-center gap-3 ${color} text-white px-5 py-2 rounded-full text-3xl font-extrabold`}>
              {score}
              <span className="text-xs font-medium tracking-wider">{zone}</span>
            </div>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-sm uppercase tracking-wider text-gray-500">Owner hours / week</p>
            <p className="text-4xl font-bold">{workHrs}</p>
          </div>
        </div>
        <p className="text-lg leading-relaxed">
          This dependency is costing you roughly <span className="font-bold text-red-600">{bleed}</span> every week in lost leverage (assuming $250/hr).
        </p>
        <h2 className="text-2xl font-bold mb-2">Here are some notes:</h2>
        <div className="bg-white text-[#275659] rounded-xl p-6">
          {chokePoints.length > 0 ? (
            <ul className="space-y-2 text-md list-disc list-inside marker:text-[#FF8257]">
              {chokePoints.map((point, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: point }} />
              ))}
            </ul>
          ) : (
            <p className="text-2xl italic text-gray-500">
              👍 You're in a solid place—but there's always room to tighten ops.
            </p>
          )}
        </div>
      </section>

      <section className="w-full max-w-4xl bg-[#1E3A40] text-[#F1FDED] p-8 rounded-2xl shadow-xl space-y-5 text-center">
        <h3 className="text-3xl font-bold">We have 3 more points we want to share with you...</h3>
        <p className="max-w-2xl mx-auto">
          Claim a <span className="font-extrabold text-[#FF8257]">free 30‑minute Clarity Audit</span>. We'll screen‑share and hand you two quick wins to delegate this week.
        </p>
        <p className="underline mt-4">
          Founders say this call alone frees up an average of <span className="font-extrabold text-[#FF8257]">5 hours/week</span> instantly.
        </p>
        <blockquote className="italic text-lg mt-6 text-gray-300">
          “I was stuck working 54 hours every week. Now, just 3 weeks later, I work 32 — it keeps going down.”<br />
          <span className="text-md font-medium text-gray-300">— Lisa, founder of a $5.4M electronics company</span>
        </blockquote>
        <div className="rounded-lg overflow-hidden ring-2 ring-white ring-opacity-10 mt-6">
          <Cal
            namespace="clarity-audit"
            calLink={`anatolyspektor/clarity-audit?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`}
            style={{ width: "100%", height: "100%", overflow: "scroll" }}
            config={{ layout: "month_view" }}
          />
        </div>
      </section>
    </div>
  );
}
