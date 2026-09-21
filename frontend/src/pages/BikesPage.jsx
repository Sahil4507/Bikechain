import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, AlertCircle, ArrowUpRight, X } from 'lucide-react';
import { searchMotorcycles, getAllMotorcycles, getMotorcycleById } from '../data/mockBikes';
import BikeCard from '../components/BikeCard';

export default function BikesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const sampleIdentifiers = [
    { label: 'BC-0001', type: 'id' },
    { label: 'BC-0002', type: 'id' },
    { label: 'BC-0003', type: 'id' },
    { label: 'BC-0004', type: 'id' },
    { label: 'KA 03 AB 1234', type: 'plate' },
  ];

  const filteredBikes = useMemo(() => {
    return searchMotorcycles(searchQuery);
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) {
      setSearchParams({});
      return;
    }
    setSearchParams({ q });

    // If there is an exact single match by ID or Plate, open directly
    const exact = getMotorcycleById(q);
    if (exact) {
      navigate(`/bike/${exact.id}`);
    }
  };

  const handleSelectSample = (sampleText) => {
    setSearchQuery(sampleText);
    setSearchParams({ q: sampleText });
    const exact = getMotorcycleById(sampleText);
    if (exact) {
      navigate(`/bike/${exact.id}`);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchParams({});
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Find a Motorcycle Record
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Search by BikeChain ID or vehicle registration number to view verified records.
        </p>
      </div>

      {/* Prominent Search Box */}
      <div className="max-w-2xl mx-auto space-y-3">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter BikeChain ID or Number Plate"
              className="w-full pl-11 pr-9 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium shadow-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-sm transition-all shrink-0 active:scale-95"
          >
            Search
          </button>
        </form>

        {/* Sample IDs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Sample records:
          </span>
          {sampleIdentifiers.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleSelectSample(item.label)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-slate-700 text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 transition-colors"
            >
              <span>{item.label}</span>
              <ArrowUpRight className="w-3 h-3 opacity-60" />
            </button>
          ))}
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>
            {searchQuery ? (
              <>Showing search results for "<strong className="text-slate-900 dark:text-white">{searchQuery}</strong>"</>
            ) : (
              <>All Registered Motorcycles ({filteredBikes.length})</>
            )}
          </span>
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
            >
              Reset to All Bikes
            </button>
          )}
        </div>

        {filteredBikes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBikes.map((bike) => (
              <BikeCard key={bike.id} bike={bike} />
            ))}
          </div>
        ) : (
          /* Clear "No bike found" message with easy reset */
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                No Motorcycle Found
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                No record matched "{searchQuery}". Check the BikeChain ID or number plate, or test with one of the sample IDs above.
              </p>
            </div>
            <button
              onClick={handleClearSearch}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-all"
            >
              View All Registered Bikes
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
