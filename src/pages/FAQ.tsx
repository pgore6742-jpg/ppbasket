import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);

  const faqsList = [
    {
      q: 'Is PPBASKET a multi-vendor marketplace?',
      a: 'No, PPBASKET is a specialized premium single-vendor direct-to-consumer (D2C) store. Unlike open multi-vendor marketplaces, all products on our portal are owned, stocked, quality-checked, and shipped directly by us from our central Pune warehouse. This guarantees 100% genuine products, standardized packaging, consistent pricing, and swift direct support with no third-party seller hassle!'
    },
    {
      q: 'How long does delivery take at PPBASKET?',
      a: 'Deliveries to major metro cities (like Pune, Mumbai, Bangalore, Delhi) are dispatched immediately and usually arrive in 1 to 2 business days. For rural pin codes or distant states, it typically takes 3 to 5 business days. You can check estimated delivery speed on any product details screen using our pincode checker!'
    },
    {
      q: 'Do you charge extra shipping or delivery fees?',
      a: 'Absolutely not! At PPBASKET, standard home delivery is 100% free across India on all orders, with no minimum purchase requirement. What you see is what you pay.'
    },
    {
      q: 'How do I track my active orders?',
      a: 'Go to your "User Account" dashboard from the navigation bar. Under the "My Orders" tab, you will see your registered order list, each featuring a visual pipeline tracker (Placed, Processing, Shipped, Delivered) and a custom tracking code!'
    },
    {
      q: 'What is your refund and return policy?',
      a: 'We offer a hassle-free 7-day replacement or refund policy on most products if they arrive damaged, incomplete, or significantly different from description. Just message us on live support or email support@ppbasket.com with your order details.'
    },
    {
      q: 'Can I pay using Cash on Delivery (COD)?',
      a: 'Yes, Cash on Delivery is fully supported! You can select COD on the final secure payment step of checkout and pay in cash or digital UPI at your doorstep upon receiving the parcel.'
    },
    {
      q: 'How do I apply active discount vouchers?',
      a: 'On the first step of checkout inside your shopping cart, there is an input field for Coupon Codes. Enter any active voucher code (such as PPBASKET10) and click Apply to instantly recalculate your cart subtotal!'
    }
  ];

  const handleToggle = (idx: number) => {
    setExpandedIdx(expandedIdx === idx ? null : idx);
  };

  return (
    <div id="ppb-faq-page" className="bg-gray-50/50 dark:bg-zinc-950 pb-20 transition-colors duration-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-12">
        
        {/* Header Title block */}
        <div className="text-center space-y-2 mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1 bg-orange-100 dark:bg-orange-950/40 text-[#FF6B00] text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-wider">
            <HelpCircle size={12} /> Support Accordion
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">Frequently Asked Questions</h1>
          <p className="text-xs text-gray-400">Can't find the answers you need? Browse our quick accordion support guide.</p>
        </div>

        {/* Accordions Matrix */}
        <div className="space-y-4">
          {faqsList.map((faq, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-850 rounded-2xl shadow-sm overflow-hidden"
            >
              {/* Expand Header trigger button */}
              <button
                onClick={() => handleToggle(idx)}
                className="w-full text-left p-5 flex justify-between items-center gap-4 cursor-pointer focus:outline-none hover:bg-gray-50 dark:hover:bg-zinc-950 transition-colors"
              >
                <span className="font-extrabold text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-tight">
                  {faq.q}
                </span>
                <span className="text-gray-400 shrink-0">
                  {expandedIdx === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
              </button>

              {/* Expansions description */}
              {expandedIdx === idx && (
                <div className="px-5 pb-5 pt-1 text-xs leading-relaxed text-gray-500 dark:text-gray-400 font-semibold border-t border-gray-50 dark:border-zinc-800/60 animate-in slide-in-from-top-1 duration-150">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
