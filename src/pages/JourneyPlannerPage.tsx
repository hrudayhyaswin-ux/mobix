import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MOCK_JOURNEYS } from '../data/mockData';
import { JourneyOption } from '../types';
import { Navigation, Clock, Wallet, Leaf, Sparkles, Filter, Train, Bus, Car, Users, ArrowRight, HelpCircle } from 'lucide-react';

export const JourneyPlannerPage: React.FC = () => {
  const { addTicket, addNotification, setActiveTab } = useAuth();

  const [from, setFrom] = useState('HITEC City Junction');
  const [to, setTo] = useState('Raidurg Tech Park');
  const [date, setDate] = useState('Today');
  const [time, setTime] = useState('08:30 AM');
  const [sortFilter, setSortFilter] = useState<'fastest' | 'cheapest' | 'greenest' | 'convenient'>('fastest');
  const [selectedWhy, setSelectedWhy] = useState<JourneyOption | null>(null);

  const [journeys, setJourneys] = useState<JourneyOption[]>(MOCK_JOURNEYS);

  const getSortedJourneys = () => {
    return [...journeys].sort((a, b) => {
      if (sortFilter === 'fastest') return a.timeMins - b.timeMins;
      if (sortFilter === 'cheapest') return a.costINR - b.costINR;
      if (sortFilter === 'greenest') return a.co2Kg - b.co2Kg;
      return a.costINR - b.costINR;
    });
  };

  const handleBookOption = (j: JourneyOption) => {
    const ticketCode = 'MBLX-' + j.mode.slice(0, 3).toUpperCase() + '-' + Math.floor(10000 + Math.random() * 90000);
    addTicket({
      id: 'TCK-' + Date.now(),
      bookingType: j.mode,
      ticketCode,
      qrData: `MOBILIX-BOOKING-${ticketCode}`,
      origin: from,
      destination: to,
      amount: j.costINR,
      date: 'Today, ' + time,
      status: 'Active'
    });
    setActiveTab('tickets');
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Page Header */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
          <Navigation className="w-3.5 h-3.5" /> Multi-Modal Journey Engine
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">Smart Journey Planner</h1>
        <p className="text-xs text-slate-400 mt-1">
          Compare 11 transportation modes instantly across time, fare cost, distance, and CO₂ emissions.
        </p>

        {/* Input Controls */}
        <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">From Location</label>
            <input
              type="text"
              value={from}
              onChange={e => setFrom(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-medium focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">To Destination</label>
            <input
              type="text"
              value={to}
              onChange={e => setTo(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-medium focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Date</label>
            <input
              type="text"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-medium focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Departure Time</label>
            <input
              type="text"
              value={time}
              onChange={e => setTime(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-medium focus:border-cyan-500 focus:outline-none"
            />
          </div>
        </form>
      </div>

      {/* AI ROUTE INTELLIGENCE CARD */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-purple-950/60 border border-indigo-500/40 relative">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-indigo-400 animate-bounce" />
          <span className="text-xs font-extrabold text-indigo-300 uppercase tracking-widest">AI Route Intelligence Recommendation</span>
        </div>
        <h3 className="text-lg font-bold text-white">
          Metro + Walking is recommended for this trip
        </h3>
        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
          Metro + Walking is recommended because it saves 18 minutes, ₹145 and approximately 3.8 kg CO₂ compared with taking a cab. Weather is clear (28°C) and crowd level is moderate.
        </p>

        <div className="mt-4 flex flex-wrap gap-4 text-xs font-semibold text-slate-300">
          <span className="bg-indigo-900/40 px-3 py-1 rounded-lg border border-indigo-500/30">Traffic: Clear Flow</span>
          <span className="bg-indigo-900/40 px-3 py-1 rounded-lg border border-indigo-500/30">Weather: 28°C Clear</span>
          <span className="bg-indigo-900/40 px-3 py-1 rounded-lg border border-indigo-500/30">Safety Rating: 99/100</span>
        </div>
      </div>

      {/* Sorting Tabs Bar */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-3">
        <span className="text-xs font-bold text-slate-400 uppercase">11 Transport Modes Evaluated</span>

        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          {[
            { id: 'fastest', label: 'Fastest ⚡' },
            { id: 'cheapest', label: 'Cheapest 💰' },
            { id: 'greenest', label: 'Greenest 🌿' },
            { id: 'convenient', label: 'Convenient 🚗' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setSortFilter(f.id as any)}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                sortFilter === f.id ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Journey Options Comparison Matrix */}
      <div className="space-y-4">
        {getSortedJourneys().map(j => (
          <div 
            key={j.id} 
            className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition duration-200 shadow-xl"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Option Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-extrabold text-white">{j.mode}</h3>
                  {j.badge && (
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                      {j.badge}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                  <span className="flex items-center gap-1 font-bold text-cyan-300">
                    <Clock className="w-3.5 h-3.5" /> {j.timeMins} min
                  </span>
                  <span className="flex items-center gap-1 font-bold text-emerald-400">
                    <Wallet className="w-3.5 h-3.5" /> ₹{j.costINR}
                  </span>
                  <span className="flex items-center gap-1 font-bold text-teal-300">
                    <Leaf className="w-3.5 h-3.5" /> {j.co2Kg} kg CO₂
                  </span>
                  <span className="text-slate-400">Dist: {j.distanceKm} km</span>
                  <span className="text-slate-400">Crowd: {j.crowd}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedWhy(j)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold text-xs flex items-center gap-1.5 transition"
                >
                  <HelpCircle className="w-4 h-4 text-indigo-400" />
                  <span>Why this route?</span>
                </button>

                <button
                  onClick={() => handleBookOption(j)}
                  className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-extrabold text-xs hover:bg-cyan-400 transition shadow-lg shadow-cyan-500/20 flex items-center gap-1.5"
                >
                  <span>Select & Book</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Route Leg Steps */}
            <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap gap-2 text-[11px] text-slate-400">
              {j.route.map((leg, idx) => (
                <span key={idx} className="bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                  Step {idx + 1}: {leg}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* "Why This Route?" Modal Explanation Drawer */}
      {selectedWhy && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 relative">
            <button 
              onClick={() => setSelectedWhy(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold"
            >
              ✕
            </button>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base font-bold text-white">Route Intelligence Breakdown</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
              {selectedWhy.whyText}
            </p>

            <div className="mt-4 text-xs space-y-2 text-slate-400">
              <div className="flex justify-between"><span>Time Saved:</span> <strong className="text-cyan-400">18 minutes</strong></div>
              <div className="flex justify-between"><span>Fare Saved:</span> <strong className="text-emerald-400">₹145 vs Cab</strong></div>
              <div className="flex justify-between"><span>Emissions Offset:</span> <strong className="text-teal-300">3.8 kg CO₂</strong></div>
            </div>

            <button
              onClick={() => setSelectedWhy(null)}
              className="w-full mt-6 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs"
            >
              Got it
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
