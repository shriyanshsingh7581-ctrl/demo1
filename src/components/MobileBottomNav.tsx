import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Grid, Sparkles, Heart, ShoppingBag, User } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { 
    cartItemCount, 
    wishlist, 
    setIsCartOpen, 
    setIsWishlistOpen,
    setIsAuthOpen,
    setSelectedCategory,
    setSelectedBrand
  } = useApp();

  const scrollToExchange = () => {
    const el = document.getElementById('sell-exchange-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCategories = () => {
    const el = document.getElementById('categories-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    setSelectedCategory('All');
    setSelectedBrand('All');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 md:hidden py-1 px-3 shadow-[0_-8px_20px_rgba(0,0,0,0.05)]">
      <div className="grid grid-cols-5 items-center text-center max-w-md mx-auto">
        
        {/* Home */}
        <button
          onClick={scrollToTop}
          className="flex flex-col items-center justify-center py-1.5 text-slate-700 hover:text-blue-600 active:scale-95 transition-all group"
        >
          <Home className="w-5 h-5 group-hover:text-blue-600 transition-colors" />
          <span className="text-[10px] font-bold mt-1 tracking-tight text-slate-700 group-hover:text-blue-600">Home</span>
        </button>

        {/* Categories */}
        <button
          onClick={scrollToCategories}
          className="flex flex-col items-center justify-center py-1.5 text-slate-700 hover:text-blue-600 active:scale-95 transition-all group"
        >
          <Grid className="w-5 h-5 group-hover:text-blue-600 transition-colors" />
          <span className="text-[10px] font-bold mt-1 tracking-tight text-slate-700 group-hover:text-blue-600">Explore</span>
        </button>

        {/* Center Exchange Floating Button */}
        <button
          onClick={scrollToExchange}
          className="flex flex-col items-center justify-center -mt-3 active:scale-90 transition-transform"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/35 border-2 border-white">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <span className="text-[10px] font-black mt-0.5 text-blue-600">Exchange</span>
        </button>

        {/* Wishlist */}
        <button
          onClick={() => setIsWishlistOpen(true)}
          className="relative flex flex-col items-center justify-center py-1.5 text-slate-700 hover:text-rose-600 active:scale-95 transition-all group"
        >
          <div className="relative">
            <Heart className="w-5 h-5 group-hover:text-rose-600 transition-colors" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 bg-rose-500 text-white text-[9px] font-black rounded-full flex items-center justify-center ring-2 ring-white">
                {wishlist.length}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold mt-1 tracking-tight text-slate-700 group-hover:text-rose-600">Saved</span>
        </button>

        {/* Cart Bag */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center py-1.5 text-slate-700 hover:text-blue-600 active:scale-95 transition-all group"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 group-hover:text-blue-600 transition-colors" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-2.5 w-4 h-4 bg-blue-600 text-white text-[9px] font-black rounded-full flex items-center justify-center ring-2 ring-white">
                {cartItemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold mt-1 tracking-tight text-slate-700 group-hover:text-blue-600">Bag</span>
        </button>

      </div>
    </nav>
  );
};
