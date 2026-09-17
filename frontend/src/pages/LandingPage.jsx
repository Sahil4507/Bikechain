import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Search, 
  ArrowRight, 
  Database, 
  Lock, 
  CheckCircle2, 
  FileCode, 
  History, 
  Award, 
  Cpu, 
  FileCheck, 
  QrCode,
  Layers,
  Sparkles
} from 'lucide-react';
import BikeCard from '../components/BikeCard';
import StatCard from '../components/StatCard';
import { getAllMotorcycles } from '../data/mockBikes';

export default function LandingPage() {
  const [searchId, setSearchId] = useState('');
  const navigate = useNavigate();
  const demoBikes = getAllMotorcycles();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchId.trim()) {
      navigate(`/verify/${searchId.trim()}`);
    } else {
      navigate('/verify');
    }
  };

  return (
    <div className="space-y-20 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-200 dark:border-slate-800/60">
        {/* Subtle Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 dark:bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Prototype Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>Blockchain Technology (BCT) Academic Project</span>
              <span className="text-slate-400">•</span>
              <span className="text-amber-600 dark:text-amber-400 font-semibold">Sepolia EVM Ready</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Every Bike Has a Story.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600">
                Keep It on the Chain.
              </span>
            </h1>

            {/* Supporting Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Verify ownership, certified service history, parts replacements, and odometer readings through a tamper-resistant, blockchain-backed digital identity.
            </p>

            {/* Instant Verification Search Bar */}
            <div className="pt-4 max-w-xl mx-auto">
              <form onSubmit={handleSearch} className="relative flex items-center">
                <div className="absolute left-4 text-slate-400 pointer-events-none">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="Enter BikeChain ID (e.g. BC-2026-RE-0001)..."
                  className="w-full pl-12 pr-32 py-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 dark:focus:border-amber-500 shadow-lg text-sm font-mono transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95"
                >
                  <span>Verify</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Sample Quick Links */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-slate-500 dark:text-slate-400">
                <span>Try demo IDs:</span>
                {['BC-2026-RE-0001', 'BC-2025-KT-0042', 'BC-2024-BM-0108'].map(id => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => { setSearchId(id); navigate(`/verify/${id}`); }}
                    className="font-mono text-amber-600 dark:text-amber-400 hover:underline bg-amber-500/10 px-2 py-0.5 rounded text-[11px]"
                  >
                    {id}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <Link
                to="/verify"
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-sm flex items-center gap-2 shadow-md transition-all"
              >
                <Search className="w-4 h-4" />
                <span>Verify a Motorcycle</span>
              </Link>
              <a
                href="#how-it-works"
                className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm transition-all"
              >
                Explore Architecture
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATS OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Registered Bikes"
            value="148"
            subtitle="Genesis records minted"
            icon={Cpu}
            color="amber"
          />
          <StatCard
            title="Verified Records"
            value="1,240"
            subtitle="Tamper-proof event logs"
            icon={CheckCircle2}
            color="emerald"
          />
          <StatCard
            title="Ownership Transfers"
            value="84"
            subtitle="Traceable wallet handovers"
            icon={History}
            color="cyan"
          />
          <StatCard
            title="Certified Workshops"
            value="19"
            subtitle="Authorized service nodes"
            icon={Award}
            color="indigo"
          />
        </div>
      </section>

      {/* 3. WHAT IS BIKECHAIN & CORE CONCEPT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider">
              Immutable Provenance
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Solving Motorcycle Record Tampering & Odometer Fraud
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              In traditional secondary motorcycle markets, paper logbooks are easily forged, service records vanish, and odometer fraud runs unchecked. 
              <strong> BikeChain</strong> assigns every motorcycle an immutable digital passport anchored to Ethereum smart contracts.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Continuous Traceability</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    From the factory floor to consecutive owners, every ownership transfer is cryptographically signed and stored in chronological order.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500 shrink-0 mt-0.5">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Role-Based Integrity</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Only authorized dealerships can register bikes, and only certified service centers can append maintenance and parts records.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 shrink-0 mt-0.5">
                  <FileCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Off-Chain Hashes (SHA-256)</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Large invoices and inspection PDFs stay off-chain while their cryptographic hashes live on-chain, proving document authenticity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Concept Card */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-mono font-semibold text-amber-500">DIGITAL LIFECYCLE ARCHITECTURE</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">EVM State</span>
            </div>

            <div className="py-6 space-y-6 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-[10px] block">GENESIS</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">Manufacturer / Dealer</span>
                </div>
                <span className="text-emerald-500 text-[11px]">registerBike()</span>
              </div>

              <div className="flex justify-center -my-2 text-slate-400">
                ↓
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-[10px] block">OWNERSHIP TRANSFER</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">Owner #1 → Owner #2</span>
                </div>
                <span className="text-cyan-500 text-[11px]">transferOwnership()</span>
              </div>

              <div className="flex justify-center -my-2 text-slate-400">
                ↓
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-[10px] block">CERTIFIED WORKSHOP</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">Service & Odometer Log</span>
                </div>
                <span className="text-amber-500 text-[11px]">addServiceRecord()</span>
              </div>

              <div className="flex justify-center -my-2 text-slate-400">
                ↓
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-emerald-700 dark:text-emerald-400">
                <div>
                  <span className="text-emerald-600 dark:text-emerald-500 text-[10px] block">PUBLIC VERIFICATION</span>
                  <span className="font-bold">Instant QR & Web Verification</span>
                </div>
                <span className="text-xs font-bold">✓ VERIFIED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (STEP-BY-STEP) */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> Proven Workflow
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How BikeChain Works
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Four transparent steps preserving vehicle provenance from assembly line to secondary buyers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-mono font-bold text-sm">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Genesis Minting</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Authorized dealers register the motorcycle, recording its VIN hash, engine specs, and unique BikeChain ID on the smart contract.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-mono font-bold text-sm">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Ownership Provenance</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Whenever the motorcycle is sold, the registered owner transfers the on-chain digital title to the buyer's Ethereum address.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-mono font-bold text-sm">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Service Logging</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Certified service hubs record maintenance milestones, component serial hashes, and odometer values directly on-chain.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-mono font-bold text-sm">
              04
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Public Verification</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Anyone can scan the motorcycle's QR code or enter its BikeChain ID to verify genuine history without logging in.
            </p>
          </div>
        </div>
      </section>

      {/* 5. FEATURED MOTORCYCLES REGISTRY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500 uppercase tracking-wider mb-2">
              <Database className="w-4 h-4" /> Prototype Demonstration Registry
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Explore Demo Motorcycles
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Select any motorcycle below to inspect its verified ownership, service history, and blockchain hashes.
            </p>
          </div>

          <Link
            to="/verify"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:text-amber-500 transition-colors"
          >
            <span>Verify by ID</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {demoBikes.map(bike => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="rounded-3xl bg-gradient-to-br from-amber-500 to-amber-600 p-8 sm:p-12 text-slate-950 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to verify a motorcycle's blockchain pedigree?
            </h3>
            <p className="text-slate-900/80 text-sm leading-relaxed">
              Enter any BikeChain ID to inspect cryptographically proven records, service milestones, and tamper-resistant provenance.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/verify"
              className="px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm shadow-xl transition-all"
            >
              Verify Record Now
            </Link>
            <Link
              to="/dashboard"
              className="px-6 py-3.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-slate-950 font-bold text-sm transition-all border border-slate-950/20"
            >
              Owner Portal
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
