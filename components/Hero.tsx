import Image from "next/image"
import { profile } from "@/lib/data"

export default function Hero() {
  return (
    <section id="about" className="min-h-screen flex items-center px-[5%] pt-20 relative overflow-hidden"
      style={{ background: "#F8F7F4" }}>

      <div className="absolute top-20 right-[10%] w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)" }} />
      <div className="absolute bottom-20 left-[5%] w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)" }} />

      <div className="w-full max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="fade-up flex items-center gap-2 mb-5">
            <span className="available-dot" />
            <span className="text-xs font-medium text-green-600 tracking-wide">Available for freelance</span>
          </div>

          <p className="fade-up text-sm text-accent font-medium mb-2 tracking-wide">Halo, saya 👋</p>

          <h1 className="fade-up-1 font-semibold leading-tight mb-2"
            style={{ fontSize: "clamp(2.6rem, 5vw, 3.8rem)", letterSpacing: "-0.03em" }}>
            <span className="text-text-primary">{profile.name}</span>
          </h1>

          <h2 className="fade-up-1 font-semibold leading-tight mb-6"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.03em" }}>
            <span className="gradient-text">{profile.role}</span>
          </h2>

          <div className="fade-up-2 w-12 h-0.5 mb-6"
            style={{ background: "linear-gradient(90deg, #2563EB, #7C3AED)" }} />

          <p className="fade-up-2 text-text-secondary leading-relaxed mb-8 text-base font-light max-w-md">
            {profile.bio}
          </p>

          <div className="fade-up-3 flex gap-3 flex-wrap mb-8">
            <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noopener noreferrer"
              className="px-6 py-3 text-white text-sm font-medium rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}>
              💬 Hubungi Saya
            </a>
            <a href="#projects"
              className="px-6 py-3 text-sm font-medium rounded-xl text-text-primary hover:bg-white transition-all hover:-translate-y-0.5 hover:shadow-sm"
              style={{ border: "1.5px solid #E5E2DB" }}>
              Lihat Project →
            </a>
          </div>

          <div className="fade-up-3 flex gap-6">
            <a href={`mailto:${profile.email}`} className="text-xs text-text-muted hover:text-accent transition-colors">{profile.email}</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
              className="text-xs text-text-muted hover:text-accent transition-colors">LinkedIn</a>
          </div>
        </div>

        <div className="scale-in flex justify-center md:justify-end">
          <div className="relative float">
            <div className="w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden relative"
              style={{ border: "4px solid white", boxShadow: "0 0 0 3px #BFDBFE, 0 24px 64px rgba(37,99,235,0.15)" }}>
              <Image
                src={profile.photo}
                alt={profile.name}
                fill
                className="object-cover object-top"
                priority
              />
            </div>

            <div className="absolute -bottom-4 -left-6 bg-white rounded-2xl px-4 py-3 shadow-lg"
              style={{ border: "1px solid #E5E2DB" }}>
              <div className="text-xs text-text-muted mb-0.5">Pengalaman</div>
              <div className="font-semibold text-text-primary text-sm">2+ Tahun</div>
            </div>

            <div className="absolute -top-2 -right-6 rounded-2xl px-4 py-3 shadow-lg"
              style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}>
              <div className="text-xs text-blue-200 mb-0.5">Tech Stack</div>
              <div className="font-semibold text-white text-sm">Next.js · React</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
