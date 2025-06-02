import React, { useState } from "react";

export default function EmailGate({ name, email, setName, setEmail, onSubmit, error }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-10 bg-[#275659] overflow-hidden">
      {/* Blurred Background */}
      <img
        src="/mobile-scorecard.png"
        alt="Score Preview"
        className="absolute inset-0 w-full h-full object-cover blur-md opacity-50 scale-105 z-0"
      />

      {/* Foreground Content */}
      <div className="relative z-10 w-full bg-[#275659]/90 backdrop-blur-sm rounded-xl px-4 py-8 text-center shadow-sm">
        <h2 className="text-6xl mb-15 leading-snug text-[#F1FDED]">
          See how you compare and what’s keeping you <strong>STUCK</strong>.
        </h2>
        <p className="text-3xl text-[#F1FDED] mb-10">
          We’ll also email you a copy for your records.
        </p>
        <input
          type="text"
          placeholder="Your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-4 w-full rounded-md border px-10 py-10 text-5xl shadow-sm placeholder-white"
          style={{ color: "#F1FDED", borderColor: "#F1FDED", backgroundColor: "transparent" }}
        />
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-4 w-full rounded-md border px-10 py-10 text-5xl shadow-sm placeholder-white"
          style={{ color: "#F1FDED", borderColor: "#F1FDED", backgroundColor: "transparent" }}
        />
        {error && <p className="text-red-400 text-4xl mt-4">{error}</p>}

        <button
          onClick={onSubmit}
          className="mt-6 w-full rounded-md px-10 py-10 text-white text-6xl font-semibold transition bg-red-500 hover:bg-red-600"
        >
          REVEAL MY SCORE
        </button>

        <p className="text-3xl text-center text-[#F1FDED] mt-10">
          Private report. No spam. <strong>Based on 150+ $2M+ founders.</strong>
        </p>
      </div>
    </section>
  );
}