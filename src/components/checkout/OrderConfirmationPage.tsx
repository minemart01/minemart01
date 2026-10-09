import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  CheckCircle2,
  Package,
  Truck,
  ArrowRight,
  Printer,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { orders, selectedOrderId, setActiveView, setSelectedOrderId } = useStore();

  const currentOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  if (!currentOrder) {
    return (
      <div className="max-w-md mx-auto py-16 text-center">
        <p className="text-sm text-stone-500">Order not found.</p>
        <button
          onClick={() => setActiveView('home')}
          className="mt-4 px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded"
        >
          Return Home
        </button>
      </div>
    );
  }

  const handleTrackShipment = () => {
    setSelectedOrderId(currentOrder.id);
    setActiveView('tracking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-10 shadow-sm space-y-8">
        {/* Success Header */}
        <div className="text-center space-y-3 pb-6 border-b border-stone-200">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-2xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-stone-900">
            Order Successfully Placed
          </h1>

          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
            Thank you, {currentOrder.customerName}. Your order{' '}
            <strong className="text-stone-900 font-mono">{currentOrder.orderNumber}</strong> has been confirmed and transferred to our atelier logistics hub.
          </p>

          <div className="inline-flex items-center gap-2 bg-stone-100 text-stone-700 text-xs px-3 py-1.5 rounded-full font-medium">
            <Truck className="w-3.5 h-3.5 text-stone-900" />
            <span>Estimated Delivery: Within 2–4 business days</span>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleTrackShipment}
            className="w-full sm:w-auto px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs tracking-wider uppercase rounded shadow transition-colors flex items-center justify-center gap-2"
          >
            <Package className="w-4 h-4" />
            <span>Track Live Shipment Status</span>
          </button>

          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto px-5 py-3 border border-stone-300 hover:bg-stone-50 text-stone-700 font-medium text-xs tracking-wider uppercase rounded transition-colors flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print Invoice Receipt</span>
          </button>
        </div>

        {/* Order Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-stone-200 text-xs">
          <div>
            <h4 className="font-semibold text-stone-900 uppercase tracking-wider text-[11px] mb-2">
              Delivery Address
            </h4>
            <p className="font-medium text-stone-800">{currentOrder.shippingAddress.fullName}</p>
            <p className="text-stone-600">{currentOrder.shippingAddress.street}</p>
            <p className="text-stone-600">
              {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state}{' '}
              {currentOrder.shippingAddress.postalCode}
            </p>
            <p className="text-stone-500 pt-1">Contact: {currentOrder.customerPhone}</p>
          </div>

          <div>
            <h4 className="font-semibold text-stone-900 uppercase tracking-wider text-[11px] mb-2">
              Payment & Summary
            </h4>
            <p className="text-stone-600">
              Method:{' '}
              <span className="font-semibold text-stone-800 uppercase">
                {currentOrder.paymentMethod}
              </span>
            </p>
            <p className="text-stone-600">
              Payment Status:{' '}
              <span className="font-medium text-emerald-700 capitalize">
                {currentOrder.paymentStatus}
              </span>
            </p>
            <p className="text-stone-600 pt-1">
              Total Charged:{' '}
              <span className="font-bold text-stone-950 font-mono text-sm">
                ${currentOrder.total.toFixed(2)}
              </span>
            </p>
          </div>
        </div>

        {/* Itemized List */}
        <div className="border-t border-stone-200 pt-6">
          <h4 className="font-semibold text-stone-900 text-xs uppercase tracking-wider mb-4">
            Items in this Shipment
          </h4>
          <div className="space-y-3">
            {currentOrder.items.map((item, idx) => (
              <div key={idx} className="flex gap-4 p-3 bg-stone-50 rounded-lg border border-stone-200/80 text-xs">
                <img
                  src={item.image}
                  alt={item.productTitle}
                  className="w-16 h-20 object-cover rounded bg-stone-200 shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold">
                      {item.brand}
                    </span>
                    <h5 className="font-semibold text-stone-900 mt-0.5">{item.productTitle}</h5>
                    <p className="text-stone-500 text-[11px] mt-0.5">
                      Qty: {item.quantity} · Size: {item.selectedSize} · Color: {item.selectedColor}
                    </p>
                  </div>
                  <span className="font-bold text-stone-950 font-mono tabular-nums">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs">
          <button
            onClick={() => setActiveView('profile')}
            className="text-stone-600 hover:text-stone-950 font-medium"
          >
            View My Orders History
          </button>
          <button
            onClick={() => setActiveView('catalog')}
            className="text-stone-900 hover:text-stone-700 font-semibold flex items-center gap-1"
          >
            <span>Continue Shopping</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
