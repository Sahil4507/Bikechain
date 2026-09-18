import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Layers, 
  PlusCircle, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  UserCheck, 
  Building2, 
  Wrench, 
  ShieldAlert, 
  History, 
  FileCheck, 
  Gauge, 
  Wallet,
  Copy,
  Check,
  ExternalLink,
  Search,
  Binary
} from 'lucide-react';
import StatCard from '../components/StatCard';
import BikeCard from '../components/BikeCard';
import VerificationBadge from '../components/VerificationBadge';
import { getAllMotorcycles, getRecentActivity } from '../data/mockBikes';
import { truncateAddress, truncateHash } from '../utils/formatters';

export default function DashboardPage() {
  const context = useOutletContext() || {};
  const isWalletConnected = context.isWalletConnected || false;
  const walletAddress = context.walletAddress || '';
  const setIsWalletConnected = context.setIsWalletConnected || (() => {});
  const setWalletAddress = context.setWalletAddress || (() => {});
  
  const [selectedRole, setSelectedRole] = useState('owner'); // 'owner', 'dealer', 'service', 'admin'
  const [copiedHash, setCopiedHash] = useState('');
  const [simulatedActionMessage, setSimulatedActionMessage] = useState('');

  const bikes = getAllMotorcycles();
  const recentActivities = getRecentActivity();

  const handleSimulateLogin = () => {
    setIsWalletConnected(true);
    setWalletAddress("0x71C8364237FDb33321558913F2459bAb83eE82A1");
  };

  const handleCopy = (text, id) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedHash(id);
    setTimeout(() => setCopiedHash(''), 2000);
  };

  const triggerSimulatedAction = (msg) => {
    setSimulatedActionMessage(msg);
    setTimeout(() => setSimulatedActionMessage(''), 4500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Platform & Role Management Hub
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-tech-500/10 text-tech-700 dark:text-tech-400 font-mono text-xs font-bold border border-tech-500/20">
              Phase 1 Preview
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Role-based perspectives for Vehicle Owners, Dealerships, Service Centers, and Smart Contract Governance.
          </p>
        </div>

        {/* Role Switcher Toolbar */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto scroller">
          {[
            { id: 'owner', label: 'Bike Owner', icon: UserCheck },
            { id: 'dealer', label: 'Authorized Dealer', icon: Building2 },
            { id: 'service', label: 'Service Center', icon: Wrench },
            { id: 'admin', label: 'Contract Admin', icon: ShieldAlert },
          ].map(role => {
            const Icon = role.icon;
            const active = selectedRole === role.id;
            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  active
                    ? 'bg-tech-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{role.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Simulated Action Notification Banner */}
      {simulatedActionMessage && (
        <div className="p-4 rounded-2xl bg-tech-500/10 border border-tech-500/30 text-xs text-tech-800 dark:text-tech-300 flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-tech-600 dark:text-tech-400 shrink-0" />
            <span>{simulatedActionMessage}</span>
          </div>
          <button 
            onClick={() => setSimulatedActionMessage('')}
            className="text-[11px] font-bold underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Wallet Status Banner */}
      {!isWalletConnected && (
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-tech-600 text-white font-bold">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Simulate Web3 Wallet Session</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Connect a test wallet to inspect custody titles, simulate ownership handovers, or sign service records.
              </p>
            </div>
          </div>
          <button
            onClick={handleSimulateLogin}
            className="px-4 py-2 rounded-xl bg-tech-600 hover:bg-tech-700 text-white font-bold text-xs shrink-0 shadow-sm transition-all active:scale-95"
          >
            Simulate Connect (Sepolia Demo)
          </button>
        </div>
      )}

      {/* 4 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Registered Motorcycles"
          value="4"
          subtitle="Digital vehicle passports minted"
          icon={Layers}
          color="blue"
        />
        <StatCard
          title="Verified Records"
          value="27"
          subtitle="Cryptographically sealed entries"
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          title="Ownership Transfers"
          value="8"
          subtitle="Signed digital title handovers"
          icon={History}
          color="cyan"
        />
        <StatCard
          title="Certified Services"
          value="14"
          subtitle="Workshop stamps with invoice hashes"
          icon={FileCheck}
          color="indigo"
        />
      </div>

      {/* Role-Based Interactive Showcase */}
      <div className="space-y-6">
        
        {/* ==================== ROLE: BIKE OWNER ==================== */}
        {selectedRole === 'owner' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-tech-600 dark:text-tech-400" />
                  <span>My Motorcycle Passports ({bikes.length} Demonstration Records)</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Manage title ownership, view odometer progression, and share public verification proofs.
                </p>
              </div>
              <Link
                to="/bikes"
                className="text-xs font-semibold text-tech-600 dark:text-tech-400 hover:underline flex items-center gap-1"
              >
                <span>View Full Registry Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Grid of Data-Driven Bike Cards (NO PHOTOS) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bikes.slice(0, 3).map(bike => (
                <BikeCard key={bike.id} bike={bike} />
              ))}
            </div>

            {/* Owner Actions Sandbox */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Simulate Owner Actions (Phase 3 Smart Contract Interface)
              </h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => triggerSimulatedAction("Initiated transferOwnership(0x71C8...82A1, 0x94B3...01a2). In Phase 3, this triggers MetaMask wallet signature.")}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors"
                >
                  Simulate Title Handover Request
                </button>
                <button
                  onClick={() => triggerSimulatedAction("Generated verification QR link for public inspection. Payload: https://bikechain.app/verify/BC-2026-RE-0001")}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors"
                >
                  Generate Shareable Proof Link
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== ROLE: AUTHORIZED DEALER ==================== */}
        {selectedRole === 'dealer' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-tech-600 dark:text-tech-400" />
                  <span>Authorized Dealership Management Hub</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Authorized to mint genesis motorcycle passports via <code className="font-mono text-tech-600 dark:text-tech-400">registerBike()</code>.
                </p>
              </div>
              <button
                onClick={() => triggerSimulatedAction("Simulated registerBike('BC-2026-NEW-0099', vinHash, initialOwner). Contract validates msg.sender has DEALER_ROLE.")}
                className="px-4 py-2 rounded-xl bg-tech-600 hover:bg-tech-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Simulate Registering New Motorcycle</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold block">Dealership Identity</span>
                <div className="font-bold text-slate-900 dark:text-white text-sm">Apex RE Motocorp Hub #01</div>
                <div className="font-mono text-[11px] text-tech-600 dark:text-tech-400">0x2B4c6D3800...e19bC92A</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold block">Smart Contract Access</span>
                <div className="font-bold text-slate-900 dark:text-white text-sm">DEALER_ROLE (Authorized)</div>
                <div className="font-mono text-[11px] text-emerald-600">AccessControl Permitted</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold block">Genesis Allocations</span>
                <div className="font-bold text-slate-900 dark:text-white text-sm">42 Passports Minted</div>
                <div className="font-mono text-[11px] text-slate-500">Sepolia EVM Target</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
              <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] block">
                Solidity Function Call Signature
              </span>
              <pre className="p-3 rounded-lg bg-white dark:bg-slate-900 font-mono text-[11px] text-slate-800 dark:text-slate-200 overflow-x-auto border border-slate-200 dark:border-slate-800">
{`function registerBike(
    string memory bikeId, 
    bytes32 vinHash, 
    address initialOwner, 
    uint16 productionYear
) external onlyRole(DEALER_ROLE);`}
              </pre>
            </div>
          </div>
        )}

        {/* ==================== ROLE: SERVICE CENTER ==================== */}
        {selectedRole === 'service' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-tech-600 dark:text-tech-400" />
                  <span>Authorized Service Center Terminal</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Append maintenance logs and tamper-proof odometer records via <code className="font-mono text-tech-600 dark:text-tech-400">addServiceRecord()</code>.
                </p>
              </div>
              <button
                onClick={() => triggerSimulatedAction("Simulated addServiceRecord('BC-2026-RE-0001', 4250, invoiceHash). Smart contract enforces strictly ascending odometer checks.")}
                className="px-4 py-2 rounded-xl bg-tech-600 hover:bg-tech-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
              >
                <FileCheck className="w-4 h-4" />
                <span>Simulate Appending Service Entry</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
              <h4 className="font-bold text-slate-900 dark:text-white">Authenticated Service Node: Apex Speedworks Workshop #04</h4>
              <p className="text-slate-500">Contract Address: <code className="font-mono text-tech-600 dark:text-tech-400">0x89e21Bc92847A119284bE281983C90184bE91823</code></p>
              <p className="text-slate-500">Role Status: Granted <code className="font-mono text-amber-500">WORKSHOP_ROLE</code> to append certified invoices and part serial numbers.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
              <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] block">
                Odometer Rollback Prevention Logic
              </span>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                In the Solidity smart contract, <code className="font-mono">require(newOdometer &gt;= bikes[bikeId].currentOdometer, "Odometer rollback detected")</code> prevents any corrupted workshop from registering a lower mileage reading.
              </p>
            </div>
          </div>
        )}

        {/* ==================== ROLE: CONTRACT ADMIN ==================== */}
        {selectedRole === 'admin' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-500" />
                <span>Platform Governance & Access Control</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Contract owner controls: Grant or revoke role memberships across ecosystem nodes.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">Apex RE Motocorp Hub #01</span>
                  <span className="text-slate-500 block font-mono text-[11px]">0x2B4c6D3800F6a3b2b8032766324D63D4e19bC92A</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold font-mono">
                    DEALER_ROLE
                  </span>
                  <button 
                    onClick={() => triggerSimulatedAction("Role permissions confirmed active on Sepolia.")}
                    className="px-2.5 py-1 rounded bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-[10px] font-semibold"
                  >
                    Inspect Role
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">Apex Speedworks Service Hub #04</span>
                  <span className="text-slate-500 block font-mono text-[11px]">0x89e21Bc92847A119284bE281983C90184bE91823</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 font-bold font-mono">
                    WORKSHOP_ROLE
                  </span>
                  <button 
                    onClick={() => triggerSimulatedAction("Role permissions confirmed active on Sepolia.")}
                    className="px-2.5 py-1 rounded bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-[10px] font-semibold"
                  >
                    Inspect Role
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Recent Platform Activity Audit Log Table */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <History className="w-5 h-5 text-tech-600 dark:text-tech-400" />
              <span>Immutable Activity Audit Log</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Real-time feed of recent registrations, transfers, and certified workshop entries.
            </p>
          </div>
          <span className="font-mono text-xs text-slate-400">
            {recentActivities.length} Recent Events Logged
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                <th className="py-3 px-3">Event Type</th>
                <th className="py-3 px-3">Motorcycle</th>
                <th className="py-3 px-3">Actor / Authorized Node</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Cryptographic Digest</th>
                <th className="py-3 px-3 text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
              {recentActivities.map((act, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-3 font-semibold text-slate-900 dark:text-white font-sans">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-xs">
                      {act.event}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <Link 
                      to={`/bike/${act.bikeId}`}
                      className="text-tech-600 dark:text-tech-400 hover:underline font-bold"
                    >
                      {act.motorcycle}
                    </Link>
                    <span className="text-slate-400 block text-[10px]">{act.bikeId}</span>
                  </td>
                  <td className="py-3.5 px-3 font-sans text-slate-700 dark:text-slate-300">
                    {act.actor}
                  </td>
                  <td className="py-3.5 px-3 text-slate-500">
                    {act.date}
                  </td>
                  <td className="py-3.5 px-3">
                    <button
                      onClick={() => handleCopy(act.hash, `act-${idx}`)}
                      className="text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 text-[11px]"
                    >
                      <span>{act.hash}</span>
                      {copiedHash === `act-${idx}` ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <VerificationBadge status={act.status} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Action Navigation Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
        <Link
          to="/verify"
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-tech-500/40 transition-all space-y-2 group shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 dark:text-white text-sm">Verify Motorcycle ID</span>
            <Search className="w-4 h-4 text-tech-600 dark:text-tech-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <p className="text-xs text-slate-500">Look up any BikeChain ID to inspect its public ledger passport.</p>
        </Link>

        <Link
          to="/bikes"
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-tech-500/40 transition-all space-y-2 group shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 dark:text-white text-sm">Browse Registry</span>
            <Layers className="w-4 h-4 text-tech-600 dark:text-tech-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <p className="text-xs text-slate-500">Explore demonstration records for Royal Enfield, KTM, BMW, and Triumph.</p>
        </Link>

        <Link
          to="/about"
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-tech-500/40 transition-all space-y-2 group shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 dark:text-white text-sm">Architecture & Viva Guide</span>
            <Binary className="w-4 h-4 text-tech-600 dark:text-tech-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <p className="text-xs text-slate-500">Read the 12-question viva defense sheet and Web3 architectural stack.</p>
        </Link>
      </div>

    </div>
  );
}
