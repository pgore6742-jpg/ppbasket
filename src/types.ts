export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  originalPrice: number;
  price: number;
  discountPercentage: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  description: string;
  specs: Record<string, string>;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  stockCount: number;
  deliveryTime: string;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isDeal?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Review {
  id: string;
  productId: string;
  productName?: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  approved: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  discountApplied: number;
  finalAmount: number;
  shippingAddress: Address;
  paymentMethod: string;
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  status: 'Order Placed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  date: string;
  trackingNumber: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'UPI' | 'Card' | 'COD' | 'NetBanking';
  cardLabel?: string; // e.g., "HDFC Visa Ending in 4321"
  upiId?: string;
  isDefault: boolean;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  minPurchase: number;
  description: string;
  isActive: boolean;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  ordersCount: number;
  totalSpent: number;
  joinDate: string;
  status: 'Active' | 'Suspended';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  type: 'info' | 'order' | 'deal' | 'general';
}

export interface Banner {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  linkText: string;
  category: string;
  isActive: boolean;
}
