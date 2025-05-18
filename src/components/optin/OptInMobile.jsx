import React, { useEffect,useRef } from "react";
import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";

import { getSessionId } from "../../utils/getSessionId";
import { trackEvent } from "../../utils/trackEvent";

const features = [
  {
    name: "Doing your team’s job?",
    description: "Find out where things break when you're not there.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Tired and burned out?",
    description: "See what’s wasting your time and messing up your team.",
    icon: LockClosedIcon,
  },
  {
    name: "Want your freedom back?",
    description: "This 2-minute quiz shows what’s keeping you stuck — and how to fix it. For B2B product founders.",
    icon: ServerIcon,
  },
];

export default function OptInMobile({ onNext }) {
  const primary = "#FF8257";
  const background = "#275659";

  const sessionId = getSessionId();
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!hasTracked.current) {
      trackEvent({
        event: "optin_impression",
        sessionId,
        device:  "mobile",
      });
      hasTracked.current = true;
    }
  }, []);

  const handleClick = () => {
    trackEvent("optin_click", sessionId);
    onNext();
  };

  return (
    <section
      className="py-7 px-7 min-h-screen flex flex-col items-center gap-10"
      style={{ backgroundColor: background }}
    >
      <div className="text-center space-y-4">
        <h2 className="mx-10 text-2xl text-left font-semibold text-gray-300">
          Free Quiz
        </h2>
        <h1 className="mx-5 text-left text-8xl font-bold text-white leading-snug">
          WORKING <span className="text-[#FF8257]">60 HOUR WEEKS?</span>
        </h1>
        <p className="text-4xl text-gray-200 mt-2">
          Find your bottleneck in 2 minutes — and fix it
        </p>
      </div>

      <img
        src="./report_test_1.jpg"
        alt="Scorecard preview"
        className="mb-5 mt-5 w-full max-w-2xl rounded-xl ring-1 ring-gray-400/10 shadow-xl"
      />

      <div className="space-y-6 text-left w-full max-w-4xl">
        {features.map((feature) => (
          <div key={feature.name} className="flex items-start gap-4 mb-5">
            <feature.icon className="text-2xl h-15 w-15 text-[#FF8257] mt-1" />
            <div>
              <p className="text-5xl font-semibold text-[#FF8257] mb-5">
                {feature.name}
              </p>
              <p className="text-gray-200 text-3xl">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleClick}
        className="w-full mt-5 max-w-4xl rounded-md px-6 py-5 text-white text-7xl font-semibold shadow transition"
        style={{ backgroundColor: "#FF5C5C" }}
      >
        Take 2 Minute Quiz
      </button>
    </section>
  );
}
