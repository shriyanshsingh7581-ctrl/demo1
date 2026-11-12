import React from 'react';
import { useApp } from '../context/AppContext';
import { BRAND_LIST } from '../data/mockData';
import { Sparkles, Check } from 'lucide-react';

export const BrandSection: React.FC = () => {
  const { selectedBrand, setSelectedBrand, setSelectedCategory, products } = useApp();

  const handleBrandClick = (brandName: string) => {
    if (selectedBrand === brandName) {
      setSelectedBrand('All');
    } else {
      setSelectedBrand(brandName);
      setSelectedCategory('All');
    }
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const getBrandProductCount = (brandName: string) => {
    return products.filter(p => p.brand === brandName).length;
  };

  return (
    <section className="py-8 bg-slate-50/60 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
          <div>
            <div className="text-[11px] font-bold text-blue-600 tracking-wider uppercase">
              AUTHORIZED DISTRIBUTORS
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Shop by Brand
            </h2>
          </div>
          <div className="text-xs text-slate-500">
            {selectedBrand !== 'All' ? (
              <span className="inline-flex items-center gap-1 font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                Filtering: {selectedBrand}
                <button 
                  onClick={() => setSelectedBrand('All')}
                  className="ml-1 text-slate-400 hover:text-slate-700"
                >
                  ✕
                </button>
              </span>
            ) : (
              <span>100% Brand Sealed Guarantee</span>
            )}
          </div>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {BRAND_LIST.map((brand) => {
            const isSelected = selectedBrand === brand.name;
            const count = getBrandProductCount(brand.name);

            return (
              <button
                key={brand.name}
                onClick={() => handleBrandClick(brand.name)}
                className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20'
                    : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-sm text-slate-900'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-800'
                }`}>
                  {brand.logo}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold truncate">
                      {brand.name}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                  </div>
                  <span className={`text-[10px] block truncate ${
                    isSelected ? 'text-blue-100' : 'text-slate-500'
                  }`}>
                    {count > 0 ? `${count} models` : brand.tag}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
