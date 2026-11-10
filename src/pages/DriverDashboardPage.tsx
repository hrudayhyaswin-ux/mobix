import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Car, DollarSign, Star, Power, MapPin, CheckCircle2, XCircle } from 'lucide-react';

export const DriverDashboardPage: React.FC = () => {
  const { addNotification } = useAuth();
  const [isOnline, setIsOnline] = useState(true);
  const [hasRequest, setHasRequest] = useState(true);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800">
        <div>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
            <Car className="w-3.5 h-3.5" /> Driver Telemetry Portal
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Driver Partner Portal</h1>
          <p className="text-xs text-slate-400 mt-1">
            Vehicle: <strong>Tesla Model 3 EV (TS 09 EV 4421)</strong> • Driver Rating: <strong>4.9 ★</strong>
          </p>
        </div>

        {/* Online / Offline Toggle */}
        <button
          onClick={() => {
            setIsOnline(!isOnline);
            addNotification('Status Changed', `You are now ${!isOnline ? 'ONLINE' : 'OFFLINE'}.`, 'info');
          }}
          className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-2 transition shadow-lg ${
            isOnline ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/20' : 'bg-slate-800 text-slate-400'
          }`}
        >
          <Power className="w-4 h-4" />
          <span>{isOnline ? 'ONLINE (ACCEPTING TRIPS)' : 'OFFLINE'}</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <span className="text-xs font-bold text-slate-400 uppercase">Today's Earnings</span>
          <div className="text-3xl font-black text-emerald-400 mt-1">₹3,450.00</div>
          <span className="text-[10px] text-slate-500">12 Completed Rides</span>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <span className="text-xs font-bold text-slate-400 uppercase">Total Trips</span>
          <div className="text-3xl font-black text-cyan-300 mt-1">1,420</div>
          <span className="text-[10px] text-slate-500">99.8% Acceptance Rate</span>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <span className="text-xs font-bold text-slate-400 uppercase">Driver Rating</span>
          <div className="text-3xl font-black text-amber-400 mt-1">4.9 ★</div>
          <span className="text-[10px] text-slate-500">Top 1% Mobilix Driver</span>
        </div>
      </div>

      {/* Active Passenger Request Card */}
      {isOnline && hasRequest && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-950/60 to-slate-900 border-2 border-cyan-500 space-y-4 shadow-2xl animate-pulse">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-widest">Incoming Passenger Request</span>
            <span className="text-xs font-bold text-emerald-400">Fare: ₹190.00</span>
          </div>

          <h3 className="text-lg font-bold text-white">Pickup: Cyber Towers Gate 2 → Drop: Inorbit Mall</h3>
          <p className="text-xs text-slate-300">Distance: 3.4 km • Est Duration: 8 Mins • Passenger: Hruday (4.9 ★)</p>

          <div className="flex gap-4">
            <button
              onClick={() => {
                setHasRequest(false);
                addNotification('Ride Accepted', 'Navigating to passenger pickup location.', 'success');
              }}
              className="flex-1 py-3 rounded-xl bg-cyan-500 text-slate-950 font-extrabold text-xs hover:bg-cyan-400 transition"
            >
              Accept Ride (₹190)
            </button>
            <button
              onClick={() => setHasRequest(false)}
              className="px-6 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700"
            >
              Decline
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
