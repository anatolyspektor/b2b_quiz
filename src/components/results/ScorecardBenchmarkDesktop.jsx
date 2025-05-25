export default function ScorecardBenchmarkDesktop({
  score = 0,
  zone = "",         // "RED" | "YELLOW" | "GREEN"
  benchmark = 64,
}) {
  const scorePct   = Math.min(Math.max(score, 0), 100);
  const rawPercentile = 50 + ((score - benchmark) / (100 - benchmark)) * 50;
  const boundedPercentile = Math.max(1, Math.min(Math.round(rawPercentile), 99));
  const benchmarkPct = Math.min(Math.max(benchmark, 0), 100);

  // map zone → Tailwind bg class
  const zoneBg = {
    RED:    "bg-red-500",
    YELLOW: "bg-yellow-400",
    GREEN:  "bg-green-500",
  }[zone] || "bg-gray-500";

  return (
    <div className="w-full max-w-5xl mx-auto rounded-xl bg-[#0f373c] text-white shadow-lg p-6 md:p-8 space-y-6">
      <h3 className="sm:mb-20 sm:text-6xl lg:text-5xl font-bold text-center">Dependency Score</h3>

    {/* scale bar */}
    <div className="relative w-full">
      <div className="sm:h-5 flex w-full h-3 rounded-full overflow-hidden">
        <div className="h-full bg-red-500"    style={{ width: "25%" }} />
        <div className="h-full bg-yellow-400" style={{ width: "55%" }} />
        <div className="h-full bg-green-500"  style={{ width: "20%" }} />
      </div>

      {/* YOU marker */}
      <div
        className="absolute -top-1 flex flex-col items-center"
        style={{ left: `${scorePct}%`, transform: "translateX(-50%)" }}
      >
        <div className="w-8 h-8 rounded-full bg-orange-500 border-2 border-orange-500 " />
        <span className="text-[10px] font-semibold mt-2 sm:text-lg">YOU</span>
      </div>

      {/* AVG marker */}
      <div
        className="absolute -top-1 flex flex-col items-center"
        style={{ left: `${benchmarkPct}%`, transform: "translateX(-50%)" }}
      >
        <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-blue-500 " />
        <span className="text-[10px] font-semibold mt-6 sm:text-lg text-white">AVG</span>
      </div>
    </div>





      {/* labels */}
      <div className="flex justify-between text-xs text-gray-300 uppercase sm:text-lg ">
        <span>Dependency</span>
        <span>Freedom</span>
      </div>

      {/* copy */}
      <p className="text-2xl text-center flex flex-wrap justify-center gap-2 sm:mt-20 sm:text-4xl">
        You scored
        {/* score pill */}
        <span className={`inline-flex items-center justify-center w-15 h-10 rounded-full text-[#0f373c] font-bold ${zoneBg}`}>
          {score}
        </span>
        , which puts you in the
        {/* zone badge */}
        <span className={`px-2 py-0.5 rounded text-lg font-bold sm:text-3xl ${zoneBg}`}>
          {zone}
        </span>
        zone.
      </p>

      <p className="text-center text-3xl mt-10">
        That’s <strong>{boundedPercentile >= 50 ? "higher" : "lower"}</strong> than{" "}
        <strong>{boundedPercentile}%</strong> of founders we’ve assessed.
      </p>
    <p className="text-sm text-gray-300 text-center sm:text-2xl">
      Most founders score around {benchmark}. Target for true freedom is 85+.
    </p>
    </div>
  );
}
