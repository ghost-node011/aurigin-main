import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import { ThemeProvider } from "../lib/ThemeContext";
import ContactPage from "./ContactPage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <ContactPage />
    </ThemeProvider>
  </StrictMode>,
);
