import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OrderItem } from '../types';
import { 
  X, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  CreditCard, 
  Smartphone, 
  Building2, 
  Lock, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartSubtotal, 
    cartTotal, 
    appliedCoupon, 
    placeOrder, 
    user,
    storeSettings,
    showToast
  } = useApp();

  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [street, setStreet] = useState(user?.address?.street || '');
  const [city, setCity] = useState(user?.address?.city || 'Jaipur');
  const [state, setState] = useState(user?.address?.state || 'Rajasthan');
  const [pincode, setPincode] = useState(user?.address?.pincode || '302001');

  const [deliveryMethod, setDeliveryMethod] = useState<'Express Delivery' | 'Store Pickup (Jaipur)'>('Express Delivery');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'UPI' | 'Card' | 'NetBanking' | 'EMI'>('UPI');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const deliveryFee = deliveryMethod === 'Store Pickup (Jaipur)' 
    ? 0 
    : (cartSubtotal >= storeSettings.freeShippingThreshold ? 0 : 99);

  const discount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const finalTotal = Math.max(0, cartSubtotal - discount + deliveryFee);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !customerPhone || (!street && deliveryMethod !== 'Store Pickup (Jaipur)')) {
      showToast("Please fill in your name, contact phone, and delivery address.", "error");
      return;
    }

    if (cart.length === 0) {
      showToast("Your cart is empty.", "error");
      return;
    }

    setIsSubmitting(true);

    const orderItems: OrderItem[] = cart.map(item => ({
      productId: item.product.id,
      name: item.product.name,
      image: item.product.images[0],
      brand: item.product.brand,
      price: item.selectedVariant ? item.selectedVariant.price : item.product.price,
      quantity: item.quantity,
      color: item.selectedColor,
      storage: item.selectedVariant?.storage || item.product.storage
    }));

    setTimeout(() => {
      placeOrder({
        customerName,
        customerPhone,
        customerEmail: customerEmail || "customer@example.com",
        shippingAddress: {
          street: street || "Charlie Mobile Store, Indira Bazar",
          city,
          state,
          pincode
        },
        deliveryMethod,
        paymentMethod,
        paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid',
        items: orderItems,
        subtotal: cartSubtotal,
        discount,
        deliveryFee,
        total: finalTotal
      });

      setIsSubmitting(false);
      setIsCheckoutOpen(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[94vh] flex flex-col">
        
        {/* Sticky Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-white z-10">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-600" />
              Secure Checkout
            </h2>
            <p className="text-[11px] text-slate-500">Official Charlie Mobile & Accessories Store</p>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handlePlaceOrder} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-xs">
          
          {/* Section 1: Contact Information */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">1</span>
              Customer Contact Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Rathore"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Mobile / WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98290 00000"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-slate-700 block mb-1">Email Address (For Invoicing & Order Tracking)</label>
                <input
                  type="email"
                  placeholder="e.g. vikram@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Method & Address */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">2</span>
              Delivery Option & Address
            </h3>

            {/* Delivery Switcher */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeliveryMethod('Express Delivery')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  deliveryMethod === 'Express Delivery'
                    ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span>Doorstep Express Delivery</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Same-day in Jaipur, 2-3 days pan-India.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryMethod('Store Pickup (Jaipur)')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  deliveryMethod === 'Store Pickup (Jaipur)'
                    ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  <span>Jaipur Store Pickup</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Collect today from Indira Bazar retail store.
                </p>
              </button>
            </div>

            {deliveryMethod === 'Express Delivery' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">House / Flat / Street Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Plot 42, Kalyan Colony, Tonk Road"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                  />
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                <p className="font-bold text-slate-900">Pickup Location:</p>
                <p>{storeSettings.storeName}, {storeSettings.address}, Jaipur, Rajasthan - 302001</p>
                <p className="text-[11px] text-slate-500">Bring your order confirmation SMS / WhatsApp for quick handover.</p>
              </div>
            )}
          </div>

          {/* Section 3: Payment Method */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">3</span>
              Select Payment Method
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'UPI', label: 'UPI (GPay / PhonePe)', sub: 'Fast & Secure' },
                { id: 'COD', label: 'Cash on Delivery', sub: 'Pay on delivery' },
                { id: 'Card', label: 'Credit / Debit Card', sub: 'Visa, Master, RuPay' },
                { id: 'NetBanking', label: 'Net Banking', sub: 'All major banks' },
                { id: 'EMI', label: 'No Cost EMI', sub: 'HDFC, ICICI, SBI' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setPaymentMethod(opt.id as any)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    paymentMethod === opt.id
                      ? 'border-blue-600 bg-blue-50/80 font-bold text-blue-900 ring-2 ring-blue-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
                  }`}
                >
                  <p className="text-xs font-bold">{opt.label}</p>
                  <p className="text-[10px] text-slate-500">{opt.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Section 4: Items & Summary Preview */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
            <div className="flex justify-between items-center text-xs font-bold text-slate-900">
              <span>Order Items ({cart.length})</span>
              <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-xs text-emerald-600 font-semibold">
                <span>Coupon Discount ({appliedCoupon?.code})</span>
                <span>-₹{discount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex justify-between text-xs text-slate-600">
              <span>Delivery Charges</span>
              <span className="font-semibold text-slate-900">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
            </div>

            <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-black text-slate-900">
              <span>Total Payable</span>
              <span className="text-blue-600">₹{finalTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Place Order CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-2xl transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Confirming Your Order...</span>
            ) : (
              <>
                <span>Confirm & Place Order (₹{finalTotal.toLocaleString('en-IN')})</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};
