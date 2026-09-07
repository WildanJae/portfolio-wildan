"use client"

import Image from "next/image"
import { dict } from "@/lib/data"
import { motion, Variants } from "framer-motion"
import { ArrowDownRight, MessageSquare, Sparkles } from "lucide-react"
import { useLanguage } from "./LanguageContext"

export default function Hero() {
  const { language } = useLanguage()
  const content = dict[language]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 border-b border-border-subtle bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Availability status bar */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-border-subtle"
        >
          <div className="inline-flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
            </span>
            <span className="editorial-tag text-foreground/80 tracking-widest">
              {content.hero.status}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 font-mono text-xs text-text-muted">
            <span className="text-foreground/90 font-medium">[ OPEN FOR REMOTE WORK ]</span>
            <span>BANDUNG, ID</span>
          </div>
        </motion.div>

        {/* Hero Main Grid: Asymmetrical Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Left Column: Bold Editorial Typography & Manifesto */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <motion.div variants={itemVariants} className="mb-4">
              <span className="editorial-tag text-accent font-bold">
                {content.profile.name} — {content.profile.role}
              </span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-extrabold tracking-tight text-foreground leading-[1.02] mb-8"
            >
              <span>{content.hero.headline_1}</span>
              <br />
              <span className="text-foreground relative inline-block">
                {content.hero.headline_2}
                <span className="block h-1.5 w-full bg-accent mt-1" />
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg text-text-muted font-normal leading-relaxed max-w-2xl mb-10"
            >
              {content.hero.subheadline}
            </motion.p>

            {/* CTAs & Social Links */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mb-10">
              <motion.a 
                href="#projects"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-foreground text-background text-xs sm:text-sm font-semibold uppercase tracking-wider rounded hover:bg-accent transition-colors duration-200 shadow-editorial"
              >
                <span>{content.hero.view_work}</span>
                <ArrowDownRight size={16} />
              </motion.a>

              <motion.a 
                href={`https://wa.me/${content.profile.whatsapp}`}
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-border-strong bg-surface/60 text-foreground text-xs sm:text-sm font-semibold uppercase tracking-wider rounded hover:bg-surface hover:border-foreground transition-all duration-200"
              >
                <MessageSquare size={16} className="text-accent" />
                <span>{content.hero.lets_talk}</span>
              </motion.a>
            </motion.div>

            {/* Quick Metrics Bar */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-border-subtle"
            >
              <motion.div whileHover={{ y: -3 }} className="cursor-default">
                <p className="font-mono text-2xl sm:text-3xl font-bold text-foreground">3+</p>
                <p className="text-[11px] font-mono uppercase text-text-muted tracking-wider mt-1">
                  Years Exp.
                </p>
              </motion.div>
              <motion.div whileHover={{ y: -3 }} className="cursor-default">
                <p className="font-mono text-2xl sm:text-3xl font-bold text-foreground">100%</p>
                <p className="text-[11px] font-mono uppercase text-text-muted tracking-wider mt-1">
                  TypeScript & Modern Web
                </p>
              </motion.div>
              <motion.div whileHover={{ y: -3 }} className="cursor-default">
                <p className="font-mono text-2xl sm:text-3xl font-bold text-foreground">ENT</p>
                <p className="text-[11px] font-mono uppercase text-text-muted tracking-wider mt-1">
                  Enterprise Proven
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Editorial Portrait with Architectural Frame & Metadata */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="relative max-w-md mx-auto lg:max-w-none"
            >
              {/* Outer Editorial Container */}
              <div className="p-3 sm:p-4 bg-surface border border-border-subtle rounded-lg shadow-editorial relative">
                
                {/* Image Frame with Editorial Aspect Ratio */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded border border-border-subtle bg-surface">
                  <Image
                    src={content.profile.photo}
                    alt={content.profile.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    quality={100}
                    unoptimized={true}
                    className="object-cover object-top"
                    priority
                  />
                </div>

                {/* Editorial Metadata Footer within frame */}
                <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-text-muted">
                  <span className="font-semibold text-foreground">FRONT-END ARCHITECT</span>
                  <span className="text-accent font-bold">3+ YRS EXP</span>
                </div>
              </div>

              {/* Floating Accent Sticker with gentle floating motion */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 bg-foreground text-background px-4 py-2.5 rounded shadow-lg border border-foreground font-mono text-xs tracking-wider uppercase hidden sm:flex items-center gap-2 cursor-default"
              >
                <Sparkles size={14} className="text-accent" />
                <span>Next.js · Angular · React</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
