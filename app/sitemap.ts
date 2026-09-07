import type { MetadataRoute } from "next"

const siteUrl = "https://portfolio-wildan.vercel.app"

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/play", priority: 0.6, changeFrequency: "monthly" },
    { path: "/play/cryptarithm", priority: 0.4, changeFrequency: "monthly" },
    { path: "/play/flappy", priority: 0.4, changeFrequency: "monthly" },
    { path: "/play/love", priority: 0.4, changeFrequency: "monthly" },
    { path: "/play/memory", priority: 0.4, changeFrequency: "monthly" },
    { path: "/play/sudoku", priority: 0.4, changeFrequency: "monthly" },
    { path: "/play/tictactoe", priority: 0.4, changeFrequency: "monthly" },
  ] as const

  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    priority,
    changeFrequency,
  }))
}
