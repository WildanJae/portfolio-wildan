"use client"

import Link from "next/link"
import { profile } from "@/lib/data"

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-[5%] py-4"
      style={{ background: "rgba(248,247,244,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #E5E2DB" }}>
      <span className="font-semibold text-text-primary tracking-tight">{profile.name.split(" ")[0]}<span className="text-accent">.</span></span>
      <ul className="hidden md:flex gap-8 list-none">
        {[["Tentang", "#about"], ["Skill", "#skills"], ["Project", "#projects"], ["Kontak", "#contact"]].map(([label, href]) => (
          <li key={label}>
            <Link href={href} className="text-sm text-text-secondary hover:text-text-primary transition-colors">{label}</Link>
          </li>
        ))}
      </ul>
      <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noopener noreferrer"
        className="text-sm font-medium px-4 py-2 rounded-lg bg-accent text-white hover:bg-blue-700 transition-colors">
        Hire Me
      </a>
    </nav>
  )
}
