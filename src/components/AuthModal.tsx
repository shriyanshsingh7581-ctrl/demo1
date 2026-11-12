import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  Lock, 
  ShoppingBag, 
  LogOut, 
  MapPin, 
  Clock,
  RotateCcw
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    isAuthOpen, 
    setIsAuthOpen, 
    user, 
    loginUser, 
    logoutUser, 
    orders, 
    setIsOrderTrackingOpen 
  } = useApp();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  if (!isAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    loginUser(email, name || email.split('@')[0]);
  };

  const userOrders = user 
    ? orders.filter(o => o.customerEmail.toLowerCase() === user.email.toLowerCase() || o.customerName === user.name)
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-white z-10">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            <h2 className="font-extrabold text-base text-slate-900">
              {user ? "Customer Account" : (isRegisterMode ? "Create Account" : "Customer Sign In")}
            </h2>
          </div>
          <button
            onClick={() => setIsAuthOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-xs">
          {user ? (
            /* Logged in state */
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  {user.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-extrabold text-sm text-slate-900 truncate">{user.name}</h3>
                  <p className="text-slate-500 text-xs truncate">{user.email}</p>
                  <p className="text-slate-500 text-xs">{user.phone}</p>
                </div>
              </div>

              {/* Order History */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center justify-between">
                  <span>Your Orders ({userOrders.length})</span>
                </h4>

                {userOrders.length > 0 ? (
                  <div className="space-y-2">
                    {userOrders.map(ord => (
                      <div key={ord.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="font-extrabold text-slate-900">#{ord.id}</span>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 text-blue-800">
                            {ord.status}
                          </span>
                        </div>
                        <p className="text-slate-500 text-[11px] truncate">
                          {ord.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}
                        </p>
                        <div className="flex justify-between items-center pt-1 border-t border-slate-200/60">
                          <span className="font-bold text-blue-600">₹{ord.total.toLocaleString('en-IN')}</span>
                          <button
                            onClick={() => {
                              setIsAuthOpen(false);
                              setIsOrderTrackingOpen(true);
                            }}
                            className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1"
                          >
                            <RotateCcw className="w-3 h-3" />
                            Track
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 py-3 text-center bg-slate-50 rounded-xl">
                    No orders placed yet with this account.
                  </p>
                )}
              </div>

              {/* Saved Address */}
              {user.address && (
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-800 text-[11px] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    Saved Delivery Address
                  </span>
                  <p className="text-slate-600">
                    {user.address.street}, {user.address.city}, {user.address.state} - {user.address.pincode}
                  </p>
                </div>
              )}

              {/* Logout Button */}
              <button
                onClick={logoutUser}
                className="w-full py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            /* Sign In / Sign Up Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex p-1 bg-slate-100 rounded-xl text-center">
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(false)}
                  className={`flex-1 py-1.5 rounded-lg font-bold text-xs transition-colors ${
                    !isRegisterMode ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(true)}
                  className={`flex-1 py-1.5 rounded-lg font-bold text-xs transition-colors ${
                    isRegisterMode ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  New Customer
                </button>
              </div>

              {isRegisterMode && (
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Rathore"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                  />
                </div>
              )}

              <div>
                <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. vikram@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
              >
                {isRegisterMode ? "Create Charlie Mobile Account" : "Sign In to Account"}
              </button>

              <div className="pt-2 text-center text-slate-400 text-[11px]">
                Demo Customer Account: Enter any email to experience instant login.
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
