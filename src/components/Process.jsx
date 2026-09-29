import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, Binoculars, Compass, Lightbulb, PenLine, Megaphone } from "lucide-react";
import SplitReveal from "./SplitReveal";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { n: "01", icon: Binoculars, title: "Discover", desc: "We dig deep: audience, market, culture, insight.", bg: "#0066ff", fg: "#ffffff" },
  { n: "02", icon: Compass, title: "Direction", desc: "We find the truth and set a clear direction.", bg: "#0b0b0c", fg: "#ffffff" },
  { n: "03", icon: Lightbulb, title: "Ideate", desc: "Big ideas. Bold angles. No safe bets.", bg: "#fed828", fg: "#0b0b0c" },
  { n: "04", icon: PenLine, title: "Create", desc: "Crafting stories, systems and experiences.", bg: "#0066ff", fg: "#ffffff" },
  { n: "05", icon: Megaphone, title: "Launch", desc: "We launch, learn, and scale what works.", bg: "#fed828", fg: "#0b0b0c" },
];

export default function Process() {
  const wrapRef = useRef(null);
  const cardsRef = useRef([]);
  cardsRef.current = [];
  const barRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current;
      const total = cards.length;

      cards.forEach((card, i) => {
        gsap.set(card, {
          scale: 1 - i * 0.045,
          y: i * 16,
          zIndex: total - i,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            if (barRef.current) barRef.current.style.width = `${self.progress * 100}%`;
          },
        },
      });

      cards.forEach((card, i) => {
        if (i === total - 1) return;
        const start = i / (total - 1);
        const dir = i % 2 === 0 ? -1 : 1;
        tl.to(
          card,
          { x: `${dir * 130}%`, rotate: dir * 16, opacity: 0, duration: 0.7 / (total - 1), ease: "power1.in" },
          start
        );
        tl.to(
          cards[i + 1],
          { scale: 1, y: 0, duration: 0.7 / (total - 1), ease: "power1.out" },
          start
        );
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={wrapRef} className="relative h-[480vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center pt-20 sm:pt-0 border-t" style={{ borderColor: "var(--line)" }}>
        <div className="px-6 max-w-7xl mx-auto w-full mb-8 text-center">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--fg-muted)]">Approach</span>
          <SplitReveal
            text="The plot before the post."
            className="font-display font-black uppercase leading-[0.95] text-[clamp(2rem,6vw,4.2rem)] mt-2"
          />
        </div>

        <div className="relative flex-1 flex items-center justify-center px-6 min-h-0">
          <ArrowLeft className="hidden sm:block absolute left-[8%] text-[var(--fg-muted)]" size={28} strokeWidth={1.5} />
          <ArrowRight className="hidden sm:block absolute right-[8%] text-[var(--fg-muted)]" size={28} strokeWidth={1.5} />

          <div className="relative w-[84vw] sm:w-[420px] aspect-square max-h-[52vh]">
            {STEPS.map((s, i) => {
              const StepIcon = s.icon;
              return (
                <div
                  key={s.n}
                  ref={(el) => (cardsRef.current[i] = el)}
                  className="absolute inset-0 rounded-[2rem] p-8 sm:p-10 flex flex-col items-center justify-center gap-5 text-center shadow-2xl will-change-transform border border-black/10 dark:border-white/10"
                  style={{ background: s.bg, color: s.fg }}
                >
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center"
                    style={{ background: "color-mix(in srgb, currentColor 15%, transparent)" }}
                  >
                    <StepIcon size={32} strokeWidth={1.4} />
                  </div>
                  <h3 className="font-display font-black uppercase text-3xl sm:text-4xl">{s.title}</h3>
                  <p className="opacity-75 text-sm sm:text-base max-w-[26ch]">{s.desc}</p>
                  <span className="font-mono text-sm opacity-60 mt-2">{s.n} /05</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="px-6 max-w-7xl mx-auto w-full mt-8">
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--fg-muted)] mb-4">
            Keep scrolling to swipe through the process
          </p>
          <div className="h-[3px] w-full rounded-full overflow-hidden" style={{ background: "var(--line)" }}>
            <div ref={barRef} className="h-full" style={{ width: "0%", background: "var(--color-blue, #0066ff)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
