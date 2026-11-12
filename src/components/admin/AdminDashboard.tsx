import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, ProductCategory, ProductBrand, OrderStatus } from '../../types';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  IndianRupee, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  SlidersHorizontal, 
  Check, 
  X, 
  RotateCcw, 
  Sparkles, 
  Store, 
  PhoneCall, 
  MessageSquare,
  ShieldAlert,
  Save,
  LogOut,
  ChevronRight,
  TrendingUp,
  Tag,
  Eye
} from 'lucide-react';
import { CATEGORY_LIST, BRAND_LIST } from '../../data/mockData';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    orders,
    exchangeRequests,
    reviews,
    storeSettings,
    setIsAdminMode,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    updateExchangeStatus,
    updateStoreSettings,
    resetAllDemoData,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'exchange' | 'store'>('overview');
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');

  // Product Editing / Adding Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddProductModal, setIsAddProductModal] = useState(false);

  // Form state for product add/edit
  const [formName, setFormName] = useState('');
  const [formBrand, setFormBrand] = useState<ProductBrand>('Apple');
  const [formCategory, setFormCategory] = useState<ProductCategory>('Smartphones');
  const [formPrice, setFormPrice] = useState(0);
  const [formMrp, setFormMrp] = useState(0);
  const [formStorage, setFormStorage] = useState('128GB');
  const [formRam, setFormRam] = useState('8GB');
  const [formStockCount, setFormStockCount] = useState(10);
  const [formInStock, setFormInStock] = useState(true);
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formDescription, setFormDescription] = useState('');

  // Store Settings Form State
  const [settingsForm, setSettingsForm] = useState(storeSettings);

  // Metrics
  const totalRevenue = orders.reduce((acc, o) => acc + (o.paymentStatus === 'Paid' ? o.total : o.total), 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalCustomers = Array.from(new Set(orders.map(o => o.customerPhone))).length || 1;
  const pendingExchangeCount = exchangeRequests.filter(e => e.status === 'New').length;

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormBrand(p.brand);
    setFormCategory(p.category);
    setFormPrice(p.price);
    setFormMrp(p.mrp);
    setFormStorage(p.storage);
    setFormRam(p.ram || '');
    setFormStockCount(p.stockCount);
    setFormInStock(p.inStock);
    setFormImageUrl(p.images[0] || '');
    setFormDescription(p.description);
  };

  const handleOpenAdd = () => {
    setIsAddProductModal(true);
    setEditingProduct(null);
    setFormName('');
    setFormBrand('Apple');
    setFormCategory('Smartphones');
    setFormPrice(49999);
    setFormMrp(54999);
    setFormStorage('128GB');
    setFormRam('8GB');
    setFormStockCount(12);
    setFormInStock(true);
    setFormImageUrl('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80');
    setFormDescription('High performance smartphone with official manufacturer brand warranty.');
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || formPrice <= 0) {
      showToast("Please enter product name and valid price", "error");
      return;
    }

    const discountPercentage = formMrp > formPrice ? Math.round(((formMrp - formPrice) / formMrp) * 100) : 0;

    if (editingProduct) {
      const updated: Product = {
        ...editingProduct,
        name: formName,
        brand: formBrand,
        category: formCategory,
        price: formPrice,
        mrp: formMrp,
        discountPercentage,
        storage: formStorage,
        ram: formRam,
        stockCount: formStockCount,
        inStock: formInStock,
        images: formImageUrl ? [formImageUrl, ...editingProduct.images.slice(1)] : editingProduct.images,
        description: formDescription
      };
      updateProduct(updated);
      setEditingProduct(null);
    } else {
      const newProd: Product = {
        id: `cm-${Date.now()}`,
        name: formName,
        brand: formBrand,
        category: formCategory,
        price: formPrice,
        mrp: formMrp,
        discountPercentage,
        storage: formStorage,
        ram: formRam,
        stockCount: formStockCount,
        inStock: formInStock,
        images: [formImageUrl || 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1000&q=80'],
        description: formDescription,
        colors: [{ name: "Standard", hex: "#1C1C1C" }],
        rating: 4.8,
        reviewCount: 1,
        warranty: "1 Year Official Manufacturer Warranty",
        specifications: {
          "Display": "6.7-inch OLED Display",
          "Battery": "5000mAh Fast Charging",
          "Warranty": "1 Year Official Brand Warranty"
        }
      };
      addProduct(newProd);
      setIsAddProductModal(false);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreSettings(settingsForm);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.brand.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.customerPhone.includes(orderSearch)
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      
      {/* Admin Top Navigation */}
      <header className="bg-slate-950 border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-md">
            CM
          </div>
          <div>
            <h1 className="font-extrabold text-sm sm:text-base text-white flex items-center gap-2">
              Charlie Mobile • Store Admin Suite
            </h1>
            <p className="text-[11px] text-slate-400">Jaipur Storefront & Online Catalog Management</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAdminMode(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Return to Store</span>
          </button>
        </div>
      </header>

      {/* Admin Subheader Navigation Tabs */}
      <nav className="bg-slate-950/80 border-b border-slate-800 px-4 sm:px-8 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
        {[
          { id: 'overview', label: 'Overview & Analytics', icon: LayoutDashboard },
          { id: 'products', label: `Products (${products.length})`, icon: Package },
          { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
          { id: 'exchange', label: `Exchange Enquiries (${exchangeRequests.length})`, icon: Sparkles, badge: pendingExchangeCount },
          { id: 'store', label: 'Store & Contact Settings', icon: Store }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-3 px-3.5 font-bold transition-all border-b-2 whitespace-nowrap ${
                isActive
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {Boolean(tab.badge) && (
                <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Main Admin Tab View */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-6">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Total Store Revenue
                </span>
                <p className="text-2xl sm:text-3xl font-black text-white">
                  ₹{totalRevenue.toLocaleString('en-IN')}
                </p>
                <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +18.4% from last month
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Total Orders
                </span>
                <p className="text-2xl sm:text-3xl font-black text-white">
                  {totalOrders}
                </p>
                <span className="text-[11px] text-blue-400 font-semibold">
                  {orders.filter(o => o.status === 'Pending').length} pending dispatch
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Catalog Inventory
                </span>
                <p className="text-2xl sm:text-3xl font-black text-white">
                  {totalProducts} Items
                </p>
                <span className="text-[11px] text-amber-400 font-semibold">
                  12 Active Brand Categories
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Exchange Leads
                </span>
                <p className="text-2xl sm:text-3xl font-black text-white">
                  {exchangeRequests.length}
                </p>
                <span className="text-[11px] text-purple-400 font-semibold">
                  {pendingExchangeCount} new valuations
                </span>
              </div>
            </div>

            {/* Quick Actions & Recent Orders Table */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Recent Orders Overview */}
              <div className="lg:col-span-8 bg-slate-800/80 rounded-2xl border border-slate-700/80 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-white">Recent Customer Orders</h3>
                  <button 
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-amber-400 hover:underline font-bold"
                  >
                    View All Orders →
                  </button>
                </div>

                <div className="overflow-x-auto text-xs">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-700 text-slate-400 font-semibold">
                        <th className="pb-3">Order ID</th>
                        <th className="pb-3">Customer</th>
                        <th className="pb-3">Total</th>
                        <th className="pb-3">Payment</th>
                        <th className="pb-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/60">
                      {orders.slice(0, 5).map(o => (
                        <tr key={o.id} className="hover:bg-slate-700/30">
                          <td className="py-3 font-bold text-white">#{o.id}</td>
                          <td className="py-3">
                            <p className="font-semibold text-slate-200">{o.customerName}</p>
                            <p className="text-[10px] text-slate-400">{o.customerPhone}</p>
                          </td>
                          <td className="py-3 font-bold text-amber-300">₹{o.total.toLocaleString('en-IN')}</td>
                          <td className="py-3 text-slate-300">{o.paymentMethod}</td>
                          <td className="py-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-900/60 text-blue-300 border border-blue-700/50">
                              {o.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quick Admin Controls */}
              <div className="lg:col-span-4 bg-slate-800/80 rounded-2xl border border-slate-700/80 p-5 space-y-4">
                <h3 className="font-extrabold text-sm text-white">Quick Catalog Controls</h3>
                
                <div className="space-y-2.5">
                  <button
                    onClick={handleOpenAdd}
                    className="w-full p-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add New Smartphone / Accessory
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setActiveTab('store')}
                    className="w-full p-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Store className="w-4 h-4 text-emerald-400" />
                      Update Jaipur Store Details & Timings
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={resetAllDemoData}
                    className="w-full p-3 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <RotateCcw className="w-4 h-4 text-amber-400" />
                      Reset to Official Demo Catalog
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-4 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-800/60 p-4 rounded-2xl border border-slate-700">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search products by title, brand, category..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <button
                onClick={handleOpenAdd}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>

            {/* Product Table */}
            <div className="bg-slate-800/80 rounded-2xl border border-slate-700 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400 font-bold bg-slate-900/60">
                    <th className="p-3.5">Product</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Brand</th>
                    <th className="p-3.5">Price / MRP</th>
                    <th className="p-3.5">Stock</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60">
                  {filteredProducts.map(p => (
                    <tr key={p.id} className="hover:bg-slate-700/30">
                      <td className="p-3.5 flex items-center gap-3">
                        <img src={p.images[0]} alt={p.name} className="w-10 h-10 object-contain rounded-lg bg-slate-900 p-1 shrink-0" />
                        <div>
                          <p className="font-bold text-white max-w-xs truncate">{p.name}</p>
                          <p className="text-[10px] text-slate-400">{p.storage} {p.ram ? `• ${p.ram} RAM` : ''}</p>
                        </div>
                      </td>
                      <td className="p-3.5 text-slate-300">{p.category}</td>
                      <td className="p-3.5 font-bold text-blue-400">{p.brand}</td>
                      <td className="p-3.5">
                        <span className="font-bold text-white">₹{p.price.toLocaleString('en-IN')}</span>
                        <span className="text-[10px] text-slate-500 line-through ml-1.5">₹{p.mrp.toLocaleString('en-IN')}</span>
                      </td>
                      <td className="p-3.5">
                        <button
                          onClick={() => updateProduct({ ...p, inStock: !p.inStock })}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            p.inStock ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-red-950 text-red-400 border border-red-800'
                          }`}
                        >
                          {p.inStock ? `In Stock (${p.stockCount})` : 'Out of Stock'}
                        </button>
                      </td>
                      <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-200 transition-colors"
                          title="Edit Product"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-1.5 bg-rose-950/60 hover:bg-rose-900 text-rose-300 rounded-lg transition-colors border border-rose-800/60"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between bg-slate-800/60 p-4 rounded-2xl border border-slate-700">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search by Order ID, Customer Name, Mobile..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="space-y-3">
              {filteredOrders.map(order => (
                <div key={order.id} className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-700">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm text-white">#{order.id}</span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-400">{new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-slate-300 font-semibold mt-0.5">
                        {order.customerName} ({order.customerPhone})
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-slate-400 text-[10px] block">Total Amount</span>
                        <span className="font-black text-amber-300 text-sm">₹{order.total.toLocaleString('en-IN')}</span>
                      </div>

                      {/* Status Selector */}
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className="bg-slate-900 border border-slate-600 rounded-xl px-3 py-1.5 font-bold text-xs text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {/* Order Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300">
                    <div>
                      <p className="font-bold text-slate-400 text-[11px] mb-1">Purchased Products:</p>
                      <ul className="space-y-1">
                        {order.items.map((it, idx) => (
                          <li key={idx} className="flex justify-between">
                            <span>{it.name} ({it.storage}, {it.color}) x{it.quantity}</span>
                            <span className="font-bold text-white">₹{(it.price * it.quantity).toLocaleString('en-IN')}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="font-bold text-slate-400 text-[11px] mb-1">Shipping & Payment:</p>
                      <p className="text-slate-300">{order.shippingAddress.street}, {order.shippingAddress.city} - {order.shippingAddress.pincode}</p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Method: <strong>{order.deliveryMethod}</strong> • Mode: <strong>{order.paymentMethod}</strong> ({order.paymentStatus})
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: EXCHANGE ENQUIRIES */}
        {activeTab === 'exchange' && (
          <div className="space-y-4 animate-in fade-in">
            <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm text-white">Customer Phone Exchange Leads</h3>
                <p className="text-xs text-slate-400">Old smartphones submitted by users for store valuation.</p>
              </div>
            </div>

            <div className="space-y-3">
              {exchangeRequests.map(req => (
                <div key={req.id} className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-700">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm text-amber-400">#{req.id}</span>
                        <span className="text-slate-400">•</span>
                        <span className="font-bold text-white">{req.oldBrand} {req.oldModel}</span>
                        <span className="bg-slate-700 px-2 py-0.5 rounded text-[10px] text-slate-300">{req.storage}</span>
                      </div>
                      <p className="text-slate-300 mt-0.5">
                        Customer: <strong>{req.customerName}</strong> ({req.customerPhone}) • {req.customerCity}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-slate-400 text-[10px] block">Estimated Valuation</span>
                        <span className="font-black text-emerald-400 text-xs">
                          ₹{req.estimatedValuationMin.toLocaleString('en-IN')} - ₹{req.estimatedValuationMax.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <select
                        value={req.status}
                        onChange={(e) => updateExchangeStatus(req.id, e.target.value as any)}
                        className="bg-slate-900 border border-slate-600 rounded-xl px-3 py-1.5 font-bold text-xs text-white"
                      >
                        <option value="New">New Lead</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Evaluated">Evaluated</option>
                        <option value="Completed">Exchange Completed</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-300">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Screen Condition</span>
                      <span className="font-bold">{req.phoneCondition}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Battery Health</span>
                      <span className="font-bold">{req.batteryHealth}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Customer Expected Price</span>
                      <span className="font-bold text-amber-300">₹{req.expectedPrice?.toLocaleString('en-IN')}</span>
                    </div>
                    <div>
                      <a
                        href={`https://wa.me/${req.customerPhone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi ${req.customerName}, calling from Charlie Mobile Jaipur regarding your phone exchange for ${req.oldBrand} ${req.oldModel}.`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-emerald-400 hover:underline font-bold mt-2"
                      >
                        Chat on WhatsApp →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: STORE SETTINGS & CONTACT */}
        {activeTab === 'store' && (
          <div className="max-w-2xl bg-slate-800/80 rounded-2xl border border-slate-700 p-6 space-y-5 animate-in fade-in text-xs">
            <div className="pb-3 border-b border-slate-700">
              <h3 className="font-bold text-sm text-white">Store Identity & Contact Details</h3>
              <p className="text-slate-400 mt-0.5">
                Update store phone numbers, WhatsApp, physical address, and announcement banner.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="font-bold text-slate-300 block mb-1">Store Name</label>
                <input
                  type="text"
                  value={settingsForm.storeName}
                  onChange={(e) => setSettingsForm({ ...settingsForm, storeName: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Top Announcement Banner Text</label>
                <input
                  type="text"
                  value={settingsForm.announcementText}
                  onChange={(e) => setSettingsForm({ ...settingsForm, announcementText: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Store Phone Number</label>
                  <input
                    type="text"
                    value={settingsForm.phone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">WhatsApp Number (e.g. 919829012345)</label>
                  <input
                    type="text"
                    value={settingsForm.whatsapp}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Support Email</label>
                  <input
                    type="email"
                    value={settingsForm.email}
                    onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Store Timings</label>
                  <input
                    type="text"
                    value={settingsForm.openingHours}
                    onChange={(e) => setSettingsForm({ ...settingsForm, openingHours: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Jaipur Store Physical Address</label>
                <input
                  type="text"
                  value={settingsForm.address}
                  onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <button
                type="submit"
                className="py-3 px-6 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-colors shadow-sm flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Store Information</span>
              </button>
            </form>
          </div>
        )}

      </main>

      {/* Modal: Add or Edit Product */}
      {(isAddProductModal || editingProduct) && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-xl w-full shadow-2xl text-xs space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base text-white">
                {editingProduct ? `Edit: ${editingProduct.name}` : 'Add New Smartphone or Gadget'}
              </h3>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsAddProductModal(false);
                }}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3">
              <div>
                <label className="font-bold text-slate-300 block mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Brand</label>
                  <select
                    value={formBrand}
                    onChange={(e) => setFormBrand(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white"
                  >
                    {BRAND_LIST.map(b => (
                      <option key={b.name} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white"
                  >
                    {CATEGORY_LIST.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">MRP (₹)</label>
                  <input
                    type="number"
                    value={formMrp}
                    onChange={(e) => setFormMrp(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Storage</label>
                  <input
                    type="text"
                    value={formStorage}
                    onChange={(e) => setFormStorage(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">RAM</label>
                  <input
                    type="text"
                    value={formRam}
                    onChange={(e) => setFormRam(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Stock Count</label>
                  <input
                    type="number"
                    value={formStockCount}
                    onChange={(e) => setFormStockCount(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Main Image URL</label>
                <input
                  type="text"
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-colors"
              >
                {editingProduct ? 'Save Product Changes' : 'Create & Publish Product'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
