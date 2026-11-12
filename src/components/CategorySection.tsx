import React from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORY_LIST } from '../data/mockData';
import { ChevronRight, ArrowUpRight } from 'lucide-react';

export const CategorySection: React.FC = () => {
  const { selectedCategory, setSelectedCategory, setSelectedBrand, products } = useApp();

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedBrand('All');
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const getCategoryCount = (catName: string) => {
    return products.filter(p => p.category === catName).length;
  };

  return (
    <section id="categories-section" className="py-8 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold text-blue-600 tracking-wider uppercase mb-1">
              EXPLORE OUR STORE
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Shop by Category
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Select a category to view genuine brand inventory and live availability.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedBrand('All');
              const el = document.getElementById('products-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>View All Categories</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* 12 Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {CATEGORY_LIST.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = getCategoryCount(cat.name);

            return (
              <div
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`group relative cursor-pointer rounded-2xl p-3 sm:p-4 text-center border transition-all duration-300 flex flex-col items-center justify-between overflow-hidden ${
                  isSelected
                    ? 'bg-blue-50/80 border-blue-500 shadow-md ring-2 ring-blue-500/20'
                    : 'bg-slate-50/70 border-slate-100 hover:border-slate-200 hover:bg-white hover:shadow-lg'
                }`}
              >
                {/* Arrow hint icon */}
                <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-3.5 h-3.5 text-blue-600" />
                </div>

                {/* Circular image container */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 rounded-2xl overflow-hidden bg-white shadow-xs p-1.5 transition-transform duration-300 group-hover:scale-108">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-xl"
                    loading="lazy"
                  />
                </div>

                {/* Info */}
                <div className="w-full">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {count > 0 ? `${count} items` : 'Explore'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
