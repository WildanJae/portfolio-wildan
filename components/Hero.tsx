"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { dict } from "@/lib/data"
import { motion, Variants } from "framer-motion"
import { ArrowDownRight, Check, Copy, MessageSquare, Terminal } from "lucide-react"
import { useLanguage } from "./LanguageContext"
import { useToast } from "./ToastContext"

export default function Hero({ onOpenCommand }: { onOpenCommand?: () => void }) {
  const { language } = useLanguage()
  const { showToast } = useToast()
  const content = dict[language]
  const [copied, setCopied] = useState(false)
  const [bandungTime, setBandungTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Jakarta",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      setBandungTime(timeStr)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const copyEmail = () => {
    navigator.clipboard.writeText(content.profile.email)
    setCopied(true)
    showToast(language === "id" ? "Email disalin ke clipboard: jwildan22904@gmail.com" : "Email copied to clipboard: jwildan22904@gmail.com")
    setTimeout(() => setCopied(false), 2500)
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 border-b border-border-subtle bg-background bg-blueprint-grid">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Availability & Live Bandung Time Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-10 border-b border-border-subtle"
        >
          {/* Status Pill */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-surface-card border border-border-subtle text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-text-muted">
              {content.hero.status}
            </span>
          </div>

          {/* Time & Coordinates */}
          <div className="flex items-center gap-4 font-mono text-xs text-text-subtle">
            <div className="flex items-center gap-2">
              <span className="text-text-muted">BANDUNG, ID:</span>
              <span className="font-semibold text-foreground tracking-wider">{bandungTime || "--:--:--"} WIB</span>
            </div>
            <span className="hidden md:inline text-border-strong">/</span>
            <span className="hidden md:inline">UTC+07:00</span>
          </div>
        </motion.div>

        {/* Hero Asymmetric Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Left Column: Authentic Human Presentation (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            
            <motion.div variants={itemVariants} className="mb-4">
              <span className="editorial-tag text-accent font-mono font-semibold tracking-wider">
                {content.hero.role_badge}
              </span>
            </motion.div>

            {/* Natural, Confident Headline */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight text-foreground leading-[1.08] mb-6 font-display"
            >
              <span>{content.hero.greeting}</span>{" "}
              <span className="text-foreground relative inline-block underline decoration-accent decoration-4 underline-offset-8">
                {content.hero.name}
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl sm:text-2xl font-medium text-foreground/90 leading-snug max-w-2xl mb-4 font-display"
            >
              {content.hero.headline}
            </motion.p>

            <motion.p 
              variants={itemVariants}
              className="text-sm sm:text-base text-text-muted font-normal leading-relaxed max-w-2xl mb-8"
            >
              {content.hero.subheadline}
            </motion.p>

            {/* Direct Action CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3.5 mb-10">
              <motion.a 
                href="#projects"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-foreground text-background text-xs font-mono font-bold uppercase tracking-wider rounded-lg hover:bg-accent hover:text-white transition-all duration-200 shadow-editorial"
              >
                <span>{content.hero.view_work}</span>
                <ArrowDownRight size={15} />
              </motion.a>

              <motion.button 
                onClick={copyEmail}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-5 py-3.5 border border-border-strong bg-surface-card text-foreground text-xs font-mono font-medium rounded-lg hover:bg-surface-hover hover:border-accent transition-all duration-200"
                title="Copy email"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span className="text-emerald-400">{content.hero.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} className="text-text-muted" />
                    <span>{content.profile.email}</span>
                  </>
                )}
              </motion.button>

              <motion.a 
                href={`https://wa.me/${content.profile.whatsapp}`}
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-4 py-3.5 border border-border-subtle bg-surface text-text-muted hover:text-foreground hover:border-border-strong text-xs font-mono rounded-lg transition-all"
              >
                <MessageSquare size={14} className="text-emerald-400" />
                <span>WhatsApp</span>
              </motion.a>
            </motion.div>

            {/* Verified Technical Pillars Bar */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-border-subtle"
            >
              <div className="space-y-1">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-foreground">3+</span>
                <p className="text-[11px] font-mono uppercase text-text-subtle tracking-wider">
                  Years Experience
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-foreground">Next · Ng</span>
                <p className="text-[11px] font-mono uppercase text-text-subtle tracking-wider">
                  Framework Mastery
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-foreground">100%</span>
                <p className="text-[11px] font-mono uppercase text-text-subtle tracking-wider">
                  Type-Safe Stack
                </p>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Architectural Photo & Specs Frame (5 cols) */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="relative max-w-md mx-auto lg:max-w-none"
            >
              {/* Outer Card */}
              <div className="p-3 sm:p-4 bg-surface-card border border-border-subtle rounded-xl shadow-editorial relative">
                
                {/* Photo Frame */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border border-border-strong bg-surface">
                  <Image
                    src={content.profile.photo}
                    alt={content.profile.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 550px"
                    quality={95}
                    unoptimized={true}
                    className="object-cover object-top hover:scale-[1.02] transition-transform duration-500"
                    priority
                  />
                  
                  {/* Subtle Corner Badge */}
                  <div className="absolute top-3 left-3 bg-background/85 backdrop-blur-md border border-border-subtle px-2.5 py-1 rounded text-[10px] font-mono text-foreground font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>PT. INFINYS SYSTEM ID</span>
                  </div>
                </div>

                {/* Technical Metadata Footer */}
                <div className="mt-3.5 pt-3 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-text-subtle">
                  <span className="text-text-muted font-medium">BDO · 107.6191° E</span>
                  <span className="text-accent font-semibold">ANGULAR · NEXT.JS · TS</span>
                </div>
              </div>

              {/* Floating Command Hint */}
              <motion.button 
                onClick={onOpenCommand}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="absolute -bottom-4 -left-3 sm:-bottom-5 sm:-left-4 bg-surface border border-border-strong text-foreground px-3.5 py-2 rounded-lg shadow-editorial font-mono text-xs flex items-center gap-2 hover:border-accent transition-all cursor-pointer"
              >
                <Terminal size={14} className="text-accent" />
                <span className="text-text-muted">⌘K menu interaktif</span>
              </motion.button>
            </motion.div>
          </div>

        </motion.div>

      </div>
    </section>
  )
}
