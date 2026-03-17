'use client';

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { weeklyRevenue, revenueByFacility } from '@/data/mock';
import { Download, Calendar, Filter, FileText, Clock, BarChart3, Users, Building2, CreditCard, Package, TrendingUp } from 'lucide-react';

const reportCategories = [
  { label: 'Customer Usage', icon: Users, description: 'Visit frequency, peak hours, demographics', color: 'sky' },
  { label: 'Program Participation', icon: BarChart3, description: 'Enrollment rates, fill percentages, waitlist data', color: 'emerald' },
  { label: 'Facility Utilization', icon: Building2, description: 'Booking density, peak times, idle capacity', color: 'violet' },
  { label: 'Sales by Facility', icon: CreditCard, description: 'Revenue breakdown by location and category', color: 'amber' },
  { label: 'Revenue by Payment Type', icon: CreditCard, description: 'Credit, cash, NFC, ACH, check distribution', color: 'cyan' },
  { label: 'Inventory Movement', icon: Package, description: 'Sell-through rates, reorder triggers, shrinkage', color: 'pink' },
  { label: 'Peak Usage Times', icon: Clock, description: 'Hourly and daily traffic patterns', color: 'orange' },
];

const peakHours = [
  { hour: '6AM', visitors: 45 }, { hour: '7AM', visitors: 78 }, { hour: '8AM', visitors: 92 },
  { hour: '9AM', visitors: 110 }, { hour: '10AM', visitors: 125 }, { hour: '11AM', visitors: 98 },
  { hour: '12PM', visitors: 134 }, { hour: '1PM', visitors: 112 }, { hour: '2PM', visitors: 145 },
  { hour: '3PM', visitors: 138 }, { hour: '4PM', visitors: 156 }, { hour: '5PM', visitors: 167 },
  { hour: '6PM', visitors: 143 }, { hour: '7PM', visitors: 98 }, { hour: '8PM', visitors: 67 },
  { hour: '9PM', visitors: 34 },
];

const colorClasses: Record<string, string> = {
  sky: 'bg-sky-400/10 text-sky-400', emerald: 'bg-emerald-400/10 text-emerald-400',
  violet: 'bg-violet-400/10 text-violet-400', amber: 'bg-amber-400/10 text-amber-400',
  cyan: 'bg-cyan-400/10 text-cyan-400', pink: 'bg-pink-400/10 text-pink-400',
  orange: 'bg-orange-400/10 text-orange-400',
};

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('This Week');
  const [facilityFilter, setFacilityFilter] = useState('All Facilities');
  const [activeReport, setActiveReport] = useState('Peak Usage Times');

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">Reports</h1>
          <p className="text-sm text-slate-400">Analytics & insights across all operations</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="bg-slate-800 border border-slate-700/50 rounded-lg px-3 py-2 text-sm text-slate-300 outline-none">
            <option>Today</option><option>This Week</option><option>This Month</option><option>Last 30 Days</option><option>This Quarter</option><option>Custom Range</option>
          </select>
          <select value={facilityFilter} onChange={(e) => setFacilityFilter(e.target.value)} className="bg-slate-800 border border-slate-700/50 rounded-lg px-3 py-2 text-sm text-slate-300 outline-none">
            <option>All Facilities</option><option>Fitness Center</option><option>Outdoor Fields</option><option>Community Rooms</option><option>Event Hall</option><option>Aquatics Area</option><option>Recreation Office</option>
          </select>
          <button className="flex items-center gap-1.5 bg-sky-500/10 text-sky-400 text-sm px-3 py-2 rounded-lg hover:bg-sky-500/20 transition-colors">
            <Download className="w-4 h-4" /> CSV
          </button>
          <button className="flex items-center gap-1.5 bg-sky-500/10 text-sky-400 text-sm px-3 py-2 rounded-lg hover:bg-sky-500/20 transition-colors">
            <FileText className="w-4 h-4" /> PDF
          </button>
        </div>
      </div>

      {/* Report Category Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2">
        {reportCategories.map((r) => (
          <button
            key={r.label}
            onClick={() => setActiveReport(r.label)}
            className={`p-3 rounded-xl border text-left transition-colors ${activeReport === r.label ? 'bg-sky-400/10 border-sky-400/30' : 'bg-slate-800/60 border-slate-700/50 hover:border-slate-600/50'}`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${colorClasses[r.color]}`}>
              <r.icon className="w-4 h-4" />
            </div>
            <p className="text-xs font-medium text-white">{r.label}</p>
            <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2">{r.description}</p>
          </button>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-slate-300 mb-4">Peak Usage Times — Visitors by Hour</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={peakHours}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="hour" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: 8, color: '#f8fafc' }} />
                <Bar dataKey="visitors" fill="#38bdf8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-slate-300 mb-4">Weekly Revenue Trend</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: 8, color: '#f8fafc' }} />
                <Line type="monotone" dataKey="revenue" stroke="#38bdf8" strokeWidth={2} dot={{ fill: '#38bdf8' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Scheduled Reports Card */}
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-sky-400" /> Scheduled Reports
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-slate-900/40 rounded-lg p-3 border border-slate-700/30">
            <p className="text-sm font-medium text-white">Daily Sales Summary</p>
            <p className="text-xs text-slate-400 mt-1">Every day at 21:00 · Email to Finance Team</p>
            <span className="text-[10px] px-2 py-0.5 bg-green-400/10 text-green-400 rounded-full mt-2 inline-block">Active</span>
          </div>
          <div className="bg-slate-900/40 rounded-lg p-3 border border-slate-700/30">
            <p className="text-sm font-medium text-white">Weekly Facility Report</p>
            <p className="text-xs text-slate-400 mt-1">Every Monday at 08:00 · Email to Recreation Mgr</p>
            <span className="text-[10px] px-2 py-0.5 bg-green-400/10 text-green-400 rounded-full mt-2 inline-block">Active</span>
          </div>
          <div className="bg-slate-900/40 rounded-lg p-3 border border-slate-700/30">
            <p className="text-sm font-medium text-white">Monthly Executive Summary</p>
            <p className="text-xs text-slate-400 mt-1">1st of each month · PDF to Leadership</p>
            <span className="text-[10px] px-2 py-0.5 bg-green-400/10 text-green-400 rounded-full mt-2 inline-block">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
