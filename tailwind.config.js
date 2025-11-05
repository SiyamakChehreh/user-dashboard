/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        oswald: ['"Oswald"', "sans-serif"],
        nunito: ['"Nunito"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
