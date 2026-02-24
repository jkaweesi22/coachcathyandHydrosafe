import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        water: {
          50: "#f0fdfc",
          100: "#ccfbff",
          200: "#99f5ff",
          300: "#5ce4f5",
          400: "#26d0eb",
          500: "#0ab4d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
          950: "#083344",
        },
      },
      borderRadius: {
        card: "1rem",
      },
      boxShadow: {
        soft: "0 4px 20px -4px rgb(0 0 0 / 0.06)",
        card: "0 4px 24px -4px rgb(14 165 233 / 0.12)",
        elevated: "0 12px 40px -8px rgb(0 0 0 / 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
