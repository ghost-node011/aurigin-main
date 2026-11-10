import { ArrowUpRight } from "lucide-react";

export default function ProjectList({ projects, onOpen }) {
  return (
    <ul className="border-t px-2" style={{ borderColor: "var(--line)" }}>
      {projects.map((project) => (
        <li
          key={project.name}
          className="group relative grid grid-cols-[3rem_1fr_auto] items-baseline gap-x-4 gap-y-1 border-b py-5 md:grid-cols-[4rem_1.5fr_1.2fr_0.8fr_auto]"
          style={{ borderColor: "var(--line)" }}
        >
          <span className="font-mono text-xs text-[var(--fg-muted)]">({project.number})</span>
          <h3 className="font-display text-xl font-medium tracking-tight sm:text-3xl">
            <button
              type="button"
              onClick={() => onOpen(project)}
              className="text-left transition-colors group-hover:text-[var(--color-blue)] after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-[var(--color-blue)]"
            >
              {project.name}
            </button>
          </h3>
          <ArrowUpRight size={18} aria-hidden="true" className="md:order-last" />
          <span className="col-start-2 font-mono text-[11px] uppercase tracking-wider text-[var(--fg-muted)] md:col-start-auto">
            {project.category}
          </span>
          <span className="col-start-2 font-mono text-[11px] uppercase tracking-wider text-[var(--fg-muted)] md:col-start-auto">
            {project.group}
          </span>
        </li>
      ))}
    </ul>
  );
}
