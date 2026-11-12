import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Smartphone, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  RotateCcw, 
  Clock, 
  Heart,
  CreditCard,
  MessageCircle,
  Truck
} from 'lucide-react';
import { CATEGORY_LIST, BRAND_LIST } from '../data/mockData';

export const Footer: React.FC = () => {
  const { 
    storeSettings, 
    setSelectedCategory, 
    setSelectedBrand, 
    setIsPolicyModal, 
    setIsOrderTrackingOpen 
  } = useApp();

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    setSelectedBrand('All');
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBrandClick = (brandName: string) => {
    setSelectedBrand(brandName);
    setSelectedCategory('All');
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToExchange = () => {
    const el = document.getElementById('sell-exchange-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-24 md:pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800 text-xs">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-extrabold text-white tracking-tight">CHARLIE</span>
                  <span className="text-xl font-light text-blue-500 tracking-tight">MOBILE</span>
                </div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  & ACCESSORIES • JAIPUR
                </span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              Your trusted electronics store in Jaipur for 100% genuine brand-sealed smartphones, iPhones, Samsung Galaxy, smart wearables, and premium GaN charging accessories.
            </p>

            <div className="space-y-2 pt-2 text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{storeSettings.address}, {storeSettings.city}, {storeSettings.state}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{storeSettings.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{storeSettings.email}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">
              Popular Categories
            </h4>
            <ul className="space-y-2">
              {CATEGORY_LIST.slice(0, 6).map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategoryClick(cat.id)}
                    className="hover:text-white transition-colors"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handleCategoryClick('Chargers and Cables')}
                  className="hover:text-white transition-colors"
                >
                  Chargers & Cables
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Brands */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">
              Top Brands
            </h4>
            <ul className="space-y-2">
              {['Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Vivo', 'Nothing'].map(brand => (
                <li key={brand}>
                  <button
                    onClick={() => handleBrandClick(brand)}
                    className="hover:text-white transition-colors"
                  >
                    {brand}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Customer Help & Policies */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">
              Customer Services
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setIsOrderTrackingOpen(true)}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-blue-400" />
                  <span>Track Your Order</span>
                </button>
              </li>
              <li>
                <button
                  onClick={scrollToExchange}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Sell / Exchange Old Phone</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsPolicyModal('shipping')}
                  className="hover:text-white transition-colors"
                >
                  Shipping & Delivery Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsPolicyModal('returns')}
                  className="hover:text-white transition-colors"
                >
                  7-Day Replacement Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsPolicyModal('terms')}
                  className="hover:text-white transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsPolicyModal('privacy')}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Payment Badges & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-slate-400">Accepted Payments:</span>
            <div className="flex items-center gap-2">
              <span className="bg-slate-900 px-2 py-1 rounded text-slate-300 font-bold border border-slate-800">UPI</span>
              <span className="bg-slate-900 px-2 py-1 rounded text-slate-300 font-bold border border-slate-800">Cards</span>
              <span className="bg-slate-900 px-2 py-1 rounded text-slate-300 font-bold border border-slate-800">NetBanking</span>
              <span className="bg-slate-900 px-2 py-1 rounded text-slate-300 font-bold border border-slate-800">COD</span>
              <span className="bg-slate-900 px-2 py-1 rounded text-slate-300 font-bold border border-slate-800">EMI</span>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p>© {new Date().getFullYear()} Charlie Mobile & Accessories. All rights reserved.</p>
            <p className="text-[11px] text-slate-600 mt-0.5">Indira Bazar, Jaipur, Rajasthan</p>
          </div>
        </div>

      </div>
    </footer>
  );
};
