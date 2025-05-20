export default function ScorecardBenchmarkMobile({
  score = 0,
  zone = "",         // "RED" | "YELLOW" | "GREEN"
  benchmark = 64,
}) {
  const scorePct   = Math.min(Math.max(score, 0), 100);
  const rawPercentile = 50 + ((score - benchmark) / (100 - benchmark)) * 50;
  const boundedPercentile = Math.max(1, Math.min(Math.round(rawPercentile), 99));


  // map zone → Tailwind bg class
  const zoneBg = {
    RED:    "bg-red-500",
    YELLOW: "bg-yellow-400",
    GREEN:  "bg-green-500",
  }[zone] || "bg-gray-500";

  return (
    <div className="w-full max-w-5xl mx-auto rounded-xl bg-[#0f373c] text-white shadow-lg p-6 md:p-8 space-y-6">
      <h3 className="mb-20 text-7xl  font-bold text-center">Dependency Score</h3>

      {/* scale bar */}
      <div className="relative w-full">
        <div className="h-10 flex w-full  rounded-full overflow-hidden">
          <div className="h-full bg-red-500"    style={{ width: "65%" }} />
          <div className="h-full bg-yellow-400" style={{ width: "30%" }} />
          <div className="h-full bg-green-500"  style={{ width: "25%" }} />
        </div>

        {/* marker */}
        <div
          className="absolute -top-1 flex flex-col items-center"
          style={{ left: `${scorePct}%`, transform: "translateX(-50%)" }}
        >
          <div className="w-12 h-12 rounded-full bg-white border-2 border-orange-500  " />
          <span className="font-semibold mt-1 text-3xl">
            YOU
          </span>
        </div>
      </div>

      {/* copy */}
      <p className=" text-center flex flex-wrap justify-center gap-2 sm:mt-20 text-5xl">
        You scored
        {/* score pill */}
        <span className={`inline-flex items-center justify-center w-20 h-12 rounded-full  ${zoneBg} text-[#0f373c] font-bold `}>
          {score}
        </span>
        , which puts you in the
        {/* zone badge */}
        <span className={`px-3 py-2  rounded text-5xl font-bold  ${zoneBg}`}>
          {zone}
        </span>
        zone.
      </p>

      <p className="text-center text-5xl mt-10">
        That’s <strong>{boundedPercentile >= 50 ? "higher" : "lower"}</strong> than{" "}
        <strong>{boundedPercentile}%</strong> of founders we’ve assessed.
      </p>

    <p className=" text-gray-300 text-center text-4xl mt-15">
      Most founders score around {benchmark}. Target for true freedom is 85+.
    </p>
    </div>
  );
}
