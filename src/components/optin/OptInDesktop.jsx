import React, { useEffect, useRef } from "react";
import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";
import { getSessionId } from "../../utils/getSessionId";
import { trackEvent } from "../../utils/trackEvent";
import { trackFbEvent } from "@/utils/fbPixel";
import { getABVariant, AB_TESTS } from "../../utils/abTest";

export default function OptInDesktop(props) {
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
        device: "desktop",
      });
      trackFbEvent("PageView");
      hasTracked.current = true;
    }
  }, [sessionId]);

  const handleClick = () => {
    trackEvent({
      event: "optin_click",
      sessionId,
      device: "desktop",
    });
    trackFbEvent("OptInClicked");
    props.onNext();
  };

  return (
    <section className="overflow-x-hidden py-2 overflow-y-auto min-h-screen" style={{ backgroundColor: background }}>
      <div className="mx-auto max-w-7xl px-4  lg:px-8">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:items-start">
          <div className="lg:pt-6 lg:pr-12">
            <div className="max-w-full lg:max-w-xl mx-auto lg:mx-0">
              <h2 className="text-2xl sm:text-3xl lg:text-lg font-semibold text-gray-400">Dependecy Score Test</h2>
              <p
                className="mt-4 text-6xl  lg:text-4xl font-bold tracking-tight text-white leading-tight"
                dangerouslySetInnerHTML={{ __html: variantData.heading }}
              />
              <p
                className="mt-10 text-xl text-gray-200"
                dangerouslySetInnerHTML={{ __html: variantData.subheading }}
              />

                  <ul className="mt-10" >
                    {variantData.features.map((feature, index) => (
                      <li key={index}
                        className="text-gray-200 text-xl/6 text-left mb-4 dark:text-gray-300"
                        dangerouslySetInnerHTML={{ __html: feature.description }}
                      />
                      ))}
                    </ul>

            </div>
                    {/* Quote Block */}
          <div className="flex flex-col items-center gap-4 mt-20">
            <div className="flex items-start gap-4 max-w-xl text-left">
              <div className="border-l-4 border-green-400 pl-4">
                <p className="text-lg  text-white leading-snug">
                  “This Quiz enabled me to understand how much money I was wasting by trying to stay in control! I couldn't believe it at first... ”
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="w-10 h-10 rounded-full bg-white text-[#0f373c] font-bold flex items-center justify-center text-lg">
                    V
                  </div>
                  <span className="text-sm text-gray-300">Victoria, $7M Industrial Manufacturing CEO</span>
                </div>
              </div>
            </div>
          </div>
          </div>

  

          <div className="max-w-lg px-4 py-20 flex flex-col items-center gap-8">
            <img
              src={variantData.image}
              width={2432}
              height={1442}
              className=" w-full max-w-4xl rounded-xl ring-1 ring-gray-400/10 border-2 border-double border-green-500"
              alt="Scorecard preview"
            />

            <div className="w-full text-center">
              <button
                onClick={handleClick}
                className="w-full rounded-md px-8 py-6 text-3xl font-semibold text-white shadow transition bg-red-500 hover:bg-red-600"
                dangerouslySetInnerHTML={{ __html: variantData.cta }}
              />
              <p className="text-md text-center text-gray-300 mt-2 ">
                  Our own algorithm based on work with<strong> 150+ founders.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}