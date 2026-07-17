import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { Star, Heart, Eye, ArrowLeftRight, ShoppingCart, ShieldAlert, MessageCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    viewProductDetail,
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
    setQuickViewProduct,
    setActivePage
  } = useApp();

  const isLiked = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setActivePage('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      id={`prod-card-${product.id}`}
      onClick={() => viewProductDetail(product)}
      className="group relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-zinc-800/80 hover:border-orange-500/30 dark:hover:border-orange-500/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer"
    >
      {/* Badges and Wishlist Controls overlay */}
      <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1.5">
        {product.discountPercentage > 0 && (
          <span className="bg-red-500 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm">
            -{product.discountPercentage}% OFF
          </span>
        )}
        {product.isBestSeller && (
          <span className="bg-[#FF6B00] text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm uppercase tracking-wider">
            Best Seller
          </span>
        )}
        {product.isNewArrival && (
          <span className="bg-blue-600 text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm uppercase tracking-wider">
            New Arrival
          </span>
        )}
      </div>

      <div className="absolute top-3.5 right-3.5 z-10 flex flex-col gap-1.5 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-250">
        <button 
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
          className={`h-8 w-8 rounded-full flex items-center justify-center transition-all shadow-md bg-white/95 dark:bg-zinc-950/95 hover:bg-red-50 dark:hover:bg-red-950/20 text-gray-400 hover:text-red-500 ${isLiked ? 'text-red-500 bg-white' : ''}`}
          title="Save to Wishlist"
        >
          <Heart size={15} className={isLiked ? "fill-red-500 text-red-500" : ""} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); toggleCompare(product); }}
          className={`h-8 w-8 rounded-full flex items-center justify-center transition-all shadow-md bg-white/95 dark:bg-zinc-950/95 hover:bg-orange-50 dark:hover:bg-orange-950/20 text-gray-400 hover:text-[#FF6B00] ${isCompared ? 'text-[#FF6B00] bg-orange-50 dark:bg-orange-950/10' : ''}`}
          title="Compare Product"
        >
          <ArrowLeftRight size={14} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); setQuickViewProduct(product); }}
          className="h-8 w-8 rounded-full bg-white/95 dark:bg-zinc-950/95 hover:bg-orange-50 dark:hover:bg-orange-950/20 text-gray-400 hover:text-[#FF6B00] flex items-center justify-center shadow-md transition-all"
          title="Quick View"
        >
          <Eye size={14} />
        </button>
      </div>

      {/* Main product Image */}
      <div className="relative aspect-square w-full bg-gray-50 dark:bg-zinc-900/60 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.stockStatus === 'Out of Stock' && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <ShieldAlert size={14} /> Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Product Information Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category/Brand label */}
          <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
            <span>{product.category}</span>
            <span>{product.brand}</span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-100 line-clamp-2 hover:text-[#FF6B00] transition-colors mb-1.5 h-10">
            {product.name}
          </h3>

          {/* Rating reviews block */}
          <div className="flex items-center gap-1.5 mb-2.5">
            <div className="flex items-center text-amber-500">
              <Star size={13} className="fill-amber-500" />
              <span className="text-xs font-bold ml-1 text-gray-800 dark:text-gray-200">{product.rating}</span>
            </div>
            <span className="text-[10px] text-gray-400 font-semibold">({product.reviewsCount} reviews)</span>
          </div>
        </div>

        {/* Pricing, delivery time and CTAs */}
        <div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-base font-extrabold text-[#FF6B00]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs font-medium text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Stock & Delivery details */}
          <div className="flex items-center justify-between text-[10px] font-bold pb-3.5 border-b border-gray-50 dark:border-zinc-800/60 mb-3 text-gray-400">
            <span className={`${product.stockStatus === 'In Stock' ? 'text-emerald-500' : product.stockStatus === 'Low Stock' ? 'text-amber-500' : 'text-red-500'}`}>
              ● {product.stockStatus === 'Low Stock' ? `Only ${product.stockCount} Left` : product.stockStatus}
            </span>
            <span>Est. Delivery: {product.deliveryTime}</span>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-2 gap-2">
            <button 
              disabled={product.stockStatus === 'Out of Stock'}
              onClick={(e) => { e.stopPropagation(); addToCart(product, 1); }}
              className="py-2.5 bg-gray-100 dark:bg-zinc-800 hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white dark:hover:text-white text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:hover:bg-gray-100 disabled:hover:text-gray-700 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ShoppingCart size={13} /> Add to Cart
            </button>
            <a 
              href={`https://wa.me/917498191357?text=${encodeURIComponent(`Hello PPBASKET! I am interested in ordering: ${product.name} (ID: ${product.id}) priced at ₹${product.price.toLocaleString('en-IN')}. Please help me complete my purchase.`)}`}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-500/10 flex items-center justify-center gap-1 cursor-pointer text-center ${product.stockStatus === 'Out of Stock' ? 'opacity-50 pointer-events-none' : ''}`}
            >
              <MessageCircle size={13} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
