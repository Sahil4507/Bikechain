import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Gauge, ArrowRight, ShieldCheck, FileText, Layers } from 'lucide-react';
import VerificationBadge from './VerificationBadge';
import { formatOdometer } from '../utils/formatters';

export default function BikeCard({ bike }) {
  if (!bike) return null;

  return (
    <div className="group relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-tech-500/50 dark:hover:border-tech-500/40 shadow-subtle hover:shadow-elevated transition-all duration-200 flex flex-col justify-between p-6">
      
      {/* Top Meta Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-tech-600 dark:text-tech-400">
              {bike.manufacturer}
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {bike.category}
            </span>
          </div>
          
          {/* Prominent Production Year */}
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs font-semibold">
            <Calendar className="w-3 h-3 text-slate-400" />
            <span>Year: {bike.productionYear}</span>
          </span>
        </div>

        {/* Model Headline */}
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-tech-600 dark:group-hover:text-tech-400 transition-colors">
            {bike.model}
          </h3>
          {/* BikeChain ID */}
          <div className="mt-1 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
            <span className="text-slate-400 text-[10px]">ID:</span>
            <span>{bike.id}</span>
          </div>
        </div>

        {/* Structured Data Rows */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>Current Owner</span>
            </span>
            <span className="font-semibold text-slate-900 dark:text-white">
              {bike.currentOwner?.name || "Private Owner"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-slate-400" />
              <span>Odometer</span>
            </span>
            <span className="font-mono font-medium text-slate-800 dark:text-slate-200">
              {formatOdometer(bike.currentOdometer, bike.unit)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <span>Provenance Records</span>
            </span>
            <span className="text-slate-700 dark:text-slate-300 font-medium">
              {bike.ownershipHistory?.length || 0} Transfers • {bike.serviceHistory?.length || 0} Services
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Footer with Status & Action */}
      <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
        <VerificationBadge status={bike.status} size="sm" />

        <Link
          to={`/bike/${bike.id}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-tech-600 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-950 text-xs font-semibold transition-all shadow-sm group-hover:bg-tech-600"
        >
          <span>View Record</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

    </div>
  );
}
