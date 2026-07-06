"use client"

import Link from "next/link"
import Sudoku from "@/components/Sudoku"
import { dict } from "@/lib/data"
import { useLanguage } from "@/components/LanguageContext"
import { ArrowLeft } from "lucide-react"
import LanguageSwitcher from "@/components/LanguageSwitcher"

export default function PlaySudokuPage() {
  const { language } = useLanguage()
  const content = dict[language].game

  return (
    <main className="min-h-screen bg-background relative overflow-hidden py-24 px-[5%] flex flex-col">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[95%] mx-auto relative z-10 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <Link 
            href="/play" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-text-muted glass-panel hover:text-foreground transition-all group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            {content.back}
          </Link>
          <LanguageSwitcher />
        </div>

        <div className="flex-1 w-full flex items-center justify-center">
          <Sudoku />
        </div>
      </div>
    </main>
  )
}
