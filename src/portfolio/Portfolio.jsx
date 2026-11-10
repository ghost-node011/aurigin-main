import PageShell from "../components/PageShell";
import PortfolioHero from "./PortfolioHero";
import ProjectIndex from "./ProjectIndex";

export default function Portfolio() {
  return (
    <PageShell width="max-w-none">
      <main className="flex-1">
        <PortfolioHero />
        <ProjectIndex />
      </main>
    </PageShell>
  );
}
