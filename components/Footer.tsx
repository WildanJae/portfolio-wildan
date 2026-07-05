"use client"

import { dict } from "@/lib/data"
import { useLanguage } from "./LanguageContext"

export default function Footer() {
  const { language } = useLanguage()
  const content = dict[language]

  return (
    <footer className="py-12 px-[5%] bg-primary-dark border-t border-border-dark text-center">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <span className="font-bold text-2xl tracking-tighter text-foreground mb-4">
          {content.profile.name.split(" ")[0]}
          <span className="text-accent">.</span>
        </span>
        <p className="text-text-muted text-sm font-medium mb-1">
          © {new Date().getFullYear()} {content.profile.name}.
        </p>
      </div>
    </footer>
  )
}
