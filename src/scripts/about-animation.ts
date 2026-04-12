import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const animateAboutSection = () => {
  // Header principal con efecto de parallax sutil
  gsap.fromTo(
    ".about-header",
    { opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-header",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    }
  );

  // Tarjetas de la izquierda (Mi Historia + Stack Técnico) - Snap-in
  const leftCards = gsap.utils.toArray(".about-card") as HTMLElement[];
  
  leftCards.forEach((card, index) => {
    gsap.fromTo(
      card,
      { opacity: 0, x: -50, y: 50, rotationZ: -2 },
      {
        opacity: 1,
        x: 0,
        y: 0,
        rotationZ: 0,
        duration: 0.8,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Tarjetas de expertise (derecha) - Parallax escalonado (staggered 3D unfold)
  const rightCards = gsap.utils.toArray(".about-expertise-card") as HTMLElement[];
  
  rightCards.forEach((card, i) => {
    gsap.fromTo(
      card,
      { opacity: 0, y: 80, scale: 0.8, rotationX: 45, transformOrigin: "bottom center" },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Skills Badges - Continuous slow breathing floating effect
  const skillsContainer = document.querySelector(".about-card:nth-child(2) .flex.flex-wrap");
  if (skillsContainer) {
    const badgesEl = skillsContainer.querySelectorAll(".inline-flex, .bg-primary\\/10");
    badgesEl.forEach((badge, i) => {
      gsap.to(badge, {
        y: "-=8",
        x: "+=3",
        rotation: (i % 2 === 0 ? 1 : -1) * 3,
        duration: 1.5 + Math.random(),
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: i * 0.1
      });
    });
  }
};
