import { experiences, experienceStats } from "../../data/content";
import { GlassPanel } from "../ui/GlassPanel";

export function ExperienceRoom() {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-4xl flex-col px-6 py-20">
      <header className="mb-12 text-center">
        <h1 className="font-heading mb-3 text-4xl font-bold md:text-6xl">
          Mi <span className="bg-gradient-primary bg-clip-text text-transparent">Experiencia</span>
        </h1>
        <p className="text-muted-foreground">
          Un recorrido por mi carrera profesional y los logros alcanzados
        </p>
      </header>

      <ol className="relative space-y-8 border-l border-white/10 pl-8">
        {experiences.map((exp) => (
          <li key={`${exp.company}-${exp.period}`} className="relative">
            <span className="absolute -left-[2.4rem] top-1.5 h-3 w-3 rounded-full bg-primary shadow-glow" />
            <GlassPanel className="rounded-2xl p-5">
              <p className="mb-2 text-sm font-medium text-primary">{exp.period}</p>
              <h2 className="font-heading text-xl font-semibold">{exp.position}</h2>
              <p className="mb-3 text-primary">{exp.company}</p>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                {exp.description}
              </p>
              <ul className="mb-4 space-y-1.5">
                {exp.achievements.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground">
                    <span className="mr-2 text-primary">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {exp.tech.map((tech) => (
                  <span
                    key={tech}
                    className="glass-chip rounded-full px-2.5 py-1 text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </GlassPanel>
          </li>
        ))}
      </ol>

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        {experienceStats.map((stat) => (
          <GlassPanel key={stat.label} className="rounded-2xl p-4 text-center">
            <p className="font-heading text-2xl font-bold text-primary">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
}
