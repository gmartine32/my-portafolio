import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const animateProjects = () => {
  // Title animation
  gsap.fromTo(
    "#projects .text-center",
    { opacity: 0, y: 30, filter: "blur(5px)" },
    {
      opacity: 1, y: 0, filter: "blur(0px)",
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#projects .text-center",
        start: "top 85%",
        toggleActions: "play none none reverse",
      }
    }
  );

  // Featured Projects with Parallax Image
  const featuredCards = gsap.utils.toArray("#projects .project-card-reveal") as HTMLElement[];
  featuredCards.forEach((card, i) => {
    gsap.fromTo(card, 
      { opacity: 0, y: 80, filter: "blur(8px)" },
      { 
        opacity: 1, y: 0, filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Parallax on the image inside
    const img = card.querySelector('img');
    if (img) {
      gsap.fromTo(img,
        { y: -30, scale: 1.1 },
        {
          y: 30, scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    }
  });

  // Other Projects
  const otherProjectCards = gsap.utils.toArray("#projects .mb-16 + div .grid > div") as HTMLElement[];
  otherProjectCards.forEach((card, i) => {
    gsap.fromTo(card, 
      { opacity: 0, y: 50, scale: 0.95 },
      { 
        opacity: 1, y: 0, scale: 1,
        duration: 0.7,
        ease: "back.out(1.2)",
        delay: i * 0.1,
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });
};

export const animateExperience = () => {
  // Title
  gsap.fromTo(
    "#experience .text-center",
    { opacity: 0, y: 30, filter: "blur(5px)" },
    {
      opacity: 1, y: 0, filter: "blur(0px)",
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#experience .text-center",
        start: "top 85%",
        toggleActions: "play none none reverse",
      }
    }
  );

  // Timeline entries
  const timelineEntries = gsap.utils.toArray("#experience .relative > div:not(.absolute)") as HTMLElement[];
  timelineEntries.forEach((entry, i) => {
    const isEven = i % 2 === 0;
    gsap.fromTo(entry, 
      { opacity: 0, x: isEven ? -50 : 50, filter: "blur(5px)" },
      { 
        opacity: 1, x: 0, filter: "blur(0px)",
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: entry,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // Timeline Progress Line Map
  const timelineProgress = document.querySelector(".timeline-line-progress");
  if (timelineProgress) {
    gsap.fromTo(timelineProgress, 
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".experience-timeline-container",
          start: "top center",
          end: "bottom center",
          scrub: true
        }
      }
    );
  }
  
  // Stats
  const stats = gsap.utils.toArray("#experience .grid-cols-2 > div") as HTMLElement[];
  stats.forEach((stat, i) => {
    gsap.fromTo(stat, 
      { opacity: 0, y: 30, scale: 0.8 },
      { 
        opacity: 1, y: 0, scale: 1,
        duration: 0.6,
        delay: i * 0.1,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: stat,
          start: "top 95%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });
};
