import React from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div id="ppb-privacy-page" className="bg-gray-50/50 dark:bg-zinc-950 pb-20 transition-colors duration-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-12 space-y-6 sm:space-y-8">
        
        {/* Title */}
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1 bg-orange-100 dark:bg-orange-950/40 text-[#FF6B00] text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-wider">
            <ShieldCheck size={11} /> Compliance Policy
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">Privacy Policy</h1>
          <p className="text-xs text-gray-400 font-bold">Last Updated: July 17, 2026</p>
        </div>

        {/* Content Document */}
        <article className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 p-6 sm:p-10 rounded-3xl shadow-sm space-y-6 text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-semibold">
          
          <p>
            Welcome to PPBASKET ("we", "our", "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal info, please contact us at support@ppbasket.com.
          </p>

          <section className="space-y-2 text-xs">
            <h3 className="font-extrabold text-gray-850 dark:text-gray-200 uppercase tracking-wider">1. What Information Do We Collect?</h3>
            <p>
              We collect personal data that you voluntarily provide to us when you register on PPBASKET, place an order, apply promo codes, check out shipping addresses, or express interest in obtaining info about our products and services. This includes names, billing/delivery addresses, email addresses, and phone contacts.
            </p>
          </section>

          <section className="space-y-2 text-xs">
            <h3 className="font-extrabold text-gray-850 dark:text-gray-200 uppercase tracking-wider">2. How Do We Use Your Info?</h3>
            <p>
              We process your details for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent. This includes managing orders, delivering parcels, notifying status updates, and broadcasting flash sales.
            </p>
          </section>

          <section className="space-y-2 text-xs">
            <h3 className="font-extrabold text-gray-850 dark:text-gray-200 uppercase tracking-wider">3. Security of Transaction Information</h3>
            <p>
              All payments are processed through encrypted 256-Bit SSL gateways. We do not store credit card details or bank account passwords on our local servers. Transactions are fully secured through certified Indian UPI and banking aggregators.
            </p>
          </section>

        </article>

      </div>
    </div>
  );
};
