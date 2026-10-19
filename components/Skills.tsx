"use client"

import { useState } from "react"
import { dict } from "@/lib/data"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "./LanguageContext"
import { Code2, Layers, Palette, Wrench, Sparkles } from "lucide-react"

export default function Skills() {
  const { language } = useLanguage()
  const content = dict[language]
  const [activeTab, setActiveTab] = useState<string>("all")

  const categoryIcons: Record<string, React.ReactNode> = {
    "Frameworks & Libs": <Layers size={14} className="text-accent" />,
    "Languages & Typing": <Code2 size={14} className="text-accent" />,
    "Styling & Motion": <Palette size={14} className="text-accent" />,
    "Architecture & Tools": <Wrench size={14} className="text-accent" />,
  }

  // Flatten all skills with category
  const allSkills = content.skills.flatMap((cat) =>
    cat.items.map((item) => ({
      ...item,
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 mb-12 border-b border-border-subtle">
          <div>
            <span className="editorial-tag text-accent mb-2.5 block">
              {content.skills_section.section_label}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.12] font-display">
              {content.skills_section.heading}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-text-muted max-w-md">
            {content.skills_section.desc}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 pb-6 mb-10 border-b border-border-subtle font-mono text-xs">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3.5 py-1.5 rounded-lg transition-colors ${
              activeTab === "all"
                ? "bg-foreground text-background font-bold"
                : "bg-surface-card border border-border-subtle text-text-muted hover:text-foreground"
            }`}
          >
            {content.skills_section.all} ({allSkills.length})
          </button>

          {content.skills.map((group) => (
            <button
              key={group.category}
              onClick={() => setActiveTab(group.category)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-colors ${
                activeTab === group.category
                  ? "bg-foreground text-background font-bold"
                  : "bg-surface-card border border-border-subtle text-text-muted hover:text-foreground"
              }`}
            >
              {categoryIcons[group.category]}
              <span>{group.category}</span>
            </button>
          ))}
        </div>

        {/* Tech Radar Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          <AnimatePresence mode="popLayout">
            {displayedSkills.map((skill, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.25, delay: idx * 0.02 }}
                whileHover={{ y: -3 }}
                key={skill.name}
                className="group p-5 bg-surface-card border border-border-subtle rounded-xl hover:border-border-strong hover:shadow-editorial transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-border-subtle/60 text-xs font-mono">
                    <span className="text-[10px] uppercase tracking-wider text-text-subtle">
                      {skill.category}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                      skill.level === "Core" 
                        ? "bg-accent/10 border-accent/25 text-accent" 
                        : "bg-surface border-border-subtle text-text-muted"
                    }`}>
                      {skill.level}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors font-display mb-2">
                    {skill.name}
                  </h3>

                  <p className="text-xs text-text-muted leading-relaxed font-mono">
                    {skill.note}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border-subtle/50 flex items-center justify-between font-mono text-[10px] text-text-subtle">
                  <span>PRODUCTION READY</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Engineering Philosophy Card */}
        <div className="mt-12 p-6 sm:p-8 bg-surface-card border border-border-subtle rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={14} className="text-accent" />
              <span className="font-mono text-xs text-accent font-bold uppercase tracking-wider">
                [ ARCHITECTURAL PHILOSOPHY ]
              </span>
            </div>
            <p className="text-sm text-text-muted max-w-2xl leading-relaxed">
              {language === "id"
                ? "Memprioritaskan Type Safety ujung ke ujung, modularitas komponen, isolasi domain logika, dan optimasi Core Web Vitals untuk pengalaman pengguna yang cepat dan stabil."
                : "Prioritizing end-to-end compile-time type safety, component modularity, domain logic isolation, and sub-second Core Web Vitals across every layer."}
            </p>
          </div>
          <div className="font-mono text-xs text-foreground font-semibold px-3 py-1.5 bg-surface border border-border-strong rounded-lg whitespace-nowrap">
            TYPESCRIPT · NEXT · ANGULAR
          </div>
        </div>

      </div>
    </section>
  )
}
