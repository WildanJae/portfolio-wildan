"use client";

import { useLanguage } from "./LanguageContext";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-dark bg-primary-dark hover:bg-border-dark/50 transition-colors text-sm font-medium text-text-muted hover:text-white"
    >
      <Globe size={14} className="text-accent" />
      <span className="uppercase">{language}</span>
    </button>
  );
}
