import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  MessageCircle, 
  Menu, 
  X, 
  Smartphone, 
  ShieldCheck, 
  SlidersHorizontal,
  ChevronDown,
  RotateCcw,
  Sparkles,
  PhoneCall,
  MapPin,
  Clock,
  CheckCircle2,
  Zap,
  ArrowRight,
  Store
} from 'lucide-react';
import { CATEGORY_LIST, BRAND_LIST } from '../data/mockData';

export const Header: React.FC = () => {
  const {
    storeSettings,
    cartItemCount,
    cartTotal,
    wishlist,
    user,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsAuthOpen,
    setIsOrderTrackingOpen,
    isAdminMode,
    setIsAdminMode,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedBrand,
    setSelectedBrand,
    products,
    setQuickViewProduct
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered suggestions for autocomplete
  const searchSuggestions = searchQuery.trim() === '' ? [] : products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 6);

  const openWhatsApp = () => {
    const text = encodeURIComponent(`Hello Charlie Mobile team! I am browsing your online store and would like expert assistance.`);
    window.open(`https://wa.me/${storeSettings.whatsapp}?text=${text}`, '_blank');
  };

  const scrollToExchange = () => {
    const el = document.getElementById('sell-exchange-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const scrollToProducts = () => {
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickFilterBrand = (brandName: string) => {
    if (selectedBrand === brandName) {
      setSelectedBrand('All');
    } else {
      setSelectedBrand(brandName);
      setSelectedCategory('All');
    }
    scrollToProducts();
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-100 shadow-xs">
      
      {/* 1. TOP PREMIUM ANNOUNCEMENT TICKER */}
      <div className="bg-slate-950 text-slate-200 text-xs py-2 px-3 sm:px-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Location & Trust Ticker */}
          <div className="flex items-center gap-3 overflow-hidden text-left">
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow-xs shrink-0">
              <CheckCircle2 className="w-3 h-3 text-amber-300" />
              VERIFIED STORE
            </span>

            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-300 truncate font-medium">
              <span className="flex items-center gap-1 text-slate-200 shrink-0">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="font-bold text-white">Indira Bazar, Jaipur</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className="truncate text-slate-300">
                {storeSettings.announcementText}
              </span>
            </div>
          </div>

          {/* Right Action Links */}
          <div className="hidden lg:flex items-center gap-5 shrink-0 text-xs font-semibold text-slate-300">
            <button 
              onClick={() => setIsOrderTrackingOpen(true)}
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-blue-400" />
              <span>Track Order</span>
            </button>

            <div className="w-px h-3 bg-slate-800" />

            <a 
              href={`tel:${storeSettings.phone}`}
              className="hover:text-white transition-colors flex items-center gap-1.5 text-slate-200"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>{storeSettings.phone}</span>
            </a>

            <div className="w-px h-3 bg-slate-800" />

            {/* Quick Admin Portal Switcher */}
            <button
              onClick={() => setIsAdminMode(!isAdminMode)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                isAdminMode 
                  ? 'bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300' 
                  : 'bg-slate-800/90 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              <SlidersHorizontal className="w-3 h-3 text-amber-400" />
              <span>{isAdminMode ? 'Exit Admin Mode' : 'Admin Portal'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVBAR */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3.5">
        <div className="flex items-center justify-between gap-3 lg:gap-6">
          
          {/* Mobile Hamburger & Logo Block */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Open navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* CHARLIE MOBILE & ACCESSORIES BRAND LOGO */}
            <button 
              onClick={() => {
                setSelectedCategory('All');
                setSelectedBrand('All');
                setSearchQuery('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 sm:gap-3 text-left group focus:outline-none"
            >
              {/* Luxury Tech Icon Emblem */}
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-slate-950 via-blue-900 to-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-900/20 group-hover:scale-105 transition-transform shrink-0 border border-blue-400/30">
                <Smartphone className="w-5 h-5 text-blue-200" />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" title="Store Open" />
              </div>

              {/* Brand Typography */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg sm:text-2xl font-black tracking-tight text-slate-950 font-['Space_Grotesk'] leading-none">
                    CHARLIE
                  </span>
                  <span className="text-lg sm:text-2xl font-bold tracking-tight text-blue-600 font-['Space_Grotesk'] leading-none">
                    MOBILE
                  </span>
                </div>

                <div className="flex items-center gap-1.5 mt-0.5 sm:mt-1">
                  <span className="text-[9px] sm:text-[10px] font-extrabold tracking-widest text-slate-600 uppercase">
                    & ACCESSORIES
                  </span>
                  <span className="text-slate-300 text-[10px]">•</span>
                  <span className="inline-flex items-center gap-0.5 text-[9px] sm:text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                    JAIPUR
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Search Bar with Live Suggestions Dropdown */}
          <div ref={searchContainerRef} className="hidden md:flex flex-1 max-w-xl relative">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search iPhone 16 Pro, Galaxy S24, AirPods, GaN chargers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full pl-10 pr-10 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/80 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 text-xs sm:text-sm transition-all placeholder:text-slate-400 font-medium shadow-xs"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Suggestions Dropdown */}
            {isSearchFocused && searchQuery.trim() !== '' && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 px-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 pb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Matching Devices & Accessories ({searchSuggestions.length})</span>
                  <span className="text-blue-600">Live Inventory</span>
                </div>
                {searchSuggestions.length > 0 ? (
                  searchSuggestions.map(product => (
                    <button
                      key={product.id}
                      onClick={() => {
                        setQuickViewProduct(product);
                        setIsSearchFocused(false);
                      }}
                      className="w-full flex items-center gap-3 p-2.5 hover:bg-slate-50 rounded-xl text-left transition-colors group"
                    >
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="w-11 h-11 object-contain rounded-xl bg-slate-50 p-1 shrink-0 border border-slate-100 group-hover:scale-105 transition-transform" 
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {product.brand} • {product.storage} • <span className="text-emerald-600 font-semibold">In Stock</span>
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs sm:text-sm font-extrabold text-blue-600">₹{product.price.toLocaleString('en-IN')}</p>
                        {product.mrp > product.price && (
                          <p className="text-[10px] text-slate-400 line-through">₹{product.mrp.toLocaleString('en-IN')}</p>
                        )}
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-4 text-center text-xs text-slate-500">
                    No matching smartphones found for "{searchQuery}". Try "Apple", "Samsung", or "Charger".
                  </div>
                )}
                <div className="mt-2 pt-2 border-t border-slate-100 px-3 flex justify-between items-center text-xs text-slate-500">
                  <span>Press enter to view all matching results</span>
                  <button 
                    onClick={() => {
                      scrollToProducts();
                      setIsSearchFocused(false);
                    }}
                    className="text-blue-600 font-bold hover:underline"
                  >
                    View All in Grid →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            
            {/* WhatsApp Store Chat Button */}
            <button
              onClick={openWhatsApp}
              className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-2xl text-emerald-800 bg-emerald-50 hover:bg-emerald-100 font-bold text-xs transition-colors border border-emerald-200/80 shadow-xs group"
              title="Chat with Store on WhatsApp"
            >
              <div className="relative">
                <MessageCircle className="w-4 h-4 fill-emerald-600 text-white" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <span>WhatsApp Store</span>
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 rounded-2xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center ring-2 ring-white">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 p-2 sm:px-3.5 sm:py-2 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-slate-900/10 group"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-105 transition-transform" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 w-4 h-4 rounded-full bg-blue-500 text-white text-[10px] font-black flex items-center justify-center ring-2 ring-slate-950">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] text-slate-400 font-medium leading-none">Bag</span>
                <span className="text-xs font-black leading-tight text-white">
                  ₹{cartTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </button>

            {/* Customer Account Button */}
            <button
              onClick={() => setIsAuthOpen(true)}
              className="p-2 sm:px-3 sm:py-2 rounded-2xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
              aria-label="Customer Account"
            >
              <div className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700">
                {user ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
              </div>
              {user && (
                <span className="hidden xl:inline text-xs font-bold text-slate-800 truncate max-w-[80px]">
                  {user.name.split(' ')[0]}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* 3. MOBILE MODERN APP-STYLE SEARCH BAR (Visible on mobile/tablet) */}
        <div className="mt-2.5 md:hidden">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search iPhone 16, Galaxy S24, chargers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 shadow-inner"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 p-1"
                aria-label="Clear query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* 4. MOBILE QUICK BRAND CHIPS STRIP (Recent 2026 Mobile Retail UX) */}
        <div className="mt-2.5 md:hidden flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-[11px] font-bold">
          <button
            onClick={() => {
              setSelectedBrand('All');
              setSelectedCategory('All');
              scrollToProducts();
            }}
            className={`px-3 py-1 rounded-full whitespace-nowrap transition-all ${
              selectedBrand === 'All' && selectedCategory === 'All'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Products
          </button>
          {['Apple', 'Samsung', 'OnePlus', 'Nothing', 'Vivo', 'Redmi', 'iQOO'].map((brand) => (
            <button
              key={brand}
              onClick={() => quickFilterBrand(brand)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-all ${
                selectedBrand === brand
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {brand}
            </button>
          ))}
          <button
            onClick={() => {
              setSelectedCategory('Chargers and Cables');
              scrollToProducts();
            }}
            className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 whitespace-nowrap hover:bg-slate-200"
          >
            ⚡ Chargers
          </button>
        </div>

        {/* 5. DESKTOP NAVIGATION STRIP */}
        <nav className="hidden md:flex items-center justify-between border-t border-slate-100 mt-3 pt-2 text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-5 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedBrand('All');
                scrollToProducts();
              }}
              className={`whitespace-nowrap transition-colors pb-0.5 ${
                selectedCategory === 'All' && selectedBrand === 'All'
                  ? 'text-blue-600 font-extrabold border-b-2 border-blue-600'
                  : 'hover:text-slate-950'
              }`}
            >
              All Inventory
            </button>
            {CATEGORY_LIST.slice(0, 7).map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSelectedBrand('All');
                  scrollToProducts();
                }}
                className={`whitespace-nowrap transition-colors pb-0.5 ${
                  selectedCategory === cat.id 
                    ? 'text-blue-600 font-extrabold border-b-2 border-blue-600' 
                    : 'hover:text-slate-950'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 shrink-0 pl-4 border-l border-slate-200">
            <button
              onClick={scrollToExchange}
              className="flex items-center gap-1.5 text-blue-700 hover:text-blue-900 font-extrabold bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-xl transition-colors border border-blue-200/60"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Exchange Old Smartphone (Up to ₹12k Bonus)</span>
            </button>
          </div>
        </nav>
      </div>

      {/* 6. MOBILE MODERN SLIDE-OVER DRAWER */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-4 shadow-2xl animate-in slide-in-from-top-2 max-h-[85vh] overflow-y-auto">
          
          {/* Store Location & Status Card */}
          <div className="p-3.5 rounded-2xl bg-slate-900 text-white space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs flex items-center gap-1.5 text-blue-300">
                <Store className="w-3.5 h-3.5" />
                Charlie Mobile Retail Store
              </span>
              <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                🟢 Open Now
              </span>
            </div>
            <p className="text-[11px] text-slate-300">
              {storeSettings.address}, {storeSettings.city}
            </p>
            <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[10px] text-slate-400">
              <span>Timings: 10:00 AM - 9:00 PM</span>
              <a href={`tel:${storeSettings.phone}`} className="text-blue-400 font-bold hover:underline">
                Call Store
              </a>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={scrollToExchange}
              className="p-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center gap-2 shadow-sm text-left"
            >
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
              <div>
                <p className="leading-tight">Phone Exchange</p>
                <p className="text-[9px] text-blue-200 font-normal">Get instant quote</p>
              </div>
            </button>

            <button
              onClick={() => {
                setIsOrderTrackingOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="p-3 rounded-2xl bg-slate-100 text-slate-800 font-bold text-xs flex items-center gap-2 text-left hover:bg-slate-200 transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-blue-600 shrink-0" />
              <div>
                <p className="leading-tight">Track Order</p>
                <p className="text-[9px] text-slate-500 font-normal">Check status</p>
              </div>
            </button>
          </div>

          {/* Categories Grid */}
          <div className="space-y-1.5 pt-1">
            <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider px-1">
              Shop Categories
            </div>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORY_LIST.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSelectedBrand('All');
                    setIsMobileMenuOpen(false);
                    scrollToProducts();
                  }}
                  className={`text-left text-xs font-bold p-2.5 rounded-xl border transition-all flex items-center justify-between ${
                    selectedCategory === cat.id
                      ? 'bg-blue-50 border-blue-400 text-blue-700'
                      : 'bg-slate-50 border-slate-100 text-slate-700 hover:bg-white'
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 -rotate-90" />
                </button>
              ))}
            </div>
          </div>

          {/* Admin Toggle on Mobile */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
            <span className="text-xs font-bold text-slate-700">Admin Control Portal</span>
            <button
              onClick={() => {
                setIsAdminMode(!isAdminMode);
                setIsMobileMenuOpen(false);
              }}
              className={`px-3 py-1 text-xs font-extrabold rounded-lg transition-colors ${
                isAdminMode ? 'bg-amber-400 text-slate-950' : 'bg-slate-900 text-white'
              }`}
            >
              {isAdminMode ? 'Exit Admin' : 'Open Admin'}
            </button>
          </div>

          {/* Direct WhatsApp Call */}
          <button
            onClick={openWhatsApp}
            className="w-full flex items-center justify-center gap-2 p-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl text-xs shadow-sm transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat with Charlie Mobile on WhatsApp</span>
          </button>
        </div>
      )}
    </header>
  );
};
