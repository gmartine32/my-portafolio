import { BookOpen, GitBranch, Github, Package } from "lucide-react";
import { useContent, useUi } from "../../i18n/hooks";
import { GlassPanel } from "../ui/GlassPanel";

const ICONS = {
  github: Github,
  npm: Package,
  contribution: GitBranch,
  article: BookOpen,
} as const;

export function OpenSourceRoom() {
  const { openSourceItems } = useContent();
  const t = useUi();

  return (
    <div className="mx-auto flex min-h-full w-full max-w-4xl flex-col px-6 py-20">
      <header className="mb-12 text-center">
        <h1 className="font-heading mb-3 text-4xl font-bold md:text-6xl">
          {t.opensource.titleBefore}{" "}
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            {t.opensource.titleAccent}
          </span>
        </h1>
        <p className="text-foreground/85">{t.opensource.subtitle}</p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2">
        {openSourceItems.map((item) => {
          const Icon = ICONS[item.type];
          return (
            <li key={item.id}>
              <GlassPanel
                as="a"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                interactive
                className="flex h-full flex-col rounded-2xl p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span className="glass-chip mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h2 className="font-heading mb-2 text-xl font-semibold text-foreground">
                  {item.title}
                </h2>
                <p className="text-sm text-foreground/90">{item.description}</p>
              </GlassPanel>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
