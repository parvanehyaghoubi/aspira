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
          50: "#f7f2fa",
          100: "#ecdcf2",
          200: "#d3aee3",
          300: "#b27fd0",
          400: "#7a4dc4",
          500: "#54299c",
          600: "#421f7d",
          700: "#321760",
          800: "#18141b",
          900: "#0c0a0d",
        },
        saffron: {
          50: "#fdeef0",
          100: "#fbdde2",
          200: "#f3b0c0",
          300: "#e8839c",
          400: "#d65775",
          500: "#c9304f",
          600: "#a31735",
          700: "#841029",
          800: "#5c0a1e",
          900: "#3a0610",
        },
        turquoise: {
          50: "#e8fcfa",
          100: "#c2f4ef",
          200: "#86e6dd",
          300: "#46cec2",
          400: "#1cada3",
          500: "#0d8c83",
          600: "#0a6f68",
          700: "#0a5751",
          800: "#0a423e",
          900: "#082f2c",
        },
        sand: {
          50: "#efe9f0",
          100: "#e3dce6",
          200: "#cabfce",
          300: "#a99cb0",
          400: "#8a7c92",
          900: "#1a1620",
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
