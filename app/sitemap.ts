import type { MetadataRoute } from "next"

const siteUrl = "https://portfolio-wildan.vercel.app"

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
  ] as const

  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    priority,
    changeFrequency,
  }))
}
