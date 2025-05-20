import React from "react";
import { getBenchmarkHours } from "@/utils/quizUtils";

export default function LeverageCalculatorMobile({ revenue, workHrs, hourlyRate = 250 }) {
  const benchmark = getBenchmarkHours(revenue);
  const extraHours = Math.max(workHrs - benchmark, 0);
  const bleed = extraHours * hourlyRate;



  return (
    <div className="mb-15w-full w-full mx-auto rounded-xl bg-[#0f373c] text-white shadow-lg p-6 md:p-8 space-y-6">
      <h3 className="text-7xl font-bold text-center mb-20">Leverage</h3>

      <div className="flex justify-around items-center text-xl font-medium sm:text-3xl mb-15">
        <div className="text-center">
          <p className="text-gray-300 text-3xl">You Work</p>
          <p className="text-6xl  font-bold">{workHrs} hrs</p>
        </div>
        <div className="text-center">
          <p className="text-gray-300 text-3xl">Benchmark</p>
          <p className="text-6xl  font-bold">{benchmark} hrs</p>
        </div>
        <div className="text-center">
          <p className="text-gray-300 text-3xl">Overwork</p>
          <p className="text-7xl  font-bold text-red-500">+{extraHours} hrs</p>
        </div>
      </div>

      {extraHours > 0 ? (
        <div className=" text-white text-center p-4 rounded-lg text-4xl font-semibold">
          That’s <span className="text-red-500 text-6xl">
          ${bleed}
          </span> per week
          <br className="hidden sm:block" />
          you could be reinvesting into growth.
        </div>
      ) : (
        <div className="bg-green-700/20 text-green-200 text-center p-4 rounded-lg text-4xl font-semibold">
          You're working at or below your benchmark — nice work creating space for leverage.
        </div>
      )}
    </div>
  );
}