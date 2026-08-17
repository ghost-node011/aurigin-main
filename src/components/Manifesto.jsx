import Reveal from "./Reveal";

const STATEMENTS = [
  {
    n: "01",
    muted: "Trends chase attention.",
    bold: "Strategy earns recall.",
    align: "left",
  },
  {
    n: "02",
    muted: "Everyone posts.",
    bold: "Very few build culture.",
    align: "right",
  },
  {
    n: "03",
    muted: "Good brands get seen.",
    bold: "Great brands get remembered.",
    align: "left",
  },
];

export default function Manifesto() {
  return (
    <section className="relative py-28 sm:py-36 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-20 sm:gap-28">
        {STATEMENTS.map((s) => (
          <Reveal
            as="div"
            key={s.n}
            stagger={0.12}
            className={`flex flex-col gap-2 ${s.align === "right" ? "items-end text-right" : "items-start text-left"}`}
          >
            <span className="font-mono text-xs tracking-[0.3em] text-[var(--fg-muted)]">{s.n} /03</span>
            <h2 className="font-display font-black uppercase leading-[0.95] text-[clamp(1.8rem,6vw,4.5rem)] text-[var(--fg-muted)]">
              {s.muted}
            </h2>
            <h2
              className="font-display font-black uppercase leading-[0.95] text-[clamp(1.8rem,6vw,4.5rem)]"
              style={{ color: "var(--accent)" }}
            >
              {s.bold}
            </h2>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
