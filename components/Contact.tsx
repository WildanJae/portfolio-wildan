"use client"

import { dict } from "@/lib/data"
import { motion } from "framer-motion"
import { MessageCircle, Mail, MapPin, ArrowRight } from "lucide-react"
import { useLanguage } from "./LanguageContext"

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
)

export default function Contact() {
  const { language } = useLanguage()
  const content = dict[language]

  return (
    <section id="contact" className="py-32 px-[5%] bg-background relative border-t border-border-dark overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-bold text-accent tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="w-8 h-px bg-accent" /> {content.contact_section.title}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight leading-tight">
              {content.contact_section.heading} <br />
              <span className="text-text-muted">{content.contact_section.heading2}</span>
            </h2>
            <p className="text-text-muted font-light leading-relaxed mb-12 max-w-md text-lg">
              {content.contact_section.desc}
            </p>

            <a href={`https://wa.me/${content.profile.whatsapp}`} target="_blank" rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-accent text-white text-base font-bold rounded-xl overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
              <MessageCircle size={20} className="relative z-10" />
              <span className="relative z-10">{content.contact_section.chat}</span>
              <ArrowRight size={18} className="relative z-10 transition-all group-hover:translate-x-1" />
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel p-8 md:p-10 rounded-3xl"
          >
            <div className="flex flex-col gap-8">
              {[
                { icon: <MessageCircle className="text-emerald-400" size={24} />, label: "WhatsApp", value: `+${content.profile.whatsapp.slice(0,2)} ${content.profile.whatsapp.slice(2,5)}-${content.profile.whatsapp.slice(5,9)}-${content.profile.whatsapp.slice(9)}`, href: `https://wa.me/${content.profile.whatsapp}` },
                { icon: <Mail className="text-amber-400" size={24} />, label: "Email", value: content.profile.email, href: `mailto:${content.profile.email}` },
                { icon: <div className="text-blue-400"><LinkedinIcon /></div>, label: "LinkedIn", value: "wildan-j", href: content.profile.linkedin },
                { icon: <MapPin className="text-purple-400" size={24} />, label: language === 'id' ? "Lokasi" : "Location", value: content.profile.location, href: "" },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-full bg-primary-dark border border-border-dark flex items-center justify-center group-hover:scale-110 group-hover:border-accent/30 transition-all">
                    {c.icon}
                  </div>
                  <div>
                    <span className="block text-xs text-text-muted uppercase tracking-wider font-semibold mb-1">{c.label}</span>
                    {c.href ? (
                      <a href={c.href} target="_blank" rel="noopener noreferrer"
                        className="text-base text-foreground hover:text-accent transition-colors font-medium">
                        {c.value}
                      </a>
                    ) : (
                      <span className="text-base text-foreground font-medium">{c.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
