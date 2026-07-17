import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, ArrowLeftRight, Check, Star, ShoppingCart } from 'lucide-react';

export const CompareDrawer: React.FC = () => {
  const { compareList, toggleCompare, clearCompare, addToCart, setActivePage } = useApp();
  const [showFullGrid, setShowFullGrid] = useState(false);

  if (compareList.length === 0) return null;

  // Get all unique spec keys across compared items
  const allSpecKeys = Array.from(
    new Set(compareList.flatMap(p => Object.keys(p.specs || {})))
  ) as string[];

  const handleBuyNow = (p: any) => {
    addToCart(p, 1);
    setActivePage('cart');
    setShowFullGrid(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-45 bg-white dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-800 shadow-[0_-8px_30px_rgb(0,0,0,0.12)] transition-transform duration-300">
      
      {/* Drawer Header Toolbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="text-[#FF6B00]" size={18} />
          <span className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-100">
            Comparing <span className="text-[#FF6B00]">{compareList.length}</span> / 3 products
          </span>
        </div>

        {/* Small thumbnail previews */}
        <div className="hidden sm:flex items-center gap-3.5 flex-1 max-w-xl mx-4">
          {compareList.map(prod => (
            <div key={prod.id} className="flex items-center gap-2 bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 px-2.5 py-1.5 rounded-xl shrink-0 max-w-[170px]">
              <img src={prod.image} alt="" className="w-8 h-8 rounded-lg object-cover bg-white" />
              <p className="text-[10px] font-bold text-gray-700 dark:text-gray-300 truncate">{prod.name}</p>
              <button 
                onClick={() => toggleCompare(prod)} 
                className="p-0.5 hover:bg-gray-200 dark:hover:bg-zinc-800 text-gray-400 hover:text-red-500 rounded-full"
              >
                <X size={10} />
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button 
            onClick={clearCompare}
            className="px-3 py-1.5 border border-transparent text-gray-400 hover:text-red-500 text-xs font-bold transition-all"
          >
            Clear
          </button>
          <button 
            onClick={() => setShowFullGrid(true)}
            className="px-4 py-1.5 bg-[#FF6B00] hover:bg-orange-600 text-white text-xs font-bold rounded-xl shadow-md shadow-orange-500/10 transition-colors cursor-pointer"
          >
            Compare Specs
          </button>
        </div>
      </div>

      {/* Full side-by-side grid view sheet */}
      {showFullGrid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowFullGrid(false)}></div>
          
          <div className="relative bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-3xl shadow-2xl max-w-5xl w-full max-h-[85vh] overflow-y-auto z-10 p-6 md:p-8 flex flex-col">
            
            {/* Header */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-zinc-900 mb-6">
              <h3 className="text-lg font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                <ArrowLeftRight className="text-[#FF6B00]" size={20} /> Compare Products Side-By-Side
              </h3>
              <button 
                onClick={() => setShowFullGrid(false)}
                className="p-1.5 rounded-full bg-gray-100 dark:bg-zinc-900 hover:bg-red-500 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Spec grid table */}
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-xs text-left text-gray-500 dark:text-gray-400 min-w-[600px] border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-zinc-900">
                    <th className="py-3 px-4 font-bold text-gray-400 uppercase tracking-widest w-1/4">Feature</th>
                    {compareList.map(prod => (
                      <th key={prod.id} className="py-3 px-4 text-center w-1/4">
                        <div className="flex flex-col items-center gap-2">
                          <img src={prod.image} alt="" className="w-16 h-16 rounded-xl object-cover border border-gray-200" />
                          <h4 className="font-bold text-gray-900 dark:text-white line-clamp-1 text-xs max-w-[150px]">{prod.name}</h4>
                          <p className="text-[#FF6B00] font-black">₹{prod.price.toLocaleString('en-IN')}</p>
                          <button 
                            onClick={() => handleBuyNow(prod)}
                            className="py-1 px-3 bg-[#FF6B00] hover:bg-orange-600 text-white font-bold text-[10px] rounded-lg shadow-sm"
                          >
                            Buy Now
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-zinc-900/40">
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-gray-400">Category</td>
                    {compareList.map(prod => (
                      <td key={prod.id} className="py-3.5 px-4 text-center font-bold text-gray-800 dark:text-gray-200">{prod.category}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-gray-400">Brand</td>
                    {compareList.map(prod => (
                      <td key={prod.id} className="py-3.5 px-4 text-center font-bold text-gray-800 dark:text-gray-200">{prod.brand}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-gray-400">Rating</td>
                    {compareList.map(prod => (
                      <td key={prod.id} className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <span className="font-black text-gray-800 dark:text-gray-200">{prod.rating}</span>
                          <Star size={13} className="fill-amber-500 text-amber-500" />
                          <span className="text-gray-400">({prod.reviewsCount})</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-gray-400">Availability</td>
                    {compareList.map(prod => (
                      <td key={prod.id} className="py-3.5 px-4 text-center font-bold">
                        <span className={prod.stockStatus === 'In Stock' ? 'text-emerald-500' : 'text-amber-500'}>
                          {prod.stockStatus}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-gray-400">Est. Delivery</td>
                    {compareList.map(prod => (
                      <td key={prod.id} className="py-3.5 px-4 text-center font-bold text-gray-700 dark:text-gray-300">{prod.deliveryTime}</td>
                    ))}
                  </tr>
                  {/* Dynamic Technical Specs loop */}
                  {allSpecKeys.map(key => (
                    <tr key={key}>
                      <td className="py-3.5 px-4 font-bold text-gray-400">{key}</td>
                      {compareList.map(prod => (
                        <td key={prod.id} className="py-3.5 px-4 text-center text-gray-700 dark:text-gray-300 font-medium">
                          {prod.specs[key] || <span className="text-gray-300 dark:text-zinc-800">-</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
