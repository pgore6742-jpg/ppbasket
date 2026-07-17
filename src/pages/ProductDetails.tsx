import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { Star, Heart, ArrowLeftRight, ShoppingCart, Truck, ShieldCheck, Sparkles, MessageCircle, AlertCircle, Plus, Minus } from 'lucide-react';

export const ProductDetails: React.FC = () => {
  const {
    selectedProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
    products,
    reviews,
    setReviews,
    currentUser,
    setActivePage
  } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [pincode, setPincode] = useState('');
  const [pincodeMessage, setPincodeMessage] = useState<{ success: boolean; text: string } | null>(null);

  // New Review Form State
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState('');

  if (!selectedProduct) {
    return (
      <div className="max-w-md mx-auto text-center py-20">
        <p className="text-gray-400 text-xs">No product selected</p>
        <button onClick={() => setActivePage('products')} className="mt-4 px-4 py-2 bg-[#FF6B00] text-white text-xs font-bold rounded-xl">
          Browse Catalog
        </button>
      </div>
    );
  }

  const product = selectedProduct;
  const isLiked = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  if (!selectedImage && product.images && product.images.length > 0) {
    setSelectedImage(product.images[0]);
  } else if (!selectedImage) {
    setSelectedImage(product.image);
  }

  // Pin code delivery checker simulation
  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pincode.trim();
    if (!/^\d{6}$/.test(cleanPin)) {
      setPincodeMessage({ success: false, text: 'Please enter a valid 6-digit pin code.' });
      return;
    }
    // Simulate special cities
    if (cleanPin.startsWith('411') || cleanPin.startsWith('400')) {
      setPincodeMessage({ success: true, text: 'Fast Delivery available! Delivery by Tomorrow.' });
    } else if (cleanPin.startsWith('110') || cleanPin.startsWith('560')) {
      setPincodeMessage({ success: true, text: 'Delivery available in 2 days. Free Shipping.' });
    } else {
      setPincodeMessage({ success: true, text: `Standard Delivery available in 3-5 days to pin ${cleanPin}.` });
    }
  };

  // Submit Review
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      userName: currentUser?.name || 'Anonymous Buyer',
      rating: reviewRating,
      comment: reviewComment,
      date: new Date().toISOString().split('T')[0],
      approved: true
    };

    setReviews(prev => [newRev, ...prev]);
    setReviewComment('');
    setReviewSuccessMsg('Review posted successfully! Thank you for sharing your feedback.');
    setTimeout(() => setReviewSuccessMsg(''), 4000);
  };

  // Get reviews matching this specific product
  const productReviews = reviews.filter(r => r.productId === product.id && r.approved);

  // Get Related Products of same category
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Build WhatsApp pre-filled message URL
  const whatsappNumber = '917498191357';
  const waText = encodeURIComponent(
    `Hello PPBASKET! I would like to order the following product:\n\n*Product Name:* ${product.name}\n*Product ID:* ${product.id}\n*Category:* ${product.category}\n*Special Price:* ₹${product.price.toLocaleString('en-IN')}\n*Quantity:* ${quantity}\n\nPlease confirm my order and share payment options.`
  );
  const waUrl = `https://wa.me/${whatsappNumber}?text=${waText}`;

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setActivePage('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id={`product-details-${product.id}`} className="bg-gray-50/50 dark:bg-zinc-950 pb-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        
        {/* Back navigation */}
        <button 
          onClick={() => setActivePage('products')}
          className="mb-6 flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-[#FF6B00] transition-colors"
        >
          &larr; Back to Catalog
        </button>

        {/* Product Details Section */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 rounded-3xl p-6 sm:p-10 shadow-sm flex flex-col lg:flex-row gap-10 lg:gap-16">
          
          {/* Left Block: Image Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="aspect-square w-full rounded-2xl bg-gray-50 dark:bg-zinc-950/40 border border-gray-100 dark:border-zinc-800 overflow-hidden mb-4">
              <img 
                src={selectedImage || product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>

            {product.images && product.images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${selectedImage === img ? 'border-[#FF6B00] scale-95 shadow-md' : 'border-transparent opacity-75 hover:opacity-100'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Block: Content Configuration */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between">
            <div>
              {/* Category */}
              <div className="text-[10px] font-black text-[#FF6B00] uppercase tracking-widest mb-2 flex items-center gap-1">
                <Sparkles size={11} /> {product.category}
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight mb-3">
                {product.name}
              </h1>

              {/* Verified Badge and Ratings */}
              <div className="flex items-center gap-2.5 mb-5 pb-5 border-b border-gray-100 dark:border-zinc-800/60">
                <div className="flex items-center bg-amber-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-lg">
                  {product.rating} <Star size={12} className="fill-white ml-0.5" />
                </div>
                <span className="text-xs text-gray-400 font-semibold">{productReviews.length} Verified Customer Reviews</span>
              </div>

              {/* Price Details */}
              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-3xl font-black text-[#FF6B00]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-sm font-semibold text-gray-400 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-black text-red-500 bg-red-50 dark:bg-red-950/20 px-2.5 py-0.5 rounded-lg">
                      Save {product.discountPercentage}%
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Stock status indicator details */}
              <div className="text-xs font-bold mb-6 flex items-center gap-2">
                <span className="text-gray-400">Stock Status:</span>
                <span className={`px-2.5 py-0.5 rounded-md ${product.stockStatus === 'In Stock' ? 'bg-emerald-50 text-emerald-500 dark:bg-emerald-950/10' : product.stockStatus === 'Low Stock' ? 'bg-amber-50 text-amber-500 dark:bg-amber-950/10' : 'bg-red-50 text-red-500 dark:bg-red-950/10'}`}>
                  {product.stockStatus === 'Low Stock' ? `Only ${product.stockCount} Left - Order Fast!` : product.stockStatus}
                </span>
              </div>

              {/* 1. Indian Pin Code Delivery Checker */}
              <div className="bg-gray-50 dark:bg-zinc-950 border border-gray-150 dark:border-zinc-800 p-4 rounded-2xl mb-6">
                <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5 mb-2.5">
                  <Truck size={14} /> Pin Code Delivery Checker
                </h4>
                <form onSubmit={handlePincodeCheck} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit pin (e.g. 411045)"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-xs rounded-xl px-3.5 py-2 focus:outline-none focus:border-[#FF6B00] text-gray-900 dark:text-white font-bold"
                  />
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-zinc-900 dark:bg-zinc-800 text-white font-extrabold text-xs rounded-xl hover:bg-black cursor-pointer"
                  >
                    Check
                  </button>
                </form>
                {pincodeMessage && (
                  <p className={`text-xs font-bold mt-2.5 flex items-center gap-1 ${pincodeMessage.success ? 'text-emerald-500' : 'text-red-500'}`}>
                    <AlertCircle size={13} /> {pincodeMessage.text}
                  </p>
                )}
              </div>

              {/* Quantity selectors */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-bold text-gray-400">Quantity:</span>
                <div className="flex items-center border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-gray-50 dark:bg-zinc-950/40">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 hover:bg-gray-150 dark:hover:bg-zinc-900 font-bold transition-colors text-gray-500 text-sm"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-black text-gray-900 dark:text-white">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 hover:bg-gray-150 dark:hover:bg-zinc-900 font-bold transition-colors text-gray-500 text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

            </div>

            {/* CTA Buy Buttons Grid */}
            <div className="space-y-3 pt-6 border-t border-gray-100 dark:border-zinc-800/60">
              <div className="grid grid-cols-2 gap-3">
                <button 
                  disabled={product.stockStatus === 'Out of Stock'}
                  onClick={() => addToCart(product, quantity)}
                  className="py-3.5 bg-gray-100 dark:bg-zinc-850 hover:bg-orange-500 hover:text-white text-gray-800 dark:text-gray-200 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  <ShoppingCart size={15} /> Add to Cart
                </button>
                <a 
                  href={waUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer ${product.stockStatus === 'Out of Stock' ? 'opacity-50 pointer-events-none' : ''}`}
                >
                  <MessageCircle size={15} /> WhatsApp Order
                </a>
              </div>

              {/* Wishlist and Compare */}
              <div className="flex justify-center gap-6 pt-3.5 text-xs font-bold text-gray-400">
                <button 
                  onClick={() => toggleWishlist(product)}
                  className={`flex items-center gap-1.5 hover:text-red-500 transition-colors ${isLiked ? 'text-red-500' : ''}`}
                >
                  <Heart size={14} className={isLiked ? "fill-red-500 text-red-500" : ""} />
                  {isLiked ? 'Saved to Wishlist' : 'Add to Wishlist'}
                </button>
                <button 
                  onClick={() => toggleCompare(product)}
                  className={`flex items-center gap-1.5 hover:text-[#FF6B00] transition-colors ${isCompared ? 'text-[#FF6B00]' : ''}`}
                >
                  <ArrowLeftRight size={14} />
                  {isCompared ? 'In Compare List' : 'Compare Product'}
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Specifications Matrix Grid */}
        <section className="mt-10 sm:mt-12 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 p-6 sm:p-10 rounded-3xl shadow-sm">
          <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Complete Product Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3.5">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b border-gray-150 dark:border-zinc-800 pb-2 text-xs">
                <span className="text-gray-400 font-bold">{key}</span>
                <span className="text-gray-800 dark:text-gray-200 font-extrabold text-right ml-4">{value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Product reviews stream & dynamic submission form */}
        <section className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Reviews list (Left side - 2 cols) */}
          <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 p-6 sm:p-10 rounded-3xl shadow-sm">
            <h2 className="text-base font-black text-gray-900 dark:text-white mb-6">Verified Customer Reviews</h2>
            
            <div className="space-y-6 divide-y divide-gray-100 dark:divide-zinc-800/80">
              {productReviews.length === 0 ? (
                <div className="py-10 text-center text-xs text-gray-400 font-medium">Be the first to review this product! Share your feedback below.</div>
              ) : (
                productReviews.map((rev, idx) => (
                  <div key={rev.id} className={`pt-5 ${idx === 0 ? 'pt-0' : ''} space-y-2`}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1.5 text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            size={12} 
                            className={i < rev.rating ? "fill-amber-500" : "text-gray-200 dark:text-zinc-800"} 
                          />
                        ))}
                        <span className="text-xs font-black ml-1 text-gray-800 dark:text-gray-200">{rev.rating}</span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-semibold">{rev.date}</span>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400 font-medium">{rev.comment}</p>
                    <div className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                      <div className="h-4 w-4 rounded-full bg-[#FF6B00] text-white flex items-center justify-center font-bold text-[9px]">✓</div> 
                      {rev.userName} • Verified Buyer
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* New Review Form (Right side - 1 col) */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 p-6 sm:p-8 rounded-3xl shadow-sm">
            <h3 className="font-extrabold text-sm text-gray-900 dark:text-white mb-4">Write a Product Review</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              
              {/* Rating selection star block */}
              <div>
                <label className="text-xs font-bold text-gray-400 block mb-2">Your Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star 
                        size={20} 
                        className={star <= reviewRating ? "fill-amber-500 text-amber-500" : "text-gray-300 dark:text-zinc-700"} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment text */}
              <div>
                <label className="text-xs font-bold text-gray-400 block mb-2">Comment</label>
                <textarea
                  required
                  rows={4}
                  placeholder="What did you like or dislike? How is the quality of product?"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 text-xs rounded-2xl p-4 focus:outline-none focus:border-[#FF6B00] text-gray-900 dark:text-white leading-relaxed"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 bg-zinc-900 hover:bg-black dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white text-xs font-extrabold rounded-xl shadow-md transition-colors cursor-pointer"
              >
                Submit Review
              </button>

              {reviewSuccessMsg && (
                <p className="text-xs font-bold text-emerald-500 flex items-center gap-1.5 mt-2 bg-emerald-50 dark:bg-emerald-950/20 p-2.5 rounded-xl">
                  <ShieldCheck size={14} /> {reviewSuccessMsg}
                </p>
              )}
            </form>
          </div>

        </section>

        {/* 2. RELATED PRODUCTS RECOMMENDATIONS */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-lg font-black text-gray-900 dark:text-white tracking-tight mb-6">Related Products You Might Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(prod => (
                <div key={prod.id} onClick={() => { window.scrollTo(0,0); }}>
                  <ProductCard product={prod} />
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
