"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { dict } from "@/lib/data"
import { useLanguage } from "@/components/LanguageContext"
import { ArrowLeft, LayoutGrid, Hash, Bird, Heart, BrainCircuit, Grid3X3, ArrowUpRight } from "lucide-react"
import LanguageSwitcher from "@/components/LanguageSwitcher"

export default function GameHub() {
  const { language } = useLanguage()
  const content = dict[language].game

  const games = [
    {
      id: "01",
      title: content.title,
      desc: content.desc,
      icon: <LayoutGrid size={28} className="text-accent" />,
      href: "/play/memory",
      tag: "Memory & Logic",
    },
    {
      id: "02",
      title: content.tictactoe_title,
      desc: content.tictactoe_desc,
      icon: <Hash size={28} className="text-accent" />,
      href: "/play/tictactoe",
      tag: "Strategy",
    },
    {
      id: "03",
      title: content.fluppy_title,
      desc: content.fluppy_desc,
      icon: <Bird size={28} className="text-accent" />,
      href: "/play/flappy",
      tag: "Arcade & Timing",
    },
    {
      id: "04",
      title: content.love_title,
      desc: content.love_desc,
      icon: <Heart size={28} className="text-accent" />,
      href: "/play/love",
      tag: "Particle Canvas",
    },
    {
      id: "05",
      title: content.cryptarithm_title,
      desc: content.cryptarithm_desc,
      icon: <BrainCircuit size={28} className="text-accent" />,
      href: "/play/cryptarithm",
      tag: "Math Puzzle",
    },
    {
      id: "06",
      title: content.sudoku_title,
      desc: content.sudoku_desc,
      icon: <Grid3X3 size={28} className="text-accent" />,
      href: "/play/sudoku",
      tag: "Grid Logic",
    },
  ]

  return (
    <main className="min-h-screen bg-background py-16 sm:py-24 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top bar navigation */}
        <div className="flex justify-between items-center pb-8 mb-12 border-b border-border-subtle">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded border border-border-subtle bg-surface text-xs font-mono font-semibold text-foreground hover:bg-surface-card hover:border-foreground transition-all group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>{content.back_home}</span>
          </Link>
          <LanguageSwitcher />
        </div>

        {/* Editorial Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mb-16"
        >
          <span className="editorial-tag text-accent mb-3 block">
            [ LAB & EXPERIMENTS ]
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.05] mb-4">
            {content.hub_title}
          </h1>
          <p className="text-base sm:text-lg text-text-muted leading-relaxed">
            {content.hub_desc}
          </p>
        </motion.div>

        {/* Games Matrix */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, i) => (
            <Link key={i} href={game.href} className="group">
              <motion.article 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="p-6 sm:p-8 bg-surface-card border border-border-subtle rounded-lg hover:border-foreground hover:shadow-editorial transition-all duration-300 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-border-subtle">
                    <span className="font-mono text-xs font-bold text-accent">/{game.id}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted bg-surface px-2 py-0.5 rounded border border-border-subtle">
                      {game.tag}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded border border-border-subtle bg-surface flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    {game.icon}
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {game.title}
                  </h2>
                  <p className="text-sm text-text-muted leading-relaxed mb-6">
                    {game.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-border-subtle flex items-center justify-between font-mono text-xs font-bold text-foreground group-hover:text-accent">
                  <span>{content.play_now}</span>
                  <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.article>
            </Link>
          ))}
        </div>

      </div>
    </main>
  )
}
