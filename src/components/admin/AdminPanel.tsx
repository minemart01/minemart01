import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, Banner, Coupon, OrderStatus, CategorySlug } from '../../types';
import {
  ShieldCheck,
  Package,
  Layers,
  ShoppingBag,
  Tag,
  TrendingUp,
  ExternalLink,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  RotateCcw,
  Search,
  Filter,
  Eye,
  Lock,
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    banners,
    addBanner,
    updateBanner,
    deleteBanner,
    orders,
    updateOrderStatus,
    coupons,
    addCoupon,
    deleteCoupon,
    affiliateLogs,
    resetCatalogToDemo,
    currentUser,
    login,
    setActiveView,
  } = useStore();

  const [adminTab, setAdminTab] = useState<
    'overview' | 'products' | 'banners' | 'orders' | 'coupons' | 'affiliates'
  >('overview');

  // Admin authentication state
  const [adminPasscode, setAdminPasscode] = useState('');
  const [authError, setAuthError] = useState(false);

  // Product modal state
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [prodForm, setProdForm] = useState<{
    title: string;
    brand: string;
    category: CategorySlug;
    subCategory: string;
    price: number;
    originalPrice: number;
    discountPercent: number;
    rating: number;
    reviewCount: number;
    images: string;
    description: string;
    fabric: string;
    fit: string;
    care: string;
    origin: string;
    sizes: string;
    colors: string;
    isDirectSale: boolean;
    stock: number;
    partnerName: string;
    partnerUrl: string;
    partnerDisclosure: string;
    isTrending: boolean;
    isNewArrival: boolean;
    isFeatured: boolean;
  }>({
    title: '',
    brand: '',
    category: 'men',
    subCategory: 'Jackets',
    price: 150,
    originalPrice: 190,
    discountPercent: 21,
    rating: 4.8,
    reviewCount: 12,
    images: '/src/assets/images/product_mens_linen_jacket_1791391886873.jpg',
    description: '',
    fabric: '',
    fit: '',
    care: '',
    origin: '',
    sizes: 'S, M, L, XL',
    colors: 'Navy:#1e293b, Cream:#f5f5f0',
    isDirectSale: true,
    stock: 20,
    partnerName: 'Nordstrom Curated Partner',
    partnerUrl: 'https://www.nordstrom.com',
    partnerDisclosure: 'Authorized Partner Listing. Orders processed via authorized retailer.',
    isTrending: true,
    isNewArrival: true,
    isFeatured: true,
  });

  // Banner modal state
  const [bannerModalOpen, setBannerModalOpen] = useState(false);
  const [bannerForm, setBannerForm] = useState<{
    title: string;
    subtitle: string;
    tag: string;
    image: string;
    linkCategory: CategorySlug;
    ctaText: string;
    active: boolean;
  }>({
    title: 'New Seasonal Silhouette',
    subtitle: 'Limited edition tailoring and transitional luxury garments.',
    tag: 'Capsule Drop',
    image: '/src/assets/images/hero_fashion_editorial_1791391868816.jpg',
    linkCategory: 'women',
    ctaText: 'Discover Collection',
    active: true,
  });

  // Coupon modal state
  const [couponModalOpen, setCouponModalOpen] = useState(false);
  const [couponForm, setCouponForm] = useState<{
    code: string;
    discountPercent: number;
    minOrderAmount: number;
    description: string;
  }>({
    code: 'FASHION25',
    discountPercent: 25,
    minOrderAmount: 100,
    description: '25% discount on curated orders over $100',
  });

  // Search within products tab
  const [productSearch, setProductSearch] = useState('');
  const [productTypeFilter, setProductTypeFilter] = useState<'all' | 'direct' | 'affiliate'>('all');

  // Verify Admin Permissions
  const isAdminUser = currentUser?.role === 'admin';

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasscode === 'admin123' || adminPasscode.toLowerCase() === 'admin') {
      login('admin@minemart.com', 'admin');
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleQuickUnlock = () => {
    login('admin@minemart.com', 'admin');
    setAuthError(false);
  };

  // If not logged in as admin, show secure passcode gateway
  if (!isAdminUser) {
    return (
      <div className="max-w-md mx-auto py-20 px-4">
        <div className="bg-white border border-stone-200 rounded-xl p-8 shadow-sm space-y-6 text-center">
          <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-stone-900">
              MineMart Admin Authentication
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Restricted console for merchant catalog control, authorized affiliate feeds, orders, and promotions.
            </p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Admin Password / Passcode
              </label>
              <input
                type="password"
                placeholder="Enter passcode (e.g. admin123)"
                value={adminPasscode}
                onChange={(e) => {
                  setAdminPasscode(e.target.value);
                  setAuthError(false);
                }}
                className="w-full text-xs p-3 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:border-stone-900"
              />
              {authError && (
                <p className="text-[11px] text-rose-600 mt-1 font-medium">
                  Invalid passcode. Use 'admin123' or click the quick unlock button below.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs tracking-wider uppercase rounded"
            >
              Sign In to Admin
            </button>
          </form>

          <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
            <button
              type="button"
              onClick={handleQuickUnlock}
              className="text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 py-2 rounded transition-colors"
            >
              One-Click Evaluation Demo Access
            </button>
            <button
              type="button"
              onClick={() => setActiveView('home')}
              className="text-xs text-stone-500 hover:text-stone-800"
            >
              Return to Storefront
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate Overview Stats
  const totalRevenue = orders.reduce((sum, o) => (o.orderStatus !== 'cancelled' ? sum + o.total : sum), 0);
  const totalDirectProducts = products.filter((p) => p.isDirectSale).length;
  const totalPartnerProducts = products.filter((p) => !p.isDirectSale).length;

  // Filtered Products in Admin Table
  const filteredAdminProducts = products.filter((p) => {
    if (productTypeFilter === 'direct' && !p.isDirectSale) return false;
    if (productTypeFilter === 'affiliate' && p.isDirectSale) return false;
    if (productSearch) {
      const q = productSearch.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.subCategory.toLowerCase().includes(q);
    }
    return true;
  });

  // Handle Edit Product
  const startEditProduct = (prod: Product) => {
    setEditingProductId(prod.id);
    setProdForm({
      title: prod.title,
      brand: prod.brand,
      category: prod.category,
      subCategory: prod.subCategory,
      price: prod.price,
      originalPrice: prod.originalPrice,
      discountPercent: prod.discountPercent,
      rating: prod.rating,
      reviewCount: prod.reviewCount,
      images: prod.images.join(', '),
      description: prod.description,
      fabric: prod.details.fabric || '',
      fit: prod.details.fit || '',
      care: prod.details.care || '',
      origin: prod.details.origin || '',
      sizes: prod.sizes.join(', '),
      colors: prod.colors.map((c) => `${c.name}:${c.hex}`).join(', '),
      isDirectSale: prod.isDirectSale,
      stock: prod.stock,
      partnerName: prod.externalPartner?.name || '',
      partnerUrl: prod.externalPartner?.url || '',
      partnerDisclosure: prod.externalPartner?.disclosureText || '',
      isTrending: prod.isTrending,
      isNewArrival: prod.isNewArrival,
      isFeatured: prod.isFeatured,
    });
    setProductModalOpen(true);
  };

  // Handle Save Product (Create or Update)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedImages = prodForm.images
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const parsedSizes = prodForm.sizes
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const parsedColors = prodForm.colors
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((pair) => {
        const [name, hex] = pair.split(':');
        return { name: name?.trim() || 'Color', hex: hex?.trim() || '#18181b' };
      });

    const calculatedDiscount =
      prodForm.originalPrice > prodForm.price
        ? Math.round(((prodForm.originalPrice - prodForm.price) / prodForm.originalPrice) * 100)
        : 0;

    const payload: Omit<Product, 'id' | 'createdAt'> = {
      title: prodForm.title,
      brand: prodForm.brand,
      category: prodForm.category,
      subCategory: prodForm.subCategory,
      price: Number(prodForm.price),
      originalPrice: Number(prodForm.originalPrice),
      discountPercent: calculatedDiscount,
      rating: Number(prodForm.rating),
      reviewCount: Number(prodForm.reviewCount),
      images: parsedImages.length > 0 ? parsedImages : ['/src/assets/images/product_mens_linen_jacket_1791391886873.jpg'],
      description: prodForm.description,
      details: {
        fabric: prodForm.fabric,
        fit: prodForm.fit,
        care: prodForm.care,
        origin: prodForm.origin,
      },
      sizes: parsedSizes.length > 0 ? parsedSizes : ['One Size'],
      colors: parsedColors.length > 0 ? parsedColors : [{ name: 'Default', hex: '#18181b' }],
      isDirectSale: prodForm.isDirectSale,
      stock: prodForm.isDirectSale ? Number(prodForm.stock) : 0,
      externalPartner: !prodForm.isDirectSale
        ? {
            name: prodForm.partnerName || 'Authorized Partner Store',
            url: prodForm.partnerUrl || 'https://www.nordstrom.com',
            disclosureText:
              prodForm.partnerDisclosure ||
              'Authorized Partner Listing. Dispatched directly through official partner checkout.',
            buttonText: 'Buy on Authorized Retailer',
            badgeText: 'Authorized Partner Item',
          }
        : undefined,
      isTrending: prodForm.isTrending,
      isNewArrival: prodForm.isNewArrival,
      isFeatured: prodForm.isFeatured,
    };

    if (editingProductId) {
      updateProduct(editingProductId, payload);
    } else {
      addProduct(payload);
    }

    setProductModalOpen(false);
    setEditingProductId(null);
  };

  // Handle Save Banner
  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    addBanner(bannerForm);
    setBannerModalOpen(false);
  };

  // Handle Save Coupon
  const handleSaveCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    addCoupon({
      ...couponForm,
      code: couponForm.code.toUpperCase(),
      active: true,
    });
    setCouponModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner & Mode indicator */}
      <div className="bg-stone-900 text-white rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>MineMart Secure Console · SuperAdmin</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold mt-1">
            Storefront & Merchant Management
          </h1>
          <p className="text-xs text-stone-300 mt-1 max-w-xl">
            Control the live fashion catalog, add authorized affiliate partner links, modify homepage carousel banners, manage customer orders, and issue coupons.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetCatalogToDemo}
            className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded border border-stone-700 flex items-center gap-1.5 transition-colors"
            title="Reset catalog back to initial seed data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Catalog</span>
          </button>

          <button
            onClick={() => setActiveView('home')}
            className="px-4 py-2 bg-white text-stone-900 hover:bg-stone-100 text-xs font-semibold rounded shadow transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Live Website</span>
          </button>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-2 text-xs font-semibold">
        {[
          { id: 'overview', label: 'Dashboard Overview', icon: TrendingUp },
          { id: 'products', label: `Products (${products.length})`, icon: Package },
          { id: 'banners', label: `Homepage Banners (${banners.length})`, icon: Layers },
          { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
          { id: 'coupons', label: `Promo Coupons (${coupons.length})`, icon: Tag },
          { id: 'affiliates', label: `Partner Outbound Logs (${affiliateLogs.length})`, icon: ExternalLink },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = adminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded transition-colors ${
                isSelected
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. OVERVIEW TAB */}
      {adminTab === 'overview' && (
        <div className="space-y-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-stone-200 rounded-lg p-5">
              <span className="text-xs text-stone-500 font-medium">Gross Sales Revenue</span>
              <p className="font-display text-2xl font-bold text-stone-900 mt-1 tabular-nums font-sans">
                ${totalRevenue.toFixed(2)}
              </p>
              <span className="text-[11px] text-emerald-700 font-medium">From fulfilled & in-transit orders</span>
            </div>

            <div className="bg-white border border-stone-200 rounded-lg p-5">
              <span className="text-xs text-stone-500 font-medium">Direct Atelier Products</span>
              <p className="font-display text-2xl font-bold text-stone-900 mt-1 tabular-nums">
                {totalDirectProducts}
              </p>
              <span className="text-[11px] text-stone-500 font-medium">Fully cart & checkout supported</span>
            </div>

            <div className="bg-white border border-stone-200 rounded-lg p-5">
              <span className="text-xs text-stone-500 font-medium">Authorized Partner Feeds</span>
              <p className="font-display text-2xl font-bold text-amber-900 mt-1 tabular-nums">
                {totalPartnerProducts}
              </p>
              <span className="text-[11px] text-amber-800 font-medium">Nordstrom, Farfetch, MatchesFashion</span>
            </div>

            <div className="bg-white border border-stone-200 rounded-lg p-5">
              <span className="text-xs text-stone-500 font-medium">Affiliate Clicks Recorded</span>
              <p className="font-display text-2xl font-bold text-stone-900 mt-1 tabular-nums">
                {affiliateLogs.length}
              </p>
              <span className="text-[11px] text-stone-500 font-medium">Outbound partner redirects</span>
            </div>
          </div>

          {/* Recent Orders in Overview */}
          <div className="bg-white border border-stone-200 rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-display text-base font-semibold text-stone-900">
                Recent Customer Orders
              </h3>
              <button
                onClick={() => setAdminTab('orders')}
                className="text-xs font-semibold text-stone-900 hover:underline"
              >
                View All Orders →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-50 text-stone-600 border-b border-stone-200">
                  <tr>
                    <th className="p-3">Order Ref</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Total Amount</th>
                    <th className="p-3">Payment</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {orders.slice(0, 5).map((ord) => (
                    <tr key={ord.id} className="hover:bg-stone-50">
                      <td className="p-3 font-mono font-semibold">{ord.orderNumber}</td>
                      <td className="p-3">{ord.customerName}</td>
                      <td className="p-3 font-mono font-semibold">${ord.total.toFixed(2)}</td>
                      <td className="p-3 uppercase font-medium">{ord.paymentMethod}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold capitalize bg-stone-100 text-stone-800">
                          {ord.orderStatus.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="p-3">
                        <select
                          value={ord.orderStatus}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                          className="bg-stone-100 border border-stone-300 rounded text-xs p-1"
                        >
                          <option value="placed">Placed</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. PRODUCTS TAB */}
      {adminTab === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400" />
                <input
                  type="text"
                  placeholder="Filter by title, brand, category..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2 bg-white border border-stone-300 rounded focus:outline-none focus:border-stone-900"
                />
              </div>

              <select
                value={productTypeFilter}
                onChange={(e) => setProductTypeFilter(e.target.value as any)}
                className="text-xs p-2 bg-white border border-stone-300 rounded font-medium"
              >
                <option value="all">All Models</option>
                <option value="direct">Direct MineMart</option>
                <option value="affiliate">Authorized Partner Links</option>
              </select>
            </div>

            <button
              onClick={() => {
                setEditingProductId(null);
                setProdForm({
                  title: '',
                  brand: '',
                  category: 'men',
                  subCategory: 'Shirts',
                  price: 120,
                  originalPrice: 150,
                  discountPercent: 20,
                  rating: 4.8,
                  reviewCount: 5,
                  images: '/src/assets/images/product_mens_linen_jacket_1791391886873.jpg',
                  description: 'Artisanal tailored piece with natural fibers and refined stitching.',
                  fabric: '100% Linen',
                  fit: 'Tailored Fit',
                  care: 'Dry clean only',
                  origin: 'Portugal',
                  sizes: 'S, M, L, XL',
                  colors: 'Ivory:#fafaf9, Navy:#1e293b',
                  isDirectSale: true,
                  stock: 25,
                  partnerName: '',
                  partnerUrl: '',
                  partnerDisclosure: '',
                  isTrending: true,
                  isNewArrival: true,
                  isFeatured: true,
                });
                setProductModalOpen(true);
              }}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded flex items-center gap-1.5 transition-colors self-start"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Products Table */}
          <div className="bg-white border border-stone-200 rounded-lg overflow-x-auto shadow-2xs">
            <table className="w-full text-xs text-left">
              <thead className="bg-stone-50 text-stone-600 border-b border-stone-200">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Department</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {filteredAdminProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-stone-50">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="w-10 h-12 object-cover rounded bg-stone-200 shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-stone-900 line-clamp-1">{p.title}</p>
                          <p className="text-[11px] text-stone-500">{p.brand} · {p.subCategory}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-3">
                      {p.isDirectSale ? (
                        <span className="text-[10px] bg-stone-100 text-stone-800 px-2 py-0.5 rounded font-medium">
                          Direct Sale
                        </span>
                      ) : (
                        <span className="text-[10px] bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded font-medium flex items-center gap-1 w-fit">
                          <span>Partner Link</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </span>
                      )}
                    </td>

                    <td className="p-3 capitalize">{p.category}</td>

                    <td className="p-3 font-mono font-semibold">${p.price}</td>

                    <td className="p-3">
                      {p.isDirectSale ? (
                        <span className="tabular-nums font-medium text-stone-800">{p.stock} units</span>
                      ) : (
                        <span className="text-stone-400 italic">Partner Storefront</span>
                      )}
                    </td>

                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => startEditProduct(p)}
                          className="p-1.5 text-stone-600 hover:text-stone-950 hover:bg-stone-100 rounded"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Remove "${p.title}" from catalog?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. BANNERS & HOMEPAGE TAB */}
      {adminTab === 'banners' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-base font-semibold text-stone-900">
                Homepage Hero Banners & Campaigns
              </h3>
              <p className="text-xs text-stone-500">
                Update headlines, imagery, and links on the homepage carousel in real time.
              </p>
            </div>
            <button
              onClick={() => setBannerModalOpen(true)}
              className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Banner</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {banners.map((b) => (
              <div
                key={b.id}
                className="bg-white border border-stone-200 rounded-lg overflow-hidden shadow-2xs space-y-3"
              >
                <div className="relative aspect-[16/9] bg-stone-900">
                  <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 p-4 flex flex-col justify-end text-white">
                    <span className="text-[10px] uppercase font-semibold text-amber-300">{b.tag}</span>
                    <h4 className="font-display text-lg font-semibold">{b.title}</h4>
                    <p className="text-xs text-stone-200 line-clamp-1">{b.subtitle}</p>
                  </div>
                </div>

                <div className="p-4 pt-0 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateBanner(b.id, { active: !b.active })}
                      className={`px-2.5 py-1 rounded text-xs font-semibold ${
                        b.active
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      {b.active ? 'Active on Homepage' : 'Hidden'}
                    </button>
                    <span className="text-stone-500">Category: {b.linkCategory || 'All'}</span>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm('Delete this banner?')) deleteBanner(b.id);
                    }}
                    className="text-rose-600 hover:text-rose-800 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. ORDERS TAB */}
      {adminTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-2">
            <div>
              <h3 className="font-display text-base font-semibold text-stone-900">
                Customer Orders & Fulfillment
              </h3>
              <p className="text-xs text-stone-500">
                Manage logistics stages: Placed → Processing → Shipped → Delivered.
              </p>
            </div>
          </div>

          <div className="bg-white border border-stone-200 rounded-lg overflow-x-auto shadow-2xs">
            <table className="w-full text-xs text-left">
              <thead className="bg-stone-50 text-stone-600 border-b border-stone-200">
                <tr>
                  <th className="p-3">Order Number</th>
                  <th className="p-3">Customer Details</th>
                  <th className="p-3">Items</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-stone-50">
                    <td className="p-3 font-mono font-semibold">{ord.orderNumber}</td>
                    <td className="p-3">
                      <p className="font-semibold text-stone-900">{ord.customerName}</p>
                      <p className="text-[11px] text-stone-500">{ord.customerEmail}</p>
                      <p className="text-[11px] text-stone-400">
                        {ord.shippingAddress.city}, {ord.shippingAddress.state}
                      </p>
                    </td>
                    <td className="p-3">{ord.items.length} items</td>
                    <td className="p-3 font-mono font-semibold">${ord.total.toFixed(2)}</td>
                    <td className="p-3 uppercase">{ord.paymentMethod}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold capitalize bg-stone-100 text-stone-800">
                        {ord.orderStatus.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="p-3">
                      <select
                        value={ord.orderStatus}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                        className="bg-stone-50 border border-stone-300 rounded text-xs p-1"
                      >
                        <option value="placed">Placed</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. COUPONS TAB */}
      {adminTab === 'coupons' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-display text-base font-semibold text-stone-900">
                Promotional Discount Coupons
              </h3>
              <p className="text-xs text-stone-500">
                Create promotional discount codes that customers can apply at checkout.
              </p>
            </div>
            <button
              onClick={() => setCouponModalOpen(true)}
              className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Create Coupon</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {coupons.map((c) => (
              <div
                key={c.code}
                className="bg-white border border-stone-200 rounded-lg p-5 space-y-2 relative"
              >
                <div className="flex justify-between items-start">
                  <span className="font-mono text-base font-bold text-stone-900 tracking-wider">
                    {c.code}
                  </span>
                  <button
                    onClick={() => deleteCoupon(c.code)}
                    className="text-rose-500 hover:text-rose-700 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-emerald-700 font-semibold text-xs">{c.discountPercent}% OFF</p>
                <p className="text-xs text-stone-600">{c.description}</p>
                <p className="text-[11px] text-stone-400">Min Order: ${c.minOrderAmount}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. AFFILIATE LOGS TAB */}
      {adminTab === 'affiliates' && (
        <div className="space-y-4">
          <div>
            <h3 className="font-display text-base font-semibold text-stone-900">
              Authorized Partner Link Outbound Analytics
            </h3>
            <p className="text-xs text-stone-500">
              Live audit trail of user clicks redirected to authorized partner boutique stores.
            </p>
          </div>

          <div className="bg-white border border-stone-200 rounded-lg overflow-x-auto shadow-2xs">
            <table className="w-full text-xs text-left">
              <thead className="bg-stone-50 text-stone-600 border-b border-stone-200">
                <tr>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Product Name</th>
                  <th className="p-3">Partner Retailer</th>
                  <th className="p-3">Destination URL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {affiliateLogs.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-6 text-center text-stone-400 italic">
                      No outbound partner clicks logged yet. Click any Partner Link on the storefront to test tracking!
                    </td>
                  </tr>
                ) : (
                  affiliateLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-stone-50">
                      <td className="p-3 font-mono text-stone-500">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="p-3 font-semibold text-stone-900">{log.productTitle}</td>
                      <td className="p-3 text-amber-900 font-medium">{log.partnerName}</td>
                      <td className="p-3 text-stone-500 truncate max-w-xs">{log.partnerUrl}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ADD / EDIT PRODUCT MODAL */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 sm:p-8 space-y-4 my-8 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="font-display text-lg font-semibold text-stone-900">
                {editingProductId ? 'Edit Product' : 'Add New Product to Catalog'}
              </h3>
              <button
                onClick={() => setProductModalOpen(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              {/* Product Type Switcher */}
              <div className="bg-stone-100 p-3 rounded-lg space-y-1.5">
                <label className="block font-semibold text-stone-900">
                  Fulfillment & Sales Model *
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer font-medium text-stone-800">
                    <input
                      type="radio"
                      name="modelType"
                      checked={prodForm.isDirectSale}
                      onChange={() => setProdForm({ ...prodForm, isDirectSale: true })}
                      className="accent-stone-900"
                    />
                    <span>Direct MineMart Atelier (Cart & Checkout)</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer font-medium text-amber-900">
                    <input
                      type="radio"
                      name="modelType"
                      checked={!prodForm.isDirectSale}
                      onChange={() => setProdForm({ ...prodForm, isDirectSale: false })}
                      className="accent-amber-900"
                    />
                    <span>Authorized Retailer / Affiliate Partner Link</span>
                  </label>
                </div>
              </div>

              {/* Title & Brand */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={prodForm.title}
                    onChange={(e) => setProdForm({ ...prodForm, title: e.target.value })}
                    className="w-full p-2 bg-stone-50 border border-stone-300 rounded"
                    placeholder="e.g. Double-Breasted Linen Blazer"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Brand / Label *</label>
                  <input
                    type="text"
                    required
                    value={prodForm.brand}
                    onChange={(e) => setProdForm({ ...prodForm, brand: e.target.value })}
                    className="w-full p-2 bg-stone-50 border border-stone-300 rounded"
                    placeholder="e.g. MineMart Atelier or Nordstrom"
                  />
                </div>
              </div>

              {/* Category, Subcategory, Price */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Category *</label>
                  <select
                    value={prodForm.category}
                    onChange={(e) => setProdForm({ ...prodForm, category: e.target.value as any })}
                    className="w-full p-2 bg-stone-50 border border-stone-300 rounded"
                  >
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="footwear">Footwear</option>
                    <option value="accessories">Accessories</option>
                    <option value="kids">Kids</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Subcategory *</label>
                  <input
                    type="text"
                    value={prodForm.subCategory}
                    onChange={(e) => setProdForm({ ...prodForm, subCategory: e.target.value })}
                    className="w-full p-2 bg-stone-50 border border-stone-300 rounded"
                    placeholder="e.g. Blazers, Dresses"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Price ($) *</label>
                  <input
                    type="number"
                    value={prodForm.price}
                    onChange={(e) => setProdForm({ ...prodForm, price: Number(e.target.value) })}
                    className="w-full p-2 bg-stone-50 border border-stone-300 rounded"
                  />
                </div>
              </div>

              {/* Original Price & Stock */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    Original Price / MRP ($)
                  </label>
                  <input
                    type="number"
                    value={prodForm.originalPrice}
                    onChange={(e) => setProdForm({ ...prodForm, originalPrice: Number(e.target.value) })}
                    className="w-full p-2 bg-stone-50 border border-stone-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    {prodForm.isDirectSale ? 'Stock Units (Atelier Hub) *' : 'Stock (N/A for Partner)'}
                  </label>
                  <input
                    type="number"
                    disabled={!prodForm.isDirectSale}
                    value={prodForm.stock}
                    onChange={(e) => setProdForm({ ...prodForm, stock: Number(e.target.value) })}
                    className={`w-full p-2 border border-stone-300 rounded ${
                      prodForm.isDirectSale ? 'bg-stone-50' : 'bg-stone-100 text-stone-400'
                    }`}
                  />
                </div>
              </div>

              {/* If External Partner: Partner Details Fields */}
              {!prodForm.isDirectSale && (
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 space-y-2">
                  <p className="font-semibold text-amber-900">Authorized Partner Information</p>
                  <div>
                    <label className="block text-amber-950 font-medium mb-1">Partner Store Name *</label>
                    <input
                      type="text"
                      value={prodForm.partnerName}
                      onChange={(e) => setProdForm({ ...prodForm, partnerName: e.target.value })}
                      placeholder="e.g. Nordstrom Authorized Partner"
                      className="w-full p-2 bg-white border border-amber-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-amber-950 font-medium mb-1">
                      Authorized Outbound / Affiliate Link URL *
                    </label>
                    <input
                      type="url"
                      value={prodForm.partnerUrl}
                      onChange={(e) => setProdForm({ ...prodForm, partnerUrl: e.target.value })}
                      placeholder="https://www.nordstrom.com/s/item-url"
                      className="w-full p-2 bg-white border border-amber-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-amber-950 font-medium mb-1">
                      Transparency Disclosure Text
                    </label>
                    <input
                      type="text"
                      value={prodForm.partnerDisclosure}
                      onChange={(e) => setProdForm({ ...prodForm, partnerDisclosure: e.target.value })}
                      placeholder="Authorized Partner Listing. Dispatched directly through official retailer."
                      className="w-full p-2 bg-white border border-amber-300 rounded"
                    />
                  </div>
                </div>
              )}

              {/* Images, Sizes, Colors */}
              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  Product Image URLs (Comma-separated)
                </label>
                <input
                  type="text"
                  value={prodForm.images}
                  onChange={(e) => setProdForm({ ...prodForm, images: e.target.value })}
                  placeholder="/src/assets/images/... or https://..."
                  className="w-full p-2 bg-stone-50 border border-stone-300 rounded font-mono text-[11px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    Available Sizes (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={prodForm.sizes}
                    onChange={(e) => setProdForm({ ...prodForm, sizes: e.target.value })}
                    placeholder="S, M, L, XL"
                    className="w-full p-2 bg-stone-50 border border-stone-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    Colors (Format: Name:#hex, Name:#hex)
                  </label>
                  <input
                    type="text"
                    value={prodForm.colors}
                    onChange={(e) => setProdForm({ ...prodForm, colors: e.target.value })}
                    placeholder="Beige:#d7c7b5, Navy:#1e293b"
                    className="w-full p-2 bg-stone-50 border border-stone-300 rounded"
                  />
                </div>
              </div>

              {/* Description & Specs */}
              <div>
                <label className="block text-stone-700 font-medium mb-1">Description *</label>
                <textarea
                  rows={2}
                  value={prodForm.description}
                  onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                  className="w-full p-2 bg-stone-50 border border-stone-300 rounded"
                />
              </div>

              {/* Toggles */}
              <div className="flex gap-4 pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prodForm.isTrending}
                    onChange={(e) => setProdForm({ ...prodForm, isTrending: e.target.checked })}
                    className="accent-stone-900"
                  />
                  <span>Show in Trending</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prodForm.isNewArrival}
                    onChange={(e) => setProdForm({ ...prodForm, isNewArrival: e.target.checked })}
                    className="accent-stone-900"
                  />
                  <span>Show in New Arrivals</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prodForm.isFeatured}
                    onChange={(e) => setProdForm({ ...prodForm, isFeatured: e.target.checked })}
                    className="accent-stone-900"
                  />
                  <span>Featured Collection</span>
                </label>
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded text-stone-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-stone-900 text-white rounded font-semibold"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE BANNER MODAL */}
      {bannerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl text-xs">
            <h3 className="font-display text-base font-semibold text-stone-900">
              Create New Hero Campaign Banner
            </h3>
            <form onSubmit={handleSaveBanner} className="space-y-3">
              <div>
                <label className="block text-stone-700 font-medium mb-1">Banner Headline</label>
                <input
                  type="text"
                  required
                  value={bannerForm.title}
                  onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                  className="w-full p-2 border border-stone-300 rounded bg-stone-50"
                />
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-1">Subtitle</label>
                <input
                  type="text"
                  required
                  value={bannerForm.subtitle}
                  onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                  className="w-full p-2 border border-stone-300 rounded bg-stone-50"
                />
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-1">Tag (Kicker)</label>
                <input
                  type="text"
                  value={bannerForm.tag}
                  onChange={(e) => setBannerForm({ ...bannerForm, tag: e.target.value })}
                  className="w-full p-2 border border-stone-300 rounded bg-stone-50"
                />
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-1">Image URL</label>
                <input
                  type="text"
                  required
                  value={bannerForm.image}
                  onChange={(e) => setBannerForm({ ...bannerForm, image: e.target.value })}
                  className="w-full p-2 border border-stone-300 rounded bg-stone-50 font-mono text-[11px]"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setBannerModalOpen(false)}
                  className="px-3 py-1.5 border border-stone-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-stone-900 text-white rounded font-semibold"
                >
                  Add Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE COUPON MODAL */}
      {couponModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 space-y-4 shadow-xl text-xs">
            <h3 className="font-display text-base font-semibold text-stone-900">
              Create Promotional Coupon
            </h3>
            <form onSubmit={handleSaveCoupon} className="space-y-3">
              <div>
                <label className="block text-stone-700 font-medium mb-1">Coupon Code *</label>
                <input
                  type="text"
                  required
                  value={couponForm.code}
                  onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })}
                  className="w-full p-2 border border-stone-300 rounded bg-stone-50 font-mono"
                />
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-1">Discount % *</label>
                <input
                  type="number"
                  required
                  value={couponForm.discountPercent}
                  onChange={(e) => setCouponForm({ ...couponForm, discountPercent: Number(e.target.value) })}
                  className="w-full p-2 border border-stone-300 rounded bg-stone-50"
                />
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-1">Min Order Amount ($) *</label>
                <input
                  type="number"
                  required
                  value={couponForm.minOrderAmount}
                  onChange={(e) => setCouponForm({ ...couponForm, minOrderAmount: Number(e.target.value) })}
                  className="w-full p-2 border border-stone-300 rounded bg-stone-50"
                />
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-1">Description</label>
                <input
                  type="text"
                  value={couponForm.description}
                  onChange={(e) => setCouponForm({ ...couponForm, description: e.target.value })}
                  className="w-full p-2 border border-stone-300 rounded bg-stone-50"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCouponModalOpen(false)}
                  className="px-3 py-1.5 border border-stone-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-stone-900 text-white rounded font-semibold"
                >
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
