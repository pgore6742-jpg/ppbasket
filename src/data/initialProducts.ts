import { Product, Coupon, Banner } from '../types';

export const initialProducts: Product[] = [
  {
    id: 'prod-mob-1',
    name: 'Realme GT 6T 5G (Razor Green, 12GB RAM, 256GB Storage)',
    category: 'Mobiles',
    brand: 'Realme',
    originalPrice: 35999,
    price: 30999,
    discountPercentage: 14,
    rating: 4.5,
    reviewsCount: 1240,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1565630916779-e303be97b6f5?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'The Realme GT 6T features the powerful Snapdragon 7+ Gen 3 Processor, a stunning 1.5K 120Hz LTPO AMOLED Display, and blazing-fast 120W SUPERVOOC charging. Capture your moments with the 50MP Sony LYT-600 OIS main camera.',
    specs: {
      'Processor': 'Snapdragon 7+ Gen 3',
      'RAM': '12 GB LPDDR5X',
      'Storage': '256 GB UFS 4.0',
      'Battery': '5500 mAh with 120W Charging',
      'Camera': '50MP OIS + 8MP Wide | 32MP Front',
      'Display': '6.78-inch LTPO AMOLED, 120Hz, 6000 nits Peak'
    },
    stockStatus: 'In Stock',
    stockCount: 45,
    deliveryTime: '2-3 Days',
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: 'prod-elec-1',
    name: 'Noise Buds VS104 Truly Wireless Earbuds with 45H Playtime',
    category: 'Electronics',
    brand: 'Noise',
    originalPrice: 2999,
    price: 1299,
    discountPercentage: 57,
    rating: 4.2,
    reviewsCount: 8520,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Instantly connect and immerse yourself in pure sound with Noise Buds VS104. Offering up to 45 hours of total playtime, Instacharge (10 min charge = 200 min playtime), and a 13.4mm speaker driver for deep, powerful bass.',
    specs: {
      'Playtime': 'Up to 45 Hours with Case',
      'Driver Size': '13.4 mm',
      'Bluetooth Version': '5.2',
      'Charging Port': 'Type-C, Instacharge',
      'IPX Rating': 'IPX5 Water Resistant'
    },
    stockStatus: 'In Stock',
    stockCount: 120,
    deliveryTime: '1-2 Days',
    isDeal: true
  },
  {
    id: 'prod-fash-1',
    name: 'Anubhuti Women Ethnic Motifs Printed Pure Cotton Kurta Set',
    category: 'Fashion',
    brand: 'Anubhuti',
    originalPrice: 2499,
    price: 899,
    discountPercentage: 64,
    rating: 4.4,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Elevate your daily ethnic look with this beautiful printed pure cotton kurta with trousers and dupatta. Styled with keyhole neck and three-quarter regular sleeves, this straight calf-length kurta is perfect for daily wear or casual gatherings.',
    specs: {
      'Fabric': '100% Cotton',
      'Pattern': 'Ethnic Motifs',
      'Fit': 'Straight',
      'Sleeve Length': 'Three-Quarter Sleeves',
      'Care': 'Hand Wash Cold'
    },
    stockStatus: 'In Stock',
    stockCount: 32,
    deliveryTime: '3-4 Days',
    isNewArrival: true
  },
  {
    id: 'prod-wat-1',
    name: 'Fastrack Limitless FS1 Smartwatch with 1.95" Horizon Curve Display',
    category: 'Watches',
    brand: 'Fastrack',
    originalPrice: 3995,
    price: 1999,
    discountPercentage: 50,
    rating: 4.1,
    reviewsCount: 1450,
    image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Fastrack Limitless FS1 features the largest 1.95" curved display with 320x385 pixel resolution, built-in BT Calling, 100+ sports modes, 150+ watch faces, and health monitors like Stress Monitor, 24x7 Heart Rate, and SpO2 Tracker.',
    specs: {
      'Display Size': '1.95-inch Ultra Curved Horizon Display',
      'Connectivity': 'Bluetooth Calling with Single Sync',
      'Sports Modes': '100+ Sports Modes',
      'Battery Life': 'Up to 7 Days (typical usage)',
      'Health Tracking': 'Heart Rate, SpO2, Stress Tracker, Sleep Tracker'
    },
    stockStatus: 'In Stock',
    stockCount: 68,
    deliveryTime: '2-3 Days',
    isFeatured: true
  },
  {
    id: 'prod-groc-1',
    name: 'Happilo Premium International Queen Almonds (Pack of 1, 500g)',
    category: 'Grocery',
    brand: 'Happilo',
    originalPrice: 650,
    price: 499,
    discountPercentage: 23,
    rating: 4.6,
    reviewsCount: 4580,
    image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Happilo premium raw California almonds are uniform in size, crunchy, and packed with nutrients. High in fiber, protein, and healthy fats, these nuts are excellent for daily snacking, baking, and brain health.',
    specs: {
      'Weight': '500 grams',
      'Shelf Life': '6 Months',
      'Container': 'Resealable Zip Lock Pouch',
      'Ingredients': 'Raw California Almonds',
      'Nutrients': 'Rich in Vitamin E, Magnesium, Fiber'
    },
    stockStatus: 'In Stock',
    stockCount: 250,
    deliveryTime: 'Next Day',
    isBestSeller: true
  },
  {
    id: 'prod-kit-1',
    name: 'Pigeon Amaze Plus 1.5 Litre Electric Kettle (1500 Watt, Silver/Black)',
    category: 'Home & Kitchen',
    brand: 'Pigeon',
    originalPrice: 1195,
    price: 649,
    discountPercentage: 46,
    rating: 4.0,
    reviewsCount: 15480,
    image: 'https://images.unsplash.com/photo-1578643463396-0997cb5328c1?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1578643463396-0997cb5328c1?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Boil water within minutes with the Pigeon Amaze Plus Electric Kettle. It features a sleek stainless steel body, 1.5L capacity, 1500W rapid heating elements, 360-degree swivel base, and auto shut-off safety protection.',
    specs: {
      'Capacity': '1.5 Litres',
      'Power Consumption': '1500 Watts',
      'Material': 'Stainless Steel',
      'Auto Shut-off': 'Yes',
      'Base Type': '360° Swivel Base'
    },
    stockStatus: 'In Stock',
    stockCount: 89,
    deliveryTime: '1-2 Days',
    isDeal: true
  },
  {
    id: 'prod-beau-1',
    name: 'The Derma Co 2% Salicylic Acid Face Serum (30ml) for Acne',
    category: 'Beauty',
    brand: 'The Derma Co',
    originalPrice: 499,
    price: 419,
    discountPercentage: 16,
    rating: 4.3,
    reviewsCount: 3820,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Say goodbye to active acne with 2% Salicylic Acid. Formulated with Witch Hazel and Willow Bark, it penetrates deep into skin pores to dissolve excess sebum, dead skin cells, and impurities, leading to clear, spot-free skin.',
    specs: {
      'Volume': '30 ml',
      'Active Ingredients': '2% Salicylic Acid, Witch Hazel',
      'Skin Type': 'Oily, Acne-Prone Skin',
      'Sulfate Free': 'Yes',
      'Paraben Free': 'Yes'
    },
    stockStatus: 'In Stock',
    stockCount: 42,
    deliveryTime: '2-3 Days',
    isNewArrival: true
  },
  {
    id: 'prod-spt-1',
    name: 'Nivia Storm Football - Size 5, High-Contrast Rubber Exterior',
    category: 'Sports & Fitness',
    brand: 'Nivia',
    originalPrice: 599,
    price: 449,
    discountPercentage: 25,
    rating: 4.2,
    reviewsCount: 2240,
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Nivia Storm is a heavy-duty rubber football stitched with precision. Designed with high-contrast graphics for maximum visibility, it has a robust carcass that holds its shape and delivers excellent control on dry and grassy pitches.',
    specs: {
      'Size': 'Size 5 (Official)',
      'Material': 'Premium Rubber Compound',
      'Construction': '32 Panel Hand Stitched',
      'Ideal For': 'Training and Recreational Matches',
      'Age Group': '12 Years & Above'
    },
    stockStatus: 'In Stock',
    stockCount: 15,
    deliveryTime: '3-5 Days'
  },
  {
    id: 'prod-toy-1',
    name: 'Fisher-Price Rock-a-Stack Baby Ring Stacking Toy',
    category: 'Toys',
    brand: 'Fisher-Price',
    originalPrice: 399,
    price: 349,
    discountPercentage: 12,
    rating: 4.7,
    reviewsCount: 9100,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'The Fisher-Price Rock-a-Stack toy lets babies sort and stack five colorful rings of varying sizes, finishing with a shiny red ring filled with rattling beads. Builds dexterity, hand-eye coordination, and problem-solving skills.',
    specs: {
      'Age Range': '6 Months & Above',
      'Material': '100% BPA-Free Child-Safe Plastic',
      'Number of Rings': '5 Rings + 1 Rocking Base',
      'Benefits': 'Fine Motor Skills, Sensory Stimulation'
    },
    stockStatus: 'In Stock',
    stockCount: 18,
    deliveryTime: '2-3 Days'
  },
  {
    id: 'prod-bag-1',
    name: 'Skybags Brat Black 34L Casual Backpack with Bottle Holder',
    category: 'Bags',
    brand: 'Skybags',
    originalPrice: 2100,
    price: 1199,
    discountPercentage: 43,
    rating: 4.3,
    reviewsCount: 3120,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Skybags Brat is a lightweight, stylish casual backpack made of highly durable polyester. Features 3 spacious compartments, 1 quick-access front pocket, padded shoulder straps, and a side mesh pocket for water bottles.',
    specs: {
      'Capacity': '34 Litres',
      'Material': 'Water-resistant Polyester',
      'Compartments': '3 main compartments + 1 front pocket',
      'Dimensions': '46 cm x 32 cm x 20 cm',
      'Weight': '420 grams'
    },
    stockStatus: 'Low Stock',
    stockCount: 5,
    deliveryTime: '2-4 Days',
    isBestSeller: true
  },
  {
    id: 'prod-furn-1',
    name: 'Nilkamal Freedom Premium Mini Plastic Wardrobe (Weather Brown)',
    category: 'Furniture',
    brand: 'Nilkamal',
    originalPrice: 4200,
    price: 3199,
    discountPercentage: 23,
    rating: 4.1,
    reviewsCount: 810,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'A multi-purpose plastic storage cabinet/wardrobe that resists rust, corrosion, and termites. Perfect for organizing household items, books, clothes, or children\'s toys in any room.',
    specs: {
      'Material': 'High-Quality Polypropylene',
      'Dimensions': '35.5 cm x 59 cm x 123 cm',
      'Shelves': '4 adjustable compartments',
      'Assembly': 'DIY (Do It Yourself instructions included)',
      'Weight Capacity': 'Up to 20kg per shelf'
    },
    stockStatus: 'In Stock',
    stockCount: 12,
    deliveryTime: '4-7 Days'
  },
  {
    id: 'prod-pet-1',
    name: 'Pedigree Adult Dry Dog Food (Chicken & Vegetables, 3kg Pack)',
    category: 'Pet Supplies',
    brand: 'Pedigree',
    originalPrice: 850,
    price: 799,
    discountPercentage: 6,
    rating: 4.5,
    reviewsCount: 5690,
    image: 'https://images.unsplash.com/photo-1589722244358-9c71cfdb05f8?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1589722244358-9c71cfdb05f8?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Pedigree complete nutrition dry dog food contains high-quality proteins for strong muscles, dietary fiber for digestive health, and essential minerals like zinc + Omega 6 for a shiny coat.',
    specs: {
      'Weight': '3 kg',
      'Flavour': 'Chicken & Vegetables',
      'Life Stage': 'Adult (1+ years)',
      'Shelf Life': '12 Months',
      'Key Benefits': 'Strong Immunity, Healthy Skin & Coat'
    },
    stockStatus: 'In Stock',
    stockCount: 88,
    deliveryTime: '2-3 Days',
    isBestSeller: true
  }
];

