import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MOCK_PARKING } from '../data/mockData';
import { ParkingSpot } from '../types';
import { ParkingSquare, MapPin, ShieldCheck, Clock, CheckCircle2, Ticket as TicketIcon } from 'lucide-react';
import { MapContainer } from '../components/MapContainer';

export const ParkingPage: React.FC = () => {
  const { addTicket, addNotification, setActiveTab } = useAuth();
  const [parkingList] = useState<ParkingSpot[]>(MOCK_PARKING);
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);

  const handleReserveSpot = (p: ParkingSpot) => {
    const code = 'MBLX-PRK-' + Math.floor(10000 + Math.random() * 90000);
    addTicket({
      id: 'TCK-' + Date.now(),
      bookingType: 'Smart Parking',
      ticketCode: code,
      qrData: `PARKING-PASS-${p.id}-${code}`,
      origin: p.name,
      destination: 'Slot B-12',
      amount: p.hourlyRate,
      date: 'Today',
      status: 'Active'
    });
    setSelectedSpot(null);
    addNotification('Parking Spot Reserved', `Slot B-12 reserved at ${p.name}.`, 'success');
    setActiveTab('tickets');
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
          <ParkingSquare className="w-3.5 h-3.5" /> Real-Time Spot Availability
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">Smart Parking Discovery</h1>
        <p className="text-xs text-slate-400 mt-1">
          Locate multi-level garages, check real-time open slots, and reserve spot passes digitally.
        </p>
      </div>

      {/* Grid: Map & List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 space-y-4">
          <MapContainer parkingSpots={parkingList} height="h-[520px]" />
        </div>

        <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1 custom-scrollbar">
          {parkingList.map(p => (
            <div key={p.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 hover:border-indigo-500/40 transition shadow-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">{p.name}</h3>
                <span className="text-xs font-bold text-emerald-400">₹{p.hourlyRate}/hr</span>
              </div>

              <p className="text-xs text-slate-400">{p.address} • {p.distance}</p>

              <div className="flex items-center justify-between text-xs bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-bold">
                <span className="text-emerald-400">{p.available} / {p.total} Spots Free</span>
                <span className="text-cyan-300">Security: ★ {p.securityRating}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedSpot(p)}
                  className="flex-1 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition"
                >
                  Reserve Spot
                </button>
                <button
                  onClick={() => alert(`Navigating to ${p.name}...`)}
                  className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700"
                >
                  Navigate
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Reservation Modal */}
      {selectedSpot && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 relative space-y-4">
            <button onClick={() => setSelectedSpot(null)} className="absolute top-4 right-4 text-slate-400">✕</button>
            <h3 className="text-lg font-bold text-white">Reserve Slot at {selectedSpot.name}</h3>
            <p className="text-xs text-slate-400">Selected Slot: <strong>B-12 (Ground Floor EV Zone)</strong></p>
            <p className="text-xs text-emerald-400 font-bold">Total: ₹{selectedSpot.hourlyRate}.00 / hr</p>
            
            <button
              onClick={() => handleReserveSpot(selectedSpot)}
              className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition"
            >
              Confirm & Issue Digital Parking Pass
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
