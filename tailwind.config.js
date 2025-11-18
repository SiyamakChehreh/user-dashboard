/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: { 
    extend: {
      keyframes: {
        skeletonShimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        "gradient-x": {
           "0%, 100%": { "background-position": "0% 50%" },
           "50%": { "background-position": "100% 50%" },
        },
      },
      animation: {
        'skeleton-shimmer': 'skeletonShimmer 1.5s infinite linear',
        "gradient-x": "gradient-x 5s ease infinite",
      },
    }
  },
  plugins: [],
};
