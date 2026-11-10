import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Navigation, Radio, Wallet, Leaf, Clock, ArrowRight, 
  MapPin, CheckCircle2, AlertTriangle, ShieldCheck, Sparkles, Train, Bus, Car 
} from 'lucide-react';
import { MapContainer } from '../components/MapContainer';

export const UserDashboardPage: React.FC = () => {
  const { user, setActiveTab, setIsIncidentModalOpen, tickets } = useAuth();

  return (
    <div className="space-y-8 pb-12">
      
      {/* Top Greeting Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 p-6 sm:p-8 rounded-3xl border border-slate-800">
        <div>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Commuter Command Dashboard
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-1">
            Good Evening, {user.name} 👋
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Your mobility telemetry is synced. 2 active tickets & 1 upcoming trip.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('journey_planner')}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
          >
            <Navigation className="w-4 h-4 fill-slate-950" />
            <span>Plan Journey</span>
          </button>
          <button
            onClick={() => setIsIncidentModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-800 text-amber-400 border border-amber-500/30 hover:bg-slate-700 font-bold text-xs transition flex items-center gap-1.5"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Report Hazard</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/30 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Today's Trips</span>
            <Navigation className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white">3 Trips</div>
          <span className="text-[10px] text-slate-500">2 Metro • 1 EV Cab</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/30 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Money Saved</span>
            <Wallet className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">₹145.00</div>
          <span className="text-[10px] text-slate-500">Vs. taxi driving</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-teal-500/30 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">CO₂ Emissions Saved</span>
            <Leaf className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-black text-teal-300">3.8 kg</div>
          <span className="text-[10px] text-slate-500">≈ 4.2 Trees planted</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/30 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Travel Time</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white">32 Mins</div>
          <span className="text-[10px] text-slate-500">Saved 18 mins via Metro</span>
        </div>
      </div>

      {/* Main Grid: Left Column & Right Column */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 Cols wide) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Upcoming Journey Card */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Upcoming Journey</span>
              <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full font-bold">In 25 Mins</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0">
                  <Train className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">HITEC City → Raidurg Metro</h4>
                  <p className="text-xs text-slate-400">Metro Blue Line • Platform 2 • Fare: ₹35</p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('tickets')}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition"
              >
                View Ticket QR
              </button>
            </div>
          </div>

          {/* Live Map Preview Container */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Radio className="w-4 h-4 text-cyan-400" /> Live Nearby Transport Map
              </h3>
              <button
                onClick={() => setActiveTab('live_tracking')}
                className="text-xs text-cyan-400 hover:underline font-semibold"
              >
                Full Map View →
              </button>
            </div>
            <MapContainer height="h-[340px]" />
          </div>

          {/* Recommended Routes Grid */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">Recommended Frequent Routes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                onClick={() => setActiveTab('journey_planner')}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition"
              >
                <div className="flex items-center justify-between text-xs text-cyan-400 font-bold mb-1">
                  <span>Home → Office</span>
                  <span>32 mins</span>
                </div>
                <div className="text-sm font-bold text-white">HITEC City Metro Bypass</div>
                <span className="text-[10px] text-slate-400 block mt-1">₹35 • Metro + 4m Walk • Saves 3.8kg CO₂</span>
              </div>

              <div 
                onClick={() => setActiveTab('journey_planner')}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition"
              >
                <div className="flex items-center justify-between text-xs text-emerald-400 font-bold mb-1">
                  <span>Office → College</span>
                  <span>24 mins</span>
                </div>
                <div className="text-sm font-bold text-white">Mobilix EV Direct Cab</div>
                <span className="text-[10px] text-slate-400 block mt-1">₹190 • Zero-Emission Electric Cab</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (1 Col wide) */}
        <div className="space-y-6">
          
          {/* MOBILITY SCORE GAUGE CARD */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 text-center relative overflow-hidden">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Mobility Score</span>
            
            {/* Animated Progress Ring */}
            <div className="my-6 relative w-36 h-36 mx-auto flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="72" cy="72" r="60" stroke="#1e293b" strokeWidth="12" fill="none" />
                <circle 
                  cx="72" cy="72" r="60" 
                  stroke="#06b6d4" strokeWidth="12" fill="none"
                  strokeDasharray="377"
                  strokeDashoffset={377 - (377 * user.mobilityScore) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-white">{user.mobilityScore}</span>
                <span className="text-[10px] text-cyan-400 font-bold uppercase">/ 100 EXCELLENT</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-left text-[11px] bg-slate-950 p-3 rounded-2xl border border-slate-800/80">
              <div>
                <span className="text-slate-400 block">Public Transit</span>
                <strong className="text-cyan-300">92% Usage</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Carbon Saved</span>
                <strong className="text-emerald-400">31.8 kg</strong>
              </div>
            </div>
          </div>

          {/* Quick Wallet Pass Widget */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase">Mobility Wallet</span>
              <button 
                onClick={() => setActiveTab('wallet')}
                className="text-xs font-bold text-cyan-400 hover:underline"
              >
                Top-up
              </button>
            </div>
            <div className="text-3xl font-black text-emerald-400">₹{user.walletBalance.toFixed(2)}</div>
            <p className="text-[11px] text-slate-400">Auto-debit enabled for Metro & Smart Parking slots.</p>
          </div>

          {/* Live Alerts & Disruption Feeds */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Active City Alerts</h4>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300">
                <strong className="block font-bold">Cyber Towers Congestion</strong>
                <span className="text-[11px] opacity-90">Signal repair in progress. Expect +10 min delay.</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                <strong className="block font-bold">EV Hub Openings</strong>
                <span className="text-[11px] opacity-90">6 fast 150kW chargers available at Phase II.</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
