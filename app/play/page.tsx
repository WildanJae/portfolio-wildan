"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { dict } from "@/lib/data"
import { useLanguage } from "@/components/LanguageContext"
import { ArrowLeft, LayoutGrid, Hash, Bird, Heart, BrainCircuit, Grid3X3 } from "lucide-react"
import LanguageSwitcher from "@/components/LanguageSwitcher"

export default function GameHub() {
  const { language } = useLanguage()
  const content = dict[language].game

  const games = [
    {
      title: content.title,
      desc: content.desc,
      icon: <LayoutGrid size={48} className="text-emerald-400" />,
      href: "/play/memory",
      color: "from-emerald-500/20 to-emerald-500/5",
      border: "hover:border-emerald-500/50"
    },
    {
      title: content.tictactoe_title,
      desc: content.tictactoe_desc,
      icon: <Hash size={48} className="text-blue-400" />,
      href: "/play/tictactoe",
      color: "from-blue-500/20 to-blue-500/5",
      border: "hover:border-blue-500/50"
    },
    {
      title: content.fluppy_title,
      desc: content.fluppy_desc,
      icon: <Bird size={48} className="text-yellow-400" />,
      href: "/play/flappy",
      color: "from-yellow-500/20 to-yellow-500/5",
      border: "hover:border-yellow-500/50"
    },
    {
      title: content.love_title,
      desc: content.love_desc,
      icon: <Heart size={48} className="text-red-400" />,
      href: "/play/love",
      color: "from-red-500/20 to-red-500/5",
      border: "hover:border-red-500/50"
    },
    {
      title: content.cryptarithm_title,
      desc: content.cryptarithm_desc,
      icon: <BrainCircuit size={48} className="text-purple-400" />,
      href: "/play/cryptarithm",
      color: "from-purple-500/20 to-purple-500/5",
      border: "hover:border-purple-500/50"
    },
    {
      title: content.sudoku_title,
      desc: content.sudoku_desc,
      icon: <Grid3X3 size={48} className="text-indigo-400" />,
      href: "/play/sudoku",
      color: "from-indigo-500/20 to-indigo-500/5",
      border: "hover:border-indigo-500/50"
    }
  ]

  return (
    <main className="min-h-screen bg-background relative overflow-hidden py-24 px-[5%]">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-16">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-text-muted glass-panel hover:text-foreground transition-all group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            {content.back_home}
          </Link>
          <LanguageSwitcher />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">{content.hub_title}</h1>
          <p className="text-text-muted text-lg max-w-lg mx-auto">{content.hub_desc}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {games.map((game, i) => (
            <Link key={i} href={game.href}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className={`glass-panel p-8 rounded-3xl border border-border-dark ${game.border} transition-all duration-300 group h-full flex flex-col`}
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {game.icon}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">{game.title}</h3>
                <p className="text-text-muted mb-8 flex-1">{game.desc}</p>
                <div className="inline-flex items-center gap-2 font-bold text-sm text-foreground bg-primary-dark border border-border-dark px-5 py-2.5 rounded-xl group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all w-fit">
                  {content.play_now}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
