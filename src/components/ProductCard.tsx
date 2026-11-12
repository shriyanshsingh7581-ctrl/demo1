import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { Heart, ShoppingBag, Eye, Zap, Star, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setQuickViewProduct,
    setIsCheckoutOpen,
    clearCart
  } = useApp();

  const isFavorited = isInWishlist(product.id);

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.colors[0]?.name, product.variants?.[0], 1);
    setIsCheckoutOpen(true);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.colors[0]?.name, product.variants?.[0], 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div 
      onClick={() => setQuickViewProduct(product)}
      className="group relative bg-white rounded-3xl p-3 sm:p-4 border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* Top Badges & Wishlist */}
      <div>
        <div className="relative aspect-square w-full rounded-2xl bg-slate-50 overflow-hidden mb-3.5 flex items-center justify-center p-3">
          
          {/* Discount & Stock Pill */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
            {product.discountPercentage > 0 && (
              <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-lg shadow-xs">
                {product.discountPercentage}% OFF
              </span>
            )}
            {product.isBestSeller && (
              <span className="bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-xs">
                HOT SELLER
              </span>
            )}
            {product.isLatest && (
              <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-xs">
                LATEST
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-2.5 right-2.5 p-2 rounded-xl backdrop-blur-md transition-all z-10 ${
              isFavorited
                ? 'bg-rose-50 text-rose-500 shadow-sm'
                : 'bg-white/80 hover:bg-white text-slate-500 hover:text-rose-500'
            }`}
            aria-label="Add to wishlist"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500' : ''}`} />
          </button>

          {/* Product Image */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-108 transition-transform duration-500"
            loading="lazy"
          />

          {/* Quick View Hover Overlay Button */}
          <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex justify-center z-10">
            <span className="bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-lg backdrop-blur-xs">
              <Eye className="w-3.5 h-3.5" />
              Quick View
            </span>
          </div>
        </div>

        {/* Brand & Rating Row */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span className="font-bold text-blue-600 uppercase tracking-wider text-[11px]">
            {product.brand}
          </span>

          <div className="flex items-center gap-1 text-slate-700 font-semibold text-[11px]">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
            <span className="text-slate-400">({product.reviewCount})</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors mb-1.5">
          {product.name}
        </h3>

        {/* Specs Pill (RAM / Storage) */}
        <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
          {product.storage && product.storage !== "Standard" && (
            <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
              {product.storage}
            </span>
          )}
          {product.ram && (
            <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
              {product.ram} RAM
            </span>
          )}
          {/* Available Colors preview */}
          {product.colors.length > 0 && (
            <div className="flex items-center gap-1 ml-auto">
              {product.colors.slice(0, 3).map((col) => (
                <span
                  key={col.name}
                  className="w-2.5 h-2.5 rounded-full border border-slate-300 shrink-0"
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-[9px] text-slate-400 font-medium">+{product.colors.length - 3}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Pricing & Actions */}
      <div className="pt-2 border-t border-slate-100 mt-auto">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-base sm:text-lg font-black text-slate-900">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.mrp > product.price && (
            <span className="text-xs text-slate-400 line-through">
              ₹{product.mrp.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Availability / EMI note */}
        <div className="flex items-center justify-between text-[11px] mb-3">
          <span className={`font-semibold flex items-center gap-1 ${
            product.inStock ? 'text-emerald-600' : 'text-red-500'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${
              product.inStock ? 'bg-emerald-500' : 'bg-red-500'
            }`} />
            {product.inStock ? `In Stock (${product.stockCount})` : 'Out of Stock'}
          </span>

          {product.emiStartsFrom && (
            <span className="text-slate-500 text-[10px]">
              EMI ₹{product.emiStartsFrom}/mo
            </span>
          )}
        </div>

        {/* Buttons: Add to Cart & Buy Now */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>

          <button
            onClick={handleBuyNow}
            disabled={!product.inStock}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
