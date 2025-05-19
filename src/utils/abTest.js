// utils/abTest.js (already built)
export function getABVariant(testName, variants) {
  const key = `ab-${testName}`;
  let variant = localStorage.getItem(key);

  if (!variant) {
    const index = Math.floor(Math.random() * variants.length);
    variant = variants[index];
    localStorage.setItem(key, variant);
  }

  return variant;
}