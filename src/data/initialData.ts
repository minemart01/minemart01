import { Product, Banner, CategoryInfo, Coupon, Order, User, Review } from '../types';

export const INITIAL_BANNERS: Banner[] = [
  {
    id: 'b-1',
    title: 'The Autumn Silhouette',
    subtitle: 'Curated outerwear and modern tailoring designed for seamless seasonal transitions.',
    tag: 'Capsule Edition',
    image: '/src/assets/images/hero_fashion_editorial_1791391868816.jpg',
    linkCategory: 'men',
    ctaText: 'Explore Collection',
    active: true,
  },
  {
    id: 'b-2',
    title: 'Artisan Leather & Accents',
    subtitle: 'Hand-finished accessories, sculpted handbags, and timeless personal accents.',
    tag: 'New Atelier Release',
    image: '/src/assets/images/banner_summer_capsule_1791391953514.jpg',
    linkCategory: 'accessories',
    ctaText: 'Discover Accents',
    active: true,
  },
  {
    id: 'b-3',
    title: 'Fluid Silk & Evening Dresses',
    subtitle: 'Effortless drape and architectural pleats for contemporary celebrations.',
    tag: 'Exclusive Atelier',
    image: '/src/assets/images/product_womens_silk_dress_1791391911188.jpg',
    linkCategory: 'women',
    ctaText: 'Shop Dresses',
    active: true,
  },
];

export const INITIAL_CATEGORIES: CategoryInfo[] = [
  {
    slug: 'men',
    name: 'Men',
    description: 'Relaxed tailoring, structured blazers, raw denims, and clean essentials.',
    image: '/src/assets/images/product_mens_linen_jacket_1791391886873.jpg',
    itemCount: 8,
  },
  {
    slug: 'women',
    name: 'Women',
    description: 'Silk gowns, pleated midi skirts, architectural knitwear, and evening sets.',
    image: '/src/assets/images/product_womens_silk_dress_1791391911188.jpg',
    itemCount: 9,
  },
  {
    slug: 'footwear',
    name: 'Footwear',
    description: 'Italian leather sneakers, Goodyear welted derbies, and minimalist sandals.',
    image: '/src/assets/images/product_footwear_leather_sneakers_1791391938169.jpg',
    itemCount: 6,
  },
  {
    slug: 'accessories',
    name: 'Accessories',
    description: 'Handcrafted leather tote bags, sculptural brass jewelry, and silk foulards.',
    image: '/src/assets/images/banner_summer_capsule_1791391953514.jpg',
    itemCount: 7,
  },
  {
    slug: 'kids',
    name: 'Kids',
    description: 'Soft organic cotton basics, knit rompers, and comfortable playwear.',
    image: '/src/assets/images/hero_fashion_editorial_1791391868816.jpg',
    itemCount: 4,
  },
];

// Products are now managed in the dedicated beginner-friendly file: src/data/products.ts
export { INITIAL_PRODUCTS, PRODUCTS } from './products';

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'MINEMART10',
    discountPercent: 10,
    minOrderAmount: 50,
    description: '10% off on all direct MineMart apparel and footwear orders above $50',
    active: true,
  },
  {
    code: 'LUXURY20',
    discountPercent: 20,
    minOrderAmount: 200,
    description: '20% off on premium collection purchases over $200',
    active: true,
  },
  {
    code: 'WELCOME15',
    discountPercent: 15,
    minOrderAmount: 75,
    description: 'Welcome benefit: 15% discount for new customers',
    active: true,
  },
];

export const INITIAL_USER: User = {
  id: 'usr-1',
  name: 'Vijay Patil',
  email: 'vijayapatil0085@gmail.com',
  phone: '+1 (555) 349-2810',
  role: 'customer',
  addresses: [
    {
      id: 'addr-1',
      fullName: 'Vijay Patil',
      phone: '+1 (555) 349-2810',
      street: '742 Evergreen Terrace, Apt 4B',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94107',
      isDefault: true,
    },
    {
      id: 'addr-2',
      fullName: 'Vijay Patil (Office)',
      phone: '+1 (555) 349-2810',
      street: '100 Montgomery St, Suite 1200',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94104',
      isDefault: false,
    },
  ],
};

