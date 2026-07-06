"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Info, X } from "lucide-react"
import { dict } from "@/lib/data"
import { useLanguage } from "./LanguageContext"

const PUZZLES = [
  { words: ["TWO", "TWO"], result: "FOUR" },
  { words: ["EAT", "THAT"], result: "APPLE" },
  { words: ["SEND", "MORE"], result: "MONEY" },
  { words: ["BASE", "BALL"], result: "GAMES" },
  { words: ["MAC", "SLACK"], result: "APPLE" },
]

export default function Cryptarithm() {
  const { language } = useLanguage()
  const content = dict[language].game

  const [puzzleIndex, setPuzzleIndex] = useState(0)
  const [mapping, setMapping] = useState<Record<string, number | null>>({})
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showTutorial, setShowTutorial] = useState(false)

  const currentPuzzle = PUZZLES[puzzleIndex % PUZZLES.length]

  const uniqueLetters = useMemo(() => {
    const letters = new Set<string>()
    currentPuzzle.words.forEach(w => w.split('').forEach(char => letters.add(char)))
    currentPuzzle.result.split('').forEach(char => letters.add(char))
    return Array.from(letters)
  }, [currentPuzzle])

  useEffect(() => {
    const initialMapping: Record<string, number | null> = {}
    uniqueLetters.forEach(letter => initialMapping[letter] = null)
    setMapping(initialMapping)
    setSelectedLetter(uniqueLetters[0])
    setIsError(false)
    setIsSuccess(false)
  }, [currentPuzzle, uniqueLetters])

  const handleNumPad = (num: number) => {
    if (!selectedLetter || isSuccess) return

    // Check if number is already used by another letter
    const isUsed = Object.values(mapping).includes(num)
    if (isUsed) {
      // Find the letter that has this number and clear it
      const existingLetter = Object.keys(mapping).find(key => mapping[key] === num)
      if (existingLetter) {
        setMapping(prev => ({ ...prev, [existingLetter]: null, [selectedLetter]: num }))
      }
    } else {
      setMapping(prev => ({ ...prev, [selectedLetter]: num }))
    }
    setIsError(false)
  }

  const checkAnswer = () => {
    // Check if all letters are mapped
    if (Object.values(mapping).includes(null)) {
      triggerError()
      return
    }

    // Check leading zeros
    const leadingLetters = [...currentPuzzle.words.map(w => w[0]), currentPuzzle.result[0]]
    if (leadingLetters.some(letter => mapping[letter] === 0)) {
      triggerError()
      return
    }

    // Calculate sum
    const wordsValues = currentPuzzle.words.map(word => {
      return parseInt(word.split('').map(char => mapping[char]).join(''))
    })
    const resultValue = parseInt(currentPuzzle.result.split('').map(char => mapping[char]).join(''))

    const sum = wordsValues.reduce((a, b) => a + b, 0)

    if (sum === resultValue) {
      setIsSuccess(true)
      setShowConfetti(true)
      setScore(prev => prev + 100)
      setTimeout(() => setShowConfetti(false), 3000)
    } else {
      triggerError()
    }
  }

  const triggerError = () => {
    setIsError(true)
    setTimeout(() => setIsError(false), 500)
  }

  const nextPuzzle = () => {
    setPuzzleIndex(prev => prev + 1)
  }

  const clearMapping = () => {
    const initialMapping: Record<string, number | null> = {}
    uniqueLetters.forEach(letter => initialMapping[letter] = null)
    setMapping(initialMapping)
    setIsError(false)
  }

  // Calculate max width for alignment
  const maxLength = Math.max(...currentPuzzle.words.map(w => w.length), currentPuzzle.result.length)

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-4">
      {/* Score Header */}
      <div className="w-full flex justify-between items-center mb-8 glass-panel p-4 rounded-2xl border-purple-500/30">
        <div className="flex items-center gap-3">
          <div className="text-text-muted font-medium">Level {puzzleIndex + 1}</div>
          <button 
            onClick={() => setShowTutorial(true)} 
            className="text-purple-400 hover:text-purple-300 hover:scale-110 transition-transform bg-purple-500/10 p-1.5 rounded-full"
            title="Cara Bermain"
          >
            <Info size={18} />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-text-muted">{content.score || "Skor"}:</span>
          <span className="text-2xl font-bold text-purple-400">{score}</span>
        </div>
      </div>

      {/* Game Board */}
      <motion.div 
        animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="glass-panel p-8 md:p-12 rounded-3xl mb-8 border-purple-500/20 relative"
      >
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden rounded-3xl">
            {/* Simple CSS Confetti representation */}
            <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent animate-pulse" />
          </div>
        )}

        <div className="font-mono text-3xl md:text-5xl tracking-[0.3em] md:tracking-[0.5em] font-bold text-right flex flex-col items-end relative z-10">
          {currentPuzzle.words.map((word, i) => (
            <div key={i} className="mb-2 flex justify-end w-full">
              {word.padStart(maxLength, ' ').split('').map((char, charIdx) => (
                <span key={charIdx} className={`w-10 md:w-16 text-center ${char === ' ' ? 'opacity-0' : (mapping[char] !== null && mapping[char] !== undefined) ? 'text-purple-400' : 'text-foreground'}`}>
                  {(mapping[char] !== null && mapping[char] !== undefined) ? mapping[char] : char}
                </span>
              ))}
              {i === currentPuzzle.words.length - 1 && (
                <span className="absolute -left-4 text-purple-500/50">+</span>
              )}
            </div>
          ))}
          <div className="w-full h-1 bg-purple-500/50 rounded-full my-4" />
          <div className="flex justify-end w-full text-emerald-400">
            {currentPuzzle.result.padStart(maxLength, ' ').split('').map((char, charIdx) => (
              <span key={charIdx} className={`w-10 md:w-16 text-center ${char === ' ' ? 'opacity-0' : (mapping[char] !== null && mapping[char] !== undefined) ? 'text-emerald-400' : 'text-foreground'}`}>
                {(mapping[char] !== null && mapping[char] !== undefined) ? mapping[char] : char}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Controls */}
      <div className="w-full glass-panel p-6 rounded-3xl border-border-dark flex flex-col gap-6">
        
        {/* Letters Selection */}
        <div className="flex flex-wrap gap-2 justify-center">
          {uniqueLetters.map(letter => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`w-12 h-14 md:w-14 md:h-16 rounded-xl flex flex-col items-center justify-center font-bold transition-all border
                ${selectedLetter === letter 
                  ? 'bg-purple-500/20 border-purple-500 text-purple-400 scale-110' 
                  : 'bg-primary-dark border-border-dark text-text-muted hover:border-purple-500/50 hover:text-white'
                }
              `}
            >
              <span className="text-sm opacity-60 mb-1">{letter}</span>
              <span className="text-lg">{mapping[letter] !== null ? mapping[letter] : '?'}</span>
            </button>
          ))}
        </div>

        {/* Numpad */}
        <div className="grid grid-cols-5 gap-2 max-w-sm mx-auto w-full">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => {
            const isUsedBy = Object.keys(mapping).find(key => mapping[key] === num)
            return (
              <button
                key={num}
                onClick={() => handleNumPad(num)}
                className={`h-12 rounded-lg font-mono font-bold text-xl transition-all border
                  ${isUsedBy 
                    ? 'bg-primary border-border-dark text-white/40' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                  }
                `}
              >
                {num}
              </button>
            )
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-2">
          <button
            onClick={clearMapping}
            className="flex-1 py-3 rounded-xl font-bold border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
          >
            Clear
          </button>
          
          {isSuccess ? (
            <button
              onClick={nextPuzzle}
              className="flex-[2] py-3 rounded-xl font-bold bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            >
              Next Level
            </button>
          ) : (
            <button
              onClick={checkAnswer}
              disabled={Object.values(mapping).includes(null)}
              className={`flex-[2] py-3 rounded-xl font-bold transition-all
                ${Object.values(mapping).includes(null)
                  ? 'bg-primary border border-border-dark text-text-muted cursor-not-allowed'
                  : 'bg-purple-500 text-white hover:bg-purple-600 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                }
              `}
            >
              Check Answer
            </button>
          )}
        </div>
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
              className="bg-background glass-panel border-purple-500/30 p-6 md:p-8 rounded-3xl max-w-md w-full relative shadow-[0_0_50px_rgba(168,85,247,0.15)]"
            >
              <button 
                onClick={() => setShowTutorial(false)}
                className="absolute top-6 right-6 text-text-muted hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              
              <h2 className="text-2xl font-bold text-purple-400 mb-6">Cara Bermain</h2>
              
              <div className="space-y-4 text-text-muted text-sm leading-relaxed max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                <p>
                  <strong className="text-white">Tujuan:</strong> Pecahkan sandi matematika ini dengan menebak angka di balik setiap huruf!
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Setiap huruf mewakili tepat <strong className="text-purple-300">SATU angka (0-9)</strong>.</li>
                  <li>Huruf yang <strong>sama</strong> pasti mewakili angka yang sama.</li>
                  <li>Huruf yang <strong>berbeda</strong> pasti mewakili angka yang berbeda (tidak boleh ganda).</li>
                  <li>Huruf pertama dari sebuah kata <strong className="text-red-400">tidak boleh bernilai 0</strong>.</li>
                </ul>
                
                <div className="bg-primary/50 p-4 rounded-xl border border-border-dark mt-4">
                  <strong className="text-white block mb-2">Contoh Cara Menjawab:</strong>
                  <div className="font-mono text-center bg-black/30 py-2 rounded-lg mb-3 tracking-[0.2em] text-purple-300">
                    <div>  T W O</div>
                    <div>  T W O +</div>
                    <div className="border-t border-purple-500/30 w-24 mx-auto my-1"></div>
                    <div>F O U R</div>
                  </div>
                  <p className="text-xs">
                    Jika kamu menebak <strong>T=7, W=3, O=4</strong>, maka jadinya <strong>734 + 734 = 1468</strong>.
                    <br/><br/>
                    Dari hasil <strong>1468</strong>, berarti <strong>F=1, O=4, U=6, R=8</strong>. Karena <strong>O</strong> tetap sama-sama <strong>4</strong>, maka tebakanmu <span className="text-emerald-400 font-bold">BENAR!</span>
                  </p>
                </div>

                <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20 mt-4">
                  <strong className="text-white block mb-1">Cara Mengisi di Game:</strong> 
                  Pilih salah satu huruf di layar, lalu tekan angka pada NumPad di bawahnya.
                </div>
              </div>
              
              <button 
                onClick={() => setShowTutorial(false)}
                className="w-full mt-8 py-3.5 rounded-xl font-bold bg-purple-500 text-white hover:bg-purple-600 transition-colors shadow-[0_0_20px_rgba(168,85,247,0.3)]"
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
