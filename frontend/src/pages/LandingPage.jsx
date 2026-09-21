import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { getAllMotorcycles, getMotorcycleById } from '../data/mockBikes';
import BikeCard from '../components/BikeCard';

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const bikes = getAllMotorcycles();

  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) {
      navigate('/bikes');
      return;
    }

    const matchedBike = getMotorcycleById(q);
    if (matchedBike) {
      navigate(`/bike/${matchedBike.id}`);
    } else {
      // Navigate to the Find a Bike page with the query so the user sees "No bike found" with an option to reset
      navigate(`/bikes?q=${encodeURIComponent(q)}`);
    }
  };

  const sampleIdentifiers = [
    { label: 'BC-0001', type: 'id' },
    { label: 'BC-0002', type: 'id' },
    { label: 'BC-0003', type: 'id' },
    { label: 'BC-0004', type: 'id' },
    { label: 'KA 03 AB 1234', type: 'plate' },
  ];

  return (
    <div className="space-y-16 py-10 sm:py-16">
      
      {/* 1. Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Motorcycle Digital Record Platform</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          Every Bike Has a History.
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Find a motorcycle and explore its digital ownership and service records with BikeChain.
        </p>

        <div className="pt-2">
          <Link
            to="/bikes"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <span>Find a Bike</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 2. Prominent Search Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter BikeChain ID or Number Plate"
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-sm transition-all shrink-0 active:scale-95"
            >
              Search
            </button>
          </form>

          {/* Clickable Sample Demo IDs */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Sample IDs to test:
            </span>
            {sampleIdentifiers.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  setSearchQuery(item.label);
                  const matched = getMotorcycleById(item.label);
                  if (matched) {
                    navigate(`/bike/${matched.id}`);
                  }
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-slate-700 text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 transition-colors"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Recently Added Bikes */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Recently Added Bikes
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Explore verified motorcycle records registered in the digital ledger.
            </p>
          </div>
          <Link
            to="/bikes"
            className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
          >
            <span>View All Records</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Clean Text-Based Bike Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {bikes.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      </section>

    </div>
  );
}
