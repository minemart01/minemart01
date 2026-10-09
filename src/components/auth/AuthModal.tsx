import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, ShieldCheck, User as UserIcon, Lock, Check } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, signup, setActiveView } = useStore();

  const [mode, setMode] = useState<'signin' | 'signup' | 'admin'>('signin');
  const [email, setEmail] = useState('vijayapatil0085@gmail.com');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [adminPasscode, setAdminPasscode] = useState('admin123');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'admin') {
      login('admin@minemart.com', 'admin');
      setActiveView('admin');
      onClose();
    } else if (mode === 'signin') {
      login(email, 'customer');
      onClose();
    } else {
      signup(name || 'Customer', email, phone);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-xl max-w-sm w-full p-6 space-y-5 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1"
          aria-label="Close authentication modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <span className="font-display text-2xl font-bold text-stone-900 tracking-tight">
              MineMart
            </span>
          </div>
          <p className="text-xs text-stone-500">
            {mode === 'admin'
              ? 'Merchant & Catalog Administration'
              : mode === 'signup'
              ? 'Create your customer atelier account'
              : 'Sign in to access orders & saved collections'}
          </p>
        </div>

        {/* Tab switchers */}
        <div className="grid grid-cols-3 gap-1 bg-stone-100 p-1 rounded-lg text-xs font-medium text-stone-600">
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`py-1.5 rounded transition-colors ${
              mode === 'signin' ? 'bg-white text-stone-900 shadow-2xs font-semibold' : ''
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`py-1.5 rounded transition-colors ${
              mode === 'signup' ? 'bg-white text-stone-900 shadow-2xs font-semibold' : ''
            }`}
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => setMode('admin')}
            className={`py-1.5 rounded transition-colors flex items-center justify-center gap-1 ${
              mode === 'admin' ? 'bg-white text-amber-900 shadow-2xs font-semibold' : 'text-stone-500'
            }`}
          >
            <ShieldCheck className="w-3 h-3 text-amber-600" />
            <span>Admin</span>
          </button>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {mode === 'signup' && (
            <div>
              <label className="block text-stone-700 font-medium mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Vijay Patil"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:border-stone-900"
              />
            </div>
          )}

          {mode !== 'admin' ? (
            <>
              <div>
                <label className="block text-stone-700 font-medium mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:border-stone-900"
                />
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:border-stone-900"
                  />
                </div>
              )}
            </>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block text-stone-700 font-medium mb-1">Admin Email</label>
                <input
                  type="email"
                  disabled
                  value="admin@minemart.com"
                  className="w-full p-2.5 bg-stone-100 text-stone-600 border border-stone-300 rounded font-mono"
                />
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-1">Admin Passcode</label>
                <input
                  type="password"
                  value={adminPasscode}
                  onChange={(e) => setAdminPasscode(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded font-mono"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-semibold tracking-wider uppercase text-xs rounded shadow transition-colors"
          >
            {mode === 'admin'
              ? 'Enter Merchant Console'
              : mode === 'signup'
              ? 'Create MineMart Account'
              : 'Sign In to MineMart'}
          </button>
        </form>

        {/* Demo Quick Fill helper */}
        <div className="pt-2 border-t border-stone-100 text-center">
          <p className="text-[11px] text-stone-400">
            {mode === 'admin'
              ? 'Pre-filled demo admin credentials ready to log in.'
              : 'Pre-filled demo customer account ready for testing.'}
          </p>
        </div>
      </div>
    </div>
  );
};
