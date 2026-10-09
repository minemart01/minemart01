import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Banner,
  CategorySlug,
  User,
  Address,
  CartItem,
  Order,
  Coupon,
  Review,
  AffiliateClickLog,
  OrderStatus,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_BANNERS,
  INITIAL_COUPONS,
  INITIAL_USER,
  INITIAL_ADMIN_USER,
  INITIAL_ORDERS,
  INITIAL_REVIEWS,
} from '../data/initialData';

interface FilterState {
  category: CategorySlug;
  subCategory?: string;
  minPrice?: number;
  maxPrice?: number;
  brands: string[];
  sizes: string[];
  colors: string[];
  minRating?: number;
  productType: 'all' | 'direct' | 'affiliate';
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';
  searchQuery: string;
}

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface StoreContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => Product;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;

  // Banners
  banners: Banner[];
  addBanner: (banner: Omit<Banner, 'id'>) => void;
  updateBanner: (id: string, banner: Partial<Banner>) => void;
  deleteBanner: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Auth & User
  currentUser: User | null;
  isAdmin: boolean;
  login: (email: string, role?: 'admin' | 'customer') => boolean;
  logout: () => void;
  signup: (name: string, email: string, phone?: string) => void;
  updateUserProfile: (profile: Partial<User>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  removeAddress: (addressId: string) => void;
  setDefaultAddress: (addressId: string) => void;

  // Orders
  orders: Order[];
  placeOrder: (params: {
    address: Address;
    paymentMethod: 'card' | 'upi' | 'netbanking' | 'cod';
    couponCode?: string;
    phone?: string;
  }) => Order;
  cancelOrder: (orderId: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrderById: (orderId: string) => Order | undefined;

  // Coupons
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (code: string) => void;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  getProductReviews: (productId: string) => Review[];

  // Affiliate logs
  affiliateLogs: AffiliateClickLog[];
  logAffiliateClick: (product: Product) => void;

  // Navigation & Filtering
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  activeView: 'home' | 'catalog' | 'product-detail' | 'cart' | 'checkout' | 'order-confirmation' | 'tracking' | 'profile' | 'wishlist' | 'admin';
  setActiveView: (view: StoreContextType['activeView']) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedOrderId: string | null;
  setSelectedOrderId: (id: string | null) => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Reset to seed
  resetCatalogToDemo: () => void;
}

const DEFAULT_FILTERS: FilterState = {
  category: 'all',
  brands: [],
  sizes: [],
  colors: [],
  productType: 'all',
  sortBy: 'featured',
  searchQuery: '',
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from localStorage or initial seed
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('minemart_products_v2');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [banners, setBanners] = useState<Banner[]>(() => {
    try {
      const saved = localStorage.getItem('minemart_banners_v2');
      return saved ? JSON.parse(saved) : INITIAL_BANNERS;
    } catch {
      return INITIAL_BANNERS;
    }
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('minemart_user_v2');
      return saved ? JSON.parse(saved) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('minemart_cart_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('minemart_wishlist_v2');
      return saved ? JSON.parse(saved) : ['prod-102', 'prod-104'];
    } catch {
      return ['prod-102', 'prod-104'];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('minemart_orders_v2');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem('minemart_coupons_v2');
      return saved ? JSON.parse(saved) : INITIAL_COUPONS;
    } catch {
      return INITIAL_COUPONS;
    }
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('minemart_reviews_v2');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [affiliateLogs, setAffiliateLogs] = useState<AffiliateClickLog[]>(() => {
    try {
      const saved = localStorage.getItem('minemart_affiliate_logs_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI state
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [activeView, setActiveView] = useState<StoreContextType['activeView']>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync back to localStorage
  useEffect(() => {
    localStorage.setItem('minemart_products_v2', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('minemart_banners_v2', JSON.stringify(banners));
  }, [banners]);

  useEffect(() => {
    localStorage.setItem('minemart_user_v2', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('minemart_cart_v2', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('minemart_wishlist_v2', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('minemart_orders_v2', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('minemart_coupons_v2', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('minemart_reviews_v2', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('minemart_affiliate_logs_v2', JSON.stringify(affiliateLogs));
  }, [affiliateLogs]);

  // Toast feedback helper
  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Product management
  const addProduct = (newProd: Omit<Product, 'id' | 'createdAt'>): Product => {
    const created: Product = {
      ...newProd,
      id: 'prod-' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setProducts((prev) => [created, ...prev]);
    addToast(`Added "${created.title}" to catalog`);
    return created;
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
    addToast('Product updated successfully');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addToast('Product removed from catalog', 'info');
  };

  const getProductById = (id: string) => products.find((p) => p.id === id);

  // Banner management
  const addBanner = (b: Omit<Banner, 'id'>) => {
    const created: Banner = { ...b, id: 'b-' + Date.now() };
    setBanners((prev) => [...prev, created]);
    addToast('New promotional banner created');
  };

  const updateBanner = (id: string, updated: Partial<Banner>) => {
    setBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updated } : b))
    );
    addToast('Banner updated');
  };

  const deleteBanner = (id: string) => {
    setBanners((prev) => prev.filter((b) => b.id !== id));
    addToast('Banner removed', 'info');
  };

  // Cart operations
  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    if (!product.isDirectSale) {
      addToast('External partner items cannot be added to local cart', 'error');
      return;
    }

    const cartItemId = `${product.id}-${size}-${color}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          product,
          quantity,
          selectedSize: size,
          selectedColor: color,
        },
      ];
    });
    addToast(`Added ${product.title} (${size}) to your bag`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    addToast('Item removed from bag', 'info');
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        addToast('Removed from wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        addToast('Saved to wishlist');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // Auth
  const isAdmin = currentUser?.role === 'admin';

  const login = (email: string, role: 'admin' | 'customer' = 'customer'): boolean => {
    if (role === 'admin' || email.toLowerCase().includes('admin')) {
      setCurrentUser(INITIAL_ADMIN_USER);
      addToast('Logged in as MineMart Administrator');
      return true;
    }

    const matchedUser: User = {
      id: 'usr-' + Date.now(),
      name: email.split('@')[0].replace('.', ' '),
      email,
      role: 'customer',
      addresses: INITIAL_USER.addresses,
    };
    setCurrentUser(matchedUser);
    addToast(`Welcome back, ${matchedUser.name}!`);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    addToast('Logged out of MineMart', 'info');
  };

  const signup = (name: string, email: string, phone?: string) => {
    const newUser: User = {
      id: 'usr-' + Date.now(),
      name,
      email,
      phone,
      role: 'customer',
      addresses: [],
    };
    setCurrentUser(newUser);
    addToast(`Account created! Welcome to MineMart, ${name}`);
  };

  const updateUserProfile = (profile: Partial<User>) => {
    if (!currentUser) return;
    setCurrentUser({ ...currentUser, ...profile });
    addToast('Profile updated');
  };

  const addAddress = (addr: Omit<Address, 'id'>) => {
    if (!currentUser) return;
    const newAddr: Address = {
      ...addr,
      id: 'addr-' + Date.now(),
      isDefault: currentUser.addresses.length === 0,
    };
    setCurrentUser({
      ...currentUser,
      addresses: [...currentUser.addresses, newAddr],
    });
    addToast('New address saved');
  };

  const removeAddress = (addressId: string) => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      addresses: currentUser.addresses.filter((a) => a.id !== addressId),
    });
    addToast('Address removed', 'info');
  };

  const setDefaultAddress = (addressId: string) => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      addresses: currentUser.addresses.map((a) => ({
        ...a,
        isDefault: a.id === addressId,
      })),
    });
    addToast('Default address updated');
  };

  // Coupons
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code === cleanCode && c.active);
    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code' };
    }
    if (cartTotal < found.minOrderAmount) {
      return {
        success: false,
        message: `Coupon requires minimum order of $${found.minOrderAmount}`,
      };
    }
    setAppliedCoupon(found);
    addToast(`Coupon "${found.code}" applied! Save ${found.discountPercent}%`);
    return { success: true, message: `Applied ${found.discountPercent}% discount` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon removed', 'info');
  };

  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [...prev, coupon]);
    addToast(`Coupon code ${coupon.code} created`);
  };

  const deleteCoupon = (code: string) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
    if (appliedCoupon?.code === code) setAppliedCoupon(null);
    addToast('Coupon deleted', 'info');
  };

  // Orders
  const placeOrder = ({
    address,
    paymentMethod,
    couponCode,
    phone,
  }: {
    address: Address;
    paymentMethod: 'card' | 'upi' | 'netbanking' | 'cod';
    couponCode?: string;
    phone?: string;
  }): Order => {
    const discountAmount = appliedCoupon ? (cartTotal * appliedCoupon.discountPercent) / 100 : 0;
    const shippingFee = cartTotal > 150 ? 0 : 15;
    const finalTotal = Math.max(0, cartTotal - discountAmount + shippingFee);

    const orderNum = 'MM-' + Math.floor(1000 + Math.random() * 9000) + '-' + new Date().toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const nowISO = new Date().toISOString();
    const formattedNow = new Date().toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber: orderNum,
      userId: currentUser?.id || 'guest',
      customerName: address.fullName || currentUser?.name || 'Valued Customer',
      customerEmail: currentUser?.email || 'customer@minemart.com',
      customerPhone: phone || address.phone || currentUser?.phone || '+1 (555) 000-0000',
      items: cart.map((item) => ({
        productId: item.productId,
        productTitle: item.product.title,
        brand: item.product.brand,
        image: item.product.images[0],
        price: item.product.price,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
      })),
      subtotal: cartTotal,
      discount: discountAmount,
      couponCode: couponCode || appliedCoupon?.code,
      shippingFee,
      total: Number(finalTotal.toFixed(2)),
      shippingAddress: address,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      orderStatus: 'placed',
      createdAt: nowISO,
      trackingMilestones: [
        {
          status: 'placed',
          title: 'Order Placed & Verified',
          timestamp: formattedNow,
          description: `Order successfully recorded. Payment mode: ${paymentMethod.toUpperCase()}.`,
          completed: true,
        },
        {
          status: 'processing',
          title: 'Packaging at MineMart Logistics',
          timestamp: 'Pending fulfillment',
          description: 'Items are scheduled for boutique packaging and barcode verification.',
          completed: false,
        },
        {
          status: 'shipped',
          title: 'Dispatched with Courier',
          timestamp: 'Estimated 24-48 hrs',
          description: 'Package handed over to shipping carrier partner.',
          completed: false,
        },
        {
          status: 'out_for_delivery',
          title: 'Out for Final Delivery',
          timestamp: 'Estimated 3-5 days',
          description: 'Courier agent arrives at delivery location.',
          completed: false,
        },
        {
          status: 'delivered',
          title: 'Order Delivered',
          timestamp: 'Estimated 3-5 days',
          description: 'Package delivered to recipient.',
          completed: false,
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setAppliedCoupon(null);
    setSelectedOrderId(newOrder.id);
    setActiveView('order-confirmation');
    addToast(`Order ${newOrder.orderNumber} placed successfully!`);
    return newOrder;
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              orderStatus: 'cancelled',
              trackingMilestones: [
                ...o.trackingMilestones,
                {
                  status: 'cancelled',
                  title: 'Order Cancelled',
                  timestamp: new Date().toLocaleString(),
                  description: 'Order was cancelled per customer or administrative request.',
                  completed: true,
                },
              ],
            }
          : o
      )
    );
    addToast('Order cancelled', 'info');
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const nowStr = new Date().toLocaleString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
        const updatedMilestones = o.trackingMilestones.map((m) => {
          if (m.status === status) {
            return { ...m, completed: true, timestamp: nowStr };
          }
          return m;
        });
        return {
          ...o,
          orderStatus: status,
          trackingMilestones: updatedMilestones,
        };
      })
    );
    addToast(`Order status updated to ${status}`);
  };

  const getOrderById = (orderId: string) => orders.find((o) => o.id === orderId);

  // Reviews
  const addReview = (review: Omit<Review, 'id' | 'date'>) => {
    const newRev: Review = {
      ...review,
      id: 'rev-' + Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    };
    setReviews((prev) => [newRev, ...prev]);
    // update product rating stats
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== review.productId) return p;
        const total = p.rating * p.reviewCount + review.rating;
        const newCount = p.reviewCount + 1;
        return {
          ...p,
          reviewCount: newCount,
          rating: Number((total / newCount).toFixed(1)),
        };
      })
    );
    addToast('Thank you! Your verified review has been posted.');
  };

  const getProductReviews = (productId: string) => reviews.filter((r) => r.productId === productId);

  // Affiliate Outbound Tracking
  const logAffiliateClick = (product: Product) => {
    if (!product.externalPartner) return;
    const entry: AffiliateClickLog = {
      id: 'aff-' + Date.now(),
      productId: product.id,
      productTitle: product.title,
      partnerName: product.externalPartner.name,
      partnerUrl: product.externalPartner.url,
      timestamp: new Date().toISOString(),
    };
    setAffiliateLogs((prev) => [entry, ...prev]);
  };

  // Reset demo catalog
  const resetCatalogToDemo = () => {
    setProducts(INITIAL_PRODUCTS);
    setBanners(INITIAL_BANNERS);
    setCoupons(INITIAL_COUPONS);
    setReviews(INITIAL_REVIEWS);
    setOrders(INITIAL_ORDERS);
    localStorage.removeItem('minemart_products_v2');
    localStorage.removeItem('minemart_banners_v2');
    localStorage.removeItem('minemart_coupons_v2');
    localStorage.removeItem('minemart_reviews_v2');
    localStorage.removeItem('minemart_orders_v2');
    addToast('MineMart catalog restored to default demo state');
  };

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        banners,
        addBanner,
        updateBanner,
        deleteBanner,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        wishlist,
        toggleWishlist,
        isWishlisted,
        currentUser,
        isAdmin,
        login,
        logout,
        signup,
        updateUserProfile,
        addAddress,
        removeAddress,
        setDefaultAddress,
        orders,
        placeOrder,
        cancelOrder,
        updateOrderStatus,
        getOrderById,
        coupons,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        addCoupon,
        deleteCoupon,
        reviews,
        addReview,
        getProductReviews,
        affiliateLogs,
        logAffiliateClick,
        filters,
        setFilters,
        resetFilters,
        activeView,
        setActiveView,
        selectedProductId,
        setSelectedProductId,
        selectedOrderId,
        setSelectedOrderId,
        toasts,
        addToast,
        removeToast,
        resetCatalogToDemo,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
