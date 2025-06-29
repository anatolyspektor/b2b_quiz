import React from "react";
import ScorecardBenchmarkMobile from "../results/ScorecardBenchmarkMobile";
import LeverageCalculatorMobile from "../results/LeverageCalculatorMobile";
import AdditionalNotes from "../results/AdditionalNotes";

export default function EmailGateMobile({
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
    <section className="relative min-h-screen flex flex-col items-center justify-start px-4 py-10 bg-[#275659] overflow-y-auto">
      
      {/* 1. Blurred Dependency Score */}
      <div className="mb-12 w-full">
        <ScorecardBenchmarkMobile score={score} zone={zone} benchmark={64} preview />
      </div>

      {/* 2. Email Form */}
      <div className="relative z-10 w-full bg-[#1a3b3b] backdrop-blur-sm bg-opacity-80 rounded-xl px-4 py-8 text-center shadow-md">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-4 w-full rounded-md border px-10 py-10 text-5xl shadow-sm placeholder-white"
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
          className="mt-4 w-full rounded-md border px-10 py-10 text-5xl shadow-sm placeholder-white"
          style={{
            color: "#F1FDED",
            borderColor: "#F1FDED",
            backgroundColor: "transparent",
          }}
        />
        {error && <p className="text-red-400 text-4xl mt-4">{error}</p>}

        <button
          onClick={onSubmit}
          className="mt-6 w-full rounded-md px-10 py-10 text-white text-6xl font-semibold transition bg-red-500 hover:bg-red-600"
        >
          Show Full Scorecard
        </button>
      </div>

      {/* 3. Blurred Hidden Cost */}
      <div className="mt-12 w-full">
        <LeverageCalculatorMobile scoreZone={zone} color={color} preview />
      </div>

      <div className="mt-12 w-full max-w-4xl">
       <AdditionalNotes chokePoints={chokePoints} preview />
      </div>
    </section>
  );
}
