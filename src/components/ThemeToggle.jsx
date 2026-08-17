import { Moon, Sun } from "lucide-react";
import { useTheme } from "../lib/ThemeContext";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      data-cursor="link"
      aria-label="Toggle color theme"
      className={`relative flex items-center w-14 h-8 rounded-full border border-[var(--line)] px-1 transition-colors ${className}`}
      style={{ background: isDark ? "var(--bg-alt)" : "var(--cream, #f3ecda)" }}
    >
      <span
        className="absolute top-1 left-1 w-6 h-6 rounded-full bg-[var(--fg)] flex items-center justify-center transition-transform duration-300"
        style={{ transform: isDark ? "translateX(24px)" : "translateX(0px)" }}
      >
        {isDark ? (
          <Moon size={13} className="text-[var(--bg)]" strokeWidth={2.5} />
        ) : (
          <Sun size={13} className="text-[var(--bg)]" strokeWidth={2.5} />
        )}
      </span>
    </button>
  );
}
