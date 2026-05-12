import { profile } from "@/lib/data"

export default function Footer() {
  return (
    <footer className="py-8 px-[5%]" style={{ background: "white", borderTop: "1px solid #E5E2DB" }}>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
        <span className="font-semibold text-text-primary">{profile.name.split(" ")[0]}<span className="text-accent">.</span></span>
        <p className="text-xs text-text-muted">© {new Date().getFullYear()} {profile.name} · Bandung</p>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
          className="text-xs text-text-muted hover:text-accent transition-colors">
          LinkedIn
        </a>
      </div>
    </footer>
  )
}
