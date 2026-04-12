import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#1A1A2E",
        coral: "#FF6B4A",
        amber: "#FFAA3B",
        electric: "#4A3AFF",
        "warm-white": "#F5F0EB",
        smoke: "#8888AA",
        deep: "#12121F",
        "card-bg": "#222240",
      },
    },
  },
  plugins: [],
};

export default config;
