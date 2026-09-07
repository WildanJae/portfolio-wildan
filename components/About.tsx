"use client"

import { dict } from "@/lib/data"
import { motion, Variants } from "framer-motion"
import { useLanguage } from "./LanguageContext"
import { Compass, Cpu, Layers, Terminal } from "lucide-react"

export default function About() {
  const { language } = useLanguage()
  const content = dict[language]

  const pillars = [
    {
      icon: <Layers size={20} className="text-accent" />,
      title: language === "id" ? "Arsitektur Skalabel" : "Scalable Architecture",
      desc: language === "id" 
        ? "Menerapkan struktur monorepo, isolasi komponen, dan type-safety penuh dari front-end hingga RPC API."
        : "Implementing monorepos, clean component boundaries, and end-to-end type safety with modern TypeScript.",
    },
    {
      icon: <Cpu size={20} className="text-accent" />,
      title: language === "id" ? "Performa & Core Web Vitals" : "Performance & Web Vitals",
      desc: language === "id"
        ? "Optimasi rendering, bundle splitting, dan load time instan untuk pengalaman pengguna tanpa hambatan."
        : "Optimizing render passes, asset pipelines, and bundle weights for instant, silky user experiences.",
    },
    {
      icon: <Compass size={20} className="text-accent" />,
      title: language === "id" ? "Ketelitian Visual" : "Visual Precision & Polish",
      desc: language === "id"
        ? "Menggabungkan desain editorial, tipografi berkarakter, dan interaksi mikro yang fungsional."
        : "Translating sophisticated design systems, editorial typography, and purposeful micro-interactions.",
    },
  ]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section id="about" className="py-24 sm:py-32 border-b border-border-subtle bg-surface/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 mb-16 border-b border-border-subtle"
        >
          <div>
            <span className="editorial-tag text-accent mb-3 block">
              {content.about.section_label}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground max-w-2xl leading-[1.1]">
              {content.about.heading}
            </h2>
          </div>
          <div className="hidden md:block text-right">
            <span className="font-mono text-xs text-text-muted">
              EST. 2023 · FRONT-END CRAFT
            </span>
          </div>
        </motion.div>

        {/* Narrative & Metrics Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Main Story (Left) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-6 text-base sm:text-lg text-text-muted leading-relaxed"
          >
            <p className="text-foreground font-medium text-lg sm:text-xl leading-snug">
              {content.about.bio_p1}
            </p>
            <p>
              {content.about.bio_p2}
            </p>

            {/* Core Pillars with Staggered Entrance and Hover Lift */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              className="grid sm:grid-cols-3 gap-6 pt-8 mt-8 border-t border-border-subtle"
            >
              {pillars.map((pillar, idx) => (
                <motion.div 
                  key={idx} 
                  variants={itemVariants}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="space-y-2 p-4 rounded-lg bg-surface-card/60 border border-border-subtle hover:border-accent/40 hover:shadow-editorial transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded border border-border-subtle bg-surface flex items-center justify-center mb-3">
                    {pillar.icon}
                  </div>
                  <h4 className="font-bold text-sm text-foreground">{pillar.title}</h4>
                  <p className="text-xs text-text-muted leading-relaxed">{pillar.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Stats / Info Matrix (Right) with Interactive Float */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="lg:col-span-5 bg-surface-card border border-border-subtle rounded-lg p-6 sm:p-8 shadow-editorial hover:shadow-editorial-hover hover:border-border-strong transition-all duration-300"
          >
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-border-subtle font-mono text-xs text-text-muted uppercase">
              <span className="flex items-center gap-1.5 font-bold text-foreground">
                <Terminal size={14} className="text-accent" />
                <span>PROFILE MATRIX</span>
              </span>
              <span>INDEX / 01</span>
            </div>

            <div className="divide-y divide-border-subtle">
              {content.about.highlights.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.15 }}
                  className="py-3.5 flex items-center justify-between text-sm group"
                >
                  <span className="font-mono text-xs text-text-muted uppercase tracking-wider group-hover:text-foreground transition-colors">
                    {item.label}
                  </span>
                  <span className="font-semibold text-foreground group-hover:text-accent transition-colors">
                    {item.value}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border-subtle bg-surface/50 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-6 rounded-b-lg">
              <p className="text-xs text-text-muted leading-relaxed">
                {language === "id" 
                  ? "Berkomitmen pada kode yang bersih, terdokumentasi dengan baik, dan standar performa industri."
                  : "Committed to clean maintainable code, rigorous documentation, and production performance."}
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
