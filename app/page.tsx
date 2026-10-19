"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Projects from "@/components/Projects"
import Skills from "@/components/Skills"
import Experience from "@/components/Experience"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import CommandMenu from "@/components/CommandMenu"

export default function Home() {
  const [commandOpen, setCommandOpen] = useState(false)

  return (
    <>
      <Navbar onOpenCommand={() => setCommandOpen(true)} />
      <main className="flex-1">
        <Hero onOpenCommand={() => setCommandOpen(true)} />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <CommandMenu isOpen={commandOpen} setIsOpen={setCommandOpen} />
    </>
  )
}
