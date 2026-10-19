"use client"

import { dict } from "@/lib/data"
import { motion, Variants } from "framer-motion"
import { useLanguage } from "./LanguageContext"
import { CheckCircle, ShieldCheck, Zap, Layers, Terminal } from "lucide-react"

export default function About() {
  const { language } = useLanguage()
  const content = dict[language]

  const pillarIcons = [
    <ShieldCheck key="shield" size={18} className="text-accent" />,
    <Zap key="zap" size={18} className="text-accent" />,
    <Layers key="layers" size={18} className="text-accent" />,
  ]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section id="about" className="py-24 sm:py-32 border-b border-border-subtle bg-surface/40 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 mb-16 border-b border-border-subtle"
        >
          <div>
            <span className="editorial-tag text-accent mb-2.5 block">
              {content.about.section_label}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground max-w-2xl leading-[1.12] font-display">
              {content.about.heading}
            </h2>
          </div>
          <div className="hidden md:block text-right">
            <span className="font-mono text-xs text-text-subtle">
              BANDUNG · FRONT-END CRAFT
            </span>
          </div>
        </motion.div>

        {/* Narrative & Metrics Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Main Story & Technical Pillars (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-base sm:text-lg text-text-muted leading-relaxed"
          >
            <p className="text-foreground font-medium text-lg sm:text-xl leading-snug">
              {content.about.bio_p1}
            </p>
            <p>
              {content.about.bio_p2}
            </p>

            {/* Core Pillars */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="grid sm:grid-cols-3 gap-4 sm:gap-5 pt-8 mt-8 border-t border-border-subtle"
            >
              {content.about.pillars.map((pillar, idx) => (
                <motion.div 
                  key={idx} 
                  variants={itemVariants}
                  whileHover={{ y: -3 }}
                  className="p-5 rounded-lg bg-surface-card border border-border-subtle hover:border-border-strong hover:shadow-editorial transition-all"
                >
                  <div className="w-8 h-8 rounded border border-border-subtle bg-surface flex items-center justify-center mb-3">
                    {pillarIcons[idx]}
                  </div>
                  <h4 className="font-bold text-sm text-foreground mb-1.5 font-display">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {pillar.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Stats / Info Matrix (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 bg-surface-card border border-border-subtle rounded-xl p-6 sm:p-8 shadow-editorial"
          >
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-border-subtle font-mono text-xs text-text-muted uppercase">
              <span className="flex items-center gap-1.5 font-bold text-foreground">
                <Terminal size={14} className="text-accent" />
                <span>SPECIFICATION MATRIX</span>
              </span>
              <span className="text-[10px] text-text-subtle">INDEX / 01</span>
            </div>

            <div className="divide-y divide-border-subtle">
              {content.about.highlights.map((item, idx) => (
                <div 
                  key={idx} 
                  className="py-3.5 flex items-center justify-between text-sm group"
                >
                  <span className="font-mono text-xs text-text-muted uppercase tracking-wider group-hover:text-foreground transition-colors">
                    {item.label}
                  </span>
                  <span className="font-semibold font-mono text-foreground group-hover:text-accent transition-colors">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-5 border-t border-border-subtle bg-surface/50 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-6 rounded-b-xl">
              <div className="flex items-start gap-2 text-xs font-mono text-text-muted">
                <CheckCircle size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>
                  {language === "id" 
                    ? "Berkomitmen pada arsitektur bersih, type-safety, dan kode yang terdokumentasi dengan baik."
                    : "Committed to clean architecture, type safety, and rigorously documented code."}
                </span>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
