import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Layers, FileText, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand & Concept */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-sm">
                <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                BIKE<span className="text-amber-500">CHAIN</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 max-w-md">
              A verifiable digital record system for motorcycles. Preserving ownership sequence, certified service history, and document integrity through cryptographic hashing and smart contract auditability.
            </p>
            <div className="text-xs font-semibold text-slate-900 dark:text-white pt-1">
              "Every Bike Has a Story. Keep It on the Chain."
            </div>
          </div>

          {/* Quick Platform Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Platform Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/verify" className="hover:text-tech-600 dark:hover:text-tech-400 transition-colors">
                  Verify a Motorcycle
                </Link>
              </li>
              <li>
                <Link to="/bikes" className="hover:text-tech-600 dark:hover:text-tech-400 transition-colors">
                  Motorcycle Records Catalog
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-tech-600 dark:hover:text-tech-400 transition-colors">
                  Dashboard & Roles
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-tech-600 dark:hover:text-tech-400 transition-colors">
                  How Blockchain Works (Viva Guide)
                </Link>
              </li>
            </ul>
          </div>

          {/* What is Stored Where summary */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              What is Stored Where?
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span><strong>On-Chain:</strong> Hashes, IDs, Transfers</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                <FileText className="w-3.5 h-3.5 text-tech-500 shrink-0" />
                <span><strong>Off-Chain:</strong> PDFs, Invoices, Media</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                <Layers className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span><strong>Contract:</strong> AccessControl (Solidity)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Academic Project Honesty Disclaimer */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8">
          <ShieldAlert className="w-5 h-5 text-tech-600 dark:text-tech-400 shrink-0" />
          <div className="leading-relaxed">
            <strong className="text-slate-900 dark:text-white">Academic Capstone Prototype Notice:</strong> BikeChain is developed for academic evaluation (Blockchain Technology viva). Vehicle records are demonstration instances. Blockchain components represent Phase 3 smart contract models. No government transport authority or live commercial database integration is claimed.
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © 2026 BikeChain Project. Open-source under MIT License.
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span>Phase 1 Frontend Verified</span>
            <span>•</span>
            <span className="text-tech-600 dark:text-tech-400 font-semibold">Ready for BCT Viva</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
