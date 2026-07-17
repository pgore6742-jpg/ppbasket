import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { Tag, Sparkles, Copy, Check, Flame, Award } from 'lucide-react';

export const Deals: React.FC = () => {
  const { coupons, products, addNotification } = useApp();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    addNotification('Coupon Copied', `Coupon code "${code}" has been copied. Use it during checkout!`, 'info');
    setTimeout(() => setCopiedCode(null), 3000);
  };

  // Filter products with active discount deals
  const dealProducts = products.filter(p => p.price < p.originalPrice);

  return (
    <div id="ppb-deals-page" className="bg-gray-50/50 dark:bg-zinc-950 pb-20 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto space-y-2 mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 bg-orange-100 dark:bg-orange-950/40 text-[#FF6B00] text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-wider">
            <Flame size={12} className="animate-pulse" /> Saving Bonanza
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">Active Coupons & Deals</h1>
          <p className="text-xs text-gray-400">Save big on your next PPBASKET purchase. Browse discount coupons and hot deals below.</p>
        </div>

        {/* Hot Deals Products Grid */}
        <section>
          <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Award size={16} className="text-[#FF6B00]" /> Ongoing Product Discounts
          </h2>
          {dealProducts.length === 0 ? (
            <div className="text-center py-12 text-xs text-gray-400">All products are at standard pocket-friendly prices. New deal events coming soon!</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {dealProducts.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
};
