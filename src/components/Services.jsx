import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import SplitReveal from "./SplitReveal";
import Reveal from "./Reveal";
import { useLenis } from "../lib/SmoothScroll";

const SERVICES = [
  {
    number: "01",
    title: "Websites & Digital Products",
    desc: "Websites designed to make enquiries easier.",
    points: ["Landing pages", "Portfolio websites", "Business websites"],
    ctaText: "Book a consultation",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    alt: "Modern architecture digital interface and website systems"
  },
  {
    number: "02",
    title: "Custom Software & Applications",
    desc: "Portals, dashboards and internal tools built around your workflow.",
    points: ["Client portals", "Dashboards", "Web/mobile applications"],
    ctaText: "Discuss your requirements",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    alt: "Custom analytics dashboards and workflow management tools"
  },
  {
    number: "03",
    title: "Branding & Design",
    desc: "A clear identity that makes your business recognisable and trusted.",
    points: ["Brand strategy", "Visual identity", "Collateral and presentations"],
    ctaText: "Book a consultation",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    alt: "Architectural visual brand identity and design collateral"
  },
  {
    number: "04",
    title: "Content & Social",
    desc: "Turn your work and expertise into content people remember.",
    points: ["Social media", "Reels and carousels", "Copy and case studies"],
    ctaText: "Book a consultation",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
    alt: "Architectural cinematography, photography and social storytelling"
  },
  {
    number: "05",
    title: "AI & Automation",
    desc: "Connect enquiries, bookings and follow-ups with human handoff.",
    points: ["Lead routing", "Booking workflows", "AI enquiry assistants"],
    ctaText: "Discuss your requirements",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    alt: "AI systems and automated built-environment workflows"
  },
  {
    number: "06",
    title: "SEO & Advertising",
    desc: "Help the right people discover your business and take action.",
    points: ["Local SEO", "Google/Meta ads", "Lead campaigns"],
    ctaText: "Book a consultation",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    alt: "Commercial built-environment visibility and high-intent advertising"
  }
];

