'use client';

import { portalActivity } from '@/data/mock';
import { Globe, Users, ShoppingCart, Clock, TrendingUp, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const portalStats = [
  { label: 'Portal Visits Today', value: '482', icon: Globe, color: 'sky' },
  { label: 'Completed Registrations', value: '34', icon: CheckCircle2, color: 'emerald' },
  { label: 'Pending Approvals', value: '3', icon: Clock, color: 'amber' },
  { label: 'Conversion Rate', value: '7.1%', icon: TrendingUp, color: 'violet' },
];

const webActivityByProgram = [
  { name: 'Youth Camp', views: 145, registrations: 18 },
  { name: 'Basketball', views: 98, registrations: 12 },
  { name: 'Fun Day', views: 234, registrations: 34 },
  { name: 'Swim Lessons', views: 112, registrations: 11 },
  { name: 'Fitness', views: 87, registrations: 8 },
  { name: 'Art Workshop', views: 56, registrations: 5 },
];

const colorMap: Record<string, string> = {
  sky: 'bg-sky-400/10 text-sky-400',
  emerald: 'bg-emerald-400/10 text-emerald-400',
  amber: 'bg-amber-400/10 text-amber-400',
  violet: 'bg-violet-400/10 text-violet-400',
};

export default function PortalPage() {
  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-white">Web Portal Activity</h1>
        <p className="text-sm text-slate-400">Public portal engagement & conversion tracking</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {portalStats.map((s) => (
          <div key={s.label} className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${colorMap[s.color]}`}>
              <s.icon className="w-4 h-4" />
            </div>
            <p className="text-2xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-slate-400">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Activity Feed */}
        <div className="space-y-4">
          {/* Queue */}
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-slate-300 mb-3">Online Activity Queue</h3>
            <div className="space-y-2">
              {portalActivity.map((item) => (
                <div key={item.id} className="bg-slate-900/40 rounded-lg p-3 border border-slate-700/30">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${item.type === 'Registration' ? 'bg-emerald-400/10 text-emerald-400' : item.type === 'Reservation' ? 'bg-violet-400/10 text-violet-400' : 'bg-sky-400/10 text-sky-400'}`}>
                        {item.type}
                      </span>
                      <span className="text-sm font-medium text-white">{item.name}</span>
                    </div>
                    <span className="text-xs text-slate-500">{item.time}</span>
                  </div>
                  <p className="text-xs text-slate-400">{item.program || item.facility}</p>
                  <div className="flex items-center justify-between mt-1">
                    {item.amount > 0 && <span className="text-xs text-green-400">${item.amount.toFixed(2)}</span>}
                    <span className={`text-xs px-2 py-0.5 rounded-full ${item.status === 'Completed' ? 'bg-green-400/10 text-green-400' : item.status === 'Waitlisted' ? 'bg-amber-400/10 text-amber-400' : 'bg-sky-400/10 text-sky-400'}`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Abandoned */}
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" /> Abandoned Registrations
            </h3>
            <div className="space-y-2">
              <div className="bg-amber-400/5 rounded-lg p-3 border border-amber-400/10">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white">3 abandoned carts</span>
                  <span className="text-xs text-amber-400">~$210 potential</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">Youth Camp (1), Basketball (1), Swim Lessons (1)</p>
                <p className="text-xs text-slate-500 mt-0.5">Average abandonment at: payment step</p>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-slate-300 mb-4">Web Activity by Program</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={webActivityByProgram}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: 8, color: '#f8fafc' }} />
                  <Bar dataKey="views" fill="#334155" radius={[4, 4, 0, 0]} name="Views" />
                  <Bar dataKey="registrations" fill="#38bdf8" radius={[4, 4, 0, 0]} name="Registrations" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Mini Portal Preview */}
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
            <Globe className="w-4 h-4 text-sky-400" /> Public Portal Preview
          </h3>
          <div className="bg-slate-900/50 rounded-lg border border-slate-700/30 overflow-hidden">
            {/* Browser Chrome */}
            <div className="bg-slate-700/50 px-3 py-2 flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
              </div>
              <div className="flex-1 bg-slate-800/80 rounded px-2 py-0.5 text-[10px] text-slate-400 font-mono">https://portal.moodyrecreation.mil</div>
            </div>

            {/* Simulated Portal */}
            <div className="p-4 space-y-4">
              {/* Header */}
              <div className="text-center border-b border-slate-700/30 pb-3">
                <h4 className="text-sm font-bold text-white">Moody AFB Recreation</h4>
                <p className="text-[10px] text-slate-400">23rd Force Support Squadron</p>
              </div>

              {/* Nav */}
              <div className="flex gap-2 text-[10px]">
                <span className="px-2 py-1 bg-sky-400/10 text-sky-400 rounded">Programs</span>
                <span className="px-2 py-1 bg-slate-700/50 text-slate-400 rounded">Facilities</span>
                <span className="px-2 py-1 bg-slate-700/50 text-slate-400 rounded">Rentals</span>
                <span className="px-2 py-1 bg-slate-700/50 text-slate-400 rounded">My Account</span>
              </div>

              {/* Featured */}
              <div className="bg-sky-400/5 border border-sky-400/20 rounded-lg p-3">
                <p className="text-[10px] text-sky-400 font-medium">🔥 Featured Program</p>
                <p className="text-xs font-semibold text-white mt-1">Youth Spring Adventure Camp</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Apr 6-17 · Ages 6-12 · $85 ($65 military)</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 bg-slate-700/50 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full bg-amber-400" style={{ width: '93%' }} />
                  </div>
                  <span className="text-[10px] text-amber-400">2 spots left!</span>
                </div>
                <button className="mt-2 w-full bg-sky-500 text-white text-[10px] py-1.5 rounded font-medium">Register Now</button>
              </div>

              {/* Program List */}
              <div className="space-y-2">
                {['Morning Power Fitness', 'Intramural Basketball', 'Family Fun Day'].map((p) => (
                  <div key={p} className="flex items-center justify-between bg-slate-800/50 rounded p-2 border border-slate-700/20">
                    <span className="text-[10px] text-white">{p}</span>
                    <button className="text-[9px] bg-sky-400/10 text-sky-400 px-2 py-0.5 rounded">Register</button>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="text-center text-[9px] text-slate-500 border-t border-slate-700/30 pt-2">
                © 2026 Moody AFB 23 FSS · Powered by The Keeper
              </div>
            </div>
          </div>

          {/* Conversion Summary */}
          <div className="mt-4 space-y-3">
            <h4 className="text-sm font-semibold text-slate-300">Conversion Funnel</h4>
            <div className="space-y-2">
              {[
                { label: 'Portal Visits', value: 482, pct: 100 },
                { label: 'Program/Facility Views', value: 312, pct: 65 },
                { label: 'Started Registration', value: 89, pct: 18 },
                { label: 'Completed Payment', value: 34, pct: 7 },
              ].map((step) => (
                <div key={step.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">{step.label}</span>
                    <span className="text-white">{step.value} ({step.pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-700/30 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full bg-sky-400" style={{ width: `${step.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
