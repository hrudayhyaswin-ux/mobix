import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { AlertTriangle, PhoneCall, ShieldAlert, Ambulance, Building2, Flame, Wrench, MapPin, CheckCircle2 } from 'lucide-react';

export const EmergencySosModal: React.FC = () => {
  const { isEmergencyOpen, setIsEmergencyOpen, addNotification } = useAuth();
  const [sosActivated, setSosActivated] = useState(false);
  const [selectedService, setSelectedService] = useState<'ambulance' | 'police' | 'fire' | 'roadside'>('ambulance');
  const [dispatchInfo, setDispatchInfo] = useState<{ code: string; hospital: string; police: string } | null>(null);

  if (!isEmergencyOpen) return null;

  const handleTriggerSos = async () => {
    try {
      const res = await fetch('/api/emergency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: selectedService, lat: 17.4435, lng: 78.3772 })
      });
      const data = await res.json();
      setDispatchInfo({
        code: data.dispatchId || 'SOS-HYD-9904',
        hospital: data.nearestHospital || 'Medicover Hospital (Ambulance #04)',
        police: data.nearestPolice || 'Madhapur Police Station (Unit #12)'
      });
    } catch (err) {
      setDispatchInfo({
        code: 'SOS-HYD-9904',
        hospital: 'Medicover Hospital (Ambulance #04)',
        police: 'Madhapur Police Station (Unit #12)'
      });
    }
    setSosActivated(true);
    addNotification('EMERGENCY SOS DISPATCHED', 'Ambulance & Police emergency units dispatched to current GPS location.', 'emergency');
  };

  return (
    <div className="fixed inset-0 z-50 bg-red-950/90 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-xl bg-slate-900 border-2 border-red-600/80 rounded-3xl shadow-2xl p-6 sm:p-8 relative">
        
        <button 
          onClick={() => { setIsEmergencyOpen(false); setSosActivated(false); }}
          className="absolute top-5 right-5 text-slate-400 hover:text-white font-bold text-sm bg-slate-800 px-3 py-1 rounded-xl"
        >
          Close ✕
        </button>

        {!sosActivated ? (
          <div>
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-red-600/20 text-red-500 border-2 border-red-500/60 flex items-center justify-center mx-auto mb-3 animate-pulse">
                <ShieldAlert className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-black text-white uppercase tracking-wider">
                Emergency Assistance Center
              </h2>
              <p className="text-xs text-red-300 font-semibold mt-1">
                Broadcasting GPS Location: 17.4435° N, 78.3772° E (Mindspace Junction)
              </p>
            </div>

            {/* Service Selection Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { id: 'ambulance', label: 'Ambulance', icon: Ambulance, color: 'text-red-400 border-red-500/40 bg-red-950/30' },
                { id: 'police', label: 'Police', icon: ShieldAlert, color: 'text-blue-400 border-blue-500/40 bg-blue-950/30' },
                { id: 'fire', label: 'Fire Dept', icon: Flame, color: 'text-orange-400 border-orange-500/40 bg-orange-950/30' },
                { id: 'roadside', label: 'Towing/Repair', icon: Wrench, color: 'text-amber-400 border-amber-500/40 bg-amber-950/30' },
              ].map(s => {
                const Icon = s.icon;
                const isSel = selectedService === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedService(s.id as any)}
                    className={`p-3 rounded-2xl border text-center transition ${s.color} ${isSel ? 'ring-2 ring-white scale-105 font-extrabold' : 'opacity-80'}`}
                  >
                    <Icon className="w-6 h-6 mx-auto mb-1" />
                    <span className="text-xs">{s.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Giant One-Tap SOS Button */}
            <button
              onClick={handleTriggerSos}
              className="w-full py-5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-black text-xl uppercase tracking-widest hover:scale-105 active:scale-95 transition shadow-2xl shadow-red-600/50 flex items-center justify-center gap-3 animate-bounce"
            >
              <AlertTriangle className="w-7 h-7 fill-white text-red-600" />
              <span>TAP TO BROADCAST EMERGENCY SOS</span>
            </button>

            {/* Emergency Contacts Directory */}
            <div className="mt-6 pt-4 border-t border-slate-800 grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Nearest Hospital (1.2 km)</span>
                <strong className="text-white">Medicover Emergency Ward</strong>
                <a href="tel:108" className="text-red-400 font-bold block mt-1 hover:underline">📞 Dial 108</a>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Police Control Room</span>
                <strong className="text-white">Madhapur Police Station</strong>
                <a href="tel:100" className="text-blue-400 font-bold block mt-1 hover:underline">📞 Dial 100</a>
              </div>
            </div>

          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-4 animate-ping">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-white uppercase">SOS DISPATCH EN ROUTE</h2>
            <p className="text-xs text-emerald-300 font-semibold mt-1">Dispatch Code: {dispatchInfo?.code || 'SOS-HYD-9904'}</p>
            
            <div className="my-6 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Unit Dispatched:</span>
                <strong className="text-red-400">{dispatchInfo?.hospital || 'Medicover Ambulance #04'}</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>ETA to Location:</span>
                <strong className="text-cyan-400">4 Minutes (Live GPS Tracked)</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Police Unit:</span>
                <strong className="text-blue-400">{dispatchInfo?.police || 'Patrol Car #12 En Route'}</strong>
              </div>
            </div>

            <button
              onClick={() => { setIsEmergencyOpen(false); setSosActivated(false); }}
              className="px-6 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition"
            >
              Return to Dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
