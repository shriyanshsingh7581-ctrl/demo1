import React from 'react';
import { useApp } from '../context/AppContext';
import { X, ShieldCheck, FileText, Truck, RotateCcw } from 'lucide-react';

export const PolicyModal: React.FC = () => {
  const { isPolicyModal, setIsPolicyModal, storeSettings } = useApp();

  if (!isPolicyModal) return null;

  const getPolicyDetails = () => {
    switch (isPolicyModal) {
      case 'shipping':
        return {
          title: "Shipping & Delivery Policy",
          icon: Truck,
          content: (
            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">1. Express Same-Day Delivery in Jaipur</h4>
                <p>
                  Orders placed within Jaipur municipal limits before 4:00 PM are eligible for verified same-day delivery through our dedicated store fleet. Free express delivery applies on all smartphone orders exceeding ₹{storeSettings.freeShippingThreshold}.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">2. Pan-India Insured Dispatch</h4>
                <p>
                  Deliveries outside Jaipur are shipped via insured tier-1 courier partners (Bluedart, Delhivery, Expressbees) with 2-4 business day transit time. Every package is shipped in tamper-evident security boxes.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">3. In-Store Pickup</h4>
                <p>
                  Customers may select 'Store Pickup (Jaipur)' at checkout. Devices are kept ready within 30 minutes at our Indira Bazar retail store with complete SIM activation and data transfer assistance.
                </p>
              </div>
            </div>
          )
        };
      case 'returns':
        return {
          title: "7-Day Replacement & Warranty Policy",
          icon: RotateCcw,
          content: (
            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">1. 7-Day Replacement for Hardware Defects</h4>
                <p>
                  Charlie Mobile & Accessories provides a 7-day hassle-free replacement on any technical manufacturing defects discovered upon unboxing. Customers must report the issue along with invoice and original packaging.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">2. 1-Year Official Brand Manufacturer Warranty</h4>
                <p>
                  All smartphones carry standard 1-year brand manufacturer warranty covered by authorized service centers of Apple, Samsung, OnePlus, Xiaomi, Vivo, etc. across India.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">3. Non-Returnable Scenarios</h4>
                <p>
                  Physical drops, liquid ingress, or cracked screens post-delivery are not covered under regular replacement and are addressed through brand service insurance policies.
                </p>
              </div>
            </div>
          )
        };
      case 'terms':
        return {
          title: "Terms & Conditions of Service",
          icon: FileText,
          content: (
            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">1. Commercial Identity & Authenticity</h4>
                <p>
                  Charlie Mobile & Accessories is an authorized retail distributor based in Indira Bazar, Jaipur, Rajasthan. All items sold are guaranteed authentic sealed Indian units with standard GST bills.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">2. Pricing & Stock Accuracy</h4>
                <p>
                  Prices and stock availability listed online represent real-time store inventory. We do not participate in predatory flash sales or unverified discounting.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">3. Exchange & Valuation Program</h4>
                <p>
                  Online valuation estimates for used smartphones are indicative. The final exchange payout is confirmed only upon physical diagnostic inspection in-store or during delivery.
                </p>
              </div>
            </div>
          )
        };
      case 'privacy':
      default:
        return {
          title: "Privacy & Data Protection Policy",
          icon: ShieldCheck,
          content: (
            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">1. Customer Data Handling</h4>
                <p>
                  We collect customer contact names, delivery addresses, and phone numbers exclusively to facilitate order fulfillment, GST invoice generation, and courier tracking updates.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">2. Payment Security</h4>
                <p>
                  Payment transactions are processed through encrypted, RBI-compliant payment gateways. Charlie Mobile does not store credit card or UPI security pins.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">3. Communication</h4>
                <p>
                  Order receipts and delivery tracking are dispatched via SMS and WhatsApp. You may opt out of promotional messages anytime.
                </p>
              </div>
            </div>
          )
        };
    }
  };

  const details = getPolicyDetails();
  const Icon = details.icon;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-white z-10">
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-blue-600" />
            <h2 className="font-extrabold text-base text-slate-900">
              {details.title}
            </h2>
          </div>
          <button
            onClick={() => setIsPolicyModal(null)}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {details.content}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={() => setIsPolicyModal(null)}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
