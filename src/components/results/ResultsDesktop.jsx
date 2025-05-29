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

  const overwork = Math.max(workHrs - 40, 0);

  return (
    <div className="bg-[#275659] text-[#F1FDED] min-h-screen flex flex-col items-center gap-14 py-16 px-4 sm:px-8 lg:px-32">
      {/* Score & Time Sections */}
      <ScorecardBenchmarkDesktop score={score} zone={zone} color={color} benchmark={64} />
      <LeverageCalculatorDesktop revenue={answers.revenue} workHrs={workHrs} />
      <AdditionalNotes chokePoints={chokePoints} />

      {score < 80 && (
        <section className="w-full max-w-5xl bg-[#0f373c] text-white p-10 rounded-2xl shadow-xl space-y-10 text-center">
          <p className="text-sm text-green-400 tracking-wider uppercase">
            Most founders never fix this.
          </p>
          <h3 className="text-5xl font-bold">Get your time back</h3>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
            We’ll show you 2 things to delegate this week. Live.
          </p>

          <div className="flex flex-col items-center gap-4 max-w-3xl mx-auto">
            <div className="flex items-start gap-4 text-left">
              <div className="border-l-4 border-green-400 pl-4">
                <p className="text-2xl italic text-white leading-snug">
                  “I was doing 54h. Now 32h. Took 3 weeks.”
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="w-10 h-10 rounded-full bg-white text-[#0f373c] font-bold flex items-center justify-center text-lg">
                    A
                  </div>
                  <span className="text-xl text-gray-300">Albert, $4.2M OEM</span>
                </div>
              </div>
            </div>
          </div>

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
