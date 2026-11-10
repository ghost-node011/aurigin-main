import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

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

// Lays projects out on a checkerboard; the remaining cells show a dot.
function buildCells(projects, columns) {
  const cells = [];
  let placed = 0;
  for (let row = 0; placed < projects.length; row++) {
    for (let column = 0; column < columns; column++) {
      const isProjectCell = (row + column) % 2 === 0 && placed < projects.length;
      cells.push(isProjectCell ? projects[placed++] : null);
    }
  }
  return cells;
}

function ProjectCard({ project, onOpen }) {
  const cover = project.slides[0];

  return (
    <article
      className="group relative flex h-full flex-col rounded-2xl border p-2 transition-colors hover:border-[var(--color-blue)]"
      style={{ background: "var(--card)", borderColor: "var(--line)" }}
    >
      <h3 className="flex min-h-12 items-center justify-center px-1 text-center font-mono text-[11px] font-medium uppercase tracking-wider sm:text-xs">
        {/* Stretched button: the whole card opens the viewer. */}
        <button
          type="button"
          onClick={() => onOpen(project)}
          className="uppercase after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-[var(--color-blue)]"
        >
          {project.name}
        </button>
      </h3>
      <div className="aspect-video overflow-hidden rounded-lg">
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
      <div className="mt-auto flex items-center justify-between gap-2 px-1 pb-1 pt-5 font-mono text-[10px] uppercase text-[var(--fg-muted)] sm:text-[11px]">
        <span>{project.group}</span>
        <span>({project.number})</span>
        <ArrowUpRight size={14} aria-hidden="true" className="text-[var(--fg)]" />
      </div>
    </article>
  );
}

export default function ProjectGrid({ projects, onOpen }) {
  const columns = useColumns();
  const cells = buildCells(projects, columns);

  return (
    <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
      {cells.map((project, index) =>
        project ? (
          <ProjectCard key={project.name} project={project} onOpen={onOpen} />
        ) : (
          <div key={`empty-${index}`} aria-hidden="true" className="flex items-center justify-center">
            <span className="h-1 w-1 bg-[var(--fg)]" />
          </div>
        ),
      )}
    </div>
  );
}
