import React from "react";
import Cal from "@calcom/embed-react";
import ScorecardBenchmarkMobile from "./ScorecardBenchmarkMobile";
import LeverageCalculatorMobile from "./LeverageCalculatorMobile";
import AdditionalNotes from "./AdditionalNotes";

export default function Results({ name = "Founder",email = "",
  answers = {},
  score,
  zone,
  color,
  workHrs,
  bleedPerWeek,
  chokePoints = [],
}) {
  const bleed = bleedPerWeek.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  return (
    <div className="bg-[#275659] text-[#F1FDED] min-h-screen flex flex-col gap-8 py-8 px-4">
      <ScorecardBenchmarkMobile score={score} zone={zone} color={color} benchmark={64} />
      <LeverageCalculatorMobile revenue={answers.revenue} workHrs={workHrs} />
      <AdditionalNotes chokePoints={chokePoints} />
   {score < 80 && (
      <div className="mt-5 bg-[#0f373c] text-white p-6 rounded-2xl space-y-2 text-center">
        <h3 className="text-center text-7xl font-bold">We have 3 more points to share...</h3>
        <p className="mb-10 text-6xl mt-10">
          Claim a <span className="font-extrabold text-red-500">free 30‑minute Clarity Audit</span>. 
        </p>
        <p className="text-5xl ">We'll screen‑share and hand you two quick wins to delegate this week.</p>
        <blockquote className="mb-15 mt-15 text-5xl/15  mt-2 text-white rounded-2xl border-solid border-green-600 border-8 py-3 italic">
          “I was stuck working 54 hours every week. Now, just 3 weeks later, I work 32 — it keeps going down.”<br />
          <span className="text-3xl font-medium">— Lisa, $5.4M OEM</span>
        </blockquote>

        <div className="w-full text-center">
          <button
            onClick={() => {
              const url = `https://cal.com/anatolyspektor/clarity-audit?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;
              window.location.href = url;
            }}
            className="w-full rounded-md px-8 py-6 text-6xl font-semibold text-white shadow transition bg-orange-500 mb-50"
          >
            Claim Your FREE Call
          </button>
        </div>
      </div>
      )}
    </div>
  );
}
