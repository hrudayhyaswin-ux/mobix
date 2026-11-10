import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MOCK_INCIDENTS } from '../data/mockData';
import { SlidersHorizontal, AlertTriangle, MapPin, Gauge, ShieldCheck } from 'lucide-react';
import { MapContainer } from '../components/MapContainer';

export const TrafficIntelligencePage: React.FC = () => {
  const { setIsIncidentModalOpen } = useAuth();
  const [incidents] = useState(MOCK_INCIDENTS);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Traffic Command Sensors
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Traffic Intelligence</h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time arterial road congestion heatmaps, accident feeds, and municipal hazard tracking.
          </p>
        </div>

        <button
          onClick={() => setIsIncidentModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition"
        >
          Report Traffic Incident
        </button>
      </div>

      {/* Traffic Indicators Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
          <span className="w-4 h-4 rounded-full bg-emerald-500 animate-ping" />
          <div>
            <strong className="text-sm font-bold text-emerald-400 block">🟢 Low Congestion</strong>
            <span className="text-[11px] text-slate-400">Outer Ring Road • Avg Speed: 82 km/h</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3">
          <span className="w-4 h-4 rounded-full bg-amber-500" />
          <div>
            <strong className="text-sm font-bold text-amber-400 block">🟡 Moderate Congestion</strong>
            <span className="text-[11px] text-slate-400">Gachibowli Flyover • Avg Speed: 38 km/h</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center gap-3">
          <span className="w-4 h-4 rounded-full bg-red-500 animate-pulse" />
          <div>
            <strong className="text-sm font-bold text-red-400 block">🔴 Heavy Congestion</strong>
            <span className="text-[11px] text-slate-400">Cyber Towers Junction • Avg Speed: 14 km/h</span>
          </div>
        </div>
      </div>

      {/* Map & Incidents Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MapContainer incidents={incidents} showTrafficOverlay={true} height="h-[520px]" />
        </div>

        <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1 custom-scrollbar">
          <h3 className="text-xs font-bold text-slate-400 uppercase">Live Reported Incidents</h3>
          {incidents.map(inc => (
            <div key={inc.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400">{inc.type}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  {inc.status}
                </span>
              </div>
              <h4 className="text-xs font-bold text-white">{inc.location}</h4>
              <p className="text-[11px] text-slate-400">{inc.description}</p>
              <span className="text-[10px] text-slate-500 block">Reported: {inc.createdAt}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
