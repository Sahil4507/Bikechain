import React, { useState, useMemo } from 'react';
import { Search, Filter, Layers, ShieldCheck, Database, Calendar, UserCheck, AlertCircle } from 'lucide-react';
import { DEMO_MOTORCYCLES } from '../data/mockBikes';
import BikeCard from '../components/BikeCard';

export default function BikesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedManufacturer, setSelectedManufacturer] = useState('All');

  const categories = ['All', 'Roadster', 'Naked Sport', 'Superbike'];
  const manufacturers = ['All', 'Royal Enfield', 'KTM', 'BMW Motorrad', 'Triumph'];

  const filteredBikes = useMemo(() => {
    return DEMO_MOTORCYCLES.filter((bike) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        bike.id.toLowerCase().includes(q) ||
        bike.model.toLowerCase().includes(q) ||
        bike.manufacturer.toLowerCase().includes(q) ||
        bike.registrationNumber.toLowerCase().includes(q) ||
        bike.currentOwner?.name?.toLowerCase().includes(q);

      const matchesCategory =
        selectedCategory === 'All' || bike.category === selectedCategory;

      const matchesManufacturer =
        selectedManufacturer === 'All' || bike.manufacturer === selectedManufacturer;

      return matchesSearch && matchesCategory && matchesManufacturer;
    });
  }, [searchQuery, selectedCategory, selectedManufacturer]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tech-500/10 border border-tech-500/20 text-xs font-mono font-bold text-tech-700 dark:text-tech-300">
          <Layers className="w-3.5 h-3.5" />
          <span>VEHICLE LEDGER REGISTRY</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Demonstration Motorcycle Registry
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Browse verified motorcycle records registered in BikeChain's digital vehicle passport system. 
          Each record maintains an immutable audit trail of ownership, verified odometers, and service document hashes.
        </p>
      </div>

      {/* Filter & Search Bar Controls */}
      <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Model, ID (BC-2026-RE-0001), Make, or Owner name..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-tech-500"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="md:col-span-3 flex items-center gap-1.5 overflow-x-auto scroller pb-1">
            <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider shrink-0 mr-1">
              Class:
            </span>
            <div className="flex gap-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-tech-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Manufacturer Filter */}
          <div className="md:col-span-3 flex items-center gap-1.5 overflow-x-auto scroller pb-1">
            <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider shrink-0 mr-1">
              Brand:
            </span>
            <div className="flex gap-1">
              {manufacturers.map((mfg) => (
                <button
                  key={mfg}
                  onClick={() => setSelectedManufacturer(mfg)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedManufacturer === mfg
                      ? 'bg-tech-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {mfg}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Results Metadata */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800/80">
          <span>
            Showing <strong className="text-slate-800 dark:text-slate-200">{filteredBikes.length}</strong> registered motorcycle{filteredBikes.length !== 1 ? 's' : ''}
          </span>
          <span className="font-mono text-[11px] text-slate-400">
            No bike photos — Pure cryptographic data records
          </span>
        </div>
      </div>

      {/* Motorcycle Cards Grid (Pure Data Passports) */}
      {filteredBikes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBikes.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No Motorcycles Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No demonstration motorcycle records matched your search query. Try clearing filters or searching for "Royal Enfield", "KTM", or "Priya Nair".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedManufacturer('All');
            }}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Architectural Callout: Why No Photos? */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-tech-600 dark:text-tech-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Academic Design Principle: Data-First Digital Vehicle Identity
          </h3>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl">
          BikeChain intentionally avoids decorative vehicle stock photography. Vehicle title verification, odometer fraud prevention, and ownership provenance rely entirely on structured data: VIN hashes, production years, mileage telemetry, cryptographic invoice digests, and Ethereum wallet addresses. 
          Heavy media assets remain in off-chain decentralized storage while the blockchain secures trust.
        </p>
      </div>

    </div>
  );
}
