import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "off-white": "#F8F7F4",
        "soft-gray": "#F0EEE9",
        "border-gray": "#E5E2DB",
        "text-primary": "#111111",
        "text-secondary": "#666666",
        "text-muted": "#999999",
        accent: "#2563EB",
        "accent-light": "#EFF6FF",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}

export default config
