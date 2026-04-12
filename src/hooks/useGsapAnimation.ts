import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AnimationType = "fade" | "fade-left" | "fade-right" | "zoom" | "surreal-reveal" | "3d-flip";

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
        case "surreal-reveal":
          return { opacity: 0, y: 30, scale: 0.95, filter: "blur(15px)" };
        case "3d-flip":
          return { opacity: 0, rotationX: 90, y: 50, transformOrigin: "bottom center" };
        case "fade":
        default:
          return { opacity: 0, y: 50 };
      }
    };

    const getToProps = () => {
      switch (animationType) {
        case "surreal-reveal":
          return { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" };
        case "3d-flip":
          return { opacity: 1, rotationX: 0, y: 0 };
        default:
          return { opacity: 1, x: 0, y: 0, scale: 1 };
      }
    };

    const ctx = gsap.context(() => {
      elements.forEach((el, i) => {
        gsap.fromTo(
          el,
          getFromProps(),
          {
            ...getToProps(),
            duration: animationType === "surreal-reveal" || animationType === "3d-flip" ? 1.2 : 0.8,
            ease: animationType === "surreal-reveal" ? "power3.out" : "power2.out",
            delay: i * 0.15,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: once ? "play none none none" : "play reverse play reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [animationType, once, selector]);

  return containerRef;
};
