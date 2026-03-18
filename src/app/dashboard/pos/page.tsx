'use client';

import { useState } from 'react';
import { useStore } from '@/store';
import { posItems } from '@/data/mock';
import {
  Search, Minus, Plus, Trash2, CreditCard, Smartphone, Banknote, FileText, X,
  Monitor, ScanBarcode, Nfc, Printer, Archive, CheckCircle2, RotateCcw, XCircle, Percent, User, ShoppingCart, Wallet
} from 'lucide-react';

const categories = ['All', 'Retail', 'Admissions', 'Rentals', 'Programs'];
const paymentMethods = [
  { label: 'Credit/Debit', icon: CreditCard },
  { label: 'NFC/Tap', icon: Smartphone },
  { label: 'ACH', icon: FileText },
  { label: 'Cash', icon: Banknote },
  { label: 'Check', icon: FileText },
];

const devices = [
  { name: 'Touchscreen terminal', icon: Monitor, status: true },
  { name: 'Barcode scanner', icon: ScanBarcode, status: true },
  { name: 'EMV/NFC reader', icon: Nfc, status: true },
  { name: 'Receipt printer', icon: Printer, status: true },
  { name: 'Cash drawer', icon: Archive, status: true },
];

export default function POSPage() {
  const { cart, addToCart, removeFromCart, updateCartQty, clearCart, paymentMethod, setPaymentMethod } = useStore();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [showRefund, setShowRefund] = useState(false);
  const [showVoid, setShowVoid] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [tenderAmount, setTenderAmount] = useState('');

  const filtered = posItems.filter((i) => {
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || i.category === category;
    return matchSearch && matchCat;
  });

  const subtotal = cart.reduce((a, c) => a + c.price * c.quantity, 0);
  const discountAmount = subtotal * (discount / 100);
  const tax = (subtotal - discountAmount) * 0.07;
  const total = subtotal - discountAmount + tax;

  return (
    <div className="animate-fade-in flex flex-col lg:h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 flex-shrink-0">
        <div>
          <h1 className="text-xl font-bold text-white">POS Operations</h1>
          <p className="text-sm text-slate-400">Terminal 1 — Fitness Center · Session Active</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowRefund(true)} className="flex items-center gap-1.5 text-sm bg-amber-500/10 text-amber-400 px-3 py-1.5 rounded-lg hover:bg-amber-500/20 transition-colors">
            <RotateCcw className="w-3.5 h-3.5" /> Return
          </button>
          <button onClick={() => setShowVoid(true)} className="flex items-center gap-1.5 text-sm bg-red-500/10 text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-500/20 transition-colors">
            <XCircle className="w-3.5 h-3.5" /> Void
          </button>
        </div>
      </div>

      {/* Three-Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0 space-y-4 lg:space-y-0">

        {/* LEFT PANEL — Product Browsing */}
        <div className="lg:col-span-4 bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-700/30 bg-gradient-to-r from-slate-700/30 to-transparent flex items-center gap-2">
            <Search className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-semibold text-white">Browse Items</h3>
          </div>

          <div className="p-3 space-y-3">
            {/* Search */}
            <div className="flex items-center gap-2 bg-slate-900/50 border border-slate-700/50 rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-slate-500" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent text-sm text-white placeholder-slate-500 outline-none flex-1" placeholder="Search items..." />
            </div>

            {/* Category tabs */}
            <div className="flex gap-1 flex-nowrap overflow-x-auto scrollbar-hide sm:flex-wrap">
              {categories.map((c) => (
                <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap flex-shrink-0 ${category === c ? 'bg-sky-400/10 text-sky-400 border border-sky-400/30' : 'bg-slate-900/30 text-slate-400 hover:text-white border border-slate-700/30'}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Items grid */}
          <div className="flex-1 overflow-y-auto p-3 pt-0">
            <div className="grid grid-cols-2 gap-2">
              {filtered.map((item) => (
                <button
                  key={item.id}
                  onClick={() => addToCart({ id: item.id, name: item.name, category: item.category, price: item.price })}
                  className="bg-slate-900/40 border border-slate-700/30 rounded-lg p-3 text-left hover:border-sky-400/30 hover:bg-slate-800/80 hover:shadow-lg hover:shadow-sky-400/5 transition-all group"
                >
                  <p className="text-xs font-medium text-white line-clamp-2 mb-2 group-hover:text-sky-300 transition-colors">{item.name}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">{item.category}</span>
                    <span className="text-sm font-bold text-sky-400">${item.price.toFixed(2)}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER PANEL — Cart */}
        <div className="lg:col-span-4 bg-gradient-to-br from-slate-800/70 to-slate-850/50 backdrop-blur-sm border border-slate-700/50 rounded-xl flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-700/30 bg-gradient-to-r from-slate-700/30 to-transparent flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-sky-400" />
              <h3 className="text-sm font-semibold text-white">Cart</h3>
              <span className="text-xs bg-sky-400/10 text-sky-400 px-2 py-0.5 rounded-full">{cart.length} items</span>
            </div>
            {cart.length > 0 && (
              <button onClick={clearCart} className="text-xs text-red-400 hover:text-red-300 transition-colors">Clear All</button>
            )}
          </div>

          {/* Cart items */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {cart.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-slate-500">
                <ShoppingCart className="w-8 h-8 mb-2 opacity-30" />
                <p className="text-sm">No items in cart</p>
                <p className="text-xs mt-1">Click items to add them</p>
              </div>
            )}
            {cart.map((item) => (
              <div key={item.id} className="bg-slate-900/40 rounded-lg p-3 border border-slate-700/30">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm text-white font-medium flex-1 pr-2">{item.name}</p>
                  <button onClick={() => removeFromCart(item.id)} className="text-slate-500 hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateCartQty(item.id, item.quantity - 1)} className="w-6 h-6 bg-slate-700/50 rounded flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm text-white w-6 text-center font-medium">{item.quantity}</span>
                    <button onClick={() => updateCartQty(item.id, item.quantity + 1)} className="w-6 h-6 bg-slate-700/50 rounded flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="text-sm font-semibold text-white">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Discount & Totals */}
          <div className="p-3 border-t border-slate-700/30 space-y-3 flex-shrink-0">
            <div className="flex items-center gap-2">
              <Percent className="w-4 h-4 text-slate-500" />
              <input type="number" value={discount || ''} onChange={(e) => setDiscount(Number(e.target.value))} className="bg-slate-900/50 border border-slate-700/50 rounded px-2 py-1 text-sm text-white w-16 outline-none" placeholder="0" min={0} max={100} />
              <span className="text-xs text-slate-400">% discount</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span className="text-slate-400">Subtotal</span><span className="text-white">${subtotal.toFixed(2)}</span></div>
              {discount > 0 && <div className="flex justify-between text-sm"><span className="text-green-400">Discount ({discount}%)</span><span className="text-green-400">-${discountAmount.toFixed(2)}</span></div>}
              <div className="flex justify-between text-sm"><span className="text-slate-400">Tax (7%)</span><span className="text-white">${tax.toFixed(2)}</span></div>
              <div className="flex justify-between text-lg font-bold pt-1 border-t border-slate-700/30"><span className="text-white">Total</span><span className="text-sky-400">${total.toFixed(2)}</span></div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — Payment & Customer */}
        <div className="lg:col-span-4 flex flex-col gap-3 min-h-0">
          {/* Customer */}
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl flex-shrink-0">
            <div className="px-4 py-3 border-b border-slate-700/30 bg-gradient-to-r from-slate-700/30 to-transparent flex items-center gap-2">
              <User className="w-4 h-4 text-sky-400" />
              <h3 className="text-sm font-semibold text-white">Customer</h3>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sky-400/10 rounded-full flex items-center justify-center text-sky-400 text-sm font-bold">JP</div>
                <div>
                  <p className="text-sm text-white font-medium">James R. Patterson</p>
                  <p className="text-xs text-slate-400">Active Duty · 47 visits</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 border-t-2 border-t-sky-400/50 rounded-xl flex-1 flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-700/30 bg-gradient-to-r from-slate-700/30 to-transparent flex items-center gap-2">
              <Wallet className="w-4 h-4 text-sky-400" />
              <h3 className="text-sm font-semibold text-white">Payment</h3>
            </div>
            <div className="p-3 flex-1 flex flex-col">
              <div className="grid grid-cols-2 gap-2 mb-4">
                {paymentMethods.map((pm) => (
                  <button
                    key={pm.label}
                    onClick={() => setPaymentMethod(pm.label)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-all border ${paymentMethod === pm.label ? 'bg-sky-400/10 border-sky-400/30 text-sky-400 shadow-lg shadow-sky-400/5' : 'bg-slate-900/30 border-slate-700/30 text-slate-400 hover:text-white hover:border-slate-600'}`}
                  >
                    <pm.icon className="w-4 h-4" />
                    {pm.label}
                  </button>
                ))}
              </div>

              {/* Tender Amount */}
              <div className="mb-4">
                <label className="block text-xs text-slate-400 mb-1.5">Tender Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                  <input
                    type="text"
                    value={tenderAmount}
                    onChange={(e) => setTenderAmount(e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg pl-7 pr-3 py-2.5 text-white text-sm outline-none focus:border-sky-400/50 transition-colors"
                    placeholder={total.toFixed(2)}
                  />
                </div>
              </div>

              <div className="flex-1" />

              {/* Complete Sale */}
              <button className="w-full bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white font-semibold py-3.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 min-h-[48px]">
                <CreditCard className="w-4 h-4" />
                Complete Sale — ${total.toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Device Status Strip — full width bottom */}
      <div className="mt-4 flex-shrink-0 bg-gradient-to-r from-slate-800/60 to-slate-800/40 border border-slate-700/50 rounded-xl px-4 py-2.5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex items-center gap-x-6 gap-y-2 lg:flex-wrap">
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider col-span-2 sm:col-span-3 lg:col-span-1">Devices</span>
          {devices.map((d) => (
            <div key={d.name} className="flex items-center gap-1.5 text-xs">
              <CheckCircle2 className="w-3 h-3 text-green-400" />
              <span className="text-slate-400">{d.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Refund Modal */}
      {showRefund && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowRefund(false)} />
          <div className="relative bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-md animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Issue Refund</h3>
              <button onClick={() => setShowRefund(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <div><label className="block text-sm text-slate-400 mb-1">Transaction ID</label><input className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-3 py-2 text-sm text-white outline-none" placeholder="#4819" /></div>
              <div><label className="block text-sm text-slate-400 mb-1">Refund Amount</label><input className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-3 py-2 text-sm text-white outline-none" placeholder="$0.00" /></div>
              <div><label className="block text-sm text-slate-400 mb-1">Reason</label><select className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-3 py-2 text-sm text-slate-300 outline-none"><option>Customer request</option><option>Duplicate charge</option><option>Program cancellation</option><option>Defective item</option></select></div>
              <button className="w-full bg-amber-500 hover:bg-amber-400 text-white font-medium py-2.5 rounded-lg text-sm transition-colors">Process Refund</button>
            </div>
          </div>
        </div>
      )}

      {/* Void Modal */}
      {showVoid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowVoid(false)} />
          <div className="relative bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-md animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Void Transaction</h3>
              <button onClick={() => setShowVoid(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <div><label className="block text-sm text-slate-400 mb-1">Transaction ID</label><input className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-3 py-2 text-sm text-white outline-none" placeholder="#4821" /></div>
              <div><label className="block text-sm text-slate-400 mb-1">Reason</label><input className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-3 py-2 text-sm text-white outline-none" placeholder="Enter reason for void" /></div>
              <p className="text-xs text-red-400">⚠ This action cannot be undone. The full transaction amount will be reversed.</p>
              <button className="w-full bg-red-500 hover:bg-red-400 text-white font-medium py-2.5 rounded-lg text-sm transition-colors">Confirm Void</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
