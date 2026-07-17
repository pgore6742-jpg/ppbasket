import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import { 
  Search, ShoppingCart, Heart, User, Sun, Moon, 
  Mic, MicOff, X, Trash2, LayoutDashboard, Languages, 
  ChevronDown, Bell, Tag, Menu, Sparkles 
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    theme,
    toggleTheme,
    language,
    setLanguage,
    searchQuery,
    setSearchQuery,
    searchSuggestions,
    setSelectedCategory,
    cart,
    addToCart,
    removeFromCart,
    wishlist,
    toggleWishlist,
    currentUser,
    notifications,
    markNotificationRead,
    voiceSearchActive,
    setVoiceSearchActive,
    setQuickViewProduct
  } = useApp();

  const [searchFocused, setSearchFocused] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [showWishlistDropdown, setShowWishlistDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const unreadNotifsCount = notifications.filter(n => !n.isRead).length;

  // Categories list
  const categories = [
    'Fashion', 'Electronics', 'Mobiles', 'Grocery', 'Home & Kitchen', 
    'Beauty', 'Sports & Fitness', 'Toys', 'Books', 'Footwear', 
    'Bags', 'Watches', 'Health', 'Baby Care', 'Furniture', 
    'Automotive', 'Stationery', 'Pet Supplies'
  ];

  const handleVoiceSearch = () => {
    if (voiceSearchActive) {
      setVoiceSearchActive(false);
    } else {
      setVoiceSearchActive(true);
      setSearchQuery('Listening...');
      setTimeout(() => {
        setSearchQuery('Buds');
        setVoiceSearchActive(false);
        setActivePage('products');
      }, 2500);
    }
  };

  const handleSuggestionClick = (suggest: string) => {
    setSearchQuery(suggest);
    setSearchFocused(false);
    setActivePage('products');
  };

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setActivePage('products');
    setMobileMenuOpen(false);
  };

  const menuItems = [
    { label: language === 'en' ? 'Home' : 'मुख्य', page: 'home' },
    { label: language === 'en' ? 'Products' : 'उत्पाद', page: 'products' },
    { label: language === 'en' ? 'Deals' : 'डील्स', page: 'deals' },
    { label: language === 'en' ? 'About Us' : 'हमारे बारे में', page: 'about' },
    { label: language === 'en' ? 'Contact Us' : 'संपर्क', page: 'contact' }
  ];

  return (
    <header id="ppb-navbar" className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-900 text-gray-700 dark:text-gray-300"
            >
              <Menu size={24} />
            </button>
            <div 
              onClick={() => { setActivePage('home'); setSelectedCategory('All'); }} 
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <div className="bg-zinc-950 p-1.5 sm:p-2 rounded-xl flex items-center justify-center shadow-lg shadow-black/25 border border-zinc-900">
                <Logo size={28} />
              </div>
              <span className="font-extrabold text-xl sm:text-2xl text-gray-900 dark:text-white tracking-tight">
                BASKET<span className="text-[#FF6B00]">.</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation Link Menu */}
          <nav className="hidden lg:flex items-center gap-6">
            {menuItems.map(item => (
              <button
                key={item.page}
                onClick={() => {
                  setActivePage(item.page);
                  if (item.page === 'products') setSelectedCategory('All');
                }}
                className={`font-semibold text-sm transition-all duration-200 py-1.5 border-b-2 hover:text-[#FF6B00] ${
                  activePage === item.page 
                    ? 'text-[#FF6B00] border-[#FF6B00]' 
                    : 'text-gray-600 dark:text-gray-300 border-transparent hover:border-orange-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Search Bar Block */}
          <div className="hidden md:flex relative flex-1 max-w-md mx-4">
            <div className="w-full flex items-center bg-gray-100 dark:bg-zinc-900 border border-transparent focus-within:border-orange-500 focus-within:bg-white dark:focus-within:bg-zinc-950 rounded-full py-1.5 px-3.5 transition-all duration-250">
              <Search className="text-gray-400 mr-2.5" size={18} />
              <input
                type="text"
                placeholder={language === 'en' ? 'Search mobile, fashion, grocery...' : 'खोजें मोबाइल, कपड़े, राशन...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setActivePage('products');
                  }
                }}
                className="w-full bg-transparent border-none text-sm text-gray-900 dark:text-white focus:outline-none placeholder-gray-400"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="p-0.5 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-full mr-2">
                  <X size={14} className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
              <button 
                onClick={handleVoiceSearch} 
                className={`p-1.5 rounded-full transition-colors ${voiceSearchActive ? 'bg-orange-100 text-orange-600 animate-pulse' : 'hover:bg-gray-200 dark:hover:bg-zinc-800 text-gray-500'}`}
                title="Voice Search"
              >
                {voiceSearchActive ? <MicOff size={16} /> : <Mic size={16} />}
              </button>
            </div>

            {/* Smart Search Suggestions */}
            {searchFocused && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-xl z-50 overflow-hidden divide-y divide-gray-100 dark:divide-zinc-900">
                {searchSuggestions.map((suggest, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSuggestionClick(suggest)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-zinc-900/40 cursor-pointer transition-colors"
                  >
                    <Search size={14} className="text-gray-400" />
                    <span className="font-medium truncate">{suggest}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Icons Toolbar */}
          <div className="flex items-center gap-1 sm:gap-2.5">
            
            {/* Language Toggler */}
            <button 
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-[#FF6B00] rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-900/60 flex items-center gap-1 transition-colors text-xs font-semibold"
              title="Change Language"
            >
              <Languages size={18} />
              <span className="hidden sm:inline uppercase">{language}</span>
            </button>

            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-[#FF6B00] rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-900/60 transition-colors"
              title="Toggle Theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Notifications Popup */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-[#FF6B00] rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-900/60 transition-colors"
                title="Notifications"
              >
                <Bell size={20} />
                {unreadNotifsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 h-4 w-4 bg-[#FF6B00] text-white text-[10px] font-bold flex items-center justify-center rounded-full ring-2 ring-white dark:ring-zinc-950">
                    {unreadNotifsCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-2xl z-50 py-3 overflow-hidden">
                  <div className="px-4 pb-2 border-b border-gray-100 dark:border-zinc-900 flex justify-between items-center">
                    <span className="font-bold text-sm text-gray-800 dark:text-white">Notifications</span>
                    <button 
                      onClick={() => notifications.forEach(n => markNotificationRead(n.id))}
                      className="text-xs text-[#FF6B00] font-medium hover:underline"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-60 overflow-y-auto divide-y divide-gray-50 dark:divide-zinc-900/60">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-xs text-gray-400">No new notifications</div>
                    ) : (
                      notifications.map(notif => (
                        <div 
                          key={notif.id} 
                          onClick={() => markNotificationRead(notif.id)}
                          className={`p-3 text-xs cursor-pointer transition-colors hover:bg-orange-50/40 dark:hover:bg-zinc-900/20 ${notif.isRead ? 'opacity-65' : 'bg-orange-50/20 dark:bg-zinc-900/10 font-medium'}`}
                        >
                          <div className="flex justify-between font-bold text-gray-800 dark:text-gray-200 mb-0.5">
                            <span className="truncate">{notif.title}</span>
                            <span className="text-[10px] text-gray-400 font-normal">{notif.date}</span>
                          </div>
                          <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{notif.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist Indicator */}
            <div className="relative">
              <button 
                onClick={() => setShowWishlistDropdown(!showWishlistDropdown)}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-[#FF6B00] rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-900/60 transition-colors cursor-pointer"
                title="Wishlist"
              >
                <Heart size={20} className={wishlist.length > 0 ? "fill-red-500 text-red-500" : ""} />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-zinc-950"></span>
                )}
              </button>

              {showWishlistDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-2xl z-50 p-4">
                  <h3 className="font-bold text-sm text-gray-800 dark:text-white mb-3 flex items-center gap-1.5">
                    <Heart size={16} className="text-red-500 fill-red-500" /> Wishlist ({wishlist.length})
                  </h3>
                  <div className="max-h-60 overflow-y-auto divide-y divide-gray-100 dark:divide-zinc-900 mb-3 pr-1">
                    {wishlist.length === 0 ? (
                      <div className="py-8 text-center text-xs text-gray-400">Your wishlist is empty</div>
                    ) : (
                      wishlist.map(product => (
                        <div key={product.id} className="py-2.5 flex gap-3 items-center">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-10 h-10 rounded-lg object-cover bg-gray-50"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">{product.name}</h4>
                            <p className="text-[10px] text-gray-400 mt-0.5">₹{product.price.toLocaleString('en-IN')}</p>
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => {
                                addToCart(product);
                                toggleWishlist(product);
                              }}
                              className="px-2 py-1 bg-[#FF6B00] hover:bg-orange-600 text-white text-[10px] font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                            >
                              + Cart
                            </button>
                            <button 
                              onClick={() => toggleWishlist(product)}
                              className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors animate-pulse"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Shopping Cart Indicator / Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowCartDropdown(!showCartDropdown)}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-[#FF6B00] rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-900/60 transition-colors flex items-center cursor-pointer"
                title="Cart"
              >
                <ShoppingCart size={20} />
                {cart.length > 0 && (
                  <span className="ml-1 h-4 px-1 bg-[#FF6B00] text-white text-[10px] font-bold flex items-center justify-center rounded-full ring-2 ring-white dark:ring-zinc-950">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>

              {showCartDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-2xl z-50 p-4">
                  <h3 className="font-bold text-sm text-gray-800 dark:text-white mb-3">Shopping Cart</h3>
                  <div className="max-h-60 overflow-y-auto divide-y divide-gray-100 dark:divide-zinc-900 mb-3 pr-1">
                    {cart.length === 0 ? (
                      <div className="py-8 text-center text-xs text-gray-400">Your cart is empty</div>
                    ) : (
                      cart.map(item => (
                        <div key={item.product.id} className="py-2.5 flex gap-3">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-12 h-12 rounded-lg object-cover bg-gray-50"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">{item.product.name}</h4>
                            <p className="text-[10px] text-gray-400 mt-0.5">₹{item.product.price.toLocaleString('en-IN')} x {item.quantity}</p>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors align-top"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                  {cart.length > 0 && (
                    <div className="border-t border-gray-100 dark:border-zinc-900 pt-3">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs text-gray-500 font-medium">Subtotal</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">₹{cartTotal.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button 
                          onClick={() => { setShowCartDropdown(false); setActivePage('cart'); }}
                          className="w-full text-center py-2 border border-gray-200 dark:border-zinc-800 hover:border-orange-500 dark:hover:border-orange-500 hover:text-[#FF6B00] text-xs font-semibold rounded-xl text-gray-700 dark:text-gray-300 transition-colors"
                        >
                          View Cart
                        </button>
                        <button 
                          onClick={() => { setShowCartDropdown(false); setActivePage('cart'); }}
                          className="w-full text-center py-2 bg-[#FF6B00] hover:bg-orange-600 text-white text-xs font-bold rounded-xl shadow-md shadow-orange-500/10 transition-colors"
                        >
                          Checkout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>



          </div>
        </div>
      </div>

      {/* Mobile Search Input Row */}
      <div className="md:hidden px-4 pb-3.5 pt-1 border-t border-gray-100 dark:border-zinc-900 flex items-center gap-2">
        <div className="flex-1 flex items-center bg-gray-100 dark:bg-zinc-900 border border-transparent focus-within:border-orange-500 focus-within:bg-white dark:focus-within:bg-zinc-950 rounded-full py-1.5 px-3.5 transition-all">
          <Search className="text-gray-400 mr-2" size={16} />
          <input
            type="text"
            placeholder="Search products, brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setActivePage('products');
            }}
            className="w-full bg-transparent border-none text-xs text-gray-900 dark:text-white focus:outline-none placeholder-gray-400"
          />
        </div>
        <button 
          onClick={handleVoiceSearch} 
          className={`p-2 rounded-full ${voiceSearchActive ? 'bg-orange-100 text-[#FF6B00]' : 'bg-gray-100 dark:bg-zinc-900 text-gray-500'}`}
        >
          {voiceSearchActive ? <MicOff size={16} /> : <Mic size={16} />}
        </button>
      </div>

      {/* Megamenu Category Toolbar */}
      <div className="bg-gray-50 dark:bg-zinc-900/40 border-t border-gray-100 dark:border-zinc-900 hidden lg:block overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center gap-5 whitespace-nowrap scrollbar-none">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mr-2 flex items-center gap-1">
            Categories:
          </span>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => handleCategorySelect(cat)}
              className="text-xs font-bold text-gray-600 dark:text-gray-300 hover:text-[#FF6B00] dark:hover:text-[#FF6B00] hover:scale-105 transition-all cursor-pointer"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Overlay background */}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          
          <div className="relative flex flex-col w-4/5 max-w-xs bg-white dark:bg-zinc-950 p-6 shadow-2xl h-full divide-y divide-gray-100 dark:divide-zinc-900 overflow-y-auto">
            <div className="flex items-center justify-between pb-4">
              <span className="font-extrabold text-lg text-gray-900 dark:text-white tracking-tight">PPBASKET</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-lg">
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Menu Links */}
            <div className="py-4 flex flex-col gap-3">
              {menuItems.map(item => (
                <button
                  key={item.page}
                  onClick={() => {
                    setActivePage(item.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left font-semibold text-sm py-2 px-3 rounded-xl ${
                    activePage === item.page 
                      ? 'bg-orange-50 text-[#FF6B00] dark:bg-zinc-900/50' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-900/30'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Categories */}
            <div className="py-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5 px-3">Top Categories</p>
              <div className="flex flex-col gap-1 max-h-60 overflow-y-auto pr-1">
                {categories.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCategorySelect(cat)}
                    className="text-left text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-[#FF6B00] py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-900/20"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
