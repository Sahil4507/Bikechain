import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Hash, 
  Layers, 
  Database, 
  Lock, 
  Cpu, 
  Calendar, 
  User, 
  Gauge, 
  RefreshCw,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import BikeCard from '../components/BikeCard';
import StatCard from '../components/StatCard';
import VerificationBadge from '../components/VerificationBadge';
import { getAllMotorcycles } from '../data/mockBikes';
import { computeSHA256 } from '../utils/crypto';

export default function LandingPage() {
  const [searchId, setSearchId] = useState('');
  const navigate = useNavigate();
  const demoBikes = getAllMotorcycles();

  // Interactive SHA-256 Tamper-Detection Viva Demo State
  const initialInvoiceText = "SERVICE INVOICE #001\nBikeChain ID: BC-2026-RE-0001\nService: First Break-in Service (500 km)\nWorkshop: Apex Speedworks #04\nStatus: Certified Genuine Parts Installed";
  const [invoiceText, setInvoiceText] = useState(initialInvoiceText);
  const [calculatedHash, setCalculatedHash] = useState('');
  const [targetStoredHash, setTargetStoredHash] = useState('');

  // Initial calculation on load
  useEffect(() => {
    computeSHA256(initialInvoiceText).then(hash => {
      setCalculatedHash(hash);
      setTargetStoredHash(hash); // Stored on-chain proof matches initial document
    });
  }, []);

  const handleInvoiceChange = async (e) => {
    const newText = e.target.value;
    setInvoiceText(newText);
    const newHash = await computeSHA256(newText);
    setCalculatedHash(newHash);
  };

  const handleResetInvoice = async () => {
    setInvoiceText(initialInvoiceText);
    const originalHash = await computeSHA256(initialInvoiceText);
    setCalculatedHash(originalHash);
  };

  const isHashMatch = calculatedHash === targetStoredHash;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchId.trim()) {
      navigate(`/verify/${searchId.trim()}`);
    } else {
      navigate('/verify');
    }
  };

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="pt-12 sm:pt-16 pb-16 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-950 dark:to-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Core Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-700 dark:text-slate-300">
                <span className="w-2 h-2 rounded-full bg-tech-600"></span>
                <span>Digital Vehicle Record & Verification Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                Know the History of{' '}
                <span className="text-tech-600 dark:text-tech-400">
                  Every Bike.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                BikeChain creates a verifiable digital record for motorcycle ownership, service history and important vehicle events.
              </p>

              {/* Quick Search Bar */}
              <div className="pt-2 max-w-lg">
                <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                  <Search className="w-5 h-5 absolute left-4 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="Enter BikeChain ID (e.g. BC-2026-RE-0001)"
                    className="w-full pl-12 pr-32 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 font-mono text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-tech-500 shadow-sm transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 px-4 py-2 rounded-xl bg-tech-600 hover:bg-tech-700 text-white font-bold text-xs flex items-center gap-1 transition-all active:scale-95"
                  >
                    <span>Verify</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>

                <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-500">
                  <span>Demo records:</span>
                  {['BC-2026-RE-0001', 'BC-2025-KT-0042', 'BC-2024-BM-0108'].map(id => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => { setSearchId(id); navigate(`/verify/${id}`); }}
                      className="font-mono text-tech-600 dark:text-tech-400 hover:underline bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[11px]"
                    >
                      {id}
                    </button>
                  ))}
                </div>
              </div>

              {/* Primary & Secondary Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/verify"
                  className="px-6 py-3 rounded-xl bg-tech-600 hover:bg-tech-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all active:scale-95"
                >
                  <Search className="w-4 h-4" />
                  <span>Verify a Bike</span>
                </Link>
                <Link
                  to="/bikes"
                  className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm transition-all"
                >
                  Explore Records
                </Link>
              </div>

            </div>

            {/* Right Column: Visual Representation of a Digital Vehicle Record (NO PHOTO) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-elevated p-6 sm:p-7 space-y-5">
                
                {/* Header Badge */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider block">
                      DIGITAL VEHICLE RECORD
                    </span>
                    <span className="font-mono text-sm font-extrabold text-tech-600 dark:text-tech-400">
                      BC-2026-RE-0001
                    </span>
                  </div>
                  <VerificationBadge status="Verified" size="sm" />
                </div>

                {/* Model & Production Year */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Royal Enfield
                    </span>
                    {/* Explicit Production Year */}
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      Production Year: 2026
                    </span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    Guerrilla 450
                  </h3>
                  <p className="text-xs text-slate-500">452 cc Sherpa Liquid-Cooled Roadster</p>
                </div>

                {/* Core Record Attributes Grid */}
                <div className="grid grid-cols-2 gap-2.5 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">Current Owner</span>
                    <span className="font-bold text-slate-900 dark:text-white mt-0.5 block truncate">
                      Priya Nair
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">Transfer #3</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">Logged Odometer</span>
                    <span className="font-bold text-slate-900 dark:text-white mt-0.5 block font-mono">
                      4,250 km
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Verified Clean</span>
                  </div>
                </div>

                {/* Document Cryptographic Fingerprint Preview */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 space-y-1 text-xs font-mono">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Hash className="w-3.5 h-3.5 text-tech-500" />
                      <span>Stored Document Hash:</span>
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">MATCH ✓</span>
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 truncate">
                    A8F91C3E7B2D4F5A6C8E0B2D4F6A8C0E2B4D6F8A...72E
                  </div>
                </div>

                {/* Action Link */}
                <Link
                  to="/bike/BC-2026-RE-0001"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-tech-600 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <span>Inspect Full Vehicle Passport</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATS SUMMARY BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Registered Bikes"
            value="4"
            subtitle="Demonstration vehicle passports"
            icon={Cpu}
            color="tech"
          />
          <StatCard
            title="Total Records"
            value="24"
            subtitle="Ownership and service entries"
            icon={FileText}
            color="slate"
          />
          <StatCard
            title="Verified Status"
            value="100%"
            subtitle="Cryptographic integrity match"
            icon={CheckCircle2}
            color="emerald"
          />
          <StatCard
            title="Ownership Transfers"
            value="8"
            subtitle="Chronological sequence preserved"
            icon={Layers}
            color="amber"
          />
        </div>
      </section>

      {/* 3. HOW BIKECHAIN WORKS (4 CLEAR STEPS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-tech-600 dark:text-tech-400">
            Workflow Architecture
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How BikeChain Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            A simple 4-step process linking physical motorcycles to tamper-resistant cryptographic records.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-tech-50 dark:bg-tech-950 text-tech-600 dark:text-tech-400 font-mono font-extrabold text-sm flex items-center justify-center">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">REGISTER</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              A motorcycle receives a unique <strong>BikeChain ID</strong> (e.g. <code className="font-mono text-[11px] text-tech-600">BC-2026-RE-0001</code>) and genesis passport identity.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-tech-50 dark:bg-tech-950 text-tech-600 dark:text-tech-400 font-mono font-extrabold text-sm flex items-center justify-center">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">RECORD</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Important ownership handovers, odometer readings, and certified workshop maintenance milestones are recorded sequentially.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-tech-50 dark:bg-tech-950 text-tech-600 dark:text-tech-400 font-mono font-extrabold text-sm flex items-center justify-center">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">HASH</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Important documents (such as PDF service invoices) are converted to a <strong>SHA-256 cryptographic hash</strong> acting as an unalterable digital fingerprint.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-mono font-extrabold text-sm flex items-center justify-center">
              04
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">VERIFY</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              A buyer or inspector compares any presented document or mileage against its recorded proof to detect any retroactive tampering instantly.
            </p>
          </div>

        </div>
      </section>

      {/* 4. WHAT IS STORED WHERE? (ON-CHAIN VS OFF-CHAIN MATRIX) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-10 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              Architecture Distinction
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              What is Stored Where?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              The blockchain is <strong>NOT</strong> intended to store large files such as high-resolution photographs or full PDF invoices. Instead, large data remains off-chain while concise cryptographic proofs reside on-chain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* On-Chain Column */}
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>ON-CHAIN (Blockchain Ledger)</span>
                </h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  Immutable
                </span>
              </div>
              
              <ul className="space-y-3 text-xs text-slate-300 divide-y divide-slate-700/60">
                <li className="pt-2 flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Unique BikeChain ID</strong>
                    <p className="text-slate-400 text-[11px]">Primary vehicle identity identifier anchored in smart contract.</p>
                  </div>
                </li>
                <li className="pt-2 flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Ownership Transfer Sequence</strong>
                    <p className="text-slate-400 text-[11px]">Chronological chain of custody (Arjun Mehta → Rohan Sharma → Priya Nair).</p>
                  </div>
                </li>
                <li className="pt-2 flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Service Milestone References & Mileage</strong>
                    <p className="text-slate-400 text-[11px]">Certified workshop signatures and recorded odometer readings.</p>
                  </div>
                </li>
                <li className="pt-2 flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Document Cryptographic Hashes (SHA-256)</strong>
                    <p className="text-slate-400 text-[11px]">Exact 256-bit digital fingerprints of off-chain invoices.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Off-Chain Column */}
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-tech-400 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  <span>OFF-CHAIN (Database / Storage)</span>
                </h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-tech-500/20 text-tech-300">
                  Scalable
                </span>
              </div>

              <ul className="space-y-3 text-xs text-slate-300 divide-y divide-slate-700/60">
                <li className="pt-2 flex items-start gap-2">
                  <span className="text-tech-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Full PDF Service Invoices</strong>
                    <p className="text-slate-400 text-[11px]">Original documents kept in off-chain database/file storage.</p>
                  </div>
                </li>
                <li className="pt-2 flex items-start gap-2">
                  <span className="text-tech-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Detailed Diagnostic Reports</strong>
                    <p className="text-slate-400 text-[11px]">Workshop multi-point inspection sheets and scanner logs.</p>
                  </div>
                </li>
                <li className="pt-2 flex items-start gap-2">
                  <span className="text-tech-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Large Vehicle Metadata & Media</strong>
                    <p className="text-slate-400 text-[11px]">Detailed technical specs and UI assets requiring fast search indexing.</p>
                  </div>
                </li>
                <li className="pt-2 flex items-start gap-2">
                  <span className="text-tech-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Scalable Document Retrieval</strong>
                    <p className="text-slate-400 text-[11px]">Integrity is guaranteed because hash(off-chain) must match hash(on-chain).</p>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE SHA-256 TAMPER-DETECTION VIVA DEMO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white dark:bg-slate-900 border-2 border-tech-500/30 dark:border-tech-500/20 p-6 sm:p-10 shadow-subtle space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-tech-600 dark:text-tech-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Live BCT Viva Demonstration Tool
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Interactive Document Hashing & Tamper Detection
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Try editing even one single character in the service invoice below to see how SHA-256 instantly detects tampering.
              </p>
            </div>

            <button
              onClick={handleResetInvoice}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-all self-start sm:self-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Invoice</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Document Text Editor */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  Off-Chain Document Content (service_invoice_001.pdf):
                </span>
                <span className="text-[11px] text-slate-400">Editable preview</span>
              </div>

              <textarea
                rows={6}
                value={invoiceText}
                onChange={handleInvoiceChange}
                className="w-full p-4 rounded-xl font-mono text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-tech-500 transition-colors resize-none leading-relaxed"
              />
              <p className="text-[11px] text-slate-500">
                Tip: Change "500 km" to "600 km" or add any letter to simulate an unauthorized invoice alteration.
              </p>
            </div>

            {/* Cryptographic Comparison Engine */}
            <div className="space-y-4 flex flex-col justify-between">
              
              {/* Calculated Hash */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs font-mono">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  1. Real-Time Calculated SHA-256(Document):
                </span>
                <div className="font-bold text-slate-900 dark:text-slate-100 break-all text-xs">
                  {calculatedHash || "Calculating..."}
                </div>
              </div>

              {/* On-Chain Stored Proof */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs font-mono">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  2. Stored Blockchain Fingerprint (Immutable Proof):
                </span>
                <div className="font-bold text-tech-600 dark:text-tech-400 break-all text-xs">
                  {targetStoredHash}
                </div>
              </div>

              {/* Match / Mismatch Verdict */}
              <div className={`p-4 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                isHashMatch
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800/80 text-rose-800 dark:text-rose-300'
              }`}>
                <div className="flex items-center gap-2">
                  {isHashMatch ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                  <div>
                    <strong className="block text-sm">
                      {isHashMatch ? "Integrity Verified: Document Matches Stored Proof" : "Tampering Detected: Hash Mismatch!"}
                    </strong>
                    <span className="text-[11px] opacity-90">
                      {isHashMatch 
                        ? "new hash == blockchain hash: The presented invoice has not been modified."
                        : "new hash != blockchain hash: The document was altered after its hash was recorded on-chain."}
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs font-extrabold uppercase px-2.5 py-1 rounded bg-white dark:bg-slate-900 shadow-sm shrink-0">
                  {isHashMatch ? "VALID ✓" : "TAMPERED ✗"}
                </span>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 6. RECENT MOTORCYCLE RECORDS (NO PHOTOS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-tech-600 dark:text-tech-400">
              Demonstration Records
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Registered Motorcycle Passports
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Explore complete digital history, sequential ownership, and certified service entries.
            </p>
          </div>

          <Link
            to="/bikes"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-tech-600 dark:text-tech-400 hover:underline"
          >
            <span>View All Records</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Pure Data Record Cards — Zero Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {demoBikes.map(bike => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      </section>

      {/* 7. WHY BLOCKCHAIN? (DATABASE VS BLOCKCHAIN) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Core BCT Concept
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Why Blockchain Instead of a Traditional Database?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Traditional Centralized Database
              </h3>
              <div className="font-mono text-xs text-slate-500 space-y-1 p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                <div>Record → Database Table</div>
                <div className="text-rose-500 font-semibold">⚠ Administrator can modify or delete row</div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                In traditional databases, any actor with root access can roll back mileage numbers or alter ownership dates without an unalterable audit trail.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800/60 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                BikeChain Smart Contract Ledger
              </h3>
              <div className="font-mono text-xs text-slate-500 space-y-1 p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
                <div>Record → SHA-256 → Smart Contract → Block</div>
                <div className="text-emerald-600 dark:text-emerald-400 font-semibold">✓ Confirmed transaction cannot be edited</div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Once recorded, previous transactions cannot simply be rewritten. New events append to history, ensuring continuous and trustworthy provenance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-tech-950 text-white p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-tech-900">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Verify Any Motorcycle Digital Record Now
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Enter any BikeChain ID to inspect its complete provenance timeline, verified workshop service entries, and cryptographic hashes.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/verify"
              className="px-6 py-3.5 rounded-xl bg-white text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all hover:bg-slate-100"
            >
              Verify Record Now
            </Link>
            <Link
              to="/about"
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm transition-all border border-slate-700"
            >
              BCT Viva Guide
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
