"use client"

import Link from "next/link"
import { dict } from "@/lib/data"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"
import LanguageSwitcher from "./LanguageSwitcher"
import { useLanguage } from "./LanguageContext"

export default function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const { language } = useLanguage()
  
  const content = dict[language]

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50)
  })

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "py-3" : "py-6"
      )}
    >
      <div className={cn(
        "mx-auto flex justify-between items-center transition-all duration-300",
        scrolled ? "w-[90%] md:w-[70%] max-w-4xl px-6 py-3 rounded-2xl glass-panel shadow-2xl shadow-black/50" : "w-full px-[5%]"
      )}>
        <span className="font-bold text-lg tracking-tighter">
          {content.profile.name.split(" ")[0]}
          <span className="text-accent">.</span>
        </span>
        <ul className="hidden md:flex gap-8 list-none items-center">
          {[
            [content.nav.about, "/#about"], 
            [content.nav.skills, "/#skills"], 
            [content.nav.projects, "/#projects"], 
            [content.nav.contact, "/#contact"]
          ].map(([label, href]) => (
            <li key={label}>
              <Link href={href} className="text-sm font-medium text-text-muted hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-accent after:transition-all hover:after:w-full">
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/play" className="text-sm font-bold text-accent bg-accent/10 px-3 py-1.5 rounded-lg border border-accent/20 hover:bg-accent/20 transition-colors flex items-center gap-2">
              🎮 {content.game.play}
            </Link>
          </li>
        </ul>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <a href={`https://wa.me/${content.profile.whatsapp}`} target="_blank" rel="noopener noreferrer"
            className="hidden sm:inline-flex text-sm font-semibold px-5 py-2 rounded-xl bg-accent text-white hover:scale-105 transition-transform active:scale-95 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            {content.nav.hire}
          </a>
        </div>
      </div>
    </motion.nav>
  )
}
