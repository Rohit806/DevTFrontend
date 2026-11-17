import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/themeSlice";

export default function ThemeToggle({ className = "", compact = false }) {
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const next = theme === "light" ? "dark" : "light";
  return <button
    type="button"
    onClick={() => dispatch(toggleTheme())}
    aria-label={`Switch to ${next} theme`}
    title={`Switch to ${next} theme`}
    className={`theme-toggle flex h-10 items-center gap-2 rounded-full border border-stone-200 bg-white px-3 text-sm font-semibold text-stone-600 transition hover:border-rose-300 hover:text-rose-600 ${className}`}
  >
    <span aria-hidden="true" className="text-base">{theme === "light" ? "☾" : "☀"}</span>
    <span className={compact ? "hidden sm:inline" : ""}>{theme === "light" ? "Dark theme" : "Light theme"}</span>
  </button>;
}
