import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, Address, PaymentMethod, Coupon, Customer, Notification, Review, Banner } from '../types';
import { initialProducts, initialCoupons, initialBanners } from '../data/initialProducts';

interface AppContextType {
  // Navigation
  activePage: string;
  setActivePage: (page: string) => void;
  selectedProduct: Product | null;
  viewProductDetail: (product: Product) => void;

  // Products & Settings
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  banners: Banner[];
  setBanners: React.Dispatch<React.SetStateAction<Banner[]>>;
  coupons: Coupon[];
  setCoupons: React.Dispatch<React.SetStateAction<Coupon[]>>;
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;

  // Filters & Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchSuggestions: string[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedRating: number;
  setSelectedRating: (rating: number) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  resetFilters: () => void;

  // Cart & Wishlist
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  activeCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;

  compareList: Product[];
  toggleCompare: (product: Product) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;

  recentlyViewed: Product[];
  addToRecentlyViewed: (product: Product) => void;

  // Checkout & User Info
  currentUser: { name: string; email: string; phone: string; isAdmin: boolean } | null;
  loginUser: (email: string, phone: string, name?: string) => { success: boolean; message: string };
  logoutUser: () => void;
  orders: Order[];
  placeOrder: (shippingAddress: Address, paymentMethod: string) => Order;
  cancelOrder: (orderId: string) => void;

