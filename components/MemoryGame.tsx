"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  Terminal, Code, Cpu, Database, 
  Server, Smartphone, Globe, Wifi, 
  Monitor, Laptop, Cloud, Command 
} from "lucide-react"
import { dict } from "@/lib/data"
import { useLanguage } from "./LanguageContext"

const icons = [
  <Terminal key="1" size={28} />,
  <Code key="2" size={28} />,
  <Cpu key="3" size={28} />,
  <Database key="4" size={28} />,
  <Server key="5" size={28} />,
  <Smartphone key="6" size={28} />,
  <Globe key="7" size={28} />,
  <Wifi key="8" size={28} />,
  <Monitor key="9" size={28} />,
  <Laptop key="10" size={28} />,
  <Cloud key="11" size={28} />,
  <Command key="12" size={28} />
]

export default function MemoryGame() {
  const { language } = useLanguage()
  const content = dict[language].game

  const [cards, setCards] = useState<{ id: number; iconIndex: number }[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [solved, setSolved] = useState<number[]>([])
  const [disabled, setDisabled] = useState(false)
  const [moves, setMoves] = useState(0)
  const [score, setScore] = useState(0)

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const shuffledCards = [...icons.map((_, i) => i), ...icons.map((_, i) => i)]
      .sort(() => Math.random() - 0.5)
      .map((iconIndex, id) => ({ id, iconIndex }))
    
    setCards(shuffledCards)
    setFlipped([])
    setSolved([])
    setMoves(0)
    setScore(0)
    setDisabled(false)
  }

  const handleClick = (index: number) => {
    if (disabled || flipped.includes(index) || solved.includes(index)) return

    setFlipped((prev) => [...prev, index])

    if (flipped.length === 1) {
      setDisabled(true)
      setMoves((m) => m + 1)
      
      const firstIndex = flipped[0]
      const secondIndex = index

      if (cards[firstIndex].iconIndex === cards[secondIndex].iconIndex) {
        setSolved((prev) => [...prev, firstIndex, secondIndex])
        setScore((s) => s + 100)
        setFlipped([])
        setDisabled(false)
      } else {
        setScore((s) => Math.max(0, s - 10))
        setTimeout(() => {
          setFlipped([])
          setDisabled(false)
        }, 500)
      }
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2 text-foreground">{content.title}</h2>
        <p className="text-text-muted mb-4">{content.desc}</p>
        <div className="flex gap-4 items-center justify-center flex-wrap">
          <span className="glass-panel px-4 py-2 rounded-xl text-sm font-semibold">
            {content.moves}: <span className="text-accent">{moves}</span>
          </span>
          <span className="glass-panel px-4 py-2 rounded-xl text-sm font-semibold border-emerald-500/30">
            {content.score}: <span className="text-emerald-400">{score}</span>
          </span>
          <button 
            onClick={initializeGame}
            className="px-4 py-2 bg-primary-dark border border-border-dark hover:border-accent hover:text-accent transition-colors rounded-xl text-sm font-semibold"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-6 gap-3 md:gap-4 p-4 md:p-6 glass-panel rounded-3xl relative w-full">
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || solved.includes(index)
          return (
            <motion.div
              key={card.id}
              className="w-full aspect-square cursor-pointer [perspective:1000px]"
              onClick={() => handleClick(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-full h-full relative transition-transform duration-300 rounded-2xl shadow-lg [transform-style:preserve-3d]"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-primary-dark border-2 border-border-dark rounded-2xl flex items-center justify-center text-accent/50 hover:border-accent/50 transition-colors [backface-visibility:hidden]">
                  <span className="text-2xl font-bold">?</span>
                </div>

                <div 
                  className="absolute inset-0 rounded-2xl flex items-center justify-center text-white [backface-visibility:hidden]"
                  style={{ 
                    transform: "rotateY(180deg)",
                    background: solved.includes(index) ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.8)",
                    border: solved.includes(index) ? "2px solid rgba(59, 130, 246, 0.5)" : "2px solid rgba(59, 130, 246, 1)"
                  }}
                >
                  {icons[card.iconIndex]}
                </div>
              </motion.div>
            </motion.div>
          )
        })}

        {solved.length === icons.length * 2 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 z-10 glass-panel rounded-3xl flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-accent mb-2">{content.won}</h3>
            <p className="text-text-muted mb-2">{content.score}: <span className="text-emerald-400 font-bold">{score}</span></p>
            <p className="text-text-muted mb-6">{content.moves}: {moves}</p>
            <button 
              onClick={initializeGame}
              className="px-8 py-3 bg-accent text-white font-bold rounded-xl shadow-lg hover:bg-blue-600 transition-colors hover:scale-105 active:scale-95"
            >
              {content.play_again}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
