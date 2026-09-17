import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useAppTheme } from '../hooks/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useAppTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="relative p-2 rounded-lg transition-all duration-200 border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-sm"
      title={isDark ? "Activate Light Mode" : "Activate Dark Mode"}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-slate-700 transition-transform hover:-rotate-12" />
      )}
    </button>
  );
}
