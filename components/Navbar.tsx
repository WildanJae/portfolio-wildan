"use client"

import Link from "next/link"
import { dict } from "@/lib/data"
import { motion, useScroll, useMotionValueEvent, useSpring } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"
import LanguageSwitcher from "./LanguageSwitcher"
import { useLanguage } from "./LanguageContext"
import { ArrowUpRight, Command, Menu, X } from "lucide-react"

export default function Navbar({ onOpenCommand }: { onOpenCommand?: () => void }) {
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
    setScrolled(latest > 30)
  })

  const navLinks = [
    { label: content.nav.about, href: "#about" },
    { label: content.nav.projects, href: "#projects" },
    { label: content.nav.skills, href: "#skills" },
    { label: content.nav.experience, href: "#experience" },
    { label: content.nav.contact, href: "#contact" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      <div 
        className={cn(
          "w-full transition-all duration-300 border-b",
          scrolled 
            ? "bg-surface/90 backdrop-blur-md border-border-subtle shadow-editorial py-3" 
            : "bg-background/60 backdrop-blur-sm border-transparent py-4 sm:py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          
          {/* Logo / Identity */}
          <Link href="/" className="group flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-bold text-sm sm:text-base tracking-tight text-foreground group-hover:text-accent transition-colors font-display">
              WILDAN JAELANI
            </span>
            <span className="hidden sm:inline-block font-mono text-[10px] text-text-muted px-2 py-0.5 border border-border-subtle rounded bg-surface-card">
              FE ENGINEER
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((item) => (
              <a 
                key={item.label}
                href={item.href}
                className="text-xs font-mono tracking-wider uppercase text-text-muted hover:text-foreground transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-accent hover:after:w-full after:transition-all"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action Area: Cmd+K, Lang Switcher & CTA */}
          <div className="flex items-center gap-2.5">
            {/* Quick Command Menu Trigger */}
            <button
              onClick={onOpenCommand}
              className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-border-subtle bg-surface-card text-text-muted hover:text-foreground hover:border-border-strong transition-all text-xs font-mono"
              title="Open Command Palette (⌘K)"
            >
              <Command size={13} className="text-accent" />
              <span className="text-[11px] text-text-subtle">Menu</span>
              <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border-subtle text-[9px] font-mono text-text-muted">
                ⌘K
              </kbd>
            </button>

            <LanguageSwitcher />

            <a 
              href={`https://wa.me/${content.profile.whatsapp}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider bg-foreground text-background font-semibold rounded hover:bg-accent hover:text-white transition-all duration-200"
            >
              <span>{content.nav.hire}</span>
              <ArrowUpRight size={13} />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-foreground hover:text-accent border border-border-subtle rounded bg-surface-card"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Global Animated Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="h-[2px] bg-accent origin-left w-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"
      />

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-surface border-b border-border-strong px-6 py-6 shadow-editorial"
        >
          <div className="flex flex-col gap-4">
            {/* Mobile Command button */}
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                if (onOpenCommand) onOpenCommand()
              }}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-lg border border-border-subtle bg-surface-card text-xs font-mono text-text-muted hover:text-foreground"
            >
              <span className="flex items-center gap-2">
                <Command size={14} className="text-accent" />
                <span>Command Menu</span>
              </span>
              <span className="text-[10px] text-text-subtle font-mono">⌘K</span>
            </button>

            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-mono uppercase tracking-wider text-text-muted hover:text-foreground py-2 border-b border-border-subtle/50"
              >
                {item.label}
              </a>
            ))}

            <div className="pt-2">
              <a
                href={`https://wa.me/${content.profile.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 text-xs font-mono font-bold uppercase tracking-wider bg-foreground text-background rounded hover:bg-accent hover:text-white transition-colors"
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
