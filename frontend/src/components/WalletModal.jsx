import React, { useState } from 'react';
import { X, Wallet, ShieldCheck, CheckCircle, AlertCircle, ArrowRight, Layers } from 'lucide-react';
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
    }, 450);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setWalletAddress("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-tech-500/10 text-tech-600 dark:text-tech-400">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Web3 Wallet Architecture</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Planned Phase 3 Integration</p>
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
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" /> Connected (Demo Account)
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-mono">
                    Sepolia EVM
                  </span>
                </div>
                <p className="font-mono text-xs text-slate-800 dark:text-slate-200 font-semibold break-all">
                  {walletAddress}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  Simulated Owner: <strong className="text-slate-700 dark:text-slate-300">Priya Nair</strong>
                </p>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                In Phase 3, this wallet triggers Solidity smart contract calls such as <code className="font-mono font-bold text-tech-600">transferOwnership()</code> authenticated through cryptographic signatures.
              </div>

              <button
                onClick={handleDisconnect}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-950/50 border border-rose-200 dark:border-rose-900/50 transition-colors"
              >
                Disconnect Session
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Connect or simulate a Web3 wallet (such as MetaMask) to understand how vehicle ownership transfers and certified service entries are signed.
              </p>

              {/* Web3 flow diagram */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px] font-mono space-y-1.5">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Planned Web3 Flow</span>
                <div className="text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <span>User</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span>MetaMask</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span>Ethers.js</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span className="text-tech-600 dark:text-tech-400">Solidity</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleConnectSimulated}
                  disabled={connecting}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-tech-500 bg-slate-50 dark:bg-slate-800/70 hover:bg-tech-50/30 text-left transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Wallet className="w-5 h-5 text-tech-600 dark:text-tech-400" />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-tech-600 dark:group-hover:text-tech-400">
                        MetaMask / Web3 Wallet
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {connecting ? "Connecting demo session..." : "Simulate Demo Wallet Connection"}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-tech-500/10 text-tech-600 dark:text-tech-400">
                    Phase 1 Demo
                  </span>
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-tech-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Academic Honesty:</strong> The blockchain layer is in development (Phase 3). No actual mainnet gas fees or private keys are used.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
