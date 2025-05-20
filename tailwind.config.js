// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Define your custom colors here
        'brand-primary': '#0f373c', // Example: a hex code
        'brand-secondary': {
          DEFAULT: '#789abc', // Example: a hex code
          100: '#f0f0f0', // Example: a light shade
          500: '#789abc', // Example: a medium shade
          900: '#333333', // Example: a dark shade
        },
      },
    },
  },
};
