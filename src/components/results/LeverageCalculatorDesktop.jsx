import React from "react";
import { getBenchmarkHours } from "@/utils/quizUtils";

export default function LeverageCalculatorDesktop({ revenue, workHrs, hourlyRate = 250 }) {
  const benchmark = 30;
  const extraHours = Math.max(workHrs - benchmark, 0);
  const bleed = extraHours * hourlyRate;


  return (
    <div className="w-full max-w-5xl mx-auto rounded-xl bg-[#0f373c] text-white shadow-lg p-6 md:p-8 space-y-6">
      <h3 className="text-5xl sm:text-5xl font-bold text-center mb-15">Leverage</h3>

      <div className="flex justify-around items-center text-xl font-medium sm:text-3xl">
        <div className="text-center">
          <p className="text-gray-300 text-sm sm:text-xl">You Work</p>
          <p className="text-4xl sm:text-5xl font-bold">{workHrs} hrs</p>
        </div>
        <div className="text-center">
          <p className="text-gray-300 text-sm sm:text-xl">Benchmark</p>
          <p className="text-4xl sm:text-5xl font-bold">{benchmark} hrs</p>
        </div>
        <div className="text-center">
          <p className="text-gray-300 text-sm sm:text-xl">Overwork</p>
          <p className="text-4xl sm:text-6xl font-bold text-red-500">
            +{extraHours} hrs
          </p>
        </div>
      </div>

      {extraHours > 0 ? (
        <div className=" text-white text-center p-4 rounded-lg text-3xl font-semibold">
          That’s <span className="text-red-500 text-5xl">
           ${bleed}
          </span> per week
          <br className="hidden sm:block" />
          you could be reinvesting into growth.
        </div>
      ) : (
        <div className="bg-green-700/20 text-green-200 text-center p-4 rounded-lg text-2xl sm:text-3xl font-semibold">
          You're working at or below your benchmark — nice work creating space for leverage.
        </div>
      )}
    </div>
  );
}