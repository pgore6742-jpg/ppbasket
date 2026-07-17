import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Star, Heart, ArrowLeftRight, ShoppingCart, ShieldCheck, Truck, Sparkles, Plus, MessageCircle } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
    products,
    setActivePage
  } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string>('');

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isLiked = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  // Set default selected image if empty
  if (!selectedImage && product.images && product.images.length > 0) {
    setSelectedImage(product.images[0]);
  } else if (!selectedImage) {
    setSelectedImage(product.image);
  }

  // Get Frequently bought together product (e.g. pick a complementary product of a different category)
  const complementaryProduct = products.find(p => p.id !== product.id) || product;

  const handleAddBundle = () => {
    addToCart(product, 1);
    if (complementaryProduct.id !== product.id) {
      addToCart(complementaryProduct, 1);
    }
    setQuickViewProduct(null);
    setActivePage('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setQuickViewProduct(null);
    setActivePage('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const bundleDiscountTotal = product.price + complementaryProduct.price;
  const bundleSaving = Math.round((product.originalPrice + complementaryProduct.originalPrice) - bundleDiscountTotal);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Black glass overlay background */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={() => { setQuickViewProduct(null); setSelectedImage(''); }}
      ></div>

      {/* Modal Card container */}
      <div className="relative bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800/80 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto z-10 flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button 
          onClick={() => { setQuickViewProduct(null); setSelectedImage(''); }}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-100 dark:bg-zinc-900 hover:bg-red-500 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        {/* Left Side: Images */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
          <div className="aspect-square w-full rounded-2xl bg-gray-50 dark:bg-zinc-900/40 overflow-hidden mb-4 border border-gray-100 dark:border-zinc-900">
            <img 
              src={selectedImage || product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Mini Carousels */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 justify-center overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === img ? 'border-[#FF6B00]' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Product configuration */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-100 dark:border-zinc-900">
          <div>
            {/* Category / Brand row */}
            <div className="text-[10px] font-extrabold text-[#FF6B00] uppercase tracking-wider mb-2">
              {product.category} • {product.brand}
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-snug mb-3">
              {product.name}
            </h2>

            {/* Ratings */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-md">
                {product.rating} <Star size={12} className="fill-white ml-0.5" />
              </div>
              <span className="text-xs text-gray-400 font-semibold">{product.reviewsCount} verified customer reviews</span>
            </div>

            {/* Price section */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl font-black text-gray-900 dark:text-white">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-sm text-gray-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-bold text-red-500 bg-red-50 dark:bg-red-950/20 px-2 py-0.5 rounded-md">
                    Save {product.discountPercentage}%
                  </span>
                </>
              )}
            </div>

            {/* Brief description */}
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-5">
              {product.description}
            </p>

            {/* Specs preview */}
            <div className="bg-gray-50 dark:bg-zinc-900/30 border border-gray-100/60 dark:border-zinc-900 rounded-2xl p-4 mb-5">
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2.5">Product Specifications</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                {Object.entries(product.specs).slice(0, 4).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b border-gray-100/40 dark:border-zinc-800/40 pb-1">
                    <span className="text-gray-400 font-medium">{key}:</span>
                    <span className="text-gray-700 dark:text-gray-300 font-bold truncate max-w-[120px]">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity Controls & Action Buttons */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-gray-50 dark:bg-zinc-900">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2 font-bold hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-gray-500"
                >
                  -
                </button>
                <span className="px-4 text-xs font-black text-gray-900 dark:text-white">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-2 font-bold hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-gray-500"
                >
                  +
                </button>
              </div>

              <div className="flex-1 grid grid-cols-2 gap-2">
                <button 
                  onClick={() => { addToCart(product, quantity); setQuickViewProduct(null); }}
                  className="w-full py-2.5 bg-gray-100 dark:bg-zinc-800 hover:bg-orange-500 hover:text-white text-gray-700 dark:text-gray-300 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShoppingCart size={14} /> Add to Cart
                </button>
                <a 
                  href={`https://wa.me/917498191357?text=${encodeURIComponent(`Hello PPBASKET! I am interested in ordering the following product via Quick View:\n\n*Product Name:* ${product.name}\n*Product ID:* ${product.id}\n*Price:* ₹${product.price.toLocaleString('en-IN')}\n*Quantity:* ${quantity}\n\nPlease confirm my order.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setQuickViewProduct(null)}
                  className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/10 transition-all flex items-center justify-center gap-1.5 text-center cursor-pointer"
                >
                  <MessageCircle size={14} /> WhatsApp
                </a>
              </div>
            </div>

            {/* Wishlist & Compare Toolbar Row */}
            <div className="flex items-center gap-4 py-3 border-t border-b border-gray-100 dark:border-zinc-900 mb-6 text-xs font-bold text-gray-500">
              <button 
                onClick={() => toggleWishlist(product)} 
                className={`flex items-center gap-1.5 hover:text-red-500 transition-colors ${isLiked ? 'text-red-500' : ''}`}
              >
                <Heart size={14} className={isLiked ? "fill-red-500 text-red-500" : ""} /> 
                {isLiked ? 'Saved to Wishlist' : 'Add to Wishlist'}
              </button>
              <span className="text-gray-300">|</span>
              <button 
                onClick={() => toggleCompare(product)} 
                className={`flex items-center gap-1.5 hover:text-[#FF6B00] transition-colors ${isCompared ? 'text-[#FF6B00]' : ''}`}
              >
                <ArrowLeftRight size={14} /> 
                {isCompared ? 'In Compare List' : 'Compare Product'}
              </button>
            </div>
          </div>

          {/* Frequently Bought Together Bundle block */}
          {complementaryProduct.id !== product.id && (
            <div className="border border-orange-500/20 bg-orange-50/20 dark:bg-zinc-900/40 rounded-2xl p-4">
              <h4 className="text-[11px] font-black text-[#FF6B00] uppercase tracking-wider flex items-center gap-1 mb-3">
                <Sparkles size={12} /> Frequently Bought Together (Save Big!)
              </h4>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-1.5">
                  <img src={product.image} alt="" className="w-10 h-10 object-cover rounded-lg bg-gray-50 shrink-0 border border-gray-200" />
                  <span className="text-lg font-bold text-gray-400">+</span>
                  <img src={complementaryProduct.image} alt="" className="w-10 h-10 object-cover rounded-lg bg-gray-50 shrink-0 border border-gray-200" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-gray-700 dark:text-gray-300 line-clamp-1">{complementaryProduct.name}</p>
                  <p className="text-[11px] text-[#FF6B00] font-black">Bundle Price: ₹{bundleDiscountTotal.toLocaleString('en-IN')}</p>
                </div>
              </div>
              <button 
                onClick={handleAddBundle}
                className="w-full py-2 bg-[#FF6B00] hover:bg-orange-600 text-white font-extrabold text-[11px] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-orange-500/5"
              >
                <Plus size={12} /> Add Both to Cart
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
