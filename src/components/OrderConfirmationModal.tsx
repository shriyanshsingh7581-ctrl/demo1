import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckCircle2, 
  Printer, 
  RotateCcw, 
  X, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  Calendar,
  MessageCircle
} from 'lucide-react';

export const OrderConfirmationModal: React.FC = () => {
  const { confirmedOrder, setConfirmedOrder, setIsOrderTrackingOpen, storeSettings } = useApp();

  if (!confirmedOrder) return null;

  const order = confirmedOrder;

  const handlePrint = () => {
    window.print();
  };

  const handleTrack = () => {
    setConfirmedOrder(null);
    setIsOrderTrackingOpen(true);
  };

  const openWhatsAppConfirmation = () => {
    const text = encodeURIComponent(
      `Hi Charlie Mobile! I just placed Order #${order.id} for ₹${order.total.toLocaleString('en-IN')}. Please confirm dispatch timing.`
    );
    window.open(`https://wa.me/${storeSettings.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 sm:p-8 text-center relative">
          <button
            onClick={() => setConfirmedOrder(null)}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-full bg-white text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-lg">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
            OFFICIAL ORDER CONFIRMED
          </span>
          <h2 className="text-2xl sm:text-3xl font-black mt-2">
            Thank You, {order.customerName}!
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-md mx-auto">
            Your smartphone order <strong>#{order.id}</strong> is verified and booked with Charlie Mobile & Accessories.
          </p>
        </div>

        {/* Scrollable Receipt Details */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-xs">
          
          {/* Order Meta Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 text-center">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Order ID</span>
              <span className="font-extrabold text-slate-900 text-xs">#{order.id}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Status</span>
              <span className="font-extrabold text-blue-600 text-xs">{order.status}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Delivery</span>
              <span className="font-extrabold text-slate-900 text-xs">{order.deliveryMethod}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Payment</span>
              <span className="font-extrabold text-emerald-700 text-xs">{order.paymentMethod}</span>
            </div>
          </div>

          {/* Items List */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Ordered Items
            </h4>
            <div className="space-y-2">
              {order.items.map((it, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <img src={it.image} alt={it.name} className="w-12 h-12 object-contain rounded-lg bg-white p-1 shrink-0 border" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 truncate">{it.name}</p>
                    <p className="text-[11px] text-slate-500">
                      Color: {it.color} • {it.storage} • Qty: {it.quantity}
                    </p>
                  </div>
                  <span className="font-bold text-slate-900 text-xs shrink-0">
                    ₹{(it.price * it.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900">₹{order.subtotal.toLocaleString('en-IN')}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Coupon Discount</span>
                <span>-₹{order.discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>Delivery Fee</span>
              <span className="font-semibold text-slate-900">{order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-black text-slate-900">
              <span>Total Paid</span>
              <span className="text-blue-600">₹{order.total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Address & Tracking Note */}
          <div className="p-3.5 rounded-2xl border border-blue-100 bg-blue-50/50 text-slate-700 space-y-1">
            <p className="font-bold text-blue-900 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-blue-600" />
              Delivery Address:
            </p>
            <p className="text-[11px] text-slate-600">
              {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
            </p>
            <p className="text-[11px] text-blue-700 font-semibold pt-1">
              Tracking Number: {order.trackingNumber}
            </p>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
            <button
              onClick={handleTrack}
              className="py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Track Live Status</span>
            </button>

            <button
              onClick={openWhatsAppConfirmation}
              className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Store</span>
            </button>

            <button
              onClick={handlePrint}
              className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
