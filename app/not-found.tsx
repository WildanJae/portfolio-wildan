import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background bg-blueprint-grid flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md space-y-6 p-8 rounded-2xl bg-surface-card border border-border-strong shadow-editorial">
        <span className="editorial-tag text-accent font-bold">
          [ ERROR 404 ]
        </span>
        <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight text-foreground font-display">
          404
        </h1>
        <p className="text-sm text-text-muted leading-relaxed font-mono">
          Halaman yang Anda cari tidak ditemukan atau telah dipindahkan.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background text-xs font-mono font-bold uppercase tracking-wider rounded-lg hover:bg-accent hover:text-white transition-all duration-200"
          >
            <ArrowLeft size={14} />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
