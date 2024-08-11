/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FAEDCD",
        secondary: "#E582BE",
      },
      fontFamily: {
        revalia: ["Revalia", "sans-serif"],
        syne: ["Syne", "sans-serif"],
        mont: ["Mont", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        splash: "url('./src/assets/splash/image.png')",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
