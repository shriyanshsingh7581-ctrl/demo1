import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  ProductCategory, 
  ProductBrand, 
  CartItem, 
  Order, 
  OrderStatus, 
  ExchangeRequest, 
  Review, 
  StoreSettings, 
  UserProfile,
  ProductVariant
} from '../types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_STORE_SETTINGS, 
  INITIAL_REVIEWS 
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface AppContextType {
  products: Product[];
  storeSettings: StoreSettings;
  reviews: Review[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  exchangeRequests: ExchangeRequest[];
  user: UserProfile | null;
  isAdminMode: boolean;
  
  // Navigation & Filtering
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isOrderTrackingOpen: boolean;
  setIsOrderTrackingOpen: (open: boolean) => void;
  isPolicyModal: 'privacy' | 'terms' | 'shipping' | 'returns' | null;
  setIsPolicyModal: (type: 'privacy' | 'terms' | 'shipping' | 'returns' | null) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (prod: Product | null) => void;
  confirmedOrder: Order | null;
  setConfirmedOrder: (order: Order | null) => void;

  // Actions
  setIsAdminMode: (admin: boolean) => void;
  addToCart: (product: Product, color?: string, variant?: ProductVariant, quantity?: number) => void;
  removeFromCart: (productId: string, color: string, storage?: string) => void;
  updateCartQuantity: (productId: string, color: string, storage: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  placeOrder: (orderInput: Omit<Order, 'id' | 'createdAt' | 'status'>) => Order;
  submitExchangeRequest: (req: Omit<ExchangeRequest, 'id' | 'createdAt' | 'status'>) => ExchangeRequest;
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updateExchangeStatus: (id: string, status: ExchangeRequest['status']) => void;
  
  // Admin actions
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  updateStoreSettings: (settings: StoreSettings) => void;
  resetAllDemoData: () => void;

  // Promo code
  appliedCoupon: { code: string; discountAmount: number } | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Cart calculations
  cartSubtotal: number;
  cartTotal: number;
  cartItemCount: number;

  // Toast
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  dismissToast: (id: string) => void;

  // Auth
  loginUser: (email: string, name?: string) => void;
  logoutUser: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Local storage helpers
  const loadStorage = <T,>(key: string, fallback: T): T => {
    try {
      const data = localStorage.getItem(`cm_${key}`);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  };

  const saveStorage = (key: string, value: unknown) => {
    try {
      localStorage.setItem(`cm_${key}`, JSON.stringify(value));
    } catch (e) {
      console.warn("Storage save failed", e);
    }
  };

  // State
  const [products, setProducts] = useState<Product[]>(() => loadStorage('products', INITIAL_PRODUCTS));
  const [storeSettings, setStoreSettingsState] = useState<StoreSettings>(() => loadStorage('settings', INITIAL_STORE_SETTINGS));
  const [reviews, setReviews] = useState<Review[]>(() => loadStorage('reviews', INITIAL_REVIEWS));
  const [cart, setCart] = useState<CartItem[]>(() => loadStorage('cart', []));
  const [wishlist, setWishlist] = useState<string[]>(() => loadStorage('wishlist', []));
  const [orders, setOrders] = useState<Order[]>(() => loadStorage('orders', [
    {
      id: "CM-92841",
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      customerName: "Vikram Rathore",
      customerPhone: "+91 98290 12345",
      customerEmail: "vikram.rathore@example.com",
      shippingAddress: {
        street: "Plot 42, Kalyan Colony, Mansarovar",
        city: "Jaipur",
        state: "Rajasthan",
        pincode: "302020"
      },
      deliveryMethod: "Express Delivery",
      paymentMethod: "UPI",
      paymentStatus: "Paid",
      items: [
        {
          productId: "cm-iphone-16-pro",
          name: "Apple iPhone 16 Pro (Natural Titanium)",
          image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=300&q=80",
          brand: "Apple",
          price: 119900,
          quantity: 1,
          color: "Natural Titanium",
          storage: "128GB"
        }
      ],
      subtotal: 119900,
      discount: 1000,
      deliveryFee: 0,
      total: 118900,
      status: "Shipped",
      trackingNumber: "EXP-JPR-88291"
    }
  ]));
  const [exchangeRequests, setExchangeRequests] = useState<ExchangeRequest[]>(() => loadStorage('exchange', [
    {
      id: "EX-1042",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      customerName: "Pooja Sharma",
      customerPhone: "+91 94140 55678",
      customerCity: "Jaipur",
      oldBrand: "Samsung",
      oldModel: "Galaxy S21 5G",
      storage: "128GB",
      phoneCondition: "Good",
      batteryHealth: "Above 85%",
      expectedPrice: 19000,
      estimatedValuationMin: 18000,
      estimatedValuationMax: 21500,
      status: "Completed",
      notes: "Device inspected at store; customer accepted exchange for S24 Ultra."
    }
  ]));

  const [user, setUser] = useState<UserProfile | null>(() => loadStorage('user', {
    id: "user-1",
    name: "Vikram Rathore",
    email: "vikram@example.com",
    phone: "+91 98290 12345",
    address: {
      street: "Plot 42, Kalyan Colony, Mansarovar",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302020"
    }
  }));

  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);

  // Filters & Tabs
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [activeTab, setActiveTab] = useState<string>('all');

  // Modals
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState<boolean>(false);
  const [isPolicyModal, setIsPolicyModal] = useState<'privacy' | 'terms' | 'shipping' | 'returns' | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Coupon
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountAmount: number } | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to local storage
  useEffect(() => saveStorage('products', products), [products]);
  useEffect(() => saveStorage('settings', storeSettings), [storeSettings]);
  useEffect(() => saveStorage('reviews', reviews), [reviews]);
  useEffect(() => saveStorage('cart', cart), [cart]);
  useEffect(() => saveStorage('wishlist', wishlist), [wishlist]);
  useEffect(() => saveStorage('orders', orders), [orders]);
  useEffect(() => saveStorage('exchange', exchangeRequests), [exchangeRequests]);
  useEffect(() => saveStorage('user', user), [user]);

  // Toast actions
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart calculations
  const cartSubtotal = cart.reduce((acc, item) => {
    const unitPrice = item.selectedVariant ? item.selectedVariant.price : item.product.price;
    return acc + (unitPrice * item.quantity);
  }, 0);

  const cartDiscount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const cartDeliveryFee = cartSubtotal > 0 && cartSubtotal >= storeSettings.freeShippingThreshold ? 0 : (cartSubtotal > 0 ? 99 : 0);
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartDeliveryFee);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Cart actions
  const addToCart = (product: Product, color?: string, variant?: ProductVariant, quantity: number = 1) => {
    const chosenColor = color || (product.colors?.[0]?.name || "Standard");
    const chosenVariant = variant || (product.variants?.[0]);

    setCart(prev => {
      const existingIndex = prev.findIndex(item => 
        item.product.id === product.id && 
        item.selectedColor === chosenColor &&
        item.selectedVariant?.storage === chosenVariant?.storage
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      } else {
        return [...prev, {
          product,
          selectedColor: chosenColor,
          selectedVariant: chosenVariant,
          quantity
        }];
      }
    });

    showToast(`Added ${product.name} to cart!`, 'success');
  };

  const removeFromCart = (productId: string, color: string, storage?: string) => {
    setCart(prev => prev.filter(item => !(
      item.product.id === productId &&
      item.selectedColor === color &&
      (!storage || item.selectedVariant?.storage === storage)
    )));
    showToast("Item removed from cart", "info");
  };

  const updateCartQuantity = (productId: string, color: string, storage: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, color, storage);
      return;
    }
    setCart(prev => prev.map(item => {
      if (
        item.product.id === productId &&
        item.selectedColor === color &&
        item.selectedVariant?.storage === storage
      ) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Wishlist actions
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast("Removed from Wishlist", "info");
        return prev.filter(id => id !== productId);
      } else {
        showToast("Added to your Wishlist ❤️", "success");
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Coupon
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'CHARLIE1000' && cartSubtotal >= 10000) {
      setAppliedCoupon({ code: 'CHARLIE1000', discountAmount: 1000 });
      showToast("Coupon CHARLIE1000 applied! Saved ₹1,000", "success");
      return { success: true, message: "Coupon applied! ₹1,000 discount applied." };
    } else if (cleanCode === 'WELCOME500' && cartSubtotal >= 2000) {
      setAppliedCoupon({ code: 'WELCOME500', discountAmount: 500 });
      showToast("Coupon WELCOME500 applied! Saved ₹500", "success");
      return { success: true, message: "Welcome coupon applied! ₹500 discount." };
    } else if (cleanCode === 'CHARLIE5' && cartSubtotal > 0) {
      const discount = Math.round(cartSubtotal * 0.05);
      setAppliedCoupon({ code: 'CHARLIE5', discountAmount: discount });
      showToast(`5% Extra Savings applied! Saved ₹${discount}`, "success");
      return { success: true, message: `5% Instant discount applied: ₹${discount}` };
    } else {
      return { success: false, message: "Invalid or expired coupon code. Try CHARLIE1000 or WELCOME500." };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast("Coupon removed", "info");
  };

  // Order Placement
  const placeOrder = (orderInput: Omit<Order, 'id' | 'createdAt' | 'status'>): Order => {
    const id = `CM-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      ...orderInput,
      id,
      createdAt: new Date().toISOString(),
      status: 'Pending',
      trackingNumber: `EXP-JPR-${Math.floor(10000 + Math.random() * 90000)}`
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setConfirmedOrder(newOrder);
    showToast(`Order #${id} confirmed successfully!`, 'success');
    return newOrder;
  };

  // Submit Exchange
  const submitExchangeRequest = (req: Omit<ExchangeRequest, 'id' | 'createdAt' | 'status'>): ExchangeRequest => {
    const id = `EX-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReq: ExchangeRequest = {
      ...req,
      id,
      createdAt: new Date().toISOString(),
      status: 'New'
    };
    setExchangeRequests(prev => [newReq, ...prev]);
    showToast(`Exchange Enquiry #${id} submitted! Our team will contact you.`, 'success');
    return newReq;
  };

  // Review
  const addReview = (reviewInput: Omit<Review, 'id' | 'date'>) => {
    const newRev: Review = {
      ...reviewInput,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };
    setReviews(prev => [newRev, ...prev]);
    showToast("Thank you for your feedback! Review posted.", "success");
  };

  // Status updates
  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    showToast(`Order ${orderId} updated to ${status}`, 'info');
  };

  const updateExchangeStatus = (id: string, status: ExchangeRequest['status']) => {
    setExchangeRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    showToast(`Exchange request updated to ${status}`, 'info');
  };

  // Admin CRUD
  const addProduct = (newProd: Product) => {
    setProducts(prev => [newProd, ...prev]);
    showToast(`Added product "${newProd.name}"`, 'success');
  };

  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    showToast(`Updated product "${updated.name}"`, 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast("Product deleted successfully", "info");
  };

  const updateStoreSettings = (settings: StoreSettings) => {
    setStoreSettingsState(settings);
    showToast("Store settings and details updated!", "success");
  };

  const resetAllDemoData = () => {
    setProducts(INITIAL_PRODUCTS);
    setStoreSettingsState(INITIAL_STORE_SETTINGS);
    setReviews(INITIAL_REVIEWS);
    showToast("Reset to default Charlie Mobile catalog and settings", "info");
  };

  // Auth
  const loginUser = (email: string, name?: string) => {
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: name || email.split('@')[0],
      email,
      phone: "+91 98290 12345"
    };
    setUser(newUser);
    showToast(`Welcome back, ${newUser.name}!`, 'success');
    setIsAuthOpen(false);
  };

  const logoutUser = () => {
    setUser(null);
    showToast("Logged out successfully", "info");
  };

  return (
    <AppContext.Provider value={{
      products,
      storeSettings,
      reviews,
      cart,
      wishlist,
      orders,
      exchangeRequests,
      user,
      isAdminMode,
      setIsAdminMode,
      selectedCategory,
      setSelectedCategory,
      selectedBrand,
      setSelectedBrand,
      searchQuery,
      setSearchQuery,
      sortBy,
      setSortBy,
      activeTab,
      setActiveTab,
      isCartOpen,
      setIsCartOpen,
      isWishlistOpen,
      setIsWishlistOpen,
      isAuthOpen,
      setIsAuthOpen,
      isCheckoutOpen,
      setIsCheckoutOpen,
      isOrderTrackingOpen,
      setIsOrderTrackingOpen,
      isPolicyModal,
      setIsPolicyModal,
      quickViewProduct,
      setQuickViewProduct,
      confirmedOrder,
      setConfirmedOrder,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      toggleWishlist,
      isInWishlist,
      placeOrder,
      submitExchangeRequest,
      addReview,
      updateOrderStatus,
      updateExchangeStatus,
      addProduct,
      updateProduct,
      deleteProduct,
      updateStoreSettings,
      resetAllDemoData,
      appliedCoupon,
      applyCoupon,
      removeCoupon,
      cartSubtotal,
      cartTotal,
      cartItemCount,
      toasts,
      showToast,
      dismissToast,
      loginUser,
      logoutUser
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
