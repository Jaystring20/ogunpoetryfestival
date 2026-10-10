import type { Config } from "tailwindcss";

// Colours come from the OPF logo; see the tokens in src/index.css.
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1rem", screens: { "2xl": "1240px" } },
    extend: {
      fontFamily: {
        display: ["Archivo", "system-ui", "sans-serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
        verse: ["Fraunces", "Georgia", "serif"],
      },
      colors: {
        ink: "hsl(var(--ink))",
        "ink-raised": "hsl(var(--ink-raised))",
        paper: "hsl(var(--paper))",
        muted: "hsl(var(--muted))",
        line: "hsl(var(--line))",
        pink: "hsl(var(--pink))",
        teal: "hsl(var(--teal))",
        sun: "hsl(var(--sun))",
        sky: "hsl(var(--sky))",
      },
      borderRadius: { none: "0" },
    },
  },
  plugins: [],
} satisfies Config;
