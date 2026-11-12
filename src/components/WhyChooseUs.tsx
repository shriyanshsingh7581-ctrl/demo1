import React from 'react';
import { 
  ShieldCheck, 
  BadgeIndianRupee, 
  Headphones, 
  Lock, 
  Award, 
  HeartHandshake 
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const trustCards = [
    {
      icon: ShieldCheck,
      title: "100% Genuine Products",
      desc: "Every smartphone, smartwatch, and charger is brand-sealed directly from authorized brand distributors with genuine IMEI.",
      color: "text-blue-600 bg-blue-50"
    },
    {
      icon: BadgeIndianRupee,
      title: "Competitive Pricing",
      desc: "Honest, fair market pricing without hidden charges. Verified GST invoices provided with all purchases for peace of mind.",
      color: "text-emerald-600 bg-emerald-50"
    },
    {
      icon: Headphones,
      title: "Expert Assistance",
      desc: "Get personalized guidance from seasoned smartphone specialists in-store and on WhatsApp to select the right device.",
      color: "text-purple-600 bg-purple-50"
    },
    {
      icon: Lock,
      title: "Secure Shopping",
      desc: "Safe online and in-store payment methods including Cash on Delivery, UPI, Cards, and verified bank-approved No Cost EMI.",
      color: "text-amber-600 bg-amber-50"
    },
    {
      icon: Award,
      title: "Brand Warranty Assistance",
      desc: "Direct 1-Year official manufacturer warranty. In case of issues, our team assists you with brand authorized service centers.",
      color: "text-indigo-600 bg-indigo-50"
    },
    {
      icon: HeartHandshake,
      title: "Dedicated Customer Support",
      desc: "Instant support before and after your purchase. Easy data migration assistance right inside our Jaipur retail store.",
      color: "text-rose-600 bg-rose-50"
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">
            WHY CHARLIE MOBILE & ACCESSORIES
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            The Preferred Mobile Store in Jaipur
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Built on trust, authenticity, and verified service. Here is why thousands of tech lovers shop with us.
          </p>
        </div>

        {/* 6 Trust Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {trustCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-50/70 border border-slate-100 hover:border-slate-200 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${card.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
