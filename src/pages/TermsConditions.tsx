import React from 'react';
import { FileText, Sparkles } from 'lucide-react';

export const TermsConditions: React.FC = () => {
  return (
    <div id="ppb-terms-page" className="bg-gray-50/50 dark:bg-zinc-950 pb-20 transition-colors duration-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-12 space-y-6 sm:space-y-8">
        
        {/* Title */}
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1 bg-orange-100 dark:bg-orange-950/40 text-[#FF6B00] text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-wider">
            <FileText size={11} /> Legal Documents
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">Terms & Conditions</h1>
          <p className="text-xs text-gray-400 font-bold">Last Updated: July 17, 2026</p>
        </div>

        {/* Content Document */}
        <article className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 p-6 sm:p-10 rounded-3xl shadow-sm space-y-6 text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-semibold">
          
          <p>
            Welcome to PPBASKET. By accessing or purchasing from our digital shopping storefront, you agree to be bound by these Terms and Conditions. Please review them carefully before making a transaction.
          </p>

          <section className="space-y-2 text-xs">
            <h3 className="font-extrabold text-gray-850 dark:text-gray-200 uppercase tracking-wider">1. Customer Accounts Eligibility</h3>
            <p>
              By registering or purchasing, you warrant that you are at least 18 years of age or accessing the store under the active supervision of a legal parent or guardian. You must provide complete, accurate, and up-to-date shipping info to guarantee timely dispatches.
            </p>
          </section>

          <section className="space-y-2 text-xs">
            <h3 className="font-extrabold text-gray-850 dark:text-gray-200 uppercase tracking-wider">2. Pricing & Currency</h3>
            <p>
              All prices listed on PPBASKET are in Indian Rupees (INR, ₹). Prices include applicable local taxes. We make every effort to display accurate pricing, however, in the rare event of typographical listings errors, we reserve the right to decline or cancel incorrect pending orders.
            </p>
          </section>

          <section className="space-y-2 text-xs">
            <h3 className="font-extrabold text-gray-850 dark:text-gray-200 uppercase tracking-wider">3. Limitations of Liabilities</h3>
            <p>
              PPBASKET and its staff shall not be liable for any indirect, incidental, or consequential shipping delays resulting from local carrier holdups, monsoon hazards, natural disruptions, or incorrect pincode submissions.
            </p>
          </section>

        </article>

      </div>
    </div>
  );
};
