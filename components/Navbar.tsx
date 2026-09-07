"use client"

import Link from "next/link"
import { dict } from "@/lib/data"
import { motion, useScroll, useMotionValueEvent, useSpring } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"
import LanguageSwitcher from "./LanguageSwitcher"
import { useLanguage } from "./LanguageContext"
import { ArrowUpRight, Menu, X } from "lucide-react"

export default function Navbar() {
  const { scrollY, scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  })
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language } = useLanguage()
  
  const content = dict[language]

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40)
  })

  const navLinks = [
    { label: content.nav.about, href: "#about" },
    { label: content.nav.projects, href: "#projects" },
    { label: content.nav.skills, href: "#skills" },
    { label: content.nav.experience, href: "#experience" },
    { label: content.nav.contact, href: "#contact" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div 
        className={cn(
          "w-full transition-all duration-300 border-b",
          scrolled 
            ? "bg-[#FBFBFA]/90 backdrop-blur-md border-border-subtle shadow-card py-3.5" 
            : "bg-transparent border-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          
          {/* Logo / Identity */}
          <Link href="/" className="group flex items-center gap-3">
            <span className="font-bold text-base md:text-lg tracking-tight text-foreground group-hover:text-accent transition-colors">
              WILDAN JAELANI
            </span>
            <span className="hidden sm:inline-block font-mono text-[11px] text-text-muted px-2 py-0.5 border border-border-subtle rounded bg-surface/50">
              FE DEV
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((item) => (
              <a 
                key={item.label}
                href={item.href}
                className="text-[13px] font-medium tracking-wide uppercase text-text-muted hover:text-foreground transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-foreground hover:after:w-full after:transition-all"
              >
                {item.label}
              </a>
            ))}
            <Link 
              href="/play" 
              className="text-[13px] font-medium tracking-wide uppercase text-accent hover:text-accent-hover transition-colors flex items-center gap-1.5"
            >
              <span>{content.game.play}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-accent-subtle text-accent font-semibold border border-accent/20">
                HUB
              </span>
            </Link>
          </nav>

          {/* Right Action Area: Lang Switcher & CTA */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            <a 
              href={`https://wa.me/${content.profile.whatsapp}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-foreground text-background rounded hover:bg-accent transition-colors duration-200"
            >
              <span>{content.nav.hire}</span>
              <ArrowUpRight size={14} />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden text-foreground hover:text-accent border border-border-subtle rounded bg-surface/50"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Global Animated Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="h-[2px] bg-accent origin-left w-full shadow-[0_0_8px_rgba(26,75,255,0.4)]"
      />

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="lg:hidden bg-background border-b border-border-subtle px-6 py-6 shadow-editorial"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold uppercase tracking-wider text-text-muted hover:text-foreground py-2 border-b border-border-subtle/50"
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/play"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold uppercase tracking-wider text-accent py-2 flex items-center justify-between"
            >
              <span>{content.game.play}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent-subtle text-accent border border-accent/20">
                MINI GAMES
              </span>
            </Link>
            <div className="pt-2">
              <a
                href={`https://wa.me/${content.profile.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider bg-foreground text-background rounded hover:bg-accent transition-colors"
              >
                <span>{content.nav.hire}</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}
