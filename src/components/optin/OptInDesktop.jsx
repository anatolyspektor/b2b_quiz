import React, { useEffect, useRef } from "react";
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
  },];

export default function OptInDesktop(props) {
  const primary = "#FF8257";
  const background = "#275659";

  const sessionId = getSessionId();

  const hasTracked = useRef(false);

  useEffect(() => {
    if (!hasTracked.current) {
      trackEvent({
        event: "optin_impression",
        sessionId,
        device:  "desktop",
      });
       trackFbEvent("PageView");
      hasTracked.current = true;
    }
  }, []);

  const handleClick = () => {
    trackEvent({
      event: "optin_click",
      sessionId,
      device: "desktop",
    });
    trackFbEvent('OptInClicked');
    props.onNext();
  };


  return (
    <section className="overflow-x-hidden py-2 overflow-y-auto min-h-screen" style={{ backgroundColor: background }}>
      <div className="mx-auto max-w-7xl px-4  lg:px-8">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:items-start">
          <div className="lg:pt-6 lg:pr-12">
            <div className="max-w-full lg:max-w-xl mx-auto lg:mx-0">
              <h2 className="text-2xl sm:text-3xl lg:text-lg font-semibold text-gray-400">Free Quiz</h2>
              <p className="mt-4 text-6xl sm:text-7xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                  WORKING <span style={{ color: primary }}>60 HOUR WEEKS?</span>
              </p>
              <p className="mt-8 text-xl  text-gray-200">
                  This 2-minute scorecard shows where you’re still the bottleneck — and how to fix it.
              </p>

              <dl className="mt-12 space-y-12 text-gray-300">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-14">
                    <dt className="block mb-2 text-orange-500" style={{ color: primary }}>
                      <feature.icon className="absolute top-0 left-0 h-10 w-10" />
                      <span className="text-3xl font-semibold">{feature.name}</span>
                    </dt>
                    <dd className="text-gray-200 text-lg">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="w-full px-4 py-20 flex flex-col items-center gap-8">
            <img
              src="/frosted-report.jpg"
              width={2432}
              height={1442}
              className="w-full sm:w-full rounded-xl ring-1 shadow-xl ring-gray-400/10"
              alt="Scorecard preview"
            />

            <div className="w-full text-center">
              <button
                onClick={handleClick}
                className="w-full rounded-md px-8 py-6 text-xl sm:text-4xl font-semibold text-white shadow transition bg-red-500 hover:bg-red-600"

              >
                Take 2 Minute Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
