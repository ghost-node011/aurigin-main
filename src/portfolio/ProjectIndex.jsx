import { useCallback, useState } from "react";
import { ChevronDown, LayoutGrid, List } from "lucide-react";
import { GROUPS, PROJECTS } from "./projects";
import ProjectGrid from "./ProjectGrid";
import ProjectList from "./ProjectList";
import SlideViewer from "./SlideViewer";

const ALL = "All";
const VIEWS = [
  { id: "grid", label: "Grid", icon: LayoutGrid },
  { id: "list", label: "List", icon: List },
];
const BIG_TEXT =
  "font-display text-[clamp(2.25rem,6vw,5rem)] font-bold uppercase leading-none tracking-tight text-[#f3ecda]";
const LABEL =
  "block font-mono text-[10px] uppercase tracking-[0.25em] text-[#f3ecda]/50 sm:text-[11px]";

export default function ProjectIndex() {
  const [group, setGroup] = useState(ALL);
  const [view, setView] = useState("grid");
  const [openProject, setOpenProject] = useState(null);
  const closeViewer = useCallback(() => setOpenProject(null), []);

  const projects = group === ALL ? PROJECTS : PROJECTS.filter((p) => p.group === group);

  return (
    <section className="px-2 py-8 sm:px-4 sm:py-10" aria-label="Projects">
      {/* Toolbar — same black panel as the project grid so the two read as one unit */}
      <div className="portfolio-toolbar mb-1.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-5 px-5 py-5 sm:px-7 sm:py-6">
        {/* Filter. The native select sits invisibly over the heading so it stays keyboard and screen-reader friendly. */}
        <div>
          <span className={LABEL}>Showing</span>
          <div className="group relative mt-1 inline-flex items-center gap-3 rounded-lg has-[select:focus-visible]:outline-2 has-[select:focus-visible]:outline-offset-4 has-[select:focus-visible]:outline-[var(--color-yellow)]">
            <h2 className={BIG_TEXT}>{group}</h2>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-yellow)] text-[#0b0b0c] transition-transform duration-200 group-hover:translate-y-0.5 sm:h-10 sm:w-10">
              <ChevronDown size={20} strokeWidth={2.5} aria-hidden="true" />
            </span>
            <select
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              aria-label="Filter projects"
              className="absolute inset-0 cursor-pointer opacity-0"
            >
              {[ALL, ...GROUPS].map((option) => (
                // Explicit colours: the browser draws this menu on white, whatever the page theme.
                <option key={option} value={option} className="bg-white text-[#0b0b0c]">
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid / list switch */}
        <div
          role="group"
          aria-label="Layout"
          className="order-last flex w-full rounded-full border border-white/15 p-1 sm:order-none sm:w-auto"
        >
          {VIEWS.map(({ id, label, icon: Icon }) => {
            const active = view === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setView(id)}
                aria-pressed={active}
                className={`flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-2 font-mono text-xs font-semibold uppercase tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-yellow)] sm:flex-none ${
                  active
                    ? "bg-[var(--color-yellow)] text-[#0b0b0c]"
                    : "text-[#f3ecda]/60 hover:text-[#f3ecda]"
                }`}
              >
                <Icon size={14} strokeWidth={2.25} aria-hidden="true" />
                {label}
              </button>
            );
          })}
        </div>

        {/* Count */}
        <div className="text-right">
          <span className={LABEL}>Projects</span>
          <p className={`${BIG_TEXT} mt-1`} aria-live="polite">
            {String(projects.length).padStart(2, "0")}
          </p>
        </div>
      </div>

      {view === "grid" ? (
        <ProjectGrid projects={projects} onOpen={setOpenProject} />
      ) : (
        <ProjectList projects={projects} onOpen={setOpenProject} />
      )}

      {openProject && (
        <SlideViewer key={openProject.name} project={openProject} onClose={closeViewer} />
      )}
    </section>
  );
}
