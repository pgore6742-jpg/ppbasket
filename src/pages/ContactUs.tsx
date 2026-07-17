import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, Sparkles, AlertCircle } from 'lucide-react';

export const ContactUs: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !message) return;
    setIsSuccess(true);
    // Reset fields
    setFullName('');
    setEmail('');
    setMessage('');
    setTimeout(() => {
      setIsSuccess(false);
    }, 6000);
  };

  return (
    <div id="ppb-contact-page" className="bg-gray-50/50 dark:bg-zinc-950 pb-20 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-12">
        
        {/* Header Title block */}
        <div className="text-center max-w-xl mx-auto space-y-2 mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1 bg-orange-100 dark:bg-orange-950/40 text-[#FF6B00] text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-wider">
            <Sparkles size={11} /> 24/7 Support Desk
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">Get in Touch With Us</h1>
          <p className="text-xs text-gray-400">Have questions about order tracking, products, refunds, or bulk corporate purchases? Reach out to our team instantly.</p>
        </div>

        {/* Contact Splits layout */}
        <div className="flex flex-col lg:flex-row gap-10 items-stretch">
          
          {/* Left Block: Store corporate address info */}
          <div className="w-full lg:w-2/5 bg-zinc-900 dark:bg-zinc-900 text-white p-6 sm:p-10 rounded-3xl flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="text-lg font-black tracking-tight text-white">Corporate Headquarters</h3>
              
              <div className="space-y-4 text-xs font-semibold text-gray-300">
                <div className="flex items-start gap-3.5">
                  <MapPin className="text-[#FF6B00] shrink-0 mt-0.5" size={16} />
                  <div>
                    <p className="font-extrabold text-white mb-1">PPBASKET Tech Private Ltd.</p>
                    <p className="leading-relaxed">Tower A, 4th Floor, Baner Biz Bay, Baner-Balewadi Road, Pune, Maharashtra - 411045, India</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <Phone className="text-[#FF6B00] shrink-0" size={16} />
                  <span>+91 20 6742 9876 (Support desk)</span>
                </div>

                <div className="flex items-center gap-3.5">
                  <Mail className="text-[#FF6B00] shrink-0" size={16} />
                  <span>support@ppbasket.com</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800 space-y-1">
              <p className="text-[10px] font-black text-[#FF6B00] uppercase tracking-wider">Helpdesk Timings</p>
              <p className="text-xs text-gray-400 leading-relaxed font-semibold">Our digital customer executive support runs 24 Hours, Monday through Sunday. Expect mail replies in 2-3 hours.</p>
            </div>
          </div>

          {/* Right Block: Message Feedback Form */}
          <div className="flex-1 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 p-6 sm:p-10 rounded-3xl shadow-sm">
            <h3 className="font-extrabold text-sm text-gray-900 dark:text-white mb-6">Send Us a Direct Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-gray-400 block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pankaj Gore"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF6B00] font-bold text-gray-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 block mb-1">Your Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. pgore6742@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF6B00] font-bold text-gray-800 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 block mb-1">Message Topic / Detail</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us what you need help with. Mention your Order ID or tracking number if applicable."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl p-4 focus:outline-none focus:border-[#FF6B00] font-medium leading-relaxed text-gray-800 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-[#FF6B00] hover:bg-orange-600 text-white font-extrabold rounded-xl transition-all shadow-md shadow-orange-500/10 cursor-pointer"
              >
                Send Message Securely
              </button>

              {isSuccess && (
                <div className="bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 p-4 rounded-xl border border-emerald-150 flex items-start gap-2.5 mt-4">
                  <CheckCircle size={16} className="shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-extrabold text-xs">Message Sent Successfully!</h4>
                    <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">Thank you for writing. Our dedicated support executive will contact you via email within the next 12-24 hours.</p>
                  </div>
                </div>
              )}
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
