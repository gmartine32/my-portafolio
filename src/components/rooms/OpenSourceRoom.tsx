import { motion } from "framer-motion";
import { BookOpen, GitBranch, Github, Package } from "lucide-react";
import { useContent, useUi } from "../../i18n/hooks";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { springSpatial } from "../../motion/systemMotion";
import { SystemPanel } from "../ui/SystemPanel";
import { ROOM_CONTAINER, ROOM_HEADER, ROOM_SUBTITLE, ROOM_TITLE } from "./roomLayouts";

const ICONS = {
  github: Github,
  npm: Package,
  contribution: GitBranch,
  article: BookOpen,
} as const;

export function OpenSourceRoom() {
  const { openSourceItems } = useContent();
  const t = useUi();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className={`${ROOM_CONTAINER} max-w-3xl flex-col`}>
      <header className={ROOM_HEADER}>
        <h1 className={ROOM_TITLE}>
          {t.opensource.titleBefore}{" "}
          <span className="text-primary">{t.opensource.titleAccent}</span>
        </h1>
        <p className={ROOM_SUBTITLE}>{t.opensource.subtitle}</p>
      </header>

      <ul className="divide-y divide-border rounded-2xl border border-border">
        {openSourceItems.map((item, index) => {
          const Icon = ICONS[item.type];
          return (
            <motion.li
              key={item.id}
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springSpatial, delay: index * 0.04 }}
            >
              <SystemPanel
                as="a"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                interactive
                className="flex items-center gap-4 rounded-none border-0 bg-transparent px-4 py-3.5 first:rounded-t-2xl last:rounded-b-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:px-5"
              >
                <span className="system-chip flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-primary">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-heading text-sm font-medium text-foreground sm:text-base">
                    {item.title}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground sm:text-sm">
                    {item.description}
                  </span>
                </span>
              </SystemPanel>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
