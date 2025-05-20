import React from "react";
import Cal from "@calcom/embed-react";
import ScorecardBenchmarkDesktop from "./ScorecardBenchmarkDesktop";
import LeverageCalculatorDesktop from "./LeverageCalculatorDesktop";
import AdditionalNotes from "./AdditionalNotes";

export default function Results({ name = "Founder", email = "", answers = {}, score, zone, color, workHrs, bleedPerWeek, chokePoints = [] }) {
  const bleed = bleedPerWeek.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  return (
    <div className="bg-[#275659] text-[#F1FDED] min-h-screen flex flex-col items-center gap-14 py-16 px-4 sm:px-8 lg:px-32">
{/*      <header className="text-center space-y-2">
        <h1 className="text-5xl font-extrabold">
          FREEDOM <span className="text-5xl font-extrabold text-[#FF8257]">SCORECARD</span> RESULTS
        </h1>
        <p className="text-[#F1FDED]/70 text-sm max-w-xl mx-auto">
          The raw truth about how much your business relies on you.
        </p>
      </header>*/}

      {/* New Benchmark Scale */}
      <ScorecardBenchmarkDesktop score={score} zone={zone} color={color} benchmark={64} />
      <LeverageCalculatorDesktop revenue={answers.revenue} workHrs={workHrs} />
      <AdditionalNotes chokePoints={chokePoints} />
    {score < 80 && (
      <section className="w-full max-w-5xl bg-[#0f373c] text-white p-8 rounded-2xl shadow-xl space-y-5 text-center">
        <h3 className="text-5xl font-bold">We have 3 more points we want to share...</h3>
        <p className="mt-10 max-w-4xl mx-auto text-3xl/11">
          Claim a <span className="font-extrabold text-red-500">free 30‑minute Clarity Audit</span>. We'll screen‑share and hand you two quick wins to delegate this week.
        </p>
        <p className=" mt-10 text-2xl">
          Founders say just this call, frees up an average of <span className="font-extrabold text-red-500 text-3xl">5h/week</span> instantly.
        </p>
            <blockquote className="mb-15 mt-15 text-3xl/15  mt-2 text-white rounded-2xl border-solid border-green-600 border-8 py-3 italic">
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
      )}
    </div>
  );
}