import Image from "next/image"
import { projects } from "@/lib/data"

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-[5%]" style={{ background: "white", borderTop: "1px solid #E5E2DB" }}>
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-medium text-accent tracking-widest uppercase mb-2">Portfolio</p>
        <h2 className="text-text-primary font-semibold mb-3" style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", letterSpacing: "-0.02em" }}>
          Project
        </h2>
        <p className="text-text-secondary font-light mb-12 text-sm max-w-md">
          Beberapa project yang pernah saya kerjakan — dari aplikasi skala besar hingga landing page.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div key={i} className="card-hover group rounded-2xl overflow-hidden bg-white flex flex-col"
              style={{ border: "1.5px solid #E5E2DB" }}>
              <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(to bottom, transparent, rgba(37,99,235,0.3))" }} />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-semibold text-text-primary text-sm mb-2 leading-snug group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-text-secondary text-xs font-light leading-relaxed mb-4 flex-1">{project.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-lg text-accent font-medium"
                      style={{ background: "#EFF6FF", border: "1px solid #BFDBFE" }}>
                      {tag}
                    </span>
                  ))}
                </div>
                {project.link ? (
                  <a href={project.link} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:gap-2 transition-all">
                    Lihat Demo <span>→</span>
                  </a>
                ) : (
                  <span className="text-xs text-text-muted">Internal Project</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
