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
          className="mt-5 mx-5 text-center text-8xl font-bold text-white"
          dangerouslySetInnerHTML={{ __html: variantData.heading }}
        />
        <p
          className="text-5xl/16 text-gray-200 mt-10  dark:text-gray-300"
          dangerouslySetInnerHTML={{ __html: variantData.subheading }}
        />
      </div>

      <img
        src={variantData.image}
        alt="Scorecard preview"
        className=" w-full max-w-3xl rounded-xl ring-1 ring-gray-400/10 border-4 border-double border-green-500"
      />

            <button
        onClick={handleClick}
        className="w-full max-w-4xl rounded-md px-6 py-5 text-white text-7xl font-semibold shadow transition bg-red-500 hover:bg-red-600"
        dangerouslySetInnerHTML={{ __html: variantData.cta }}
      />
      <p className="text-3xl text-center text-[#F1FDED] mb-10 text-gray-300">
         Most founders cannot leave for more than <strong>3 weeks</strong>
      </p>

      <div className="space-y-6 text-left w-full max-w-4xl">
        
            <ul >
            {variantData.features.map((feature, index) => (
              <li key={index}
                className="text-gray-200 text-6xl/20 text-left mb-10 dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: feature.description }}
              />
              ))}
            </ul>

      </div>
          {/* Quote Block */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-start gap-4 max-w-4xl text-left">
              <div className="border-l-4 border-green-400 pl-4">
                <p className="text-5xl  text-white leading-snug">
                  “This Quiz enabled me to understand how much money I was wasting by trying to stay in control! I couldn't believe it at first... ”
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="w-10 h-10 rounded-full bg-white text-[#0f373c] font-bold flex items-center justify-center text-lg">
                    V
                  </div>
                  <span className="text-4xl text-gray-300">Victoria, $7M Industrial Manufacturing CEO</span>
                </div>
              </div>
            </div>
          </div>

      <button
        onClick={handleClick}
        className="w-full max-w-4xl rounded-md px-6 py-5 text-white text-7xl font-semibold shadow transition bg-red-500 hover:bg-red-600 mt-30"
        dangerouslySetInnerHTML={{ __html: variantData.cta }}
      />

      <p className="text-3xl text-center text-[#F1FDED] mb-55 text-gray-300 ">
         Our own algorithm based on work with<strong> 150+ founders.</strong>
      </p>
    </section>
  );
}