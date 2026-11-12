import React, { useState } from 'react';
import { INITIAL_FAQS } from '../data/mockData';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FaqSection: React.FC = () => {
  const { storeSettings } = useApp();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(`Hello Charlie Mobile! I have a question regarding your products/orders.`);
    window.open(`https://wa.me/${storeSettings.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section className="py-12 md:py-16 bg-white border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Got Questions? We Have Answers.
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Everything you need to know about our products, brand warranty, delivery, and exchange.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {INITIAL_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen ? 'bg-slate-50/80 border-blue-200 shadow-xs' : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs font-black text-blue-600 bg-blue-100/60 w-6 h-6 rounded-lg flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Help Banner */}
        <div className="mt-8 p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
          <div>
            <h4 className="text-sm font-bold">Still have questions?</h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Our store staff at Indira Bazar, Jaipur is available daily to assist you.
            </p>
          </div>
          <button
            onClick={openWhatsApp}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors self-start sm:self-auto shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat with Charlie Support</span>
          </button>
        </div>

      </div>
    </section>
  );
};
