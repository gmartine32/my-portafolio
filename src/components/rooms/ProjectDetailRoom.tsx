import { ExternalLink, Github } from "lucide-react";
import { projects } from "../../data/content";
import { GlassPanel } from "../ui/GlassPanel";

type ProjectDetailRoomProps = {
  projectId: string;
};

export function ProjectDetailRoom({ projectId }: ProjectDetailRoomProps) {
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="flex min-h-full items-center justify-center px-6">
        <p className="text-muted-foreground">Proyecto no encontrado</p>
      </div>
    );
  }

  const hasGithub = project.github && project.github !== "#";
  const hasDemo = project.demo && project.demo !== "#";

  return (
    <div className="mx-auto flex min-h-full w-full max-w-4xl flex-col px-6 py-20">
      <GlassPanel className="mb-8 rounded-2xl">
        <img
          src={project.image}
          alt=""
          loading="lazy"
          className="aspect-video w-full object-cover"
        />
      </GlassPanel>

      <h1 className="font-heading mb-4 text-3xl font-bold md:text-5xl">{project.title}</h1>
      <p className="mb-8 text-lg text-muted-foreground">{project.description}</p>

      <div className="mb-8 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="glass-chip rounded-full px-3 py-1.5 text-sm"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mb-10 grid gap-4 md:grid-cols-2">
        {project.problem && (
          <GlassPanel className="rounded-2xl p-5">
            <h2 className="font-heading mb-2 text-lg font-semibold text-foreground">Problema</h2>
            <p className="text-sm text-muted-foreground">{project.problem}</p>
          </GlassPanel>
        )}
        {project.solution && (
          <GlassPanel className="rounded-2xl p-5">
            <h2 className="font-heading mb-2 text-lg font-semibold text-foreground">Solución</h2>
            <p className="text-sm text-muted-foreground">{project.solution}</p>
          </GlassPanel>
        )}
      </div>

      {project.learnings && project.learnings.length > 0 && (
        <div className="mb-10">
          <h2 className="font-heading mb-3 text-lg font-semibold">Aprendizajes</h2>
          <ul className="space-y-2">
            {project.learnings.map((item) => (
              <li key={item} className="text-sm text-muted-foreground">
                <span className="mr-2 text-primary">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {hasGithub && (
          <GlassPanel
            as="a"
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            interactive
            className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Github className="h-4 w-4" aria-hidden />
            GitHub
          </GlassPanel>
        )}
        {hasDemo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow transition hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ExternalLink className="h-4 w-4" aria-hidden />
            Demo
          </a>
        )}
      </div>
    </div>
  );
}
