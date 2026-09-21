import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-sm">
              <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
              BIKE<span className="text-amber-500">CHAIN</span>
            </span>
          </Link>

          {/* Simple Navigation */}
          <div className="flex items-center gap-6 text-xs font-semibold">
            <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Home
            </Link>
            <Link to="/bikes" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Find a Bike
            </Link>
            <Link to="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              About
            </Link>
          </div>
        </div>

        {/* Academic Note */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            BikeChain is an academic BCT project for motorcycle record verification. Demonstration prototype.
          </p>
          <p className="font-mono text-[11px]">
            © 2026 BikeChain
          </p>
        </div>
      </div>
    </footer>
  );
}
