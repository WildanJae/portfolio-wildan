import { profile } from "@/lib/data"

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-[5%]" style={{ background: "#F8F7F4", borderTop: "1px solid #E5E2DB" }}>
      <div className="max-w-5xl mx-auto">
        <div className="max-w-xl">
          <p className="text-xs font-medium text-accent tracking-widest uppercase mb-2">Kontak</p>
          <h2 className="text-text-primary font-semibold mb-4" style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", letterSpacing: "-0.02em" }}>
            Mari Bekerja Sama
          </h2>
          <p className="text-text-secondary font-light leading-relaxed mb-10">
            Terbuka untuk project freelance, kolaborasi, maupun peluang kerja baru. Jangan ragu untuk menghubungi saya.
          </p>

          <div className="flex flex-col gap-4 mb-10">
            {[
              { label: "WhatsApp", value: `+${profile.whatsapp.slice(0,2)} ${profile.whatsapp.slice(2,5)}-${profile.whatsapp.slice(5,9)}-${profile.whatsapp.slice(9)}`, href: `https://wa.me/${profile.whatsapp}` },
              { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
              { label: "LinkedIn", value: "wildan-j", href: profile.linkedin },
              { label: "Lokasi", value: profile.location, href: "" },
            ].map((c, i) => (
              <div key={i} className="flex items-center gap-6 py-4"
                style={{ borderBottom: "1px solid #E5E2DB" }}>
                <span className="text-xs text-text-muted uppercase tracking-widest w-24 flex-shrink-0">{c.label}</span>
                {c.href ? (
                  <a href={c.href} target="_blank" rel="noopener noreferrer"
                    className="text-sm text-text-primary hover:text-accent transition-colors font-medium">
                    {c.value}
                  </a>
                ) : (
                  <span className="text-sm text-text-primary font-medium">{c.value}</span>
                )}
              </div>
            ))}
          </div>

          <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
            💬 Chat via WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
