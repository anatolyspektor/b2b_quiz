import React from "react";
import ScorecardBenchmarkMobile from "./ScorecardBenchmarkMobile";
import LeverageCalculatorMobile from "./LeverageCalculatorMobile";

export default function Results({
  name = "Founder",
  email = "",
  answers = {},
  score,
  zone,
  color,
  workHrs,
  bleedPerWeek,
}) {
  const bleed = bleedPerWeek.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const overwork = Math.max(workHrs - 40, 0);

  return (
    <div className="bg-[#275659] text-[#F1FDED] min-h-screen flex flex-col gap-12 py-10 px-4">
      {/* 1. Dependency Score */}
      <ScorecardBenchmarkMobile score={score} zone={zone} color={color} benchmark={64} />

      {/* 2. Time Cost */}
      <LeverageCalculatorMobile revenue={answers.revenue} workHrs={workHrs} />

      {/* 3. CTA Block */}
      {score < 80 && (
        <div className="bg-[#1a3b3b] text-white p-8 rounded-2xl text-center  shadow-lg space-y-7">
          {/* Hook */}
          <p className="text-xl text-green-400 tracking-wider uppercase">
            Most founders never fix this.
          </p>

          {/* Headline */}
          <h3 className="text-6xl font-bold leading-tight">
            Get your time back
          </h3>

          {/* Subheadline */}
          <p className="text-4xl text-gray-300">
            We’ll show you 2 things to delegate this week. Live.
          </p>

          {/* Quote Block */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-start gap-4 max-w-md text-left">
              <div className="border-l-4 border-green-400 pl-4">
                <p className="text-3xl italic text-white leading-snug">
                  “I was doing 54h. Now 32h. Took 3 weeks.”
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="w-10 h-10 rounded-full bg-white text-[#0f373c] font-bold flex items-center justify-center text-lg">
                    A
                  </div>
                  <span className="text-2xl text-gray-300">Albert, $4.2M OEM</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => {
              const url = `https://cal.com/anatolyspektor/clarity-audit?name=${encodeURIComponent(
                name
              )}&email=${encodeURIComponent(email)}`;
              window.location.href = url;
            }}
            className="mt-5 w-full rounded-lg px-6 py-5 text-6xl font-bold text-white shadow bg-orange-500 hover:bg-[#ea580c]"
          >
            Help Me Win Back My Time
          </button>

          {/* Urgency */}
          <p className="text-2xl text-gray-500">
            Only 4 free calls left this week.
          </p>
        </div>
      )}
      <div className="mt-30"></div>
    </div>

  );
}
