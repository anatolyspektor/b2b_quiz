import React from "react";
import ScorecardBenchmarkDesktop from "../results/ScorecardBenchmarkDesktop";
import LeverageCalculatorDesktop from "../results/LeverageCalculatorDesktop";
import AdditionalNotes from "../results/AdditionalNotes";

export default function EmailGateDesktop({
  name,
  email,
  setName,
  setEmail,
  onSubmit,
  error,
  score,
  zone,
  color,
  workHrs,
  bleedPerWeek,
  chokePoints
}) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start px-8 py-10 bg-[#275659] overflow-y-auto">

      {/* 1. Score Preview */}
      <div className="mb-12 w-full max-w-4xl">
        <ScorecardBenchmarkDesktop
          score={score}
          zone={zone}
          benchmark={64}
          preview
        />
      </div>

      {/* 2. Email Card (floating, dark green) */}
      <div className="w-full max-w-4xl text-center space-y-6  rounded-xl bg-[#1a3b3b] backdrop-blur-sm bg-opacity-80 shadow-lg px-10 py-10">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border px-6 py-5 text-2xl shadow-sm placeholder-white"
          style={{
            color: "#F1FDED",
            borderColor: "#F1FDED",
            backgroundColor: "transparent",
          }}
        />

        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border px-6 py-5 text-2xl shadow-sm placeholder-white"
          style={{
            color: "#F1FDED",
            borderColor: "#F1FDED",
            backgroundColor: "transparent",
          }}
        />

        {error && <p className="text-red-400 text-xl">{error}</p>}

        <button
          onClick={onSubmit}
          className="w-full rounded-md px-6 py-5 text-white text-2xl font-semibold transition bg-red-500 hover:bg-red-600"
        >
          Show Full Scorecard
        </button>
      </div>

      {/* 3. Hidden Cost Preview (Blurred) */}
      <div className="mt-12 w-full max-w-4xl">
        <LeverageCalculatorDesktop
          scoreZone={zone}
          color={color}
          preview
        />
      </div>
      <div className="mt-12 w-full max-w-4xl">
       <AdditionalNotes chokePoints={chokePoints} preview />
      </div>

    </section>
  );
}
