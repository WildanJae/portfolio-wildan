"use client"

import Image from "next/image"
import { dict } from "@/lib/data"
import { motion, Variants } from "framer-motion"
import { ArrowUpRight, Lock } from "lucide-react"
import { useLanguage } from "./LanguageContext"

export default function Projects() {
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
    <section id="projects" className="py-24 sm:py-32 border-b border-border-subtle bg-background relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={headerVariants}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 mb-16 sm:mb-24 border-b border-border-subtle"
        >
          <div>
            <span className="editorial-tag text-accent mb-3 block">
              {content.projects_section.section_label}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.08]">
              {content.projects_section.heading}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-text-muted max-w-md">
            {content.projects_section.desc}
          </p>
        </motion.div>

        {/* Case Studies Showcase (Alternating & Asymmetric Layouts) */}
        <div className="space-y-24 sm:space-y-36">
          {content.projects.map((project, idx) => {
            const isEven = idx % 2 === 1

            return (
              <motion.article 
                key={project.id}
                initial={{ opacity: 0, y: 55 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.12 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="group relative"
              >
                {/* Project Number & Category Eyebrow */}
                <div className="flex items-center justify-between pb-4 mb-8 border-b border-border-subtle">
                  <div className="flex items-center gap-4">
                    <motion.span 
                      whileHover={{ scale: 1.05 }}
                      className="font-mono text-3xl sm:text-4xl font-extrabold text-foreground tracking-tighter inline-block cursor-default"
                    >
                      /{project.id}
                    </motion.span>
                    <span className="editorial-tag text-text-muted">
                      {project.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
                    <span>{project.year}</span>
                    <span>·</span>
                    <span className="text-foreground font-medium">{project.highlight}</span>
                  </div>
                </div>

                {/* Asymmetric Content & Visual Layout */}
                <div className={`grid lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                  isEven ? "lg:flex-row-reverse" : ""
                }`}>
                  
                  {/* Media / Showcase Box (7 cols) */}
                  <motion.div 
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    className={`lg:col-span-7 ${isEven ? "lg:order-2" : "lg:order-1"}`}
                  >
                    <div className="project-image-container rounded-lg border border-border-subtle bg-surface p-2 sm:p-3 shadow-editorial transition-all duration-300 group-hover:border-foreground/40 group-hover:shadow-editorial-hover">
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded bg-stone-200">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 750px"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Overlay Tag */}
                        <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm border border-border-subtle px-3 py-1 font-mono text-[11px] font-semibold text-foreground uppercase tracking-wider rounded shadow-sm">
                          {project.highlight}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Editorial Text & Story (5 cols) */}
                  <div className={`lg:col-span-5 space-y-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    <div>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight leading-snug mb-2 group-hover:text-accent transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="font-mono text-xs text-accent uppercase tracking-wider font-semibold">
                        {project.subtitle}
                      </p>
                    </div>

                    <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                      {project.desc}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="pt-2">
                      <span className="block font-mono text-[11px] uppercase tracking-wider text-text-muted mb-2.5">
                        {content.projects_section.tech_stack}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <motion.span 
                            key={tag}
                            whileHover={{ y: -2, scale: 1.03 }}
                            className="font-mono text-xs px-2.5 py-1 rounded bg-surface border border-border-subtle text-foreground font-medium hover:border-accent/40 hover:bg-surface-card transition-colors cursor-default"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Action Link / Status */}
                    <div className="pt-4">
                      {project.link ? (
                        <motion.a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background text-xs font-bold uppercase tracking-wider rounded hover:bg-accent transition-colors duration-200 shadow-sm group/btn"
                        >
                          <span>{content.projects_section.view_demo}</span>
                          <ArrowUpRight size={15} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </motion.a>
                      ) : (
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface border border-border-subtle text-text-muted font-mono text-xs uppercase tracking-wider rounded">
                          <Lock size={13} className="text-text-muted" />
                          <span>{content.projects_section.internal_project}</span>
                        </div>
                      )}
                    </div>

                  </div>

                </div>
              </motion.article>
            )
          })}
        </div>

      </div>
    </section>
  )
}
