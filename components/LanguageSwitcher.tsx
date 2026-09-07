"use client";

import { useLanguage } from "./LanguageContext";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-border-subtle bg-surface/70 hover:bg-surface hover:border-border-strong transition-colors text-xs font-mono font-semibold text-foreground"
      aria-label="Toggle language"
      title={language === "id" ? "Ganti ke Bahasa Inggris" : "Switch to Indonesian"}
    >
      <Globe size={13} className="text-accent" />
      <span className="uppercase">{language}</span>
    </button>
  );
}
