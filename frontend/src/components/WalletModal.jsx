import React, { useState } from 'react';
import { X, Wallet, Shield, CheckCircle, ExternalLink, AlertTriangle } from 'lucide-react';
import { truncateAddress } from '../utils/formatters';

export default function WalletModal({ isOpen, onClose, isConnected, setIsConnected, walletAddress, setWalletAddress }) {
  if (!isOpen) return null;

  const [connecting, setConnecting] = useState(false);

  const handleConnectSimulated = () => {
    setConnecting(true);
    setTimeout(() => {
      setIsConnected(true);
      setWalletAddress("0x71C8364237FDb33321558913F2459bAb83eE82A1");
      setConnecting(false);
      onClose();
    }, 600);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setWalletAddress("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Web3 Wallet</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Ethereum & EVM Compatible</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-5 space-y-4">
          {isConnected ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" /> Connected
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-mono">
                    Sepolia Testnet
                  </span>
                </div>
                <p className="font-mono text-sm text-slate-800 dark:text-slate-200 font-semibold break-all">
                  {walletAddress}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  Role: <span className="font-semibold text-slate-700 dark:text-slate-300">Verified Motorcycle Owner</span>
                </p>
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                In Phase 4, your active MetaMask session will directly sign smart contract transactions for ownership transfers and registration.
              </div>

              <button
                onClick={handleDisconnect}
                className="w-full py-2.5 px-4 rounded-xl text-sm font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 border border-rose-200 dark:border-rose-500/20 transition-colors"
              >
                Disconnect Wallet
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Connect your Web3 wallet to manage registered motorcycles, authorize ownership transfers, or submit authenticated service records.
              </p>

              <div className="space-y-2.5">
                <button
                  onClick={handleConnectSimulated}
                  disabled={connecting}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-500 bg-slate-50 dark:bg-slate-800/70 hover:bg-amber-500/5 dark:hover:bg-amber-500/10 transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" 
                      alt="MetaMask" 
                      className="w-7 h-7 object-contain"
                    />
                    <div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        MetaMask
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {connecting ? "Connecting..." : "Simulate / Connect Sepolia"}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    Phase 1 Demo
                  </span>
                </button>
              </div>

              <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-xs text-amber-800 dark:text-amber-300">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
                <span>
                  <strong>Academic Project Note</strong>: Private keys are never requested or stored. All transactions occur exclusively on Ethereum testnets or local Hardhat nodes.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