export const initialCoupons: Coupon[] = [
  {
    code: 'PPBASKET10',
    discountType: 'percentage',
    value: 10,
    minPurchase: 999,
    description: 'Get 10% OFF on orders above ₹999',
    isActive: true
  },
  {
    code: 'FESTIVE500',
    discountType: 'fixed',
    value: 500,
    minPurchase: 4999,
    description: 'Flat ₹500 OFF on orders above ₹4,999',
    isActive: true
  },
  {
    code: 'FREEWELCOME',
    discountType: 'percentage',
    value: 15,
    minPurchase: 499,
    description: 'Special 15% OFF for new users on orders above ₹499',
    isActive: true
  }
];

export const initialBanners: Banner[] = [
  {
    id: 'ban-1',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    title: 'The Ultimate Shopping Carnival',
    subtitle: 'Get up to 70% OFF on Top Brands across all major categories!',
    linkText: 'Shop the Sale',
    category: 'Fashion',
    isActive: true
  },
  {
    id: 'ban-2',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1200&q=80',
    title: 'Upgrade Your Electronics',
    subtitle: 'Flat discounts on Mobiles, Truly Wireless Earbuds & smartwatches.',
    linkText: 'View Hot Deals',
    category: 'Electronics',
    isActive: true
  },
  {
    id: 'ban-3',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
    title: 'Premium Grocery & Essentials',
    subtitle: 'Next-day shipping on daily nutrition, dry fruits, and spices.',
    linkText: 'Stock Up Now',
    category: 'Grocery',
    isActive: true
  }
];
