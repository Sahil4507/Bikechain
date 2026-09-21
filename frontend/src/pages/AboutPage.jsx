import React from 'react';
import { ArrowDown, ShieldCheck, Link as LinkIcon, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Title */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>About BikeChain</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          How BikeChain Works
        </h1>
      </div>

      {/* Core Explanation */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Digital Vehicle Record System
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          BikeChain is being developed to maintain a tamper-resistant history of motorcycle records. Important ownership events and document hashes can be recorded through a Solidity smart contract, while large documents remain off-chain. A document can later be hashed again and compared with its recorded hash to check whether it has changed.
        </p>
      </div>

      {/* Very Simple Diagram */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-center">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Verification Flow Diagram
        </h3>

        <div className="flex flex-col items-center space-y-3 max-w-xs mx-auto text-sm font-semibold">
          <div className="w-full py-3 px-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-sm">
            Motorcycle Record
          </div>
          
          <ArrowDown className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />

          <div className="w-full py-3 px-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-sm">
            Document Hash
          </div>

          <ArrowDown className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />

          <div className="w-full py-3 px-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-sm">
            Smart Contract
          </div>

          <ArrowDown className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />

          <div className="w-full py-3 px-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 shadow-sm font-bold">
            Blockchain
          </div>
        </div>
      </div>

      {/* Small Notice */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 leading-relaxed space-y-2">
        <p className="font-medium text-slate-700 dark:text-slate-300">
          Note:
        </p>
        <p>
          Blockchain integration is under development. The current demo may use sample records and does not necessarily perform live blockchain transactions.
        </p>
      </div>

      {/* Call to Action: Back to Find a Bike */}
      <div className="text-center pt-2">
        <Link
          to="/bikes"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Find a Motorcycle Record</span>
        </Link>
      </div>

    </div>
  );
}
