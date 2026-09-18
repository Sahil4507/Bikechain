import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, color = "tech" }) {
  const colorStyles = {
    tech: "bg-tech-500/10 text-tech-600 dark:text-tech-400 border-tech-500/20",
    emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    slate: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20",
  }[color] || "bg-tech-500/10 text-tech-600 dark:text-tech-400 border-tech-500/20";

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-subtle hover:border-slate-300 dark:hover:border-slate-700 transition-all">
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {title}
          </p>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
            {value}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl border ${colorStyles} shrink-0`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
}
