import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Bus, Train, Search, Ticket as TicketIcon, Users, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

export const PublicTransportPage: React.FC = () => {
  const { addTicket, setActiveTab } = useAuth();
  const [activeTab, setActiveTabLocal] = useState<'bus' | 'metro' | 'train'>('bus');
  const [search, setSearch] = useState('');

  const busRoutes = [
    { code: 'BUS #216', name: 'Secunderabad → Mindspace HITEC', stops: '18 Stops', freq: 'Every 8 mins', fare: 25, crowd: 'Moderate' },
    { code: 'BUS #47V', name: 'Koti → Kondapur Depot', stops: '24 Stops', freq: 'Every 12 mins', fare: 30, crowd: 'High' },
    { code: 'BUS #AJ', name: 'RGIA Airport Express', stops: '6 Direct Stops', freq: 'Every 15 mins', fare: 265, crowd: 'Low' }
  ];

  const metroStations = [
    { name: 'HITEC City Metro Station', line: 'Blue Line', platform: 'Platform 2', crowd: '65% Capacity', firstTrain: '06:00 AM', lastTrain: '11:15 PM' },
    { name: 'Raidurg Terminal Hub', line: 'Blue Line', platform: 'Platform 1', crowd: '40% Capacity', firstTrain: '06:05 AM', lastTrain: '11:20 PM' },
    { name: 'Ameerpet Interchange Hub', line: 'Red & Blue Interchange', platform: 'Platform 3', crowd: '88% Capacity', firstTrain: '05:55 AM', lastTrain: '11:30 PM' }
  ];

  const trainSchedules = [
    { code: 'MMTS 47102', name: 'Lingampally → Falaknuma Local', platform: 'PF 2', delay: 'On Time', fare: 15 },
    { code: 'MMTS 47211', name: 'Secunderabad → HITEC Local', platform: 'PF 1', delay: '5 min Delay', fare: 15 }
  ];

  const filteredBus = busRoutes.filter(b => b.code.toLowerCase().includes(search.toLowerCase()) || b.name.toLowerCase().includes(search.toLowerCase()));
  const filteredMetro = metroStations.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.line.toLowerCase().includes(search.toLowerCase()));
  const filteredTrains = trainSchedules.filter(t => t.code.toLowerCase().includes(search.toLowerCase()) || t.name.toLowerCase().includes(search.toLowerCase()));

  const handleIssueTicket = (type: string, name: string, amount: number) => {
    const code = 'MBLX-PT-' + Math.floor(10000 + Math.random() * 90000);
    addTicket({
      id: 'TCK-' + Date.now(),
      bookingType: type,
      ticketCode: code,
      qrData: `PUBLIC-TRANSIT-${code}`,
      origin: name.split('→')[0] || 'Origin',
      destination: name.split('→')[1] || 'Destination',
      amount,
      date: 'Today',
      status: 'Active'
    });
    setActiveTab('tickets');
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
          <Bus className="w-3.5 h-3.5" /> Unified Transit Authority
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">Public Transport Module</h1>
        <p className="text-xs text-slate-400 mt-1">
          Explore bus timetables, metro interchange maps, local train delay status, and digital pass generation.
        </p>

        {/* Section Tabs & Search Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTabLocal('bus')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === 'bus' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              <Bus className="w-4 h-4" /> Bus Routes
            </button>
            <button
              onClick={() => setActiveTabLocal('metro')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === 'metro' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              <Train className="w-4 h-4" /> Metro Rail
            </button>
            <button
              onClick={() => setActiveTabLocal('train')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === 'train' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              <Train className="w-4 h-4" /> Local Trains
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search route, stop, line..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* BUS MODULE VIEW */}
      {activeTab === 'bus' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredBus.map((b, i) => (
            <div key={i} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 hover:border-cyan-500/40 transition shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-cyan-400 px-3 py-1 rounded-lg bg-cyan-500/20 border border-cyan-500/30">
                  {b.code}
                </span>
                <span className="text-xs font-bold text-emerald-400">₹{b.fare} Fare</span>
              </div>
              <h3 className="text-base font-bold text-white">{b.name}</h3>
              
              <div className="text-xs text-slate-400 space-y-1">
                <p>• {b.stops} along route</p>
                <p>• Frequency: {b.freq}</p>
                <p>• Occupancy: {b.crowd}</p>
              </div>

              <button
                onClick={() => handleIssueTicket('Bus Ticket', b.name, b.fare)}
                className="w-full py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition"
              >
                Buy Digital Bus Ticket
              </button>
            </div>
          ))}
        </div>
      )}

      {/* METRO MODULE VIEW */}
      {activeTab === 'metro' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredMetro.map((m, i) => (
            <div key={i} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 hover:border-indigo-500/40 transition shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-indigo-400 px-3 py-1 rounded-lg bg-indigo-500/20 border border-indigo-500/30">
                  {m.line}
                </span>
                <span className="text-xs text-slate-400 font-semibold">{m.platform}</span>
              </div>
              <h3 className="text-base font-bold text-white">{m.name}</h3>
              
              <div className="text-xs text-slate-400 space-y-1">
                <p>• Crowd Status: {m.crowd}</p>
                <p>• Operating Hours: {m.firstTrain} – {m.lastTrain}</p>
              </div>

              <button
                onClick={() => handleIssueTicket('Metro Pass', m.name, 35)}
                className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition"
              >
                Generate Metro QR Token (₹35)
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TRAIN MODULE VIEW */}
      {activeTab === 'train' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTrains.map((t, i) => (
            <div key={i} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 hover:border-teal-500/40 transition shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-teal-400 px-3 py-1 rounded-lg bg-teal-500/20 border border-teal-500/30">
                  {t.code}
                </span>
                <span className="text-xs font-bold text-emerald-400">{t.delay}</span>
              </div>
              <h3 className="text-base font-bold text-white">{t.name}</h3>
              <p className="text-xs text-slate-400">{t.platform} • ₹{t.fare} Fare</p>

              <button
                onClick={() => handleIssueTicket('Train Ticket', t.name, t.fare)}
                className="w-full py-2.5 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs hover:bg-teal-400 transition"
              >
                Book Local Train Ticket
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
