import Marquee from "./Marquee";

const ITEMS = [
  "Brand Strategy",
  "Identity Design",
  "Content & Social",
  "Digital Experiences",
  "Media & Growth",
  "Cultural Impact",
];

export default function MarqueeStrip() {
  return (
    <div
      className="py-5 border-y overflow-hidden"
      style={{ background: "var(--fg)", color: "var(--bg)", borderColor: "var(--line)" }}
    >
      <Marquee
        items={ITEMS.map((item) => (
          <span key={item} className="flex items-center gap-10 px-5">
            <span className="font-display font-black uppercase text-xl sm:text-2xl whitespace-nowrap">
              {item}
            </span>
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: "var(--color-orange)" }} />
          </span>
        ))}
      />
    </div>
  );
}
