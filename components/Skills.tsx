"use client"

import { dict } from "@/lib/data"
import { motion, Variants } from "framer-motion"
import { useLanguage } from "./LanguageContext"

const categoryAccents: Record<string, string> = {
  "Framework & Library": "text-blue-400 bg-blue-400/10 border-blue-500/20",
  "Bahasa": "text-purple-400 bg-purple-400/10 border-purple-500/20",
  "Language": "text-purple-400 bg-purple-400/10 border-purple-500/20",
  "Styling": "text-emerald-400 bg-emerald-400/10 border-emerald-500/20",
  "Tools": "text-amber-400 bg-amber-400/10 border-amber-500/20",
}

const categoryColors: Record<string, string> = {
  "Framework & Library": "bg-blue-400",
  "Bahasa": "bg-purple-400",
  "Language": "bg-purple-400",
  "Styling": "bg-emerald-400",
  "Tools": "bg-amber-400",
}

export default function Skills() {
  const { language } = useLanguage()
  const content = dict[language]

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <section id="skills" className="py-24 px-[5%] bg-primary-dark">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold text-accent tracking-widest uppercase mb-3 flex items-center gap-2">
            <span className="w-8 h-px bg-accent" /> {content.skills_section.title}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            {content.skills_section.heading}
          </h2>
          <p className="text-text-muted font-light mb-12 text-base max-w-lg">
            {content.skills_section.desc}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {content.skills.map((group, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 md:p-8 rounded-2xl glass-panel relative overflow-hidden group hover:bg-border-dark/50 transition-colors"
            >
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className={`w-3 h-3 rounded-full ${categoryColors[group.category] || "bg-accent"}`} />
                <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">
                  {group.category}
                </h3>
              </div>
              
              <motion.div 
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2 relative z-10"
              >
                {group.items.map(skill => (
                  <motion.span 
                    variants={item}
                    key={skill} 
                    className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-300 hover:-translate-y-1 cursor-default ${categoryAccents[group.category] || "text-accent bg-accent/10 border-accent/20"}`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
