"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { dict } from "@/lib/data"
import { useLanguage } from "./LanguageContext"
import { Info, X, Eraser, HeartCrack } from "lucide-react"

// 0 represents empty cells
const LEVELS = [
  {
    // Easy
    board: [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ]
  },
  {
    // Medium
    board: [
      [0, 0, 0, 2, 6, 0, 7, 0, 1],
      [6, 8, 0, 0, 7, 0, 0, 9, 0],
      [1, 9, 0, 0, 0, 4, 5, 0, 0],
      [8, 2, 0, 1, 0, 0, 0, 4, 0],
      [0, 0, 4, 6, 0, 2, 9, 0, 0],
      [0, 5, 0, 0, 0, 3, 0, 2, 8],
      [0, 0, 9, 3, 0, 0, 0, 7, 4],
      [0, 4, 0, 0, 5, 0, 0, 3, 6],
      [7, 0, 3, 0, 1, 8, 0, 0, 0]
    ]
  },
  {
    // Hard
    board: [
      [0, 0, 0, 6, 0, 0, 4, 0, 0],
      [7, 0, 0, 0, 0, 3, 6, 0, 0],
      [0, 0, 0, 0, 9, 1, 0, 8, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 5, 0, 1, 8, 0, 0, 0, 3],
      [0, 0, 0, 3, 0, 6, 0, 4, 5],
      [0, 4, 0, 2, 0, 0, 0, 6, 0],
      [9, 0, 3, 0, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0, 1, 0, 0]
    ]
  }
]

type Position = { row: number, col: number } | null