export const INITIAL_ADMIN_USER: User = {
  id: 'usr-admin-1',
  name: 'MineMart Head Admin',
  email: 'admin@minemart.com',
  phone: '+1 (555) 888-0199',
  role: 'admin',
  addresses: [],
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-8091',
    orderNumber: 'MM-8091-OCT',
    userId: 'usr-1',
    customerName: 'Vijay Patil',
    customerEmail: 'vijayapatil0085@gmail.com',
    customerPhone: '+1 (555) 349-2810',
    items: [
      {
        productId: 'prod-101',
        productTitle: 'Unstructured Linen-Wool Blend Blazer',
        brand: 'MineMart Atelier',
        image: '/src/assets/images/product_mens_linen_jacket_1791391886873.jpg',
        price: 189,
        quantity: 1,
        selectedSize: '40R',
        selectedColor: 'Oatmeal Beige',
      },
    ],
    subtotal: 189,
    discount: 18.9,
    couponCode: 'MINEMART10',
    shippingFee: 0,
    total: 170.1,
    shippingAddress: {
      id: 'addr-1',
      fullName: 'Vijay Patil',
      phone: '+1 (555) 349-2810',
      street: '742 Evergreen Terrace, Apt 4B',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94107',
      isDefault: true,
    },
    paymentMethod: 'card',
    paymentStatus: 'paid',
    orderStatus: 'shipped',
    createdAt: '2026-10-04T14:32:00Z',
    trackingMilestones: [
      {
        status: 'placed',
        title: 'Order Confirmed',
        timestamp: 'Oct 04, 2026 2:32 PM',
        description: 'Order placed & payment verified through Stripe Secure.',
        completed: true,
      },
      {
        status: 'processing',
        title: 'Hand-packed at MineMart Logistics',
        timestamp: 'Oct 05, 2026 9:15 AM',
        description: 'Item inspected for craftsmanship quality and packaged in biodegradable dust bag.',
        completed: true,
      },
      {
        status: 'shipped',
        title: 'Dispatched with FedEx Express',
        timestamp: 'Oct 06, 2026 11:40 AM',
        description: 'Waybill #FX-9281048 generated. In transit to San Francisco hub.',
        completed: true,
      },
      {
        status: 'out_for_delivery',
        title: 'Out for Final Delivery',
        timestamp: 'Expected Oct 08, 2026',
        description: 'Courier agent will contact recipient before delivery.',
        completed: false,
      },
      {
        status: 'delivered',
        title: 'Delivered',
        timestamp: 'Expected Oct 08, 2026',
        description: 'Delivered to recipient address.',
        completed: false,
      },
    ],
  },
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-101',
    userName: 'Marcus L.',
    rating: 5,
    comment: 'The drape of this linen blazer is exceptional. Breathable yet holds its silhouette gracefully. Wore it to a gallery opening and got constant compliments.',
    date: 'Oct 02, 2026',
    verifiedPurchase: true,
  },
  {
    id: 'rev-2',
    productId: 'prod-101',
    userName: 'David K.',
    rating: 5,
    comment: 'True to size. The horn buttons and clean interior seams demonstrate genuine artisanal tailoring. Fast shipping too.',
    date: 'Sep 28, 2026',
    verifiedPurchase: true,
  },
  {
    id: 'rev-3',
    productId: 'prod-102',
    userName: 'Elena R.',
    rating: 5,
    comment: 'Pure luxury silk. The micro-pleats move like liquid when walking. The olive shade is subtle and sophisticated.',
    date: 'Sep 29, 2026',
    verifiedPurchase: true,
  },
  {
    id: 'rev-4',
    productId: 'prod-103',
    userName: 'Julian T.',
    rating: 5,
    comment: 'Cleanest sneaker silhouette on the market. Italian leather is buttery soft right out of the box with zero blisters.',
    date: 'Sep 19, 2026',
    verifiedPurchase: true,
  },
];
