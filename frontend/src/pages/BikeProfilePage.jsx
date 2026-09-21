import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  ShieldCheck, 
  Copy, 
  Check, 
  AlertTriangle,
  History,
  FileCheck,
  Gauge,
  Zap,
  Maximize2,
  Disc,
  Fuel
} from 'lucide-react';
import { getMotorcycleById } from '../data/mockBikes';

export default function BikeProfilePage() {
  const { bikeId } = useParams();
  const [copiedHash, setCopiedHash] = useState(false);
  const [activeSpecCategory, setActiveSpecCategory] = useState('all'); // 'all', 'engine', 'dimensions', 'chassis', 'efficiency'

  // Default to BC-0001 if /bike is accessed without a param
  const activeId = bikeId ? bikeId.trim() : 'BC-0001';
  const bike = getMotorcycleById(activeId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [bikeId]);

  if (!bike) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-amber-500 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Motorcycle Record Not Found</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          No motorcycle found with identifier "{bikeId}".
        </p>
        <div className="pt-2">
          <Link
            to="/bikes"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs inline-flex items-center gap-2 shadow-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Find a Bike
          </Link>
        </div>
      </div>
    );
  }

  const handleCopyHash = () => {
    if (bike.documentHash && navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(bike.documentHash).catch(() => {});
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    }
  };

  const specs = bike.specifications;

  const specCategories = [
    { id: 'all', label: 'All Specs' },
    { id: 'engine', label: 'Engine & Performance' },
    { id: 'dimensions', label: 'Dimensions & Capacity' },
    { id: 'chassis', label: 'Chassis & Hardware' },
    { id: 'efficiency', label: 'Efficiency' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
      
      {/* Top Breadcrumb */}
      <div>
        <Link
          to="/bikes"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Find a Bike</span>
        </Link>
      </div>

      {/* ============================================================ */}
      {/* 1. BIKE OVERVIEW */}
      {/* ============================================================ */}
      <section className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6">
        
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                {bike.manufacturer}
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-800">
                <Calendar className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>{bike.productionYear} PRODUCTION YEAR</span>
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {bike.model}
            </h1>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20 shadow-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>{bike.status || 'Verified Record'}</span>
          </span>
        </div>

        {/* 4 Core Quick Details */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-slate-400 uppercase text-[10px] font-bold block tracking-wider">BikeChain ID</span>
            <span className="font-mono font-extrabold text-sm text-slate-900 dark:text-white">{bike.id}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-slate-400 uppercase text-[10px] font-bold block tracking-wider">Number Plate</span>
            <span className="font-mono font-extrabold text-sm text-slate-900 dark:text-white">{bike.registrationNumber}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-slate-400 uppercase text-[10px] font-bold block tracking-wider">Current Owner</span>
            <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              {bike.currentOwner}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-slate-400 uppercase text-[10px] font-bold block tracking-wider">Verified Odometer</span>
            <span className="font-mono font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1">
              <Gauge className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              {bike.currentOdometer?.toLocaleString()} {bike.unit || 'km'}
            </span>
          </div>
        </div>

        {/* Secondary Badges */}
        <div className="pt-1 flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
          <span>Displacement: <strong className="text-slate-900 dark:text-white">{specs?.engine?.displacement || 'Not available'}</strong></span>
          <span>•</span>
          <span>Color: <strong className="text-slate-900 dark:text-white">{bike.color || 'Not available'}</strong></span>
          <span>•</span>
          <span>Claimed Mileage: <strong className="text-slate-900 dark:text-white">{specs?.efficiency?.claimedMileage || 'Not available'}</strong></span>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. TECHNICAL SPECIFICATIONS */}
      {/* ============================================================ */}
      <section className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Technical Specifications
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Verified manufacturer engineering and mechanical data.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scroller pb-1">
            {specCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveSpecCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeSpecCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Specifications Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          
          {/* A. Engine & Performance */}
          {(activeSpecCategory === 'all' || activeSpecCategory === 'engine') && (
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
                <Zap className="w-4 h-4" />
                <span>Engine & Performance</span>
              </div>

              <div className="space-y-2 divide-y divide-slate-200/60 dark:divide-slate-800">
                <div className="flex justify-between pt-1.5">
                  <span className="text-slate-500">Displacement:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{specs?.engine?.displacement || 'Not available'}</span>
                </div>
                <div className="flex justify-between pt-1.5">
                  <span className="text-slate-500">Engine Type:</span>
                  <span className="font-semibold text-slate-900 dark:text-white text-right max-w-[65%]">{specs?.engine?.engineType || 'Not available'}</span>
                </div>
                <div className="flex justify-between pt-1.5">
                  <span className="text-slate-500">Maximum Power:</span>
                  <span className="font-semibold text-slate-900 dark:text-white text-right">{specs?.engine?.maxPower || 'Not available'}</span>
                </div>
                <div className="flex justify-between pt-1.5">
                  <span className="text-slate-500">Maximum Torque:</span>
                  <span className="font-semibold text-slate-900 dark:text-white text-right">{specs?.engine?.maxTorque || 'Not available'}</span>
                </div>
                <div className="flex justify-between pt-1.5">
                  <span className="text-slate-500">Transmission:</span>
                  <span className="font-semibold text-slate-900 dark:text-white text-right">{specs?.engine?.transmission || 'Not available'}</span>
                </div>
                <div className="flex justify-between pt-1.5">
                  <span className="text-slate-500">Cooling System:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{specs?.engine?.cooling || 'Not available'}</span>
                </div>
                <div className="flex justify-between pt-1.5">
                  <span className="text-slate-500">Fuel Type:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{specs?.engine?.fuelType || 'Not available'}</span>
                </div>
              </div>
            </div>
          )}

          {/* B. Dimensions & Capacity */}
          {(activeSpecCategory === 'all' || activeSpecCategory === 'dimensions') && (
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
                <Maximize2 className="w-4 h-4" />
                <span>Dimensions & Capacity</span>
              </div>

              <div className="space-y-2 divide-y divide-slate-200/60 dark:divide-slate-800">
                <div className="flex justify-between pt-1.5">
                  <span className="text-slate-500">Kerb Weight:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{specs?.dimensions?.kerbWeight || 'Not available'}</span>
                </div>
                <div className="flex justify-between pt-1.5">
                  <span className="text-slate-500">Fuel Tank Capacity:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{specs?.dimensions?.fuelCapacity || 'Not available'}</span>
                </div>
                <div className="flex justify-between pt-1.5">
                  <span className="text-slate-500">Seat Height:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{specs?.dimensions?.seatHeight || 'Not available'}</span>
                </div>
                <div className="flex justify-between pt-1.5">
                  <span className="text-slate-500">Ground Clearance:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{specs?.dimensions?.groundClearance || 'Not available'}</span>
                </div>
              </div>
            </div>
          )}

          {/* C. Chassis & Hardware */}
          {(activeSpecCategory === 'all' || activeSpecCategory === 'chassis') && (
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
                <Disc className="w-4 h-4" />
                <span>Chassis & Hardware</span>
              </div>

              <div className="space-y-2 divide-y divide-slate-200/60 dark:divide-slate-800">
                <div className="flex justify-between pt-1.5">
                  <span className="text-slate-500">Front Suspension:</span>
                  <span className="font-semibold text-slate-900 dark:text-white text-right max-w-[65%]">{specs?.chassis?.frontSuspension || 'Not available'}</span>
                </div>
                <div className="flex justify-between pt-1.5">
                  <span className="text-slate-500">Rear Suspension:</span>
                  <span className="font-semibold text-slate-900 dark:text-white text-right max-w-[65%]">{specs?.chassis?.rearSuspension || 'Not available'}</span>
                </div>
                <div className="flex justify-between pt-1.5">
                  <span className="text-slate-500">Front Brake:</span>
                  <span className="font-semibold text-slate-900 dark:text-white text-right max-w-[65%]">{specs?.chassis?.frontBrake || 'Not available'}</span>
                </div>
                <div className="flex justify-between pt-1.5">
                  <span className="text-slate-500">Rear Brake:</span>
                  <span className="font-semibold text-slate-900 dark:text-white text-right max-w-[65%]">{specs?.chassis?.rearBrake || 'Not available'}</span>
                </div>
                <div className="flex justify-between pt-1.5">
                  <span className="text-slate-500">ABS Information:</span>
                  <span className="font-semibold text-slate-900 dark:text-white text-right">{specs?.chassis?.abs || 'Not available'}</span>
                </div>
                <div className="flex justify-between pt-1.5">
                  <span className="text-slate-500">Front Tyre:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{specs?.chassis?.frontTyre || 'Not available'}</span>
                </div>
                <div className="flex justify-between pt-1.5">
                  <span className="text-slate-500">Rear Tyre:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{specs?.chassis?.rearTyre || 'Not available'}</span>
                </div>
              </div>
            </div>
          )}

          {/* D. Efficiency */}
          {(activeSpecCategory === 'all' || activeSpecCategory === 'efficiency') && (
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
                <Fuel className="w-4 h-4" />
                <span>Fuel Efficiency</span>
              </div>

              <div className="space-y-3 pt-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Claimed Mileage:</span>
                  <span className="font-extrabold text-sm text-indigo-600 dark:text-indigo-400">
                    {specs?.efficiency?.claimedMileage || 'Not available'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  <strong className="text-slate-800 dark:text-slate-200">Official Note: </strong>
                  {specs?.efficiency?.mileageNote || 'Claimed mileage is certified under standardized testing conditions. Actual real-world mileage will vary based on maintenance, traffic, and riding behavior.'}
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. OWNERSHIP & SERVICE HISTORY (ONE TIMELINE) */}
      {/* ============================================================ */}
      <section className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Ownership & Service History</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Chronological record of initial registration, certified workshop services, and ownership transfers.
          </p>
        </div>

        {/* Single Chronological Vertical Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-indigo-200 dark:border-indigo-900 space-y-6 my-2">
          {bike.history?.map((event, idx) => {
            const isLatest = idx === bike.history.length - 1;
            const isService = event.eventType === 'Service Completed';
            const isTransfer = event.eventType === 'Ownership Transfer';

            return (
              <div key={event.id || idx} className="relative">
                {/* Node Dot */}
                <div className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full ring-4 ring-white dark:ring-slate-900 ${
                  isLatest ? 'bg-emerald-500 ring-emerald-100 dark:ring-emerald-950' : 'bg-indigo-600'
                }`}></div>

                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                        isService 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' 
                          : isTransfer
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      }`}>
                        {event.eventType}
                      </span>
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {event.title}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-500">
                      {event.date}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                    <span>Authorized by: <strong className="text-slate-700 dark:text-slate-300 font-sans">{event.party}</strong></span>
                    {event.odometer !== undefined && (
                      <span className="font-mono">
                        Odometer: <strong>{event.odometer.toLocaleString()} km</strong>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. RECORD VERIFICATION */}
      {/* ============================================================ */}
      <section className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="space-y-0.5">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Record Verification</span>
            </h2>
            <p className="text-xs text-slate-500">
              Cryptographic integrity reference and document verification status.
            </p>
          </div>

          {/* Explicit Honest Status Label */}
          <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-400 text-xs font-bold border border-amber-500/20">
            Blockchain Integration — In Development
          </span>
        </div>

        {/* Clear 2-Sentence Explanation from User Specification */}
        <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          BikeChain is designed to use blockchain to preserve important record references and document hashes. These proofs can help detect changes to previously recorded documents.
        </div>

        {/* Document Hash Display (if available) */}
        {bike.documentHash && (
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Stored Document Fingerprint (SHA-256)
              </span>
              <span className="text-[11px] text-slate-400">
                {bike.documentName || 'Service Record Document'}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <code className="text-xs font-mono text-slate-800 dark:text-slate-200 break-all select-all">
                {bike.documentHash}
              </code>
              <button
                type="button"
                onClick={handleCopyHash}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 shrink-0 transition-colors"
                title="Copy Hash"
              >
                {copiedHash ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              Comparing a physical or PDF document's SHA-256 hash against this recorded hash verifies whether the document has been altered.
            </p>
          </div>
        )}

      </section>

    </div>
  );
}
