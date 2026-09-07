"use client"

import { useState } from "react"
import { dict } from "@/lib/data"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "./LanguageContext"
import { Code2, Layers, Palette, Wrench } from "lucide-react"

export default function Skills() {
  const { language } = useLanguage()
  const content = dict[language]
  const [activeTab, setActiveTab] = useState<string>("all")

  const categoryIcons: Record<string, React.ReactNode> = {
    Frameworks: <Layers size={14} className="text-accent" />,
    Languages: <Code2 size={14} className="text-accent" />,
    "Styling & UI": <Palette size={14} className="text-accent" />,
    "Architecture & Tools": <Wrench size={14} className="text-accent" />,
  }

  // Flatten skills with category info
  const allSkills = content.skills.flatMap((cat) =>
    cat.items.map((item) => ({
      name: item,
      category: cat.category,
    }))
  )

  const displayedSkills =
    activeTab === "all"
      ? allSkills
      : allSkills.filter((s) => s.category === activeTab)

  return (
    <section id="skills" className="py-24 sm:py-32 border-b border-border-subtle bg-surface/30 relative">
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
              {content.skills_section.section_label}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.08]">
              {content.skills_section.heading}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-text-muted max-w-md">
            {content.skills_section.desc}
          </p>
        </motion.div>

        {/* Category Selector Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center gap-2 pb-8 mb-12 border-b border-border-subtle"
        >
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 font-mono text-xs uppercase tracking-wider rounded transition-all duration-200 ${
              activeTab === "all"
                ? "bg-foreground text-background font-bold shadow-sm"
                : "bg-surface border border-border-subtle text-text-muted hover:text-foreground hover:border-border-strong"
            }`}
          >
            {content.skills_section.all} ({allSkills.length})
          </motion.button>

          {content.skills.map((group) => (
            <motion.button
              key={group.category}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab(group.category)}
              className={`flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-wider rounded transition-all duration-200 ${
                activeTab === group.category
                  ? "bg-foreground text-background font-bold shadow-sm"
                  : "bg-surface border border-border-subtle text-text-muted hover:text-foreground hover:border-border-strong"
              }`}
            >
              {categoryIcons[group.category]}
              <span>{group.category}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Typography-Driven Skills Matrix */}
        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {displayedSkills.map((skill, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                key={skill.name}
                className="group p-5 sm:p-6 bg-surface-card border border-border-subtle rounded-lg hover:border-foreground hover:shadow-editorial-hover transition-all duration-300 flex flex-col justify-between min-h-[140px] cursor-default"
              >
                <div className="flex items-center justify-between text-text-muted">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-text-subtle group-hover:text-accent transition-colors">
                    {skill.category}
                  </span>
                  <span className="font-mono text-[10px] text-text-subtle">
                    / CORE
                  </span>
                </div>

                <div className="mt-4">
                  <span className="block text-lg sm:text-xl font-extrabold tracking-tight text-foreground group-hover:text-accent transition-colors">
                    {skill.name}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-border-subtle/60 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-text-muted">
                    {language === "id" ? "Teruji di Produksi" : "Production Ready"}
                  </span>
                  <motion.span 
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ repeat: Infinity, duration: 2.5, delay: idx * 0.2 }}
                    className="w-1.5 h-1.5 rounded-full bg-accent" 
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Editorial Architecture Footer Note */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 p-6 sm:p-8 bg-surface border border-border-subtle rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div>
            <span className="font-mono text-xs text-accent font-bold uppercase tracking-wider block mb-1">
              [ STACK PHILOSOPHY ]
            </span>
            <p className="text-sm text-text-muted max-w-2xl">
              {language === "id"
                ? "Menyukai ekosistem yang berpusat pada Type Safety, Modular Architecture, SSR/SSG, dan performa web instan."
                : "Favors architectures centered on Type Safety, Modular Components, Hybrid SSR/SSG, and sub-second web performance."}
            </p>
          </div>
          <div className="font-mono text-xs text-foreground font-semibold px-3 py-1.5 bg-background border border-border-subtle rounded whitespace-nowrap">
            TS · NEXT · ANGULAR
          </div>
        </motion.div>

      </div>
    </section>
  )
}
