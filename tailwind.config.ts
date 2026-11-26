import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { 950: "#0f1114", 900: "#16181d", 850: "#1b1e24", 800: "#22252b", 700: "#2d3138", 600: "#3a3f47" },
        // brand green replaces the reference yellow/teal accents
        lime: { DEFAULT: "#3DDC84", soft: "#7BEFA9", deep: "#1FA85B" },
        mint: { DEFAULT: "#2FD1A0", deep: "#14A37A" },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        hand: ["var(--font-hand)", "cursive"],
      },
    },
  },
  plugins: [],
};
export default config;