  addresses: Address[];
  addAddress: (address: Omit<Address, 'id'>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;

  paymentMethods: PaymentMethod[];
  addPaymentMethod: (method: Omit<PaymentMethod, 'id'>) => void;
  deletePaymentMethod: (id: string) => void;
  setDefaultPaymentMethod: (id: string) => void;

  notifications: Notification[];
  addNotification: (title: string, message: string, type: Notification['type']) => void;
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;

  // Preferences & Accessibility
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  voiceSearchActive: boolean;
  setVoiceSearchActive: (active: boolean) => void;

  // Live Chat
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  chatMessages: { sender: 'user' | 'bot'; text: string; time: string }[] | any;
  sendChatMessage: (text: string) => void;

  // Quick View
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Admin Management
  adminCustomers: Customer[];
  setAdminCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updateProductStock: (productId: string, stockCount: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Core Data sets
  const [products, setProducts] = useState<Product[]>(() => {
    const local = localStorage.getItem('ppb_products');
    return local ? JSON.parse(local) : initialProducts;
  });

  const [banners, setBanners] = useState<Banner[]>(() => {
    const local = localStorage.getItem('ppb_banners');
    return local ? JSON.parse(local) : initialBanners;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const local = localStorage.getItem('ppb_coupons');
    return local ? JSON.parse(local) : initialCoupons;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const local = localStorage.getItem('ppb_reviews');
    if (local) return JSON.parse(local);
    // Initial rich reviews
    const initialReviews: Review[] = [
      { id: 'rev-1', productId: 'prod-mob-1', productName: 'Realme GT 6T 5G', userName: 'Amit Sharma', rating: 5, comment: 'Awesome battery life! Charging is unbelievably fast. Completely satisfied with Realme.', date: '2026-07-10', approved: true },
      { id: 'rev-2', productId: 'prod-mob-1', productName: 'Realme GT 6T 5G', userName: 'Priya Patel', rating: 4, comment: 'Great camera quality and very smooth display. Highly recommended for gaming.', date: '2026-07-12', approved: true },
      { id: 'rev-3', productId: 'prod-elec-1', productName: 'Noise Buds VS104', userName: 'Rahul Varma', rating: 5, comment: 'Under 1500, these are the best earbuds. Deep bass is incredible.', date: '2026-07-11', approved: true },
      { id: 'rev-4', productId: 'prod-fash-1', productName: 'Anubhuti Printed Cotton Kurta', userName: 'Sneha G.', rating: 4, comment: 'Very comfortable pure cotton. Perfect fit and beautiful print patterns.', date: '2026-07-14', approved: true }
    ];
    return initialReviews;
  });

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState('popularity');

  // Cart & Wishlist
  const [cart, setCart] = useState<CartItem[]>(() => {
    const local = localStorage.getItem('ppb_cart');
    return local ? JSON.parse(local) : [];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const local = localStorage.getItem('ppb_wishlist');
    return local ? JSON.parse(local) : [];
  });

  const [compareList, setCompareList] = useState<Product[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>(() => {
    const local = localStorage.getItem('ppb_recently_viewed');
    return local ? JSON.parse(local) : [];
  });

  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);

  // User auth & histories
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; phone: string; isAdmin: boolean } | null>(() => {
    const local = localStorage.getItem('ppb_user');
    return local ? JSON.parse(local) : { name: 'Pankaj Gore', email: 'pgore6742@gmail.com', phone: '+91 9876543210', isAdmin: true }; // Default to Admin since the user pgore6742 is loading this
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const local = localStorage.getItem('ppb_orders');
    if (local) return JSON.parse(local);
    return [
      {
        id: 'ORD-98471-2026',
        userId: 'pgore6742@gmail.com',
        items: [
          {
            product: initialProducts[0],
            quantity: 1
          }
        ],
        totalAmount: 35999,
        discountApplied: 5000,
        finalAmount: 30999,
        shippingAddress: {
          id: 'addr-1',
          fullName: 'Pankaj Gore',
          phone: '9876543210',
          addressLine: 'Flat 402, Shiv Shrishti Apartment, Baner Road',
          city: 'Pune',
          state: 'Maharashtra',
          zipCode: '411045',
          isDefault: true
        },
        paymentMethod: 'UPI (GPay)',
        paymentStatus: 'Paid',
        status: 'Delivered',
        date: '2026-07-01',
        trackingNumber: 'PPB-TRK-741982'
      }
    ];
  });

  const [addresses, setAddresses] = useState<Address[]>(() => {
    const local = localStorage.getItem('ppb_addresses');
    if (local) return JSON.parse(local);
    return [
      {
        id: 'addr-1',
        fullName: 'Pankaj Gore',
        phone: '9876543210',
        addressLine: 'Flat 402, Shiv Shrishti Apartment, Baner Road',
        city: 'Pune',
        state: 'Maharashtra',
        zipCode: '411045',
        isDefault: true
      },
      {
        id: 'addr-2',
        fullName: 'Pankaj Gore (Office)',
        phone: '9123456789',
        addressLine: 'Floor 8, Tower B, Cyber City, Phase 3',
        city: 'Gurugram',
        state: 'Haryana',
        zipCode: '122002',
        isDefault: false
      }
    ];
  });

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(() => {
    const local = localStorage.getItem('ppb_payment_methods');
    if (local) return JSON.parse(local);
    return [
      { id: 'pay-1', type: 'UPI', upiId: 'pgore@okaxis', isDefault: true },
      { id: 'pay-2', type: 'Card', cardLabel: 'HDFC Bank Credit Card (ending in 8847)', isDefault: false }
    ];
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const local = localStorage.getItem('ppb_notifications');
    if (local) return JSON.parse(local);
    return [
      {
        id: 'notif-1',
        title: 'Welcome to PPBASKET!',
        message: 'Explore over 15+ categories with the best affordable pricing in India.',
        date: '2026-07-17',
        isRead: false,
        type: 'info'
      },
      {
        id: 'notif-2',
        title: 'Great Monsoon Electronics Sale!',
        message: 'Get up to 60% off on Noise Buds and Realme GT smartphones. Use code PPBASKET10.',
        date: '2026-07-17',
        isRead: false,
        type: 'deal'
      }
    ];
  });

  // Theme & Language
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const local = localStorage.getItem('ppb_theme');
    return (local as 'light' | 'dark') || 'light';
  });

  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [voiceSearchActive, setVoiceSearchActive] = useState(false);

  // Live Chat
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<any[]>([
    { sender: 'bot', text: 'Namaste! Welcome to PPBASKET Customer Support. How can I assist you today? You can ask about our offers, category products, order status, or payment queries!', time: '07:40 AM' }
  ]);

  // Quick View Modal
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Admin Customers
  const [adminCustomers, setAdminCustomers] = useState<Customer[]>(() => {
    const local = localStorage.getItem('ppb_admin_customers');
    if (local) return JSON.parse(local);
    return [
      { id: 'cust-1', name: 'Pankaj Gore', email: 'pgore6742@gmail.com', phone: '9876543210', ordersCount: 1, totalSpent: 30999, joinDate: '2026-06-15', status: 'Active' },
      { id: 'cust-2', name: 'Anisha Kulkarni', email: 'anisha.k@gmail.com', phone: '9845124110', ordersCount: 3, totalSpent: 4500, joinDate: '2026-06-20', status: 'Active' },
      { id: 'cust-3', name: 'Vikram Singh', email: 'vikram.singh@gmail.com', phone: '9122453880', ordersCount: 0, totalSpent: 0, joinDate: '2026-07-01', status: 'Active' }
    ];
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('ppb_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('ppb_banners', JSON.stringify(banners));
  }, [banners]);

  useEffect(() => {
    localStorage.setItem('ppb_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('ppb_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('ppb_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ppb_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('ppb_recently_viewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    localStorage.setItem('ppb_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('ppb_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('ppb_addresses', JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem('ppb_payment_methods', JSON.stringify(paymentMethods));
  }, [paymentMethods]);

  useEffect(() => {
    localStorage.setItem('ppb_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('ppb_theme', theme);
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Search suggestions auto-calculator based on product names
  const searchSuggestions = products
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .map(p => p.name)
    .slice(0, 5);

  const viewProductDetail = (product: Product) => {
    setSelectedProduct(product);
    addToRecentlyViewed(product);
    setActivePage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedBrand('All');
    setPriceRange([0, 50000]);
    setSelectedRating(0);
    setSortBy('popularity');
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, color?: string, size?: string) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(item => item.product.id === product.id);
      if (existingIdx > -1) {
        const newCart = [...prev];
        newCart[existingIdx].quantity += quantity;
        return newCart;
      }
      return [...prev, { product, quantity, selectedColor: color, selectedSize: size }];
    });
    addNotification('Added to Cart', `${product.name} has been added to your shopping cart.`, 'info');
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity: qty } : item));
  };

  const clearCart = () => setCart([]);

  const applyCoupon = (code: string) => {
    const found = coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase() && c.isActive);
    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code!' };
    }
    // Calculate total
    const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    if (cartTotal < found.minPurchase) {
      return { success: false, message: `Minimum purchase of ₹${found.minPurchase} is required for this coupon.` };
    }
    setActiveCoupon(found);
    return { success: true, message: `Coupon Applied Successfully! You saved ₹${found.discountType === 'percentage' ? Math.round(cartTotal * (found.value / 100)) : found.value}.` };
  };

  const removeCoupon = () => setActiveCoupon(null);

  // Wishlist
  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        addNotification('Removed from Wishlist', `${product.name} removed from your wishlist.`, 'info');
        return prev.filter(p => p.id !== product.id);
      }
      addNotification('Added to Wishlist', `${product.name} added to your wishlist.`, 'info');
      return [...prev, product];
    });
  };

  const isInWishlist = (productId: string) => wishlist.some(p => p.id === productId);

  // Compare List
  const toggleCompare = (product: Product) => {
    setCompareList(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 products at a time.');
        return prev;
      }
      return [...prev, product];
    });
  };

  const isInCompare = (productId: string) => compareList.some(p => p.id === productId);
  const clearCompare = () => setCompareList([]);

  // Recently viewed
  const addToRecentlyViewed = (product: Product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 8); // Keep last 8 items
    });
  };

  // Auth Operations
  const loginUser = (email: string, phone: string, name?: string) => {
    const isOwner = email.toLowerCase() === 'pgore6742@gmail.com' || name?.toLowerCase() === 'admin';
    const user = {
      name: name || (isOwner ? 'Pankaj Gore' : 'Premium Customer'),
      email,
      phone,
      isAdmin: isOwner
    };
    setCurrentUser(user);
    // Add to admin customer database if new
    setAdminCustomers(prev => {
      const exists = prev.find(c => c.email.toLowerCase() === email.toLowerCase());
      if (exists) return prev;
      return [
        ...prev,
        {
          id: `cust-${Date.now()}`,
          name: user.name,
          email: user.email,
          phone: user.phone,
          ordersCount: 0,
          totalSpent: 0,
          joinDate: new Date().toISOString().split('T')[0],
          status: 'Active'
        }
      ];
    });
    addNotification('Login Successful', `Namaste ${user.name}! Welcome back to PPBASKET.`, 'info');
    return { success: true, message: 'Welcome back!' };
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setActiveCoupon(null);
    addNotification('Logged Out', 'You have been successfully logged out.', 'info');
  };

  // Place orders
  const placeOrder = (shippingAddress: Address, paymentMethod: string) => {
    const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    let discount = 0;
    if (activeCoupon) {
      if (activeCoupon.discountType === 'percentage') {
        discount = Math.round(cartTotal * (activeCoupon.value / 100));
      } else {
        discount = activeCoupon.value;
      }
    }
    const finalAmount = cartTotal - discount;

    const newOrder: Order = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}-${new Date().getFullYear()}`,
      userId: currentUser?.email || 'guest@ppbasket.com',
      items: [...cart],
      totalAmount: cartTotal,
      discountApplied: discount,
      finalAmount,
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid',
      status: 'Order Placed',
      date: new Date().toISOString().split('T')[0],
      trackingNumber: `PPB-TRK-${Math.floor(100000 + Math.random() * 900000)}`
    };

    setOrders(prev => [newOrder, ...prev]);

    // Update product stock counts
    setProducts(prev => prev.map(p => {
      const orderedItem = cart.find(item => item.product.id === p.id);
      if (orderedItem) {
        const remainingCount = Math.max(0, p.stockCount - orderedItem.quantity);
        return {
          ...p,
          stockCount: remainingCount,
          stockStatus: remainingCount === 0 ? 'Out of Stock' : remainingCount <= 5 ? 'Low Stock' : 'In Stock'
        };
      }
      return p;
    }));

    // Update customer stats
    if (currentUser) {
      setAdminCustomers(prev => prev.map(c => {
        if (c.email.toLowerCase() === currentUser.email.toLowerCase()) {
          return {
            ...c,
            ordersCount: c.ordersCount + 1,
            totalSpent: c.totalSpent + finalAmount
          };
        }
        return c;
      }));
    }

    // Trigger Notifications
    addNotification(
      'Order Placed successfully!',
      `Thank you for shopping at PPBASKET. Order ID: ${newOrder.id}. We will process it shortly.`,
      'order'
    );

    // Clear cart and coupons
    setCart([]);
    setActiveCoupon(null);
    return newOrder;
  };

  const cancelOrder = (orderId: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'Cancelled' } : o));
    addNotification('Order Cancelled', `Order ${orderId} has been cancelled successfully.`, 'order');
  };

  // Addresses
  const addAddress = (address: Omit<Address, 'id'>) => {
    const newAddress: Address = {
      ...address,
      id: `addr-${Date.now()}`
    };
    if (newAddress.isDefault) {
      setAddresses(prev => prev.map(a => ({ ...a, isDefault: false })).concat(newAddress));
    } else {
      setAddresses(prev => [...prev, newAddress]);
    }
  };

  const deleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
  };

  const setDefaultAddress = (id: string) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
  };

  // Payment Methods
  const addPaymentMethod = (method: Omit<PaymentMethod, 'id'>) => {
    const newMethod: PaymentMethod = {
      ...method,
      id: `pay-${Date.now()}`
    };
    if (newMethod.isDefault) {
      setPaymentMethods(prev => prev.map(p => ({ ...p, isDefault: false })).concat(newMethod));
    } else {
      setPaymentMethods(prev => [...prev, newMethod]);
    }
  };

  const deletePaymentMethod = (id: string) => {
    setPaymentMethods(prev => prev.filter(p => p.id !== id));
  };

  const setDefaultPaymentMethod = (id: string) => {
    setPaymentMethods(prev => prev.map(p => ({ ...p, isDefault: p.id === id })));
  };

  // Notifications
  const addNotification = (title: string, message: string, type: Notification['type']) => {
    const newNotif: Notification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      title,
      message,
      date: new Date().toISOString().split('T')[0],
      isRead: false,
      type
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Theme Toggler
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Live Chat Smart Simulation
  const sendChatMessage = (text: string) => {
    if (!text.trim()) return;
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { sender: 'user', text, time: timeString };

    setChatMessages(prev => [...prev, userMsg]);

    // Simulate smart support response
    setTimeout(() => {
      let reply = "I'm not sure about that. Let me connect you with a WhatsApp representative!";
      const cleanText = text.toLowerCase();

      if (cleanText.includes('offer') || cleanText.includes('discount') || cleanText.includes('coupon')) {
        reply = "Currently, you can use coupon 'PPBASKET10' to get 10% OFF on all products above ₹999! Or 'FESTIVE500' to get flat ₹500 off on purchases above ₹4,999.";
      } else if (cleanText.includes('delivery') || cleanText.includes('shipping')) {
        reply = "We offer lightning-fast delivery! Most cities in India receive orders within 2 to 4 working days, with next-day shipping available on selected items.";
      } else if (cleanText.includes('return') || cleanText.includes('refund')) {
        reply = "We offer a hassle-free 7-day return policy! If you are not satisfied with your purchase, you can raise a refund/return request directly from your dashboard.";
      } else if (cleanText.includes('order') || cleanText.includes('track')) {
        reply = `You can view all order progress on your PPBASKET dashboard under 'My Orders'. If you have a placed order, it tracks visually through our premium pipeline!`;
      } else if (cleanText.includes('payment') || cleanText.includes('pay') || cleanText.includes('upi')) {
        reply = "We support multiple secure payment modes including UPI (GPay, PhonePe, Paytm), Credit/Debit Cards, Net Banking, and Cash On Delivery (COD).";
      } else if (cleanText.includes('admin')) {
        reply = "Yes! To access our Admin Panel, simply log in using the email 'pgore6742@gmail.com' or click the Admin Mode button on your account tab.";
      } else if (cleanText.includes('hello') || cleanText.includes('hi') || cleanText.includes('hey')) {
        reply = "Hello there! Happy shopping with PPBASKET! I can assist you with product suggestions, coupons, or order status. What are you looking to buy today?";
      }

      setChatMessages(prev => [...prev, { sender: 'bot', text: reply, time: timeString }]);
    }, 1000);
  };

  // Admin Controls
  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    addNotification('Order Status Updated', `Your Order ${orderId} has been updated to: ${status}.`, 'order');
  };

  const updateProductStock = (productId: string, stockCount: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return {
          ...p,
          stockCount,
          stockStatus: stockCount === 0 ? 'Out of Stock' : stockCount <= 5 ? 'Low Stock' : 'In Stock'
        };
      }
      return p;
    }));
  };

  return (
    <AppContext.Provider value={{
      activePage,
      setActivePage,
      selectedProduct,
      viewProductDetail,
      products,
      setProducts,
      banners,
      setBanners,
      coupons,
      setCoupons,
      reviews,
      setReviews,
      searchQuery,
      setSearchQuery,
      searchSuggestions,
      selectedCategory,
      setSelectedCategory,
      selectedBrand,
      setSelectedBrand,
      priceRange,
      setPriceRange,
      selectedRating,
      setSelectedRating,
      sortBy,
      setSortBy,
      resetFilters,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      activeCoupon,
      applyCoupon,
      removeCoupon,
      wishlist,
      toggleWishlist,
      isInWishlist,
      compareList,
      toggleCompare,
      isInCompare,
      clearCompare,
      recentlyViewed,
      addToRecentlyViewed,
      currentUser,
      loginUser,
      logoutUser,
      orders,
      placeOrder,
      cancelOrder,
      addresses,
      addAddress,
      deleteAddress,
      setDefaultAddress,
      paymentMethods,
      addPaymentMethod,
      deletePaymentMethod,
      setDefaultPaymentMethod,
      notifications,
      addNotification,
      markNotificationRead,
      clearAllNotifications,
      theme,
      toggleTheme,
      language,
      setLanguage,
      voiceSearchActive,
      setVoiceSearchActive,
      chatOpen,
      setChatOpen,
      chatMessages,
      sendChatMessage,
      quickViewProduct,
      setQuickViewProduct,
      adminCustomers,
      setAdminCustomers,
      updateOrderStatus,
      updateProductStock
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
