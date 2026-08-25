import { FileDown, Github, Linkedin, Mail } from "lucide-react";
import { useContent, useUi } from "../../i18n/hooks";
import { GlassPanel } from "../ui/GlassPanel";

export function ContactRoom() {
  const { profile } = useContent();
  const t = useUi();

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
    <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col items-center justify-center px-6 py-20 text-center">
      <h1 className="font-heading mb-4 text-4xl font-bold md:text-6xl">{t.contact.title}</h1>
      <p className="mb-14 max-w-xl text-lg text-foreground/90">{t.contact.subtitle}</p>

      <ul className="grid w-full gap-4 sm:grid-cols-2">
        {links.map((link) => {
          const Icon = link.icon;
          const body = (
            <>
              <span className="glass-chip flex h-12 w-12 items-center justify-center rounded-xl text-primary">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="block font-heading text-lg font-semibold text-foreground">
                  {link.name}
                </span>
                <span className="text-sm text-foreground/85">{link.label}</span>
              </span>
            </>
          );

          if (link.download) {
            return (
              <li key={link.name}>
                <GlassPanel
                  as="a"
                  href={link.href}
                  download="Gian-Martinez-CV.pdf"
                  interactive
                  className="group flex items-center gap-4 rounded-2xl p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {body}
                </GlassPanel>
              </li>
            );
          }

          return (
            <li key={link.name}>
              <GlassPanel
                as="a"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                interactive
                className="group flex items-center gap-4 rounded-2xl p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {body}
              </GlassPanel>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
