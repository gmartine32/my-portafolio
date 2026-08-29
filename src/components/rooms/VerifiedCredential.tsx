import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Link2 } from "lucide-react";
import { useState } from "react";
import { interpolate, useUi } from "../../i18n/hooks";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { springSpatial } from "../../motion/systemMotion";
import type { EducationCredential } from "../../types/world";
import { SystemPanel } from "../ui/SystemPanel";

type VerifiedCredentialProps = EducationCredential;

export function VerifiedCredential({
  degree,
  institution,
  period,
  issuedDate,
  verifyUrl,
  issuer,
  provider,
}: VerifiedCredentialProps) {
  const t = useUi();
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const [revealed, setRevealed] = useState(false);
  const metaTransition = reducedMotion || isMobile ? { duration: 0.2 } : springSpatial;

  return (
    <SystemPanel shell className="mt-8 overflow-hidden rounded-2xl">
      <div
        className="rounded-2xl p-5 sm:p-6"
        onMouseEnter={() => {
          if (!isMobile) setRevealed(true);
        }}
        onMouseLeave={() => {
          if (!isMobile) setRevealed(false);
        }}
        onClick={() => {
          if (isMobile) setRevealed((value) => !value);
        }}
        onKeyDown={(event) => {
          if (isMobile && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            setRevealed((value) => !value);
          }
        }}
        role={isMobile ? "button" : undefined}
        tabIndex={isMobile ? 0 : undefined}
        aria-expanded={isMobile ? revealed : undefined}
      >
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="system-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="font-mono text-[0.65rem] uppercase tracking-wider text-foreground/90 sm:text-xs">
              {t.credential.verified}
            </span>
          </span>
          <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground sm:text-xs">
            {t.credential.blockchainCredential}
          </span>
        </div>

        <div className="flex items-start gap-3">
          <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface-mid/70 text-primary">
            <Link2 className="h-4 w-4" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <h4 className="font-heading text-xl font-medium text-foreground sm:text-2xl">
              {degree}
            </h4>
            <p className="mt-1 text-sm text-muted-foreground sm:text-base">{institution}</p>
            <p className="mt-2 font-mono text-xs text-foreground/80">{period}</p>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {revealed && (
            <motion.div
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reducedMotion ? undefined : { opacity: 0 }}
              transition={metaTransition}
            >
              <div className="mt-5 space-y-1 border-t border-border/50 pt-4 font-mono text-[0.65rem] text-muted-foreground sm:text-xs">
                <p>{interpolate(t.credential.issuedBy, { issuer })}</p>
                <p>{interpolate(t.credential.issuedOn, { date: issuedDate })}</p>
                <p>{interpolate(t.credential.poweredBy, { provider })}</p>
                <p>{t.credential.timestampNote}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!revealed && (
          <p className="mt-4 font-mono text-[0.65rem] text-muted-foreground sm:text-xs">
            {isMobile ? t.credential.tapHint : t.credential.hoverHint}
          </p>
        )}

        <div className="mt-6">
          <SystemPanel
            as="a"
            href={verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            interactive
            className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={interpolate(t.credential.verifyCredential, { degree })}
            onClick={(event) => event.stopPropagation()}
          >
            {t.credential.openCredential}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </SystemPanel>
        </div>
      </div>
    </SystemPanel>
  );
}
