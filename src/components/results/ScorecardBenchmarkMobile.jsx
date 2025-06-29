import React from "react";

export default function ScorecardBenchmarkMobile({
  score = 0,
  zone = "", // "RED" | "YELLOW" | "GREEN"
  benchmark = 64,
  preview = false,
}) {
  const rawPercentile = 50 + ((score - benchmark) / (100 - benchmark)) * 50;
  const boundedPercentile = Math.max(1, Math.min(Math.round(rawPercentile), 99));

  const zoneColors = {
    RED: "bg-red-500",
    YELLOW: "bg-yellow-400",
    GREEN: "bg-green-500",
  };

  const textColor = {
    RED: "text-red-500",
    YELLOW: "text-yellow-400",
    GREEN: "text-green-500",
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-xl bg-[#0f373c] text-white shadow-lg p-8 space-y-5">
      <h3 className="text-7xl font-bold text-center">Dependency Score</h3>

      <div className="flex flex-col items-center gap-10">
        {/* Circle */}
        <div className="relative w-56 h-56">
          <svg viewBox="0 0 42 42" className="w-full h-full rotate-[-90deg]">
            {/* RED */}
            <circle r="16" cx="21" cy="21" fill="transparent" stroke="red" strokeWidth="4" strokeDasharray="40 60" />
            {/* YELLOW */}
            <circle r="16" cx="21" cy="21" fill="transparent" stroke="#facc15" strokeWidth="4" strokeDasharray="35 65" strokeDashoffset="-40" />
            {/* GREEN */}
            <circle r="16" cx="21" cy="21" fill="transparent" stroke="green" strokeWidth="4" strokeDasharray="25 75" strokeDashoffset="-75" />
          </svg>

          {/* Score in center */}
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full flex items-center justify-center text-[#0f373c] text-5xl font-bold ${zoneColors[zone]}`}>
            {score}
          </div>
        </div>

        {/* Text below — blurred if preview */}
        <div className={`text-center space-y-6 max-w-lg ${preview ? "blur-sm select-none" : ""}`}>
          <p className="text-5xl font-medium leading-snug">
            You're <span className="font-bold">{boundedPercentile >= 50 ? "above" : "below"}</span>{" "}
            <span className={textColor[zone] + " font-bold"}>{boundedPercentile}%</span> of founders.
          </p>

          {zone === "RED" && boundedPercentile < 50 && (
            <p className="text-4xl text-gray-300">
              That’s why everything still runs through you.
            </p>
          )}

          {zone === "YELLOW" && (
            <p className="text-4xl text-gray-300">
              Most founders score around {benchmark}. Target for true freedom is 85+.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
