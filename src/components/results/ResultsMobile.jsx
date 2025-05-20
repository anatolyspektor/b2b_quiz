import React from "react";
import Cal from "@calcom/embed-react";

export default function Results({ name = "Founder",email = "",
  answers = {},
  score,
  zone,
  color,
  workHrs,
  bleedPerWeek,
  chokePoints = [],
}) {
  const bleed = bleedPerWeek.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  return (
    <div className="bg-[#275659] text-[#F1FDED] min-h-screen flex flex-col gap-8 py-8 px-4">
      <h1 className="text-center text-5xl font-extrabold">
        FREEDOM <span className="text-6xl font-extrabold text-[#FF8257]">SCORECARD</span> RESULTS
      </h1>

      <div className="mb-10 bg-white text-[#275659] p-6 rounded-2xl space-y-2">
        <div className="flex flex-col items-center text-center">
          <p className="mb-5 text-3xl text-gray-500 uppercase">Dependency Score</p>
          <div className={`mb-10 text-8xl font-bold text-white px-6 py-2 rounded-full ${color}`}>
            {score} <span className="text-5xl font-medium ml-2">{zone}</span>
          </div>
        </div>

        <div className="mb-7 text-center">
          <p className="mb-7 text-3xl text-gray-500 uppercase">Owner Hours/Week</p>
          <p className="text-8xl font-bold">{workHrs}</p>
        </div>

        <p className="mt-3 text-4xl text-center">
          You're losing about <span className="font-bold text-red-600">{bleed}</span> per week in leverage
        </p>
      </div>

      <div className="bg-white text-[#275659] p-6 rounded-2xl">
        <h2 className="text-center text-6xl font-bold mb-3 mt-3">Here are some notes:</h2>
        {chokePoints.length > 0 ? (
          <ul className="mt-10 mb-10 space-y-15  text-4xl text-center marker:text-[#FF8257]">
            {chokePoints.map((point, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: point }} />
            ))}
          </ul>
        ) : (
          <p className="space-y-7 py-10 px-10 mt-10 text-4xl text-green-800">
            👍 Congrats! You're in a solid place, but there's always room to improve.{" "}
            <span className="text-gray-500">(let us show you how...)</span>
          </p>
        )}
      </div>

      <div className="mt-5 bg-[#1E3A40] text-[#F1FDED] p-6 rounded-2xl space-y-2 text-center">
        <h3 className="text-center text-4xl font-bold">We have 3 more points we want to share with you...</h3>
        <p className="mb-10 text-4xl mt-10">
          Claim a <span className="font-extrabold text-[#FF8257]">free 30‑minute Clarity Audit</span>. We'll screen‑share and hand you two quick wins to delegate this week.
        </p>
        <blockquote className="mb-15 mt-15 text-4xl italic mt-2 text-gray-300">
          “I was stuck working 54 hours every week. Now, just 3 weeks later, I work 32 — it keeps going down.”<br />
          <span className="text-3xl font-medium">— Lisa, $5.4M OEM</span>
        </blockquote>

        <div className="w-full text-center">
          <button
            onClick={() => {
              const url = `https://cal.com/anatolyspektor/clarity-audit?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;
              window.location.href = url;
            }}
            className="w-full rounded-md px-8 py-6 text-5xl font-semibold text-white shadow transition"
            style={{ backgroundColor: "#FF5C5C" }}
          >
            Claim your FREE CALL 🚀
          </button>
        </div>
      </div>
    </div>
  );
}
