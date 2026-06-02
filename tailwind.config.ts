import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "neo-bg": "#FFFDF5",
        "neo-black": "#000000",
        "neo-accent": "#FF6B6B",
        "neo-secondary": "#FFD93D",
        "neo-muted": "#C4B5FD",
        "neo-white": "#FFFFFF",
      },
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
      },
      boxShadow: {
        "neo-sm": "4px 4px 0px 0px #000",
        "neo-md": "8px 8px 0px 0px #000",
        "neo-lg": "12px 12px 0px 0px #000",
        "neo-xl": "16px 16px 0px 0px #000",
        "neo-sm-white": "4px 4px 0px 0px #fff",
        "neo-md-white": "8px 8px 0px 0px #fff",
      },
      borderWidth: {
        "3": "3px",
      },
      keyframes: {
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 12s linear infinite",
        "marquee": "marquee 25s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
