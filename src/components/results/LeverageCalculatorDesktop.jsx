import React from "react";
import { moneyLost } from "@/utils/quizUtils";

export default function LeverageCalculatorDesktop({ scoreZone, color, preview = false }) {
  const moneyBleed = moneyLost(scoreZone);

  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl bg-[#0f373c] text-white shadow-xl p-12 space-y-8">
      <h3 className="text-5xl font-bold text-center">The Hidden Cost</h3>

      <p className="text-center text-3xl font-medium">
        Founders in this zone typically lose:
      </p>

      <div className={`max-w-2xl mx-auto text-center text-5xl font-extrabold ${color}`}>
        {preview ? (
          <span className="blur-sm select-none">{moneyBleed}</span>
        ) : (
          moneyBleed
        )}
      </div>

      <p className="text-center text-2xl text-white/70">
        From staying stuck in ops, firefighting, or not delegating.
      </p>
    </div>
  );
}
