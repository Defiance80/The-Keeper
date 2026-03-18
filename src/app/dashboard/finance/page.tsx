'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { reconciliationData, revenueByFacility } from '@/data/mock';
import { DollarSign, CreditCard, TrendingUp, AlertTriangle, CheckCircle2, Download, Banknote, Smartphone, FileText } from 'lucide-react';

const paymentBreakdown = [
  { name: 'Credit/Debit', value: 4235, color: '#38bdf8' },
  { name: 'Cash', value: 1890, color: '#34d399' },
  { name: 'NFC/Tap', value: 1245, color: '#a78bfa' },
  { name: 'ACH', value: 567, color: '#fb923c' },
  { name: 'Check', value: 310, color: '#f472b6' },
];

const refundLog = [
  { id: 'R-0247', time: '13:48', staff: 'SrA. Nguyen', amount: 25.00, reason: 'Program cancellation', customer: 'Christopher N. Davis' },
  { id: 'R-0246', time: '11:22', staff: 'A1C Park', amount: 8.00, reason: 'Duplicate charge', customer: 'Walk-in #4287' },
  { id: 'R-0245', time: '09:15', staff: 'SSgt. Torres', amount: 18.00, reason: 'Defective merchandise', customer: 'Amanda K. Wright' },
];

const reconciliationChecklist = [
  { task: 'All terminals closed out', done: true },
  { task: 'Cash drawers counted', done: true },
  { task: 'Online payments reconciled', done: true },
  { task: 'Refunds/voids reviewed', done: true },
  { task: 'Deposit slip prepared', done: false },
  { task: 'Manager sign-off', done: false },
];

export default function FinancePage() {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">Finance & Reconciliation</h1>
          <p className="text-sm text-slate-400">Daily summary · March 17, 2026</p>
        </div>
        <button className="flex items-center gap-1.5 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
          <DollarSign className="w-5 h-5 text-green-400 mb-2" />
          <p className="text-2xl font-bold text-white">$8,247</p>
          <p className="text-xs text-slate-400">Total Revenue</p>
        </div>
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
          <CreditCard className="w-5 h-5 text-sky-400 mb-2" />
          <p className="text-2xl font-bold text-white">287</p>
          <p className="text-xs text-slate-400">Transactions</p>
        </div>
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
          <TrendingUp className="w-5 h-5 text-emerald-400 mb-2" />
          <p className="text-2xl font-bold text-white">$28.73</p>
          <p className="text-xs text-slate-400">Avg Transaction</p>
        </div>
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
          <AlertTriangle className="w-5 h-5 text-amber-400 mb-2" />
          <p className="text-2xl font-bold text-amber-400">$51.00</p>
          <p className="text-xs text-slate-400">Refunds/Voids</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-slate-300 mb-4">Facility Revenue Rollup</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueByFacility}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} angle={-20} textAnchor="end" height={60} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: 8, color: '#f8fafc' }} />
                <Bar dataKey="revenue" fill="#38bdf8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-slate-300 mb-4">Payment Method Breakdown</h3>
          <div className="h-64 flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={paymentBreakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value">
                  {paymentBreakdown.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: 8, color: '#f8fafc' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 ml-2">
              {paymentBreakdown.map((p) => (
                <div key={p.name} className="flex items-center gap-2 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                  <span className="text-slate-400 whitespace-nowrap">{p.name}</span>
                  <span className="text-white font-medium">${p.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reconciliation Table */}
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Reconciliation by Terminal</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left text-xs font-semibold text-slate-400 px-4 py-2">Terminal</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-4 py-2">Staff</th>
                <th className="text-right text-xs font-semibold text-slate-400 px-4 py-2">Expected</th>
                <th className="text-right text-xs font-semibold text-slate-400 px-4 py-2">Actual</th>
                <th className="text-right text-xs font-semibold text-slate-400 px-4 py-2">Variance</th>
                <th className="text-center text-xs font-semibold text-slate-400 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {reconciliationData.map((r) => (
                <tr key={r.terminal} className={`border-b border-slate-700/30 ${r.variance !== 0 ? 'bg-amber-400/5' : ''}`}>
                  <td className="px-4 py-2.5 text-sm text-white">{r.terminal}</td>
                  <td className="px-4 py-2.5 text-sm text-slate-400">{r.staff}</td>
                  <td className="px-4 py-2.5 text-sm text-white text-right">${r.expected.toFixed(2)}</td>
                  <td className="px-4 py-2.5 text-sm text-white text-right">${r.actual.toFixed(2)}</td>
                  <td className={`px-4 py-2.5 text-sm text-right font-medium ${r.variance !== 0 ? 'text-amber-400' : 'text-green-400'}`}>
                    {r.variance === 0 ? '$0.00' : `-$${Math.abs(r.variance).toFixed(2)}`}
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${r.status === 'Reconciled' ? 'bg-green-400/10 text-green-400' : 'bg-amber-400/10 text-amber-400'}`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Refund/Void Log */}
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-slate-300 mb-3">Refund & Void Log</h3>
          <div className="space-y-2">
            {refundLog.map((r) => (
              <div key={r.id} className="bg-slate-900/40 rounded-lg p-3 border border-slate-700/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-white">{r.id} · ${r.amount.toFixed(2)}</span>
                  <span className="text-xs text-slate-500">{r.time}</span>
                </div>
                <p className="text-xs text-slate-400">{r.reason} — {r.customer}</p>
                <p className="text-xs text-slate-500">Processed by {r.staff}</p>
              </div>
            ))}
          </div>
        </div>

        {/* End-of-Day Checklist */}
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-slate-300 mb-3">End-of-Day Reconciliation Checklist</h3>
          <div className="space-y-2">
            {reconciliationChecklist.map((item) => (
              <div key={item.task} className="flex items-center gap-3 py-1.5">
                <div className={`w-5 h-5 rounded border flex items-center justify-center ${item.done ? 'bg-green-400/10 border-green-400/30' : 'border-slate-600'}`}>
                  {item.done && <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />}
                </div>
                <span className={`text-sm ${item.done ? 'text-slate-300' : 'text-slate-500'}`}>{item.task}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-slate-900/50 rounded-lg border border-slate-700/30">
            <p className="text-xs text-slate-400">Deposit Summary</p>
            <p className="text-lg font-bold text-white mt-1">$8,239.00</p>
            <p className="text-xs text-slate-500">Pending manager sign-off</p>
          </div>
        </div>
      </div>

      {/* Exception Alerts */}
      <div className="bg-amber-400/5 border border-amber-400/20 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-amber-400 mb-2 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" /> Exception Alerts
        </h3>
        <div className="space-y-2">
          <p className="text-sm text-slate-300">• Terminal 2 variance of <span className="text-amber-400 font-medium">-$8.00</span> — flagged for review (duplicate charge void)</p>
          <p className="text-sm text-slate-300">• 3 refunds processed today totaling <span className="text-amber-400 font-medium">$51.00</span> — within normal range</p>
        </div>
      </div>
    </div>
  );
}
