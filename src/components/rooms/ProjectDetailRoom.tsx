import { ExternalLink, Github } from "lucide-react";
import { useContent, useUi } from "../../i18n/hooks";
import { getProjectImageLayout } from "../../lib/projectImageLayout";
import { ProjectGallery } from "../projects/ProjectGallery";
import { SystemPanel } from "../ui/SystemPanel";

type ProjectDetailRoomProps = {
  projectId: string;
};

export function ProjectDetailRoom({ projectId }: ProjectDetailRoomProps) {
  const { projects } = useContent();
  const t = useUi();
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="flex min-h-full items-center justify-center px-6 pb-28 sm:pb-20">
        <p className="text-muted-foreground">{t.projectDetail.notFound}</p>
      </div>
    );
  }

  const hasGithub = project.github && project.github !== "#";
  const hasDemo = project.demo && project.demo !== "#";
  const gallery =
    project.images?.length > 0 ? project.images : [project.image];

  return (
    <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col gap-6 px-6 pb-28 pt-28 sm:gap-8 sm:px-8 sm:pb-20">
      <div className="relative -mx-2 sm:mx-0">
        <ProjectGallery
          title={project.title}
          images={gallery}
          layout={getProjectImageLayout(project)}
        />
      </div>

      <SystemPanel shell className="rounded-2xl p-6 sm:p-8">
        <h1 className="font-heading mb-4 text-3xl font-semibold tracking-tight md:text-4xl">
          {project.title}
        </h1>
        <p className="mb-8 text-lg text-muted-foreground">{project.description}</p>

        <div className="mb-8 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="system-chip rounded-full px-3 py-1.5 font-mono text-xs text-foreground/90"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {project.problem && (
            <div className="rounded-xl border border-border/60 bg-surface-far/30 p-5">
              <h2 className="system-label mb-3 normal-case">{t.projectDetail.problem}</h2>
              <p className="text-sm leading-relaxed text-foreground/90">{project.problem}</p>
            </div>
          )}
          {project.solution && (
            <div className="rounded-xl border border-border/60 bg-surface-far/30 p-5">
              <h2 className="system-label mb-3 normal-case">{t.projectDetail.solution}</h2>
              <p className="text-sm leading-relaxed text-foreground/90">{project.solution}</p>
            </div>
          )}
        </div>
      </SystemPanel>

      {project.learnings && project.learnings.length > 0 && (
        <SystemPanel className="rounded-2xl p-5 sm:p-6">
          <h2 className="font-heading mb-4 text-lg font-medium text-foreground">
            {t.projectDetail.learnings}
          </h2>
          <ul className="space-y-2 border-l border-border pl-4">
            {project.learnings.map((item) => (
              <li key={item} className="text-sm text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>
        </SystemPanel>
      )}

      <div className="flex flex-wrap gap-3 pb-2">
        {hasGithub && (
          <SystemPanel
            as="a"
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            interactive
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Github className="h-4 w-4" aria-hidden />
            {t.projectDetail.github}
          </SystemPanel>
        )}
        {hasDemo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="system-cta gap-2 px-5 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ExternalLink className="h-4 w-4" aria-hidden />
            {t.projectDetail.demo}
          </a>
        )}
      </div>
    </div>
  );
}
