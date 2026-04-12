import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const animateHero = () => {
  const greeting = document.querySelector(".hero-greeting") as HTMLElement;
  const name = document.querySelector(".hero-name") as HTMLElement;

  if (!greeting || !name) return;

  const reveal = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) el.classList.remove("invisible");
  };

  reveal(".hero-greeting");
  reveal(".hero-name");
  reveal(".hero-title");
  reveal(".hero-description");
  reveal(".hero-cta");
  reveal(".hero-status");

  // Create text split for hero name
  if (name) {
    const text = name.innerText;
    name.innerHTML = "";
    text.split("").forEach((char) => {
      const span = document.createElement("span");
      span.innerText = char === " " ? "\u00A0" : char;
      span.style.display = "inline-block";
      span.classList.add("hero-char");
      name.appendChild(span);
    });
  }

  // Surreal timeline
  const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.8 } });

  tl.fromTo(
    ".hero-status",
    { opacity: 0, y: -20, scale: 0.9 },
    { opacity: 1, y: 0, scale: 1, duration: 1.2 }
  ).fromTo(
    ".hero-greeting",
    { opacity: 0, rotationX: 45, y: 30, filter: "blur(10px)" },
    { opacity: 1, rotationX: 0, y: 0, filter: "blur(0px)" },
    "-=0.8"
  )
    .fromTo(
      ".hero-char",
      { opacity: 0, y: 50, rotationX: -90, filter: "blur(10px)" },
      { opacity: 1, y: 0, rotationX: 0, filter: "blur(0px)", stagger: 0.05, duration: 1.2, ease: "back.out(1.7)" },
      "-=1.2"
    )
    .fromTo(
      ".hero-title",
      { opacity: 0, y: 30, scale: 0.95, filter: "blur(5px)" },
      { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.4 },
      "-=1.4"
    )
    .fromTo(
      ".hero-description",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2 },
      "-=1.2"
    )
    .fromTo(
      ".hero-cta",
      { opacity: 0, scale: 0.8, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "elastic.out(1, 0.4)" },
      "-=1.0"
    );

  // Hero content parallax on scroll down
  const heroContent = [".hero-greeting", ".hero-name", ".hero-title", ".hero-description", ".hero-cta"];
  heroContent.forEach((selector, i) => {
    gsap.to(selector, {
      y: (i + 1) * -30,
      ease: "none",
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
      },
    });
  });

  // Parallax fondo fluido orgánico
  const bgElements = document.querySelectorAll(".hero-float-bg");
  
  // Parallax on scroll para los lava lamps
  bgElements.forEach((el, i) => {
    gsap.to(el, {
      y: (i + 1) * -80,
      rotation: (i % 2 === 0 ? 1 : -1) * 60,
      scale: 1.2,
      ease: "none",
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
    });
  });

  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 60;
    const y = (e.clientY / window.innerHeight - 0.5) * 60;
    bgElements.forEach((el, i) => {
      const depth = (i + 1) * 0.5;
      gsap.to(el, {
        x: x * depth,
        y: y * depth,
        rotation: x * 0.5,
        duration: 2.5,
        ease: "power3.out",
        overwrite: "auto"
      });
    });
  });
};