// Helper to solve the board automatically to know the correct answers
const solveSudoku = (board: number[][]) => {
  const b = board.map(r => [...r]);
  const isValid = (r: number, c: number, val: number) => {
    for (let i = 0; i < 9; i++) {
      if (b[r][i] === val) return false;
      if (b[i][c] === val) return false;
    }
    const startR = Math.floor(r / 3) * 3;
    const startC = Math.floor(c / 3) * 3;
    for (let i = startR; i < startR + 3; i++) {
      for (let j = startC; j < startC + 3; j++) {
        if (b[i][j] === val) return false;
      }
    }
    return true;
  };

  const solve = () => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (b[r][c] === 0) {
          for (let v = 1; v <= 9; v++) {
            if (isValid(r, c, v)) {
              b[r][c] = v;
              if (solve()) return true;
              b[r][c] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };
  solve();
  return b;
};


export default function Sudoku() {
  const { language } = useLanguage()
  const content = dict[language].game

  const [levelIndex, setLevelIndex] = useState(0)
  const [board, setBoard] = useState<number[][]>([])
  const [initialBoard, setInitialBoard] = useState<number[][]>([])
  const [solutionBoard, setSolutionBoard] = useState<number[][]>([])
  
  const [selectedCell, setSelectedCell] = useState<Position>(null)
  const [strikes, setStrikes] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [tempErrorCell, setTempErrorCell] = useState<Position>(null)
  
  const [isSuccess, setIsSuccess] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showTutorial, setShowTutorial] = useState(false)
  const [score, setScore] = useState(0)

  // Initialize board on level change
  useEffect(() => {
    const currentLevel = LEVELS[levelIndex % LEVELS.length]
    const copiedBoard = currentLevel.board.map(row => [...row])
    setBoard(copiedBoard)
    setInitialBoard(currentLevel.board.map(row => [...row]))
    setSolutionBoard(solveSudoku(currentLevel.board))
    
    setSelectedCell(null)
    setStrikes(0)
    setIsGameOver(false)
    setIsSuccess(false)
  }, [levelIndex])

  const handleCellClick = (row: number, col: number) => {
    if (isSuccess || isGameOver) return
    setSelectedCell({ row, col })
  }

  const handleInput = (num: number) => {
    if (!selectedCell || isSuccess || isGameOver) return
    // Cannot overwrite initial cells
    if (initialBoard[selectedCell.row][selectedCell.col] !== 0) return
    
    const correctNum = solutionBoard[selectedCell.row][selectedCell.col]
    
    if (num !== correctNum) {
      // Wrong answer
      const newStrikes = strikes + 1
      setStrikes(newStrikes)
      setTempErrorCell({ row: selectedCell.row, col: selectedCell.col })
      
      setTimeout(() => setTempErrorCell(null), 800)
      
      if (newStrikes >= 3) {
        setIsGameOver(true)
      }
      return
    }
    
    // Correct answer
    const newBoard = board.map(row => [...row])
    newBoard[selectedCell.row][selectedCell.col] = num
    setBoard(newBoard)
    
    // Check win condition
    let isWon = true
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (newBoard[r][c] !== solutionBoard[r][c]) {
          isWon = false
        }
      }
    }

    if (isWon) {
      setIsSuccess(true)
      setShowConfetti(true)
      setScore(prev => prev + 500)
      setTimeout(() => setShowConfetti(false), 3000)
    }
  }

  const handleErase = () => {
    if (!selectedCell || isSuccess || isGameOver) return
    if (initialBoard[selectedCell.row][selectedCell.col] !== 0) return
    const newBoard = board.map(row => [...row])
    newBoard[selectedCell.row][selectedCell.col] = 0
    setBoard(newBoard)
  }

  const resetLevel = () => {
    const currentLevel = LEVELS[levelIndex % LEVELS.length]
    setBoard(currentLevel.board.map(row => [...row]))
    setSelectedCell(null)
    setStrikes(0)
    setIsGameOver(false)
  }

  const nextLevel = () => {
    setLevelIndex(prev => prev + 1)
  }

  const selectedNumber = selectedCell && board[selectedCell.row][selectedCell.col] !== 0 
    ? board[selectedCell.row][selectedCell.col] 
    : 0

  const getNumberCount = (num: number) => {
    let count = 0
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === num) count++
      }
    }
    return count
  }

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-6 glass-panel p-4 rounded-2xl border-indigo-500/30">
        <div className="flex items-center gap-3">
          <div className="text-text-muted font-medium">Level {levelIndex + 1}</div>
          <button 
            onClick={() => setShowTutorial(true)} 
            className="text-indigo-400 hover:text-indigo-300 hover:scale-110 transition-transform bg-indigo-500/10 p-1.5 rounded-full"
          >
            <Info size={18} />
          </button>
        </div>
        
        {/* Strikes Display */}
        <div className="flex gap-1">
          {[1, 2, 3].map(strike => (
            <X 
              key={strike} 
              size={20} 
              className={strike <= strikes ? "text-red-500" : "text-border-dark"} 
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-text-muted">{content.score || "Skor"}:</span>
          <span className="text-2xl font-bold text-indigo-400">{score}</span>
        </div>
      </div>

      {/* Game Board */}
      <motion.div 
        animate={tempErrorCell || isGameOver ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="glass-panel p-2 md:p-4 rounded-xl mb-6 border-indigo-500/20 relative w-full aspect-square flex flex-col overflow-hidden"
      >
        {showConfetti && (
          <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden rounded-xl">
            <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent animate-pulse" />
          </div>
        )}

        {isGameOver && (
          <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl p-4 text-center">
            <HeartCrack size={48} className="text-red-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Game Over!</h3>
            <p className="text-text-muted mb-6">Kamu melakukan 3 kesalahan berturut-turut.</p>
            <button
              onClick={resetLevel}
              className="py-2.5 px-8 rounded-xl font-bold bg-indigo-500 text-white hover:bg-indigo-600 transition-colors shadow-[0_0_20px_rgba(99,102,241,0.3)]"
            >
              Coba Lagi
            </button>
          </div>
        )}

        <div className="flex-1 grid grid-rows-9 gap-0 border-2 border-indigo-500/50 bg-background/50">
          {board.map((row, rIndex) => (
            <div key={rIndex} className={`grid grid-cols-9 gap-0 ${rIndex % 3 === 2 && rIndex !== 8 ? 'border-b-2 border-indigo-500/50' : 'border-b border-indigo-500/20'}`}>
              {row.map((cell, cIndex) => {
                const isInitial = initialBoard[rIndex][cIndex] !== 0
                const isSelected = selectedCell?.row === rIndex && selectedCell?.col === cIndex
                const isTempError = tempErrorCell?.row === rIndex && tempErrorCell?.col === cIndex
                
                // Highlight same numbers everywhere if a cell is selected and it has a number
                const isSameNumber = selectedNumber !== 0 && cell === selectedNumber
                
                // Highlight same row/col/box lightly if selected
                const isRelatedArea = selectedCell && !isSelected && (
                  selectedCell.row === rIndex || 
                  selectedCell.col === cIndex || 
                  (Math.floor(selectedCell.row / 3) === Math.floor(rIndex / 3) && Math.floor(selectedCell.col / 3) === Math.floor(cIndex / 3))
                )

                return (
                  <button
                    key={`${rIndex}-${cIndex}`}
                    onClick={() => handleCellClick(rIndex, cIndex)}
                    className={`
                      relative flex items-center justify-center text-sm sm:text-lg md:text-xl font-bold font-mono transition-colors
                      ${cIndex % 3 === 2 && cIndex !== 8 ? 'border-r-2 border-indigo-500/50' : 'border-r border-indigo-500/20'}
                      ${isInitial ? 'text-white' : 'text-indigo-400'}
                      ${isSelected ? 'bg-indigo-500/40 text-white shadow-inner' : ''}
                      ${isTempError ? 'bg-red-500/40 text-red-100' : ''}
                      ${!isSelected && !isTempError && isSameNumber ? 'bg-indigo-500/30' : ''}
                      ${!isSelected && !isTempError && !isSameNumber && isRelatedArea ? 'bg-white/5' : ''}
                      ${!isInitial && !isSelected ? 'hover:bg-indigo-500/20 cursor-pointer' : 'cursor-pointer'}
                    `}
                  >
                    {cell !== 0 ? cell : ''}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Controls */}
      <div className="w-full glass-panel p-4 rounded-2xl border-border-dark flex flex-col gap-4">
        {/* Numpad */}
        <div className="grid grid-cols-5 gap-2 w-full">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => {
            const isCompleted = getNumberCount(num) >= 9;
            return (
              <button
                key={num}
                onClick={() => handleInput(num)}
                disabled={isCompleted}
                className={`h-12 rounded-lg font-mono font-bold text-xl transition-all border 
                  ${isCompleted 
                    ? 'opacity-10 cursor-not-allowed bg-transparent border-transparent text-transparent pointer-events-none' 
                    : 'bg-white/5 border-white/10 hover:bg-indigo-500/20 text-white'
                  }`}
              >
                {num}
              </button>
            )
          })}
          <button
            onClick={handleErase}
            className="h-12 rounded-lg flex items-center justify-center font-bold transition-all border bg-red-500/10 border-red-500/20 hover:bg-red-500/20 text-red-400"
          >
            <Eraser size={20} />
          </button>
        </div>

        {/* Action Button */}
        {isSuccess && (
          <button
            onClick={nextLevel}
            className="w-full py-3.5 rounded-xl font-bold bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)]"
          >
            Next Level
          </button>
        )}
      </div>

      {/* Tutorial Modal */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-background glass-panel border-indigo-500/30 p-6 md:p-8 rounded-3xl max-w-md w-full relative shadow-[0_0_50px_rgba(99,102,241,0.15)]"
            >
              <button 
                onClick={() => setShowTutorial(false)}
                className="absolute top-6 right-6 text-text-muted hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              
              <h2 className="text-2xl font-bold text-indigo-400 mb-6">Cara Bermain Sudoku</h2>
              
              <div className="space-y-4 text-text-muted text-sm leading-relaxed max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                <p>
                  <strong className="text-white">Tujuan:</strong> Isi semua kotak kosong dengan angka 1 sampai 9!
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Setiap <strong>Baris</strong> (horizontal) harus berisi angka 1-9 tanpa ada yang kembar.</li>
                  <li>Setiap <strong>Kolom</strong> (vertikal) harus berisi angka 1-9 tanpa ada yang kembar.</li>
                  <li>Setiap <strong>Kotak 3x3</strong> (dibatasi garis tebal) harus berisi angka 1-9 tanpa ada yang kembar.</li>
                  <li><strong className="text-red-400">Penting:</strong> Kamu hanya punya 3 kesempatan (*strikes*). Jika salah menebak 3 kali, kamu harus mengulang level tersebut!</li>
                </ul>
                <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20 mt-4">
                  <strong className="text-white block mb-1">Tips Mengisi:</strong> 
                  Pilih salah satu kotak yang sudah terisi angka (misalnya angka 2), maka semua angka 2 di papan akan menyala (highlight) untuk memudahkanmu mencari celah kotak yang kosong!
                </div>
              </div>
              
              <button 
                onClick={() => setShowTutorial(false)}
                className="w-full mt-8 py-3.5 rounded-xl font-bold bg-indigo-500 text-white hover:bg-indigo-600 transition-colors shadow-[0_0_20px_rgba(99,102,241,0.3)]"
              >
                Paham, Ayo Main!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
