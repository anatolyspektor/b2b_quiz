import React from "react";

export default function AdditionalNotes({ chokePoints = [] }) {
  return (
    <div className="w-full max-w-5xl mx-auto rounded-xl bg-[#0f373c] text-white shadow-lg p-6 md:p-8 space-y-6">
      <h3 className="text-7xl font-bold text-center mb-12 lg:text-5xl">Additional Notes</h3>

      <div className="bg-[#0f373c] text-white rounded-xl p-10 text-5xl/12 lg:text-3xl/9">
        {chokePoints.length > 0 ? (
          <ul className="space-y-20 list-disc list-inside marker:text-[#FF8257]">
            {chokePoints.map((point, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: point }} />
            ))}
          </ul>
        ) : (
          <p className="italic text-gray-300 text-4xl text-center">
            👍 You're in a solid place—but there's always room to tighten ops.
          </p>
        )}
      </div>
    </div>
  );
}
