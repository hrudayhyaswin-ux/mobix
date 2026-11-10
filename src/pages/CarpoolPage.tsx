import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Users, Car, MapPin, DollarSign, Leaf, CheckCircle2 } from 'lucide-react';

export const CarpoolPage: React.FC = () => {
  const { addNotification } = useAuth();
  const [created, setCreated] = useState(false);

  const carpoolList = [
    { driver: 'Alex Mercer', route: 'Cyber Towers → Gachibowli', seats: 2, price: 65, car: 'Hyundai Ioniq EV', co2Saved: 4.8 },
    { driver: 'Priya Sharma', route: 'Kondapur → HITEC City', seats: 3, price: 45, car: 'Tata Nexon EV', co2Saved: 5.2 }
  ];

  return (
    <div className="space-y-8 pb-16">
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5" /> Eco-Ride Sharing
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">Mobilix Carpool Share</h1>
        <p className="text-xs text-slate-400 mt-1">Save Money + Reduce Traffic + Reduce Carbon Emissions by sharing rides with verified commuters.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {carpoolList.map((c, i) => (
          <div key={i} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 hover:border-cyan-500/40 transition shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">{c.driver}</span>
              <span className="text-xs font-extrabold text-emerald-400">₹{c.price} / Seat</span>
            </div>
            <h3 className="text-base font-bold text-cyan-300">{c.route}</h3>
            <p className="text-xs text-slate-400">{c.car} • {c.seats} Available Seats • Saves {c.co2Saved}kg CO₂</p>
            <button
              onClick={() => addNotification('Carpool Request Sent', `Requested seat with ${c.driver}.`, 'success')}
              className="w-full py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition"
            >
              Join Carpool (₹{c.price})
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
