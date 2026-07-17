import React from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import { Mail, Phone, MapPin, ShieldCheck, Sparkles, Send, Facebook, Twitter, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage, language, setLanguage } = useApp();

  return (
    <footer id="ppb-footer" className="bg-zinc-950 text-gray-400 font-sans border-t border-zinc-900 transition-colors duration-200">
      
      {/* Upper Newsletter row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-zinc-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2 mb-2">
              <Sparkles className="text-[#FF6B00]" size={18} />
              Subscribe to PPBASKET Newsletter
            </h3>
            <p className="text-sm text-zinc-400">Get weekly updates on hot deals, fresh arrivals, and exclusive coupon discount codes!</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md md:ml-auto w-full">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="bg-zinc-900 text-white border border-zinc-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500 flex-1 placeholder-zinc-500"
            />
            <button 
              onClick={() => alert('Thank you for subscribing! Check your email for a 10% welcome coupon.')}
              className="bg-[#FF6B00] hover:bg-orange-600 text-white text-sm font-bold rounded-xl px-5 py-2.5 flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/10 transition-all cursor-pointer whitespace-nowrap"
            >
              Subscribe <Send size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Sitemap Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: About the Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 select-none">
              <div className="bg-zinc-900 p-1.5 rounded-xl flex items-center justify-center border border-zinc-800">
                <Logo size={24} />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                BASKET<span className="text-[#FF6B00]">.</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-400">
              PPBASKET is India\'s fastest growing online department store. We deliver premium, highly curated products across Fashion, Electronics, Grocery, Home Decor, and Beauty at the most pocket-friendly and affordable rates.
            </p>
            <div className="flex gap-2.5 pt-2">
              <button className="h-8 w-8 rounded-lg bg-zinc-900 hover:bg-orange-600 text-zinc-400 hover:text-white flex items-center justify-center transition-colors">
                <Facebook size={16} />
              </button>
              <button className="h-8 w-8 rounded-lg bg-zinc-900 hover:bg-orange-600 text-zinc-400 hover:text-white flex items-center justify-center transition-colors">
                <Twitter size={16} />
              </button>
              <button className="h-8 w-8 rounded-lg bg-zinc-900 hover:bg-orange-600 text-zinc-400 hover:text-white flex items-center justify-center transition-colors">
                <Instagram size={16} />
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-4">Quick Sitemap</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <button onClick={() => { setActivePage('home'); window.scrollTo(0,0); }} className="hover:text-white transition-colors">Home Page</button>
              </li>
              <li>
                <button onClick={() => { setActivePage('products'); window.scrollTo(0,0); }} className="hover:text-white transition-colors">Shop Products</button>
              </li>
              <li>
                <button onClick={() => { setActivePage('deals'); window.scrollTo(0,0); }} className="hover:text-white transition-colors">Discount Coupons & Deals</button>
              </li>
              <li>
                <button onClick={() => { setActivePage('about'); window.scrollTo(0,0); }} className="hover:text-white transition-colors">About PPBASKET</button>
              </li>
              <li>
                <button onClick={() => { setActivePage('contact'); window.scrollTo(0,0); }} className="hover:text-white transition-colors">Contact Support</button>
              </li>
              <li>
                <button onClick={() => { setActivePage('faq'); window.scrollTo(0,0); }} className="hover:text-white transition-colors">Help & FAQ Center</button>
              </li>
            </ul>
          </div>

          {/* Column 3: Corporate Policy Guidelines */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-4">Store Policies</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <button onClick={() => { setActivePage('privacy'); window.scrollTo(0,0); }} className="hover:text-white transition-colors">Privacy Policy</button>
              </li>
              <li>
                <button onClick={() => { setActivePage('terms'); window.scrollTo(0,0); }} className="hover:text-white transition-colors">Terms & Conditions</button>
              </li>
              <li>
                <button onClick={() => { setActivePage('refund-policy'); window.scrollTo(0,0); }} className="hover:text-white transition-colors">Refund & Return Policy</button>
              </li>
              <li>
                <button onClick={() => { setActivePage('shipping-policy'); window.scrollTo(0,0); }} className="hover:text-white transition-colors">Shipping & Delivery Policy</button>
              </li>
            </ul>
          </div>

          {/* Column 4: Reach Out Support Info */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-widest uppercase">Support Center</h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="text-[#FF6B00] shrink-0 mt-0.5" size={15} />
                <span className="text-zinc-400">Baner Road, Shiv Shrishti Apartment, Pune, Maharashtra - 411045, India.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="text-[#FF6B00] shrink-0" size={15} />
                <a href="tel:+919876543210" className="hover:text-white transition-colors text-zinc-400">+91 98765 43210</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="text-[#FF6B00] shrink-0" size={15} />
                <a href="mailto:support@ppbasket.com" className="hover:text-white transition-colors text-zinc-400">support@ppbasket.com</a>
              </div>
              <div className="pt-2 border-t border-zinc-900 flex items-center gap-1.5 text-[10px] text-zinc-500 font-medium">
                <ShieldCheck size={14} className="text-emerald-500" /> Secure SSL 256-Bit Transactions
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Bottom Metadata & Branding Credits */}
      <div className="bg-zinc-950 border-t border-zinc-900/60 py-6 text-center text-xs text-zinc-500 font-semibold px-4 sm:px-6">
        <p>Copyright © 2026 <span className="text-zinc-400 font-bold hover:text-[#FF6B00] transition-colors cursor-pointer" onClick={() => setActivePage('home')}>PPBASKET</span>. All Rights Reserved.</p>
        <p className="text-[10px] text-zinc-600 mt-1">Designed with high-performance responsive frameworks & direct local checkout options.</p>
      </div>

    </footer>
  );
};
