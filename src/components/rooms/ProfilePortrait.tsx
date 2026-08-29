import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { springSpatial } from "../../motion/systemMotion";

type ProfilePortraitProps = {
  src: string;
  alt: string;
  className?: string;
};

export function ProfilePortrait({ src, alt, className = "" }: ProfilePortraitProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springSpatial}
      className={`pointer-events-none hidden lg:block ${className}`}
      aria-hidden
    >
      <div className="profile-portrait aspect-[3/4] overflow-hidden rounded-2xl border border-border/40 opacity-90">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-[center_20%]"
        />
      </div>
    </motion.div>
  );
}
