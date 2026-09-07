"use client"

import { useEffect, useState } from "react"
import { dict } from "@/lib/data"
import { useLanguage } from "./LanguageContext"
import { ArrowUp } from "lucide-react"

export default function Footer() {
  const { language } = useLanguage()
  const content = dict[language]
  const [bandungTime, setBandungTime] = useState<string>("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeString = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Jakarta",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      setBandungTime(timeString)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="border-t border-border-subtle bg-surface/50 py-12 sm:py-16 text-foreground">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-border-subtle">
          
          {/* Identity & Colophon */}
          <div className="space-y-1">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight block">
              WILDAN JAELANI
            </span>
            <p className="text-xs text-text-muted font-mono">
              FRONT-END DEVELOPER · NEXT.JS · ANGULAR · TYPESCRIPT
            </p>
          </div>

          {/* Local Time Bandung & Status */}
          <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-text-muted">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>BANDUNG (WIB / UTC+7):</span>
              <span className="font-bold text-foreground">{bandungTime || "--:--:--"}</span>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-border-subtle bg-background hover:bg-surface-card hover:border-foreground transition-all text-foreground font-semibold"
            >
              <span>{content.footer.back_to_top}</span>
              <ArrowUp size={13} />
            </button>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted">
          <p>
            © {new Date().getFullYear()} {content.profile.name}. {content.footer.rights}
          </p>
          <p className="text-text-subtle">
            {content.footer.crafted}
          </p>
        </div>

      </div>
    </footer>
  )
}
