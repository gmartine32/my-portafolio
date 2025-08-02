import { gsap } from "gsap";

export const animateHero = () => {
  const splitWords = (element: HTMLElement) => {
    const text = element.textContent?.trim() || "";
    const words = text.split(/\s+/);
    element.innerHTML = words
      .map((word) => `<span class="word">${word}</span>`)
      .join(" ");
  };

  const greeting = document.querySelector(".hero-greeting") as HTMLElement;
  const name = document.querySelector(".hero-name") as HTMLElement;

  if (!greeting || !name) return;

  splitWords(greeting);
  splitWords(name);

  const reveal = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) el.classList.remove("invisible");
  };

  // Removemos invisible para que GSAP tome el control sin flash
  reveal(".hero-greeting");
  reveal(".hero-name");
  reveal(".hero-title");
  reveal(".hero-description");
  reveal(".hero-cta");

  const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.6 } });

  tl.to(".hero-greeting .word", {
    opacity: 1,
    y: 0,
    stagger: 0.15,
  })
    .to(
      ".hero-name .word",
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
      },
      "-=0.4"
    )
    .fromTo(
      ".hero-title",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0 },
      "-=0.3"
    )
    .fromTo(
      ".hero-description",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0 },
      "-=0.2"
    )
    .fromTo(
      ".hero-cta",
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1 },
      "-=0.2"
    );

  // Parallax fondo
  const bgElements = document.querySelectorAll(".hero-float-bg");
  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    bgElements.forEach((el, i) => {
      gsap.to(el, {
        x: x * (i + 1),
        y: y * (i + 1),
        duration: 1.2,
        ease: "power3.out",
      });
    });
  });
};
