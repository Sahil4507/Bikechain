import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Layers, 
  Calendar, 
  User, 
  Gauge, 
  Hash, 
  RefreshCw,
  FileText,
  HelpCircle
} from 'lucide-react';
import { getMotorcycleById, getAllMotorcycles } from '../data/mockBikes';
import VerificationBadge from '../components/VerificationBadge';
import { formatOdometer, truncateHash } from '../utils/formatters';

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
      // Default to initial demo record for instant illustration
      performVerification('BC-2026-RE-0001');
    }
  }, [bikeId]);

  const performVerification = (idToVerify) => {
    setIsVerifying(true);
    setHasSearched(true);

    // Realistic simulated network lookup (300ms)
    setTimeout(() => {
      const found = getMotorcycleById(idToVerify);
      setCurrentBike(found);
      setIsVerifying(false);
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/verify/${searchInput.trim()}`);
    }
  };

  const demoList = getAllMotorcycles();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Search Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tech-50 dark:bg-tech-950/60 text-tech-600 dark:text-tech-400 text-xs font-mono font-medium border border-tech-200 dark:border-tech-800">
          <ShieldCheck className="w-4 h-4" />
          <span>Vehicle Verification Portal</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Verify a Motorcycle
        </h1>
        
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Enter a BikeChain ID to view its digital record and verification information.
        </p>

        {/* Large Search Input */}
        <form onSubmit={handleSubmit} className="relative mt-6 max-w-xl mx-auto flex items-center">
          <Search className="w-5 h-5 absolute left-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter BikeChain ID (e.g. BC-2026-RE-0001)"
            className="w-full pl-12 pr-36 py-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 font-mono text-sm focus:outline-none focus:border-tech-500 shadow-sm transition-all"
          />
          <button
            type="submit"
            disabled={isVerifying}
            className="absolute right-2 px-5 py-2.5 rounded-xl bg-tech-600 hover:bg-tech-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-50"
          >
            {isVerifying ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <span>Verify Record</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Educational Callout: What is a BikeChain ID? */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left max-w-xl mx-auto text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
            <HelpCircle className="w-3.5 h-3.5 text-tech-500" />
            <span>What is a BikeChain ID?</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
            A unique identifier used to find a motorcycle's digital history, verify its current owner, and check recorded service documents.
          </p>
        </div>

        {/* Demo ID Shortcuts */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs text-slate-500">
          <span className="text-[11px]">Demo records:</span>
          {demoList.map(bike => (
            <button
              key={bike.id}
              onClick={() => {
                setSearchInput(bike.id);
                navigate(`/verify/${bike.id}`);
              }}
              className={`font-mono text-[11px] px-2.5 py-0.5 rounded-md border transition-all ${
                currentBike?.id === bike.id
                  ? 'bg-tech-600 text-white font-bold border-tech-600'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-tech-400'
              }`}
            >
              {bike.id}
            </button>
          ))}
        </div>
      </div>

      {/* Verification Result Area */}
      {isVerifying ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-xl mx-auto space-y-3">
          <RefreshCw className="w-8 h-8 text-tech-600 animate-spin mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-mono">
            Searching Digital Registry...
          </h3>
          <p className="text-xs text-slate-500">Comparing cryptographic hash and ownership sequence.</p>
        </div>
      ) : currentBike ? (
        <div className="space-y-6">
          
          {/* Main Clean Verification Card (NO PHOTO) */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 border-2 border-emerald-500/40 dark:border-emerald-500/30 shadow-elevated p-6 sm:p-8 space-y-6">
            
            {/* Status Header Banner */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm sm:text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>✓ RECORD FOUND & VERIFIED</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 font-bold text-slate-800 dark:text-slate-200">
                  {currentBike.id}
                </span>
                <VerificationBadge status={currentBike.status} size="sm" />
              </div>
            </div>

            {/* Vehicle Main Attributes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-tech-600 dark:text-tech-400">
                    {currentBike.manufacturer} • {currentBike.category}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                    {currentBike.model}
                  </h2>
                </div>

                <div className="space-y-2 text-xs">
                  {/* Production Year Clearly Highlighted */}
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500 font-medium flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-tech-500" />
                      <span>Production Year</span>
                    </span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                      {currentBike.productionYear}
                    </span>
                  </div>

                  {/* Current Owner */}
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500 font-medium flex items-center gap-1.5">
                      <User className="w-4 h-4 text-tech-500" />
                      <span>Current Owner</span>
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {currentBike.currentOwner?.name}
                    </span>
                  </div>

                  {/* Logged Mileage */}
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500 font-medium flex items-center gap-1.5">
                      <Gauge className="w-4 h-4 text-tech-500" />
                      <span>Recorded Mileage</span>
                    </span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      {formatOdometer(currentBike.currentOdometer, currentBike.unit)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Cryptographic Hash Verification Box */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Hash className="w-4 h-4 text-tech-500" />
                      <span>Document Fingerprint (SHA-256)</span>
                    </span>
                    <span className="text-emerald-600 font-bold font-mono text-[11px]">VALID MATCH</span>
                  </div>

                  <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
                    The SHA-256 hash of invoice <code className="font-mono text-slate-700 dark:text-slate-300 font-semibold">{currentBike.sampleInvoiceName}</code> matches the on-chain stored fingerprint.
                  </p>

                  <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-700 dark:text-slate-300 break-all select-all">
                    {currentBike.storedDocumentHash}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                  <span>Architecture Status:</span>
                  <span className="font-mono font-semibold text-tech-600 dark:text-tech-400">
                    Phase 3 Prototype Model
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom Action */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                <span>Registration Number: </span>
                <strong className="font-mono text-slate-900 dark:text-white">{currentBike.registrationNumber}</strong>
              </div>

              <Link
                to={`/bike/${currentBike.id}`}
                className="px-6 py-3 rounded-xl bg-tech-600 hover:bg-tech-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all"
              >
                <span>View Full Record Passport</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>
      ) : hasSearched ? (
        <div className="p-10 text-center rounded-3xl bg-white dark:bg-slate-900 border border-rose-300 dark:border-rose-900/60 max-w-xl mx-auto space-y-4">
          <AlertTriangle className="w-10 h-10 text-rose-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Record Not Found</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            No digital vehicle passport was found for ID <code className="font-mono text-rose-500 font-bold">{searchInput}</code>.
            Please verify the exact format (e.g. <code className="font-mono text-tech-600">BC-2026-RE-0001</code>).
          </p>
          <button
            onClick={() => { setSearchInput('BC-2026-RE-0001'); navigate('/verify/BC-2026-RE-0001'); }}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
          >
            Load Sample Record (BC-2026-RE-0001)
          </button>
        </div>
      ) : null}

    </div>
  );
}
