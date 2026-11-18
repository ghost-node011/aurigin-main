import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Globe } from "lucide-react";

function getColumns() {
  if (window.matchMedia("(min-width: 1024px)").matches) return 5;
  if (window.matchMedia("(min-width: 640px)").matches) return 3;
  return 2;
}

function useColumns() {
  const [columns, setColumns] = useState(getColumns);

  useEffect(() => {
    const update = () => setColumns(getColumns());
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return columns;
}

// Columns that hold a project in a given checkerboard row.
function checkerSlots(row, columns) {
  const slots = [];
  for (let column = 0; column < columns; column++) {
    if ((row + column) % 2 === 0) slots.push(column);
  }
  return slots;
}

// Slots for the final row when fewer projects are left than the row normally holds.
// Prefer the other checkerboard parity if it fits exactly (keeps the pattern symmetric),
// otherwise centre the leftover projects so nothing sits alone at an edge.
function lastRowSlots(row, columns, remaining) {
  const alternate = checkerSlots(row + 1, columns);
  if (alternate.length === remaining) return alternate;
  const start = Math.floor((columns - remaining) / 2);
  return Array.from({ length: remaining }, (_, i) => start + i);
}

// Lays projects out on a checkerboard; the remaining cells show a dot.
function buildCells(projects, columns) {
  const cells = [];
  let placed = 0;
  for (let row = 0; placed < projects.length; row++) {
    const remaining = projects.length - placed;
    let slots = checkerSlots(row, columns);
    if (remaining < slots.length) slots = lastRowSlots(row, columns, remaining);

    for (let column = 0; column < columns; column++) {
      cells.push(slots.includes(column) ? projects[placed++] : null);
    }
  }
  return cells;
}

const PRESS_DURATION = 380; // ms — matches the portfolio-card-press animation in index.css

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function ProjectCard({ project, onOpen, order }) {
  const cover = project.slides[0];
  const [pressed, setPressed] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  // Play the outline pulse, then open the slides once it has been seen.
  const handleOpen = () => {
    if (prefersReducedMotion()) {
      onOpen(project);
      return;
    }
    setPressed(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setPressed(false);
      onOpen(project);
    }, PRESS_DURATION);
  };

  return (
    <article
      className={`portfolio-card group relative flex h-full flex-col overflow-hidden rounded-2xl border p-2 ${
        pressed ? "is-pressed" : ""
      }`}
      style={{ "--i": order }}
    >
      <h3 className="flex min-h-12 items-center justify-center px-1 text-center font-mono text-[11px] font-medium uppercase tracking-wider sm:text-xs">
        {/* Stretched button: the whole card opens the viewer. */}
        <button
          type="button"
          onClick={handleOpen}
          className="uppercase after:absolute after:inset-0 after:z-10 after:rounded-2xl after:cursor-pointer focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-[var(--color-blue)]"
        >
          {project.name}
        </button>
      </h3>
      <div className="portfolio-card__thumb aspect-video overflow-hidden rounded-lg">
        <img
          src={cover.thumb}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-wider text-[var(--fg-muted)] sm:text-[11px]">
        {project.category}
      </p>
      {project.website && (
        // Sits above the card's stretched button so it opens the site instead of the viewer.
        <a
          href={project.website}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-20 mx-auto mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--color-blue)] transition-colors hover:bg-[var(--color-blue)] hover:text-white sm:text-[11px]"
        >
          <Globe size={12} aria-hidden="true" />
          Visit website
        </a>
      )}
      <div className="mt-auto flex items-center justify-between gap-2 px-1 pb-1 pt-5 font-mono text-[10px] uppercase text-[var(--fg-muted)] sm:text-[11px]">
        <span>{project.group}</span>
        <span>({project.number})</span>
        <ArrowUpRight
          size={14}
          aria-hidden="true"
          className="portfolio-card__arrow transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
    </article>
  );
}

export default function ProjectGrid({ projects, onOpen }) {
  const columns = useColumns();
  const cells = buildCells(projects, columns);

  return (
    <div
      className="portfolio-grid grid"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {cells.map((project, index) =>
        project ? (
          <ProjectCard key={project.name} project={project} onOpen={onOpen} order={index} />
        ) : (
          <div
            key={`empty-${index}`}
            aria-hidden="true"
            className="portfolio-grid__cell flex items-center justify-center"
            style={{ "--i": index }}
          >
            <span className="portfolio-grid__dot h-1 w-1" />
          </div>
        ),
      )}
    </div>
  );
}
