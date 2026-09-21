import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User, ShieldCheck } from 'lucide-react';

export default function BikeCard({ bike }) {
  if (!bike) return null;

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 dark:hover:border-indigo-500/40 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div className="space-y-4">
        
        {/* Top Header: Brand, Displacement, and Production Year */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              {bike.manufacturer}
            </span>
            {bike.specifications?.engine?.displacement && (
              <>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {bike.specifications.engine.displacement}
                </span>
              </>
            )}
          </div>

          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs font-semibold">
            <Calendar className="w-3 h-3 text-slate-400" />
            <span>{bike.productionYear}</span>
          </span>
        </div>

        {/* Model Title and BikeChain ID */}
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {bike.model}
          </h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-400 font-mono text-xs font-bold">
              <span>ID:</span>
              <span>{bike.id}</span>
            </span>
            <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
              Plate: <strong className="text-slate-700 dark:text-slate-300">{bike.registrationNumber}</strong>
            </span>
          </div>
        </div>

        {/* Current Owner & Details */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>Current Owner</span>
            </span>
            <span className="font-semibold text-slate-900 dark:text-white">
              {bike.currentOwner}
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer: Status & View Record Action */}
      <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{bike.status || 'Verified Record'}</span>
        </span>

        <Link
          to={`/bike/${bike.id}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-indigo-600 dark:bg-slate-100 dark:hover:bg-indigo-600 dark:hover:text-white text-white dark:text-slate-900 text-xs font-bold transition-all shadow-sm"
        >
          <span>View Record</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
