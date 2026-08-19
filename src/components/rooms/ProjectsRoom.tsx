import { ArrowRight } from "lucide-react";
import { projects } from "../../data/content";
import { isMobileProject } from "../../lib/projectImageLayout";
import { useNavigationStore } from "../../stores/navigationStore";
import { GlassPanel } from "../ui/GlassPanel";

export function ProjectsRoom() {
  const goTo = useNavigationStore((s) => s.goTo);
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col px-6 pb-28 pt-28 sm:px-8 sm:pb-20">
      <header className="mb-12 text-center">
        <h1 className="font-heading mb-3 text-4xl font-bold md:text-6xl">
          <span className="bg-gradient-primary bg-clip-text text-transparent">Proyectos</span>
        </h1>
        <p className="text-muted-foreground">
          El corazón del portfolio. Usa ← → para recorrer cada proyecto.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        {featured.map((project) => {
          const mobileLayout = isMobileProject(project);

          return (
          <GlassPanel
            key={project.id}
            as="button"
            type="button"
            interactive
            onClick={() => goTo(`project-${project.id}`)}
            className="group rounded-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <div
              className={
                mobileLayout
                  ? "mx-auto flex aspect-[9/16] max-h-72 max-w-[160px] items-center justify-center overflow-hidden bg-muted/40"
                  : "aspect-video overflow-hidden bg-muted"
              }
            >
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className={`h-full w-full transition duration-500 group-hover:scale-105 ${
                  mobileLayout ? "object-contain object-center" : "object-cover"
                }`}
              />
            </div>
            <div className="p-5">
              <div className="mb-2 flex items-start justify-between gap-3">
                <h2 className="font-heading text-xl font-semibold">{project.title}</h2>
                <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-primary opacity-70 transition group-hover:translate-x-1 group-hover:opacity-100" />
              </div>
              <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="glass-chip rounded-full px-2.5 py-1 text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </GlassPanel>
          );
        })}
      </div>

      <p className="mt-10 text-center text-sm text-muted-foreground">
        {projects.length} proyectos · desliza a la derecha para entrar al detalle
      </p>
    </div>
  );
}
