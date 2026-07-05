import type { Metadata } from "next"
import "./globals.css"
import { LanguageProvider } from "@/components/LanguageContext"

export const metadata: Metadata = {
  title: "Wildan Jaelani — Front-End Developer",
  description: "Portfolio Wildan Jaelani, Front-End Developer spesialis Next.js, React, dan TypeScript berbasis di Bandung.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="dark">
      <body className="bg-background text-foreground antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
