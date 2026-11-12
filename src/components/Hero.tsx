import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  CreditCard,
  ChevronRight,
  Star
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { setSelectedCategory, setSelectedBrand, setQuickViewProduct, products } = useApp();

  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      badge: "NEW ARRIVAL • APPLE FLAGSHIP",
      title: "Apple iPhone 16 Pro",
      subtitle: "Grade 5 Titanium with Camera Control & A18 Pro Chip. Available now at Charlie Mobile.",
      price: "From ₹1,19,900",
      mrp: "₹1,29,900",
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1200&q=80",
      productId: "cm-iphone-16-pro",
      bgColor: "from-slate-900 via-slate-800 to-indigo-950",
      accentText: "100% Sealed Indian Unit with GST Invoice"
    },
    {
      badge: "GALAXY AI IS HERE",
      title: "Samsung Galaxy S24 Ultra",
      subtitle: "200MP Quad Tele System with embedded S-Pen and Snapdragon 8 Gen 3 for Galaxy.",
      price: "From ₹1,29,999",
      mrp: "₹1,34,999",
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1200&q=80",
      productId: "cm-s24-ultra",
      bgColor: "from-slate-900 via-zinc-900 to-slate-950",
      accentText: "Exchange Bonus up to ₹12,000"
    },
    {
      badge: "PURE FLUID PERFORMANCE",
      title: "OnePlus 12 5G",
      subtitle: "4th Gen Hasselblad Camera System with 100W SUPERVOOC and 2K 120Hz ProXDR display.",
      price: "From ₹64,999",
      mrp: "₹69,999",
      image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=1200&q=80",
      productId: "cm-oneplus-12",
      bgColor: "from-emerald-950 via-slate-900 to-slate-950",
      accentText: "Free Express Local Jaipur Delivery"
    }
  ];

  const current = heroSlides[activeSlide];

  const scrollToProducts = () => {
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToExchange = () => {
    const el = document.getElementById('sell-exchange-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleHeroProductClick = (productId: string) => {
    const found = products.find(p => p.id === productId);
    if (found) {
      setQuickViewProduct(found);
    } else {
      scrollToProducts();
    }
  };

  return (
    <section className="relative overflow-hidden pt-4 pb-8 md:pt-6 md:pb-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main Banner Container */}
        <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${current.bgColor} text-white shadow-2xl transition-all duration-700 min-h-[500px] md:min-h-[520px] flex flex-col justify-between p-6 sm:p-10 lg:p-12`}>
          
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Slide Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 my-auto">
            
            {/* Left Column: Text & CTAs */}
            <div className="lg:col-span-7 space-y-5 text-left">
              
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-white/15">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{current.badge}</span>
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
                  {current.title}
                </h1>
                <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                  {current.subtitle}
                </p>
              </div>

              {/* Price & Guarantee badge */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2.5">
                  <span className="text-xs text-slate-300 block">Verified Store Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white">
                      {current.price}
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      {current.mrp}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-emerald-300 font-medium bg-emerald-950/60 border border-emerald-500/30 px-3.5 py-2.5 rounded-2xl">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{current.accentText}</span>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  onClick={() => handleHeroProductClick(current.productId)}
                  className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 group active:scale-95"
                >
                  <span>Explore Device</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={scrollToExchange}
                  className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all backdrop-blur-md flex items-center gap-2 active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Exchange Old Phone</span>
                </button>

                <button
                  onClick={scrollToProducts}
                  className="px-4 py-3.5 text-xs text-slate-300 hover:text-white font-medium transition-colors"
                >
                  Browse All Smartphones →
                </button>
              </div>
            </div>

            {/* Right Column: Hero Smartphone Image Showcase */}
            <div className="lg:col-span-5 flex justify-center items-center relative">
              <div 
                onClick={() => handleHeroProductClick(current.productId)}
                className="cursor-pointer group relative w-full max-w-sm aspect-4/3 sm:aspect-square rounded-3xl overflow-hidden bg-white/5 border border-white/15 p-4 shadow-2xl transition-transform hover:scale-102"
              >
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover rounded-2xl shadow-inner group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute bottom-6 left-6 right-6 p-3 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/20 flex items-center justify-between text-white">
                  <div>
                    <p className="text-xs font-semibold">{current.title}</p>
                    <p className="text-[11px] text-slate-300">In Stock • Immediate Dispatch</p>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Slide Indicator Dots */}
          <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/10 mt-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === activeSlide ? 'w-8 bg-blue-500' : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Jaipur Store Open Today • 10:00 AM - 9:00 PM</span>
            </div>
          </div>

        </div>

        {/* Trust Badges Strip (Mobile Hub Style) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6">
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">100% Genuine Sealed</h4>
              <p className="text-[11px] text-slate-500">Official Brand Warranty</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Express Delivery</h4>
              <p className="text-[11px] text-slate-500">Free in Jaipur & pan-India</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Upgrade & Exchange</h4>
              <p className="text-[11px] text-slate-500">Instant fair phone valuation</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">No Cost EMI & COD</h4>
              <p className="text-[11px] text-slate-500">Leading bank credit cards</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
