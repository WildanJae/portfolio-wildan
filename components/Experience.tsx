"use client"

import { dict } from "@/lib/data"
import { motion, Variants } from "framer-motion"
import { useLanguage } from "./LanguageContext"
import { Calendar } from "lucide-react"

export default function Experience() {
  const { language } = useLanguage()
  const content = dict[language]

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section id="experience" className="py-24 sm:py-32 border-b border-border-subtle bg-background relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={headerVariants}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 mb-16 sm:mb-20 border-b border-border-subtle"
        >
          <div>
            <span className="editorial-tag text-accent mb-3 block">
              {content.experience_section.section_label}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.08]">
              {content.experience_section.heading}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-text-muted max-w-md">
            {content.experience_section.desc}
          </p>
        </motion.div>

        {/* Editorial Career Timeline (Swiss 2-column layout) */}
        <div className="divide-y divide-border-subtle">
          {content.experiences.map((exp, idx) => (
            <motion.article 
              key={idx}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.75, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="py-12 sm:py-16 first:pt-0 last:pb-0 grid lg:grid-cols-12 gap-8 lg:gap-14 items-start group"
            >
              {/* Left Column: Timeline Metadata & Company (4 cols) */}
              <div className="lg:col-span-4 space-y-3">
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  className="inline-flex items-center gap-2 font-mono text-xs text-accent font-semibold px-2.5 py-1 rounded bg-accent-subtle border border-accent/20 cursor-default"
                >
                  <Calendar size={13} />
                  <span>{exp.period}</span>
                </motion.div>

                <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight group-hover:text-accent transition-colors duration-300">
                  {exp.company}
                </h3>

                <div className="font-mono text-xs text-text-muted uppercase tracking-wider">
                  {exp.type}
                </div>
              </div>

              {/* Right Column: Role & Key Impact Points (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                <div>
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight group-hover:text-accent transition-colors duration-300">
                    {exp.role}
                  </h4>
                  <p className="text-sm text-text-muted mt-2 font-medium">
                    {exp.summary}
                  </p>
                </div>

                {/* Key Points */}
                <motion.div 
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="bg-surface/60 border border-border-subtle rounded-lg p-6 sm:p-8 space-y-3.5 hover:border-foreground/30 hover:shadow-editorial transition-all duration-300"
                >
                  <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted block mb-2">
                    [ KEY CONTRIBUTIONS & IMPACT ]
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
                </motion.div>
              </div>

            </motion.article>
          ))}
        </div>

      </div>
    </section>
  )
}
