import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;

    const xTo = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
    const xToRing = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3" });

    const move = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };
    window.addEventListener("mousemove", move);

    const onEnter = () => gsap.to(ring, { width: 68, height: 68, opacity: 0.7, duration: 0.25 });
    const onLeave = () => gsap.to(ring, { width: 40, height: 40, opacity: 1, duration: 0.25 });

    const attach = () => {
      const targets = document.querySelectorAll('[data-cursor="link"]');
      targets.forEach((t) => {
        t.addEventListener("mouseenter", onEnter);
        t.addEventListener("mouseleave", onLeave);
      });
      return targets;
    };

    const targets = attach();

    return () => {
      window.removeEventListener("mousemove", move);
      targets.forEach((t) => {
        t.removeEventListener("mouseenter", onEnter);
        t.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />
    </>
  );
}
