import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, color = "amber" }) {
  const colorStyles = {
    amber: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    cyan: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
    emerald: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    indigo: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
  }[color] || "bg-amber-500/10 text-amber-500 border-amber-500/20";

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm transition-all hover:border-slate-300 dark:hover:border-slate-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {title}
          </p>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 font-mono">
            {value}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl border ${colorStyles}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
}
