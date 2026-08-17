export default function Marquee({ items, className = "", slow = false, gap = "gap-10" }) {
  return (
    <div className={`overflow-hidden marquee-paused ${className}`}>
      <div className={`marquee-track ${slow ? "slow" : ""} ${gap}`}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center shrink-0">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
