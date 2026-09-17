import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Gauge, Calendar, ArrowRight, UserCheck } from 'lucide-react';
import VerificationBadge from './VerificationBadge';
import { formatOdometer, truncateAddress } from '../utils/formatters';

export default function BikeCard({ bike }) {
  if (!bike) return null;

  return (
    <div className="group relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 hover:border-amber-500/50 dark:hover:border-amber-500/40 shadow-sm hover:shadow-glow-amber/20 transition-all duration-300 overflow-hidden flex flex-col">
      {/* Image Container with Fixed Aspect Ratio */}
      <div className="relative w-full h-48 sm:h-52 bg-slate-950 overflow-hidden">
        <img
          src={bike.image}
          alt={`${bike.manufacturer} ${bike.model}`}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
        
        {/* Verification Status Badge Top-Right */}
        <div className="absolute top-3 right-3">
          <VerificationBadge status={bike.status} size="sm" />
        </div>

        {/* BikeChain ID Top-Left */}
        <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-amber-400 font-mono text-[11px] font-bold px-2.5 py-1 rounded-lg">
          {bike.id}
        </div>

        {/* Bottom Banner on Image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <span className="font-mono bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded text-[11px]">
            {bike.engineCapacity}
          </span>
          <span className="flex items-center gap-1 font-mono text-slate-300">
            <Gauge className="w-3.5 h-3.5 text-amber-400" />
            {formatOdometer(bike.currentOdometer, bike.unit)}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span className="font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              {bike.manufacturer}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {bike.year}
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
            {bike.model}
          </h3>

          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-slate-400" />
              {bike.currentOwner?.holderType || "Private Owner"}
            </span>
            <span className="font-mono text-[11px] text-slate-600 dark:text-slate-400">
              {truncateAddress(bike.currentOwner?.walletAddress)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center gap-2">
          <Link
            to={`/verify/${bike.id}`}
            className="flex-1 text-center py-2 px-3 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
          >
            Quick Verify
          </Link>
          <Link
            to={`/bike/${bike.id}`}
            className="flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-slate-950 transition-colors shadow-sm"
          >
            Full Profile
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
