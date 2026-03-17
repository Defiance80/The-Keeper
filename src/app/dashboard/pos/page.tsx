'use client';

import { useState } from 'react';
import { useStore } from '@/store';
import { posItems } from '@/data/mock';
import {
  Search, Minus, Plus, Trash2, CreditCard, Smartphone, Banknote, FileText, X,
  Monitor, ScanBarcode, Nfc, Printer, Archive, CheckCircle2, RotateCcw, XCircle, Percent
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
  const [barcodeInput, setBarcodeInput] = useState('');

  const filtered = posItems.filter((i) => {
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || i.category === category;
    return matchSearch && matchCat;
  });

  const subtotal = cart.reduce((a, c) => a + c.price * c.quantity, 0);
  const discountAmount = subtotal * (discount / 100);
  const tax = (subtotal - discountAmount) * 0.07;
  const total = subtotal - discountAmount + tax;

  const handleBarcodeScan = () => {
    const item = posItems[Math.floor(Math.random() * posItems.length)];
    addToCart({ id: item.id, name: item.name, category: item.category, price: item.price });
    setBarcodeInput('');
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Items */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center gap-2 bg-slate-800 border border-slate-700/50 rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-slate-500" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent text-sm text-white placeholder-slate-500 outline-none flex-1" placeholder="Search items..." />
          </div>

          {/* Barcode Scan */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-slate-800 border border-slate-700/50 rounded-lg px-3 py-2 flex-1">
              <ScanBarcode className="w-4 h-4 text-slate-500" />
              <input value={barcodeInput} onChange={(e) => setBarcodeInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleBarcodeScan()} className="bg-transparent text-sm text-white placeholder-slate-500 outline-none flex-1" placeholder="Scan barcode..." />
            </div>
            <button onClick={handleBarcodeScan} className="bg-sky-500/10 text-sky-400 px-3 py-2 rounded-lg text-sm hover:bg-sky-500/20 transition-colors">Scan</button>
          </div>

          {/* Category tabs */}
          <div className="flex gap-1 flex-wrap">
            {categories.map((c) => (
              <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${category === c ? 'bg-sky-400/10 text-sky-400' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
                {c}
              </button>
            ))}
          </div>

          {/* Items grid */}
          <div className="grid grid-cols-2 gap-2 max-h-[calc(100vh-340px)] overflow-y-auto">
            {filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => addToCart({ id: item.id, name: item.name, category: item.category, price: item.price })}
                className="bg-slate-800/60 border border-slate-700/50 rounded-lg p-3 text-left hover:border-sky-400/30 hover:bg-slate-800/80 transition-colors"
              >
                <p className="text-xs font-medium text-white line-clamp-2 mb-1">{item.name}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">{item.category}</span>
                  <span className="text-sm font-semibold text-sky-400">${item.price.toFixed(2)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Center: Cart */}
        <div className="lg:col-span-4">
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 h-full flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white">Cart ({cart.length} items)</h3>
              {cart.length > 0 && (
                <button onClick={clearCart} className="text-xs text-red-400 hover:text-red-300">Clear All</button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 min-h-[200px]">
              {cart.length === 0 && (
                <div className="flex items-center justify-center h-full text-slate-500 text-sm">No items in cart</div>
              )}
              {cart.map((item) => (
                <div key={item.id} className="bg-slate-900/40 rounded-lg p-3 border border-slate-700/30">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-sm text-white font-medium flex-1 pr-2">{item.name}</p>
                    <button onClick={() => removeFromCart(item.id)} className="text-slate-500 hover:text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateCartQty(item.id, item.quantity - 1)} className="w-6 h-6 bg-slate-700/50 rounded flex items-center justify-center text-slate-400 hover:text-white">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm text-white w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateCartQty(item.id, item.quantity + 1)} className="w-6 h-6 bg-slate-700/50 rounded flex items-center justify-center text-slate-400 hover:text-white">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="text-sm font-semibold text-white">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Discount */}
            <div className="flex items-center gap-2 mt-3 mb-2">
              <Percent className="w-4 h-4 text-slate-500" />
              <input type="number" value={discount || ''} onChange={(e) => setDiscount(Number(e.target.value))} className="bg-slate-900/50 border border-slate-700/50 rounded px-2 py-1 text-sm text-white w-16 outline-none" placeholder="0" min={0} max={100} />
              <span className="text-xs text-slate-400">% discount</span>
            </div>

            {/* Totals */}
            <div className="border-t border-slate-700/30 pt-3 space-y-1">
              <div className="flex justify-between text-sm"><span className="text-slate-400">Subtotal</span><span className="text-white">${subtotal.toFixed(2)}</span></div>
              {discount > 0 && <div className="flex justify-between text-sm"><span className="text-green-400">Discount ({discount}%)</span><span className="text-green-400">-${discountAmount.toFixed(2)}</span></div>}
              <div className="flex justify-between text-sm"><span className="text-slate-400">Tax (7%)</span><span className="text-white">${tax.toFixed(2)}</span></div>
              <div className="flex justify-between text-lg font-bold"><span className="text-white">Total</span><span className="text-sky-400">${total.toFixed(2)}</span></div>
            </div>
          </div>
        </div>

        {/* Right: Payment & Summary */}
        <div className="lg:col-span-4 space-y-3">
          {/* Customer */}
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-white mb-3">Customer</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sky-400/10 rounded-full flex items-center justify-center text-sky-400 text-sm font-bold">JP</div>
              <div>
                <p className="text-sm text-white font-medium">James R. Patterson</p>
                <p className="text-xs text-slate-400">Active Duty · 47 visits</p>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-white mb-3">Payment Method</h3>
            <div className="grid grid-cols-2 gap-2">
              {paymentMethods.map((pm) => (
                <button
                  key={pm.label}
                  onClick={() => setPaymentMethod(pm.label)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors border ${paymentMethod === pm.label ? 'bg-sky-400/10 border-sky-400/30 text-sky-400' : 'bg-slate-900/30 border-slate-700/30 text-slate-400 hover:text-white'}`}
                >
                  <pm.icon className="w-4 h-4" />
                  {pm.label}
                </button>
              ))}
            </div>
          </div>

          {/* Process Button */}
          <button className="w-full bg-sky-500 hover:bg-sky-400 text-white font-semibold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
            <CreditCard className="w-4 h-4" />
            Process Payment — ${total.toFixed(2)}
          </button>

          {/* Device Status */}
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Connected Devices</h3>
            <div className="space-y-1.5">
              {devices.map((d) => (
                <div key={d.name} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-slate-300">{d.name}</span>
                </div>
              ))}
            </div>
          </div>
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
