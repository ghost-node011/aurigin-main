import { useCallback, useState } from "react";
import { ChevronDown } from "lucide-react";
import { GROUPS, PROJECTS } from "./projects";
import ProjectGrid from "./ProjectGrid";
import ProjectList from "./ProjectList";
import SlideViewer from "./SlideViewer";

const ALL = "All";
const VIEWS = ["grid", "list"];
const BIG_TEXT = "font-display text-[clamp(2.25rem,6vw,5.5rem)] font-medium leading-none tracking-tight";

export default function ProjectIndex() {
  const [group, setGroup] = useState(ALL);
  const [view, setView] = useState("grid");
  const [openProject, setOpenProject] = useState(null);
  const closeViewer = useCallback(() => setOpenProject(null), []);

  const projects = group === ALL ? PROJECTS : PROJECTS.filter((p) => p.group === group);

  return (
    <section className="px-2 py-8 sm:px-4 sm:py-10" aria-label="Projects">
      <div className="mb-8 flex items-center justify-between gap-4 px-2">
        {/* The native select sits invisibly over the heading so it stays keyboard and screen-reader friendly. */}
        <div className="relative inline-flex items-center gap-2 rounded-lg focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-[var(--color-blue)]">
          <h2 className={BIG_TEXT}>{group}</h2>
          <ChevronDown size={22} aria-hidden="true" />
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

        <div className="flex gap-4 font-mono text-xs uppercase tracking-wider">
          {VIEWS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setView(option)}
              aria-pressed={view === option}
              className={`uppercase transition-opacity hover:opacity-100 ${view === option ? "" : "opacity-40"}`}
            >
              {option}
            </button>
          ))}
        </div>

        <p className={BIG_TEXT}>{projects.length}</p>
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
