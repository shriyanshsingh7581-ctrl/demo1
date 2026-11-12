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
  PhoneCall
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
  ).slice(0, 5);

  const openWhatsApp = () => {
    const text = encodeURIComponent(`Hi Charlie Mobile team, I'm browsing your online store and would like assistance.`);
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

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-slate-900 text-slate-100 text-xs py-2 px-4 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="bg-blue-600 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded text-white shrink-0">
              OFFICIAL STORE
            </span>
            <p className="truncate text-slate-300 font-medium">
              {storeSettings.announcementText}
            </p>
          </div>

          <div className="hidden md:flex items-center gap-6 shrink-0 text-slate-300 font-medium">
            <button 
              onClick={() => setIsOrderTrackingOpen(true)}
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-blue-400" />
              <span>Track Order</span>
            </button>
            <div className="w-px h-3 bg-slate-700" />
            <a 
              href={`tel:${storeSettings.phone}`}
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>{storeSettings.phone}</span>
            </a>
            <div className="w-px h-3 bg-slate-700" />
            {/* Quick Admin Portal Toggle for easy review & management */}
            <button
              onClick={() => setIsAdminMode(!isAdminMode)}
              className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all ${
                isAdminMode 
                  ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300' 
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              <SlidersHorizontal className="w-3 h-3 text-amber-400" />
              <span>{isAdminMode ? 'Exit Admin' : 'Admin Portal'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex items-center justify-between gap-3 lg:gap-8">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                setSelectedCategory('All');
                setSelectedBrand('All');
                setSearchQuery('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                    CHARLIE
                  </span>
                  <span className="text-xl font-light tracking-tight text-blue-600">
                    MOBILE
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
                  <span>& Accessories</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-emerald-600 font-bold">Jaipur Store</span>
                </div>
              </div>
            </button>
          </div>

          {/* Search Bar with live autocomplete (Desktop & Tablet) */}
          <div ref={searchContainerRef} className="hidden md:flex flex-1 max-w-xl relative">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search iPhone 16 Pro, Galaxy S24, AirPods, GaN chargers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full pl-10 pr-10 py-2.5 rounded-full border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 text-sm transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Autocomplete Dropdown */}
            {isSearchFocused && searchQuery.trim() !== '' && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 px-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 pb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Matching Products ({searchSuggestions.length})
                </div>
                {searchSuggestions.length > 0 ? (
                  searchSuggestions.map(product => (
                    <button
                      key={product.id}
                      onClick={() => {
                        setQuickViewProduct(product);
                        setIsSearchFocused(false);
                      }}
                      className="w-full flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl text-left transition-colors"
                    >
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="w-10 h-10 object-cover rounded-lg bg-slate-100 shrink-0" 
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">{product.name}</p>
                        <p className="text-xs text-slate-500">{product.brand} • {product.category}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-blue-600">₹{product.price.toLocaleString('en-IN')}</p>
                        <p className="text-[10px] text-slate-400 line-through">₹{product.mrp.toLocaleString('en-IN')}</p>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-center text-sm text-slate-500">
                    No matching smartphones or accessories found for "{searchQuery}".
                  </div>
                )}
                <div className="mt-2 pt-2 border-t border-slate-100 px-3 flex justify-between items-center text-xs text-slate-500">
                  <span>Press enter to see all results</span>
                  <button 
                    onClick={() => {
                      scrollToProducts();
                      setIsSearchFocused(false);
                    }}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    View All Filtered
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* WhatsApp direct chat */}
            <button
              onClick={openWhatsApp}
              className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl text-emerald-700 bg-emerald-50 hover:bg-emerald-100 font-semibold text-xs transition-colors border border-emerald-200"
              title="Chat with Store on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-600 text-white" />
              <span>WhatsApp Store</span>
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-all shadow-sm group"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] text-slate-400 font-normal leading-none">Bag</span>
                <span className="text-xs font-bold leading-tight">
                  ₹{cartTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </button>

            {/* Account */}
            <button
              onClick={() => setIsAuthOpen(true)}
              className="p-2.5 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
              aria-label="Customer Account"
            >
              <User className="w-5 h-5" />
              {user && (
                <span className="hidden xl:inline text-xs font-semibold text-slate-800 truncate max-w-[80px]">
                  {user.name.split(' ')[0]}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Open mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search smartphones, accessories, brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Desktop Category Navigation Strip */}
        <nav className="hidden md:flex items-center justify-between border-t border-slate-100 mt-3 pt-2 text-xs font-medium text-slate-600">
          <div className="flex items-center gap-5 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedBrand('All');
                scrollToProducts();
              }}
              className={`whitespace-nowrap transition-colors pb-0.5 ${
                selectedCategory === 'All' && selectedBrand === 'All'
                  ? 'text-blue-600 font-bold border-b-2 border-blue-600'
                  : 'hover:text-slate-900'
              }`}
            >
              All Products
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
                    ? 'text-blue-600 font-bold border-b-2 border-blue-600' 
                    : 'hover:text-slate-900'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 shrink-0 pl-4 border-l border-slate-200">
            <button
              onClick={scrollToExchange}
              className="flex items-center gap-1.5 text-blue-700 hover:text-blue-900 font-bold bg-blue-50 px-2.5 py-1 rounded-lg transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Sell / Exchange Old Phone</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-4 shadow-lg animate-in slide-in-from-top-2">
          {/* Quick Admin Toggle on Mobile */}
          <div className="flex items-center justify-between p-2.5 bg-slate-100 rounded-xl">
            <span className="text-xs font-semibold text-slate-700">Admin Control Panel</span>
            <button
              onClick={() => {
                setIsAdminMode(!isAdminMode);
                setIsMobileMenuOpen(false);
              }}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                isAdminMode ? 'bg-amber-500 text-slate-900' : 'bg-slate-900 text-white'
              }`}
            >
              {isAdminMode ? 'Exit Admin' : 'Open Admin'}
            </button>
          </div>

          <div className="space-y-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
              Browse Categories
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              {CATEGORY_LIST.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSelectedBrand('All');
                    setIsMobileMenuOpen(false);
                    scrollToProducts();
                  }}
                  className={`text-left text-xs font-semibold p-2.5 rounded-xl border transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-blue-50 border-blue-300 text-blue-700'
                      : 'bg-slate-50 border-slate-100 text-slate-700'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <button
              onClick={scrollToExchange}
              className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl text-sm shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Sell or Exchange Old Phone</span>
              </div>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded">Get Quote</span>
            </button>

            <button
              onClick={() => {
                setIsOrderTrackingOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 p-3 bg-slate-100 text-slate-800 font-semibold rounded-xl text-sm"
            >
              <RotateCcw className="w-4 h-4 text-blue-600" />
              <span>Track Your Existing Order</span>
            </button>

            <button
              onClick={openWhatsApp}
              className="w-full flex items-center justify-center gap-2 p-3 bg-emerald-600 text-white font-bold rounded-xl text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Support ({storeSettings.phone})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
