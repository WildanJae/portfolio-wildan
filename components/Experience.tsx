"use client"

import { dict } from "@/lib/data"
import { motion } from "framer-motion"
import { useLanguage } from "./LanguageContext"

export default function Experience() {
  const { language } = useLanguage()
  const content = dict[language]

  return (
    <section className="py-24 px-[5%] bg-background relative border-t border-border-dark">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs font-bold text-accent tracking-widest uppercase mb-3 flex items-center gap-2">
            <span className="w-8 h-px bg-accent" /> {content.experience_section.title}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
            {content.experience_section.heading}
          </h2>
        </motion.div>

        <div className="relative border-l border-border-dark ml-4 md:ml-0 md:pl-8 space-y-12">
          {content.experiences.map((exp, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="relative pl-8 md:pl-0"
            >
              <div className="absolute -left-[41px] md:-left-[41px] top-1 w-5 h-5 rounded-full border-4 border-background bg-accent" />
              
              <div className="glass-panel p-8 rounded-2xl hover:border-accent/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-all duration-300">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">{exp.role}</h3>
                    <p className="text-accent font-medium">{exp.company}</p>
                  </div>
                  <span className="text-sm text-text-muted bg-primary-dark border border-border-dark px-4 py-1.5 rounded-full whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>
                
                <ul className="space-y-3">
                  {exp.points.map((point, j) => (
                    <li key={j} className="flex gap-3 items-start text-text-muted font-light leading-relaxed">
                      <span className="text-accent mt-1.5 text-[10px] flex-shrink-0">✦</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
