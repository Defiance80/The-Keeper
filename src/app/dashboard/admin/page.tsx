'use client';

import { staffUsers, auditLog, facilities } from '@/data/mock';
import { ShieldCheck, Users, Lock, Eye, Clock, Server, CheckCircle2, AlertTriangle, Key, Globe, Database, CreditCard } from 'lucide-react';

const roles = [
  { name: 'System Administrator', description: 'Full system access including configuration, user management, and security settings', permissions: 'All modules, system config, user management', users: 1, icon: ShieldCheck, color: 'red' },
  { name: 'Recreation Manager', description: 'Oversight of programs, facilities, staff scheduling, and reporting', permissions: 'Programs, Facilities, Reports, Staff', users: 1, icon: Users, color: 'sky' },
  { name: 'Front Desk Staff', description: 'Customer check-in, basic POS operations, registration processing', permissions: 'Customers, POS, Programs (view)', users: 1, icon: Eye, color: 'emerald' },
  { name: 'POS Operator', description: 'Point-of-sale transactions, inventory lookups, receipt management', permissions: 'POS, Inventory (view)', users: 1, icon: CreditCard, color: 'amber' },
  { name: 'Finance Reviewer', description: 'Financial reconciliation, report generation, refund approval', permissions: 'Finance, Reports, POS (view)', users: 1, icon: Database, color: 'violet' },
  { name: 'Facility Coordinator', description: 'Facility scheduling, rental management, permit processing', permissions: 'Facilities, Calendar, Rentals', users: 1, icon: Globe, color: 'pink' },
];

const colorClasses: Record<string, string> = {
  red: 'bg-red-400/10 text-red-400', sky: 'bg-sky-400/10 text-sky-400',
  emerald: 'bg-emerald-400/10 text-emerald-400', amber: 'bg-amber-400/10 text-amber-400',
  violet: 'bg-violet-400/10 text-violet-400', pink: 'bg-pink-400/10 text-pink-400',
};

const securityBadges = [
  { label: 'Role-based access design', icon: ShieldCheck, description: 'Granular permissions by role and facility' },
  { label: 'Encrypted data handling architecture', icon: Lock, description: 'AES-256 encryption at rest, TLS 1.3 in transit' },
  { label: 'PCI-aligned payment workflow concept', icon: CreditCard, description: 'Tokenized card data, no PAN storage' },
  { label: 'Session timeout controls', icon: Clock, description: 'Configurable idle timeout with forced re-authentication' },
];

export default function AdminPage() {
  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-white">Admin & Security</h1>
        <p className="text-sm text-slate-400">Role management, access control, and security configuration</p>
      </div>

      {/* Role Cards */}
      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Role-Based Access Control</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {roles.map((role) => (
            <div key={role.name} className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-slate-600/50 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[role.color]}`}>
                  <role.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{role.name}</h4>
                  <p className="text-[11px] text-slate-400">{role.users} user(s) assigned</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 mb-2">{role.description}</p>
              <div className="bg-slate-900/40 rounded px-2 py-1.5">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Permissions</p>
                <p className="text-xs text-slate-300">{role.permissions}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Staff Users */}
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Staff Users</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left text-xs font-semibold text-slate-400 px-4 py-2">Name</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-4 py-2 hidden sm:table-cell">Email</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-4 py-2">Role</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-4 py-2 hidden md:table-cell">Facility</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-4 py-2 hidden lg:table-cell">Last Login</th>
                <th className="text-center text-xs font-semibold text-slate-400 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {staffUsers.map((u) => (
                <tr key={u.id} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors">
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-sky-400/10 rounded-full flex items-center justify-center text-sky-400 text-[10px] font-bold">
                        {u.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <span className="text-sm text-white">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-slate-400 hidden sm:table-cell font-mono">{u.email}</td>
                  <td className="px-4 py-2.5 text-xs text-slate-300">{u.role}</td>
                  <td className="px-4 py-2.5 text-xs text-slate-400 hidden md:table-cell">{u.facility}</td>
                  <td className="px-4 py-2.5 text-xs text-slate-400 hidden lg:table-cell">{u.lastLogin}</td>
                  <td className="px-4 py-2.5 text-center">
                    <span className="text-xs px-2 py-0.5 bg-green-400/10 text-green-400 rounded-full">{u.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Facility Permissions Matrix */}
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Facility Permissions Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left text-xs font-semibold text-slate-400 px-3 py-2">Role</th>
                {facilities.map((f) => (
                  <th key={f.id} className="text-center text-[10px] font-semibold text-slate-400 px-2 py-2">{f.name.split(' ').slice(0, 2).join(' ')}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.name} className="border-b border-slate-700/30">
                  <td className="px-3 py-2 text-xs text-white">{role.name}</td>
                  {facilities.map((f) => {
                    const hasAccess = role.name === 'System Administrator' || role.name === 'Recreation Manager' ||
                      (role.name === 'Finance Reviewer') ||
                      (role.name === 'Front Desk Staff' && f.id === 'fitness') ||
                      (role.name === 'POS Operator' && f.id === 'recreation') ||
                      (role.name === 'Facility Coordinator' && f.id === 'event');
                    return (
                      <td key={f.id} className="text-center px-2 py-2">
                        {hasAccess ? (
                          <CheckCircle2 className="w-4 h-4 text-green-400 inline" />
                        ) : (
                          <span className="text-slate-600">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Audit Log */}
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-slate-300 mb-3">Audit Log</h3>
          <div className="space-y-1 max-h-80 overflow-y-auto">
            {auditLog.map((entry, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-slate-700/30 last:border-0">
                <span className="text-[10px] text-slate-500 font-mono w-16 flex-shrink-0 pt-0.5">{entry.time}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-medium text-white">{entry.user}</span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-slate-700/50 rounded text-slate-400">{entry.action}</span>
                  </div>
                  <p className="text-xs text-slate-400 truncate">{entry.detail}</p>
                  {entry.ip !== '—' && <p className="text-[10px] text-slate-600 font-mono">{entry.ip}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security & Compliance */}
        <div className="space-y-4">
          {/* Security Badges */}
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-slate-300 mb-3">Security & Compliance</h3>
            <div className="space-y-3">
              {securityBadges.map((badge) => (
                <div key={badge.label} className="flex items-start gap-3 bg-slate-900/40 rounded-lg p-3 border border-slate-700/30">
                  <div className="w-8 h-8 bg-green-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <badge.icon className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{badge.label}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Session Controls */}
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-slate-300 mb-3">Session & Data Controls</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Session Timeout</span>
                <select className="bg-slate-900/50 border border-slate-700/50 rounded px-2 py-1 text-xs text-white outline-none">
                  <option>15 minutes</option><option>30 minutes</option><option>60 minutes</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Multi-factor Authentication</span>
                <span className="text-xs px-2 py-0.5 bg-green-400/10 text-green-400 rounded-full">Enabled</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Data Retention Period</span>
                <select className="bg-slate-900/50 border border-slate-700/50 rounded px-2 py-1 text-xs text-white outline-none">
                  <option>7 years</option><option>5 years</option><option>3 years</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Password Rotation</span>
                <select className="bg-slate-900/50 border border-slate-700/50 rounded px-2 py-1 text-xs text-white outline-none">
                  <option>90 days</option><option>60 days</option><option>30 days</option>
                </select>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 mt-3 italic">Data retention and encryption policies aligned with DoD Instruction 8500.01</p>
          </div>
        </div>
      </div>
    </div>
  );
}
