import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Layers, 
  QrCode, 
  FileText, 
  Gauge, 
  Calendar, 
  UserCheck, 
  ExternalLink,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { getMotorcycleById, getAllMotorcycles } from '../data/mockBikes';
import VerificationBadge from '../components/VerificationBadge';
import { truncateAddress, truncateHash, formatOdometer, isValidBikeChainId } from '../utils/formatters';

export default function VerifyPage() {
  const { bikeId } = useParams();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState(bikeId || '');
  const [currentBike, setCurrentBike] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (bikeId) {
      setSearchInput(bikeId);
      performVerification(bikeId);
    } else {
      // Default to first bike for a rich preview if no ID in URL
      performVerification('BC-2026-RE-0001');
    }
  }, [bikeId]);

  const performVerification = (idToVerify) => {
    setIsVerifying(true);
    setHasSearched(true);

    // Simulate blockchain network query latency for authentic feel
    setTimeout(() => {
      const found = getMotorcycleById(idToVerify);
      setCurrentBike(found);
      setIsVerifying(false);
    }, 450);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/verify/${searchInput.trim()}`);
    }
  };

  const demoList = getAllMotorcycles();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Search Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-mono font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>Public Ledger Verification Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Verify Motorcycle History
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Enter a unique BikeChain ID or select a demonstration record to inspect verified on-chain lifecycle records.
        </p>

        {/* Search Input Box */}
        <form onSubmit={handleSubmit} className="relative mt-6 max-w-xl mx-auto flex items-center">
          <div className="absolute left-4 text-slate-400 pointer-events-none">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter BikeChain ID (e.g. BC-2026-RE-0001)"
            className="w-full pl-12 pr-32 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 font-mono text-sm focus:outline-none focus:border-amber-500 shadow-md transition-all"
          />
          <button
            type="submit"
            disabled={isVerifying}
            className="absolute right-2 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-50"
          >
            {isVerifying ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <span>Verify</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Demo ID pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="text-[11px]">Available Demo IDs:</span>
          {demoList.map(bike => (
            <button
              key={bike.id}
              onClick={() => {
                setSearchInput(bike.id);
                navigate(`/verify/${bike.id}`);
              }}
              className={`font-mono text-[11px] px-2.5 py-0.5 rounded-md border transition-all ${
                currentBike?.id === bike.id
                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-500'
                  : 'bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {bike.id}
            </button>
          ))}
        </div>
      </div>

      {/* Verification Result State */}
      {isVerifying ? (
        <div className="p-16 text-center space-y-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-2xl mx-auto shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto animate-spin">
            <RefreshCw className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-mono">
            Querying Ethereum Blockchain...
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Validating contract state root, cryptographic hashes, and ownership sequence.
          </p>
        </div>
      ) : currentBike ? (
        <div className="space-y-6">
          
          {/* Main Verified Card */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 border-2 border-emerald-500/30 dark:border-emerald-500/20 shadow-xl overflow-hidden">
            
            {/* Top Verification Status Bar */}
            <div className="bg-emerald-500/10 border-b border-emerald-500/20 px-6 py-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className="text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-400">
                  Cryptographic Record Confirmed on Chain
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-500 font-semibold">
                  Integrity Score: {currentBike.verificationScore}%
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-[10px] font-mono font-bold uppercase">
                  Tamper-Free
                </span>
              </div>
            </div>

            {/* Bike Identity & Specs */}
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              
              {/* Image & Quick QR */}
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-[16/10] border border-slate-200 dark:border-slate-800">
                  <img
                    src={currentBike.image}
                    alt={`${currentBike.manufacturer} ${currentBike.model}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg font-mono text-xs text-amber-400 font-bold">
                    {currentBike.id}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-semibold">
                    <QrCode className="w-4 h-4 text-amber-500" />
                    Public Verification URL
                  </span>
                  <span className="font-mono text-[11px] text-amber-600 dark:text-amber-400">
                    /verify/{currentBike.id}
                  </span>
                </div>
              </div>

              {/* Specs & Attributes */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
                    <span>{currentBike.manufacturer}</span>
                    <span>•</span>
                    <span>{currentBike.year}</span>
                    <span>•</span>
                    <span>{currentBike.type}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    {currentBike.model}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Engine: <span className="font-semibold text-slate-700 dark:text-slate-300">{currentBike.engineCapacity}</span> | Color: <span className="font-semibold text-slate-700 dark:text-slate-300">{currentBike.color}</span>
                  </p>
                </div>

                {/* 4-Box Verification Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">Identity Verified</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        VIN hash matches factory digital mint.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">Blockchain Record</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Block #{currentBike.blockchain.blockNumber} confirmed.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">Ownership Traceable</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {currentBike.ownershipHistory.length} sequential transfer logs found.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">Mileage Integrity</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Logged at {formatOdometer(currentBike.currentOdometer, currentBike.unit)}.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Primary Actions */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    to={`/bike/${currentBike.id}`}
                    className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all active:scale-95"
                  >
                    <span>View Full Motorcycle Profile</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="#blockchain-proof"
                    className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm transition-all"
                  >
                    Inspect Blockchain Hash
                  </a>
                </div>

              </div>
            </div>

            {/* Blockchain Details Section */}
            <div id="blockchain-proof" className="bg-slate-50 dark:bg-slate-950/70 border-t border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-500" />
                  On-Chain Cryptographic Proof
                </span>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold">
                  {currentBike.blockchain.network}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 block uppercase">Smart Contract Address</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 break-all">
                    {currentBike.blockchain.contractAddress}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 block uppercase">Registration Transaction Hash</span>
                  <span className="font-semibold text-amber-600 dark:text-amber-400 break-all">
                    {currentBike.blockchain.registrationTxHash}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 block uppercase">Current Registered Owner</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 break-all">
                    {currentBike.currentOwner?.walletAddress} ({currentBike.currentOwner?.nameMasked})
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 block uppercase">Merkle Document Root (Off-Chain Invoices)</span>
                  <span className="font-semibold text-cyan-600 dark:text-cyan-400 break-all">
                    {currentBike.blockchain.merkleRoot}
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      ) : hasSearched ? (
        /* Not Found State */
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-rose-500/30 max-w-xl mx-auto space-y-4 shadow-md">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Motorcycle Record Not Found
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            No smart contract record was found for BikeChain ID <span className="font-mono text-rose-500 font-bold">{searchInput}</span>. 
            Ensure you typed the exact formatted ID (e.g. <code className="font-mono text-amber-500">BC-2026-RE-0001</code>).
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                setSearchInput('BC-2026-RE-0001');
                navigate('/verify/BC-2026-RE-0001');
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
            >
              Load Royal Enfield Sample Record
            </button>
          </div>
        </div>
      ) : null}

    </div>
  );
}
