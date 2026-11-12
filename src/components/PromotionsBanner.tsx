import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Sparkles, Zap, Percent, ShieldCheck } from 'lucide-react';

export const PromotionsBanner: React.FC = () => {
  const { setSelectedCategory, setSelectedBrand } = useApp();

  const handleBannerClick = (category: string, brand?: string) => {
    setSelectedCategory(category);
    if (brand) setSelectedBrand(brand);
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToExchange = () => {
    const el = document.getElementById('sell-exchange-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Banner 1: Apple Festive Showcase */}
          <div 
            onClick={() => handleBannerClick('iPhones', 'Apple')}
            className="group relative rounded-3xl overflow-hidden p-6 sm:p-7 bg-gradient-to-br from-slate-900 to-indigo-950 text-white cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[220px]"
          >
            <div className="relative z-10 space-y-2">
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border border-white/15">
                <Sparkles className="w-3 h-3 text-amber-300" />
                APPLE ARENA
              </span>
              <h3 className="text-xl font-extrabold tracking-tight">
                iPhone 16 & 15 Series
              </h3>
              <p className="text-xs text-slate-300 max-w-xs">
                Official Apple warranty, verified GST invoicing & No Cost EMI options.
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-4">
              <span className="text-xs font-bold text-amber-300">From ₹69,900</span>
              <span className="w-8 h-8 rounded-full bg-white/20 group-hover:bg-white text-white group-hover:text-slate-900 flex items-center justify-center transition-all">
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>

            <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Banner 2: Premium Accessories Fest */}
          <div 
            onClick={() => handleBannerClick('Chargers and Cables')}
            className="group relative rounded-3xl overflow-hidden p-6 sm:p-7 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[220px]"
          >
            <div className="relative z-10 space-y-2">
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border border-white/15">
                <Zap className="w-3 h-3 text-amber-300" />
                HIGH SPEED CHARGING
              </span>
              <h3 className="text-xl font-extrabold tracking-tight">
                GaN Fast Chargers & Cables
              </h3>
              <p className="text-xs text-slate-200 max-w-xs">
                Up to 67W multi-port adapters, braided Type-C cords & tough Spigen covers.
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-4">
              <span className="text-xs font-bold text-emerald-300">Up to 33% Off Verified</span>
              <span className="w-8 h-8 rounded-full bg-white/20 group-hover:bg-white text-white group-hover:text-slate-900 flex items-center justify-center transition-all">
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>

            <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Banner 3: Smartphone Exchange Offer */}
          <div 
            onClick={scrollToExchange}
            className="group relative rounded-3xl overflow-hidden p-6 sm:p-7 bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-950 text-white cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[220px] md:col-span-2 lg:col-span-1"
          >
            <div className="relative z-10 space-y-2">
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border border-white/15">
                <Percent className="w-3 h-3 text-amber-300" />
                UPGRADE PROGRAM
              </span>
              <h3 className="text-xl font-extrabold tracking-tight">
                ₹12,000 Exchange Bonus
              </h3>
              <p className="text-xs text-slate-300 max-w-xs">
                Turn your old working smartphone into instant savings on flagship devices.
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-4">
              <span className="text-xs font-bold text-white underline">Instant Valuation →</span>
              <span className="w-8 h-8 rounded-full bg-white/20 group-hover:bg-white text-white group-hover:text-emerald-900 flex items-center justify-center transition-all">
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>

            <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-teal-400/20 rounded-full blur-2xl pointer-events-none" />
          </div>

        </div>

      </div>
    </section>
  );
};