export default function Services() {
  // activeIndex is null by default so all 6 cards appear equally narrow on desktop initially
  const [activeIndex, setActiveIndex] = useState(null);
  const [mobileExpandedIndex, setMobileExpandedIndex] = useState(0);
  const lenisRef = useLenis();

  // CTA navigation smoothly to contact
  const handleCtaClick = (e) => {
    e.preventDefault();
    const target = document.querySelector("#contact");
    if (target && lenisRef?.current) {
      lenisRef.current.scrollTo(target, { offset: -60, duration: 1.2 });
    } else if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCardSelect = (index) => {
    setActiveIndex(index);
  };

  return (
    <section
      id="services"
      className="relative py-28 sm:py-36 border-t overflow-hidden select-none"
      style={{ borderColor: "var(--line)" }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--color-blue)] font-semibold inline-block mb-3">
            OUR CAPABILITIES
          </span>
          <SplitReveal
            text="Growth, creativity and technology — built for the built environment."
            className="font-display font-black uppercase leading-[0.95] text-[clamp(2.1rem,5vw,3.8rem)] text-[var(--fg)]"
          />
          <Reveal className="text-[var(--fg-muted)] text-base sm:text-lg mt-5 leading-relaxed max-w-2xl font-normal">
            From brand visibility to websites, automation and business systems, Aurigin helps
            built-environment businesses grow with more clarity and less manual work.
          </Reveal>
        </div>

        {/* ========================================================
            DESKTOP LAYOUT (Full-width 6-card row, NO scroll/carousel)
            Default: All 6 cards are equal width and tall.
            Hover or Click: Selected card smoothly expands to ~48%
            while the other 5 cards shrink equally (~10.4% each).
            Number, image and service title remain visible on inactive cards.
           ======================================================== */}
        <div className="hidden lg:flex gap-3 xl:gap-4 h-[600px] w-full items-stretch">
          {SERVICES.map((service, idx) => {
            const isSelected = activeIndex === idx;

            // Sizing:
            // When none selected: all equal (flex: 1)
            // When a card is selected: active gets flex: 4.6 (~48%), inactive get flex: 1 (~10.4% each)
            const flexStyle =
              activeIndex === null
                ? "1 1 0%"
                : isSelected
                ? "4.6 1 0%"
                : "1 1 0%";

            return (
              <div
                key={service.number}
                onClick={() => handleCardSelect(idx)}
                onMouseEnter={() => handleCardSelect(idx)}
                role="button"
                tabIndex={0}
                aria-expanded={isSelected}
                aria-label={`${service.number} ${service.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCardSelect(idx);
                  }
                }}
                style={{
                  flex: flexStyle,
                  borderColor: isSelected ? "var(--color-blue)" : "var(--line)",
                  background: "#0c0d0e"
                }}
                className={`group relative rounded-3xl overflow-hidden border cursor-pointer transition-[flex,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blue)] ${
                  isSelected
                    ? "shadow-2xl shadow-black/40"
                    : "opacity-95 hover:opacity-100"
                }`}
              >
                {/* Full-Cover Background Image */}
                <img
                  src={service.image}
                  alt={service.alt}
                  loading="eager"
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${
                    isSelected ? "scale-105" : "group-hover:scale-105"
                  }`}
                />

                {/* Dark Bottom Gradient for Text Legibility */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isSelected
                      ? "bg-gradient-to-t from-black via-black/80 via-50% to-black/25"
                      : "bg-gradient-to-t from-black via-black/70 to-black/40 group-hover:bg-black/50"
                  }`}
                />

                {/* ----------------------------------------------------
                    INACTIVE CARD SPINE: Number & Vertical Service Title
                    Visible when card is not expanded so titles never get cut off!
                   ---------------------------------------------------- */}
                <div
                  className={`absolute inset-0 flex flex-col justify-between items-center p-4 xl:p-5 z-10 transition-opacity duration-300 pointer-events-none ${
                    isSelected ? "opacity-0 invisible" : "opacity-100 visible"
                  }`}
                >
                  {/* Top: Card Number Badge */}
                  <span className="font-mono text-xs tracking-widest text-[var(--color-yellow)] font-bold px-2 py-1 rounded-md bg-black/40 backdrop-blur-md border border-white/10">
                    {service.number}
                  </span>

                  {/* Center/Bottom: Vertical Title Spine (Editorial & 100% Readable) */}
                  <div className="flex-1 flex items-end justify-center pb-3">
                    <p
                      className="font-display font-bold uppercase text-xs xl:text-sm tracking-wider text-white whitespace-nowrap select-none opacity-90 group-hover:opacity-100 transition-opacity"
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)"
                      }}
                    >
                      {service.title}
                    </p>
                  </div>
                </div>

                {/* ----------------------------------------------------
                    ACTIVE / EXPANDED CARD CONTENT (Horizontal Layout)
                    Reveals: Number, Full Title, Description, 3 Points & CTA
                   ---------------------------------------------------- */}
                <div
                  className={`absolute inset-0 p-7 xl:p-8 flex flex-col justify-between z-10 transition-opacity duration-400 ${
                    isSelected
                      ? "opacity-100 visible pointer-events-auto"
                      : "opacity-0 invisible pointer-events-none"
                  }`}
                >
                  {/* Top Bar: Number & Active Tag */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-[0.2em] uppercase font-bold px-3 py-1.5 rounded-full bg-[var(--color-yellow)] text-black">
                      {service.number}
                    </span>
                    <span className="font-mono text-[11px] tracking-wider uppercase text-white/80 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                      Selected
                    </span>
                  </div>

                  {/* Bottom: Title, Description, 3 Service Points & CTA */}
                  <div className="flex flex-col justify-end">
                    <h3 className="font-display font-black uppercase text-2xl xl:text-3xl text-white leading-tight">
                      {service.title}
                    </h3>

                    <p className="text-white/80 text-sm xl:text-base leading-relaxed mt-3 max-w-lg">
                      {service.desc}
                    </p>

                    {/* 3 Service Points */}
                    <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-white/15">
                      {service.points.map((point) => (
                        <span
                          key={point}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-white/95 bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-yellow)]" />
                          {point}
                        </span>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <div className="mt-6">
                      <a
                        href="#contact"
                        onClick={handleCtaClick}
                        data-cursor="link"
                        className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-xs font-display font-bold uppercase tracking-wider transition-all duration-200 group/btn"
                        style={{
                          backgroundColor: "var(--color-blue)",
                          color: "#ffffff"
                        }}
                      >
                        <span>{service.ctaText}</span>
                        <ArrowUpRight
                          size={16}
                          className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================
            MOBILE LAYOUT (< 1024px)
            Swipeable stack / slider with peek of the next card.
            Tapping a card expands its details below the image.
           ======================================================== */}
        <div className="lg:hidden">
          <div
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none -mx-6 px-6"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {SERVICES.map((service, idx) => {
              const isExpanded = mobileExpandedIndex === idx;

              return (
                <div
                  key={service.number}
                  className="w-[82vw] sm:w-[68vw] shrink-0 snap-start flex flex-col"
                >
                  {/* Card Container */}
                  <div
                    onClick={() =>
                      setMobileExpandedIndex(isExpanded ? null : idx)
                    }
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    aria-label={`${service.number} ${service.title}`}
                    className="relative h-[430px] rounded-3xl overflow-hidden border transition-all duration-300 active:scale-[0.99] focus:outline-none"
                    style={{
                      borderColor: isExpanded ? "var(--color-blue)" : "var(--line)",
                      background: "#0c0d0e"
                    }}
                  >
                    {/* Full-Cover Image */}
                    <img
                      src={service.image}
                      alt={service.alt}
                      loading={idx < 2 ? "eager" : "lazy"}
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Dark Bottom Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 via-45% to-black/25" />

                    {/* Top Number & Tap Cue */}
                    <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                      <span
                        className={`font-mono text-xs tracking-[0.2em] uppercase font-bold px-3 py-1.5 rounded-full backdrop-blur-md border ${
                          isExpanded
                            ? "bg-[var(--color-yellow)] text-black border-transparent"
                            : "bg-black/50 text-white/80 border-white/15"
                        }`}
                      >
                        {service.number}
                      </span>

                      <span className="font-mono text-[11px] uppercase tracking-wider text-white/70 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                        {isExpanded ? "Tap to close" : "Tap for details"}
                      </span>
                    </div>

                    {/* Card Bottom: Title & Short Description */}
                    <div className="absolute inset-x-0 bottom-0 p-6 z-10">
                      <h3 className="font-display font-extrabold uppercase text-white text-xl sm:text-2xl leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-white/80 text-sm mt-2 leading-relaxed">
                        {service.desc}
                      </p>
                    </div>
                  </div>

                  {/* Expanded Details Below Card */}
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isExpanded
                        ? "max-h-[280px] opacity-100 mt-3 p-5 rounded-2xl border"
                        : "max-h-0 opacity-0 mt-0 p-0 border-0 pointer-events-none"
                    }`}
                    style={{
                      borderColor: "var(--line)",
                      background: "var(--bg-alt)"
                    }}
                  >
                    <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-blue)] font-bold mb-3">
                      Service Scope
                    </p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {service.points.map((point) => (
                        <span
                          key={point}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--fg)] bg-[var(--bg)] border px-3 py-1.5 rounded-full"
                          style={{ borderColor: "var(--line)" }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-blue)]" />
                          {point}
                        </span>
                      ))}
                    </div>

                    <a
                      href="#contact"
                      onClick={handleCtaClick}
                      data-cursor="link"
                      className="inline-flex items-center justify-between w-full px-5 py-3 rounded-full text-xs font-display font-bold uppercase tracking-wider transition-all duration-200"
                      style={{
                        backgroundColor: "var(--color-blue)",
                        color: "#ffffff"
                      }}
                    >
                      <span>{service.ctaText}</span>
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile swipe cue */}
          <div className="mt-4 flex items-center justify-between text-xs font-mono text-[var(--fg-muted)] px-1">
            <span>Swipe for more capabilities →</span>
            <span>Tap card to view details</span>
          </div>
        </div>
      </div>
    </section>
  );
}
