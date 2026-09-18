import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Search, LayoutDashboard, Layers, HelpCircle, Menu, X, ArrowRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { name: 'Verify', path: '/verify', icon: Search },
    { name: 'Bikes', path: '/bikes', icon: Layers },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'How It Works', path: '/about', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Preserved Logo — Exact Visual Kept */}
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
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  active
                    ? 'bg-white dark:bg-slate-800 text-tech-600 dark:text-tech-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
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
          {/* Prototype Badge */}
          <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-mono font-medium text-slate-600 dark:text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            BCT Viva Prototype
          </span>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Primary Action Button: "Verify a Bike" */}
          <Link
            to="/verify"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-tech-600 hover:bg-tech-700 text-white text-xs font-bold transition-all shadow-sm active:scale-95"
          >
            <span>Verify a Bike</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Menu Toggle Button */}
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
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 space-y-2">
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
                    ? 'bg-tech-50 dark:bg-tech-950/40 text-tech-600 dark:text-tech-400 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {link.name}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <Link
              to="/verify"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-tech-600 text-white font-bold text-xs"
            >
              <span>Verify a Bike</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
