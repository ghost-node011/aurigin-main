import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Binoculars, Compass, Lightbulb, PenLine, Megaphone, Sparkles } from "lucide-react";
import SplitReveal from "./SplitReveal";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { n: "01", icon: Binoculars, title: "Discover", desc: "We dig deep: audience, market, culture, insight." },
  { n: "02", icon: Compass, title: "Direction", desc: "We find the truth and set a clear direction." },
  { n: "03", icon: Lightbulb, title: "Ideate", desc: "Big ideas. Bold angles. No safe bets." },
  { n: "04", icon: PenLine, title: "Create", desc: "Crafting stories, systems and experiences." },
  { n: "05", icon: Megaphone, title: "Launch", desc: "We launch, learn, and scale what works." },
];

export default function Process() {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const barRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;

      const setDistance = () => Math.max(track.scrollWidth - window.innerWidth + 96, 0);

      const tween = gsap.to(track, {
        x: () => -setDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.7,
          onUpdate: (self) => {
            if (barRef.current) barRef.current.style.width = `${self.progress * 100}%`;
          },
        },
      });

      return () => tween.scrollTrigger?.kill();
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={wrapRef} className="relative h-[420vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center border-t" style={{ borderColor: "var(--line)" }}>
        <div className="px-6 max-w-7xl mx-auto w-full mb-10">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--fg-muted)]">Approach</span>
          <SplitReveal
            text="The plot before the post."
            className="font-display font-black uppercase leading-[0.95] text-[clamp(2rem,6vw,4.2rem)] mt-2"
          />
        </div>

        <div ref={trackRef} className="flex gap-6 px-6 will-change-transform" style={{ width: "max-content" }}>
          {STEPS.map((s) => {
            const StepIcon = s.icon;
            return (
              <div
                key={s.n}
                className="w-[78vw] sm:w-[46vw] lg:w-[26vw] flex-shrink-0 rounded-3xl border p-8 sm:p-10 flex flex-col justify-between min-h-[46vh]"
                style={{ borderColor: "var(--line)", background: "var(--card)" }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-[var(--fg-muted)]">{s.n} /05</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--fg-muted)]">
                    {s.title}
                  </span>
                </div>

                <div className="flex-1 flex items-center justify-center py-6">
                  <div
                    className="w-[36%] aspect-square rounded-full flex items-center justify-center"
                    style={{ background: "color-mix(in srgb, var(--color-orange) 12%, transparent)" }}
                  >
                    <StepIcon className="w-[44%] h-[44%]" strokeWidth={1.4} style={{ color: "var(--color-orange)" }} />
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-black uppercase text-3xl sm:text-4xl mb-4">{s.title}</h3>
                  <p className="text-[var(--fg-muted)] text-base sm:text-lg">{s.desc}</p>
                </div>
              </div>
            );
          })}

          <div
            className="relative w-[78vw] sm:w-[46vw] lg:w-[26vw] flex-shrink-0 rounded-3xl flex flex-col justify-end items-start p-8 sm:p-10 min-h-[46vh] overflow-hidden"
            style={{ background: "var(--color-orange)" }}
          >
            <Sparkles
              className="absolute -top-[6%] -right-[10%] w-[60%] h-[60%] text-white/15"
              strokeWidth={1}
            />
            <p className="relative font-display font-black uppercase text-3xl sm:text-4xl text-white leading-tight">
              Impact <br /> that lasts.
            </p>
            <p className="relative text-white/80 mt-4">Different skills. One mission: cultural impact.</p>
          </div>
        </div>

        <div className="px-6 max-w-7xl mx-auto w-full mt-10">
          <div className="h-[3px] w-full rounded-full overflow-hidden" style={{ background: "var(--line)" }}>
            <div ref={barRef} className="h-full" style={{ width: "0%", background: "var(--color-orange)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
