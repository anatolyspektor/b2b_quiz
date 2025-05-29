import React from "react";
import { getBenchmarkHours } from "@/utils/quizUtils";

export default function LeverageCalculatorMobile({ revenue, workHrs, hourlyRate = 250 }) {
  const benchmark = 30;
  const extraHours = Math.max(workHrs - benchmark, 0);
  const bleed = extraHours * hourlyRate;

  return (
    <div className="w-full max-w-5xl mx-auto rounded-xl bg-[#0f373c] text-white shadow-lg p-8 space-y-10">
      <h3 className="text-6xl font-bold text-center">What It's Costing You</h3>

      {/* Premium stacked layout */}
      <div className="flex flex-col items-center space-y-6">
        <div className="text-center">
          <p className="text-gray-400 text-4xl mb-1">You</p>
          <p className="font-bold text-7xl">{workHrs}h</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-4xl mb-1">Benchmark</p>
          <p className="font-bold text-7xl">{benchmark}h</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-4xl mb-1">Over</p>
          <p className="font-bold text-red-500 text-7xl">+{extraHours}h</p>
        </div>
      </div>

      {extraHours > 0 ? (
        <div className="text-center mt-16 space-y-2">
          <p className="text-3xl font-semibold">You’re burning</p>
          <p className="text-red-500 text-6xl font-bold">
            ${bleed.toLocaleString()}
          </p>
          <p className="text-gray-300 text-3xl">a week doing what others should.</p>
        </div>
      ) : (
        <div className="text-center text-green-300 text-2xl font-semibold">
          You're within benchmark. Well done.
        </div>
      )}
    </div>
  );
}