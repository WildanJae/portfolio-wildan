"use client"

import Link from "next/link"
import MemoryGame from "@/components/MemoryGame"
import { dict } from "@/lib/data"
import { useLanguage } from "@/components/LanguageContext"
import { ArrowLeft } from "lucide-react"
import LanguageSwitcher from "@/components/LanguageSwitcher"

export default function PlayMemoryPage() {
  const { language } = useLanguage()
  const content = dict[language].game

  return (
    <main className="min-h-screen bg-background relative overflow-hidden py-24 px-[5%]">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-12">
          <Link 
            href="/play" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-text-muted glass-panel hover:text-foreground transition-all group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            {content.back}
          </Link>
          <LanguageSwitcher />
        </div>

        <MemoryGame />
      </div>
    </main>
  )
}
