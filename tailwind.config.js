/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      animation: {
        "text-reveal": "text-reveal 1.5s cubic-bezier(0.77, 0, 0.175, 1) 0.5s",
      },
      keyframes: {
        "text-reveal": {
          "0%": {
            transform: "translate(0, 100%)",
          },
          "100%": {
            transform: "translate(0, 0)",
          },
        },
      },
      colors: {
        mint: {
          500: 'oklch(72% 0.11 178)',
          600: 'oklch(72% 0.11 178 / 0.8)',
        },
        'text-mint': {
          500: 'oklch(72% 0.11 178)',
          600: 'oklch(72% 0.11 178 / 0.8)',
        },
        'bg-mint': {
          500: 'oklch(72% 0.11 178)',
          600: 'oklch(72% 0.11 178 / 0.8)',
        },
        'from-mint': 'oklch(72% 0.11 178)',
        'to-mint': 'oklch(72% 0.11 178 / 0.8)',
      },
    },
  },
  plugins: [
      require("daisyui"),
  ],
  // Add purge options for production builds (recommended)
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      // Add more specific paths if necessary
      // Example: "./src/components/**/*.{js,ts,jsx,tsx}",
      // Example: "./src/pages/**/*.{js,ts,jsx,tsx}",
    ],
    safelist: [
      // Add classes that should not be purged, even if not explicitly used
      // Example: 'bg-red-500', 'text-center',
    ],
  },
};