import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MOCK_LIVE_VEHICLES } from '../data/mockData';
import { LiveVehicle } from '../types';
import { Radio, Bus, Train, Car, Activity, MapPin, Gauge, Clock, Users, ArrowRight } from 'lucide-react';
import { MapContainer } from '../components/MapContainer';

export const LiveTrackingPage: React.FC = () => {
  const { setActiveTab } = useAuth();
  const [vehicles, setVehicles] = useState<LiveVehicle[]>(MOCK_LIVE_VEHICLES);
  const [selectedVehicle, setSelectedVehicle] = useState<LiveVehicle | null>(vehicles[0]);
  const [filterType, setFilterType] = useState<string>('all');

  const filteredVehicles = vehicles.filter(v => filterType === 'all' || v.type.toLowerCase() === filterType.toLowerCase());

  return (
    <div className="space-y-6 pb-16">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800">
        <div>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 animate-pulse" /> Real-Time Telemetry Feed
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Live Transport Tracking</h1>
          <p className="text-xs text-slate-400 mt-1">
            Track active city buses, metro trains, local rail, and EV cabs with sub-second GPS refresh.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          {['all', 'Bus', 'Metro', 'EV'].map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg font-bold transition uppercase text-[11px] ${
                filterType === t ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map + Live Feed Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Interactive Map (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <MapContainer 
            vehicles={filteredVehicles} 
            height="h-[580px]"
            onSelectVehicle={(v) => setSelectedVehicle(v)}
          />
        </div>

        {/* Right Live Vehicle Cards Feed (1 Col) */}
        <div className="space-y-4 max-h-[580px] overflow-y-auto pr-1 custom-scrollbar">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase px-1">
            <span>Active Fleet ({filteredVehicles.length})</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Live GPS
            </span>
          </div>

          {filteredVehicles.map(v => {
            const isSelected = selectedVehicle?.id === v.id;
            return (
              <div
                key={v.id}
                onClick={() => setSelectedVehicle(v)}
                className={`p-5 rounded-2xl border transition cursor-pointer ${
                  isSelected 
                    ? 'bg-slate-900 border-cyan-500 shadow-xl shadow-cyan-500/10' 
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-cyan-400 flex items-center gap-1.5">
                    {v.type === 'Bus' ? <Bus className="w-4 h-4" /> : v.type === 'Metro' ? <Train className="w-4 h-4" /> : <Car className="w-4 h-4" />}
                    {v.number}
                  </span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {v.status}
                  </span>
                </div>

                <div className="text-xs font-bold text-white mb-2">
                  To: {v.destination}
                </div>

                <div className="grid grid-cols-3 gap-2 text-[11px] bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-slate-300">
                  <div>
                    <span className="text-slate-500 block text-[9px] uppercase">Speed</span>
                    <strong className="text-cyan-300">{v.speed}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[9px] uppercase">ETA</span>
                    <strong className="text-emerald-400">{v.eta}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[9px] uppercase">Capacity</span>
                    <strong className="text-teal-300">{v.occupancy}%</strong>
                  </div>
                </div>

                {isSelected && (
                  <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Route Telemetry Connected</span>
                    <button
                      onClick={() => setActiveTab('journey_planner')}
                      className="text-cyan-400 font-bold hover:underline flex items-center gap-1"
                    >
                      Book Ticket <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
