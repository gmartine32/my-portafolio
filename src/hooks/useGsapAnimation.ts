import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AnimationType = "fade" | "fade-left" | "fade-right" | "zoom";

interface Options {
  animationType?: AnimationType;
  once?: boolean;
  selector?: string; // default: ".fade-in"
}

export const useGsapAnimation = ({
  animationType = "fade",
  once = false,
  selector = ".fade-in",
}: Options = {}) => {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(selector);
    if (!elements.length) return;

    const getFromProps = () => {
      switch (animationType) {
        case "fade-left":
          return { opacity: 0, x: -50 };
        case "fade-right":
          return { opacity: 0, x: 50 };
        case "zoom":
          return { opacity: 0, scale: 0.9 };
        case "fade":
        default:
          return { opacity: 0, y: 50 };
      }
    };

    const ctx = gsap.context(() => {
      elements.forEach((el, i) => {
        gsap.fromTo(
          el,
          getFromProps(),
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: i * 0.1,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: once ? "play none none none" : "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [animationType, once, selector]);

  return containerRef;
};
