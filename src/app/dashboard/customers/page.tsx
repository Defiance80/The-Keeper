'use client';

import { useState } from 'react';
import { customers } from '@/data/mock';
import { Search, X, User, Phone, Mail, Calendar, FileCheck, Activity, Users, ChevronRight, Filter } from 'lucide-react';

interface Customer {
  id: number; name: string; email: string; phone: string; status: string; type: string;
  household: number; visits: number; lastVisit: string; waivers: boolean; balance: number;
}

function ProfileDrawer({ customer, onClose }: { customer: Customer; onClose: () => void }) {
  const visitHistory = [
    { date: '2026-03-17', action: 'Check-in — Fitness Center', type: 'visit' },
    { date: '2026-03-15', action: 'Registered: Intramural Basketball', type: 'registration' },
    { date: '2026-03-12', action: 'Equipment Rental — Kayak', type: 'rental' },
    { date: '2026-03-10', action: 'Check-in — Aquatics Area', type: 'visit' },
    { date: '2026-03-07', action: 'POS Purchase — $18.50', type: 'purchase' },
    { date: '2026-03-04', action: 'Check-in — Fitness Center', type: 'visit' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-md bg-slate-800 border-l border-slate-700 h-full overflow-y-auto animate-slide-in">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Customer Profile</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
          </div>

          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-sky-400/10 rounded-full flex items-center justify-center">
              <User className="w-7 h-7 text-sky-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">{customer.name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${customer.status === 'Active Member' ? 'bg-green-400/10 text-green-400' : customer.status === 'Walk-in Visitor' ? 'bg-amber-400/10 text-amber-400' : 'bg-sky-400/10 text-sky-400'}`}>
                {customer.status}
              </span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-sm"><Mail className="w-4 h-4 text-slate-400" /><span className="text-slate-300">{customer.email}</span></div>
            <div className="flex items-center gap-3 text-sm"><Phone className="w-4 h-4 text-slate-400" /><span className="text-slate-300">{customer.phone}</span></div>
            <div className="flex items-center gap-3 text-sm"><Users className="w-4 h-4 text-slate-400" /><span className="text-slate-300">Household: {customer.household} members</span></div>
            <div className="flex items-center gap-3 text-sm"><Calendar className="w-4 h-4 text-slate-400" /><span className="text-slate-300">Last Visit: {customer.lastVisit}</span></div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-slate-900/50 rounded-lg p-3 text-center border border-slate-700/30">
              <p className="text-xl font-bold text-white">{customer.visits}</p>
              <p className="text-[11px] text-slate-400">Total Visits</p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3 text-center border border-slate-700/30">
              <p className="text-xl font-bold text-white">{customer.waivers ? '✓' : '✗'}</p>
              <p className="text-[11px] text-slate-400">Waivers</p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3 text-center border border-slate-700/30">
              <p className={`text-xl font-bold ${customer.balance > 0 ? 'text-amber-400' : 'text-green-400'}`}>${customer.balance.toFixed(2)}</p>
              <p className="text-[11px] text-slate-400">Balance</p>
            </div>
          </div>

          {/* Visit History */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4" /> Visit & Activity History
            </h4>
            <div className="space-y-0">
              {visitHistory.map((v, i) => (
                <div key={i} className="flex items-start gap-3 py-2.5 border-b border-slate-700/30 last:border-0">
                  <div className="w-16 text-[11px] text-slate-500 font-mono pt-0.5">{v.date.slice(5)}</div>
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${v.type === 'visit' ? 'bg-sky-400' : v.type === 'registration' ? 'bg-emerald-400' : v.type === 'rental' ? 'bg-violet-400' : 'bg-amber-400'}`} />
                  <p className="text-sm text-slate-300">{v.action}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Registration History */}
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
              <FileCheck className="w-4 h-4" /> Registrations
            </h4>
            <div className="space-y-2">
              <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/30">
                <p className="text-sm text-white font-medium">Intramural Basketball League</p>
                <p className="text-xs text-slate-400">Registered Mar 15 · $40.00 · Active</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/30">
                <p className="text-sm text-white font-medium">Morning Power Fitness</p>
                <p className="text-xs text-slate-400">Registered Feb 28 · $45.00 · Active</p>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-slate-300 mb-2">Notes</h4>
            <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/30">
              <p className="text-sm text-slate-400 italic">Prefers morning sessions. Has requested notification for new aquatics programs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CustomersPage() {
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = customers.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">Customers</h1>
          <p className="text-sm text-slate-400">183 registered customers · 47 active today</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-slate-800 border border-slate-700/50 rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-slate-500" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent text-sm text-white placeholder-slate-500 outline-none w-48" placeholder="Search customers..." />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-slate-800 border border-slate-700/50 rounded-lg px-3 py-2 text-sm text-slate-300 outline-none">
            <option value="All">All Status</option>
            <option value="Active Member">Active Member</option>
            <option value="Walk-in Visitor">Walk-in Visitor</option>
            <option value="Frequent Renter">Frequent Renter</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left text-xs font-semibold text-slate-400 px-4 py-3">Name</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-4 py-3 hidden md:table-cell">Email</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-4 py-3 hidden sm:table-cell">Status</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-4 py-3 hidden lg:table-cell">Type</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-4 py-3 hidden lg:table-cell">Visits</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-4 py-3 hidden xl:table-cell">Last Visit</th>
                <th className="text-right text-xs font-semibold text-slate-400 px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors cursor-pointer" onClick={() => setSelectedCustomer(c)}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-sky-400/10 rounded-full flex items-center justify-center text-sky-400 text-xs font-bold flex-shrink-0">
                        {c.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <span className="text-sm text-white font-medium">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-400 hidden md:table-cell">{c.email}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.status === 'Active Member' ? 'bg-green-400/10 text-green-400' : c.status === 'Walk-in Visitor' ? 'bg-amber-400/10 text-amber-400' : 'bg-sky-400/10 text-sky-400'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-400 hidden lg:table-cell">{c.type}</td>
                  <td className="px-4 py-3 text-sm text-slate-400 hidden lg:table-cell">{c.visits}</td>
                  <td className="px-4 py-3 text-sm text-slate-400 hidden xl:table-cell">{c.lastVisit}</td>
                  <td className="px-4 py-3 text-right">
                    <ChevronRight className="w-4 h-4 text-slate-500 inline" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-slate-700/30 flex items-center justify-between text-xs text-slate-400">
          <span>Showing {filtered.length} of 183 customers</span>
          <div className="flex gap-1">
            <button className="px-2 py-1 bg-sky-400/10 text-sky-400 rounded">1</button>
            <button className="px-2 py-1 hover:bg-slate-700 rounded">2</button>
            <button className="px-2 py-1 hover:bg-slate-700 rounded">3</button>
            <button className="px-2 py-1 hover:bg-slate-700 rounded">…</button>
            <button className="px-2 py-1 hover:bg-slate-700 rounded">13</button>
          </div>
        </div>
      </div>

      {selectedCustomer && <ProfileDrawer customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />}
    </div>
  );
}
