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
  ExternalLink,
  History,
  FileCheck,
  Gauge,
  Wallet
} from 'lucide-react';
import StatCard from '../components/StatCard';
import VerificationBadge from '../components/VerificationBadge';
import { getAllMotorcycles } from '../data/mockBikes';
import { truncateAddress, formatOdometer } from '../utils/formatters';

export default function DashboardPage() {
  const context = useOutletContext() || {};
  const isWalletConnected = context.isWalletConnected || false;
  const walletAddress = context.walletAddress || '';
  const setIsWalletConnected = context.setIsWalletConnected || (() => {});
  const setWalletAddress = context.setWalletAddress || (() => {});
  const [selectedRole, setSelectedRole] = useState('owner'); // 'owner', 'dealer', 'service', 'admin'
  const bikes = getAllMotorcycles();

  const handleSimulateLogin = () => {
    setIsWalletConnected(true);
    setWalletAddress("0x71C8364237FDb33321558913F2459bAb83eE82A1");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Platform Dashboard
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono text-xs font-bold">
              Phase 1 Preview
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Role-based dashboard demonstration for Owners, Dealerships, Workshops, and Administrators.
          </p>
        </div>

        {/* Role Switcher Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto">
          {[
            { id: 'owner', label: 'Bike Owner', icon: UserCheck },
            { id: 'dealer', label: 'Dealer / OEM', icon: Building2 },
            { id: 'service', label: 'Service Center', icon: Wrench },
            { id: 'admin', label: 'Admin', icon: ShieldAlert },
          ].map(role => {
            const Icon = role.icon;
            const active = selectedRole === role.id;
            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  active
                    ? 'bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-sm'
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

      {/* Wallet Status Banner */}
      {!isWalletConnected && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500 text-slate-950 font-bold">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Connect Web3 Wallet to Transact</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Simulate wallet connection to view owned motorcycles, request ownership transfers, and inspect contract calls.
              </p>
            </div>
          </div>
          <button
            onClick={handleSimulateLogin}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shrink-0 shadow-sm transition-all"
          >
            Simulate Connect (Sepolia)
          </button>
        </div>
      )}

      {/* 4 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="My Motorcycles"
          value="3"
          subtitle="Registered on smart contract"
          icon={Layers}
          color="amber"
        />
        <StatCard
          title="Verified Records"
          value="27"
          subtitle="Cryptographically sealed"
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          title="Ownership Transfers"
          value="2"
          subtitle="Signed digital title handovers"
          icon={History}
          color="cyan"
        />
        <StatCard
          title="Service Records"
          value="18"
          subtitle="Certified workshop log entries"
          icon={FileCheck}
          color="indigo"
        />
      </div>

      {/* Dynamic Content based on Selected Role */}
      {selectedRole === 'owner' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              My Registered Motorcycles ({bikes.length})
            </h2>
            <Link
              to="/verify"
              className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
            >
              Verify Another Bike
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bikes.slice(0, 3).map(bike => (
              <div 
                key={bike.id}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-sm hover:border-amber-500/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="relative h-36 rounded-xl bg-slate-950 overflow-hidden">
                    <img
                      src={bike.image}
                      alt={bike.model}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-sm px-2 py-0.5 rounded font-mono text-[11px] text-amber-400 font-bold">
                      {bike.id}
                    </div>
                    <div className="absolute top-2 right-2">
                      <VerificationBadge status={bike.status} size="sm" />
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                      {bike.manufacturer} • {bike.year}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {bike.model}
                    </h3>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between text-xs text-slate-500 font-mono">
                    <span>Odometer:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{formatOdometer(bike.currentOdometer, bike.unit)}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                  <Link
                    to={`/bike/${bike.id}`}
                    className="flex-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs text-center transition-colors"
                  >
                    Quick View
                  </Link>
                  <button
                    onClick={() => alert(`Initiate Ownership Transfer for ${bike.id} (Will be wired to Solidity contract transferOwnership() in Phase 4)`)}
                    className="py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors"
                  >
                    Transfer Title
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedRole === 'dealer' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Authorized Dealer Management Hub
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Register new motorcycles, mint genesis blockchain passports, and record first retail assignment.
              </p>
            </div>
            <button
              onClick={() => alert("Registration form will trigger smart contract registerBike(...) in Phase 3/4")}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Register New Motorcycle</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-slate-400">Authorized Dealership</span>
              <div className="font-bold text-slate-800 dark:text-slate-200 text-sm">Apex RE Motocorp Hub #01</div>
              <div className="font-mono text-[11px] text-amber-600 dark:text-amber-400">0x2B4c6D3800...e19bC92A</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-slate-400">Registered Inventory</span>
              <div className="font-bold text-slate-800 dark:text-slate-200 text-sm">42 Units Minted</div>
              <div className="font-mono text-[11px] text-emerald-600">All Verified on Sepolia</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-slate-400">Smart Contract Role</span>
              <div className="font-bold text-slate-800 dark:text-slate-200 text-sm">DEALER_ROLE</div>
              <div className="font-mono text-[11px] text-slate-500">Access Granted by Admin</div>
            </div>
          </div>
        </div>
      )}

      {selectedRole === 'service' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Authorized Service Center Terminal
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Log authorized service records, odometer readings, parts serial hashes, and repair sign-offs.
              </p>
            </div>
            <button
              onClick={() => alert("Service record logger will trigger smart contract addServiceRecord(...) in Phase 3/4")}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Wrench className="w-4 h-4" />
              <span>Add Service Record</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-white">Authenticated Service Node: Apex Speedworks #04</h4>
            <p className="text-slate-500">Contract Address: <code className="font-mono text-cyan-600 dark:text-cyan-400">0x89e21Bc92847A119284bE281983C90184bE91823</code></p>
            <p className="text-slate-500">Permissions: Granted permission to call <code className="font-mono text-amber-500">addServiceRecord()</code> and <code className="font-mono text-amber-500">addPartsRecord()</code>.</p>
          </div>
        </div>
      )}

      {selectedRole === 'admin' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Platform Governance & Access Control
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Contract owner controls: Authorize/deauthorize certified dealerships and service centers.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 dark:text-white">Apex RE Motocorp</span>
                <span className="text-slate-500 block font-mono text-[11px]">0x2B4c6D3800F6a3b2b8032766324D63D4e19bC92A</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-600 font-bold font-mono">
                Authorized Dealer
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 dark:text-white">Apex Speedworks Service Hub #04</span>
                <span className="text-slate-500 block font-mono text-[11px]">0x89e21Bc92847A119284bE281983C90184bE91823</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-600 font-bold font-mono">
                Authorized Workshop
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
