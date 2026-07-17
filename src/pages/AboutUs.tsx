import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Users, Award, ShieldCheck, ShoppingBag, Globe, MapPin } from 'lucide-react';

export const AboutUs: React.FC = () => {
  const { setActivePage } = useApp();

  return (
    <div id="ppb-about-us-page" className="bg-gray-50/50 dark:bg-zinc-950 pb-20 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-12 space-y-12 sm:space-y-16">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <span className="inline-flex items-center gap-1 bg-orange-100 dark:bg-orange-950/40 text-[#FF6B00] text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-wider">
              <Sparkles size={11} /> Since 2024
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
              Our Vision: High Quality, <span className="text-[#FF6B00]">Affordable</span> Shopping for Everyone.
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-semibold">
              PPBASKET is a premium, specialized <strong>Single-Vendor Direct-to-Consumer (D2C)</strong> storefront. We were founded with a single mission: to revolutionize online shopping in India by delivering premium products at incredibly wallet-friendly prices. We believe that top-tier fashion, electronics, cosmetics, and lifestyle products shouldn't carry luxury markups — they should be accessible to everyone, from bustling tier-1 cities to the heart of tier-3 towns.
            </p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Unlike complex multi-vendor marketplaces that list products from thousands of unverified third-party sellers, PPBASKET directly manages procurement, strict quality verification, inventory control, and fulfillment from our central facilities. This guarantees 100% genuine products, standardized secure packaging, and ultra-reliable fast home shipping.
            </p>
            <div className="pt-3">
              <button 
                onClick={() => setActivePage('products')}
                className="px-5 py-3 bg-[#FF6B00] hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer transition-transform"
              >
                Browse Our Store
              </button>
            </div>
          </div>

          {/* Graphical decorative grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-zinc-900 border border-gray-150 p-6 rounded-2xl shadow-sm text-center space-y-2 hover:scale-105 transition-transform">
              <div className="h-10 w-10 bg-orange-100 text-[#FF6B00] rounded-xl flex items-center justify-center mx-auto"><Users size={20} /></div>
              <h3 className="text-base font-black text-gray-800 dark:text-gray-100">100k+</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Happy Customers</p>
            </div>
            <div className="bg-white dark:bg-zinc-900 border border-gray-150 p-6 rounded-2xl shadow-sm text-center space-y-2 hover:scale-105 transition-transform">
              <div className="h-10 w-10 bg-emerald-100 text-emerald-500 rounded-xl flex items-center justify-center mx-auto"><ShieldCheck size={20} /></div>
              <h3 className="text-base font-black text-gray-800 dark:text-gray-100">100%</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Secure UPI Checkout</p>
            </div>
            <div className="bg-white dark:bg-zinc-900 border border-gray-150 p-6 rounded-2xl shadow-sm text-center space-y-2 hover:scale-105 transition-transform">
              <div className="h-10 w-10 bg-blue-100 text-blue-500 rounded-xl flex items-center justify-center mx-auto"><Award size={20} /></div>
              <h3 className="text-base font-black text-gray-800 dark:text-gray-100">15+</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Product Categories</p>
            </div>
            <div className="bg-white dark:bg-zinc-900 border border-gray-150 p-6 rounded-2xl shadow-sm text-center space-y-2 hover:scale-105 transition-transform">
              <div className="h-10 w-10 bg-purple-100 text-purple-500 rounded-xl flex items-center justify-center mx-auto"><Globe size={20} /></div>
              <h3 className="text-base font-black text-gray-800 dark:text-gray-100">28+</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Indian States Shipped</p>
            </div>
          </div>
        </div>

        {/* Core Principles */}
        <section className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 p-6 sm:p-10 rounded-3xl shadow-sm space-y-8">
          <div className="text-center space-y-1.5">
            <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest">Our Store Standards</h2>
            <p className="text-lg font-black text-gray-900 dark:text-white">Why customers love PPBASKET</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2.5">
              <div className="h-12 w-12 bg-orange-50 text-[#FF6B00] rounded-full flex items-center justify-center mx-auto font-black text-sm">1</div>
              <h3 className="font-extrabold text-xs text-gray-800 dark:text-gray-200">Affordable Pricing</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-semibold">We offer wholesale factory-direct price listings so that premium items fit within your budget seamlessly.</p>
            </div>
            <div className="space-y-2.5">
              <div className="h-12 w-12 bg-orange-50 text-[#FF6B00] rounded-full flex items-center justify-center mx-auto font-black text-sm">2</div>
              <h3 className="font-extrabold text-xs text-gray-800 dark:text-gray-200">Lightning-Fast Shipping</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-semibold">Your delivery is dispatched in 24 hours. We partner with India's best carriers for expedited home shipping.</p>
            </div>
            <div className="space-y-2.5">
              <div className="h-12 w-12 bg-orange-50 text-[#FF6B00] rounded-full flex items-center justify-center mx-auto font-black text-sm">3</div>
              <h3 className="font-extrabold text-xs text-gray-800 dark:text-gray-200">24/7 Verified Support</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-semibold">Got questions or refund concerns? Connect directly with our live chat team or message us on WhatsApp instantly.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
