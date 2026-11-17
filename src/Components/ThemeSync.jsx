import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ThemeSync() {
  const mode = useSelector((state) => state.theme.mode);
  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    document.documentElement.style.colorScheme = mode;
    try { localStorage.setItem("devtinder-theme", mode); } catch { /* Storage can be unavailable in private browsing. */ }
  }, [mode]);
  return null;
}
