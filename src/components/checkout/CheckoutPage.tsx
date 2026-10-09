import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Address } from '../../types';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowLeft,
  ChevronRight,
  Plus,
  QrCode,
  Building,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartTotal,
    appliedCoupon,
    currentUser,
    placeOrder,
    setActiveView,
    addAddress,
  } = useStore();

  // If cart is empty, redirect
  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center">
        <h2 className="font-display text-xl font-semibold text-stone-900 mb-2">No items in bag to checkout</h2>
        <p className="text-xs text-stone-500 mb-4">Add direct atelier items to your bag before proceeding to checkout.</p>
        <button
          onClick={() => setActiveView('catalog')}
          className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  // Address selection state
  const savedAddresses = currentUser?.addresses || [];
  const defaultAddress = savedAddresses.find((a) => a.isDefault) || savedAddresses[0];

  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    defaultAddress ? defaultAddress.id : 'new'
  );

  const [newAddressForm, setNewAddressForm] = useState<Omit<Address, 'id'>>({
    fullName: currentUser?.name || '',
    phone: currentUser?.phone || '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
  });

  const [isAddingNewAddress, setIsAddingNewAddress] = useState(savedAddresses.length === 0);

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');
  const [upiId, setUpiId] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Financial calculations
  const discountAmount = appliedCoupon ? (cartTotal * appliedCoupon.discountPercent) / 100 : 0;
  const shippingFee = cartTotal >= 150 ? 0 : 15;
  const finalTotal = Math.max(0, cartTotal - discountAmount + shippingFee);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let finalAddress: Address;
    if (selectedAddressId === 'new' || isAddingNewAddress) {
      if (!newAddressForm.street || !newAddressForm.city || !newAddressForm.postalCode) {
        alert('Please complete the shipping address fields.');
        setIsSubmitting(false);
        return;
      }
      finalAddress = {
        ...newAddressForm,
        id: 'addr-' + Date.now(),
        isDefault: true,
      };
      if (currentUser) {
        addAddress(newAddressForm);
      }
    } else {
      const existing = savedAddresses.find((a) => a.id === selectedAddressId);
      finalAddress = existing || {
        id: 'addr-fallback',
        fullName: currentUser?.name || 'Customer',
        phone: currentUser?.phone || '+1 555-000-0000',
        street: '742 Evergreen Terrace',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94107',
      };
    }

    // Simulate payment transaction verification
    setTimeout(() => {
      placeOrder({
        address: finalAddress,
        paymentMethod,
        couponCode: appliedCoupon?.code,
        phone: finalAddress.phone,
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Breadcrumb & Security Badge */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200">
        <button
          onClick={() => setActiveView('cart')}
          className="flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Bag</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded">
          <Lock className="w-3.5 h-3.5 text-emerald-700" />
          <span>256-Bit SSL Encrypted Checkout</span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Checkout Steps (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Step 1: Shipping Address */}
          <div className="bg-white border border-stone-200 rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[11px] font-semibold flex items-center justify-center">
                  1
                </span>
                <h3 className="font-display text-base font-semibold text-stone-900">
                  Delivery Destination
                </h3>
              </div>

              {savedAddresses.length > 0 && !isAddingNewAddress && (
                <button
                  type="button"
                  onClick={() => setIsAddingNewAddress(true)}
                  className="text-xs text-stone-900 font-semibold hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add New Address</span>
                </button>
              )}
            </div>

            {/* Saved Address Cards */}
            {savedAddresses.length > 0 && !isAddingNewAddress ? (
              <div className="space-y-3">
                {savedAddresses.map((addr) => (
                  <label
                    key={addr.id}
                    className={`block p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedAddressId === addr.id
                        ? 'border-stone-900 bg-stone-50/50 ring-1 ring-stone-900'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="shippingAddress"
                        value={addr.id}
                        checked={selectedAddressId === addr.id}
                        onChange={() => setSelectedAddressId(addr.id)}
                        className="mt-1 accent-stone-900"
                      />
                      <div className="text-xs space-y-0.5 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-stone-900">{addr.fullName}</span>
                          {addr.isDefault && (
                            <span className="text-[10px] text-stone-500 bg-stone-200/70 px-1.5 py-0.5 rounded font-medium">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-stone-600">{addr.street}</p>
                        <p className="text-stone-600">
                          {addr.city}, {addr.state} {addr.postalCode}
                        </p>
                        <p className="text-stone-500 text-[11px] pt-1">Phone: {addr.phone}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            ) : (
              /* New Address Input Form */
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-stone-700 mb-1">
                      Recipient Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor Vance"
                      value={newAddressForm.fullName}
                      onChange={(e) =>
                        setNewAddressForm({ ...newAddressForm, fullName: e.target.value })
                      }
                      className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:border-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-stone-700 mb-1">
                      Mobile Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={newAddressForm.phone}
                      onChange={(e) =>
                        setNewAddressForm({ ...newAddressForm, phone: e.target.value })
                      }
                      className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:border-stone-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-stone-700 mb-1">
                    Street Address, Suite / Apartment *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="742 Evergreen Terrace, Apt 4B"
                    value={newAddressForm.street}
                    onChange={(e) =>
                      setNewAddressForm({ ...newAddressForm, street: e.target.value })
                    }
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-stone-700 mb-1">City *</label>
                    <input
                      type="text"
                      required
                      placeholder="San Francisco"
                      value={newAddressForm.city}
                      onChange={(e) =>
                        setNewAddressForm({ ...newAddressForm, city: e.target.value })
                      }
                      className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:border-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-stone-700 mb-1">State / Region *</label>
                    <input
                      type="text"
                      required
                      placeholder="CA"
                      value={newAddressForm.state}
                      onChange={(e) =>
                        setNewAddressForm({ ...newAddressForm, state: e.target.value })
                      }
                      className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:border-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-stone-700 mb-1">Postal Code *</label>
                    <input
                      type="text"
                      required
                      placeholder="94107"
                      value={newAddressForm.postalCode}
                      onChange={(e) =>
                        setNewAddressForm({ ...newAddressForm, postalCode: e.target.value })
                      }
                      className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:border-stone-900"
                    />
                  </div>
                </div>

                {savedAddresses.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setIsAddingNewAddress(false)}
                    className="text-xs text-stone-600 hover:underline pt-1"
                  >
                    Cancel and use saved address
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Step 2: Shipping Dispatch Method */}
          <div className="bg-white border border-stone-200 rounded-lg p-6 space-y-3">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[11px] font-semibold flex items-center justify-center">
                2
              </span>
              <h3 className="font-display text-base font-semibold text-stone-900">
                Dispatch Courier
              </h3>
            </div>

            <div className="p-3.5 bg-stone-50 rounded-lg border border-stone-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4 text-stone-900" />
                <div>
                  <p className="font-semibold text-stone-900">Express Atelier Courier (FedEx Air)</p>
                  <p className="text-stone-500 text-[11px]">Estimated delivery within 2–4 business days with signature receipt</p>
                </div>
              </div>
              <span className="font-semibold text-stone-900 tabular-nums">
                {shippingFee === 0 ? 'Complimentary' : `$${shippingFee}`}
              </span>
            </div>
          </div>

          {/* Step 3: Payment Method */}
          <div className="bg-white border border-stone-200 rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[11px] font-semibold flex items-center justify-center">
                3
              </span>
              <h3 className="font-display text-base font-semibold text-stone-900">
                Payment Method
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'card', label: 'Credit Card', icon: CreditCard },
                { id: 'upi', label: 'UPI / QR', icon: QrCode },
                { id: 'netbanking', label: 'Net Banking', icon: Building },
                { id: 'cod', label: 'Cash on Delivery', icon: Truck },
              ].map((m) => {
                const Icon = m.icon;
                const isSelected = paymentMethod === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`p-3 rounded-lg border text-left flex flex-col justify-between gap-2 transition-all ${
                      isSelected
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-200 hover:border-stone-300 text-stone-800 bg-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-xs font-semibold">{m.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Sub-form based on payment selection */}
            {paymentMethod === 'card' && (
              <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 space-y-3 pt-3">
                <div className="flex items-center justify-between text-xs font-medium text-stone-700">
                  <span>Card Information</span>
                  <span className="text-stone-400">Visa / Mastercard / Amex</span>
                </div>
                <div>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Card Number"
                    className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="MM / YY"
                    className="text-xs p-2.5 bg-white border border-stone-300 rounded font-mono"
                  />
                  <input
                    type="password"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    placeholder="CVV"
                    maxLength={4}
                    className="text-xs p-2.5 bg-white border border-stone-300 rounded font-mono"
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 space-y-3">
                <label className="block text-xs font-medium text-stone-700">
                  Virtual Payment Address (VPA / UPI ID)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. customer@okhdfcbank"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="flex-1 text-xs p-2.5 bg-white border border-stone-300 rounded font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => alert('UPI ID Verified')}
                    className="px-3 py-2 bg-stone-200 text-stone-800 text-xs font-semibold rounded"
                  >
                    Verify
                  </button>
                </div>
                <p className="text-[11px] text-stone-500">
                  A payment authorization request will be sent to your UPI application.
                </p>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 space-y-3">
                <label className="block text-xs font-medium text-stone-700">
                  Select Participating Banking Partner
                </label>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded text-stone-800"
                >
                  <option>HDFC Bank</option>
                  <option>Chase Commercial Bank</option>
                  <option>Wells Fargo</option>
                  <option>ICICI Bank</option>
                  <option>State Bank of India</option>
                  <option>Citibank</option>
                </select>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-lg space-y-1.5 text-xs text-amber-900">
                <p className="font-semibold">Cash on Delivery Verification</p>
                <p className="text-[11px] leading-relaxed text-amber-800">
                  Please ensure exact cash is available at the delivery location. Our carrier agent will contact the recipient number before dispatch. Free exchange policy applies.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary (5 Cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <div className="bg-white border border-stone-200 rounded-lg p-6 space-y-4">
            <h3 className="font-display text-base font-semibold text-stone-900 border-b border-stone-100 pb-3">
              Order Summary ({cart.length} {cart.length === 1 ? 'item' : 'items'})
            </h3>

            {/* Thumbnail list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 text-xs">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-12 h-14 object-cover rounded bg-stone-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-stone-900 truncate">{item.product.title}</p>
                    <p className="text-[11px] text-stone-500">
                      Qty: {item.quantity} · {item.selectedSize} · {item.selectedColor}
                    </p>
                    <p className="text-stone-900 font-medium tabular-nums mt-0.5">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Financials Breakdown */}
            <div className="border-t border-stone-200 pt-3 space-y-2 text-xs text-stone-600 tabular-nums">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-stone-900">${cartTotal.toFixed(2)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-700">
                  <span>Coupon ({appliedCoupon.code})</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Courier Express Shipping</span>
                <span>{shippingFee === 0 ? 'Complimentary' : `$${shippingFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-stone-950 pt-2 border-t border-stone-200">
                <span>Total Amount</span>
                <span className="font-mono">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Complete Purchase Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs tracking-wider uppercase rounded shadow transition-colors flex items-center justify-center gap-2 disabled:opacity-75"
            >
              {isSubmitting ? (
                <span>Authorizing Transaction...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Place Order · ${finalTotal.toFixed(2)}</span>
                </>
              )}
            </button>

            <div className="text-[11px] text-stone-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
              <span>Direct MineMart fulfillment guarantee</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
