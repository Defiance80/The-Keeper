'use client';

import { useState } from 'react';
import { calendarEvents, facilities } from '@/data/mock';
import { ChevronLeft, ChevronRight, AlertTriangle, X, Clock, MapPin, CheckCircle2, FileText, DollarSign, Globe } from 'lucide-react';

const days = ['Mon 3/16', 'Tue 3/17', 'Wed 3/18', 'Thu 3/19', 'Fri 3/20', 'Sat 3/21', 'Sun 3/22'];
const hours = Array.from({ length: 16 }, (_, i) => i + 6); // 6am to 9pm

const pendingRequests = [
  { id: 1, name: 'Thompson Family', facility: 'Pavilion', date: 'Mar 29', time: '12:00 - 17:00', status: 'Pending', fee: 75, permits: ['Liability waiver', 'Noise permit'] },
  { id: 2, name: 'Unit FRG — 23 WG', facility: 'Community Room A', date: 'Mar 20', time: '14:00 - 16:00', status: 'Pending', fee: 50, permits: ['Room agreement'] },
  { id: 3, name: 'Cpl. Ramirez', facility: 'Event Hall', date: 'Apr 5', time: '10:00 - 22:00', status: 'Pending', fee: 250, permits: ['Liability waiver', 'Alcohol permit', 'Noise permit', 'Setup agreement'] },
];

const onlineRequest = {
  name: 'Online Visitor #4812',
  facility: 'Community Room B',
  date: 'Mar 25, 2026',
  time: '10:00 AM - 12:00 PM',
  purpose: 'Birthday party for dependent (age 8)',
  attendees: 20,
  submitted: '2 minutes ago',
};

