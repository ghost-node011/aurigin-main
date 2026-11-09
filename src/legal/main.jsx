import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import { ThemeProvider } from "../lib/ThemeContext";
import Terms from "./Terms";
import Privacy from "./Privacy";

const PAGES = { terms: Terms, privacy: Privacy };
const root = document.getElementById("root");
const Page = PAGES[root.dataset.page];

createRoot(root).render(
  <StrictMode>
    <ThemeProvider>
      <Page />
    </ThemeProvider>
  </StrictMode>,
);
