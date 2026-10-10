import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Tag,
  Check,
  Truck,
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setActiveView,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isOpen) return null;

  const freeShippingThreshold = 150;
  const progressPercent = Math.min(100, (cartTotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);

  const discountAmount = appliedCoupon ? (cartTotal * appliedCoupon.discountPercent) / 100 : 0;
  const shippingFee = cartTotal >= freeShippingThreshold || cartTotal === 0 ? 0 : 15;
  const finalTotal = Math.max(0, cartTotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError(null);
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    onClose();
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-stone-900" />
              <h2 className="font-display text-lg font-semibold text-stone-900">Shopping Bag</h2>
              <span className="text-xs text-stone-500 tabular-nums font-mono">
                ({cart.reduce((a, b) => a + b.quantity, 0)})
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-md"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Shipping Progress Banner */}
          <div className="bg-stone-50 px-5 py-3 border-b border-stone-200 text-xs">
            <div className="flex items-center justify-between text-stone-700 mb-1.5">
              <span className="flex items-center gap-1 font-medium">
                <Truck className="w-3.5 h-3.5 text-stone-900" />
                {remainingForFreeShipping === 0 ? (
                  <span className="text-emerald-700 font-semibold">Complimentary Express Shipping Unlocked!</span>
                ) : (
                  <span>
                    Add <strong>${remainingForFreeShipping.toFixed(2)}</strong> more for free express shipping
                  </span>
                )}
              </span>
            </div>
            <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-stone-900 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Itemized List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <ShoppingBag className="w-10 h-10 text-stone-300" />
                <h3 className="font-display text-lg font-semibold text-stone-800">Your bag is empty</h3>
                <p className="text-xs text-stone-500 max-w-xs">
                  Discover our seasonal tailoring, footwear, and pure mulberry silk releases.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    setActiveView('catalog');
                  }}
                  className="px-5 py-2.5 bg-stone-900 text-white text-xs font-semibold rounded hover:bg-stone-800 transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-stone-50/70 border border-stone-200/80 rounded-lg"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-20 h-24 object-cover rounded bg-stone-200 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] uppercase tracking-wider text-stone-500 font-medium">
                          {item.product.brand}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-rose-600 p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4 className="text-xs font-semibold text-stone-900 line-clamp-1 mt-0.5">
                        {item.product.title}
                      </h4>
                      <p className="text-[11px] text-stone-500 mt-1">
                        Size: <span className="font-medium text-stone-800">{item.selectedSize}</span> · Color:{' '}
                        <span className="font-medium text-stone-800">{item.selectedColor}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-200/60">
                      <div className="flex items-center border border-stone-300 rounded bg-white text-xs">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-stone-600 hover:bg-stone-100"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 font-semibold text-stone-900 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-stone-600 hover:bg-stone-100"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs font-bold text-stone-950 tabular-nums font-mono">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Module */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50/50 space-y-4">
              {/* Coupon Form */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded p-2.5 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800">
                    <Check className="w-3.5 h-3.5" />
                    <span>
                      Coupon <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.discountPercent}% off)
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-stone-500 hover:text-stone-800 text-[11px] underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-1">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                      <input
                        type="text"
                        placeholder="Promo Code (e.g. MINEMART10)"
                        value={couponInput}
                        onChange={(e) => {
                          setCouponInput(e.target.value.toUpperCase());
                          setCouponError(null);
                        }}
                        className="w-full text-xs pl-8 pr-3 py-2 bg-white border border-stone-300 rounded focus:outline-none focus:border-stone-900"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold rounded"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <p className="text-[11px] text-rose-600 mt-1">{couponError}</p>}
                </form>
              )}

              {/* Subtotal Calculation Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-200 pt-3 tabular-nums">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-stone-900">${cartTotal.toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Shipping</span>
                  <span>{shippingFee === 0 ? 'Complimentary' : `$${shippingFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-950 pt-2 border-t border-stone-200">
                  <span>Grand Total</span>
                  <span className="font-mono">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs tracking-wider uppercase rounded shadow transition-colors flex items-center justify-center gap-2 group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
