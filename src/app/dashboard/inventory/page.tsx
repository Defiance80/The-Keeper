'use client';

import { useState } from 'react';
import { inventoryItems } from '@/data/mock';
import { Search, AlertTriangle, Package, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function InventoryPage() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(inventoryItems.map((i) => i.category)))];
  const filtered = inventoryItems.filter((i) => {
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase()) || i.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === 'All' || i.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const lowStockCount = inventoryItems.filter((i) => i.status === 'low').length;

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">Inventory</h1>
          <p className="text-sm text-slate-400">{inventoryItems.length} items tracked · {lowStockCount} low-stock alerts</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-slate-800 border border-slate-700/50 rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-slate-500" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent text-sm text-white placeholder-slate-500 outline-none w-40" placeholder="Search SKU or name..." />
          </div>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="bg-slate-800 border border-slate-700/50 rounded-lg px-3 py-2 text-sm text-slate-300 outline-none">
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
          <Package className="w-5 h-5 text-sky-400 mb-2" />
          <p className="text-2xl font-bold text-white">{inventoryItems.length}</p>
          <p className="text-xs text-slate-400">Total SKUs</p>
        </div>
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
          <AlertTriangle className="w-5 h-5 text-red-400 mb-2" />
          <p className="text-2xl font-bold text-red-400">{lowStockCount}</p>
          <p className="text-xs text-slate-400">Low Stock</p>
        </div>
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
          <TrendingUp className="w-5 h-5 text-green-400 mb-2" />
          <p className="text-2xl font-bold text-white">5</p>
          <p className="text-xs text-slate-400">High Sell-Through</p>
        </div>
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
          <Package className="w-5 h-5 text-amber-400 mb-2" />
          <p className="text-2xl font-bold text-white">337</p>
          <p className="text-xs text-slate-400">Total Units</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left text-xs font-semibold text-slate-400 px-4 py-3">SKU</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-4 py-3">Item</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-4 py-3 hidden sm:table-cell">Category</th>
                <th className="text-center text-xs font-semibold text-slate-400 px-4 py-3">On Hand</th>
                <th className="text-center text-xs font-semibold text-slate-400 px-4 py-3 hidden md:table-cell">Reorder At</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-4 py-3 hidden lg:table-cell">Location</th>
                <th className="text-center text-xs font-semibold text-slate-400 px-4 py-3 hidden md:table-cell">Trend</th>
                <th className="text-center text-xs font-semibold text-slate-400 px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className={`border-b border-slate-700/30 transition-colors ${item.status === 'low' ? 'bg-red-400/5' : 'hover:bg-slate-700/20'}`}>
                  <td className="px-4 py-3 text-xs text-slate-500 font-mono">{item.sku}</td>
                  <td className="px-4 py-3 text-sm text-white font-medium">{item.name}</td>
                  <td className="px-4 py-3 text-sm text-slate-400 hidden sm:table-cell">{item.category}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-sm font-semibold ${item.status === 'low' ? 'text-red-400' : 'text-white'}`}>{item.onHand}</span>
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-slate-400 hidden md:table-cell">{item.reorderAt}</td>
                  <td className="px-4 py-3 text-sm text-slate-400 hidden lg:table-cell">{item.location}</td>
                  <td className="px-4 py-3 text-center hidden md:table-cell">
                    <span className="inline-flex items-center gap-1 text-xs">
                      {item.trend === 'High' ? <TrendingUp className="w-3 h-3 text-green-400" /> : item.trend === 'Low' ? <TrendingDown className="w-3 h-3 text-red-400" /> : <Minus className="w-3 h-3 text-slate-400" />}
                      <span className={item.trend === 'High' ? 'text-green-400' : item.trend === 'Low' ? 'text-red-400' : 'text-slate-400'}>{item.trend}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {item.status === 'low' ? (
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-red-400/10 text-red-400 rounded-full"><AlertTriangle className="w-3 h-3" /> Low</span>
                    ) : (
                      <span className="text-xs px-2 py-0.5 bg-green-400/10 text-green-400 rounded-full">OK</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
