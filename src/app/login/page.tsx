'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store';
import { Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const login = useStore((s) => s.login);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(email, password);
    if (success) {
      router.push('/dashboard');
    } else {
      setError('Invalid credentials. Please use the demo accounts below.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg1NiwgMTg5LCAyNDgsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />
      
      <div className="relative w-full max-w-md animate-fade-in">
        <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-400/10 rounded-2xl mb-4">
              <svg viewBox="0 0 64 64" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 4L8 16v16c0 14.4 10.24 27.84 24 32 13.76-4.16 24-17.6 24-32V16L32 4z" fill="rgba(56,189,248,0.15)" stroke="rgb(56,189,248)" strokeWidth="2.5" strokeLinejoin="round"/>
                <path d="M32 22a4 4 0 0 0-4 4v4h-2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V32a2 2 0 0 0-2-2h-2v-4a4 4 0 0 0-4-4zm0 3a1 1 0 0 1 1 1v4h-2v-4a1 1 0 0 1 1-1zm0 11a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" fill="rgb(56,189,248)"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">The Keeper AFB</h1>
            <p className="text-slate-400 text-sm mt-2">Moody AFB 23 FSS Recreation Operations & POS Management</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400/50 transition"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400/50 transition pr-10"
                  placeholder="Enter password"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-sky-500 hover:bg-sky-400 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              Sign In
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Demo Credentials</p>
            <div className="space-y-2 text-sm">
              <button onClick={() => { setEmail('admin@thekeeper.mil-demo'); setPassword('Moody23Demo!'); }} className="flex justify-between w-full text-left hover:bg-slate-800/50 rounded px-2 py-1 -mx-2 transition-colors group cursor-pointer">
                <span className="text-slate-400">Admin:</span>
                <span className="text-slate-300 font-mono text-xs group-hover:text-sky-400 transition-colors">admin@thekeeper.mil-demo <span className="text-[10px] text-sky-400/60">· click to fill</span></span>
              </button>
              <button onClick={() => { setEmail('staff@thekeeper.mil-demo'); setPassword('Moody23Demo!'); }} className="flex justify-between w-full text-left hover:bg-slate-800/50 rounded px-2 py-1 -mx-2 transition-colors group cursor-pointer">
                <span className="text-slate-400">Staff:</span>
                <span className="text-slate-300 font-mono text-xs group-hover:text-sky-400 transition-colors">staff@thekeeper.mil-demo <span className="text-[10px] text-sky-400/60">· click to fill</span></span>
              </button>
              <div className="flex justify-between px-2 -mx-2">
                <span className="text-slate-400">Password:</span>
                <span className="text-slate-300 font-mono text-xs">Moody23Demo!</span>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-center text-xs text-slate-500 mt-6">
            Prototype Interface for Demonstration Use Only
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-600 mt-4">
          Prototype interface for demonstration purposes only. Developed by GoKoncentrate
        </p>
      </div>
    </div>
  );
}
