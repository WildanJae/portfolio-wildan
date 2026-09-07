import type { Metadata } from "next"
import "./globals.css"
import { LanguageProvider } from "@/components/LanguageContext"

export const metadata: Metadata = {
  title: "Wildan Jaelani — Front-End Developer",
  description: "Front-End Developer specializing in Next.js, React, Angular, and TypeScript based in Bandung, Indonesia. 3+ years building scalable, high-performance web applications.",
  keywords: ["Wildan Jaelani", "Front-End Developer", "Next.js", "React", "Angular", "TypeScript", "Bandung", "Web Developer Indonesia"],
  authors: [{ name: "Wildan Jaelani" }],
  openGraph: {
    title: "Wildan Jaelani — Front-End Developer",
    description: "Front-End Developer specializing in Next.js, React, Angular, and TypeScript based in Bandung, Indonesia.",
    url: "https://wildanjaelani.vercel.app",
    siteName: "Wildan Jaelani Portfolio",
    locale: "id_ID",
    type: "website",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="bg-background text-foreground antialiased selection:bg-accent selection:text-white min-h-screen flex flex-col">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
