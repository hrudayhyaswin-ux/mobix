import React from 'react';
import { Fuel, MapPin, Zap } from 'lucide-react';

export const FuelFinderPage: React.FC = () => {
  const stations = [
    { name: 'HPCL Auto Energy Hub', address: 'HiTech City Flyover', petrol: '₹107.40', diesel: '₹95.60', cng: '₹88.00', dist: '400m', rating: 4.8 },
    { name: 'Indian Oil Smart Station', address: 'Madhapur Main Rd', petrol: '₹107.40', diesel: '₹95.60', cng: 'N/A', dist: '1.1km', rating: 4.6 },
    { name: 'BPCL Fuel & EV Plug Station', address: 'Gachibowli Circle', petrol: '₹107.40', diesel: '₹95.60', cng: '₹88.00', dist: '2.0km', rating: 4.9 }
  ];

  return (
    <div className="space-y-8 pb-16">
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
          <Fuel className="w-3.5 h-3.5" /> Energy & Fuel Finder
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">Fuel Station Finder</h1>
        <p className="text-xs text-slate-400 mt-1">Find nearby Petrol, Diesel, CNG & EV charging hubs with real-time fuel pricing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stations.map((s, i) => (
          <div key={i} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 hover:border-amber-500/40 transition shadow-xl">
            <h3 className="text-base font-bold text-white">{s.name}</h3>
            <p className="text-xs text-slate-400">{s.address} • {s.dist}</p>

            <div className="grid grid-cols-3 gap-2 text-center text-xs bg-slate-950 p-3 rounded-2xl border border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 block">Petrol</span>
                <strong className="text-white">{s.petrol}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Diesel</span>
                <strong className="text-white">{s.diesel}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">CNG</span>
                <strong className="text-emerald-400">{s.cng}</strong>
              </div>
            </div>

            <button onClick={() => alert(`Navigating to ${s.name}`)} className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs hover:bg-slate-700">
              Navigate to Station
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
