"use client"

import Image from "next/image"
import { dict } from "@/lib/data"
import { motion, Variants } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { useLanguage } from "./LanguageContext"

export default function Projects() {
  const { language } = useLanguage()
  const content = dict[language]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <section id="projects" className="py-24 px-[5%] bg-primary-dark border-t border-border-dark relative">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold text-accent tracking-widest uppercase mb-3 flex items-center gap-2">
            <span className="w-8 h-px bg-accent" /> {content.projects_section.title}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">
            {content.projects_section.heading}
          </h2>
          <p className="text-text-muted mb-16 text-base max-w-lg">
            {content.projects_section.desc}
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {content.projects.map((project, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              className="group rounded-2xl overflow-hidden bg-background border border-border-dark flex flex-col transition-all duration-300 hover:-translate-y-2 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] relative"
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90" />
              </div>
              
              <div className="p-6 flex flex-col flex-1 relative z-10 -mt-8">
                <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed mb-6 flex-1">
                  {project.desc}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full text-accent bg-accent/10 border border-accent/20">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="mt-auto">
                  {project.link ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors group/link">
                      {content.projects_section.demo} 
                      <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-sm text-text-muted">
                      <span className="w-2 h-2 rounded-full bg-border-dark" /> {content.projects_section.internal}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
