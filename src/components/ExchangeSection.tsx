import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Smartphone, 
  CheckCircle2, 
  MessageCircle, 
  ShieldAlert, 
  Send,
  Upload,
  BadgePercent,
  Check
} from 'lucide-react';

export const ExchangeSection: React.FC = () => {
  const { submitExchangeRequest, storeSettings } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('Jaipur');
  const [oldBrand, setOldBrand] = useState('Apple');
  const [oldModel, setOldModel] = useState('');
  const [storage, setStorage] = useState('128GB');
  const [phoneCondition, setPhoneCondition] = useState<'Flawless' | 'Good' | 'Average' | 'Cracked / Damaged'>('Good');
  const [batteryHealth, setBatteryHealth] = useState<'Above 85%' | '75% - 85%' | 'Below 75% / Service'>('Above 85%');
  const [expectedPrice, setExpectedPrice] = useState<string>('');
  const [uploadedImageName, setUploadedImageName] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [lastSubmittedId, setLastSubmittedId] = useState<string>('');

  // Estimate valuation range dynamically
  const calculateEstimate = () => {
    let base = 12000;
    if (oldBrand === 'Apple') base = 26000;
    else if (oldBrand === 'Samsung') base = 20000;
    else if (oldBrand === 'OnePlus') base = 16000;
    else if (oldBrand === 'Vivo' || oldBrand === 'OPPO' || oldBrand === 'Xiaomi') base = 11000;

    // storage modifier
    if (storage === '256GB') base += 3000;
    if (storage === '512GB') base += 6000;

    // condition modifier
    if (phoneCondition === 'Flawless') base *= 1.15;
    if (phoneCondition === 'Good') base *= 1.0;
    if (phoneCondition === 'Average') base *= 0.8;
    if (phoneCondition === 'Cracked / Damaged') base *= 0.55;

    // battery modifier
    if (batteryHealth === 'Below 75% / Service') base *= 0.9;

    const min = Math.round((base * 0.92) / 500) * 500;
    const max = Math.round((base * 1.08) / 500) * 500;
    return { min, max };
  };

  const { min: estimatedMin, max: estimatedMax } = calculateEstimate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !oldModel) {
      alert("Please fill in your name, mobile number, and old phone model.");
      return;
    }

    const priceNum = expectedPrice ? Number(expectedPrice) : estimatedMin;

    const newReq = submitExchangeRequest({
      customerName,
      customerPhone,
      customerCity,
      oldBrand,
      oldModel,
      storage,
      phoneCondition,
      batteryHealth,
      expectedPrice: priceNum,
      estimatedValuationMin: estimatedMin,
      estimatedValuationMax: estimatedMax,
      notes: uploadedImageName ? `Uploaded photos: ${uploadedImageName}` : undefined
    });

    setLastSubmittedId(newReq.id);
    setIsSubmitted(true);
  };

  const handleWhatsAppSend = () => {
    const text = encodeURIComponent(
      `Hello Charlie Mobile! I would like to exchange my old phone:\n\n` +
      `📋 Request ID: #${lastSubmittedId || 'EX-NEW'}\n` +
      `👤 Name: ${customerName}\n` +
      `📱 Old Device: ${oldBrand} ${oldModel} (${storage})\n` +
      `✨ Condition: ${phoneCondition}\n` +
      `🔋 Battery: ${batteryHealth}\n` +
      `💰 Expected Price: ₹${expectedPrice || estimatedMin}\n` +
      `📊 Estimated Valuation Range: ₹${estimatedMin.toLocaleString('en-IN')} - ₹${estimatedMax.toLocaleString('en-IN')}\n\n` +
      `Please let me know how I can proceed with the physical evaluation at your Jaipur store!`
    );
    window.open(`https://wa.me/${storeSettings.whatsapp}?text=${text}`, '_blank');
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setOldModel('');
    setExpectedPrice('');
    setUploadedImageName('');
  };

  return (
    <section id="sell-exchange-section" className="py-12 md:py-16 bg-gradient-to-b from-white to-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Container */}
        <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl text-white p-6 sm:p-10 lg:p-12 relative">
          
          {/* Subtle Ambient Backdrops */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Header & Explanations */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-3.5 py-1.5 rounded-full text-xs font-bold border border-blue-500/30">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>OFFICIAL SMARTPHONE EXCHANGE PROGRAM</span>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                  Upgrade Your Smartphone Today!
                </h2>
                <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
                  Exchange your old smartphone and explore a new device. Get an instant fair market valuation and upgrade to the latest iPhone, Samsung Galaxy, or flagship Android.
                </p>
              </div>

              {/* 3 Step Process */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600/30 text-blue-400 font-bold flex items-center justify-center shrink-0 border border-blue-500/30 text-xs">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Share Phone Details</h4>
                    <p className="text-xs text-slate-400">Tell us your brand, model, condition, and battery health.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600/30 text-blue-400 font-bold flex items-center justify-center shrink-0 border border-blue-500/30 text-xs">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Get Instant Estimated Valuation</h4>
                    <p className="text-xs text-slate-400">Transparent valuation range based on live market prices.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600/30 text-blue-400 font-bold flex items-center justify-center shrink-0 border border-blue-500/30 text-xs">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Bring to Jaipur Store or Doorstep</h4>
                    <p className="text-xs text-slate-400">Complete physical evaluation and instant discount on your new purchase.</p>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="leading-snug text-[11px]">
                  <strong>Transparent Policy:</strong> Final exchange value is determined after an in-person physical inspection of screen, cameras, and functional diagnostics by our technician.
                </p>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-6 sm:p-8 text-slate-900 shadow-xl border border-slate-100">
                
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                        <Smartphone className="w-4 h-4 text-blue-600" />
                        Old Phone Evaluation Form
                      </span>
                      <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                        Instant Valuation
                      </span>
                    </div>

                    {/* Customer Info Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rahul Sharma"
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
                    </div>

                    {/* Phone Brand & Model */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Brand *</label>
                        <select
                          value={oldBrand}
                          onChange={(e) => setOldBrand(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                        >
                          <option value="Apple">Apple iPhone</option>
                          <option value="Samsung">Samsung</option>
                          <option value="OnePlus">OnePlus</option>
                          <option value="Xiaomi">Xiaomi / Redmi</option>
                          <option value="Vivo">Vivo</option>
                          <option value="OPPO">OPPO</option>
                          <option value="Realme">Realme</option>
                          <option value="Motorola">Motorola</option>
                          <option value="iQOO">iQOO</option>
                          <option value="Nothing">Nothing</option>
                          <option value="Other">Other Brand</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="font-bold text-slate-700 block mb-1">Model Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. iPhone 13 / Galaxy S22 / OnePlus 10R"
                          value={oldModel}
                          onChange={(e) => setOldModel(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                        />
                      </div>
                    </div>

                    {/* Storage & Condition */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Internal Storage</label>
                        <select
                          value={storage}
                          onChange={(e) => setStorage(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                        >
                          <option value="64GB">64 GB</option>
                          <option value="128GB">128 GB</option>
                          <option value="256GB">256 GB</option>
                          <option value="512GB">512 GB or higher</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Physical Condition</label>
                        <select
                          value={phoneCondition}
                          onChange={(e) => setPhoneCondition(e.target.value as any)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                        >
                          <option value="Flawless">Flawless (Like new, zero scratches)</option>
                          <option value="Good">Good (Minor normal signs of use)</option>
                          <option value="Average">Average (Noticeable scratches/scuffs)</option>
                          <option value="Cracked / Damaged">Cracked Screen / Dent on body</option>
                        </select>
                      </div>
                    </div>

                    {/* Battery Health & Expected Price */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Battery Health Status</label>
                        <select
                          value={batteryHealth}
                          onChange={(e) => setBatteryHealth(e.target.value as any)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                        >
                          <option value="Above 85%">Above 85% (Optimal backup)</option>
                          <option value="75% - 85%">75% - 85% (Moderate backup)</option>
                          <option value="Below 75% / Service">Below 75% or Service Recommended</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Your Expected Price (₹ optional)</label>
                        <input
                          type="number"
                          placeholder="e.g. 18000"
                          value={expectedPrice}
                          onChange={(e) => setExpectedPrice(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                        />
                      </div>
                    </div>

                    {/* Upload Photos Placeholder */}
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Upload Phone Photos (Front & Back - Optional)
                      </label>
                      <label className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-3 flex items-center justify-center gap-2 cursor-pointer bg-slate-50 hover:bg-blue-50/50 transition-colors">
                        <Upload className="w-4 h-4 text-blue-600" />
                        <span className="text-slate-600 font-medium truncate">
                          {uploadedImageName || "Click to attach device photos for faster assessment"}
                        </span>
                        <input 
                          type="file" 
                          accept="image/*"
                          className="hidden" 
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              setUploadedImageName(e.target.files[0].name);
                            }
                          }}
                        />
                      </label>
                    </div>

                    {/* Live Valuation Box */}
                    <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block">
                          Instant Estimated Valuation Range:
                        </span>
                        <span className="text-lg font-black text-blue-700">
                          ₹{estimatedMin.toLocaleString('en-IN')} - ₹{estimatedMax.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <span className="text-[10px] text-blue-600 font-medium self-start sm:self-auto">
                        *Subject to physical diagnostic test
                      </span>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-sm transition-all shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 active:scale-98"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Exchange Request</span>
                    </button>
                  </form>
                ) : (
                  /* Success Confirmation Screen */
                  <div className="py-6 text-center space-y-4 animate-in zoom-in-95">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                      <Check className="w-8 h-8" />
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-slate-900">
                        Exchange Request Submitted!
                      </h3>
                      <p className="text-xs font-bold text-blue-600 mt-1">
                        Reference Number: #{lastSubmittedId}
                      </p>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto mt-2 leading-relaxed">
                        Thank you {customerName}! Our Charlie Mobile valuation expert has received your enquiry for <strong>{oldBrand} {oldModel}</strong> and will call you on {customerPhone} shortly.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-left max-w-sm mx-auto space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Estimated Value:</span>
                        <span className="font-bold text-slate-900">₹{estimatedMin.toLocaleString('en-IN')} - ₹{estimatedMax.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Store Address:</span>
                        <span className="font-bold text-slate-900">Indira Bazar, Jaipur</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto pt-2">
                      <button
                        onClick={handleWhatsAppSend}
                        className="py-3 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat on WhatsApp Directly</span>
                      </button>

                      <button
                        onClick={resetForm}
                        className="py-3 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                      >
                        Submit Another Phone
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
