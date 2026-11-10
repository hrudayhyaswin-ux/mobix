import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Search, MapPin, Bus, Train, ParkingSquare, Zap, Hospital, Fuel, Plane, Coffee, Wrench, ArrowRight } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const { isGlobalSearchOpen, setIsGlobalSearchOpen, setActiveTab } = useAuth();
  const [query, setQuery] = useState('');

  if (!isGlobalSearchOpen) return null;

  const sampleSearchDatabase = [
    { title: 'HITEC City Metro Station', category: 'Metro Station', icon: Train, targetTab: 'public_transport' },
    { title: 'Cyber Towers Junction Parking', category: 'Smart Parking', icon: ParkingSquare, targetTab: 'parking' },
    { title: 'Mobilix Ultra-Fast EV Hub (150kW)', category: 'EV Charging', icon: Zap, targetTab: 'ev_charging' },
    { title: 'Bus #216 (Secunderabad - Mindspace)', category: 'Bus Route', icon: Bus, targetTab: 'public_transport' },
    { title: 'Medicover Hospital Emergency Ward', category: 'Emergency Services', icon: Hospital, targetTab: 'emergency' },
    { title: 'HPCL Auto Fuel & CNG Station', category: 'Fuel Station', icon: Fuel, targetTab: 'fuel' },
    { title: 'Rajiv Gandhi International Airport (RGIA)', category: 'Airport Terminal', icon: Plane, targetTab: 'journey_planner' },
    { title: 'Secunderabad Junction Railway Hub', category: 'Railway Station', icon: Train, targetTab: 'public_transport' },
    { title: 'Mindspace Cyber Cafe & Lounge', category: 'Amenity', icon: Coffee, targetTab: 'journey_planner' },
    { title: 'Ather EV Service & Care Center', category: 'Vehicle Services', icon: Wrench, targetTab: 'vehicles' }
  ];

  const filtered = sampleSearchDatabase.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) || 
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (targetTab: string) => {
    setActiveTab(targetTab);
    setIsGlobalSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-16 px-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Input Bar */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-800">
          <Search className="w-5 h-5 text-cyan-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search locations, bus stops, metro, parking, EV chargers, hospitals..."
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 font-medium focus:outline-none text-base"
            autoFocus
          />
          <button 
            onClick={() => setIsGlobalSearchOpen(false)}
            className="px-2.5 py-1 text-xs font-bold text-slate-400 hover:text-white bg-slate-800 rounded-lg"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[420px] overflow-y-auto p-3 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">
              No transport entities matching "{query}". Try searching "Metro", "EV", "Airport", or "Parking".
            </div>
          ) : (
            filtered.map((item, i) => {
              const Icon = item.icon;
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(item.targetTab)}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl text-left hover:bg-slate-800/80 transition group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-800 group-hover:bg-cyan-500/20 text-cyan-400 flex items-center justify-center transition">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-200 group-hover:text-cyan-300 transition">{item.title}</h4>
                      <span className="text-[11px] text-slate-400 font-medium">{item.category}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </button>
              );
            })
          )}
        </div>

        {/* Quick Search Chips */}
        <div className="px-6 py-3 bg-slate-950/60 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-500 font-bold uppercase text-[10px]">Popular:</span>
          {['HITEC Metro', 'EV Chargers', 'City Parking', 'Bus 216', 'RGIA Airport'].map(chip => (
            <button
              key={chip}
              onClick={() => setQuery(chip)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-cyan-900/50 transition font-medium whitespace-nowrap"
            >
              {chip}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
