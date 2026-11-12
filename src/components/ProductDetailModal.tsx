import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductVariant } from '../types';
import { 
  X, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  MessageCircle, 
  ShoppingBag, 
  Zap, 
  Check, 
  Heart,
  CreditCard,
  MapPin,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setIsCheckoutOpen,
    storeSettings,
    products
  } = useApp();

  if (!quickViewProduct) return null;

  const product = quickViewProduct;

  // Selected State
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "Standard");
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(product.variants?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState<{ checked: boolean; available: boolean; text: string } | null>(null);

  const isFavorited = isInWishlist(product.id);

  // Active pricing calculation
  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentMrp = selectedVariant ? selectedVariant.mrp : product.mrp;
  const currentDiscount = currentMrp > currentPrice 
    ? Math.round(((currentMrp - currentPrice) / currentMrp) * 100) 
    : product.discountPercentage;

  // Handlers
  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedVariant, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedVariant, quantity);
    setQuickViewProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleWhatsAppEnquiry = () => {
    const variantInfo = selectedVariant ? ` (${selectedVariant.storage}${selectedVariant.ram ? ' / ' + selectedVariant.ram : ''})` : '';
    const message = encodeURIComponent(
      `Hello Charlie Mobile! I am interested in purchasing:\n\n📱 Product: ${product.name}${variantInfo}\n🎨 Color: ${selectedColor}\n💰 Price: ₹${currentPrice.toLocaleString('en-IN')}\n\nIs this currently available for store pickup / delivery in Jaipur?`
    );
    window.open(`https://wa.me/${storeSettings.whatsapp}?text=${message}`, '_blank');
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.length !== 6) {
      setPincodeResult({ checked: true, available: false, text: "Please enter a valid 6-digit Indian pincode." });
      return;
    }

    if (pincode.startsWith('302') || pincode.startsWith('303')) {
      setPincodeResult({ 
        checked: true, 
        available: true, 
        text: "⚡ Express Same-Day Store Delivery available in Jaipur (Free on orders above ₹999)!" 
      });
    } else {
      setPincodeResult({ 
        checked: true, 
        available: true, 
        text: "📦 Standard Insured Courier Delivery available in 2-4 business days." 
      });
    }
  };

  // Related products
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Sticky Header Close Bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
              {product.brand}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-600 font-medium">{product.category}</span>
          </div>

          <button
            onClick={() => setQuickViewProduct(null)}
            className="p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Image Gallery */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main Image Display */}
              <div className="relative aspect-square w-full rounded-3xl bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center p-6 group">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                />

                {/* Floating Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {currentDiscount > 0 && (
                    <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-xl shadow-xs">
                      {currentDiscount}% OFF
                    </span>
                  )}
                  <span className="bg-slate-900 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                    100% Genuine Sealed
                  </span>
                </div>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-4 right-4 p-2.5 rounded-2xl shadow-sm transition-all ${
                    isFavorited ? 'bg-rose-50 text-rose-500' : 'bg-white/90 text-slate-600 hover:text-rose-500'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              {/* Thumbnails Row */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 p-1 bg-slate-50 shrink-0 transition-all ${
                        activeImageIndex === idx ? 'border-blue-600 ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain mix-blend-multiply" />
                    </button>
                  ))}
                </div>
              )}

              {/* Verified Trust Strip */}
              <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 pt-2">
                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{product.warranty}</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <RotateCcw className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>7-Day Replacement Policy</span>
                </div>
              </div>
            </div>

            {/* Right Column: Details & Variant Selection */}
            <div className="lg:col-span-6 space-y-6 text-left">
              
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                  {product.name}
                </h1>
                
                {/* Rating & Reviews */}
                <div className="flex items-center gap-2.5 mt-2 text-xs">
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-900 font-bold px-2 py-0.5 rounded-lg border border-amber-200">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span>{product.rating}</span>
                  </div>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-600 font-medium">({product.reviewCount} verified customer ratings)</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-emerald-600 font-bold">In Stock & Verified</span>
                </div>
              </div>

              {/* Price Banner */}
              <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-slate-900">
                    ₹{currentPrice.toLocaleString('en-IN')}
                  </span>
                  {currentMrp > currentPrice && (
                    <span className="text-base text-slate-400 line-through">
                      ₹{currentMrp.toLocaleString('en-IN')}
                    </span>
                  )}
                  {currentDiscount > 0 && (
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                      Save ₹{(currentMrp - currentPrice).toLocaleString('en-IN')} ({currentDiscount}%)
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Inclusive of all taxes. GST invoice included for full business credit & official warranty claims.
                </p>

                {/* Verified EMI Breakdown */}
                {product.emiStartsFrom && (
                  <div className="mt-3 pt-3 border-t border-slate-200/70 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                      <CreditCard className="w-4 h-4 text-purple-600" />
                      <span>No Cost EMI from <strong>₹{product.emiStartsFrom}/month</strong></span>
                    </div>
                    <span className="text-[11px] text-purple-700 font-bold">HDFC, ICICI, SBI</span>
                  </div>
                )}
              </div>

              {/* Storage / RAM Variant Selector */}
              {product.variants && product.variants.length > 0 && (
                <div>
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
                    Select Storage & Configuration
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {product.variants.map((v, idx) => {
                      const isSelected = selectedVariant?.storage === v.storage;
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedVariant(v)}
                          className={`p-3 rounded-2xl border text-left transition-all ${
                            isSelected
                              ? 'bg-blue-50/80 border-blue-600 ring-2 ring-blue-500/20 text-blue-900 font-bold'
                              : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                          }`}
                        >
                          <div className="text-xs font-bold">{v.storage}</div>
                          {v.ram && <div className="text-[10px] text-slate-500 font-medium">{v.ram} RAM</div>}
                          <div className="text-xs font-extrabold text-blue-600 mt-1">₹{v.price.toLocaleString('en-IN')}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Color Swatches */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Color: <span className="text-blue-600 font-semibold">{selectedColor}</span>
                    </label>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    {product.colors.map(col => {
                      const isSelected = selectedColor === col.name;
                      return (
                        <button
                          key={col.name}
                          onClick={() => setSelectedColor(col.name)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${
                            isSelected 
                              ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-500/20' 
                              : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                          }`}
                        >
                          <span 
                            className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0" 
                            style={{ backgroundColor: col.hex }} 
                          />
                          <span>{col.name}</span>
                          {isSelected && <Check className="w-3 h-3 text-blue-600" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Pincode Delivery Checker */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>Delivery & Store Pickup Availability</span>
                </div>
                <form onSubmit={handleCheckPincode} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit Pincode (e.g. 302001)"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors shrink-0"
                  >
                    Check
                  </button>
                </form>
                {pincodeResult && (
                  <p className={`text-xs font-medium ${pincodeResult.available ? 'text-emerald-600' : 'text-red-500'}`}>
                    {pincodeResult.text}
                  </p>
                )}
              </div>

              {/* Action Buttons: Add to Cart, Buy Now, WhatsApp */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  {/* Quantity */}
                  <div className="flex items-center border border-slate-200 rounded-2xl bg-white p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center font-bold text-slate-700"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-slate-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center font-bold text-slate-700"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>

                  {/* Buy Now */}
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20 active:scale-98"
                  >
                    <Zap className="w-4 h-4 fill-white" />
                    <span>Instant Checkout</span>
                  </button>
                </div>

                {/* WhatsApp Direct Enquiry */}
                <button
                  onClick={handleWhatsAppEnquiry}
                  className="w-full py-3 px-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-emerald-600 text-white" />
                  <span>Enquire & Reserve on WhatsApp</span>
                </button>
              </div>

            </div>

          </div>

          {/* Technical Specifications Section */}
          <div className="pt-6 border-t border-slate-100">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Verified Technical Specifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {Object.entries(product.specifications).map(([key, val]) => (
                <div key={key} className="flex p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="w-1/3 font-semibold text-slate-500 shrink-0">{key}</span>
                  <span className="w-2/3 font-medium text-slate-900 pl-2">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Products Carousel */}
          {relatedProducts.length > 0 && (
            <div className="pt-6 border-t border-slate-100">
              <h3 className="text-base font-bold text-slate-900 mb-4">
                Customers Also Explored
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map(rel => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      setQuickViewProduct(rel);
                      setActiveImageIndex(0);
                    }}
                    className="p-3 rounded-2xl border border-slate-100 hover:border-slate-200 bg-white hover:shadow-md cursor-pointer transition-all flex items-center gap-3"
                  >
                    <img src={rel.images[0]} alt={rel.name} className="w-14 h-14 object-contain rounded-xl bg-slate-50 p-1 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">{rel.name}</p>
                      <p className="text-[11px] text-blue-600 font-extrabold mt-0.5">₹{rel.price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
