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
    name: "Answer 6 Simple Questions",
    description: "Find out where things break when you're not there.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Get Personalized Scorecard",
    description: "We’ll break down exactly where your business depends on you — and how to fix it.",
    icon: LockClosedIcon,
  },
  {
    name: "Based on 150+ Founders",
    description: "The results are based on work with more than 150 founders.",
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
        <h1 className="mx-5 text-center text-7xl font-bold text-white leading-snug">
            WORKING <span style={{ color: primary }}>60 HOUR WEEKS?</span>
        </h1>
        <p className="text-5xl text-gray-200 mt-2">
          This 2-minute scorecard shows where you’re still the bottleneck.

        </p>
      </div>

      <img
        src="/frosted-report.jpg"
        alt="Scorecard preview"
        className="mb-5 mt-5 w-full max-w-xl rounded-xl ring-1 ring-gray-400/10 shadow-xl"
      />

      <div className="space-y-6 text-left w-full max-w-4xl">
        {features.map((feature) => (
          <div key={feature.name} className="flex items-start gap-7 mb-0">
            <feature.icon className="text-2xl h-15 w-15 mt-1" style={{ color: primary }} />
            <div>
              <p className="text-6xl font-semibold  mb-5" style={{ color: primary }}>
                {feature.name}
              </p>
              <p className="text-gray-200 text-4xl/15 text-left">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleClick}
        className="w-full  max-w-4xl rounded-md px-6 py-5 text-white text-7xl font-semibold shadow transition "
        style={{ backgroundColor: "#FF5C5C" }}

      >
         Take 2 Minute Quiz
      </button>
    </section>
  );
}
