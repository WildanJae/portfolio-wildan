"use client"

import { useEffect, useState, useMemo, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { dict } from "@/lib/data"
import { useLanguage } from "./LanguageContext"
import { useToast } from "./ToastContext"
import { 
  Search, 
  ArrowUpRight, 
  Copy, 
  Languages, 
  ArrowUp, 
  Briefcase, 
  User, 
  Code2, 
  Clock, 
  Mail, 
  MessageSquare,
  CornerDownLeft,
  X
} from "lucide-react"

interface CommandItem {
  id: string
  title: string
  category: string
  icon: React.ReactNode
  action: () => void
  shortcut?: string
}

export default function CommandMenu({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}) {
  const { language, setLanguage } = useLanguage()
  const { showToast } = useToast()
  const content = dict[language]
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // Global keyboard shortcut: Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setIsOpen(!isOpen)
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, setIsOpen])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("")
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  const copyEmail = () => {
    navigator.clipboard.writeText(content.profile.email)
    showToast(language === "id" ? "Email berhasil disalin: jwildan22904@gmail.com" : "Email copied: jwildan22904@gmail.com")
    setIsOpen(false)
  }

  const scrollTo = (id: string) => {
    setIsOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  const items: CommandItem[] = useMemo(() => {
    return [
      // Navigation
      {
        id: "nav-about",
        title: content.nav.about,
        category: content.command_menu.nav_group,
        icon: <User size={15} className="text-accent" />,
        action: () => scrollTo("about"),
      },
      {
        id: "nav-projects",
        title: content.nav.projects,
        category: content.command_menu.nav_group,
        icon: <Briefcase size={15} className="text-accent" />,
        action: () => scrollTo("projects"),
      },
      {
        id: "nav-skills",
        title: content.nav.skills,
        category: content.command_menu.nav_group,
        icon: <Code2 size={15} className="text-accent" />,
        action: () => scrollTo("skills"),
      },
      {
        id: "nav-experience",
        title: content.nav.experience,
        category: content.command_menu.nav_group,
        icon: <Clock size={15} className="text-accent" />,
        action: () => scrollTo("experience"),
      },
      {
        id: "nav-contact",
        title: content.nav.contact,
        category: content.command_menu.nav_group,
        icon: <Mail size={15} className="text-accent" />,
        action: () => scrollTo("contact"),
      },

      // Actions
      {
        id: "action-copy-email",
        title: content.command_menu.copy_email,
        category: content.command_menu.action_group,
        icon: <Copy size={15} className="text-emerald-400" />,
        action: copyEmail,
      },
      {
        id: "action-switch-lang",
        title: content.command_menu.switch_lang,
        category: content.command_menu.action_group,
        icon: <Languages size={15} className="text-accent" />,
        action: () => {
          setLanguage(language === "id" ? "en" : "id")
          showToast(language === "id" ? "Language switched to English" : "Bahasa diubah ke Indonesia")
          setIsOpen(false)
        },
      },
      {
        id: "action-scroll-top",
        title: content.command_menu.back_to_top,
        category: content.command_menu.action_group,
        icon: <ArrowUp size={15} className="text-text-muted" />,
        action: () => {
          window.scrollTo({ top: 0, behavior: "smooth" })
          setIsOpen(false)
        },
      },

      // Socials
      {
        id: "social-whatsapp",
        title: content.command_menu.open_whatsapp,
        category: content.command_menu.social_group,
        icon: <MessageSquare size={15} className="text-emerald-400" />,
        action: () => {
          window.open(`https://wa.me/${content.profile.whatsapp}`, "_blank")
          setIsOpen(false)
        },
      },
      {
        id: "social-linkedin",
        title: content.command_menu.open_linkedin,
        category: content.command_menu.social_group,
        icon: <ArrowUpRight size={15} className="text-blue-400" />,
        action: () => {
          window.open(content.profile.linkedin, "_blank")
          setIsOpen(false)
        },
      },
    ]
  }, [content, language, setLanguage, showToast])

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items
    const q = query.toLowerCase()
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    )
  }, [items, query])

  // Keyboard navigation within the list
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length))
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault()
      filteredItems[selectedIndex].action()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99] flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-surface border border-border-strong rounded-xl shadow-editorial overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border-subtle bg-surface-card">
              <Search size={18} className="text-text-muted flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setSelectedIndex(0)
                }}
                onKeyDown={handleInputKeyDown}
                placeholder={content.command_menu.search_placeholder}
                className="w-full bg-transparent text-sm text-foreground placeholder-text-subtle focus:outline-none font-mono"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-text-subtle hover:text-foreground hover:bg-surface"
                aria-label="Close command palette"
              >
                <X size={16} />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filteredItems.length === 0 ? (
                <div className="py-8 text-center text-xs font-mono text-text-muted">
                  {content.command_menu.empty}
                </div>
              ) : (
                filteredItems.map((item, index) => {
                  const isSelected = index === selectedIndex
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors duration-150 ${
                        isSelected
                          ? "bg-surface-hover text-foreground border border-border-subtle"
                          : "text-text-muted hover:text-foreground border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded flex items-center justify-center bg-surface border border-border-subtle">
                          {item.icon}
                        </div>
                        <span className="text-xs font-mono font-medium">
                          {item.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-text-subtle uppercase">
                          {item.category}
                        </span>
                        {isSelected && (
                          <CornerDownLeft size={12} className="text-accent" />
                        )}
                      </div>
                    </button>
                  )
                })
              )}
            </div>

            {/* Footer hints */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-border-subtle bg-surface text-[11px] font-mono text-text-subtle">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-surface-card border border-border-subtle text-[10px]">↑</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-surface-card border border-border-subtle text-[10px]">↓</kbd>
                  <span>navigasi</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-surface-card border border-border-subtle text-[10px]">↵</kbd>
                  <span>pilih</span>
                </span>
              </div>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-surface-card border border-border-subtle text-[10px]">ESC</kbd>
                <span>tutup</span>
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
