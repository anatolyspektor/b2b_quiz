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
    name: "Answer Few Questions",
    description: "2-min Quiz will give you an AHA moment why you are stuck",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Get Peronalized Scorecard",
    description: "Based on your answers we generate personalized report.",
    icon: LockClosedIcon,
  },
  {
    name: "Understand Next Steps",
    description: "In the report you get suggetions and next step to get you unstuck",
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
          WORKING <span className="text-[#FF8257]">60 HOUR WEEKS?</span>
        </h1>
        <p className="text-5xl text-gray-200 mt-2">
          Find where the issue is in 2 minutes
        </p>
      </div>

      <img
        src="/report_test_1.jpg"
        alt="Scorecard preview"
        className="mb-5 mt-5 w-full max-w-xl rounded-xl ring-1 ring-gray-400/10 shadow-xl"
      />

      <div className="space-y-6 text-left w-full max-w-4xl">
        {features.map((feature) => (
          <div key={feature.name} className="flex items-start gap-4 mb-5">
            <feature.icon className="text-2xl h-15 w-15 text-[#FF8257] mt-1" />
            <div>
              <p className="text-6xl font-semibold text-[#FF8257] mb-5">
                {feature.name}
              </p>
              <p className="text-gray-200 text-4xl text-left">{feature.description}</p>
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
