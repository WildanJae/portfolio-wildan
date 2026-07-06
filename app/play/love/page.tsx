"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ArrowLeft } from 'lucide-react';
import LoveAnimation from "@/components/LoveAnimation";
import { dict } from "@/lib/data";
import { useLanguage } from "@/components/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Typewriter = ({ text, delay = 50, onComplete }: { text: string, delay?: number, onComplete?: () => void }) => {
  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + text[index]);
        setIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [index, text, delay, onComplete]);

  return <span className="font-mono">{currentText}</span>;
};

export default function PlayLovePage() {
  const { language } = useLanguage()
  const content = dict[language].game
  
  const [stage, setStage] = useState<'console' | 'reveal'>('console');
  const [consoleFinished, setConsoleFinished] = useState(false);

  const handleReveal = useCallback(() => {
    if (stage === 'console' && consoleFinished) {
      setStage('reveal');
    }
  }, [stage, consoleFinished]);

  return (
    <main 
      onClick={handleReveal}
      className={`relative min-h-screen w-full flex items-center justify-center bg-[#050505] selection:bg-[#ff4d6d]/30 ${stage === 'console' && consoleFinished ? 'cursor-pointer' : ''}`}
    >
      <div className="scanline" />
      
      <div className="absolute top-0 w-full z-50 p-[5%] max-w-7xl mx-auto pointer-events-none">
        <div className="flex justify-between items-center pointer-events-auto">
          <Link 
            href="/play" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white/70 bg-white/5 hover:bg-white/10 hover:text-white backdrop-blur-md transition-all group border border-white/5"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            {content.back}
          </Link>
          <LanguageSwitcher />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {stage === 'console' ? (
          <motion.div
            key="console"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="w-full max-w-2xl p-8 font-mono text-sm md:text-base text-white/80 z-20 pointer-events-none"
          >
            <div className="space-y-2">
              <div className="flex gap-2 text-[#ff8fb1]/60">
                <span>[system]</span>
                <Typewriter 
                  text="Initializing Wildan.PROTOCOL_v3.0..." 
                  delay={30} 
                  onComplete={() => setConsoleFinished(true)}
                />
              </div>
              
              <div className="flex gap-2 h-6">
                <span>[status]</span>
                {consoleFinished && (
                    <motion.span 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="text-green-400"
                    >
                        READY
                    </motion.span>
                )}
              </div>

              {consoleFinished && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-8 flex flex-col items-start gap-6"
                >
                  <p className="text-white/40 italic">
                    {">"} Analyzing developer's passion...
                  </p>
                  <p className="text-white/40 italic">
                    {">"} One encrypted portfolio package found.
                  </p>
                  
                  <button
                    id="decrypt-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setStage('reveal');
                    }}
                    className="group flex items-center gap-3 px-6 py-3 border border-[#ff4d6d]/30 bg-[#ff4d6d]/5 hover:bg-[#ff4d6d]/10 text-[#ff8fb1] transition-all duration-300 pointer-events-auto"
                  >
                    <Lock size={16} className="group-hover:rotate-12 transition-transform" />
                    <span className="font-mono tracking-widest uppercase text-xs">Unlock Passion</span>
                    <span className="terminal-cursor" />
                  </button>
                  
                  <p className="text-[10px] text-white/20 animate-pulse">
                    (or just click anywhere)
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 w-full h-screen flex items-center justify-center overflow-hidden"
          >
            <LoveAnimation />
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 3, duration: 1.5 }}
              className="z-20 text-center"
            >
              <h2 className="text-[#ff4d6d] font-mono text-xl md:text-3xl tracking-[0.3em] uppercase glow-text mb-2">
                Unlocked
              </h2>
              <div className="w-12 h-px bg-[#ff4d6d]/30 mx-auto mb-8" />
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setStage('console');
                }}
                className="text-white/20 hover:text-white/60 transition-colors uppercase text-[10px] tracking-widest font-mono pointer-events-auto relative z-30 p-2"
              >
                Lock Again
              </button>
            </motion.div>

            <div className="absolute top-24 left-8 text-[10px] font-mono text-white/10 uppercase tracking-widest space-y-1 z-10 hidden md:block pointer-events-none">
                <div>dev: Wildan Jaelani</div>
                <div>status: coding_with_passion</div>
                <div>type: front_end_magic</div>
            </div>
            
            <div className="absolute bottom-8 right-8 text-[10px] font-mono text-white/10 uppercase tracking-widest z-10 hidden md:block pointer-events-none">
                passion_unlocked
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
