import React from 'react';
import { Layers, Bus, Train, Wrench, Users, CheckCircle2, Clock } from 'lucide-react';

export const OperatorDashboardPage: React.FC = () => {
  const fleets = [
    { name: 'TSRTC Bus Route #216 Fleet', active: 18, total: 20, status: '90% Operational', delay: 'Low (2 mins)' },
    { name: 'Hyderabad Metro Blue Line', active: 12, total: 12, status: '100% Operational', delay: 'On Time' },
    { name: 'EV City Feeder Shuttle Grid', active: 25, total: 28, status: '89% Operational', delay: 'On Time' }
  ];

  return (
    <div className="space-y-8 pb-16">
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800">
        <span className="text-xs font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5" /> Fleet & Transit Operator Portal
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">Transport Operator Dashboard</h1>
        <p className="text-xs text-slate-400 mt-1">Manage public transit vehicle schedules, route frequencies, driver rosters, and depot maintenance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {fleets.map((f, i) => (
          <div key={i} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 hover:border-purple-500/40 transition shadow-xl">
            <h3 className="text-base font-bold text-white">{f.name}</h3>
            
            <div className="text-xs space-y-1 text-slate-400">
              <p>• Active Vehicles: <strong className="text-emerald-400">{f.active} / {f.total}</strong></p>
              <p>• Fleet Status: {f.status}</p>
              <p>• System Delay Index: {f.delay}</p>
            </div>

            <button onClick={() => alert(`Opening dispatch control for ${f.name}`)} className="w-full py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-500 transition">
              Dispatch Roster & Frequency
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
