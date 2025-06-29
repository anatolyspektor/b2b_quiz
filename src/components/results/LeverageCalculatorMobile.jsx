import React from "react";
import { moneyLost } from "@/utils/quizUtils";

export default function LeverageCalculatorMobile({ scoreZone, color, preview = false }) {
  const moneyBleed = moneyLost(scoreZone);

  return (
    <div className="w-full max-w-5xl mx-auto rounded-xl bg-[#0f373c] text-white shadow-lg p-8 space-y-10">
      <h3 className="text-7xl font-bold text-center">The Hidden Cost</h3>

      <div className="text-center text-3xl sm:text-4xl font-semibold">
        Founders in this zone typically lose:
      </div>

      <div className={`mx-auto max-w-lg text-center text-5xl font-bold ${color}`}>
        {preview ? (
          <span className="blur-sm select-none">{moneyBleed}</span>
        ) : (
          moneyBleed
        )}
      </div>

      <p className="text-center text-3xl text-white/80 mt-4">
        From staying stuck in ops, firefighting, or not delegating.
      </p>
    </div>
  );
}