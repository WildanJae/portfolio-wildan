import { experiences } from "@/lib/data"

export default function Experience() {
  return (
    <section className="py-24 px-[5%]" style={{ background: "#F8F7F4", borderTop: "1px solid #E5E2DB" }}>
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-medium text-accent tracking-widest uppercase mb-2">Karir</p>
        <h2 className="text-text-primary font-semibold mb-12" style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", letterSpacing: "-0.02em" }}>
          Pengalaman Kerja
        </h2>

        <div className="flex flex-col gap-6">
          {experiences.map((exp, i) => (
            <div key={i} className="p-8 rounded-xl bg-white" style={{ border: "1px solid #E5E2DB" }}>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
                <div>
                  <h3 className="font-semibold text-text-primary">{exp.role}</h3>
                  <p className="text-accent text-sm font-medium mt-0.5">{exp.company}</p>
                </div>
                <span className="text-xs text-text-muted bg-soft-gray px-3 py-1.5 rounded-lg whitespace-nowrap"
                  style={{ background: "#F0EEE9" }}>
                  {exp.period}
                </span>
              </div>
              <ul className="flex flex-col gap-2">
                {exp.points.map((point, j) => (
                  <li key={j} className="flex gap-3 items-start text-sm text-text-secondary font-light leading-relaxed">
                    <span className="text-accent mt-1.5 text-xs flex-shrink-0">◆</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
