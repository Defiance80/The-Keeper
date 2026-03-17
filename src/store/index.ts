import { create } from 'zustand';

export interface User {
  email: string;
  name: string;
  role: 'admin' | 'staff';
  title: string;
}

export interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

interface AppState {
  user: User | null;
  currentFacility: string;
  sidebarOpen: boolean;
  cart: CartItem[];
  paymentMethod: string;
  notifications: number;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  setFacility: (f: string) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateCartQty: (id: string, qty: number) => void;
  clearCart: () => void;
  setPaymentMethod: (m: string) => void;
}

export const useStore = create<AppState>((set, get) => ({
  user: null,
  currentFacility: 'All Facilities',
  sidebarOpen: true,
  cart: [],
  paymentMethod: 'Credit/Debit',
  notifications: 7,
  login: (email, password) => {
    if (password !== 'Moody23Demo!') return false;
    if (email === 'admin@thekeeper.mil-demo') {
      set({ user: { email, name: 'Col. Marcus Webb', role: 'admin', title: 'System Administrator' } });
      return true;
    }
    if (email === 'staff@thekeeper.mil-demo') {
      set({ user: { email, name: 'SSgt. Diana Torres', role: 'staff', title: 'Front Desk Staff' } });
      return true;
    }
    return false;
  },
  logout: () => set({ user: null }),
  setFacility: (f) => set({ currentFacility: f }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  addToCart: (item) => {
    const cart = get().cart;
    const existing = cart.find((c) => c.id === item.id);
    if (existing) {
      set({ cart: cart.map((c) => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c) });
    } else {
      set({ cart: [...cart, { ...item, quantity: 1 }] });
    }
  },
  removeFromCart: (id) => set((s) => ({ cart: s.cart.filter((c) => c.id !== id) })),
  updateCartQty: (id, qty) => {
    if (qty <= 0) {
      set((s) => ({ cart: s.cart.filter((c) => c.id !== id) }));
    } else {
      set((s) => ({ cart: s.cart.map((c) => c.id === id ? { ...c, quantity: qty } : c) }));
    }
  },
  clearCart: () => set({ cart: [] }),
  setPaymentMethod: (m) => set({ paymentMethod: m }),
}));
