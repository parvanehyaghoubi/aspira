import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./context/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lapis: {
          50: "#eef4f7",
          100: "#d4e4ea",
          200: "#a9c9d6",
          300: "#7daec1",
          400: "#4a8aa3",
          500: "#1f6480",
          600: "#1a536b",
          700: "#164257",
          800: "#123445",
          900: "#0d2632",
        },
        saffron: {
          50: "#fdf3e7",
          100: "#fbe3c2",
          200: "#f6c787",
          300: "#f0aa4d",
          400: "#e8902a",
          500: "#d97706",
          600: "#b35e05",
          700: "#8a4904",
          800: "#623403",
          900: "#3b1f02",
        },
        sand: {
          50: "#fbf8f3",
          100: "#f5efe3",
          200: "#ece1cb",
          900: "#1c1917",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-jakarta)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "trail-dash":
          "repeating-linear-gradient(90deg, currentColor 0 6px, transparent 6px 14px)",
      },
    },
  },
  plugins: [],
};
export default config;
