import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldAlert } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-5">
      <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
        <ShieldAlert className="w-7 h-7" />
      </div>
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">404 — Page Not Found</h1>
      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        The route or motorcycle record you requested does not exist on the BikeChain network.
      </p>
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Home</span>
        </Link>
      </div>
    </div>
  );
}
