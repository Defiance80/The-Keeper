'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';
import { facilities, activityFeed, revenueByFacility, weeklyRevenue } from '@/data/mock';
import {
  CreditCard, UserPlus, Building2, BookOpen, Users, DollarSign,
  ShoppingCart, Clock, AlertTriangle, CheckCircle2, Cloud, Lock, Wifi, Monitor, Server,
  TrendingUp, Zap, BarChart3, Target
} from 'lucide-react';

const heroCards = [
  { label: "Today's Transactions", value: '287', icon: CreditCard, color: 'sky' },
  { label: 'Online Registrations', value: '34', icon: UserPlus, color: 'emerald' },
  { label: 'Facility Reservations', value: '18', icon: Building2, color: 'violet' },
  { label: 'Active Programs', value: '14', icon: BookOpen, color: 'amber' },
  { label: 'Check-Ins / Visits', value: '312', icon: Users, color: 'cyan' },
  { label: 'Revenue Today', value: '$8,247', icon: DollarSign, color: 'green' },
];

const colorMap: Record<string, string> = {
  sky: 'bg-sky-400/10 text-sky-400',
  emerald: 'bg-emerald-400/10 text-emerald-400',
  violet: 'bg-violet-400/10 text-violet-400',
  amber: 'bg-amber-400/10 text-amber-400',
  cyan: 'bg-cyan-400/10 text-cyan-400',
  green: 'bg-green-400/10 text-green-400',
};

const opsSnapshot = [
  { label: 'Open POS Sessions', value: '4', icon: ShoppingCart, status: 'active' },
  { label: 'Pending Approvals', value: '3', icon: Clock, status: 'warning' },
  { label: 'Waitlisted', value: '18', icon: Users, status: 'info' },
  { label: 'Low-Stock Alerts', value: '5', icon: AlertTriangle, status: 'danger' },
  { label: 'Reconciliation', value: 'On Track', icon: CheckCircle2, status: 'success' },
];

const compliance = [
  { label: 'Cloud Hosted', icon: Cloud },
  { label: 'Encrypted Data', icon: Lock },
  { label: 'PCI Ready', icon: CheckCircle2 },
  { label: 'Multi-Location', icon: Wifi },
  { label: 'Concurrent Users', icon: Monitor },
];

const beyondRfq = [
  { label: 'Busiest Facility', value: 'Event Hall (88%)', icon: Target },
  { label: 'Top-Selling Item', value: 'Day Pass — Family', icon: TrendingUp },
  { label: 'Program Fill Rate', value: '84.2%', icon: BarChart3 },
  { label: 'Avg Transaction Time', value: '47s', icon: Zap },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {heroCards.map((card) => (
          <div key={card.label} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 hover:border-slate-600/50 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorMap[card.color]}`}>
                <card.icon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{card.value}</p>
            <p className="text-xs text-slate-400 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Executive Command Center */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
          <Server className="w-4 h-4 text-sky-400" />
          Executive Command Center
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {beyondRfq.map((item) => (
            <div key={item.label} className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/30">
              <div className="flex items-center gap-2 mb-1">
                <item.icon className="w-3.5 h-3.5 text-sky-400" />
                <span className="text-xs text-slate-400">{item.label}</span>
              </div>
              <p className="text-sm font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ops Snapshot */}
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Operations Snapshot</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {opsSnapshot.map((op) => (
            <div key={op.label} className="flex items-center gap-3 bg-slate-900/40 rounded-lg p-3 border border-slate-700/30">
              <op.icon className={`w-5 h-5 flex-shrink-0 ${op.status === 'active' ? 'text-sky-400' : op.status === 'warning' ? 'text-amber-400' : op.status === 'danger' ? 'text-red-400' : op.status === 'success' ? 'text-green-400' : 'text-slate-400'}`} />
              <div>
                <p className="text-sm font-bold text-white">{op.value}</p>
                <p className="text-[11px] text-slate-400">{op.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Facility Utilization */}
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Facility Utilization</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {facilities.map((f) => (
            <div key={f.id} className="bg-slate-900/40 rounded-lg p-3 border border-slate-700/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-white">{f.name}</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${f.status === 'Open' ? 'bg-green-400/10 text-green-400' : 'bg-amber-400/10 text-amber-400'}`}>
                  {f.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-400 mb-2">
                <span>{f.bookings} bookings</span>
                <span>{f.openSlots} open slots</span>
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-2">
                <div className="h-2 rounded-full transition-all" style={{ width: `${f.utilization}%`, backgroundColor: f.color }} />
              </div>
              <p className="text-right text-[11px] text-slate-400 mt-1">{f.utilization}% utilized</p>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Revenue by Facility */}
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-slate-300 mb-4">Revenue by Facility</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueByFacility}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} angle={-20} textAnchor="end" height={60} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: 8, color: '#f8fafc' }} />
                <Bar dataKey="revenue" fill="#38bdf8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Trend */}
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-slate-300 mb-4">Registrations vs Walk-Ins (This Week)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: 8, color: '#f8fafc' }} />
                <Area type="monotone" dataKey="walkIns" stackId="1" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.3} name="Walk-Ins" />
                <Area type="monotone" dataKey="registrations" stackId="1" stroke="#34d399" fill="#34d399" fillOpacity={0.3} name="Registrations" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Smart Alerts & Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Smart Alerts */}
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            Smart Alerts
          </h3>
          <div className="space-y-2">
            <div className="flex items-start gap-3 bg-red-400/5 border border-red-400/20 rounded-lg p-3">
              <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-white font-medium">Overbook Risk — Kids Swim Lessons</p>
                <p className="text-xs text-slate-400 mt-0.5">5 on waitlist, capacity reached. Consider adding session.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-amber-400/5 border border-amber-400/20 rounded-lg p-3">
              <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-white font-medium">Low Inventory — 5 Items Below Threshold</p>
                <p className="text-xs text-slate-400 mt-0.5">Protein Shakes, Trail Mix, Sunscreen, Camping Gear, PA System</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-sky-400/5 border border-sky-400/20 rounded-lg p-3">
              <TrendingUp className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-white font-medium">Peak Portal Activity — 2:00-3:00 PM</p>
                <p className="text-xs text-slate-400 mt-0.5">12 registrations in the last hour. 3 abandoned carts detected.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-violet-400/5 border border-violet-400/20 rounded-lg p-3">
              <Users className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-white font-medium">No-Show Rate: 8.3% This Week</p>
                <p className="text-xs text-slate-400 mt-0.5">Fitness classes have the highest no-show rate. Consider reminder SMS.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-slate-300 mb-3">Live Activity Feed</h3>
          <div className="space-y-1 max-h-80 overflow-y-auto">
            {activityFeed.map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-slate-700/30 last:border-0">
                <span className="text-[11px] text-slate-500 font-mono w-10 flex-shrink-0 pt-0.5">{item.time}</span>
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${item.type === 'alert' ? 'bg-amber-400' : item.type === 'registration' ? 'bg-emerald-400' : item.type === 'reservation' ? 'bg-violet-400' : 'bg-sky-400'}`} />
                <p className="text-sm text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compliance Strip */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-3">
        <div className="flex flex-wrap items-center justify-center gap-6">
          {compliance.map((c) => (
            <div key={c.label} className="flex items-center gap-2 text-slate-400">
              <c.icon className="w-4 h-4 text-green-400" />
              <span className="text-xs font-medium">{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
