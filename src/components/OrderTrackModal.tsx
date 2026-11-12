import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Search, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  Truck, 
  MapPin, 
  ShieldCheck, 
  PackageCheck 
} from 'lucide-react';
import { Order } from '../types';

export const OrderTrackModal: React.FC = () => {
  const { isOrderTrackingOpen, setIsOrderTrackingOpen, orders } = useApp();

  const [inputQuery, setInputQuery] = useState(orders[0]?.id || '');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(orders[0] || null);
  const [hasSearched, setHasSearched] = useState(true);

  if (!isOrderTrackingOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const clean = inputQuery.trim().toUpperCase().replace('#', '');
    const found = orders.find(o => 
      o.id.toUpperCase().replace('#', '') === clean || 
      o.customerPhone.includes(clean)
    );

    setSearchedOrder(found || null);
    setHasSearched(true);
  };

  const getStepStatus = (stepIndex: number, orderStatus: Order['status']) => {
    const statusMap: Record<Order['status'], number> = {
      'Pending': 0,
      'Processing': 1,
      'Shipped': 2,
      'Delivered': 3,
      'Cancelled': -1
    };

    const currentLevel = statusMap[orderStatus] ?? 0;
    if (orderStatus === 'Cancelled') return 'cancelled';
    if (currentLevel > stepIndex) return 'completed';
    if (currentLevel === stepIndex) return 'current';
    return 'upcoming';
  };

  const steps = [
    { title: "Order Confirmed", desc: "Order details verified & invoice generated." },
    { title: "Quality Check & Packing", desc: "Seals verified and packed in tamper-proof box." },
    { title: "Dispatched / In Transit", desc: "Handed over to verified courier partner." },
    { title: "Delivered / Handed Over", desc: "Successfully delivered to customer." }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-white z-10">
          <div className="flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-blue-600" />
            <h2 className="font-extrabold text-base text-slate-900">
              Track Your Order Status
            </h2>
          </div>
          <button
            onClick={() => setIsOrderTrackingOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 sm:p-6 border-b border-slate-100 bg-slate-50/60">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter Order ID (e.g. CM-92841) or Mobile..."
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600/30"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors shrink-0"
            >
              Track Order
            </button>
          </form>
        </div>

        {/* Status Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-xs">
          {searchedOrder ? (
            <div className="space-y-6">
              
              {/* Top Order Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Order Number</span>
                  <h3 className="font-extrabold text-slate-900 text-sm">#{searchedOrder.id}</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Placed for: <strong>{searchedOrder.customerName}</strong>
                  </p>
                </div>

                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold inline-block ${
                    searchedOrder.status === 'Delivered' 
                      ? 'bg-emerald-100 text-emerald-800'
                      : searchedOrder.status === 'Cancelled'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {searchedOrder.status}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1">
                    {searchedOrder.trackingNumber || "Track: Pending"}
                  </p>
                </div>
              </div>

              {/* Step Progress Timeline */}
              <div className="space-y-4 pl-2">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                  Fulfillment Timeline
                </h4>

                <div className="relative pl-6 space-y-6 border-l-2 border-slate-200">
                  {steps.map((st, i) => {
                    const stepState = getStepStatus(i, searchedOrder.status);

                    return (
                      <div key={i} className="relative">
                        {/* Dot indicator */}
                        <div className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          stepState === 'completed'
                            ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                            : stepState === 'current'
                            ? 'bg-blue-600 text-white ring-4 ring-blue-100 animate-pulse'
                            : 'bg-slate-200 text-slate-500'
                        }`}>
                          {stepState === 'completed' ? '✓' : i + 1}
                        </div>

                        <div>
                          <p className={`font-bold text-xs ${
                            stepState === 'current' ? 'text-blue-600' : 'text-slate-900'
                          }`}>
                            {st.title}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {st.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Items */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <span className="font-bold text-slate-700 text-[11px] block">Items in this package:</span>
                {searchedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <span className="text-slate-800 font-medium truncate max-w-xs">{it.name} ({it.storage}) x{it.quantity}</span>
                    <span className="font-bold text-slate-900">₹{(it.price * it.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              {/* Delivery Destination */}
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-blue-50/60 border border-blue-100 text-[11px] text-slate-600">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-blue-900">Delivery Address:</span>
                  <p>{searchedOrder.shippingAddress.street}, {searchedOrder.shippingAddress.city}, {searchedOrder.shippingAddress.state} - {searchedOrder.shippingAddress.pincode}</p>
                </div>
              </div>

            </div>
          ) : hasSearched ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-xl">
                🔎
              </div>
              <h4 className="font-bold text-slate-900 text-sm">No Order Found</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                We couldn't locate an active order with query "{inputQuery}". Please check your order confirmation SMS or contact WhatsApp support.
              </p>
            </div>
          ) : null}
        </div>

      </div>
    </div>
  );
};
