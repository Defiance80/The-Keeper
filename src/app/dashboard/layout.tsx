'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useStore } from '@/store';
import {
  LayoutDashboard, Users, BookOpen, Building2, ShoppingCart, Package,
  DollarSign, BarChart3, Globe, ShieldCheck, Search, Bell, ChevronDown,
  Menu, X, LogOut, Plus, FileText, UserPlus, RefreshCw, CreditCard, MapPin, Clock
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/customers', label: 'Customers', icon: Users },
  { href: '/dashboard/programs', label: 'Programs & Registration', icon: BookOpen },
  { href: '/dashboard/facilities', label: 'Facilities & Rentals', icon: Building2 },
  { href: '/dashboard/pos', label: 'POS Operations', icon: ShoppingCart },
  { href: '/dashboard/inventory', label: 'Inventory', icon: Package },
  { href: '/dashboard/finance', label: 'Finance & Reconciliation', icon: DollarSign },
  { href: '/dashboard/reports', label: 'Reports', icon: BarChart3 },
  { href: '/dashboard/portal', label: 'Web Portal Activity', icon: Globe },
  { href: '/dashboard/admin', label: 'Admin & Security', icon: ShieldCheck },
];

const quickActions = [
  { label: 'New Registration', icon: Plus },
  { label: 'New Reservation', icon: MapPin },
  { label: 'Open POS Terminal', icon: CreditCard },
  { label: 'Add Walk-in', icon: UserPlus },
  { label: 'Issue Refund', icon: RefreshCw },
  { label: 'Export Daily Report', icon: FileText },
];

const facilityOptions = ['All Facilities', 'Fitness Center', 'Outdoor Fields', 'Community Rooms', 'Event Hall', 'Aquatics Area', 'Recreation Office/Rental Desk'];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, currentFacility, setFacility, sidebarOpen, toggleSidebar, setSidebarOpen, notifications, logout } = useStore();
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);
  const [facilityOpen, setFacilityOpen] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user, router]);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  // Close mobile sidebar on nav
  useEffect(() => {
    if (window.innerWidth < 1024) setSidebarOpen(false);
  }, [pathname, setSidebarOpen]);

  if (!user) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-900">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-800/95 backdrop-blur-sm border-r border-slate-700/50 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-64'}`}>
        <div className="p-4 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-sky-400/10 rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <h1 className="font-bold text-white text-lg leading-tight">The Keeper</h1>
              <p className="text-[10px] text-slate-400">Recreation Ops & POS</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-2 px-2">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors mb-0.5 ${
                  active
                    ? 'bg-sky-400/10 text-sky-400 font-medium'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-700/50">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 bg-sky-400/20 rounded-full flex items-center justify-center text-sky-400 text-xs font-bold">
              {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user.name}</p>
              <p className="text-[11px] text-slate-400 truncate">{user.title}</p>
            </div>
            <button onClick={() => { logout(); router.push('/login'); }} className="text-slate-400 hover:text-red-400 transition-colors" title="Sign out">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-14 bg-slate-800/80 backdrop-blur-sm border-b border-slate-700/50 flex items-center px-4 gap-3 flex-shrink-0">
          <button onClick={toggleSidebar} className="lg:hidden text-slate-400 hover:text-white">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Search */}
          <div className="hidden sm:flex items-center gap-2 bg-slate-900/50 border border-slate-700/50 rounded-lg px-3 py-1.5 flex-1 max-w-xs">
            <Search className="w-4 h-4 text-slate-500" />
            <input className="bg-transparent text-sm text-white placeholder-slate-500 outline-none w-full" placeholder="Search customers, programs..." />
          </div>

          {/* Facility Selector */}
          <div className="relative hidden md:block">
            <button onClick={() => setFacilityOpen(!facilityOpen)} className="flex items-center gap-2 bg-slate-900/50 border border-slate-700/50 rounded-lg px-3 py-1.5 text-sm text-slate-300 hover:text-white transition">
              <Building2 className="w-4 h-4" />
              <span className="truncate max-w-[140px]">{currentFacility}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {facilityOpen && (
              <div className="absolute top-full mt-1 right-0 w-60 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 py-1">
                {facilityOptions.map((f) => (
                  <button key={f} onClick={() => { setFacility(f); setFacilityOpen(false); }} className={`w-full text-left px-3 py-2 text-sm transition-colors ${currentFacility === f ? 'text-sky-400 bg-sky-400/10' : 'text-slate-300 hover:bg-slate-700/50'}`}>
                    {f}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex-1" />

          {/* Date/Time */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
            <span>{now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>

          {/* Role Badge */}
          <span className="hidden sm:inline-flex px-2 py-0.5 bg-sky-400/10 text-sky-400 text-[11px] font-medium rounded-full">
            {user.role === 'admin' ? 'Admin' : 'Staff'}
          </span>

          {/* Notifications */}
          <button className="relative text-slate-400 hover:text-white transition">
            <Bell className="w-5 h-5" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">{notifications}</span>
            )}
          </button>

          {/* Quick Actions */}
          <div className="relative">
            <button onClick={() => setQuickActionsOpen(!quickActionsOpen)} className="flex items-center gap-1.5 bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Quick Actions</span>
            </button>
            {quickActionsOpen && (
              <div className="absolute top-full mt-1 right-0 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 py-1">
                {quickActions.map((a) => (
                  <button key={a.label} onClick={() => setQuickActionsOpen(false)} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition">
                    <a.icon className="w-4 h-4 text-slate-400" />
                    {a.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
          {/* Footer */}
          <footer className="mt-8 pt-4 border-t border-slate-700/30 text-center text-xs text-slate-500">
            Prototype interface for demonstration purposes only. Developed by GoKoncentrate
          </footer>
        </main>
      </div>

      {/* Click outside to close dropdowns */}
      {(quickActionsOpen || facilityOpen) && (
        <div className="fixed inset-0 z-30" onClick={() => { setQuickActionsOpen(false); setFacilityOpen(false); }} />
      )}
    </div>
  );
}
