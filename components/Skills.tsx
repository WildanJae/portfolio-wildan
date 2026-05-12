import { skills } from "@/lib/data"

const categoryColors: Record<string, string> = {
  "Framework & Library": "#EFF6FF",
  "Bahasa": "#F5F3FF",
  "Styling": "#ECFDF5",
  "Tools": "#FFF7ED",
}

const categoryAccents: Record<string, string> = {
  "Framework & Library": "#2563EB",
  "Bahasa": "#7C3AED",
  "Styling": "#059669",
  "Tools": "#EA580C",
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-[5%]" style={{ background: "white", borderTop: "1px solid #E5E2DB" }}>
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-medium text-accent tracking-widest uppercase mb-2">Keahlian</p>
        <h2 className="text-text-primary font-semibold mb-3" style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", letterSpacing: "-0.02em" }}>
          Tech Stack
        </h2>
        <p className="text-text-secondary font-light mb-12 text-sm">Hover pada tag untuk interaksi</p>

        <div className="grid md:grid-cols-2 gap-5">
          {skills.map((group, i) => (
            <div key={i} className="card-hover p-6 rounded-2xl"
              style={{ background: categoryColors[group.category] || "#F8F7F4", border: "1.5px solid #E5E2DB" }}>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full" style={{ background: categoryAccents[group.category] || "#2563EB" }} />
                <h3 className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: categoryAccents[group.category] || "#2563EB" }}>
                  {group.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map(skill => (
                  <span key={skill} className="skill-tag px-3 py-1.5 rounded-lg text-sm font-medium text-text-primary"
                    style={{ background: "white", border: "1.5px solid #E5E2DB" }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
