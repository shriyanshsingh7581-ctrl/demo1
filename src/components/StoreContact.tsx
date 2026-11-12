import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Navigation,
  ExternalLink
} from 'lucide-react';

export const StoreContact: React.FC = () => {
  const { storeSettings, showToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) {
      showToast("Please enter your name, phone, and message", "error");
      return;
    }

    setIsSent(true);
    showToast("Thank you! Your message has been sent to Charlie Mobile team.", "success");
    setTimeout(() => {
      setIsSent(false);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 4000);
  };

  const openGoogleMaps = () => {
    const query = encodeURIComponent(`Charlie Mobile ${storeSettings.address} ${storeSettings.city}`);
    window.open(`https://maps.google.com/?q=${query}`, '_blank');
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(`Hello Charlie Mobile! I would like to inquire about visiting your Jaipur store.`);
    window.open(`https://wa.me/${storeSettings.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section id="contact-section" className="py-12 md:py-16 bg-slate-50/60 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="max-w-2xl mb-10">
          <div className="text-xs font-bold text-blue-600 tracking-wider uppercase mb-1">
            VISIT OUR STORE
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Store Location & Contact Information
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Come test original devices in person, get hands-on assistance, or contact our customer support desk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Store Info Cards (Left Column) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Store Address Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                    RETAIL STOREFRONT
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">
                    {storeSettings.storeName}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {storeSettings.address}, {storeSettings.city}, {storeSettings.state} - {storeSettings.pincode}
                  </p>

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={openGoogleMaps}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl text-xs transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Get Directions</span>
                    </button>
                    <span className="text-xs text-slate-400">Near MI Road Hub</span>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="pt-4 border-t border-slate-100 flex items-start gap-3 text-xs text-slate-600">
                <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800">Store Timings:</span>
                  <p className="text-slate-500">{storeSettings.openingHours}</p>
                </div>
              </div>
            </div>

            {/* Quick Contact Methods */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={`tel:${storeSettings.phone}`}
                className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:shadow-xs transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Call Directly</span>
                  <p className="text-xs font-bold text-slate-900 truncate">{storeSettings.phone}</p>
                </div>
              </a>

              <button
                onClick={openWhatsApp}
                className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-300 hover:shadow-xs transition-all text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 fill-emerald-600 text-white" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase">WhatsApp</span>
                  <p className="text-xs font-bold text-slate-900 truncate">Instant Support</p>
                </div>
              </button>
            </div>

            {/* Interactive Map Visual Box */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between text-xs">
                <span className="font-bold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  Jaipur Location Map
                </span>
                <button
                  onClick={openGoogleMaps}
                  className="text-blue-300 hover:text-white flex items-center gap-1 font-semibold"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              {/* Styled Map Preview Container */}
              <div className="relative h-48 bg-slate-100 flex items-center justify-center p-4 text-center">
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]" />
                
                <div className="relative z-10 p-4 bg-white/95 backdrop-blur-xs rounded-2xl border border-slate-200 shadow-md max-w-xs">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto mb-2 shadow-sm">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-xs text-slate-900">Charlie Mobile & Accessories</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Indira Bazar Road, Jaipur</p>
                  <button
                    onClick={openGoogleMaps}
                    className="mt-2 w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-lg transition-colors"
                  >
                    View Interactive Map
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Contact Message Form (Right Column) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
              <div className="pb-3 border-b border-slate-100 mb-4">
                <h3 className="text-base font-bold text-slate-900">
                  Send Us an Inquiry
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Looking for a specific device, bulk corporate accessories, or have an order question?
                </p>
              </div>

              {isSent ? (
                <div className="py-10 text-center space-y-3 animate-in fade-in">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Message Received!</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Thank you, {name}. A Charlie Mobile customer representative will contact you via {phone} shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sunil Verma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98290 00000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Email Address (Optional)</label>
                    <input
                      type="email"
                      placeholder="e.g. sunil@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Message or Product Query *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please specify which smartphone model, storage variant, or accessories you're interested in..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors shadow-sm flex items-center justify-center gap-2 active:scale-98"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to Store Team</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
