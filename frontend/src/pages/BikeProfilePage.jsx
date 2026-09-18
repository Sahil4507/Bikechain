import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowLeft, 
  Calendar, 
  Gauge, 
  UserCheck, 
  Wrench, 
  Cpu, 
  History, 
  AlertTriangle, 
  Layers, 
  CheckCircle2, 
  QrCode, 
  FileText, 
  Copy, 
  Check, 
  Share2,
  Binary,
  Shield,
  FileCheck
} from 'lucide-react';
import { getMotorcycleById } from '../data/mockBikes';
import VerificationBadge from '../components/VerificationBadge';
import { truncateAddress, truncateHash, formatOdometer, formatDate } from '../utils/formatters';
import { computeSHA256 } from '../utils/crypto';

export default function BikeProfilePage() {
  const { bikeId } = useParams();
  const [activeTab, setActiveTab] = useState('vehicle-record');
  const [copiedText, setCopiedText] = useState('');
  const [showQrModal, setShowQrModal] = useState(false);

  // Live hash test state inside profile
  const [inputDocumentText, setInputDocumentText] = useState('');
  const [computedLiveHash, setComputedLiveHash] = useState('');
  const [isHashing, setIsHashing] = useState(false);

  // Default to BC-2026-RE-0001 if /bike is accessed without parameter
  const activeId = bikeId ? bikeId.trim() : 'BC-2026-RE-0001';
  const bike = getMotorcycleById(activeId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [bikeId]);

  if (!bike) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Motorcycle Record Not Found</h2>
        <p className="text-sm text-slate-500">
          The requested BikeChain ID "{bikeId}" was not found in the demonstration registry.
        </p>
        <div className="pt-4">
          <Link
            to="/verify"
            className="px-5 py-2.5 rounded-xl bg-tech-600 hover:bg-tech-700 text-white font-bold text-xs inline-flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Verification Search
          </Link>
        </div>
      </div>
    );
  }

  const handleCopy = (text, label) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedText(label);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const handleTestHash = async (content) => {
    setInputDocumentText(content);
    if (!content) {
      setComputedLiveHash('');
      return;
    }
    setIsHashing(true);
    const hash = await computeSHA256(content);
    setComputedLiveHash(hash);
    setIsHashing(false);
  };

  const loadSampleInvoice = () => {
    const sample = `INVOICE: ${bike.sampleInvoiceName || 'service_invoice_001.pdf'}\nVEHICLE: ${bike.manufacturer} ${bike.model} (${bike.id})\nODOMETER: ${bike.currentOdometer} km\nWORKSHOP: Apex Speedworks Authorized #04\nSTATUS: APPROVED`;
    handleTestHash(sample);
  };

  const tabs = [
    { id: 'vehicle-record', label: '1. Vehicle Record', icon: FileText },
    { id: 'ownership', label: '2. Ownership History', icon: History, badge: bike.ownershipHistory?.length || 0 },
    { id: 'service', label: '3. Service History', icon: Wrench, badge: bike.serviceHistory?.length || 0 },
    { id: 'repairs', label: '4. Accident / Repairs', icon: AlertTriangle, badge: bike.repairHistory?.length || 0 },
    { id: 'blockchain', label: '5. Blockchain Proof', icon: Layers },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Breadcrumb & Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/verify"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-tech-600 dark:hover:text-tech-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Verification Hub</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowQrModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm transition-colors"
          >
            <QrCode className="w-3.5 h-3.5 text-tech-600 dark:text-tech-400" />
            <span>QR Verification</span>
          </button>

          <button
            onClick={() => handleCopy(bike.id, 'id')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm transition-colors"
          >
            {copiedText === 'id' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedText === 'id' ? 'ID Copied' : 'Copy ID'}</span>
          </button>

          <button
            onClick={() => handleCopy(window.location.href, 'link')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedText === 'link' ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Official Digital Vehicle Passport Header (PHOTO-FREE DESIGN) */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        
        {/* Passport Top Metallic Security Strip */}
        <div className="bg-slate-950 px-6 sm:px-8 py-3.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] font-mono tracking-widest text-slate-300 uppercase font-bold">
              OFFICIAL DIGITAL VEHICLE RECORD PASSPORT
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <span>REGISTRY NETWORK:</span>
            <span className="text-amber-400 font-bold">EVM SEPOLIA (PHASE 3 MODEL)</span>
          </div>
        </div>

        {/* Passport Core Header Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            
            {/* Model & Make Title */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider">
                  {bike.manufacturer}
                </span>

                {/* Prominent Production Year Pill */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-tech-500/10 dark:bg-tech-400/10 text-tech-700 dark:text-tech-300 border border-tech-500/30 text-xs font-mono font-extrabold">
                  <Calendar className="w-3.5 h-3.5 text-tech-600 dark:text-tech-400" />
                  <span>{bike.productionYear || bike.year} PRODUCTION YEAR</span>
                </span>

                <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold">
                  {bike.category}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {bike.model}
              </h1>

              {/* BikeChain ID Chip */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-400 font-mono text-xs font-extrabold">
                  <span>ID:</span>
                  <span>{bike.id}</span>
                </div>
                <span className="text-xs text-slate-500 font-mono">
                  Registration: <strong className="text-slate-800 dark:text-slate-200">{bike.registrationNumber}</strong>
                </span>
              </div>
            </div>

            {/* Current Ownership & Verification Score Column */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shrink-0">
              <div className="flex items-center gap-2">
                <VerificationBadge status={bike.status} size="md" />
                <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {bike.verificationScore}% Pure
                </span>
              </div>

              <div className="text-xs text-left lg:text-right space-y-0.5 pt-1 border-t lg:border-t-0 border-slate-200 dark:border-slate-800 w-full">
                <span className="text-slate-500 text-[11px] block">Current Custody:</span>
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 lg:justify-end">
                  <UserCheck className="w-3.5 h-3.5 text-tech-600 dark:text-tech-400" />
                  {bike.currentOwner?.name || 'Verified Holder'}
                </span>
                <span className="text-[10px] font-mono text-slate-400 block">
                  {truncateAddress(bike.currentOwner?.walletAddress)}
                </span>
              </div>
            </div>

          </div>

          {/* Micro Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">Production Year</span>
              <span className="font-mono text-sm sm:text-base font-extrabold text-tech-600 dark:text-tech-400">
                {bike.productionYear || bike.year}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">Verified Odometer</span>
              <span className="font-mono text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5 text-tech-600 dark:text-tech-400" />
                {formatOdometer(bike.currentOdometer, bike.unit)}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">Ownership Events</span>
              <span className="font-mono text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {bike.ownershipHistory?.length || 1} Recorded
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">Service Stamps</span>
              <span className="font-mono text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {bike.serviceHistory?.length || 0} Certified
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-slate-200 dark:border-slate-800 overflow-x-auto scroller">
        <nav className="flex space-x-2 min-w-max pb-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-tech-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Structured Passport Panels */}
      <div className="space-y-6">

        {/* ============================================================ */}
        {/* TAB 1: VEHICLE RECORD */}
        {/* ============================================================ */}
        {activeTab === 'vehicle-record' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Technical Specifications Passport */}
              <div className="lg:col-span-2 p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-tech-600 dark:text-tech-400" />
                    <span>Manufacturer Technical Specifications</span>
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400">
                    Off-Chain Metadata Verified
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs divide-y sm:divide-y-0 divide-slate-100 dark:divide-slate-800">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-slate-500 block">Manufacturer / Brand</span>
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{bike.manufacturer}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-slate-500 block">Model Nomenclature</span>
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{bike.model}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-slate-500 block">Official Production Year</span>
                    <span className="font-mono font-extrabold text-sm text-tech-600 dark:text-tech-400">
                      {bike.productionYear || bike.year}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-slate-500 block">Registration Authority ID</span>
                    <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">{bike.registrationNumber}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-slate-500 block">Powertrain Displacement</span>
                    <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">{bike.engineCapacity}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-slate-500 block">Factory Paint Finish</span>
                    <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">{bike.color}</span>
                  </div>
                </div>

                {/* VIN & Cryptographic Proof */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="text-slate-500 font-semibold">Chassis VIN (Masked for Privacy)</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800">
                      {bike.vinMasked}
                    </span>
                  </div>

                  <div className="text-xs space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 text-[11px]">On-Chain VIN SHA-256 Digest:</span>
                      <button
                        onClick={() => handleCopy(bike.vinHash, 'vin')}
                        className="font-mono text-[11px] text-tech-600 dark:text-tech-400 hover:underline flex items-center gap-1"
                      >
                        <span>{truncateHash(bike.vinHash, 10, 8)}</span>
                        {copiedText === 'vin' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      The full raw chassis number is never stored directly in cleartext on the public blockchain. Only its immutable cryptographic hash is registered.
                    </p>
                  </div>
                </div>
              </div>

              {/* Custody & Proof Summary Card */}
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-600" />
                    <span>Current Legal Custody</span>
                  </h3>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
                    <div>
                      <span className="text-[11px] text-slate-400 block uppercase">Current Owner Name</span>
                      <span className="font-bold text-base text-slate-900 dark:text-white">
                        {bike.currentOwner?.name || 'Priya Nair'}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-400 block uppercase">Holder Status</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {bike.currentOwner?.holderType || 'Private Owner'}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-400 block uppercase">Owner EVM Wallet</span>
                      <span className="font-mono text-[11px] text-tech-600 dark:text-tech-400 break-all select-all">
                        {bike.currentOwner?.walletAddress}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-400 block uppercase">Acquisition Date</span>
                      <span className="font-mono text-slate-800 dark:text-slate-200">
                        {formatDate(bike.currentOwner?.acquiredDate)}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-400 flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                    <span>Title validated by BikeChain smart contract logic. No unrecorded transfers or lien encumbrances.</span>
                  </div>
                </div>

                {/* Storage Architecture Reminder */}
                <div className="p-5 rounded-2xl bg-tech-500/5 dark:bg-tech-500/10 border border-tech-500/20 space-y-2 text-xs">
                  <span className="font-bold text-tech-700 dark:text-tech-400 uppercase tracking-wider block">
                    BCT Architecture Note
                  </span>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                    Heavy metadata, user profiles, and repair notes are maintained in off-chain database records. Only the state hashes, BikeChain ID, and ownership addresses are minted on-chain.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: OWNERSHIP HISTORY */}
        {/* ============================================================ */}
        {activeTab === 'ownership' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <History className="w-5 h-5 text-tech-600 dark:text-tech-400" />
                  <span>Chronological Ownership Provenance</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Every title transfer is sequentially committed and signed via EVM smart contract logic.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-600 dark:text-slate-300">
                {bike.ownershipHistory?.length || 0} Sequential Events
              </span>
            </div>

            {/* Vertical Ownership Timeline */}
            <div className="relative pl-6 sm:pl-8 border-l-2 border-tech-500/30 dark:border-tech-500/20 space-y-8 my-4">
              {bike.ownershipHistory?.map((item, index) => {
                const isCurrent = index === bike.ownershipHistory.length - 1;
                return (
                  <div key={item.id} className="relative group">
                    {/* Timeline Node Icon */}
                    <div className={`absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full ring-4 ring-white dark:ring-slate-900 shadow-sm ${
                      isCurrent ? 'bg-emerald-500 ring-emerald-500/20' : 'bg-tech-600'
                    }`}></div>

                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded ${
                            isCurrent 
                              ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20' 
                              : 'bg-tech-500/10 text-tech-700 dark:text-tech-400 border border-tech-500/20'
                          }`}>
                            {item.eventType}
                          </span>
                          {isCurrent && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                              (Current Holder)
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-mono text-slate-500">
                          {formatDate(item.date)} • Year {item.year || 2026}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Released By (From)</span>
                          <div className="font-bold text-slate-900 dark:text-white mt-0.5">{item.from}</div>
                        </div>

                        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Acquired By (To)</span>
                          <div className="font-bold text-tech-600 dark:text-tech-400 mt-0.5">{item.to}</div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 italic bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                        "{item.notes}"
                      </p>

                      <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-500">
                        <span>Odometer at Transfer: <strong>{formatOdometer(item.odometer, 'km')}</strong></span>
                        <button
                          onClick={() => handleCopy(item.txReference || '0x94b3a1d48c0356bf8f49a37e6f8812c3b29014168e37e909a904d98a2458e0a3', `tx-${item.id}`)}
                          className="text-tech-600 dark:text-tech-400 hover:underline flex items-center gap-1"
                        >
                          <span>Tx: {item.txReference || '0x94b3a1...e0a3'}</span>
                          {copiedText === `tx-${item.id}` ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: SERVICE HISTORY */}
        {/* ============================================================ */}
        {activeTab === 'service' && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-tech-600 dark:text-tech-400" />
                  <span>Certified Maintenance & Workshop Records</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Each service entry is signed by an authorized workshop and anchored via its document hash to prevent odometer tampering.
                </p>
              </div>

              <div className="space-y-4">
                {bike.serviceHistory?.map(svc => (
                  <div key={svc.id} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
                      <div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">{svc.serviceType}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {svc.serviceCenter} • {formatDate(svc.date)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs px-3 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                          <Gauge className="w-3.5 h-3.5 text-tech-600 dark:text-tech-400" />
                          {formatOdometer(svc.odometer, 'km')}
                        </span>
                        <VerificationBadge status="Verified" size="sm" />
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {svc.description}
                    </p>

                    {/* Replaced Parts Chips */}
                    {svc.partsReplaced && svc.partsReplaced.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Parts Replaced</span>
                        <div className="flex flex-wrap gap-1.5">
                          {svc.partsReplaced.map((part, idx) => (
                            <span key={idx} className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-tech-500/10 text-tech-700 dark:text-tech-300 border border-tech-500/20">
                              {part}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Document SHA-256 Fingerprint */}
                    <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                      <div className="flex items-center gap-2 text-slate-500">
                        <FileCheck className="w-4 h-4 text-emerald-600" />
                        <span className="text-[11px]">Invoice SHA-256 Digest:</span>
                        <span className="text-tech-600 dark:text-tech-400 font-bold">
                          {truncateHash(svc.invoiceHash, 8, 8)}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopy(svc.invoiceHash, `hash-${svc.id}`)}
                        className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
                      >
                        {copiedText === `hash-${svc.id}` ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedText === `hash-${svc.id}` ? 'Copied' : 'Copy Hash'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Document Verification Tool directly on the Profile */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Binary className="w-4 h-4 text-tech-600 dark:text-tech-400" />
                    <span>Live SHA-256 Document Verification Sandbox</span>
                  </h4>
                  <p className="text-xs text-slate-500">
                    Test how BikeChain verifies off-chain workshop invoices against the stored on-chain hash.
                  </p>
                </div>
                <button
                  onClick={loadSampleInvoice}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
                >
                  Load Sample Invoice
                </button>
              </div>

              <textarea
                value={inputDocumentText}
                onChange={(e) => handleTestHash(e.target.value)}
                placeholder="Type or paste service invoice text here to compute its live SHA-256 fingerprint..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-tech-500"
              />

              {computedLiveHash && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-mono">
                  <div className="flex justify-between items-center text-slate-500">
                    <span>Live Computed SHA-256 Digest:</span>
                    <span className="text-[10px] text-slate-400">Web Crypto API</span>
                  </div>
                  <div className="break-all font-bold text-slate-900 dark:text-white">
                    {computedLiveHash}
                  </div>
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
                    {computedLiveHash.toLowerCase() === bike.storedDocumentHash?.toLowerCase() ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        Exact Match: Document is 100% authentic and untampered.
                      </span>
                    ) : (
                      <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                        <Shield className="w-4 h-4 text-amber-500" />
                        Different content produces a different cryptographic hash.
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: ACCIDENT / REPAIRS */}
        {/* ============================================================ */}
        {activeTab === 'repairs' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <span>Certified Accident & Structural Repair Records</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Unalterable incident logs signed by authorized inspection centers and insurer nodes.
              </p>
            </div>

            {(!bike.repairHistory || bike.repairHistory.length === 0) ? (
              <div className="p-10 text-center rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-emerald-800 dark:text-emerald-400">Zero Incident Record</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                  This motorcycle has no reported collisions, structural repairs, frame geometry deflection, or salvage insurance claims on the ledger.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {bike.repairHistory.map(rep => (
                  <div key={rep.id} className="p-5 rounded-xl border border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
                        {rep.severity} Record
                      </span>
                      <span className="text-xs font-mono text-slate-500">{formatDate(rep.date)}</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                      {rep.description}
                    </p>
                    <div className="pt-2 border-t border-amber-500/20 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-500">
                      <span>Certified By: <strong>{rep.authorizedBy}</strong></span>
                      <span className="text-tech-600 dark:text-tech-400">Tx: {truncateHash(rep.txHash)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 5: BLOCKCHAIN PROOF */}
        {/* ============================================================ */}
        {activeTab === 'blockchain' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
            
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-tech-600 dark:text-tech-400" />
                  <span>On-Chain Cryptographic Proof Model</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Solidity smart contract architecture & demonstration state mapping.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-tech-500/10 text-tech-700 dark:text-tech-300 font-mono text-xs font-bold border border-tech-500/20">
                {bike.blockchainModel?.statusLabel || "Phase 3 Smart Contract Model"}
              </span>
            </div>

            {/* Simulated Smart Contract Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <span className="text-[10px] text-slate-400 block uppercase font-sans font-bold">Target EVM Network</span>
                <span className="text-slate-800 dark:text-slate-200 font-bold">
                  {bike.blockchainModel?.network || "Ethereum Sepolia Testnet (EVM Target)"}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <span className="text-[10px] text-slate-400 block uppercase font-sans font-bold">Smart Contract</span>
                <span className="text-tech-600 dark:text-tech-400 break-all font-semibold select-all">
                  {bike.blockchainModel?.simulatedContractAddress || "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <span className="text-[10px] text-slate-400 block uppercase font-sans font-bold">Genesis Mint Transaction Hash</span>
                <span className="text-slate-800 dark:text-slate-200 break-all font-semibold select-all">
                  {bike.blockchainModel?.simulatedGenesisTx || "0x94b3a1d48c0356bf8f49a37e6f8812c3b29014168e37e909a904d98a2458e0a3"}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <span className="text-[10px] text-slate-400 block uppercase font-sans font-bold">Genesis Block Number</span>
                <span className="text-slate-800 dark:text-slate-200 font-bold">
                  Block #{bike.blockchainModel?.blockNumber || 5912408}
                </span>
              </div>
            </div>

            {/* Mapped Smart Contract Functions */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                Solidity Smart Contract Interface (`BikeChain.sol`)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs font-mono">
                {['registerBike()', 'transferOwnership()', 'addServiceRecord()', 'verifyRecord()'].map((fn, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                    <span className="text-tech-600 dark:text-tech-400">function </span>
                    <strong className="text-slate-900 dark:text-white">{fn}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic BCT Technical Disclosure Box */}
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2 text-xs">
              <h4 className="font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Academic BCT Viva Architecture Disclosure
              </h4>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px]">
                In BikeChain, off-chain storage (IPFS/database) handles high-resolution PDF invoices and heavy metadata, while the EVM smart contract immutably stores 256-bit cryptographic hashes and ownership balances. This maintains gas efficiency while guaranteeing tamper-proof verification.
              </p>
            </div>

          </div>
        )}

      </div>

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl text-center space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Motorcycle Verification QR</h3>
            <p className="text-xs text-slate-500">Scan this QR code to verify this motorcycle's history directly on any mobile device.</p>
            
            {/* Visual Clean SVG QR Code */}
            <div className="p-6 bg-white rounded-2xl border-2 border-slate-200 max-w-[220px] mx-auto shadow-inner">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* QR Finder Patterns */}
                <rect x="5" y="5" width="28" height="28" fill="#090D14" rx="4" />
                <rect x="10" y="10" width="18" height="18" fill="#ffffff" rx="2" />
                <rect x="14" y="14" width="10" height="10" fill="#2563eb" rx="2" />

                <rect x="67" y="5" width="28" height="28" fill="#090D14" rx="4" />
                <rect x="72" y="10" width="18" height="18" fill="#ffffff" rx="2" />
                <rect x="76" y="14" width="10" height="10" fill="#2563eb" rx="2" />

                <rect x="5" y="67" width="28" height="28" fill="#090D14" rx="4" />
                <rect x="10" y="72" width="18" height="18" fill="#ffffff" rx="2" />
                <rect x="14" y="76" width="10" height="10" fill="#2563eb" rx="2" />

                {/* Data modules */}
                <rect x="40" y="10" width="6" height="6" fill="#090D14" />
                <rect x="50" y="10" width="6" height="6" fill="#090D14" />
                <rect x="40" y="24" width="6" height="6" fill="#090D14" />
                <rect x="52" y="30" width="6" height="6" fill="#2563eb" />
                <rect x="20" y="44" width="6" height="6" fill="#090D14" />
                <rect x="32" y="44" width="6" height="6" fill="#090D14" />
                <rect x="44" y="44" width="12" height="12" fill="#090D14" />
                <rect x="62" y="44" width="6" height="6" fill="#090D14" />
                <rect x="74" y="44" width="6" height="6" fill="#090D14" />
                <rect x="12" y="54" width="6" height="6" fill="#090D14" />
                <rect x="72" y="54" width="6" height="6" fill="#090D14" />
                <rect x="40" y="68" width="6" height="6" fill="#090D14" />
                <rect x="52" y="74" width="6" height="6" fill="#090D14" />
                <rect x="68" y="72" width="8" height="8" fill="#090D14" />
                <rect x="80" y="80" width="10" height="10" fill="#2563eb" />
              </svg>
            </div>

            <div className="font-mono text-xs font-bold text-tech-600 dark:text-tech-400">
              {bike.id}
            </div>

            <p className="text-[11px] text-slate-400">
              Safe public payload: Direct cryptographic verification endpoint.
            </p>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
