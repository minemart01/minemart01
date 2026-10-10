import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Address } from '../../types';
import {
  User as UserIcon,
  Package,
  MapPin,
  Heart,
  Plus,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Check,
  LogOut,
  ChevronRight,
} from 'lucide-react';

export const UserProfilePage: React.FC = () => {
  const {
    currentUser,
    orders,
    wishlist,
    products,
    isAdmin,
    logout,
    setActiveView,
    setSelectedOrderId,
    setSelectedProductId,
    addAddress,
    removeAddress,
    setDefaultAddress,
    updateUserProfile,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile'>('orders');

  // Address modal/form
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddr, setNewAddr] = useState<Omit<Address, 'id'>>({
    fullName: currentUser?.name || '',
    phone: currentUser?.phone || '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
  });

  // Profile edit
  const [editName, setEditName] = useState(currentUser?.name || '');
  const [editPhone, setEditPhone] = useState(currentUser?.phone || '');

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center">
        <h2 className="font-display text-xl font-semibold text-stone-900 mb-2">Sign in to view your profile</h2>
        <p className="text-xs text-stone-500 mb-4">Manage orders, saved addresses, and tailored collections.</p>
        <button
          onClick={() => setActiveView('home')}
          className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded"
        >
          Return Home
        </button>
      </div>
    );
  }

  const userOrders = orders.filter((o) => o.userId === currentUser.id || o.customerEmail === currentUser.email);
  const wishProducts = products.filter((p) => wishlist.includes(p.id));

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.street || !newAddr.city || !newAddr.postalCode) return;
    addAddress(newAddr);
    setShowAddressModal(false);
    setNewAddr({
      fullName: currentUser.name,
      phone: currentUser.phone || '',
      street: '',
      city: '',
      state: '',
      postalCode: '',
    });
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name: editName, phone: editPhone });
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-10 space-y-6 sm:space-y-8">
      {/* Profile Header */}
      <div className="bg-white border border-stone-200 rounded-xl p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 shadow-xs">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-stone-100 border border-stone-200 rounded-full flex items-center justify-center text-stone-800 text-lg sm:text-xl font-display font-semibold shrink-0">
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-display text-xl sm:text-2xl font-semibold text-stone-900 truncate">
                {currentUser.name}
              </h1>
              {isAdmin && (
                <span className="text-[10px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-amber-600" />
                  <span>Admin</span>
                </span>
              )}
            </div>
            <p className="text-xs text-stone-500 mt-0.5 truncate">{currentUser.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {isAdmin && (
            <button
              onClick={() => setActiveView('admin')}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold rounded flex items-center gap-1.5 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Admin Console</span>
            </button>
          )}

          <button
            onClick={logout}
            className="px-3 sm:px-3.5 py-1.5 sm:py-2 text-stone-600 hover:text-stone-900 border border-stone-200 hover:border-stone-400 text-xs font-medium rounded flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Profile Navigation Tabs */}
      <div className="flex items-center gap-1.5 sm:gap-2 border-b border-stone-200 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded transition-colors ${
            activeTab === 'orders'
              ? 'bg-stone-900 text-white'
              : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>My Orders ({userOrders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded transition-colors ${
            activeTab === 'addresses'
              ? 'bg-stone-900 text-white'
              : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Saved Addresses ({currentUser.addresses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded transition-colors ${
            activeTab === 'profile'
              ? 'bg-stone-900 text-white'
              : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100'
          }`}
        >
          <UserIcon className="w-4 h-4" />
          <span>Account Settings</span>
        </button>
      </div>

      {/* Tab 1: Orders History */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {userOrders.length === 0 ? (
            <div className="p-12 text-center bg-white border border-stone-200 rounded-lg">
              <Package className="w-10 h-10 text-stone-300 mx-auto mb-2" />
              <h3 className="font-display text-base font-semibold text-stone-800">
                No orders placed yet
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Your direct atelier purchases and order tracking history will be listed here.
              </p>
              <button
                onClick={() => setActiveView('catalog')}
                className="mt-4 px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded"
              >
                Explore Curations
              </button>
            </div>
          ) : (
            userOrders.map((ord) => (
              <div
                key={ord.id}
                className="bg-white border border-stone-200 rounded-lg p-5 space-y-4 shadow-2xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100 text-xs">
                  <div>
                    <span className="font-mono font-semibold text-stone-900">
                      {ord.orderNumber}
                    </span>
                    <span className="text-stone-400 mx-2">·</span>
                    <span className="text-stone-500">
                      {new Date(ord.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[11px] font-semibold capitalize ${
                        ord.orderStatus === 'delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : ord.orderStatus === 'cancelled'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {ord.orderStatus.replace(/_/g, ' ')}
                    </span>
                    <span className="font-bold font-mono text-stone-950">
                      ${ord.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Items preview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ord.items.map((item, idx) => (
                    <div key={idx} className="flex gap-3 text-xs items-center p-2 bg-stone-50 rounded">
                      <img
                        src={item.image}
                        alt={item.productTitle}
                        className="w-12 h-14 object-cover rounded bg-stone-200 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-stone-900 truncate">{item.productTitle}</p>
                        <p className="text-stone-500 text-[11px]">
                          Size: {item.selectedSize} · Color: {item.selectedColor} · Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-stone-500">
                    Delivering to: {ord.shippingAddress.city}, {ord.shippingAddress.state}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedOrderId(ord.id);
                      setActiveView('tracking');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="font-semibold text-stone-900 hover:text-stone-700 flex items-center gap-1"
                  >
                    <span>Track Shipment</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Saved Addresses */}
      {activeTab === 'addresses' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-display text-base font-semibold text-stone-900">
              Address Book
            </h3>
            <button
              onClick={() => setShowAddressModal(true)}
              className="px-3.5 py-1.5 bg-stone-900 text-white text-xs font-semibold rounded flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Address</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentUser.addresses.map((addr) => (
              <div
                key={addr.id}
                className="bg-white border border-stone-200 rounded-lg p-5 space-y-2 text-xs relative"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-900 text-sm">{addr.fullName}</span>
                  {addr.isDefault ? (
                    <span className="text-[10px] bg-stone-100 text-stone-800 font-medium px-2 py-0.5 rounded">
                      Default Delivery Address
                    </span>
                  ) : (
                    <button
                      onClick={() => setDefaultAddress(addr.id)}
                      className="text-[11px] text-stone-500 hover:text-stone-900 underline"
                    >
                      Make Default
                    </button>
                  )}
                </div>

                <p className="text-stone-600">{addr.street}</p>
                <p className="text-stone-600">
                  {addr.city}, {addr.state} {addr.postalCode}
                </p>
                <p className="text-stone-500 pt-1">Phone: {addr.phone}</p>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => removeAddress(addr.id)}
                    className="text-rose-600 hover:text-rose-800 flex items-center gap-1 text-[11px]"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Account Settings */}
      {activeTab === 'profile' && (
        <div className="max-w-md bg-white border border-stone-200 rounded-lg p-6 space-y-4">
          <h3 className="font-display text-base font-semibold text-stone-900">
            Personal Information
          </h3>

          <form onSubmit={handleUpdateProfile} className="space-y-3 text-xs">
            <div>
              <label className="block text-stone-700 font-medium mb-1">Full Name</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">Email Address</label>
              <input
                type="email"
                disabled
                value={currentUser.email}
                className="w-full p-2.5 bg-stone-100 text-stone-500 border border-stone-200 rounded cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">Mobile Phone</label>
              <input
                type="tel"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded"
              />
            </div>

            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-stone-900 text-white font-semibold rounded text-xs"
            >
              Update Profile Details
            </button>
          </form>
        </div>
      )}

      {/* Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-lg max-w-md w-full p-6 space-y-4 shadow-xl">
            <h3 className="font-display text-base font-semibold text-stone-900">
              Add New Shipping Address
            </h3>

            <form onSubmit={handleSaveAddress} className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-700 font-medium mb-1">Recipient Name</label>
                <input
                  type="text"
                  required
                  value={newAddr.fullName}
                  onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                  className="w-full p-2 border border-stone-300 rounded bg-stone-50"
                />
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={newAddr.phone}
                  onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                  className="w-full p-2 border border-stone-300 rounded bg-stone-50"
                />
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={newAddr.street}
                  onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                  className="w-full p-2 border border-stone-300 rounded bg-stone-50"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="City"
                  required
                  value={newAddr.city}
                  onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                  className="p-2 border border-stone-300 rounded bg-stone-50"
                />
                <input
                  type="text"
                  placeholder="State"
                  required
                  value={newAddr.state}
                  onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                  className="p-2 border border-stone-300 rounded bg-stone-50"
                />
                <input
                  type="text"
                  placeholder="ZIP"
                  required
                  value={newAddr.postalCode}
                  onChange={(e) => setNewAddr({ ...newAddr, postalCode: e.target.value })}
                  className="p-2 border border-stone-300 rounded bg-stone-50"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddressModal(false)}
                  className="px-3 py-2 border border-stone-300 text-stone-700 rounded text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-900 text-white rounded text-xs font-semibold"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
