"use client"

import { useState } from "react"
import { dict } from "@/lib/data"
import { motion, Variants } from "framer-motion"
import { useLanguage } from "./LanguageContext"
import { ArrowUpRight, Check, Copy, Mail, MapPin, MessageSquare } from "lucide-react"

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

export default function Contact() {
  const { language } = useLanguage()
  const content = dict[language]
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(content.profile.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <section id="contact" className="py-24 sm:py-36 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Editorial Contact Banner Box */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="bg-surface-card border border-border-strong rounded-2xl p-8 sm:p-12 lg:p-16 shadow-editorial relative overflow-hidden hover:shadow-editorial-hover transition-shadow duration-500"
        >
          
          {/* Subtle Corner Status */}
          <div className="flex items-center justify-between pb-8 mb-10 border-b border-border-subtle">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
              </span>
              <span className="editorial-tag text-foreground font-bold">
                {content.contact_section.availability}
              </span>
            </div>
            <span className="editorial-tag text-text-muted hidden sm:inline-block">
              {content.contact_section.section_label}
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Big Bold Statement (7 cols) */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-7 space-y-6"
            >
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[0.98]">
                <span>{content.contact_section.heading_1}</span>
                <br />
                <span className="text-accent underline decoration-border-strong underline-offset-8">
                  {content.contact_section.heading_2}
                </span>
              </h2>

              <p className="text-base sm:text-lg text-text-muted max-w-xl leading-relaxed pt-2">
                {content.contact_section.desc}
              </p>

              {/* Direct Primary Action */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <motion.a
                  href={`https://wa.me/${content.profile.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-foreground text-background text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-accent transition-colors duration-200 shadow-editorial group"
                >
                  <MessageSquare size={18} className="text-emerald-400 group-hover:text-white transition-colors" />
                  <span>{content.contact_section.chat_whatsapp}</span>
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </motion.a>

                <motion.button
                  onClick={copyEmail}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-5 py-4 border border-border-strong bg-surface text-foreground text-xs sm:text-sm font-mono font-semibold rounded-lg hover:bg-surface-card hover:border-foreground transition-all duration-200"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <Check size={16} className="text-emerald-600" />
                      <span className="text-emerald-600">{language === "id" ? "Email Tersalin!" : "Email Copied!"}</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} className="text-text-muted" />
                      <span>{content.profile.email}</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Right Column: Information & Social Links Matrix (5 cols) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 space-y-4"
            >
              <div className="bg-surface border border-border-subtle rounded-xl p-6 sm:p-8 space-y-6">
                <h4 className="font-mono text-xs uppercase tracking-wider text-text-muted">
                  [ DIRECT CHANNELS ]
                </h4>

                <div className="space-y-4">
                  {/* WhatsApp */}
                  <motion.a
                    href={`https://wa.me/${content.profile.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center justify-between p-3.5 bg-surface-card border border-border-subtle rounded-lg hover:border-foreground transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                        <MessageSquare size={16} />
                      </div>
                      <div>
                        <p className="text-xs text-text-muted font-mono uppercase">WhatsApp</p>
                        <p className="text-sm font-bold text-foreground">+62 895-4134-66226</p>
                      </div>
                    </div>
                    <ArrowUpRight size={16} className="text-text-muted group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </motion.a>

                  {/* Email */}
                  <motion.a
                    href={`mailto:${content.profile.email}`}
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center justify-between p-3.5 bg-surface-card border border-border-subtle rounded-lg hover:border-foreground transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-accent-subtle text-accent flex items-center justify-center">
                        <Mail size={16} />
                      </div>
                      <div>
                        <p className="text-xs text-text-muted font-mono uppercase">Email</p>
                        <p className="text-sm font-bold text-foreground">{content.profile.email}</p>
                      </div>
                    </div>
                    <ArrowUpRight size={16} className="text-text-muted group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </motion.a>

                  {/* LinkedIn */}
                  <motion.a
                    href={content.profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center justify-between p-3.5 bg-surface-card border border-border-subtle rounded-lg hover:border-foreground transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-blue-500/10 text-blue-600 flex items-center justify-center">
                        <LinkedinIcon />
                      </div>
                      <div>
                        <p className="text-xs text-text-muted font-mono uppercase">LinkedIn</p>
                        <p className="text-sm font-bold text-foreground">wildan-j</p>
                      </div>
                    </div>
                    <ArrowUpRight size={16} className="text-text-muted group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </motion.a>
                </div>

                {/* Location Footer in box */}
                <div className="pt-4 border-t border-border-subtle flex items-start gap-2.5 text-xs text-text-muted font-mono">
                  <MapPin size={15} className="text-accent flex-shrink-0 mt-0.5" />
                  <span>{content.contact_section.location_text}</span>
                </div>
              </div>
            </motion.div>

          </div>

        </motion.div>

      </div>
    </section>
  )
}
