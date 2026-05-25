import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brayan: {
          bg: "#0b0602",
          edge: "#1c0e04",
          cream: "#f7ead2",
          mist: "#d8c8aa",
          copper: "#c8893b",
          clay: "#a9562f",
          sage: "#778761",
          blue: "#7f9aa5",
        },
      },
      fontFamily: {
        outfit: ["Outfit", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 70px rgba(200, 137, 59, 0.24)",
      },
    },
  },
  plugins: [],
};

export default config;
