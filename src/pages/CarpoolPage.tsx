import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Users, Car, MapPin, DollarSign, Leaf, Plus, CheckCircle2 } from 'lucide-react';

export const CarpoolPage: React.FC = () => {
  const { addTicket, deductWalletMoney, addNotification, setActiveTab } = useAuth();
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [carpoolList, setCarpoolList] = useState([
    { driver: 'Alex Mercer', route: 'Cyber Towers → Gachibowli', seats: 2, price: 65, car: 'Hyundai Ioniq EV', co2Saved: 4.8 },
    { driver: 'Priya Sharma', route: 'Kondapur → HITEC City', seats: 3, price: 45, car: 'Tata Nexon EV', co2Saved: 5.2 },
    { driver: 'Karthik V.', route: 'Madhapur → Financial District', seats: 2, price: 55, car: 'Tesla Model 3 EV', co2Saved: 4.5 }
  ]);

  const [newRide, setNewRide] = useState({
    route: '',
    seats: 3,
    price: 50,
    car: 'Tesla Model 3 EV'
  });

  const handleJoinCarpool = (c: typeof carpoolList[0]) => {
    const success = deductWalletMoney(c.price);
    if (!success) return;

    const code = 'MBLX-POOL-' + Math.floor(10000 + Math.random() * 90000);
    addTicket({
      id: 'TCK-' + Date.now(),
      bookingType: 'Carpool Share',
      ticketCode: code,
      qrData: `CARPOOL-PASS-${code}`,
      origin: c.route.split('→')[0].trim(),
      destination: c.route.split('→')[1].trim(),
      amount: c.price,
      date: 'Today',
      status: 'Active'
    });

    addNotification('Carpool Seat Confirmed', `Seat booked with ${c.driver}. Ticket issued.`, 'success');
    setActiveTab('tickets');
  };

  const handlePublishRide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRide.route) return;

    const ride = {
      driver: 'Hruday (You)',
      route: newRide.route,
      seats: Number(newRide.seats),
      price: Number(newRide.price),
      car: newRide.car,
      co2Saved: 4.9
    };

    setCarpoolList(prev => [ride, ...prev]);
    setShowOfferModal(false);
    addNotification('Carpool Published', `Your carpool ride for ${ride.route} is live for commuters!`, 'success');
    setNewRide({ route: '', seats: 3, price: 50, car: 'Tesla Model 3 EV' });
  };

  return (
    <div className="space-y-8 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800">
        <div>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" /> Eco-Ride Sharing
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Mobilix Carpool Share</h1>
          <p className="text-xs text-slate-400 mt-1">Save Money + Reduce Traffic + Reduce Carbon Emissions by sharing rides with verified commuters.</p>
        </div>

        <button
          onClick={() => setShowOfferModal(true)}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Offer a Carpool Ride
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {carpoolList.map((c, i) => (
          <div key={i} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 hover:border-cyan-500/40 transition shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">{c.driver}</span>
              <span className="text-xs font-extrabold text-emerald-400">₹{c.price} / Seat</span>
            </div>
            <h3 className="text-base font-bold text-cyan-300">{c.route}</h3>
            <p className="text-xs text-slate-400">{c.car} • {c.seats} Available Seats • Saves {c.co2Saved}kg CO₂</p>
            <button
              onClick={() => handleJoinCarpool(c)}
              className="w-full py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition"
            >
              Join Carpool (₹{c.price})
            </button>
          </div>
        ))}
      </div>

      {/* Offer Ride Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setShowOfferModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white font-bold text-sm"
            >
              ✕
            </button>

            <h3 className="text-lg font-bold text-white">Offer a Carpool Ride</h3>
            <p className="text-xs text-slate-400">Share empty seats on your daily commute and split costs.</p>

            <form onSubmit={handlePublishRide} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Route (From → To)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Madhapur → Financial District"
                  value={newRide.route}
                  onChange={e => setNewRide({ ...newRide, route: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Available Seats</label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={newRide.seats}
                    onChange={e => setNewRide({ ...newRide, seats: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Price per Seat (₹)</label>
                  <input
                    type="number"
                    min="10"
                    step="5"
                    value={newRide.price}
                    onChange={e => setNewRide({ ...newRide, price: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-emerald-400 font-bold focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Vehicle Model</label>
                <input
                  type="text"
                  value={newRide.car}
                  onChange={e => setNewRide({ ...newRide, car: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition"
              >
                Publish Carpool Ride
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
