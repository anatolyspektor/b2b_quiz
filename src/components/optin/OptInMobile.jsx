import React, { useEffect,useRef } from "react";
import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";

import { getSessionId } from "../../utils/getSessionId";
import { trackEvent } from "../../utils/trackEvent";
import { trackFbEvent } from "@/utils/fbPixel";


const features = [
  {
    name: "Answer Few Questions",
    description: "This quick 2-minute quiz reveals what’s really holding you back.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Get Personalized Scorecard",
    description: "We’ll break down exactly where your business depends on you — and how to fix it.",
    icon: LockClosedIcon,
  },
  {
    name: "Understand Your Next Move",
    description: "You'll get clear, actionable steps to reduce your dependency and grow with freedom.",
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
      trackFbEvent("PageView");
      hasTracked.current = true;
    }
  }, []);

  const handleClick = () => {
    trackFbEvent('OptInClicked');
    trackEvent({
      event: "optin_click",
      sessionId,
      device: "mobile",
    });
    onNext();
  };

  return (
    <section
      className="py-7 px-7 min-h-screen flex flex-col items-center gap-10"
      style={{ backgroundColor: background }}
    >
      <div className="text-center space-y-4">
        <h1 className="mx-5 text-center text-8xl font-bold text-white leading-snug">
          <span style={{ color: primary }}>$2M+</span> IN REVENUE, STILL <span style={{ color: primary }}>DOING IT ALL?</span>
        </h1>
        <p className="text-5xl text-gray-200 mt-2">
          Find out your Dependency Score in 2 minutes
        </p>
      </div>

      <img
        src="/frosted-report.jpg"
        alt="Scorecard preview"
        className="mb-5 mt-5 w-full max-w-xl rounded-xl ring-1 ring-gray-400/10 shadow-xl"
      />

      <div className="space-y-6 text-left w-full max-w-4xl">
        {features.map((feature) => (
          <div key={feature.name} className="flex items-start gap-4 mb-5">
            <feature.icon className="text-2xl h-15 w-15 mt-1" style={{ color: primary }} />
            <div>
              <p className="text-6xl font-semibold  mb-5" style={{ color: primary }}>
                {feature.name}
              </p>
              <p className="text-gray-200 text-4xl/12 text-left">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleClick}
        className="w-full  max-w-4xl rounded-md px-6 py-5 text-white text-7xl font-semibold shadow transition "
        style={{ backgroundColor: "#FF5C5C" }}

      >
         Reveal My Score
      </button>
    </section>
  );
}
