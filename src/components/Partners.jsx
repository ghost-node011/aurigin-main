import logoLockup from "../assets/aurigin-logo-lockup.png";
import Reveal from "./Reveal";

export default function Partners() {
  return (
    <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
      <Reveal
        className="w-full flex items-center justify-center py-20 sm:py-28"
        style={{ background: "var(--color-blue, #1a34e0)" }}
      >
        <img
          src={logoLockup}
          alt="Aurigin Media"
          className="w-[42%] max-w-[300px] min-w-[140px] h-auto select-none pointer-events-none"
          draggable="false"
        />
      </Reveal>
    </section>
  );
}
