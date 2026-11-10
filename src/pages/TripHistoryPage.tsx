import React, { useState } from 'react';
import { History, Star, Clock, MapPin, Bus, Car, Train } from 'lucide-react';

export const TripHistoryPage: React.FC = () => {
  const trips = [
    { date: 'Today, 08:30 AM', route: 'HITEC City → Raidurg', mode: 'Metro', dist: '4.2 km', cost: 35, duration: '14 min', co2: '3.8 kg saved', rating: 5 },
    { date: 'Yesterday, 06:15 PM', route: 'Mindspace → Jubilee Hills', mode: 'Bus #216', dist: '6.8 km', cost: 25, duration: '22 min', co2: '4.2 kg saved', rating: 5 },
    { date: '05 Oct 2026', route: 'Cyber Towers → Airport RGIA', mode: 'Mobilix EV Cab', dist: '32.0 km', cost: 650, duration: '34 min', co2: '7.8 kg saved', rating: 5 }
  ];

  return (
    <div className="space-y-8 pb-16">
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
          <History className="w-3.5 h-3.5" /> Commute History Log
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">Trip History</h1>
        <p className="text-xs text-slate-400 mt-1">Detailed breakdown of past multi-modal trips, expenses, CO₂ savings, and driver ratings.</p>
      </div>

      <div className="space-y-4">
        {trips.map((t, i) => (
          <div key={i} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-cyan-400 px-2.5 py-0.5 rounded bg-cyan-500/20">{t.mode}</span>
                <span className="text-xs text-slate-400">{t.date}</span>
              </div>
              <h3 className="text-base font-bold text-white">{t.route}</h3>
              <p className="text-xs text-slate-400">{t.dist} • {t.duration} • <strong className="text-emerald-400">{t.co2}</strong></p>
            </div>

            <div className="text-right">
              <span className="text-lg font-bold text-emerald-400 block">₹{t.cost}</span>
              <span className="text-xs text-amber-400 font-bold">★ {t.rating}.0 Rating</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
