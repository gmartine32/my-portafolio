import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const animateAboutSection = () => {
  // Header principal
  gsap.fromTo(
    ".about-header",
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".about-header",
        start: "top 80%",
      },
    }
  );

  // Tarjetas de la izquierda (Mi Historia + Stack Técnico)
  gsap.utils.toArray(".about-card").forEach((card) => {
    const el = card as HTMLElement;

    gsap.fromTo(
      el,
      { opacity: 0, y: 30, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      }
    );
  });

  // Tarjetas de expertise (derecha)
  gsap.utils.toArray(".about-expertise-card").forEach((card, i) => {
    const el = card as HTMLElement;

    gsap.fromTo(
      el,
      { opacity: 0, y: 40, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        delay: i * 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
        },
      }
    );
  });
};
