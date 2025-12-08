"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed top-6 right-6 z-50 w-14 h-14 rounded-full bg-white dark:bg-slate-800 border-4 border-purple-500 shadow-lg" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-slate-800 border-4 border-purple-500 shadow-lg hover:shadow-xl transition-all hover:scale-110 active:scale-95"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-8 h-8 text-yellow-500" />
      ) : (
        <Moon className="w-8 h-8 text-purple-600" />
      )}
    </button>
  );
}
