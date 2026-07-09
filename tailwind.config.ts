import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#0B0C10",   // Primary Background
        slateCard: "#1F2833",  // Secondary Structure
        neonCyan: "#66FCF1",   // Accent 1 (The Pop)
        platinum: "#F5F5F7",   // Accent 2 (Contrast Text)
      },
    },
  },
  plugins: [],
};
export default config;
