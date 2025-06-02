import React from "react";

export default function EmailGateDesktop({ name, email, setName, setEmail, onSubmit, error }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-8 py-10 bg-[#275659] overflow-hidden">
      {/* Blurred Background */}
      <img
        src="/desktop-scorecard.png"
        alt="Score Preview"
        className="absolute inset-0 w-full h-full object-cover blur-md opacity-90 scale-105 z-0"
      />

      {/* Foreground Content */}
      <div className="relative z-10 w-full max-w-4xl bg-[#275659] px-8 py-10 text-center shadow-sm rounded-lg">

        <h2 className="text-5xl mb-6 leading-snug text-[#F1FDED]">
          See how you compare and what’s keeping you <strong>STUCK</strong>.
        </h2>

        <p className="text-2xl text-[#F1FDED] mb-10">
          We’ll also email you a copy for your records.
        </p>

        <input
          type="text"
          placeholder="Your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-6 w-full rounded-md border px-4 py-4 text-xl shadow-sm placeholder-white"
          style={{
            color: "#F1FDED",
            borderColor: "#F1FDED",
            backgroundColor: "transparent",
          }}
        />

        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-4 w-full rounded-md border px-4 py-4 text-xl shadow-sm placeholder-white"
          style={{
            color: "#F1FDED",
            borderColor: "#F1FDED",
            backgroundColor: "transparent",
          }}
        />

        {error && <p className="text-red-400 text-xl mt-4">{error}</p>}

        <button
          onClick={onSubmit}
          className="mt-6 w-full rounded-md px-6 py-5 text-white text-2xl font-semibold transition bg-red-500 hover:bg-red-600"
        >
          REVEAL MY SCORE
        </button>

         <p className="text-xl text-center text-[#F1FDED] mt-10">
          Private report. No spam. <strong>Based on 150+ $2M+ founders.</strong>
        </p>
      </div>
    </section>
  );
}
