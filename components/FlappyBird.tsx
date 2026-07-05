"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion } from "framer-motion"
import { dict } from "@/lib/data"
import { useLanguage } from "./LanguageContext"

const GAME_WIDTH = 800
const GAME_HEIGHT = 600
const GRAVITY = 0.6
const JUMP_STRENGTH = -10
const PIPE_SPEED = 5 // Constant speed forever (Classic Flappy)
const PIPE_WIDTH = 80
const PIPE_GAP = 160 // Constant gap forever (Classic Flappy)
const BIRD_SIZE = 50

type Pipe = {
  id: number
  x: number
  topHeight: number
  passed: boolean
  isCrusher: boolean
  gapOffset: number
}

// 5 Unique Themes with Hitbox-Accurate Clip Paths (Sides remain straight)
const THEMES = [
  { // Level 0: Classic Green
    sky: "bg-blue-900/30",
    floor: "bg-emerald-900/50 border-emerald-500/30",
    pipeStart: "from-emerald-400",
    pipeEnd: "to-emerald-600",
    pipeBorder: "border-emerald-400",
    clipPathTop: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    clipPathBottom: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
  },
  { // Level 1: Cyberpunk Neon (Pointy Arrows)
    sky: "bg-fuchsia-900/40",
    floor: "bg-purple-900/60 border-fuchsia-500/50",
    pipeStart: "from-fuchsia-500",
    pipeEnd: "to-purple-700",
    pipeBorder: "border-pink-400",
    clipPathTop: "polygon(0 0, 100% 0, 100% 90%, 50% 100%, 0 90%)",
    clipPathBottom: "polygon(50% 0, 100% 10%, 100% 100%, 0 100%, 0 10%)"
  },
  { // Level 2: Lava Hell (Fangs/Monster Teeth)
    sky: "bg-red-950/80",
    floor: "bg-orange-950 border-orange-500/60",
    pipeStart: "from-orange-500",
    pipeEnd: "to-red-700",
    pipeBorder: "border-yellow-500",
    clipPathTop: "polygon(0 0, 100% 0, 100% 80%, 75% 100%, 50% 70%, 25% 100%, 0 80%)",
    clipPathBottom: "polygon(25% 0, 50% 30%, 75% 0, 100% 20%, 100% 100%, 0 100%, 0 20%)"
  },
  { // Level 3: Frozen Ice (Jagged Crystals)
    sky: "bg-cyan-900/50",
    floor: "bg-sky-900/50 border-cyan-300/40",
    pipeStart: "from-cyan-300",
    pipeEnd: "to-blue-600",
    pipeBorder: "border-white/70",
    clipPathTop: "polygon(0 0, 100% 0, 100% 100%, 80% 90%, 60% 100%, 40% 85%, 20% 95%, 0 100%)",
    clipPathBottom: "polygon(0 0, 20% 10%, 40% 0, 60% 15%, 80% 0, 100% 5%, 100% 100%, 0 100%)"
  },
  { // Level 4+: The Void (Alien Tech / Beveled)
    sky: "bg-black",
    floor: "bg-gray-900 border-yellow-500/20",
    pipeStart: "from-purple-600",
    pipeEnd: "to-black",
    pipeBorder: "border-yellow-400/50",
    clipPathTop: "polygon(0 0, 100% 0, 100% 90%, 80% 100%, 20% 100%, 0 90%)",
    clipPathBottom: "polygon(20% 0, 80% 0, 100% 10%, 100% 100%, 0 100%, 0 10%)"
  }
]

