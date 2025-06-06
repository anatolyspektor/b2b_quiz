// utils/abTest.js

export const AB_TESTS = {
  "optin_headline_test": {
    v10: {
      heading: "Built a 7-Figure Prison? <span style='color:#FF8000;'> Congrats.</span>",
      subheading: "In two minutes you can uncover your <span style='color:#FF8000;'><strong>free, personalised business dependency score</strong></span> which will show you if you can  <strong>BREAK FREE from your business in 1 year (or earlier)</strong>",
      cta: "Help Me Break Free",
      image: "/v10.png",
      features: [

      { description:"1. Answer just <span style='color:#FF8000;'><strong>6 questions</strong></span> <i> (which takes under two minutes)</i>"},
      { description:"2. Undestand where you stand against <span style='color:#FF8000;'><strong>150 $2m+ revenue founders</strong></span>"},
      { description:"3. Get a comprehensive report which tells you exactly what keeps you chained, <span style='color:#FF8000;'><strong>how much it costs and how to escape!</strong></span>"}
      ]
    },
    v11: {
      heading: "Built a 7-Figure Prison? <span style='color:#FF8000;'> Congrats.</span>",
      subheading: "In two minutes you can uncover your <span style='color:#FF8000;'><strong>free, personalised business dependency score</strong></span> which will show you if you can  <strong>BREAK FREE from your business in 1 year (or earlier)</strong>",
      cta: "Help Me Break Free",
      image: "/v11.png",
      features: [

      { description:"1. Answer just <span style='color:#FF8000;'><strong>6 questions</strong></span> <i> (which takes under two minutes)</i>"},
      { description:"2. Undestand where you stand against <span style='color:#FF8000;'><strong>150 $2m+ revenue founders</strong></span>"},
      { description:"3. Get a comprehensive report which tells you exactly what keeps you chained, <span style='color:#FF8000;'><strong>how much it costs and how to escape!</strong></span>"}
      ]
    },
    v12: {
      heading: "Built a 7-Figure Prison? <span style='color:#FF8000;'> Congrats.</span>",
      subheading: "In two minutes you can uncover your <span style='color:#FF8000;'><strong>free, personalised business dependency score</strong></span> which will show you if you can  <strong>BREAK FREE from your business in 1 year (or earlier)</strong>",
      cta: "Help Me Break Free",
      image: "/v12.png",
      features: [

      { description:"1. Answer just <span style='color:#FF8000;'><strong>6 questions</strong></span> <i> (which takes under two minutes)</i>"},
      { description:"2. Undestand where you stand against <span style='color:#FF8000;'><strong>150 $2m+ revenue founders</strong></span>"},
      { description:"3. Get a comprehensive report which tells you exactly what keeps you chained, <span style='color:#FF8000;'><strong>how much it costs and how to escape!</strong></span>"}
      ]
    },
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

