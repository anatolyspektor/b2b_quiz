import React from "react";
import { moneyLost } from "@/utils/quizUtils";

export default function LeverageCalculatorDesktop({ scoreZone, color }) {
  const moneyBleed = moneyLost(scoreZone);

  return (
    <div className="w-full max-w-5xl mx-auto rounded-xl bg-[#0f373c] text-white shadow-lg p-6 md:p-8 space-y-6">
      <h3 className="text-5xl sm:text-5xl font-bold text-center mb-15">The Hidden Cost</h3>

      <div className="text-center text-2xl sm:text-4xl font-semibold">
        Founders in this zone typically lose:
      </div>

      <div className={` mx-auto max-w-lg text-center text-5xl font-bold  ${color}`}>
        {moneyBleed}
      </div>

      <p className="text-center text-xl sm:text-2xl text-white/80 mt-4">
        From staying stuck in ops, firefighting, or not delegating.
      </p>
    </div>
  );
}