export default function FacilitiesPage() {
  const [view, setView] = useState<'day' | 'week' | 'month'>('week');
  const [selectedFacility, setSelectedFacility] = useState('All');
  const [conflictAlert, setConflictAlert] = useState(false);

  const filteredEvents = selectedFacility === 'All'
    ? calendarEvents
    : calendarEvents.filter((e) => e.facility === selectedFacility);

  const handleSlotClick = (day: number, hour: number) => {
    const hasEvent = filteredEvents.some((e) => e.day === day && hour >= e.start && hour < e.end);
    if (hasEvent) {
      setConflictAlert(true);
      setTimeout(() => setConflictAlert(false), 3000);
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Conflict Alert */}
      {conflictAlert && (
        <div className="fixed top-4 right-4 z-50 bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3 animate-fade-in shadow-xl">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <div>
            <p className="text-sm font-medium text-white">Scheduling conflict detected</p>
            <p className="text-xs text-slate-400">This time slot is already reserved. Choose a different time.</p>
          </div>
          <button onClick={() => setConflictAlert(false)} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">Facilities & Rentals</h1>
          <p className="text-sm text-slate-400">6 facilities · 18 reservations today</p>
        </div>
        <div className="flex items-center gap-2">
          <select value={selectedFacility} onChange={(e) => setSelectedFacility(e.target.value)} className="bg-slate-800 border border-slate-700/50 rounded-lg px-3 py-2 text-sm text-slate-300 outline-none">
            <option value="All">All Facilities</option>
            {facilities.map((f) => <option key={f.id} value={f.name}>{f.name}</option>)}
          </select>
          <div className="flex bg-slate-800 border border-slate-700/50 rounded-lg overflow-hidden">
            {(['day', 'week', 'month'] as const).map((v) => (
              <button key={v} onClick={() => setView(v)} className={`px-3 py-2 text-sm capitalize transition-colors ${view === v ? 'bg-sky-400/10 text-sky-400' : 'text-slate-400 hover:text-white'}`}>
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between p-3 border-b border-slate-700/50">
          <button className="text-slate-400 hover:text-white"><ChevronLeft className="w-5 h-5" /></button>
          <span className="text-sm font-medium text-white">March 16 – 22, 2026</span>
          <button className="text-slate-400 hover:text-white"><ChevronRight className="w-5 h-5" /></button>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Day headers */}
            <div className="grid grid-cols-8 border-b border-slate-700/30">
              <div className="p-2 text-xs text-slate-500 text-center">Time</div>
              {days.map((d, i) => (
                <div key={d} className={`p-2 text-xs text-center font-medium ${i === 1 ? 'text-sky-400 bg-sky-400/5' : 'text-slate-400'}`}>{d}</div>
              ))}
            </div>

            {/* Time grid */}
            {hours.map((hour) => (
              <div key={hour} className="grid grid-cols-8 border-b border-slate-700/20">
                <div className="p-2 text-[11px] text-slate-500 text-center">{hour > 12 ? hour - 12 : hour}{hour >= 12 ? 'PM' : 'AM'}</div>
                {Array.from({ length: 7 }, (_, day) => {
                  const event = filteredEvents.find((e) => e.day === day && hour >= e.start && hour < e.end);
                  const isStart = event && hour === event.start;
                  return (
                    <div
                      key={day}
                      className={`p-1 min-h-[32px] border-l border-slate-700/20 cursor-pointer hover:bg-slate-700/20 transition-colors ${day === 1 ? 'bg-sky-400/[0.02]' : ''}`}
                      onClick={() => handleSlotClick(day, hour)}
                    >
                      {isStart && (
                        <div
                          className="text-[10px] text-white font-medium px-1.5 py-0.5 rounded truncate"
                          style={{ backgroundColor: event.color + '30', borderLeft: `3px solid ${event.color}` }}
                        >
                          {event.title}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Reservation Request Inbox */}
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-slate-300 mb-3">Reservation Request Inbox</h3>
          <div className="space-y-3">
            {pendingRequests.map((req) => (
              <div key={req.id} className="bg-slate-900/40 rounded-lg p-3 border border-slate-700/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">{req.name}</span>
                  <span className="text-xs px-2 py-0.5 bg-amber-400/10 text-amber-400 rounded-full">Pending</span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-xs text-slate-400 mb-2">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{req.facility}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{req.date} {req.time}</span>
                  <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />${req.fee}.00</span>
                  <span className="flex items-center gap-1"><FileText className="w-3 h-3" />{req.permits.length} permits needed</span>
                </div>
                {/* Permit Checklist */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {req.permits.map((p) => (
                    <span key={p} className="text-[10px] px-1.5 py-0.5 bg-slate-700/50 text-slate-400 rounded flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5 text-slate-500" /> {p}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button className="text-xs bg-green-500/10 text-green-400 px-3 py-1 rounded hover:bg-green-500/20 transition-colors">Approve</button>
                  <button className="text-xs bg-red-500/10 text-red-400 px-3 py-1 rounded hover:bg-red-500/20 transition-colors">Deny</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Online Request Preview */}
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
            <Globe className="w-4 h-4 text-sky-400" /> Online Portal Request Preview
          </h3>
          <div className="bg-slate-900/50 rounded-lg border border-slate-700/30 overflow-hidden">
            {/* Mini browser chrome */}
            <div className="bg-slate-700/50 px-3 py-2 flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
              </div>
              <div className="flex-1 bg-slate-800/80 rounded px-2 py-0.5 text-[10px] text-slate-400 font-mono">portal.moodyrecreation.mil/reserve</div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-sky-400/10 rounded-lg flex items-center justify-center">
                  <Globe className="w-4 h-4 text-sky-400" />
                </div>
                <div>
                  <p className="text-xs text-sky-400 font-medium">New Reservation Request</p>
                  <p className="text-[10px] text-slate-500">Submitted {onlineRequest.submitted}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-400">Requestor</span><span className="text-white">{onlineRequest.name}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Facility</span><span className="text-white">{onlineRequest.facility}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Date</span><span className="text-white">{onlineRequest.date}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Time</span><span className="text-white">{onlineRequest.time}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Purpose</span><span className="text-white text-right max-w-[200px]">{onlineRequest.purpose}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Attendees</span><span className="text-white">{onlineRequest.attendees}</span></div>
              </div>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 text-xs bg-green-500/10 text-green-400 px-3 py-2 rounded-lg hover:bg-green-500/20 transition-colors font-medium">Approve & Assign</button>
                <button className="flex-1 text-xs bg-slate-700/50 text-slate-300 px-3 py-2 rounded-lg hover:bg-slate-700/80 transition-colors font-medium">Request Info</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
