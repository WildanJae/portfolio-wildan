"use client"

import { dict } from "@/lib/data"
import { motion } from "framer-motion"
import { useLanguage } from "./LanguageContext"
import { Calendar, Briefcase } from "lucide-react"

export default function Experience() {
  const { language } = useLanguage()
  const content = dict[language]

  return (
    <section id="experience" className="py-24 sm:py-32 border-b border-border-subtle bg-background relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 mb-16 border-b border-border-subtle">
          <div>
            <span className="editorial-tag text-accent mb-2.5 block">
              {content.experience_section.section_label}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.12] font-display">
              {content.experience_section.heading}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-text-muted max-w-md">
            {content.experience_section.desc}
          </p>
        </div>

        {/* Career Timeline */}
        <div className="divide-y divide-border-subtle">
          {content.experiences.map((exp, idx) => (
            <motion.article 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: idx * 0.1 }}
              className="py-12 sm:py-16 first:pt-0 last:pb-0 grid lg:grid-cols-12 gap-8 lg:gap-14 items-start group"
            >
              {/* Left Column: Metadata & Company (4 cols) */}
              <div className="lg:col-span-4 space-y-3">
                <div className="inline-flex items-center gap-2 font-mono text-xs text-accent font-semibold px-2.5 py-1 rounded bg-accent-subtle border border-accent/20">
                  <Calendar size={13} />
                  <span>{exp.period}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight group-hover:text-accent transition-colors duration-200 font-display">
                  {exp.company}
                </h3>

                <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
                  <Briefcase size={12} className="text-text-subtle" />
                  <span className="uppercase tracking-wider">{exp.type}</span>
                </div>
              </div>

              {/* Right Column: Role & Key Deliverables (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                <div>
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight group-hover:text-accent transition-colors duration-200 font-display">
                    {exp.role}
                  </h4>
                  <p className="text-sm text-text-muted mt-2 font-medium leading-relaxed">
                    {exp.summary}
                  </p>
                </div>

                {/* Key Points */}
                <div className="bg-surface-card border border-border-subtle rounded-xl p-6 sm:p-8 space-y-4 hover:border-border-strong hover:shadow-editorial transition-all">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-text-subtle block mb-1">
                    [ KEY ENGINEERING CONTRIBUTIONS ]
                  </span>
                  
                  <ul className="space-y-3 text-sm text-text-muted">
                    {exp.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-3 leading-relaxed">
                        <span className="font-mono text-xs text-accent font-bold mt-0.5 select-none">
                          —
                        </span>
                        <span className="text-foreground/90 font-normal">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Role Tags */}
                  {exp.tags && (
                    <div className="pt-4 border-t border-border-subtle/60 flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="font-mono text-[11px] px-2 py-0.5 rounded bg-surface border border-border-subtle text-text-muted font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </motion.article>
          ))}
        </div>

      </div>
    </section>
  )
}
