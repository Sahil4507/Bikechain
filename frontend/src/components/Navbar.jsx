import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Search, LayoutDashboard, Wallet, Menu, X, CheckCircle2 } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import WalletModal from './WalletModal';
import { truncateAddress } from '../utils/formatters';

export default function Navbar({ isWalletConnected, setIsWalletConnected, walletAddress, setWalletAddress }) {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Verify Bike', path: '/verify', icon: Search },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-glow-amber text-slate-950 transition-transform group-hover:scale-105">
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                BIKE<span className="text-amber-500">CHAIN</span>
              </span>
              <span className="text-[10px] font-mono tracking-widest text-slate-500 dark:text-slate-400 uppercase -mt-1">
                Verifiable History
              </span>
            </div>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-900/60 p-1 rounded-xl border border-slate-200/50 dark:border-slate-800/60">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    active
                      ? 'bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Testnet Badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[11px] font-mono font-medium text-amber-600 dark:text-amber-400">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              Sepolia Testnet
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Wallet Button */}
            <button
              onClick={() => setIsWalletModalOpen(true)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-sm ${
                isWalletConnected
                  ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                  : 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-glow-amber hover:shadow-amber-500/30'
              }`}
            >
              {isWalletConnected ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-mono">{truncateAddress(walletAddress)}</span>
                </>
              ) : (
                <>
                  <Wallet className="w-3.5 h-3.5" />
                  <span>Connect Wallet</span>
                </>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 px-4 py-4 space-y-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium ${
                    active
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span>Network</span>
              <span className="font-mono text-amber-500">Sepolia Testnet</span>
            </div>
          </div>
        )}
      </header>

      {/* Wallet Modal */}
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        isConnected={isWalletConnected}
        setIsConnected={setIsWalletConnected}
        walletAddress={walletAddress}
        setWalletAddress={setWalletAddress}
      />
    </>
  );
}
