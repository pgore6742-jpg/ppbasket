import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck, 
  MapPin, CreditCard, ChevronRight, CheckCircle2, 
  Plus, Minus, Sparkles, Phone, FileText 
} from 'lucide-react';

export const Cart: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    activeCoupon,
    applyCoupon,
    removeCoupon,
    addresses,
    addAddress,
    paymentMethods,
    placeOrder,
    setActivePage
  } = useApp();

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'payment' | 'success'>('cart');
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  // Checkout choices
  const [selectedAddressId, setSelectedAddressId] = useState(() => {
    const def = addresses.find(a => a.isDefault);
    return def ? def.id : (addresses[0]?.id || '');
  });

  const [selectedPaymentType, setSelectedPaymentType] = useState('UPI');

  // New Address form
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newFullName, setNewFullName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newAddressLine, setNewAddressLine] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newZipCode, setNewZipCode] = useState('');

  // Placed Order Receipt State
  const [receiptOrder, setReceiptOrder] = useState<any>(null);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const originalSubtotal = cart.reduce((sum, item) => sum + item.product.originalPrice * item.quantity, 0);
  
  let couponDiscount = 0;
  if (activeCoupon) {
    if (activeCoupon.discountType === 'percentage') {
      couponDiscount = Math.round(subtotal * (activeCoupon.value / 100));
    } else {
      couponDiscount = activeCoupon.value;
    }
  }

  const finalTotal = subtotal - couponDiscount;
  const overallSavings = originalSubtotal - finalTotal;

  // Handles applying coupon
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponSuccess(res.message);
      setCouponError('');
    } else {
      setCouponError(res.message);
      setCouponSuccess('');
    }
  };

  // Handles adding address during checkout
  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName || !newPhone || !newAddressLine || !newCity || !newZipCode) {
      alert('Please fill out all address fields.');
      return;
    }
    const newAddr = {
      fullName: newFullName,
      phone: newPhone,
      addressLine: newAddressLine,
      city: newCity,
      state: newState || 'Maharashtra',
      zipCode: newZipCode,
      isDefault: false
    };
    addAddress(newAddr);
    setShowAddressForm(false);
    // Reset inputs
    setNewFullName('');
    setNewPhone('');
    setNewAddressLine('');
    setNewCity('');
    setNewZipCode('');
  };

  const handlePlaceOrderClick = () => {
    const selectedAddress = addresses.find(a => a.id === selectedAddressId);
    if (!selectedAddress) {
      alert('Please select a shipping address.');
      return;
    }
    // Call placeOrder context function
    const order = placeOrder(selectedAddress, selectedPaymentType);
    setReceiptOrder(order);
    setCheckoutStep('success');
  };

  if (checkoutStep === 'success' && receiptOrder) {
    return (
      <div id="ppb-checkout-success" className="bg-gray-50/50 dark:bg-zinc-950 py-16 transition-colors duration-200">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-xl text-center space-y-6">
            
            {/* Visual Success indicators */}
            <div className="h-16 w-16 bg-emerald-100 dark:bg-emerald-950/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 dark:bg-emerald-950/25 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Transaction Successful
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight">Order Placed Successfully!</h1>
              <p className="text-xs text-gray-400">Thank you for shopping at PPBASKET. Your order is registered and will be dispatched shortly.</p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-gray-50 dark:bg-zinc-950 border border-gray-150 dark:border-zinc-850 rounded-2xl p-5 text-left space-y-4">
              <div className="flex justify-between items-center text-xs pb-3 border-b border-gray-200/50 dark:border-zinc-800/80">
                <span className="font-bold text-gray-400">Order ID</span>
                <span className="font-mono font-extrabold text-gray-800 dark:text-gray-200">{receiptOrder.id}</span>
              </div>
              <div className="flex justify-between items-center text-xs pb-3 border-b border-gray-200/50 dark:border-zinc-800/80">
                <span className="font-bold text-gray-400">Tracking Code</span>
                <span className="font-mono font-extrabold text-[#FF6B00]">{receiptOrder.trackingNumber}</span>
              </div>
              <div className="flex justify-between items-center text-xs pb-3 border-b border-gray-200/50 dark:border-zinc-800/80">
                <span className="font-bold text-gray-400">Payment Status</span>
                <span className="font-extrabold text-emerald-500">{receiptOrder.paymentStatus}</span>
              </div>
              <div className="space-y-2">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Delivery Address</h4>
                <p className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  {receiptOrder.shippingAddress.fullName} — {receiptOrder.shippingAddress.phone}
                </p>
                <p className="text-xs text-gray-400 font-medium">
                  {receiptOrder.shippingAddress.addressLine}, {receiptOrder.shippingAddress.city}, {receiptOrder.shippingAddress.state} - {receiptOrder.shippingAddress.zipCode}
                </p>
              </div>
              <div className="border-t border-gray-200/50 dark:border-zinc-800/80 pt-3.5 flex justify-between items-center">
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Total Amount Paid</span>
                <span className="text-sm font-black text-[#FF6B00]">₹{receiptOrder.finalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Direct CTAs */}
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => { setActivePage('account'); window.scrollTo(0,0); }}
                className="w-full py-2.5 bg-gray-100 dark:bg-zinc-850 hover:bg-orange-500 hover:text-white text-gray-700 dark:text-gray-300 font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                Track Orders
              </button>
              <button 
                onClick={() => { setActivePage('home'); window.scrollTo(0,0); }}
                className="w-full py-2.5 bg-[#FF6B00] hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="ppb-cart-page" className="bg-gray-50/50 dark:bg-zinc-950 min-h-screen pb-20 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        
        {/* Checkout Header Pipeline state */}
        <div className="flex justify-center items-center gap-1.5 sm:gap-3.5 text-[11px] sm:text-xs font-bold text-gray-400 mb-8 sm:mb-12 border-b border-gray-150 dark:border-zinc-800 pb-5">
          <span 
            className={`cursor-pointer transition-colors ${checkoutStep === 'cart' ? 'text-[#FF6B00] font-black' : 'text-gray-700 dark:text-gray-300'}`}
            onClick={() => setCheckoutStep('cart')}
          >
            1. Review Cart
          </span>
          <ChevronRight size={14} className="text-gray-300" />
          <span 
            className={`cursor-pointer transition-colors ${checkoutStep === 'shipping' ? 'text-[#FF6B00] font-black' : checkoutStep === 'payment' ? 'text-gray-700 dark:text-gray-300' : ''}`}
            onClick={() => { if (cart.length > 0) setCheckoutStep('shipping'); }}
          >
            2. Shipping Address
          </span>
          <ChevronRight size={14} className="text-gray-300" />
          <span 
            className={`cursor-pointer transition-colors ${checkoutStep === 'payment' ? 'text-[#FF6B00] font-black' : ''}`}
            onClick={() => { if (cart.length > 0 && selectedAddressId) setCheckoutStep('payment'); }}
          >
            3. Secure Payment
          </span>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 p-12 rounded-3xl shadow-sm text-center space-y-4 max-w-md mx-auto">
            <div className="h-14 w-14 bg-orange-100 dark:bg-zinc-800 text-[#FF6B00] rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag size={20} />
            </div>
            <h3 className="font-bold text-base text-gray-800 dark:text-white">Your Shopping Cart is Empty</h3>
            <p className="text-xs text-gray-400 leading-relaxed">Browse over 15+ categories on PPBASKET and find items at pocket-friendly prices!</p>
            <button 
              onClick={() => setActivePage('products')}
              className="px-5 py-2.5 bg-[#FF6B00] hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              Browse Catalog
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Left Column: Multistep Forms */}
            <main className="flex-1 w-full space-y-6">
              
              {/* Step 1: Cart Items List */}
              {checkoutStep === 'cart' && (
                <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 rounded-3xl p-6 shadow-sm space-y-4">
                  <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest">Review Cart Items</h2>
                  <div className="divide-y divide-gray-100 dark:divide-zinc-800/80">
                    {cart.map(item => (
                      <div key={item.product.id} className="py-4 flex gap-4 items-center">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-16 h-16 rounded-xl object-cover bg-gray-50 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate">{item.product.name}</h3>
                          <p className="text-[10px] text-gray-400 mt-0.5">{item.product.category} • {item.product.brand}</p>
                          <p className="text-xs text-[#FF6B00] font-black mt-1">₹{item.product.price.toLocaleString('en-IN')}</p>
                        </div>

                        {/* Quantity adjust */}
                        <div className="flex items-center border border-gray-200 dark:border-zinc-800 rounded-lg overflow-hidden shrink-0">
                          <button 
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-150 dark:hover:bg-zinc-800 font-bold text-gray-500"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="px-3 text-xs font-black text-gray-900 dark:text-white">{item.quantity}</span>
                          <button 
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-150 dark:hover:bg-zinc-800 font-bold text-gray-500"
                          >
                            <Plus size={11} />
                          </button>
                        </div>

                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-colors shrink-0"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Shipping Addresses Selection */}
              {checkoutStep === 'shipping' && (
                <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 rounded-3xl p-6 shadow-sm space-y-5">
                  <div className="flex justify-between items-center">
                    <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest">Select Delivery Address</h2>
                    <button 
                      onClick={() => setShowAddressForm(!showAddressForm)}
                      className="text-xs font-bold text-[#FF6B00] hover:underline flex items-center gap-1"
                    >
                      + Add New Address
                    </button>
                  </div>

                  {/* Add address Form Overlay block */}
                  {showAddressForm && (
                    <form onSubmit={handleAddAddress} className="bg-gray-50 dark:bg-zinc-950/60 p-5 rounded-2xl border border-gray-200/55 dark:border-zinc-800 space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-black text-gray-400 uppercase block mb-1">Full Name</label>
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. Pankaj Gore"
                            value={newFullName}
                            onChange={(e) => setNewFullName(e.target.value)}
                            className="w-full bg-white dark:bg-zinc-900 text-xs border border-gray-200 dark:border-zinc-850 rounded-xl px-3.5 py-2 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-gray-400 uppercase block mb-1">Phone Number</label>
                          <input 
                            type="tel" 
                            required
                            placeholder="e.g. 9876543210"
                            value={newPhone}
                            onChange={(e) => setNewPhone(e.target.value.replace(/\D/g, ''))}
                            className="w-full bg-white dark:bg-zinc-900 text-xs border border-gray-200 dark:border-zinc-850 rounded-xl px-3.5 py-2 text-gray-900 dark:text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase block mb-1">Flat / House No / Road Address</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. Flat 402, Shiv Shrishti Apartment, Baner Road"
                          value={newAddressLine}
                          onChange={(e) => setNewAddressLine(e.target.value)}
                          className="w-full bg-white dark:bg-zinc-900 text-xs border border-gray-200 dark:border-zinc-850 rounded-xl px-3.5 py-2 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="text-[10px] font-black text-gray-400 uppercase block mb-1">City</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Pune"
                            value={newCity}
                            onChange={(e) => setNewCity(e.target.value)}
                            className="w-full bg-white dark:bg-zinc-900 text-xs border border-gray-200 dark:border-zinc-850 rounded-xl px-3.5 py-2 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-gray-400 uppercase block mb-1">State</label>
                          <input 
                            type="text" 
                            placeholder="Maharashtra"
                            value={newState}
                            onChange={(e) => setNewState(e.target.value)}
                            className="w-full bg-white dark:bg-zinc-900 text-xs border border-gray-200 dark:border-zinc-850 rounded-xl px-3.5 py-2 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-gray-400 uppercase block mb-1">Pin Code</label>
                          <input 
                            type="text" 
                            maxLength={6}
                            required
                            placeholder="411045"
                            value={newZipCode}
                            onChange={(e) => setNewZipCode(e.target.value.replace(/\D/g, ''))}
                            className="w-full bg-white dark:bg-zinc-900 text-xs border border-gray-200 dark:border-zinc-850 rounded-xl px-3.5 py-2 text-gray-900 dark:text-white"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end pt-2">
                        <button 
                          type="button" 
                          onClick={() => setShowAddressForm(false)}
                          className="px-4 py-2 border border-gray-200 dark:border-zinc-850 text-gray-500 hover:text-gray-700 text-xs font-bold rounded-xl"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit"
                          className="px-4 py-2 bg-[#FF6B00] hover:bg-orange-600 text-white text-xs font-bold rounded-xl"
                        >
                          Save Address
                        </button>
                      </div>
                    </form>
                  )}

                  {/* List Addresses */}
                  <div className="space-y-3">
                    {addresses.length === 0 ? (
                      <p className="text-xs text-gray-400">No addresses saved. Please add one to continue.</p>
                    ) : (
                      addresses.map(addr => (
                        <div 
                          key={addr.id}
                          onClick={() => setSelectedAddressId(addr.id)}
                          className={`p-4 border rounded-2xl cursor-pointer transition-all flex items-start gap-3.5 ${selectedAddressId === addr.id ? 'border-[#FF6B00] bg-orange-50/10 dark:bg-zinc-900/40' : 'border-gray-150 dark:border-zinc-800'}`}
                        >
                          <div className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedAddressId === addr.id ? 'border-[#FF6B00]' : 'border-gray-300'}`}>
                            {selectedAddressId === addr.id && <div className="h-2 w-2 bg-[#FF6B00] rounded-full"></div>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-extrabold text-xs text-gray-900 dark:text-white">{addr.fullName}</h4>
                              <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                                <Phone size={10} /> {addr.phone}
                              </span>
                              {addr.isDefault && (
                                <span className="bg-gray-100 text-gray-500 text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase">Default</span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                              {addr.addressLine}, {addr.city}, {addr.state} - {addr.zipCode}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Secure Payments details */}
              {checkoutStep === 'payment' && (
                <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 rounded-3xl p-6 shadow-sm space-y-5">
                  <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest">Select Secure Payment Mode</h2>
                  
                  <div className="space-y-3">
                    {/* UPI */}
                    <div 
                      onClick={() => setSelectedPaymentType('UPI')}
                      className={`p-4 border rounded-2xl cursor-pointer transition-all flex items-center gap-4 ${selectedPaymentType === 'UPI' ? 'border-[#FF6B00] bg-orange-50/10' : 'border-gray-150'}`}
                    >
                      <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedPaymentType === 'UPI' ? 'border-[#FF6B00]' : 'border-gray-300'}`}>
                        {selectedPaymentType === 'UPI' && <div className="h-2 w-2 bg-[#FF6B00] rounded-full"></div>}
                      </div>
                      <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl">
                        <CreditCard size={18} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-extrabold text-xs text-gray-900">Instant UPI Payments</h4>
                        <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Pay via GPay, PhonePe, or BHIM. Zero convenience fees!</p>
                      </div>
                    </div>

                    {/* Debit/Credit Card */}
                    <div 
                      onClick={() => setSelectedPaymentType('Card')}
                      className={`p-4 border rounded-2xl cursor-pointer transition-all flex items-center gap-4 ${selectedPaymentType === 'Card' ? 'border-[#FF6B00] bg-orange-50/10' : 'border-gray-150'}`}
                    >
                      <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedPaymentType === 'Card' ? 'border-[#FF6B00]' : 'border-gray-300'}`}>
                        {selectedPaymentType === 'Card' && <div className="h-2 w-2 bg-[#FF6B00] rounded-full"></div>}
                      </div>
                      <div className="bg-purple-50 text-purple-600 p-2.5 rounded-xl">
                        <CreditCard size={18} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-extrabold text-xs text-gray-900">Credit or Debit Card</h4>
                        <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Visa, Mastercard, RuPay & Maestro accepted. Secure 256-Bit SSL.</p>
                      </div>
                    </div>

                    {/* Cash on Delivery */}
                    <div 
                      onClick={() => setSelectedPaymentType('COD')}
                      className={`p-4 border rounded-2xl cursor-pointer transition-all flex items-center gap-4 ${selectedPaymentType === 'COD' ? 'border-[#FF6B00] bg-orange-50/10' : 'border-gray-150'}`}
                    >
                      <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedPaymentType === 'COD' ? 'border-[#FF6B00]' : 'border-gray-300'}`}>
                        {selectedPaymentType === 'COD' && <div className="h-2 w-2 bg-[#FF6B00] rounded-full"></div>}
                      </div>
                      <div className="bg-amber-50 text-amber-600 p-2.5 rounded-xl">
                        <ShieldCheck size={18} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-extrabold text-xs text-gray-900">Cash On Delivery (COD)</h4>
                        <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Pay in cash or UPI at your doorstep upon receiving the package.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </main>

            {/* Right Column: Order Pricing Summary Card */}
            <aside className="w-full lg:w-[380px] space-y-4">
              
              {/* Promo Coupon Application Box */}
              {checkoutStep === 'cart' && (
                <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 p-5 rounded-3xl shadow-sm space-y-3">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Tag size={13} className="text-[#FF6B00]" /> Coupon Codes Vouchers
                  </h4>
                  
                  {activeCoupon ? (
                    <div className="bg-emerald-50/50 dark:bg-zinc-950 p-3 rounded-xl border border-emerald-200/25 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-extrabold text-emerald-500 uppercase tracking-wider block">Applied Code</span>
                        <span className="font-mono text-sm font-black text-gray-800 dark:text-gray-200">{activeCoupon.code}</span>
                      </div>
                      <button 
                        onClick={removeCoupon}
                        className="text-xs text-red-500 font-extrabold hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Apply Code (e.g. PPBASKET10)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        className="flex-1 bg-gray-50 dark:bg-zinc-950 border border-gray-250/50 dark:border-zinc-800 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-[#FF6B00] text-gray-800 dark:text-white font-extrabold"
                      />
                      <button 
                        type="submit"
                        className="px-4 py-2 bg-zinc-900 dark:bg-zinc-850 hover:bg-black text-white text-xs font-bold rounded-xl cursor-pointer shadow-sm"
                      >
                        Apply
                      </button>
                    </form>
                  )}

                  {couponError && <p className="text-[10px] text-red-500 font-bold">{couponError}</p>}
                  {couponSuccess && <p className="text-[10px] text-emerald-500 font-bold">{couponSuccess}</p>}
                </div>
              )}

              {/* Totals Summary */}
              <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 p-6 rounded-3xl shadow-sm space-y-4">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Order Summary</h3>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-gray-500">
                    <span>Original Price Subtotal</span>
                    <span className="font-semibold text-gray-600 line-through">₹{originalSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Direct Store Discounts</span>
                    <span className="font-semibold text-red-500">-₹{(originalSubtotal - subtotal).toLocaleString('en-IN')}</span>
                  </div>
                  {activeCoupon && (
                    <div className="flex justify-between text-gray-500">
                      <span>Promo Coupon Applied</span>
                      <span className="font-semibold text-emerald-500">-₹{couponDiscount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-500 pb-3.5 border-b border-gray-100/60">
                    <span>Delivery Shipping Fees</span>
                    <span className="font-extrabold text-emerald-500">FREE</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold pt-1 text-gray-900 dark:text-white">
                    <span>Total Net Amount</span>
                    <span className="text-base font-black text-[#FF6B00]">₹{finalTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Savings highlights */}
                <div className="bg-emerald-500/10 text-emerald-500 text-[11px] font-extrabold p-3 rounded-2xl flex items-center gap-1.5 justify-center uppercase">
                  <Sparkles size={14} /> You are saving ₹{overallSavings.toLocaleString('en-IN')}!
                </div>

                {/* Multistep navigation triggers */}
                {checkoutStep === 'cart' && (
                  <button 
                    onClick={() => setCheckoutStep('shipping')}
                    className="w-full py-3.5 bg-[#FF6B00] hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/15 transition-all cursor-pointer"
                  >
                    Proceed to Delivery Address <ArrowRight size={14} />
                  </button>
                )}

                {checkoutStep === 'shipping' && (
                  <button 
                    disabled={!selectedAddressId}
                    onClick={() => setCheckoutStep('payment')}
                    className="w-full py-3.5 bg-[#FF6B00] hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/15 transition-all cursor-pointer disabled:opacity-50"
                  >
                    Proceed to Payment Mode <ArrowRight size={14} />
                  </button>
                )}

                {checkoutStep === 'payment' && (
                  <button 
                    onClick={handlePlaceOrderClick}
                    className="w-full py-3.5 bg-[#FF6B00] hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/15 transition-all cursor-pointer"
                  >
                    Place Secure Order (Pay ₹{finalTotal.toLocaleString('en-IN')})
                  </button>
                )}
              </div>

            </aside>

          </div>
        )}

      </div>
    </div>
  );
};
