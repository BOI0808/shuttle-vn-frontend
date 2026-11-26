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
        primary: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        brand: {
          DEFAULT: "#087F5B",
          strong: "#066649",
          soft: "#E8F6EF",
        },
        surface: {
          bg: "#FDF8F8",
          card: "#FFFFFF",
          soft: "#EDF2F6",
        },
        ink: {
          DEFAULT: "#172F4D",
          secondary: "#40556B",
          muted: "#596D80",
        },
        line: {
          DEFAULT: "#DCE5ED",
          strong: "#B9C8D6",
        },
        status: {
          success: { DEFAULT: "#066649", soft: "#E8F6EF" },
          warning: { DEFAULT: "#A45A0B", soft: "#FFF4E2" },
          danger: { DEFAULT: "#B42332", soft: "#FFF0F1" },
          info: { DEFAULT: "#245B99", soft: "#EBF2FA" },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "sans-serif"],
        mono: ["var(--font-inter)", "monospace"],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "8px",
        xl: "12px",
        "2xl": "16px",
      },
    },
  },
  plugins: [],
};

export default config;
