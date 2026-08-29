import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { interpolate, useContent, useUi } from "../../i18n/hooks";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { isMobileProject } from "../../lib/projectImageLayout";
import { springSpatial } from "../../motion/systemMotion";
import { useNavigationStore } from "../../stores/navigationStore";
import type { Project } from "../../types/world";
import { SystemPanel } from "../ui/SystemPanel";
import { ROOM_CONTAINER, ROOM_HEADER, ROOM_SUBTITLE, ROOM_TITLE } from "./roomLayouts";

function FeaturedProjectCard({
  project,
  onOpen,
  reducedMotion,
}: {
  project: Project;
  onOpen: () => void;
  reducedMotion: boolean;
}) {
  const mobileLayout = isMobileProject(project);

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springSpatial}
    >
      <SystemPanel
        as="button"
        type="button"
        interactive
        shell
        onClick={onOpen}
        className="group w-full overflow-hidden rounded-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <div
          className={
            mobileLayout
              ? "mx-auto flex aspect-[9/16] max-h-80 max-w-[200px] items-center justify-center overflow-hidden bg-surface-far/80"
              : "aspect-[16/10] overflow-hidden bg-surface-far/80"
          }
        >
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className={`h-full w-full transition duration-700 ease-out group-hover:scale-[1.03] ${
              mobileLayout ? "object-contain object-center" : "object-cover"
            }`}
          />
        </div>
        <div className="p-5 sm:p-6">
          <div className="mb-3 flex items-start justify-between gap-3">
            <h2 className="font-heading text-2xl font-medium text-foreground">
              {project.title}
            </h2>
            <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-mid/80 transition group-hover:translate-x-0.5">
              <ArrowRight className="h-4 w-4 text-primary" aria-hidden />
            </span>
          </div>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="system-chip rounded-full px-2.5 py-1 font-mono text-[0.65rem] text-foreground/85"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </SystemPanel>
    </motion.div>
  );
}

function ProjectStackRow({
  project,
  onOpen,
  index,
  reducedMotion,
}: {
  project: Project;
  onOpen: () => void;
  index: number;
  reducedMotion: boolean;
}) {
  const mobileLayout = isMobileProject(project);

  return (
    <motion.li
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springSpatial, delay: index * 0.04 }}
    >
      <SystemPanel
        as="button"
        type="button"
        interactive
        shell
        onClick={onOpen}
        className="group flex w-full items-center gap-4 rounded-2xl p-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:p-4"
      >
        <div
          className={
            mobileLayout
              ? "flex h-16 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-surface-far/80"
              : "h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-surface-far/80"
          }
        >
          <img
            src={project.image}
            alt=""
            loading="lazy"
            className={`h-full w-full ${mobileLayout ? "object-contain" : "object-cover"}`}
          />
        </div>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-heading text-base font-medium text-foreground">
            {project.title}
          </span>
          <span className="mt-0.5 block line-clamp-1 text-sm text-muted-foreground">
            {project.description}
          </span>
        </span>
        <ArrowRight
          className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary"
          aria-hidden
        />
      </SystemPanel>
    </motion.li>
  );
}

export function ProjectsRoom() {
  const goTo = useNavigationStore((s) => s.goTo);
  const { projects } = useContent();
  const t = useUi();
  const reducedMotion = usePrefersReducedMotion();
  const featured = projects.filter((p) => p.featured);
  const [lead, ...rest] = featured;

  const openProject = (id: string) => goTo(`project-${id}`);

  return (
    <div className={`${ROOM_CONTAINER} max-w-3xl flex-col pb-28 pt-28 sm:pb-20`}>
      <header className={`${ROOM_HEADER} max-w-2xl`}>
        <h1 className={ROOM_TITLE}>
          <span className="text-primary">{t.projects.title}</span>
        </h1>
        <p className={ROOM_SUBTITLE}>{t.projects.subtitle}</p>
      </header>

      {lead && (
        <FeaturedProjectCard
          project={lead}
          onOpen={() => openProject(lead.id)}
          reducedMotion={reducedMotion}
        />
      )}

      {rest.length > 0 && (
        <ul className="mt-4 space-y-3">
          {rest.map((project, index) => (
            <ProjectStackRow
              key={project.id}
              project={project}
              index={index}
              reducedMotion={reducedMotion}
              onOpen={() => openProject(project.id)}
            />
          ))}
        </ul>
      )}

      <p className="mt-10 font-mono text-xs text-muted-foreground">
        {interpolate(t.projects.countHint, { count: projects.length })}
      </p>
    </div>
  );
}
