"use client";

import Image from "next/image"
import { dict } from "@/lib/data"
import { motion, Variants } from "framer-motion"
import { ArrowRight, MessageCircle } from "lucide-react"
import { useLanguage } from "./LanguageContext"

export default function Hero() {
  const { language } = useLanguage()
  const content = dict[language]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }

  return (
    <section id="about" className="min-h-screen flex items-center px-[5%] pt-20 relative overflow-hidden bg-background">
      <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center z-10 relative"
      >
        <div>
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
            <div className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
            <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">{content.hero.available}</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold leading-tight mb-4 tracking-tight">
            {content.hero.hi} <br />
            <span className="text-accent">{content.profile.name}</span>
          </motion.h1>

          <motion.h2 variants={itemVariants} className="text-2xl md:text-4xl font-semibold mb-6 text-foreground/80">
            {content.profile.role}
          </motion.h2>

          <motion.div variants={itemVariants} className="w-16 h-1.5 rounded-full mb-8 bg-accent" />

          <motion.p variants={itemVariants} className="text-text-muted leading-relaxed mb-10 text-lg font-light max-w-lg">
            {content.profile.bio}
          </motion.p>

          <motion.div variants={itemVariants} className="flex gap-4 flex-wrap mb-10">
            <a href={`https://wa.me/${content.profile.whatsapp}`} target="_blank" rel="noopener noreferrer"
              className="group relative px-6 py-3 bg-accent text-white text-sm font-semibold rounded-xl flex items-center gap-2 overflow-hidden transition-all hover:bg-blue-600 hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20">
              <MessageCircle size={18} />
              {content.hero.contact}
            </a>
            <a href="#projects"
              className="px-6 py-3 text-sm font-medium rounded-xl text-foreground glass-panel hover:bg-white/5 transition-all flex items-center gap-2 group border border-border-dark hover:border-accent/30">
              {content.hero.projects} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-accent" />
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-6">
            <a href={`mailto:${content.profile.email}`} className="text-sm font-medium text-text-muted hover:text-accent transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-accent after:transition-all hover:after:w-full">{content.profile.email}</a>
            <a href={content.profile.linkedin} target="_blank" rel="noopener noreferrer"
              className="text-sm font-medium text-text-muted hover:text-accent transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-accent after:transition-all hover:after:w-full">LinkedIn</a>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="flex justify-center md:justify-end"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500 to-emerald-400 rounded-full blur-xl opacity-20 animate-pulse" />
            
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden relative z-10 p-1 bg-gradient-to-br from-border-dark to-primary-dark">
              <div className="w-full h-full relative rounded-full overflow-hidden">
                <Image
                  src={content.profile.photo}
                  alt={content.profile.name}
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute -bottom-4 -left-6 glass-panel rounded-2xl px-5 py-3 z-20 border border-border-dark shadow-xl"
            >
              <div className="text-xs text-text-muted mb-1 font-medium">{content.hero.experience}</div>
              <div className="font-bold text-accent text-lg">{content.hero.years}</div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute -top-2 -right-6 rounded-2xl px-5 py-3 z-20 glass-panel border border-border-dark shadow-xl"
            >
              <div className="text-xs text-text-muted mb-1 font-medium">Tech Stack</div>
              <div className="font-bold text-emerald-400 text-sm">Next.js · React</div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
