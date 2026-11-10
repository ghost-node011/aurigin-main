import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLenis } from "../lib/SmoothScroll";

const CONTROL =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 transition-colors hover:border-[var(--color-yellow)] hover:text-[var(--color-yellow)] disabled:opacity-30";

// Full-screen viewer that pages through a project's slides.
export default function SlideViewer({ project, onClose }) {
  const [index, setIndex] = useState(0);
  const lenisRef = useLenis();
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const total = project.slides.length;
  const slide = project.slides[index];

  useEffect(() => {
    const lenis = lenisRef?.current;
    const previouslyFocused = document.activeElement;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    lenis?.stop();
    root.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") setIndex((i) => Math.min(i + 1, total - 1));
      else if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
      else if (e.key === "Tab") {
        // Keep keyboard focus inside the viewer.
        const items = [...dialogRef.current.querySelectorAll("button:not(:disabled)")];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      root.style.overflow = previousOverflow;
      lenis?.start();
      previouslyFocused?.focus?.();
    };
  }, [lenisRef, onClose, total]);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} slides`}
      className="fixed inset-0 z-[70] flex flex-col"
      style={{ background: "rgba(11, 11, 12, 0.96)", color: "#f3ecda" }}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-8">
        <div className="min-w-0">
          <p className="truncate font-display text-lg font-bold sm:text-2xl">{project.name}</p>
          <p className="truncate font-mono text-[11px] uppercase tracking-wider opacity-60">{slide.caption}</p>
        </div>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className={CONTROL}>
          <X size={18} />
        </button>
      </div>

      {/* Clicking the empty space around the slide closes the viewer. */}
      <div className="flex min-h-0 flex-1 items-center justify-center px-4 sm:px-8" onClick={onClose}>
        <img
          key={slide.full}
          src={slide.full}
          alt={`${project.name}: ${slide.caption}`}
          className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      <div className="flex items-center justify-center gap-6 px-4 py-5">
        <button
          type="button"
          onClick={() => setIndex((i) => i - 1)}
          disabled={index === 0}
          aria-label="Previous slide"
          className={CONTROL}
        >
          <ChevronLeft size={20} />
        </button>
        <p className="min-w-16 text-center font-mono text-sm" aria-live="polite">
          {index + 1} / {total}
        </p>
        <button
          type="button"
          onClick={() => setIndex((i) => i + 1)}
          disabled={index === total - 1}
          aria-label="Next slide"
          className={CONTROL}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
