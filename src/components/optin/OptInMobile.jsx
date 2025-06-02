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
    name: "Get Personalized Insights",
    description: "Understand how much money does it cost you.",
    icon: LockClosedIcon,
  },
  {
    name: "Based on 150+ Founders",
    description: "The results are based on work with 150+ founders.",
    icon: ServerIcon,
  },
];

export default function OptInMobile({ onNext }) {
  const primary = "#FF8000";
  const background = "#0f373c";

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
        <h1 className="mt-5 mx-5 text-center text-8xl font-bold text-white leading-snug">
            WORKING <span style={{ color: primary }}>60 HOUR WEEKS?</span>
        </h1>
        <p className="text-4xl/10 text-gray-200 mt-1">
          Take a test and get your <strong>BUSINESS DEPENDENCY SCORE.</strong>
        </p>
      </div>

      <img
        src="/frosted-report-mobile.png"
        alt="Scorecard preview"
        className=" w-full max-w-4xl rounded-xl ring-1 ring-gray-400/10 shadow-xl"
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
        className="w-full  max-w-4xl rounded-md px-6 py-5 text-white text-7xl font-semibold shadow transition bg-red-500 hover:bg-red-600"
      >
         Take 2 Minute Test
      </button>
      <p className="text-3xl text-center text-[#F1FDED] mb-25 ">
          Private report. No spam. <strong>Based on 150+ $2M+ founders.</strong>
      </p>
    </section>
  );
}
