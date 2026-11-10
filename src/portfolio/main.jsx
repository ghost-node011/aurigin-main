import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import { SmoothScrollProvider } from "../lib/SmoothScroll";
import { ThemeProvider } from "../lib/ThemeContext";
import Portfolio from "./Portfolio";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <SmoothScrollProvider>
        <Portfolio />
      </SmoothScrollProvider>
    </ThemeProvider>
  </StrictMode>,
);
