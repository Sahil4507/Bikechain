import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
  ExternalLink, 
  Layers, 
  CheckCircle2, 
  QrCode, 
  FileText, 
  Copy, 
  Check, 
  Share2,
  Shield
} from 'lucide-react';
import { getMotorcycleById } from '../data/mockBikes';
import VerificationBadge from '../components/VerificationBadge';
import { truncateAddress, truncateHash, formatOdometer, formatDate } from '../utils/formatters';

export default function BikeProfilePage() {
  const { bikeId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedText, setCopiedText] = useState('');
  const [showQrModal, setShowQrModal] = useState(false);

  // Default to BC-2026-RE-0001 if /bike or /bike/ is accessed without param
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
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Motorcycle Not Found</h2>
        <p className="text-sm text-slate-500">The requested BikeChain ID "{bikeId}" does not exist in the demonstration registry.</p>
        <div className="pt-4">
          <Link
            to="/verify"
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Verification
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

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'ownership', label: 'Ownership', icon: History, badge: bike.ownershipHistory.length },
    { id: 'service', label: 'Service History', icon: Wrench, badge: bike.serviceHistory.length },
    { id: 'parts', label: 'Parts History', icon: Cpu, badge: bike.partsHistory.length },
    { id: 'repairs', label: 'Accident / Repairs', icon: AlertTriangle, badge: bike.repairHistory.length },
    { id: 'blockchain', label: 'Blockchain Proof', icon: Layers },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between">
        <Link
          to="/verify"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-amber-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Verification Hub</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowQrModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm transition-colors"
          >
            <QrCode className="w-3.5 h-3.5 text-amber-500" />
            <span>QR Verification</span>
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

      {/* Header Profile Hero Card */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Motorcycle Image Container */}
          <div className="lg:col-span-5 relative h-64 lg:h-auto bg-slate-950 overflow-hidden">
            <img
              src={bike.image}
              alt={`${bike.manufacturer} ${bike.model}`}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-950/50"></div>
            
            <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-700/80 text-xs font-mono font-bold text-amber-400">
              {bike.id}
            </div>
          </div>

          {/* Motorcycle Quick Specs & Status */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    {bike.manufacturer}
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span className="text-xs text-slate-500 font-semibold">{bike.year}</span>
                </div>
                <VerificationBadge status={bike.status} size="md" />
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {bike.model}
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Registered in <span className="font-semibold text-slate-900 dark:text-white">{bike.registrationNumber}</span>. 
                Equipped with {bike.engineCapacity}. Colorway finished in {bike.color}.
              </p>
            </div>

            {/* Micro Metrics Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">Odometer</span>
                <span className="font-mono text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  {formatOdometer(bike.currentOdometer, bike.unit)}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">Owners</span>
                <span className="font-mono text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  {bike.ownershipHistory.length} Recorded
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">Services</span>
                <span className="font-mono text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  {bike.serviceHistory.length} Certified
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">Integrity</span>
                <span className="font-mono text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  {bike.verificationScore}% Pure
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Modern Tabs Navigation */}
      <div className="border-b border-slate-200 dark:border-slate-800 overflow-x-auto scroller">
        <nav className="flex space-x-2 sm:space-x-4 min-w-max pb-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className={`px-2 py-0.2 rounded-full text-[10px] font-mono ${
                    isActive ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Panels */}
      <div className="space-y-6">

        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Identity & Technical Specs */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-500" />
                <span>Identity & Technical Passport</span>
              </h3>

              <div className="space-y-3 text-xs divide-y divide-slate-100 dark:divide-slate-800">
                <div className="flex justify-between py-2">
                  <span className="text-slate-500">BikeChain Unique ID</span>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{bike.id}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500">VIN (Masked for Privacy)</span>
                  <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">{bike.vinMasked}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500">VIN Cryptographic Hash (SHA-256)</span>
                  <button
                    onClick={() => handleCopy(bike.vinHash, 'vin')}
                    className="font-mono text-[11px] text-slate-600 dark:text-slate-400 hover:text-amber-500 flex items-center gap-1"
                  >
                    <span>{truncateHash(bike.vinHash, 10, 8)}</span>
                    {copiedText === 'vin' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500">Official Registration Number</span>
                  <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">{bike.registrationNumber}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500">Powertrain</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{bike.engineCapacity}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500">Body Type</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{bike.type}</span>
                </div>
              </div>
            </div>

            {/* Current Custody & Ownership Status */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-500" />
                <span>Current Custody & Ownership</span>
              </h3>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Current Owner Title</span>
                  <span className="font-bold text-slate-900 dark:text-white">{bike.currentOwner.holderType}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Holder Alias</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{bike.currentOwner.nameMasked}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Wallet Address</span>
                  <button
                    onClick={() => handleCopy(bike.currentOwner.walletAddress, 'owner')}
                    className="font-mono text-[11px] text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <span>{truncateAddress(bike.currentOwner.walletAddress)}</span>
                    {copiedText === 'owner' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Ownership Acquired</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">{formatDate(bike.currentOwner.acquiredDate)}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Title held in registered smart contract without outstanding liens or disputes.</span>
              </div>
            </div>

          </div>
        )}

        {/* 2. OWNERSHIP TAB */}
        {activeTab === 'ownership' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Chronological Ownership Provenance
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Every title handover is cryptographically signed and stored sequentially on the Ethereum ledger.
              </p>
            </div>

            {/* Timeline */}
            <div className="relative pl-6 sm:pl-8 border-l-2 border-amber-500/30 dark:border-amber-500/20 space-y-8">
              {bike.ownershipHistory.map((item, index) => (
                <div key={item.id} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-amber-500 ring-4 ring-white dark:ring-slate-900 shadow-sm"></div>

                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                        {item.eventType}
                      </span>
                      <span className="text-xs font-mono text-slate-500">
                        {formatDate(item.date)} • Block #{item.blockNumber}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                      <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">From</span>
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{item.fromTitle}</div>
                        <div className="font-mono text-[10px] text-slate-500 mt-0.5">{truncateAddress(item.fromAddress)}</div>
                      </div>

                      <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">To</span>
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{item.toTitle}</div>
                        <div className="font-mono text-[10px] text-slate-500 mt-0.5">{truncateAddress(item.toAddress)}</div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                      "{item.notes}"
                    </p>

                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-500">
                      <span>Odometer at Transfer: <strong>{formatOdometer(item.odometer, 'km')}</strong></span>
                      <button
                        onClick={() => handleCopy(item.txHash, `tx-${item.id}`)}
                        className="text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                      >
                        <span>Tx: {truncateHash(item.txHash)}</span>
                        {copiedText === `tx-${item.id}` ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. SERVICE HISTORY TAB */}
        {activeTab === 'service' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Certified Workshop Maintenance</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Authenticated service records signed by authorized workshops.</p>
              </div>
            </div>

            <div className="space-y-4">
              {bike.serviceHistory.map(svc => (
                <div key={svc.id} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">{svc.serviceType}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{svc.serviceCenter} • {formatDate(svc.date)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <Gauge className="w-3.5 h-3.5 text-amber-500" />
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
                          <span key={idx} className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                            {part}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Hashes & Tx */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono text-slate-500">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-950">
                      <span>Off-Chain Invoice SHA-256:</span>
                      <span className="text-cyan-600 dark:text-cyan-400">{truncateHash(svc.invoiceHash)}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-950">
                      <span>Smart Contract Tx:</span>
                      <span className="text-amber-600 dark:text-amber-400">{truncateHash(svc.txHash)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. PARTS HISTORY TAB */}
        {activeTab === 'parts' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Replaced Parts & Serial Hashes</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Preventing counterfeit parts fraud by recording genuine component serial hashes on-chain.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px]">
                    <th className="py-3 px-3">Part Component</th>
                    <th className="py-3 px-3">Part Number</th>
                    <th className="py-3 px-3">Installed Date</th>
                    <th className="py-3 px-3">Odometer</th>
                    <th className="py-3 px-3">Serial Cryptographic Hash</th>
                    <th className="py-3 px-3">On-Chain Tx</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {bike.partsHistory.map(part => (
                    <tr key={part.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">{part.partName}</td>
                      <td className="py-3 px-3 text-slate-500">{part.partNumber}</td>
                      <td className="py-3 px-3 text-slate-500">{formatDate(part.date)}</td>
                      <td className="py-3 px-3 font-bold text-amber-500">{formatOdometer(part.odometer, 'km')}</td>
                      <td className="py-3 px-3 text-cyan-600 dark:text-cyan-400">{truncateHash(part.serialHash)}</td>
                      <td className="py-3 px-3 text-amber-600 dark:text-amber-400">{truncateHash(part.txHash)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. ACCIDENT / REPAIR TAB */}
        {activeTab === 'repairs' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Accident & Major Repair Records</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Honest, unalterable incident logs certified by authorized inspection centers.</p>
            </div>

            {bike.repairHistory.length === 0 ? (
              <div className="p-10 text-center rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-emerald-700 dark:text-emerald-400">Zero Incident History</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                  This motorcycle has no reported collisions, structural repairs, frame geometry deflection, or insurance claim records on the blockchain ledger.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {bike.repairHistory.map(rep => (
                  <div key={rep.id} className="p-5 rounded-xl border border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                        {rep.severity} Record
                      </span>
                      <span className="text-xs font-mono text-slate-500">{formatDate(rep.date)}</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                      {rep.description}
                    </p>
                    <div className="pt-2 border-t border-amber-500/20 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-500">
                      <span>Inspection: <strong>{rep.authorizedBy}</strong></span>
                      <span className="text-amber-600 dark:text-amber-400">Tx: {truncateHash(rep.txHash)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 6. BLOCKCHAIN PROOF TAB */}
        {activeTab === 'blockchain' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-amber-500" />
                  <span>On-Chain Cryptographic Proof</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Verifiable ledger state, transaction hashes, and smart contract details.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono text-xs font-bold border border-amber-500/20">
                {bike.blockchain.network}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <span className="text-[10px] text-slate-400 block uppercase font-sans font-bold">Smart Contract Address</span>
                <span className="text-slate-800 dark:text-slate-200 break-all font-semibold select-all">
                  {bike.blockchain.contractAddress}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <span className="text-[10px] text-slate-400 block uppercase font-sans font-bold">Genesis Mint Transaction Hash</span>
                <span className="text-amber-600 dark:text-amber-400 break-all font-semibold select-all">
                  {bike.blockchain.registrationTxHash}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <span className="text-[10px] text-slate-400 block uppercase font-sans font-bold">Genesis Block Number</span>
                <span className="text-slate-800 dark:text-slate-200 font-bold">
                  Block #{bike.blockchain.blockNumber}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <span className="text-[10px] text-slate-400 block uppercase font-sans font-bold">Merkle Document Off-Chain Root</span>
                <span className="text-cyan-600 dark:text-cyan-400 break-all font-semibold select-all">
                  {bike.blockchain.merkleRoot}
                </span>
              </div>
            </div>

            {/* Academic BCT Viva Architecture Explainer */}
            <div className="p-5 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 space-y-2 text-xs">
              <h4 className="font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> BCT Technical Architecture Breakdown
              </h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                In BikeChain, heavy assets such as images and high-resolution service invoices are stored off-chain (IPFS / MongoDB). 
                Their SHA-256 digest is aggregated into a Merkle root and permanently minted into the Solidity smart contract. 
                Any modification of the invoice data instantly invalidates the cryptographic hash check, preventing tampering.
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
                <rect x="14" y="14" width="10" height="10" fill="#f59e0b" rx="2" />

                <rect x="67" y="5" width="28" height="28" fill="#090D14" rx="4" />
                <rect x="72" y="10" width="18" height="18" fill="#ffffff" rx="2" />
                <rect x="76" y="14" width="10" height="10" fill="#f59e0b" rx="2" />

                <rect x="5" y="67" width="28" height="28" fill="#090D14" rx="4" />
                <rect x="10" y="72" width="18" height="18" fill="#ffffff" rx="2" />
                <rect x="14" y="76" width="10" height="10" fill="#f59e0b" rx="2" />

                {/* Data modules */}
                <rect x="40" y="10" width="6" height="6" fill="#090D14" />
                <rect x="50" y="10" width="6" height="6" fill="#090D14" />
                <rect x="40" y="24" width="6" height="6" fill="#090D14" />
                <rect x="52" y="30" width="6" height="6" fill="#f59e0b" />
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
                <rect x="80" y="80" width="10" height="10" fill="#f59e0b" />
              </svg>
            </div>

            <div className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
              {bike.id}
            </div>

            <p className="text-[11px] text-slate-400">
              Safe public payload: Does not contain private personal data.
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
