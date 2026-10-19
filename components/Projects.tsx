"use client"

import { useState } from "react"
import Image from "next/image"
import { dict, ProjectItem } from "@/lib/data"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Lock, Code2, Layers, CheckCircle2, X } from "lucide-react"
import { useLanguage } from "./LanguageContext"

export default function Projects() {
  const { language } = useLanguage()
  const content = dict[language]
  const [filter, setFilter] = useState<"All" | "Enterprise" | "Commercial">("All")
  const [activeArchModal, setActiveArchModal] = useState<ProjectItem | null>(null)

  const filteredProjects = content.projects.filter((p) => {
    if (filter === "All") return true
    if (filter === "Enterprise") return p.category === "Enterprise"
    if (filter === "Commercial") return p.category === "Commercial" || p.category === "Showcase"
    return true
  })

  return (
    <section id="projects" className="py-24 sm:py-32 border-b border-border-subtle bg-background relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 mb-12 border-b border-border-subtle">
          <div>
            <span className="editorial-tag text-accent mb-2.5 block">
              {content.projects_section.section_label}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.12] font-display">
              {content.projects_section.heading}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-text-muted max-w-md">
            {content.projects_section.desc}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 pb-6 mb-12 border-b border-border-subtle font-mono text-xs">
          <button
            onClick={() => setFilter("All")}
            className={`px-3.5 py-1.5 rounded-lg transition-colors ${
              filter === "All"
                ? "bg-foreground text-background font-bold"
                : "bg-surface-card border border-border-subtle text-text-muted hover:text-foreground"
            }`}
          >
            {content.projects_section.all_filter} ({content.projects.length})
          </button>
          <button
            onClick={() => setFilter("Enterprise")}
            className={`px-3.5 py-1.5 rounded-lg transition-colors ${
              filter === "Enterprise"
                ? "bg-foreground text-background font-bold"
                : "bg-surface-card border border-border-subtle text-text-muted hover:text-foreground"
            }`}
          >
            {content.projects_section.enterprise_filter}
          </button>
          <button
            onClick={() => setFilter("Commercial")}
            className={`px-3.5 py-1.5 rounded-lg transition-colors ${
              filter === "Commercial"
                ? "bg-foreground text-background font-bold"
                : "bg-surface-card border border-border-subtle text-text-muted hover:text-foreground"
            }`}
          >
            {content.projects_section.commercial_filter}
          </button>
        </div>

        {/* Case Studies Showcase */}
        <div className="space-y-20 sm:space-y-28">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const isEven = idx % 2 === 1

              return (
                <motion.article 
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative"
                >
                  {/* Eyebrow & Year */}
                  <div className="flex items-center justify-between pb-3.5 mb-8 border-b border-border-subtle font-mono">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tighter">
                        /{project.id}
                      </span>
                      <span className="text-xs uppercase text-text-muted px-2 py-0.5 rounded border border-border-subtle bg-surface-card">
                        {project.categoryLabel}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-subtle">
                      <span>{project.year}</span>
                      <span>·</span>
                      <span className="text-foreground font-semibold">{project.highlight}</span>
                    </div>
                  </div>

                  {/* Asymmetric Content & Visual Layout */}
                  <div className={`grid lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                    isEven ? "lg:flex-row-reverse" : ""
                  }`}>
                    
                    {/* Media / Showcase Box (7 cols) */}
                    <div className={`lg:col-span-7 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                      <div className="project-image-container rounded-xl border border-border-subtle bg-surface-card p-2 sm:p-3 shadow-editorial transition-all duration-300 group-hover:border-border-strong group-hover:shadow-editorial-hover">
                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-surface">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 750px"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          {/* Overlay Tag */}
                          <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur-md border border-border-subtle px-3 py-1 font-mono text-[11px] font-semibold text-foreground uppercase tracking-wider rounded-md">
                            {project.highlight}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Story & Technical Specs (5 cols) */}
                    <div className={`lg:col-span-5 space-y-5 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight leading-snug mb-2 group-hover:text-accent transition-colors duration-200 font-display">
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
                        <span className="block font-mono text-[11px] uppercase tracking-wider text-text-subtle mb-2">
                          {content.projects_section.tech_stack}
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span 
                              key={tag}
                              className="font-mono text-xs px-2.5 py-1 rounded bg-surface-card border border-border-subtle text-foreground font-medium hover:border-accent/40 transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="pt-3 flex flex-wrap items-center gap-3">
                        {project.link ? (
                          <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-foreground text-background text-xs font-mono font-bold uppercase tracking-wider rounded-lg hover:bg-accent hover:text-white transition-all duration-200 shadow-sm"
                          >
                            <span>{content.projects_section.view_demo}</span>
                            <ArrowUpRight size={14} />
                          </motion.a>
                        ) : (
                          <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-surface-card border border-border-subtle text-text-subtle font-mono text-xs uppercase tracking-wider rounded-lg">
                            <Lock size={12} className="text-text-subtle" />
                            <span>{content.projects_section.internal_project}</span>
                          </div>
                        )}

                        {/* If project has architecture details, allow inspecting them */}
                        {project.architectureDetails && (
                          <motion.button
                            onClick={() => setActiveArchModal(project)}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-surface-card border border-border-strong text-foreground text-xs font-mono font-semibold rounded-lg hover:border-accent hover:text-accent transition-all duration-200"
                          >
                            <Code2 size={14} className="text-accent" />
                            <span>{content.projects_section.view_architecture}</span>
                          </motion.button>
                        )}
                      </div>

                    </div>

                  </div>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </div>

      </div>

      {/* Architecture Case Study Modal */}
      <AnimatePresence>
        {activeArchModal && activeArchModal.architectureDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveArchModal(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-surface border border-border-strong rounded-xl shadow-editorial p-6 sm:p-8 max-h-[85vh] overflow-y-auto z-10 space-y-6"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between pb-4 border-b border-border-subtle">
                <div>
                  <span className="editorial-tag text-accent mb-1 block">
                    [ ARCHITECTURAL SPECIFICATION ]
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground font-display">
                    {activeArchModal.title}
                  </h3>
                  <p className="text-xs font-mono text-text-muted mt-1">
                    {activeArchModal.subtitle}
                  </p>
                </div>
                <button
                  onClick={() => setActiveArchModal(null)}
                  className="p-1.5 rounded-lg border border-border-subtle bg-surface-card text-text-subtle hover:text-foreground"
                  aria-label="Close modal"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Overview */}
              <div>
                <h4 className="text-xs font-mono uppercase text-text-subtle mb-2">Overview</h4>
                <p className="text-sm text-text-muted leading-relaxed">
                  {activeArchModal.architectureDetails.overview}
                </p>
              </div>

              {/* Key Decisions */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase text-text-subtle">Key Technical Decisions</h4>
                <div className="space-y-3">
                  {activeArchModal.architectureDetails.keyDecisions.map((dec, i) => (
                    <div key={i} className="p-4 rounded-lg bg-surface-card border border-border-subtle">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Layers size={14} className="text-accent" />
                        <h5 className="text-sm font-bold text-foreground font-display">{dec.title}</h5>
                      </div>
                      <p className="text-xs text-text-muted leading-relaxed">{dec.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Metrics */}
              <div>
                <h4 className="text-xs font-mono uppercase text-text-subtle mb-2">Impact & Metrics</h4>
                <div className="grid sm:grid-cols-3 gap-3">
                  {activeArchModal.architectureDetails.metrics.map((metric, i) => (
                    <div key={i} className="p-3 rounded-lg bg-surface-card border border-border-subtle flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs font-mono text-foreground font-medium">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Close footer */}
              <div className="pt-4 border-t border-border-subtle flex justify-end">
                <button
                  onClick={() => setActiveArchModal(null)}
                  className="px-5 py-2.5 rounded-lg bg-foreground text-background text-xs font-mono font-bold uppercase hover:bg-accent hover:text-white transition-colors"
                >
                  {content.projects_section.close_modal}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
