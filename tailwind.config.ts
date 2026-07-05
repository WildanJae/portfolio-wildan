import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#09090b", // zinc-950
        foreground: "#fafafa", // zinc-50
        "primary-dark": "#18181b", // zinc-900
        "border-dark": "#27272a", // zinc-800
        accent: "#3b82f6", // blue-500
        "text-muted": "#a1a1aa", // zinc-400
      },
    },
  },
  plugins: [],
}

export default config
