import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { 
  SlidersHorizontal, 
  ArrowUpDown, 
  X, 
  RotateCcw, 
  Sparkles,
  Check
} from 'lucide-react';
import { CATEGORY_LIST, BRAND_LIST } from '../data/mockData';

export const ProductGrid: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    selectedBrand,
    setSelectedBrand,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    activeTab,
    setActiveTab
  } = useApp();

  const [priceMax, setPriceMax] = useState<number>(160000);
  const [showFiltersDrawer, setShowFiltersDrawer] = useState<boolean>(false);

  // Tabs
  const tabs = [
    { id: 'all', label: 'All Products' },
    { id: 'bestsellers', label: 'Best Sellers' },
    { id: 'latest', label: 'Latest Smartphones' },
    { id: 'trending', label: 'Trending Products' },
    { id: 'deals', label: 'Best Deals' },
    { id: 'newarrivals', label: 'New Arrivals' }
  ];

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // Brand filter
      if (selectedBrand !== 'All' && product.brand !== selectedBrand) {
        return false;
      }

      // Search Query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesCat && !matchesDesc) {
          return false;
        }
      }

      // Price Filter
      if (product.price > priceMax) {
        return false;
      }

      // Tab filter
      if (activeTab === 'bestsellers' && !product.isBestSeller) return false;
      if (activeTab === 'latest' && !product.isLatest) return false;
      if (activeTab === 'trending' && !product.isTrending) return false;
      if (activeTab === 'deals' && (!product.isBestDeal && product.discountPercentage < 10)) return false;
      if (activeTab === 'newarrivals' && !product.isNewArrival && !product.isLatest) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isLatest ? 1 : 0) - (a.isLatest ? 1 : 0);
      return 0; // default featured
    });
  }, [products, selectedCategory, selectedBrand, searchQuery, priceMax, activeTab, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedBrand('All');
    setSearchQuery('');
    setPriceMax(160000);
    setActiveTab('all');
    setSortBy('featured');
  };

  const hasActiveFilters = selectedCategory !== 'All' || selectedBrand !== 'All' || searchQuery !== '' || priceMax < 160000 || activeTab !== 'all';

  return (
    <section id="products-section" className="py-10 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-bold text-blue-600 tracking-wider uppercase mb-1">
              CURRENT INVENTORY
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Featured Smartphones & Accessories
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Showing {filteredProducts.length} verified products ready for immediate dispatch or in-store pickup.
            </p>
          </div>

          {/* Controls: Filter toggle & Sort */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={() => setShowFiltersDrawer(!showFiltersDrawer)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                showFiltersDrawer || hasActiveFilters
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-amber-400" />
              )}
            </button>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-slate-200 text-slate-700 text-xs font-bold py-2 pl-3.5 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/30 cursor-pointer"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
                <option value="newest">Latest Releases</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Dynamic Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/70'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Collapsible Filter Panel */}
        {showFiltersDrawer && (
          <div className="bg-white p-5 rounded-3xl border border-slate-200 mb-6 shadow-sm animate-in slide-in-from-top-3 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-sm font-bold text-slate-900">Refine Your Selection</span>
              <button 
                onClick={clearAllFilters}
                className="text-xs font-semibold text-rose-600 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset All Filters
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
              {/* Category Filter */}
              <div>
                <label className="font-bold text-slate-800 block mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                >
                  <option value="All">All Categories</option>
                  {CATEGORY_LIST.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Brand Filter */}
              <div>
                <label className="font-bold text-slate-800 block mb-2">Brand</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                >
                  <option value="All">All Brands</option>
                  {BRAND_LIST.map(b => (
                    <option key={b.name} value={b.name}>{b.name}</option>
                  ))}
                </select>
              </div>

              {/* Max Price Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="font-bold text-slate-800">Max Budget</label>
                  <span className="font-bold text-blue-600">Up to ₹{priceMax.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="160000"
                  step="2000"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Pill Bar */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs text-slate-400 font-medium">Active:</span>

            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-200">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory('All')} className="hover:text-blue-900">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedBrand !== 'All' && (
              <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold border border-purple-200">
                Brand: {selectedBrand}
                <button onClick={() => setSelectedBrand('All')} className="hover:text-purple-900">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {searchQuery !== '' && (
              <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold border border-amber-200">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="hover:text-amber-950">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {priceMax < 160000 && (
              <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-xs font-semibold">
                Budget: &le; ₹{priceMax.toLocaleString('en-IN')}
                <button onClick={() => setPriceMax(160000)} className="hover:text-slate-900">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={clearAllFilters}
              className="text-xs text-slate-500 hover:text-slate-800 underline font-semibold ml-2"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 max-w-md mx-auto my-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center text-2xl">
              🔍
            </div>
            <h3 className="text-lg font-bold text-slate-900">No matching devices found</h3>
            <p className="text-xs text-slate-500">
              We couldn't find any products matching your current filters or search query.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
