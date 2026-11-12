import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Grid, Sparkles, Heart, ShoppingBag } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { 
    cartItemCount, 
    wishlist, 
    setIsCartOpen, 
    setIsWishlistOpen,
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
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 md:hidden py-1 px-2 shadow-lg">
      <div className="grid grid-cols-5 items-center text-center">
        {/* Home */}
        <button
          onClick={scrollToTop}
          className="flex flex-col items-center justify-center py-1 text-slate-600 hover:text-blue-600 active:scale-95 transition-transform"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">Home</span>
        </button>

        {/* Categories */}
        <button
          onClick={scrollToCategories}
          className="flex flex-col items-center justify-center py-1 text-slate-600 hover:text-blue-600 active:scale-95 transition-transform"
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">Categories</span>
        </button>

        {/* Exchange */}
        <button
          onClick={scrollToExchange}
          className="flex flex-col items-center justify-center py-1 text-blue-600 font-bold active:scale-95 transition-transform"
        >
          <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold mt-0.5 text-blue-600">Exchange</span>
        </button>

        {/* Wishlist */}
        <button
          onClick={() => setIsWishlistOpen(true)}
          className="relative flex flex-col items-center justify-center py-1 text-slate-600 hover:text-blue-600 active:scale-95 transition-transform"
        >
          <Heart className="w-5 h-5" />
          {wishlist.length > 0 && (
            <span className="absolute top-0 right-3 w-3.5 h-3.5 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
          <span className="text-[10px] font-semibold mt-1">Wishlist</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center py-1 text-slate-600 hover:text-blue-600 active:scale-95 transition-transform"
        >
          <ShoppingBag className="w-5 h-5" />
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-3 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
          <span className="text-[10px] font-semibold mt-1">Bag</span>
        </button>
      </div>
    </nav>
  );
};
