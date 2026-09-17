import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ExternalLink, Code2, Database, Layers, ShieldAlert } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand & Concept */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                BIKE<span className="text-amber-500">CHAIN</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 max-w-md">
              A decentralized, tamper-resistant motorcycle lifecycle & history verification platform. 
              Recording ownership provenance, authorized service logs, odometer readings, and repair transparency on the blockchain.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-200 dark:bg-slate-800 text-[11px] font-mono text-slate-700 dark:text-slate-300">
                <Code2 className="w-3.5 h-3.5 text-amber-500" /> Solidity & Hardhat
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-200 dark:bg-slate-800 text-[11px] font-mono text-slate-700 dark:text-slate-300">
                <Layers className="w-3.5 h-3.5 text-cyan-500" /> Ethereum EVM
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link to="/verify" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                  Verify Motorcycle
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                  Owner Dashboard
                </Link>
              </li>
              <li>
                <Link to="/verify/BC-2026-RE-0001" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                  Sample Record (RE Guerrilla 450)
                </Link>
              </li>
            </ul>
          </div>

          {/* BCT Academic Project Pillars */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              BCT Viva Concepts
            </h4>
            <ul className="space-y-2 text-xs font-mono text-slate-500 dark:text-slate-400">
              <li>• SHA-256 Off-Chain Hashing</li>
              <li>• Role-Based Access (RBAC)</li>
              <li>• Immutability & Provenance</li>
              <li>• Smart Contract State Logs</li>
              <li>• Web3 Wallet Signatures</li>
            </ul>
          </div>

        </div>

        {/* Prototype Honesty Notice */}
        <div className="p-4 rounded-xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 text-xs text-slate-600 dark:text-slate-300 flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8">
          <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0" />
          <div className="leading-relaxed">
            <strong className="text-amber-600 dark:text-amber-400">Academic Prototype Notice:</strong> BikeChain is developed for academic evaluation and portfolio demonstration. All testnet records and sample vehicles are simulated demonstration instances. No claim of government transport authority, vehicle manufacturer, or insurer endorsement is made.
          </div>
        </div>

        {/* Copyright & Meta */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © 2026 BikeChain Project. Open-source under MIT License.
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono">v1.0.0-phase1-ui</span>
            <span>•</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Ready for Phase 2 API</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
