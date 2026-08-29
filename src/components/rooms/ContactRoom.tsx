import { motion } from "framer-motion";
import { FileDown, Github, Linkedin, Mail } from "lucide-react";
import { useContent, useUi } from "../../i18n/hooks";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { springSpatial } from "../../motion/systemMotion";
import { SystemPanel } from "../ui/SystemPanel";
import { ROOM_CONTAINER, ROOM_HEADER, ROOM_SUBTITLE, ROOM_TITLE } from "./roomLayouts";

export function ContactRoom() {
  const { profile } = useContent();
  const t = useUi();
  const reducedMotion = usePrefersReducedMotion();

  const links = [
    {
      name: "GitHub",
      href: profile.github,
      icon: Github,
      label: "@gmartine32",
    },
    {
      name: "LinkedIn",
      href: profile.linkedin,
      icon: Linkedin,
      label: "/in/gianmartinezvilla",
    },
    {
      name: t.contact.email,
      href: profile.email,
      icon: Mail,
      label: profile.emailLabel,
    },
    {
      name: t.contact.cv,
      href: profile.cvUrl,
      icon: FileDown,
      label: t.contact.downloadCv,
      download: true as const,
    },
  ];

  return (
    <div className={`${ROOM_CONTAINER} max-w-lg flex-col justify-center`}>
      <header className={`${ROOM_HEADER} max-w-xl`}>
        <h1 className={ROOM_TITLE}>{t.contact.title}</h1>
        <p className={`${ROOM_SUBTITLE} text-lg`}>{t.contact.subtitle}</p>
      </header>

      <ul className="w-full space-y-3">
        {links.map((link, index) => {
          const Icon = link.icon;
          const body = (
            <>
              <span className="system-chip flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-primary">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1 text-left">
                <span className="block font-heading text-base font-medium text-foreground">
                  {link.name}
                </span>
                <span className="block truncate font-mono text-xs text-muted-foreground">
                  {link.label}
                </span>
              </span>
            </>
          );

          const panelClass =
            "group flex w-full items-center gap-4 rounded-2xl p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:p-5";

          const motionProps = {
            initial: reducedMotion ? false : ({ opacity: 0, y: 16 } as const),
            animate: { opacity: 1, y: 0 },
            transition: { ...springSpatial, delay: index * 0.06 },
          };

          if (link.download) {
            return (
              <motion.li key={link.name} {...motionProps}>
                <SystemPanel
                  as="a"
                  href={link.href}
                  download="Gian-Martinez-CV.pdf"
                  interactive
                  shell
                  className={panelClass}
                >
                  {body}
                </SystemPanel>
              </motion.li>
            );
          }

          return (
            <motion.li key={link.name} {...motionProps}>
              <SystemPanel
                as="a"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                interactive
                shell
                className={panelClass}
              >
                {body}
              </SystemPanel>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
