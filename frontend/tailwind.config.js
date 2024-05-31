import { height } from "@mui/system";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "bottom-bar": "bottom-bar 1s ease forwards",
      },
      keyframes: {
        "bottom-bar": {
          "0%": { bottom: "-72px" },
          "100%": { bottom: "0px", trasition: "all 2s ease" },
        },
      }
    },
  },
  plugins: [],
};
