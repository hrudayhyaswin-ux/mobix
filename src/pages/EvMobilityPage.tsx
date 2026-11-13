import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MOCK_EV_STATIONS } from '../data/mockData';
import { EvStation } from '../types';
import { Zap, Gauge, Battery, BatteryCharging, CheckCircle2, SlidersHorizontal } from 'lucide-react';
import { MapContainer } from '../components/MapContainer';

export const EvMobilityPage: React.FC = () => {
  const { addTicket, addNotification, setActiveTab } = useAuth();
  const [stations] = useState<EvStation[]>(MOCK_EV_STATIONS);
  const [batteryPct, setBatteryPct] = useState(42);

  const handleReservePlug = (e: EvStation) => {
    const code = 'MBLX-EV-' + Math.floor(10000 + Math.random() * 90000);
    addTicket({
      id: 'TCK-' + Date.now(),
      bookingType: 'EV Charging Bay',
      ticketCode: code,
      qrData: `EV-PLUG-RESERVATION-${code}`,
      origin: e.name,
      destination: `Bay #03 (${e.maxKw}kW CCS2)`,
      amount: e.ratePerKwh * 25, // est for 25 kWh charge
      date: 'Today',
      status: 'Active'
    });
    addNotification('EV Plug Bay Reserved', `Reserved 150kW CCS2 plug at ${e.name}. Valid for 20 mins.`, 'success');
    setActiveTab('tickets');
  };

  // Range calculator formula
  const estimatedRangeKm = Math.round((batteryPct / 100) * 450);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5" /> High-Power Charging Network
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">EV Mobility Grid</h1>
        <p className="text-xs text-slate-400 mt-1">
          Find 150kW CCS2 ultra-fast chargers, check real-time plug availability, and calculate EV battery range.
        </p>
      </div>

      {/* EV RANGE CALCULATOR CARD */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/60 border border-emerald-500/40 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="space-y-1">
          <span className="text-xs font-bold text-emerald-400 uppercase">EV Range Estimator</span>
          <h3 className="text-xl font-bold text-white">Tesla / Nexon EV Battery</h3>
          <p className="text-xs text-slate-400">Drag slider to estimate maximum driving range.</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-300">Battery State of Charge</span>
            <span className="text-emerald-400">{batteryPct}%</span>
          </div>
          <input
            type="range"
            min="5"
            max="100"
            value={batteryPct}
            onChange={e => setBatteryPct(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
          <span className="text-[10px] text-slate-400 uppercase block font-bold">Estimated Driving Range</span>
          <strong className="text-3xl font-black text-emerald-400">{estimatedRangeKm} km</strong>
          <span className="text-[10px] text-teal-300 block mt-1">Enough for ~32 city trips</span>
        </div>
      </div>

      {/* Grid: Map + Station List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MapContainer evStations={stations} height="h-[520px]" />
        </div>

        <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1 custom-scrollbar">
          {stations.map(e => (
            <div key={e.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 hover:border-emerald-500/40 transition shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-emerald-400 px-2.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30">
                  {e.maxKw} kW Ultra-Fast
                </span>
                <span className="text-xs font-bold text-cyan-300">₹{e.ratePerKwh}/kWh</span>
              </div>

              <h3 className="text-sm font-bold text-white">{e.name}</h3>
              <p className="text-xs text-slate-400">Operator: {e.operator}</p>

              <div className="flex items-center justify-between text-xs bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-bold">
                <span className="text-emerald-400">{e.available} / {e.total} Chargers Free</span>
                <span className="text-slate-400">{e.connectors.join(', ')}</span>
              </div>

              <button
                onClick={() => handleReservePlug(e)}
                className="w-full py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition"
              >
                Reserve Plug Slot (Issue Pass)
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
