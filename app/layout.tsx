import type { Metadata } from "next"
import "./globals.css"
import { LanguageProvider } from "@/components/LanguageContext"

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-wildan.vercel.app"),
  title: {
    default: "Wildan Jaelani — Front-End Developer",
    template: "%s | Wildan Jaelani",
  },
  description: "Front-End Developer specializing in Next.js, React, Angular, and TypeScript based in Bandung, Indonesia. 3+ years building scalable, high-performance web applications.",
  keywords: ["Wildan Jaelani", "Front-End Developer", "Next.js", "React", "Angular", "TypeScript", "Bandung", "Web Developer Indonesia"],
  authors: [{ name: "Wildan Jaelani" }],
  creator: "Wildan Jaelani",
  publisher: "Wildan Jaelani",
  verification: {
    google: "VU7sg7iMmaV1KbwLCKX8c09nLHmfyZ6G4rlv8mPrGG4",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Wildan Jaelani — Front-End Developer",
    description: "Front-End Developer specializing in Next.js, React, Angular, and TypeScript based in Bandung, Indonesia.",
    url: "/",
    siteName: "Wildan Jaelani Portfolio",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/wildan2.jpg",
        width: 1200,
        height: 630,
        alt: "Wildan Jaelani, Front-End Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wildan Jaelani — Front-End Developer",
    description: "Front-End Developer specializing in Next.js, React, Angular, and TypeScript based in Bandung, Indonesia.",
    images: ["/wildan2.jpg"],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  category: "portfolio",
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
