import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#090A0D",
        surface: "#101217",
        "surface-card": "#15181F",
        "surface-hover": "#1C2029",
        foreground: "#F3F4F6",
        "text-muted": "#9CA3AF",
        "text-subtle": "#6B7280",
        "border-subtle": "#1E222B",
        "border-strong": "#2D3340",
        accent: "#3B82F6",
        "accent-hover": "#2563EB",
        "accent-subtle": "rgba(59, 130, 246, 0.12)",
        emerald: {
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Plus Jakarta Sans", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        display: ["var(--font-display)", "Plus Jakarta Sans", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      boxShadow: {
        editorial: "0 1px 3px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.35)",
        "editorial-hover": "0 4px 12px rgba(0,0,0,0.6), 0 16px 32px rgba(0,0,0,0.45)",
        card: "0 1px 3px rgba(0,0,0,0.4)",
        glow: "0 0 25px -5px rgba(59, 130, 246, 0.25)",
      },
    },
  },
  plugins: [],
}

export default config
