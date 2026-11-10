import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, Ambulance, PhoneCall, Wrench, AlertTriangle, MapPin, CheckCircle2 } from 'lucide-react';

export const EmergencyPage: React.FC = () => {
  const { setIsEmergencyOpen, addNotification } = useAuth();
  const [selectedIssue, setSelectedIssue] = useState<string>('flat_tyre');
  const [requested, setRequested] = useState(false);

  const roadsideServices = [
    { id: 'flat_tyre', title: 'Flat Tyre Replacement', price: 250 },
    { id: 'battery', title: 'EV / 12V Battery Jumpstart', price: 300 },
    { id: 'towing', title: 'Flatbed Towing Service', price: 800 },
    { id: 'fuel', title: 'Emergency Fuel / Charge Delivery', price: 400 },
    { id: 'lockout', title: 'Key Lockout Assistance', price: 350 },
    { id: 'mechanical', title: 'On-Site Mechanical Repair', price: 500 }
  ];

  const handleRequestTechnician = () => {
    setRequested(true);
    addNotification('Technician Dispatched', 'Mobile repair unit #08 dispatched to your location.', 'success');
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-red-950/60 via-slate-900 to-slate-900 p-6 sm:p-8 rounded-3xl border border-red-500/40">
        <span className="text-xs font-bold text-red-400 uppercase tracking-widest flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 animate-pulse" /> Emergency Response & Roadside Assistance
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">Emergency Center</h1>
        <p className="text-xs text-slate-300 mt-1">
          24/7 Rapid SOS dispatch for ambulances, police, fire departments, and roadside mechanical breakdown units.
        </p>

        <button
          onClick={() => setIsEmergencyOpen(true)}
          className="mt-6 px-6 py-3 rounded-2xl bg-red-600 text-white font-black text-sm uppercase tracking-wider hover:bg-red-500 transition shadow-xl shadow-red-600/30 flex items-center gap-2"
        >
          <AlertTriangle className="w-4 h-4 fill-white text-red-600" />
          <span>Launch Emergency SOS Overlay</span>
        </button>
      </div>

      {/* Roadside Assistance Booking */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Wrench className="w-5 h-5 text-amber-400" /> Roadside Breakdown Assistance
        </h2>

        {!requested ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {roadsideServices.map(s => (
                <div
                  key={s.id}
                  onClick={() => setSelectedIssue(s.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition ${
                    selectedIssue === s.id ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold' : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <h4 className="text-xs font-bold">{s.title}</h4>
                  <span className="text-[10px] opacity-80 block mt-1">Est: ₹{s.price} • ~12 min arrival</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleRequestTechnician}
              className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs hover:bg-amber-400 transition"
            >
              Request Mobile Technician to GPS Location
            </button>
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Technician En Route</h3>
            <p className="text-xs text-slate-400">Unit #08 • Estimated arrival in 9 minutes.</p>
            <button
              onClick={() => setRequested(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold"
            >
              Cancel / Done
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
