import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#FBFBFA", // warm off-white canvas
        surface: "#F4F1EA", // subtle surface background
        "surface-card": "#FFFFFF", // card/panel clean white
        foreground: "#121316", // deep near-black text
        "text-muted": "#6E717A", // secondary/muted text
        "text-subtle": "#989BA3", // tertiary caption text
        "border-subtle": "#E5E2DB", // hairline grid border
        "border-strong": "#C8C4BC", // emphasized border
        accent: "#1A4BFF", // electric cobalt blue
        "accent-hover": "#0035E6", // dark cobalt hover
        "accent-subtle": "#EEF2FF", // soft blue tint
        emerald: {
          500: "#10B981",
          600: "#059669",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        display: ["var(--font-display)", "Inter", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        editorial: "0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)",
        "editorial-hover": "0 2px 6px rgba(0,0,0,0.06), 0 16px 32px rgba(0,0,0,0.08)",
        card: "0 1px 2px rgba(0,0,0,0.03)",
      },
    },
  },
  plugins: [],
}

export default config