export default function FlappyBird() {
  const { language } = useLanguage()
  const content = dict[language].game
  const photo = dict[language].profile.photo

  const [gameState, setGameState] = useState<"start" | "playing" | "gameover">("start")
  const [birdPos, setBirdPos] = useState(GAME_HEIGHT / 2)
  const [birdVelocity, setBirdVelocity] = useState(0)
  const [pipes, setPipes] = useState<Pipe[]>([])
  const [score, setScore] = useState(0)
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [autoPlay, setAutoPlay] = useState(false)
  const [chaserX, setChaserX] = useState(-200)
  const scoredPipes = useRef(new Set<number>())

  const level = Math.floor(score / 10)
  const currentTheme = THEMES[Math.min(level, THEMES.length - 1)]

  const jump = useCallback(() => {
    if (gameState === "start") {
      setGameState("playing")
      setBirdVelocity(JUMP_STRENGTH)
    } else if (gameState === "playing") {
      setBirdVelocity(JUMP_STRENGTH)
    } else if (gameState === "gameover") {
      resetGame()
    }
  }, [gameState])

  // Auto-Play Bot Logic (AI)
  useEffect(() => {
    if (!autoPlay || gameState !== "playing") return;

    const birdLeft = GAME_WIDTH / 2 - BIRD_SIZE / 2;
    const nextPipe = pipes.find(p => p.x + PIPE_WIDTH > birdLeft);

    if (nextPipe) {
      // Target the middle of the gap
      const targetY = nextPipe.topHeight + (PIPE_GAP / 2) - (BIRD_SIZE / 2);
      
      if (birdPos > targetY && birdVelocity >= 0) {
        jump();
      }
    } else {
      if (birdPos > GAME_HEIGHT / 2 && birdVelocity >= 0) {
        jump();
      }
    }
  }, [birdPos, pipes, autoPlay, gameState, jump, birdVelocity]);

  // Fix: Independent timer for Level Up UI (not interrupted by rapid score changes)
  useEffect(() => {
    if (showLevelUp) {
      const timer = setTimeout(() => setShowLevelUp(false), 800)
      return () => clearTimeout(timer)
    }
  }, [showLevelUp])

  // Safely update score and knockback Chaser
  useEffect(() => {
    pipes.forEach(p => {
      if (p.passed && !scoredPipes.current.has(p.id)) {
        scoredPipes.current.add(p.id)
        setScore(s => {
          const newScore = s + 1;
          if (newScore > 0 && newScore % 10 === 0) setShowLevelUp(true);
          return newScore;
        })
        // Knockback the Chaser by 150px!
        setChaserX(prev => Math.max(-200, prev - 150))
      }
    })
  }, [pipes])

  const resetGame = () => {
    setBirdPos(GAME_HEIGHT / 2)
    setBirdVelocity(0)
    setPipes([])
    setScore(0)
    setShowLevelUp(false)
    setChaserX(-200)
    scoredPipes.current.clear()
    setGameState("start")
  }

  // Handle Input Keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault()
        if (autoPlay) setAutoPlay(false)
        jump()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [jump, autoPlay])

  // Game Loop
  useEffect(() => {
    if (gameState !== "playing") return

    const gameLoop = setInterval(() => {
      // 1. Update Bird
      setBirdPos((pos) => {
        const newPos = pos + birdVelocity
        if (newPos >= GAME_HEIGHT - BIRD_SIZE) {
          if (!autoPlay) setGameState("gameover") 
          return GAME_HEIGHT - BIRD_SIZE
        }
        if (newPos <= 0) return 0
        return newPos
      })
      setBirdVelocity((v) => v + GRAVITY)

      // 1.5 Update Chaser (The Monster creeping in)
      setChaserX((prev) => {
        const birdLeft = GAME_WIDTH / 2 - BIRD_SIZE / 2;
        if (prev >= birdLeft) {
          if (!autoPlay) setGameState("gameover") // Eaten by Chaser!
          return birdLeft;
        }
        // Base creep speed + scales with level
        return prev + 1 + (level * 0.3)
      })

      // 2. Update Pipes
      setPipes((prevPipes) => {
        let newPipes = prevPipes.map((p) => {
          let newX = p.x - PIPE_SPEED
          let newGapOffset = p.gapOffset

          // Crusher logic: Snap open when bird is near!
          if (p.isCrusher) {
            const distance = newX - (GAME_WIDTH / 2 - BIRD_SIZE / 2);
            if (distance < 300 && distance > -PIPE_WIDTH) {
              // Rapidly open (offset goes to 0)
              newGapOffset = Math.max(0, newGapOffset - 15);
            } else if (distance >= 300) {
              // Stay closed
              newGapOffset = PIPE_GAP / 2;
            }
          }

          return { ...p, x: newX, gapOffset: newGapOffset }
        })

        // Remove off-screen pipes
        if (newPipes.length > 0 && newPipes[0].x < -PIPE_WIDTH) {
          newPipes.shift()
        }

        // Add new pipes
        if (newPipes.length === 0 || newPipes[newPipes.length - 1].x < GAME_WIDTH - 300) {
          const minPipeHeight = 50
          const maxPipeHeight = GAME_HEIGHT - PIPE_GAP - minPipeHeight
          const topHeight = Math.floor(Math.random() * (maxPipeHeight - minPipeHeight + 1)) + minPipeHeight
          
          // Starting from level 1, 40% chance to spawn a Crusher
          const isCrusher = level >= 1 && Math.random() > 0.6;

          newPipes.push({ 
            id: Date.now() + Math.random(), 
            x: GAME_WIDTH, 
            topHeight, 
            passed: false,
            isCrusher,
            gapOffset: isCrusher ? PIPE_GAP / 2 : 0 // Starts fully closed if crusher
          })
        }

        // Mark passed pipes
        newPipes = newPipes.map(p => {
          if (!p.passed && p.x + PIPE_WIDTH < GAME_WIDTH / 2 - BIRD_SIZE / 2) {
            return { ...p, passed: true }
          }
          return p
        })

        return newPipes
      })

    }, 24)

    return () => clearInterval(gameLoop)
  }, [gameState, birdVelocity, autoPlay, level])

  // Collision Detection
  useEffect(() => {
    if (gameState !== "playing" || autoPlay) return 

    const birdLeft = GAME_WIDTH / 2 - BIRD_SIZE / 2
    const birdRight = birdLeft + BIRD_SIZE
    const birdTop = birdPos
    const birdBottom = birdPos + BIRD_SIZE

    for (const pipe of pipes) {
      const pipeLeft = pipe.x
      const pipeRight = pipe.x + PIPE_WIDTH
      
      // Calculate true gap bounds based on crusher state
      const topPipeBottom = pipe.topHeight + pipe.gapOffset
      const bottomPipeTop = pipe.topHeight + PIPE_GAP - pipe.gapOffset

      if (birdRight > pipeLeft + 10 && birdLeft < pipeRight - 10) {
        if (birdTop < topPipeBottom || birdBottom > bottomPipeTop) {
          setGameState("gameover")
        }
      }
    }
  }, [birdPos, pipes, gameState, autoPlay])

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2 text-foreground">
          {content.fluppy_title} <span className="text-accent text-sm">Lv.{level}</span>
        </h2>
        <p className="text-text-muted">{content.fluppy_desc}</p>
      </div>

      {/* Responsive Container Wrapper */}
      <div 
        className="w-full max-w-4xl mx-auto overflow-hidden rounded-3xl shadow-2xl border-4 border-border-dark bg-primary-dark cursor-pointer touch-none relative transition-colors duration-1000"
        style={{ aspectRatio: `${GAME_WIDTH}/${GAME_HEIGHT}` }}
        onClick={jump}
      >
        {/* Sky/Background Decor */}
        <div className={`absolute inset-0 transition-colors duration-1000 ${currentTheme.sky}`} />
        <div className={`absolute bottom-0 w-full h-[10%] border-t-4 transition-colors duration-1000 ${currentTheme.floor}`} />

        {/* Level Up Notification */}
        {showLevelUp && (
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <h1 className="text-6xl md:text-8xl font-black text-white italic drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]">
              LEVEL UP!
            </h1>
          </motion.div>
        )}

        {/* The Chaser (Dark Monster) */}
        <div 
          className="absolute top-0 bottom-0 z-30 pointer-events-none transition-transform duration-75"
          style={{ 
            left: 0, 
            width: '400px', 
            transform: `translateX(${chaserX - 400}px)`,
            background: 'linear-gradient(90deg, rgba(0,0,0,0.95) 0%, rgba(20,0,0,0.9) 70%, transparent 100%)'
          }}
        >
          <div className="absolute right-12 top-[30%] w-20 h-20 bg-red-600 rounded-full blur-[20px] animate-pulse" />
          <div className="absolute right-12 bottom-[30%] w-20 h-20 bg-red-600 rounded-full blur-[20px] animate-pulse" />
          <svg className="absolute right-0 top-0 w-16 h-full text-black" preserveAspectRatio="none" viewBox="0 0 100 1000">
            <polygon points="0,0 100,50 0,100 100,150 0,200 100,250 0,300 100,350 0,400 100,450 0,500 100,550 0,600 100,650 0,700 100,750 0,800 100,850 0,900 100,950 0,1000" fill="currentColor"/>
          </svg>
        </div>

        {/* Bird Wrapper (Position & Rotation) */}
        <motion.div
          className="absolute z-20 flex items-center justify-center"
          style={{ 
            width: `${(BIRD_SIZE / GAME_WIDTH) * 100}%`, 
            height: `${(BIRD_SIZE / GAME_HEIGHT) * 100}%`,
            left: `${((GAME_WIDTH / 2 - BIRD_SIZE / 2) / GAME_WIDTH) * 100}%`,
            top: `${(birdPos / GAME_HEIGHT) * 100}%`,
            rotate: birdVelocity * 3 
          }}
          transition={{ duration: 0 }}
        >
          {/* Left Wing */}
          <motion.div 
            className="absolute -left-[40%] top-[40%] w-[50%] h-[30%] bg-white rounded-l-full rounded-r-md shadow-sm border border-gray-200 z-10"
            style={{ transformOrigin: "right center" }}
            animate={{ rotate: birdVelocity < 0 ? -50 : 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          />
          {/* The Face */}
          <div className={`w-full h-full rounded-full border-2 overflow-hidden shadow-lg bg-border-dark relative z-20 ${currentTheme.pipeBorder}`}>
            <img 
              src={photo} 
              alt="Fluppy Wil" 
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
          {/* Right Wing */}
          <motion.div 
            className="absolute -right-[40%] top-[40%] w-[50%] h-[30%] bg-white rounded-r-full rounded-l-md shadow-sm border border-gray-200 z-10"
            style={{ transformOrigin: "left center" }}
            animate={{ rotate: birdVelocity < 0 ? 50 : -30 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          />
        </motion.div>

        {/* Pipes */}
        {pipes.map((pipe, i) => {
          return (
            <div key={i}>
              {/* Top Pipe */}
              <div 
                className={`absolute top-0 bg-gradient-to-b ${currentTheme.pipeStart} ${currentTheme.pipeEnd} transition-colors duration-1000 ${pipe.isCrusher ? 'shadow-[0_0_20px_rgba(255,0,0,0.8)]' : ''}`}
                style={{
                  left: `${(pipe.x / GAME_WIDTH) * 100}%`,
                  width: `${(PIPE_WIDTH / GAME_WIDTH) * 100}%`,
                  height: `${((pipe.topHeight + pipe.gapOffset) / GAME_HEIGHT) * 100}%`,
                  clipPath: currentTheme.clipPathTop
                }}
              >
                {pipe.isCrusher && <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,0,0,0.3)_10px,rgba(255,0,0,0.3)_20px)]" />}
              </div>
              
              {/* Bottom Pipe */}
              <div 
                className={`absolute bottom-0 bg-gradient-to-t ${currentTheme.pipeStart} ${currentTheme.pipeEnd} transition-colors duration-1000 ${pipe.isCrusher ? 'shadow-[0_0_20px_rgba(255,0,0,0.8)]' : ''}`}
                style={{
                  left: `${(pipe.x / GAME_WIDTH) * 100}%`,
                  width: `${(PIPE_WIDTH / GAME_WIDTH) * 100}%`,
                  height: `${((GAME_HEIGHT - pipe.topHeight - PIPE_GAP + pipe.gapOffset) / GAME_HEIGHT) * 100}%`,
                  clipPath: currentTheme.clipPathBottom
                }}
              >
                {pipe.isCrusher && <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,0,0,0.3)_10px,rgba(255,0,0,0.3)_20px)]" />}
              </div>
            </div>
          )
        })}

        {/* UI Overlay */}
        <div className="absolute top-[5%] w-full text-center z-30 pointer-events-none">
          <span className="text-4xl md:text-6xl font-black text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
            {score}
          </span>
        </div>

        {/* Developer Buttons (Cheat/Testing) */}
        <div className="absolute top-4 right-4 z-50 flex gap-3">
          {/* Skip Level Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setScore(s => s + 10);
            }}
            className="px-4 py-2 bg-black/50 hover:bg-black/80 backdrop-blur-md text-white font-mono text-xs rounded-lg border border-white/20 transition-all pointer-events-auto shadow-lg"
          >
            ⏭️ +10 Skor (Skip Level)
          </button>

          {/* Developer Auto-Play Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setAutoPlay(prev => !prev);
              if (!autoPlay && gameState === "start") {
                jump(); // Auto start the game
              }
            }}
            className={`px-4 py-2 backdrop-blur-md text-white font-mono text-xs rounded-lg border transition-all pointer-events-auto shadow-lg ${autoPlay ? 'bg-green-500/50 border-green-400' : 'bg-black/50 hover:bg-black/80 border-white/20'}`}
          >
            {autoPlay ? '🤖 Bot: ON (God Mode)' : '🤖 Auto-Play'}
          </button>
        </div>

        {gameState === "start" && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-none">
            <div className="text-center animate-bounce">
              <p className="text-white font-bold text-lg md:text-2xl px-6 md:px-8 py-3 md:py-4 bg-accent rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                {content.start} (Tap / Space)
              </p>
            </div>
          </div>
        )}

        {gameState === "gameover" && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md">
            <h3 className="text-3xl md:text-5xl font-black text-red-500 mb-2 md:mb-4 drop-shadow-lg">{content.gameover}</h3>
            <p className="text-white text-xl md:text-2xl mb-6 md:mb-8 font-semibold">Skor Akhir: {score} (Level {level})</p>
            <button 
              onClick={(e) => { e.stopPropagation(); resetGame(); }}
              className="px-6 md:px-8 py-3 md:py-4 text-lg md:text-xl bg-accent text-white font-bold rounded-2xl shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:bg-blue-600 transition-all hover:scale-105 active:scale-95 pointer-events-auto"
            >
              {content.play_again}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
