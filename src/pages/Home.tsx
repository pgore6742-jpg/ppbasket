import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { 
  Star, Flame, ChevronLeft, ChevronRight, Award, Truck, 
  RotateCcw, ShieldCheck, PhoneCall, Gift, Sparkles,
  Smartphone, Headphones, Shirt, Utensils, Sparkle, 
  Dumbbell, BookOpen, Clock, Tag
} from 'lucide-react';

export const Home: React.FC = () => {
  const {
    products,
    banners,
    setActivePage,
    setSelectedCategory,
    viewProductDetail
  } = useApp();

  const [currentBanner, setCurrentBanner] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 54, seconds: 32 });

  // Carousel timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  // Flash Sale countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 6, minutes: 0, seconds: 0 }; // Reset
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filtered collections
  const featuredCategoryList = [
    { name: 'Mobiles', icon: <Smartphone size={24} />, count: '2 Products', color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20' },
    { name: 'Electronics', icon: <Headphones size={24} />, count: '1 Product', color: 'bg-blue-50 text-blue-600 dark:bg-blue-950/20' },
    { name: 'Fashion', icon: <Shirt size={24} />, count: '1 Product', color: 'bg-purple-50 text-purple-600 dark:bg-purple-950/20' },
    { name: 'Home & Kitchen', icon: <Utensils size={24} />, count: '1 Product', color: 'bg-amber-50 text-amber-600 dark:bg-amber-950/20' },
    { name: 'Beauty', icon: <Sparkle size={24} />, count: '1 Product', color: 'bg-pink-50 text-pink-600 dark:bg-pink-950/20' },
    { name: 'Sports & Fitness', icon: <Dumbbell size={24} />, count: '1 Product', color: 'bg-red-50 text-red-600 dark:bg-red-950/20' }
  ];

  const dealProducts = products.filter(p => p.isDeal).slice(0, 4);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);

  const brandLogs = [
    { name: 'Fastrack', label: 'Fastrack Wearables' },
    { name: 'Noise', label: 'Noise Audio' },
    { name: 'Pigeon', label: 'Pigeon Kitchen' },
    { name: 'Realme', label: 'Realme India' },
    { name: 'Happilo', label: 'Happilo Nutrition' },
    { name: 'Nilkamal', label: 'Nilkamal Furniture' }
  ];

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    setActivePage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBannerClick = (banner: any) => {
    setSelectedCategory(banner.category);
    setActivePage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="ppb-home-page" className="bg-gray-50/50 dark:bg-zinc-950 pb-16 transition-colors">
      
      {/* 1. HERO SLIDER BANNER CAROUSEL */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="relative h-[250px] sm:h-[400px] rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-zinc-800/80">
          
          {/* Banner items */}
          {banners.map((ban, idx) => (
            <div 
              key={ban.id} 
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 flex items-center ${idx === currentBanner ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              {/* Image banner */}
              <img src={ban.image} alt={ban.title} className="absolute inset-0 w-full h-full object-cover" />
              {/* Glass overlay text */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent flex items-center p-8 sm:p-16">
                <div className="max-w-md text-white space-y-3 sm:space-y-4 animate-in fade-in slide-in-from-left-6 duration-500">
                  <span className="inline-flex items-center gap-1.5 bg-[#FF6B00] text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                    <Gift size={11} /> Monsoon Fiesta
                  </span>
                  <h1 className="text-xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                    {ban.title}
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-300 font-medium">
                    {ban.subtitle}
                  </p>
                  <button 
                    onClick={() => handleBannerClick(ban)}
                    className="py-2.5 px-6 bg-[#FF6B00] hover:bg-orange-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
                  >
                    {ban.linkText} &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentBanner(idx)}
                className={`h-2 rounded-full transition-all ${idx === currentBanner ? 'w-6 bg-[#FF6B00]' : 'w-2 bg-white/55'}`}
              ></button>
            ))}
          </div>

          {/* Nav arrows */}
          <button 
            onClick={() => setCurrentBanner(prev => (prev - 1 + banners.length) % banners.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => setCurrentBanner(prev => (prev + 1) % banners.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* 2. WHY CHOOSE PPBASKET (BENTO ADVANTAGES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80 p-5 rounded-2xl flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3 bg-orange-100 dark:bg-orange-950/20 rounded-xl text-[#FF6B00]">
              <Award size={20} />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-gray-900 dark:text-white">Unbeatable Prices</h4>
              <p className="text-[11px] text-gray-400 mt-1">Sourced direct from warehouses to save you up to 60%.</p>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80 p-5 rounded-2xl flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-950/20 rounded-xl text-emerald-600">
              <Truck size={20} />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-gray-900 dark:text-white">Lightning Delivery</h4>
              <p className="text-[11px] text-gray-400 mt-1">Get your goods delivered next-day in major cities.</p>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80 p-5 rounded-2xl flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3 bg-blue-100 dark:bg-blue-950/20 rounded-xl text-blue-600">
              <RotateCcw size={20} />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-gray-900 dark:text-white">Hassle-Free Returns</h4>
              <p className="text-[11px] text-gray-400 mt-1">Simple 7-day money-back guarantee with zero questions.</p>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80 p-5 rounded-2xl flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3 bg-purple-100 dark:bg-purple-950/20 rounded-xl text-purple-600">
              <PhoneCall size={20} />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-gray-900 dark:text-white">WhatsApp Ordering</h4>
              <p className="text-[11px] text-gray-400 mt-1">Click to order instantly on WhatsApp. Clean support!</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="flex justify-between items-baseline mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight">Featured Categories</h2>
            <p className="text-xs text-gray-400 mt-0.5">Explore our wide catalog of affordable products</p>
          </div>
          <button 
            onClick={() => handleCategoryClick('All')}
            className="text-xs font-bold text-[#FF6B00] hover:underline"
          >
            See All Categories &rarr;
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredCategoryList.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => handleCategoryClick(cat.name)}
              className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80 rounded-2xl p-5 flex flex-col items-center text-center shadow-sm hover:shadow-lg hover:border-orange-500/20 transition-all cursor-pointer group"
            >
              <div className={`p-4 rounded-2xl mb-3.5 transition-transform group-hover:scale-110 ${cat.color}`}>
                {cat.icon}
              </div>
              <h3 className="text-xs font-extrabold text-gray-800 dark:text-gray-200 group-hover:text-[#FF6B00] transition-colors">
                {cat.name}
              </h3>
              <span className="text-[10px] text-gray-400 mt-1 font-semibold">{cat.count}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TODAY'S FLASH SALE WITH LIVE COUNTDOWN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 rounded-3xl p-6 sm:p-10 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1 bg-white/20 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                <Flame size={12} className="animate-bounce" /> Hot Deal
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Today\'s Super Flash Sale</h2>
              <p className="text-xs text-orange-100">Hurry up! Quantities are extremely limited. Price increases when timer hits zero.</p>
            </div>

            {/* Countdown layout */}
            <div className="flex items-center gap-3 bg-black/20 backdrop-blur-md px-5 py-2.5 rounded-2xl w-fit border border-white/10">
              <Clock size={16} className="text-orange-100 shrink-0" />
              <span className="text-[10px] font-bold text-orange-100 uppercase tracking-widest mr-1">Ending in:</span>
              <div className="flex gap-1.5 font-bold text-sm sm:text-base">
                <span className="bg-white text-gray-900 px-2 py-0.5 rounded-lg">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span>:</span>
                <span className="bg-white text-gray-900 px-2 py-0.5 rounded-lg">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span>:</span>
                <span className="bg-white text-gray-900 px-2 py-0.5 rounded-lg">{String(timeLeft.seconds).padStart(2, '0')}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-900">
            {dealProducts.length === 0 ? (
              <div className="col-span-full py-8 text-center text-orange-100 font-semibold text-xs">Stay tuned! Flash deals arriving shortly.</div>
            ) : (
              dealProducts.map(prod => (
                <div key={prod.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all">
                  <ProductCard product={prod} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 5. BEST SELLERS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="flex justify-between items-baseline mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
              <Award className="text-[#FF6B00]" size={22} /> Best Selling Products
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">Top-rated and highly purchased by PPBASKET shoppers</p>
          </div>
          <button 
            onClick={() => handleCategoryClick('All')}
            className="text-xs font-bold text-[#FF6B00] hover:underline"
          >
            Shop All &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 6. NEW ARRIVALS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="flex justify-between items-baseline mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
              <Sparkles className="text-[#FF6B00]" size={22} /> New Arrivals
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">Get your hands on the latest catalog launches first</p>
          </div>
          <button 
            onClick={() => handleCategoryClick('All')}
            className="text-xs font-bold text-[#FF6B00] hover:underline"
          >
            Explore Latest &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 7. TOP INDIAN BRANDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 p-6 sm:p-8 rounded-3xl shadow-sm text-center">
          <h2 className="text-base font-extrabold text-gray-400 uppercase tracking-widest mb-6">Partnering with India\'s Top Trusted Brands</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-center">
            {brandLogs.map((brand, idx) => (
              <div 
                key={idx} 
                className="py-3 px-4 border border-gray-100 dark:border-zinc-800 rounded-2xl hover:border-orange-500/20 hover:bg-orange-50/20 dark:hover:bg-zinc-800/20 transition-all text-center cursor-pointer font-extrabold text-sm text-gray-700 dark:text-gray-300 tracking-tight"
                onClick={() => {
                  setActivePage('products');
                  setSelectedCategory('All');
                }}
              >
                {brand.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight">Loved by 10,000+ Customers</h2>
          <p className="text-xs text-gray-400 max-w-md mx-auto">See what our customers have to say about the affordable pricing and quick delivery service of PPBASKET.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80 p-6 rounded-2xl space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-1.5 text-amber-500">
              <Star size={14} className="fill-amber-500" />
              <Star size={14} className="fill-amber-500" />
              <Star size={14} className="fill-amber-500" />
              <Star size={14} className="fill-amber-500" />
              <Star size={14} className="fill-amber-500" />
            </div>
            <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
              "Under 1500, the Noise Buds are phenomenal. I received next day in Pune. The packing was robust. Unbeatable price on PPBASKET!"
            </p>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-orange-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs text-[#FF6B00]">AS</div>
              <div>
                <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200">Amit Sharma</h4>
                <p className="text-[10px] text-gray-400 font-semibold">Verified Buyer • Pune</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80 p-6 rounded-2xl space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-1.5 text-amber-500">
              <Star size={14} className="fill-amber-500" />
              <Star size={14} className="fill-amber-500" />
              <Star size={14} className="fill-amber-500" />
              <Star size={14} className="fill-amber-500" />
              <Star size={14} className="fill-amber-500" />
            </div>
            <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
              "Ordered raw almonds and electric kettle together. The savings were near to ₹700 compared to other stores. Prompt delivery. High quality."
            </p>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-orange-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs text-[#FF6B00]">PP</div>
              <div>
                <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200">Priya Patel</h4>
                <p className="text-[10px] text-gray-400 font-semibold">Verified Buyer • Mumbai</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80 p-6 rounded-2xl space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-1.5 text-amber-500">
              <Star size={14} className="fill-amber-500" />
              <Star size={14} className="fill-amber-500" />
              <Star size={14} className="fill-amber-500" />
              <Star size={14} className="fill-amber-500" />
              <Star size={14} className="fill-amber-500" />
            </div>
            <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
              "Great support on WhatsApp! I was confused about the payment but they responded within 5 minutes and shared direct ordering options."
            </p>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-orange-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs text-[#FF6B00]">RK</div>
              <div>
                <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200">Rohan Kulkarni</h4>
                <p className="text-[10px] text-gray-400 font-semibold">Verified Buyer • Bengaluru</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
