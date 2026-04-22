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
        navy: {
          DEFAULT: "#070B14",
          800: "#0D1424",
          700: "#131D32",
          600: "#1A2847",
        },
        crimson: {
          DEFAULT: "#C8102E",
          light: "#E8334A",
          dark: "#9B0C23",
        },
        gold: {
          DEFAULT: "#F4AC22",
          light: "#FBCF6B",
          dark: "#C88A10",
        },
      },
      fontFamily: {
        prompt: ["Prompt", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        float: "float 5s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "spin-slow": "spin 12s linear infinite",
        "bounce-gentle": "bounceGentle 2s ease-in-out infinite",
        confetti: "confetti 1s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(248,172,34,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(248,172,34,0.6), 0 0 60px rgba(200,16,46,0.3)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        confetti: {
          "0%": { opacity: "0", transform: "scale(0.5) rotate(-10deg)" },
          "60%": { opacity: "1", transform: "scale(1.05) rotate(2deg)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(0deg)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "grid-pattern":
          "linear-gradient(rgba(248,172,34,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(248,172,34,0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
    },
  },
  plugins: [],
};

export default config;
