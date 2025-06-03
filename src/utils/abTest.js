// utils/abTest.js

export const AB_TESTS = {
  "optin_headline_test": {
    v1: {
      heading: "WORKING <span style='color:#FF8000;'>60 HOUR WEEKS?</span>",
      subheading: "Take 2 minute test and see how you compare to <strong>150+ founders</strong>.",
      cta: "Take 2 Minute Test",
      features: [
        {
          name: "Answer 6 Simple Questions",
          description: "Find out where things break when you're not there."
        },
        {
          name: "Get Personalized Insights",
          description: "Understand how much money does it cost you."
        },
        {
          name: "Based on 150+ Founders",
          description: "The results are based on work with 150+ founders."
        },
      ]
    },
   v5: {
      heading: "Built a $2M+ Business, <span style='color:#FF8000;'> But Still Can’t Step Away</span> ?",
      subheading: "This quick diagnostic shows where the bottlenecks are and what to do next. ",
      cta: "TAKE 2 MINUTE TEST",
      features: []
    },
    v6: {
      heading: "Can You  <span style='color:#FF8000;'> Sell</span> Your Business?",
      subheading: "Take this 2-minute test to see if it runs without you. ",
      cta: "GET MY SCORE",
      features: []
    }

  }
};

export function getABVariant(testName) {
  const variants = Object.keys(AB_TESTS[testName] || {});
  const urlParams = new URLSearchParams(window.location.search);
  const override = urlParams.get("v");

  const key = `ab-${testName}`;
  let variant = localStorage.getItem(key);

  // If v is passed and valid → use it
  if (override && variants.includes(override)) {
    variant = override;
    localStorage.setItem(key, variant);
  }

  // If no valid variant in localStorage → use first one
  if (!variant || !variants.includes(variant)) {
    variant = variants[0]; // ✅ default to first variant defined
    localStorage.setItem(key, variant);
  }

  // Set global tracking info
  localStorage.setItem("variant", variant);
  localStorage.setItem("test_name", testName);

  return variant;
}

