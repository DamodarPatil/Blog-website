/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        deepNavy: "#2C3E50",
        softTeal: "#1ABC9C",
        warmGray: "#ECF0F1",
        mutedGold: "#F1C40F",
        coral: "#E74C3C",
        lavender: "#9B59B6",
        primaryText: "#2C3E50",
        secondaryText: "#7F8C8D",
        white: "#FFFFFF",
        charcoal: "#34495E",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
  plugins: [],
};
