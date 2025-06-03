import React, { useEffect, useRef, useState } from "react";
import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";

import { getSessionId } from "../../utils/getSessionId";
import { trackEvent } from "../../utils/trackEvent";
import { trackFbEvent } from "@/utils/fbPixel";
import { getABVariant, AB_TESTS } from "../../utils/abTest";

export default function OptInMobile({ onNext }) {
  const primary = "#FF8000";
  const background = "#0f373c";
  const sessionId = getSessionId();
  const hasTracked = useRef(false);

  const variantKey = getABVariant("optin_headline_test");
  const variantData = AB_TESTS["optin_headline_test"][variantKey];

  useEffect(() => {
    if (!hasTracked.current) {
      trackEvent({
        event: "optin_impression",
        sessionId,
        device: "mobile",
      });
      trackFbEvent("PageView");
      hasTracked.current = true;
    }
  }, [sessionId]);

  const handleClick = () => {
    trackFbEvent("OptInClicked");
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
        <h1
          className="mt-5 mx-5 text-center text-8xl font-bold text-white leading-snug"
          dangerouslySetInnerHTML={{ __html: variantData.heading }}
        />
        <p
          className="text-4xl/10 text-gray-200 mt-1"
          dangerouslySetInnerHTML={{ __html: variantData.subheading }}
        />
      </div>

      <img
        src="/frosted-report-mobile.png"
        alt="Scorecard preview"
        className=" w-full max-w-4xl rounded-xl ring-1 ring-gray-400/10 shadow-xl"
      />

      <div className="space-y-6 text-left w-full max-w-4xl">
        {variantData.features.map((feature, index) => (
          <div key={index} className="flex items-start gap-7 mb-0">
            <CloudArrowUpIcon className="text-2xl h-15 w-15 mt-1" style={{ color: primary }} />
            <div>
              <p
                className="text-6xl font-semibold mb-5"
                style={{ color: primary }}
                dangerouslySetInnerHTML={{ __html: feature.name }}
              />
              <p
                className="text-gray-200 text-4xl/15 text-left"
                dangerouslySetInnerHTML={{ __html: feature.description }}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleClick}
        className="w-full max-w-4xl rounded-md px-6 py-5 text-white text-7xl font-semibold shadow transition bg-red-500 hover:bg-red-600"
        dangerouslySetInnerHTML={{ __html: variantData.cta }}
      />

      <p className="text-3xl text-center text-[#F1FDED] mb-25 ">
         Based on work with<strong> 150+ $2M+ founders.</strong>
      </p>
    </section>
  );
}