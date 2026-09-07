import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md space-y-6">
        <span className="editorial-tag text-accent font-bold">
          [ ERROR 404 ]
        </span>
        <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight text-foreground">
          404
        </h1>
        <p className="text-base text-text-muted leading-relaxed">
          Halaman yang Anda cari tidak ditemukan atau telah dipindahkan.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background text-xs font-bold uppercase tracking-wider rounded hover:bg-accent transition-colors duration-200"
          >
            <ArrowLeft size={15} />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
