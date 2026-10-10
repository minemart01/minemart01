import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from './ProductCard';
import {
  Star,
  Heart,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  Truck,
  RotateCcw,
  Ruler,
  Check,
  ChevronRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

interface ProductDetailPageProps {
  onOpenCart?: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ onOpenCart }) => {
  const {
    products,
    selectedProductId,
    setSelectedProductId,
    setActiveView,
    addToCart,
    toggleWishlist,
    isWishlisted,
    getProductReviews,
    addReview,
    logAffiliateClick,
  } = useStore();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  // State
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [zipCode, setZipCode] = useState('');
  const [deliveryEstimate, setDeliveryEstimate] = useState<string | null>(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);

  // Review submission state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');

  if (!product) return null;

  const wish = isWishlisted(product.id);
  const reviews = getProductReviews(product.id);
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleZipCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipCode.trim()) return;
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + 3);
    const dateStr = estDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    setDeliveryEstimate(`Express Delivery estimated by ${dateStr} to ${zipCode}`);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    if (onOpenCart) onOpenCart();
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePartnerOutbound = () => {
    if (product.externalPartner) {
      logAffiliateClick(product);
      window.open(product.externalPartner.url, '_blank', 'noopener,noreferrer');
      setPartnerModalOpen(false);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;
    addReview({
      productId: product.id,
      userName: newReviewAuthor.trim(),
      rating: newReviewRating,
      comment: newReviewComment.trim(),
      verifiedPurchase: true,
    });
    setNewReviewAuthor('');
    setNewReviewComment('');
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 pb-20 sm:pb-24">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 text-xs text-stone-500">
        <button
          onClick={() => setActiveView('catalog')}
          className="flex items-center gap-1.5 text-stone-700 hover:text-stone-950 font-medium py-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Catalog</span>
        </button>

        <div className="hidden sm:flex items-center gap-1.5">
          <span>Home</span>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <span className="capitalize">{product.category}</span>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <span className="text-stone-900 font-medium truncate max-w-[200px]">{product.title}</span>
        </div>
      </div>

      {/* Main Contiguous Purchase Module Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
        {/* Left Column: Gallery (7 Cols on desktop) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Visual Display */}
          <div className="relative aspect-[4/5] bg-stone-100 rounded-lg overflow-hidden border border-stone-200">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />

            {/* Wishlist Icon */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 p-2.5 rounded-full transition-colors ${
                wish
                  ? 'bg-rose-50 text-rose-600 shadow'
                  : 'bg-white/80 backdrop-blur-sm text-stone-700 hover:bg-white'
              }`}
              aria-label="Toggle wishlist"
            >
              <Heart className={`w-5 h-5 ${wish ? 'fill-current' : ''}`} />
            </button>

            {/* Subtle Origin Badge */}
            <div className="absolute bottom-4 left-4">
              {product.isDirectSale ? (
                <span className="text-xs font-semibold text-stone-900 bg-white/95 backdrop-blur-sm px-3 py-1 rounded shadow-2xs">
                  MineMart Direct Atelier
                </span>
              ) : (
                <span className="text-xs font-semibold text-amber-900 bg-amber-50/95 backdrop-blur-sm px-3 py-1 rounded border border-amber-200/60 shadow-2xs flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Authorized Retail Partner Sourced</span>
                </span>
              )}
            </div>
          </div>

          {/* Gallery Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-24 rounded overflow-hidden border-2 transition-all ${
                    idx === selectedImageIndex ? 'border-stone-900 ring-1 ring-stone-900' : 'border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Contiguous Purchase Module (5 Cols on desktop) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          {/* Brand, Title & Rating Header */}
          <div className="space-y-2 border-b border-stone-200 pb-5">
            <div className="flex items-center justify-between text-xs font-medium text-stone-500">
              <span className="uppercase tracking-widest text-stone-600">{product.brand}</span>
              <span className="capitalize">{product.category} · {product.subCategory}</span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-stone-900 leading-tight">
              {product.title}
            </h1>

            {/* Rating Stars & Reviews */}
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3.5 h-3.5 ${
                      star <= Math.round(product.rating) ? 'fill-current' : 'text-stone-300'
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold text-stone-800 tabular-nums">{product.rating}</span>
              <span className="text-stone-400">({product.reviewCount} verified reviews)</span>
            </div>

            {/* Price block */}
            <div className="pt-2 flex items-baseline gap-3 tabular-nums">
              <span className="text-2xl sm:text-3xl font-bold text-stone-950 font-sans">
                ${product.price}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-sm text-stone-400 line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Save {product.discountPercent}%
                  </span>
                </>
              )}
            </div>
          </div>

          {/* DIVERGENT MODULE: External Retailer Partner vs Direct MineMart Product */}
          {!product.isDirectSale && product.externalPartner ? (
            /* EXTERNAL AUTHORIZED PARTNER MODULE */
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-5 space-y-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-amber-950">
                    {product.externalPartner.name}
                  </h3>
                  <p className="text-xs text-amber-900/80 leading-relaxed">
                    {product.externalPartner.disclosureText}
                  </p>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  onClick={() => setPartnerModalOpen(true)}
                  className="w-full py-3 px-4 bg-amber-900 hover:bg-amber-950 text-white font-semibold text-xs tracking-wider uppercase rounded shadow transition-colors flex items-center justify-center gap-2 group"
                >
                  <span>{product.externalPartner.buttonText || 'Shop at Authorized Retailer'}</span>
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>
                <p className="text-[11px] text-amber-800 text-center">
                  Official partner redirection · No added markups · Verified checkout
                </p>
              </div>
            </div>
          ) : (
            /* DIRECT MINEMART PRODUCT MODULE */
            <div className="space-y-5">
              {/* Color Selection */}
              <div>
                <div className="flex items-center justify-between text-xs font-medium mb-2">
                  <span className="text-stone-700">Selected Color:</span>
                  <span className="text-stone-900 font-semibold">{selectedColor}</span>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((color) => {
                    const isSelected = selectedColor === color.name;
                    return (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${
                          isSelected ? 'scale-110 border-stone-900 ring-2 ring-stone-900/20' : 'border-white shadow-2xs hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                        aria-label={`Select ${color.name}`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex items-center justify-between text-xs font-medium mb-2">
                  <span className="text-stone-700">Size:</span>
                  <button
                    onClick={() => setSizeGuideOpen(true)}
                    className="text-stone-600 hover:text-stone-900 flex items-center gap-1 text-[11px] underline underline-offset-2"
                  >
                    <Ruler className="w-3 h-3" />
                    <span>Size Guide</span>
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 text-xs font-medium rounded border transition-colors ${
                          isSelected
                            ? 'bg-stone-900 text-white border-stone-900 font-semibold'
                            : 'bg-white text-stone-800 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Stepper & Stock status */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-stone-600 font-medium">Quantity:</span>
                  <div className="flex items-center border border-stone-300 rounded overflow-hidden bg-white">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-2.5 py-1 text-stone-600 hover:bg-stone-100 font-medium"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 font-semibold text-stone-900 tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                      className="px-2.5 py-1 text-stone-600 hover:bg-stone-100 font-medium"
                    >
                      +
                    </button>
                  </div>
                </div>

                <span className="text-emerald-700 font-medium flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>In Stock ({product.stock} available)</span>
                </span>
              </div>

              {/* Primary Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3.5 px-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs tracking-wider uppercase rounded shadow transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-900 font-semibold text-xs tracking-wider uppercase rounded border border-stone-300 transition-colors"
                >
                  Instant Buy Now
                </button>
              </div>

              {/* Delivery Pin Code Estimate */}
              <div className="pt-2 border-t border-stone-200">
                <p className="text-xs font-semibold text-stone-900 mb-1.5 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-stone-600" />
                  <span>Delivery Estimate</span>
                </p>
                <form onSubmit={handleZipCheck} className="flex gap-2">
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="Enter Postal / ZIP Code"
                    className="flex-1 text-xs py-1.5 px-3 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:border-stone-900"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold text-xs rounded"
                  >
                    Check
                  </button>
                </form>
                {deliveryEstimate && (
                  <p className="text-xs font-medium text-emerald-700 mt-2">
                    {deliveryEstimate}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Garment Details Accordion / Specs */}
          <div className="pt-4 border-t border-stone-200 space-y-4 text-xs">
            <div>
              <h3 className="font-semibold text-stone-900 mb-1">Description</h3>
              <p className="text-stone-600 leading-relaxed">{product.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-stone-50 p-3 rounded-lg border border-stone-200/60">
              {product.details.fabric && (
                <div>
                  <span className="text-stone-400 block text-[11px]">Material & Fabric</span>
                  <span className="text-stone-800 font-medium">{product.details.fabric}</span>
                </div>
              )}
              {product.details.fit && (
                <div>
                  <span className="text-stone-400 block text-[11px]">Fit Silhouette</span>
                  <span className="text-stone-800 font-medium">{product.details.fit}</span>
                </div>
              )}
              {product.details.care && (
                <div>
                  <span className="text-stone-400 block text-[11px]">Care Instructions</span>
                  <span className="text-stone-800 font-medium">{product.details.care}</span>
                </div>
              )}
              {product.details.origin && (
                <div>
                  <span className="text-stone-400 block text-[11px]">Origin</span>
                  <span className="text-stone-800 font-medium">{product.details.origin}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-stone-500 pt-1 text-[11px]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
                <span>100% Genuine Curation</span>
              </span>
              <span className="flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5 text-stone-700" />
                <span>14-Day Free Exchange</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="mt-16 pt-12 border-t border-stone-200">
        <div className="max-w-4xl">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 gap-4">
            <div>
              <h2 className="font-display text-2xl font-semibold text-stone-900">
                Customer Ratings & Reviews
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Verified reviews from customers who purchased this item.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-stone-100 px-4 py-2 rounded-lg">
              <span className="font-display text-2xl font-bold text-stone-900 tabular-nums">
                {product.rating}
              </span>
              <div className="text-xs">
                <div className="flex text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3.5 h-3.5 ${
                        s <= Math.round(product.rating) ? 'fill-current' : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-stone-500">{reviews.length} written reviews</span>
              </div>
            </div>
          </div>

          {/* Write a review box */}
          <form
            onSubmit={handleReviewSubmit}
            className="mb-8 p-5 bg-white border border-stone-200 rounded-lg space-y-3"
          >
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-900">
              Share Your Experience
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Your Name (e.g. Marcus L.)"
                value={newReviewAuthor}
                onChange={(e) => setNewReviewAuthor(e.target.value)}
                required
                className="text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:border-stone-900"
              />
              <div className="flex items-center gap-2 text-xs">
                <span className="text-stone-600 font-medium">Your Rating:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setNewReviewRating(num)}
                      className="p-1 text-amber-400 focus:outline-none"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          num <= newReviewRating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <textarea
              placeholder="How does the garment fit? Mention the texture, drape, sizing, and silhouette..."
              rows={3}
              value={newReviewComment}
              onChange={(e) => setNewReviewComment(e.target.value)}
              required
              className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:border-stone-900"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-stone-900 text-white font-semibold text-xs rounded hover:bg-stone-800 transition-colors"
            >
              Post Review
            </button>
          </form>

          {/* Existing reviews list */}
          <div className="space-y-4">
            {reviews.length === 0 ? (
              <p className="text-xs text-stone-500 py-4 italic">No written reviews yet for this piece.</p>
            ) : (
              reviews.map((rev) => (
                <div key={rev.id} className="p-4 bg-white border border-stone-200 rounded-lg space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-stone-900">{rev.userName}</span>
                      {rev.verifiedPurchase && (
                        <span className="text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-stone-400">{rev.date}</span>
                  </div>
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3 h-3 ${s <= rev.rating ? 'fill-current' : 'text-stone-200'}`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed">{rev.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Related Products Recommendation */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 pt-12 border-t border-stone-200">
          <div className="mb-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-stone-500">
              Complete the Aesthetic
            </span>
            <h2 className="font-display text-2xl font-semibold text-stone-900 mt-1">
              You May Also Admire
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Modal 1: Size Guide Modal */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <h3 className="font-display text-lg font-semibold text-stone-900">
                Atelier Sizing Guide ({product.category})
              </h3>
              <button
                onClick={() => setSizeGuideOpen(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-stone-600">
              Measurements are in inches. For a relaxed look, order true to size; for an oversized silhouette, size up one step.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-100 text-stone-700">
                  <tr>
                    <th className="p-2">Size</th>
                    <th className="p-2">Chest / Bust</th>
                    <th className="p-2">Waist</th>
                    <th className="p-2">Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  <tr>
                    <td className="p-2 font-semibold">S (38)</td>
                    <td className="p-2">38 - 40"</td>
                    <td className="p-2">30 - 32"</td>
                    <td className="p-2">28.5"</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold">M (40)</td>
                    <td className="p-2">40 - 42"</td>
                    <td className="p-2">32 - 34"</td>
                    <td className="p-2">29.0"</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold">L (42)</td>
                    <td className="p-2">42 - 44"</td>
                    <td className="p-2">34 - 36"</td>
                    <td className="p-2">29.5"</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold">XL (44)</td>
                    <td className="p-2">44 - 46"</td>
                    <td className="p-2">36 - 38"</td>
                    <td className="p-2">30.0"</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="pt-2 text-right">
              <button
                onClick={() => setSizeGuideOpen(false)}
                className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Authorized Partner Redirect Notice */}
      {partnerModalOpen && product.externalPartner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-lg max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-amber-800">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <h3 className="font-display text-lg font-semibold text-stone-900">
                Authorized Partner Redirection
              </h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              You are being securely directed to the official checkout of our authorized partner:{' '}
              <strong className="text-stone-900">{product.externalPartner.name}</strong>.
            </p>
            <div className="p-3 bg-stone-50 rounded border border-stone-200 text-xs text-stone-700 space-y-1">
              <p><strong>Item:</strong> {product.title}</p>
              <p><strong>Listed Price:</strong> ${product.price}</p>
              <p className="text-[11px] text-stone-500 truncate">
                <strong>Destination:</strong> {product.externalPartner.url}
              </p>
            </div>
            <p className="text-[11px] text-stone-500">
              MineMart respects authorized merchant agreements. Order processing, fulfillment, and customer return policies will be governed by the partner boutique.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setPartnerModalOpen(false)}
                className="w-1/2 py-2 text-xs font-medium border border-stone-300 rounded text-stone-700 hover:bg-stone-50"
              >
                Stay on MineMart
              </button>
              <button
                onClick={handlePartnerOutbound}
                className="w-1/2 py-2 text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white rounded flex items-center justify-center gap-1.5"
              >
                <span>Continue to Partner</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
