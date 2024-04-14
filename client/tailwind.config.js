/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        orange: "0 0 50px rgba(251, 157, 3, 1)",
      },
    },
    fontFamily: {
      crimson: ['"Crimson Text"', "serif"],
    },
    colors: {
      black: "#292022",
      white: "#FCF8F1",
      orange: "#FB9D03",
    },
    backgroundColor: {
      black: "#292022",
      white: "#FFFFFF",
      creme: "#F5F1E9",
      orange: "#FB9D03",
    },
    screens: {
      md: "480px",
      lg: "750px",
      xl: "1024px",
    },
  },
  plugins: [],
};
