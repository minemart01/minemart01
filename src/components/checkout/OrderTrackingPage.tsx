import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ArrowLeft,
  XCircle,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';

export const OrderTrackingPage: React.FC = () => {
  const { orders, selectedOrderId, setActiveView, cancelOrder } = useStore();

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

  const canCancel = currentOrder.orderStatus === 'placed' || currentOrder.orderStatus === 'processing';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Back button */}
      <div className="flex items-center justify-between text-xs text-stone-500 pb-4 border-b border-stone-200">
        <button
          onClick={() => setActiveView('profile')}
          className="flex items-center gap-1.5 text-stone-700 hover:text-stone-950 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to My Orders</span>
        </button>

        <span className="font-mono text-stone-700">Order Ref: {currentOrder.orderNumber}</span>
      </div>

      {/* Main Tracking Card */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 space-y-8 shadow-xs">
        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Live Shipment Tracking
            </span>
            <h1 className="font-display text-2xl font-semibold text-stone-900 mt-0.5">
              Order {currentOrder.orderNumber}
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Placed on {new Date(currentOrder.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`text-xs px-3 py-1.5 rounded-full font-semibold capitalize ${
                currentOrder.orderStatus === 'delivered'
                  ? 'bg-emerald-100 text-emerald-800'
                  : currentOrder.orderStatus === 'cancelled'
                  ? 'bg-rose-100 text-rose-800'
                  : 'bg-amber-100 text-amber-900'
              }`}
            >
              Status: {currentOrder.orderStatus.replace(/_/g, ' ')}
            </span>

            {canCancel && (
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to cancel this order?')) {
                    cancelOrder(currentOrder.id);
                  }
                }}
                className="text-xs text-rose-600 hover:text-rose-800 border border-rose-200 hover:border-rose-400 px-3 py-1.5 rounded font-medium transition-colors"
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="space-y-6">
          <h3 className="font-display text-base font-semibold text-stone-900">
            Shipment Milestones
          </h3>

          <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
            {currentOrder.trackingMilestones.map((milestone, idx) => {
              const isDone = milestone.completed;
              return (
                <div key={idx} className="relative flex items-start gap-4">
                  {/* Status Node Icon */}
                  <div
                    className={`absolute -left-6 sm:-left-8 w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      isDone
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-200 text-stone-500 border border-stone-300'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <Clock className="w-3.5 h-3.5" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                      <h4
                        className={`font-semibold ${
                          isDone ? 'text-stone-900' : 'text-stone-500'
                        }`}
                      >
                        {milestone.title}
                      </h4>
                      <span className="text-stone-400 font-mono text-[11px]">
                        {milestone.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Courier Details & Support Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-stone-200 text-xs">
          <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 space-y-1.5">
            <h4 className="font-semibold text-stone-900 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-stone-700" />
              <span>Courier Partner Info</span>
            </h4>
            <p className="text-stone-600">Carrier: FedEx Priority Freight Air</p>
            <p className="text-stone-600">
              Tracking Waybill:{' '}
              <span className="font-mono font-medium text-stone-900">
                FX-9281048-MM
              </span>
            </p>
            <p className="text-stone-500 text-[11px] pt-1">
              Live updates sync every 4 hours from transit hubs.
            </p>
          </div>

          <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 space-y-1.5">
            <h4 className="font-semibold text-stone-900 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-stone-700" />
              <span>Need Assistance?</span>
            </h4>
            <p className="text-stone-600">Concierge Desk: support@minemart.com</p>
            <p className="text-stone-600">Direct Telephone: +1 (555) 349-2810</p>
            <p className="text-stone-500 text-[11px] pt-1">
              Have your order number MM-8091-OCT ready for expedited support.
            </p>
          </div>
        </div>

        {/* Items Recap */}
        <div className="pt-6 border-t border-stone-200">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-3">
            Package Contents ({currentOrder.items.length})
          </h4>
          <div className="space-y-3">
            {currentOrder.items.map((item, idx) => (
              <div key={idx} className="flex gap-3 text-xs items-center p-2.5 bg-stone-50/60 rounded border border-stone-200">
                <img
                  src={item.image}
                  alt={item.productTitle}
                  className="w-12 h-14 object-cover rounded bg-stone-200 shrink-0"
                />
                <div className="flex-1">
                  <span className="text-[10px] text-stone-500 font-semibold uppercase">{item.brand}</span>
                  <p className="font-semibold text-stone-900">{item.productTitle}</p>
                  <p className="text-[11px] text-stone-500">
                    Size: {item.selectedSize} · Color: {item.selectedColor} · Quantity: {item.quantity}
                  </p>
                </div>
                <span className="font-bold font-mono text-stone-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
