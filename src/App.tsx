/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { BrandSection } from './components/BrandSection';
import { PromotionsBanner } from './components/PromotionsBanner';
import { ProductGrid } from './components/ProductGrid';
import { ExchangeSection } from './components/ExchangeSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { CustomerReviews } from './components/CustomerReviews';
import { FaqSection } from './components/FaqSection';
import { StoreContact } from './components/StoreContact';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OrderTrackModal } from './components/OrderTrackModal';
import { AuthModal } from './components/AuthModal';
import { PolicyModal } from './components/PolicyModal';
import { ToastContainer } from './components/Toast';
import { AdminDashboard } from './components/admin/AdminDashboard';

const MainStoreContent: React.FC = () => {
  const { isAdminMode } = useApp();

  if (isAdminMode) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Header & Navigation */}
      <Header />

      {/* Main E-commerce Sections */}
      <main className="flex-1">
        {/* A. Hero Section */}
        <Hero />

        {/* B. Shop by Category (12 categories) */}
        <CategorySection />

        {/* C. Shop by Brands (12 brands) */}
        <BrandSection />

        {/* D. Special Offers & Promotions */}
        <PromotionsBanner />

        {/* E. Featured Products Grid (with dynamic tabs, filters, sorting) */}
        <ProductGrid />

        {/* F. Premium Sell / Exchange Section (Upgrade Your Smartphone Today) */}
        <ExchangeSection />

        {/* G. Why Choose Charlie Mobile (6 verified trust cards) */}
        <WhyChooseUs />

        {/* H. Customer Reviews & Testimonials */}
        <CustomerReviews />

        {/* I. Expandable FAQ Section */}
        <FaqSection />

        {/* J. Store Location & Contact Information (Jaipur storefront, interactive map, form) */}
        <StoreContact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile-first bottom navigation bar */}
      <MobileBottomNav />

      {/* Global Interactive Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderConfirmationModal />
      <OrderTrackModal />
      <AuthModal />
      <PolicyModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainStoreContent />
    </AppProvider>
  );
}
