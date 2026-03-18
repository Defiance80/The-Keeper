'use client';

import { useState } from 'react';
import { programs } from '@/data/mock';
import { Search, Filter, Plus, Users, Clock, MapPin, DollarSign, AlertTriangle, X, ChevronRight } from 'lucide-react';

export default function ProgramsPage() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedProgram, setSelectedProgram] = useState<typeof programs[0] | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showWaitlistAlert, setShowWaitlistAlert] = useState(false);

  const categories = ['All', ...Array.from(new Set(programs.map((p) => p.category)))];
  const filtered = programs.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === 'All' || p.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const handleRegister = (program: typeof programs[0]) => {
    if (program.enrolled >= program.capacity) {
      setShowWaitlistAlert(true);
      setTimeout(() => setShowWaitlistAlert(false), 3000);
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Waitlist Alert */}
      {showWaitlistAlert && (
        <div className="fixed top-4 right-4 z-50 bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 flex items-center gap-3 animate-fade-in shadow-xl">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <div>
            <p className="text-sm font-medium text-white">Program at capacity — Added to waitlist</p>
            <p className="text-xs text-slate-400">You will be notified when a spot opens.</p>
          </div>
          <button onClick={() => setShowWaitlistAlert(false)} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">Programs & Registration</h1>
          <p className="text-sm text-slate-400">{programs.length} active programs · {programs.reduce((a, p) => a + p.enrolled, 0)} total enrolled</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-slate-800 border border-slate-700/50 rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-slate-500" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent text-sm text-white placeholder-slate-500 outline-none w-40" placeholder="Search programs..." />
          </div>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="bg-slate-800 border border-slate-700/50 rounded-lg px-3 py-2 text-sm text-slate-300 outline-none">
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <button onClick={() => setShowCreate(true)} className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white text-sm font-medium px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors">
            <Plus className="w-4 h-4" /> Add Program
          </button>
        </div>
      </div>

      {/* Program Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtered.map((p) => {
          const fillPct = Math.round((p.enrolled / p.capacity) * 100);
          const isFull = p.enrolled >= p.capacity;
          return (
            <div key={p.id} className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-slate-600/50 transition-colors cursor-pointer" onClick={() => setSelectedProgram(p)}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-sm font-semibold text-white">{p.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 bg-slate-700/50 rounded-full text-slate-300">{p.category}</span>
                    <span className="text-xs text-slate-400">{p.ageGroup}</span>
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isFull ? 'bg-red-400/10 text-red-400' : 'bg-green-400/10 text-green-400'}`}>
                  {p.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3 text-xs text-slate-400">
                <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3" />{p.facility.length > 18 ? p.facility.slice(0, 18) + '…' : p.facility}</div>
                <div className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{p.startDate.slice(5)}</div>
                <div className="flex items-center gap-1.5"><DollarSign className="w-3 h-3" />${p.price} / ${p.discountPrice}</div>
                <div className="flex items-center gap-1.5"><Users className="w-3 h-3" />{p.enrolled}/{p.capacity}{p.waitlist > 0 && ` (+${p.waitlist} WL)`}</div>
              </div>

              <div className="w-full bg-slate-700/50 rounded-full h-1.5 mb-1">
                <div className={`h-1.5 rounded-full transition-all ${isFull ? 'bg-red-400' : fillPct > 80 ? 'bg-amber-400' : 'bg-sky-400'}`} style={{ width: `${Math.min(fillPct, 100)}%` }} />
              </div>
              <p className="text-right text-[11px] text-slate-500">{fillPct}% filled</p>
            </div>
          );
        })}
      </div>

      {/* Registration Side Panel */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedProgram(null)} />
          <div className="relative w-full max-w-md bg-slate-800 border-l border-slate-700 h-full overflow-y-auto animate-slide-in">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">Program Details</h2>
                <button onClick={() => setSelectedProgram(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{selectedProgram.name}</h3>
              <div className="flex gap-2 mb-4">
                <span className="text-xs px-2 py-0.5 bg-slate-700/50 rounded-full text-slate-300">{selectedProgram.category}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${selectedProgram.status === 'Full' ? 'bg-red-400/10 text-red-400' : 'bg-green-400/10 text-green-400'}`}>{selectedProgram.status}</span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm"><span className="text-slate-400">Facility</span><span className="text-white">{selectedProgram.facility}</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-400">Age Group</span><span className="text-white">{selectedProgram.ageGroup}</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-400">Instructor</span><span className="text-white">{selectedProgram.instructor}</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-400">Dates</span><span className="text-white">{selectedProgram.startDate} — {selectedProgram.endDate}</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-400">Standard Price</span><span className="text-white font-medium">${selectedProgram.price}.00</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-400">Discounted Price</span><span className="text-green-400 font-medium">${selectedProgram.discountPrice}.00</span></div>
              </div>

              {/* Capacity */}
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/30 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-400">Capacity</span>
                  <span className="text-sm text-white">{selectedProgram.enrolled} / {selectedProgram.capacity}</span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-2 mb-2">
                  <div className={`h-2 rounded-full ${selectedProgram.enrolled >= selectedProgram.capacity ? 'bg-red-400' : 'bg-sky-400'}`} style={{ width: `${Math.min((selectedProgram.enrolled / selectedProgram.capacity) * 100, 100)}%` }} />
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>{selectedProgram.capacity - selectedProgram.enrolled} spots remaining</span>
                  <span>{selectedProgram.waitlist} on waitlist</span>
                </div>
              </div>

              {/* Registration Source */}
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/30 mb-6">
                <p className="text-sm font-medium text-slate-300 mb-2">Registration Source</p>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <p className="text-lg font-bold text-sky-400">{selectedProgram.source.online}</p>
                    <p className="text-xs text-slate-400">Online</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-bold text-emerald-400">{selectedProgram.source.walkIn}</p>
                    <p className="text-xs text-slate-400">Walk-In</p>
                  </div>
                </div>
              </div>

              {/* Roster preview */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-300 mb-2">Roster Preview</h4>
                <div className="space-y-1">
                  {['James R. Patterson', 'Sarah M. Collins', 'Robert L. Chen', 'Lisa M. Anderson'].map((name) => (
                    <div key={name} className="flex items-center gap-2 bg-slate-900/30 rounded px-3 py-1.5">
                      <div className="w-6 h-6 bg-sky-400/10 rounded-full flex items-center justify-center text-sky-400 text-[10px] font-bold">
                        {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <span className="text-sm text-slate-300">{name}</span>
                    </div>
                  ))}
                  <p className="text-xs text-slate-500 text-center mt-1">+ {selectedProgram.enrolled - 4} more enrolled</p>
                </div>
              </div>

              <button
                onClick={() => handleRegister(selectedProgram)}
                className={`w-full py-2.5 rounded-lg font-medium text-sm transition-colors ${selectedProgram.enrolled >= selectedProgram.capacity ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30' : 'bg-sky-500 text-white hover:bg-sky-400'}`}
              >
                {selectedProgram.enrolled >= selectedProgram.capacity ? 'Join Waitlist' : 'Register Customer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Program Drawer */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowCreate(false)} />
          <div className="relative w-full max-w-md bg-slate-800 border-l border-slate-700 h-full overflow-y-auto animate-slide-in">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">Create Program</h2>
                <button onClick={() => setShowCreate(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Program Name', placeholder: 'Enter program name' },
                  { label: 'Category', placeholder: 'Select category', type: 'select' },
                  { label: 'Age Group', placeholder: 'e.g., 6-12, 18+, All Ages' },
                  { label: 'Facility', placeholder: 'Select facility', type: 'select' },
                  { label: 'Instructor', placeholder: 'Assign instructor' },
                  { label: 'Start Date', placeholder: '', type: 'date' },
                  { label: 'End Date', placeholder: '', type: 'date' },
                  { label: 'Capacity', placeholder: 'Max participants' },
                  { label: 'Standard Price ($)', placeholder: '0.00' },
                  { label: 'Discounted Price ($)', placeholder: '0.00' },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="block text-sm font-medium text-slate-300 mb-1">{field.label}</label>
                    <input type={field.type === 'date' ? 'date' : 'text'} placeholder={field.placeholder} className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-sky-400/50" />
                  </div>
                ))}
                <button className="w-full bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white font-medium py-2.5 rounded-lg transition-colors text-sm">
                  Create Program
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
