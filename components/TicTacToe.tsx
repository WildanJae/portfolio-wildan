"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { dict } from "@/lib/data"
import { useLanguage } from "./LanguageContext"

type Player = "X" | "O" | null

export default function TicTacToeGame() {
  const { language } = useLanguage()
  const content = dict[language].game

  const [board, setBoard] = useState<Player[]>(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState<boolean>(true)
  const [winner, setWinner] = useState<Player | "Draw" | null>(null)

  const checkWinner = (squares: Player[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    if (!squares.includes(null)) return "Draw"
    return null
  }

  const findWinningMove = (squares: Player[], player: Player) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ]
    for(let i=0; i<lines.length; i++) {
      const [a,b,c] = lines[i]
      if (squares[a] === player && squares[b] === player && squares[c] === null) return c;
      if (squares[a] === player && squares[c] === player && squares[b] === null) return b;
      if (squares[b] === player && squares[c] === player && squares[a] === null) return a;
    }
    return null;
  }

  useEffect(() => {
    if (!isXNext && !winner) {
      const timer = setTimeout(() => {
        const available = board.map((val, idx) => val === null ? idx : null).filter((val): val is number => val !== null)
        if (available.length === 0) return

        let move = findWinningMove(board, "O")
        if (move === null) move = findWinningMove(board, "X")
        if (move === null && available.includes(4)) move = 4
        if (move === null) move = available[Math.floor(Math.random() * available.length)]

        handleClick(move, true)
      }, 600)

      return () => clearTimeout(timer)
    }
  }, [isXNext, winner, board])

  const handleClick = (index: number, isBot: boolean = false) => {
    if (board[index] || winner) return
    if (!isXNext && !isBot) return

    const newBoard = [...board]
    newBoard[index] = isXNext ? "X" : "O"
    setBoard(newBoard)
    
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else {
      setIsXNext(!isXNext)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setWinner(null)
  }

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2 text-foreground">{content.tictactoe_title} (Vs AI)</h2>
        <p className="text-text-muted mb-6">Anda bermain sebagai X melawan Bot (O).</p>
        
        <div className="flex gap-4 items-center justify-center">
          {!winner ? (
            <div className="inline-flex items-center gap-3 glass-panel px-6 py-3 rounded-2xl">
              <span className="text-sm font-semibold text-text-muted">{content.turn}:</span>
              <span className={`text-xl font-bold ${isXNext ? "text-blue-400" : "text-emerald-400"}`}>
                {isXNext ? "X (Anda)" : "O (Bot)"}
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-3 glass-panel px-6 py-3 rounded-2xl border-accent/50 bg-accent/5">
              <span className="text-sm font-bold text-accent">
                {winner === "Draw" ? content.draw : winner === "X" ? "Anda Menang! 🎉" : "Bot Menang! 🤖"}
              </span>
            </div>
          )}
          
          <button 
            onClick={resetGame}
            className="px-6 py-3 bg-primary-dark border border-border-dark hover:border-accent hover:text-accent transition-colors rounded-2xl text-sm font-semibold"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 p-4 md:p-6 glass-panel rounded-3xl w-full max-w-sm mx-auto relative">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            disabled={!isXNext || !!cell || !!winner}
            className="w-full aspect-square bg-primary-dark border-2 border-border-dark rounded-2xl flex items-center justify-center text-5xl md:text-6xl font-bold hover:border-accent/30 transition-colors focus:outline-none focus:border-accent disabled:opacity-100 disabled:cursor-default overflow-hidden"
          >
            {cell && (
              <span className={cell === "X" ? "text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" : "text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]"}>
                {cell}
              </span>
            )}
          </button>
        ))}

        {winner && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-10 rounded-3xl flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm"
          >
            <button 
              onClick={resetGame}
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
