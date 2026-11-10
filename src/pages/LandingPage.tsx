import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Navigation, Radio, ParkingSquare, Zap, Car, ShieldAlert, 
  SlidersHorizontal, Leaf, ArrowRight, CheckCircle2, Activity, 
  Sparkles, ShieldCheck, Globe, Clock, Flame, Users
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveTab } = useAuth();

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative pt-6 lg:pt-12 text-center max-w-5xl mx-auto px-4">
        {/* Futuristic Glowing Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-6 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Next-Generation Smart City Mobility OS</span>
        </div>

        {/* Hero Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
          Move Smarter. <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">
            Travel Better.
          </span>
        </h1>

        {/* Subheading */}
        <p className="mt-6 text-base sm:text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
          One intelligent platform for every journey, every vehicle, and every city. Unified public transit, ride hailing, EV charging, smart parking & AI routing.
        </p>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => setActiveTab('journey_planner')}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-slate-950 font-extrabold text-sm hover:scale-105 transition shadow-xl shadow-cyan-500/25 flex items-center gap-2"
          >
            <Navigation className="w-4 h-4 fill-slate-950" />
            <span>Plan My Journey</span>
          </button>

          <button
            onClick={() => setActiveTab('live_tracking')}
            className="px-6 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-cyan-500/50 font-extrabold text-sm transition flex items-center gap-2"
          >
            <Radio className="w-4 h-4 text-cyan-400" />
            <span>Explore Live Transport</span>
          </button>

          <button
            onClick={() => setActiveTab('ride_booking')}
            className="px-6 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-emerald-500/50 font-extrabold text-sm transition flex items-center gap-2"
          >
            <Car className="w-4 h-4 text-emerald-400" />
            <span>Book a Ride</span>
          </button>
        </div>

        {/* HERO ANIMATED SMART CITY TRANSPORT VISUALIZATION */}
        <div className="mt-12 relative rounded-3xl overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-6 text-xs text-slate-400">
            <span className="flex items-center gap-2 font-bold text-cyan-400">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              LIVE MOBILIX SMART CITY GRID FEED • HYDERABAD METRO AREA
            </span>
            <span className="hidden sm:inline font-mono">Telemetry Status: OPTIMAL (99.98%)</span>
          </div>

          {/* Interactive Visualizer Canvas Box */}
          <div className="h-64 sm:h-80 w-full relative bg-slate-950/80 rounded-2xl border border-slate-800/80 overflow-hidden flex items-center justify-center">
            
            {/* Animated Traffic Grid & Vehicles */}
            <svg className="absolute inset-0 w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#1e293b" strokeWidth="12" />
              <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="12 6" className="animate-pulse" />

              <line x1="30%" y1="0" x2="30%" y2="100%" stroke="#1e293b" strokeWidth="12" />
              <line x1="30%" y1="0" x2="30%" y2="100%" stroke="#3b82f6" strokeWidth="2" />

              <circle cx="30%" cy="50%" r="35" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 4" className="animate-spin-slow" />
            </svg>

            {/* Floating Transport Mode Cards */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 max-w-3xl w-full">
              {[
                { label: 'TSRTC Bus 216', sub: 'ETA 8m • 72% Full', color: 'border-cyan-500/40 bg-cyan-950/40 text-cyan-300' },
                { label: 'Metro Blue Line', sub: 'Arriving Platform 2', color: 'border-indigo-500/40 bg-indigo-950/40 text-indigo-300' },
                { label: 'Mobilix EV Cab', sub: 'Tesla Model 3 En Route', color: 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300' },
                { label: 'Ather EV Charger', sub: '6/10 Plugs Free', color: 'border-purple-500/40 bg-purple-950/40 text-purple-300' }
              ].map((card, idx) => (
                <div key={idx} className={`p-3 rounded-2xl border backdrop-blur-md shadow-lg ${card.color} transform hover:-translate-y-1 transition duration-200`}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-current animate-ping" />
                    <span className="text-xs font-bold truncate">{card.label}</span>
                  </div>
                  <span className="text-[10px] opacity-80 block">{card.sub}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* HERO ANIMATED STATISTICS COUNTERS */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          {[
            { stat: '50K+', label: 'Daily Journeys', desc: 'Across Metro, Buses & Cabs' },
            { stat: '1,200+', label: 'Transport Partners', desc: 'Fleets & Mobility Providers' },
            { stat: '850+', label: 'EV Charging Hubs', desc: 'Fast CCS2 & Scooter Grid' },
            { stat: '98%', label: 'Route Accuracy', desc: 'AI Traffic Prediction Model' },
          ].map((item, i) => (
            <div key={i} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition">
              <div className="text-3xl sm:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                {item.stat}
              </div>
              <div className="text-sm font-bold text-slate-200 mt-1">{item.label}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>


      {/* HOW IT WORKS SECTION */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Seamless Mobility Flow</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">How MOBILIX Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Enter Destination', desc: 'Type where you want to go in the universal search bar.' },
            { step: '02', title: 'Compare Options', desc: 'Evaluate Metro, Bus, Cab, EV, Walk or Carpool mode matrix.' },
            { step: '03', title: 'Choose & Book', desc: 'Select the fastest, cheapest or greenest zero-carbon route.' },
            { step: '04', title: 'Travel Smarter', desc: 'Enjoy live tracking, single digital ticket & mobility analytics.' }
          ].map((s, i) => (
            <div key={i} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 relative group hover:border-cyan-500/50 transition">
              <div className="text-4xl font-black text-cyan-500/20 group-hover:text-cyan-400/40 transition mb-3">
                {s.step}
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{s.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>


      {/* FEATURES GRID SECTION */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Full Digital Ecosystem</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Everything You Need for Urban Travel</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { id: 'journey_planner', title: 'Smart AI Routing', desc: 'Multi-modal comparison sorting by speed, cost & CO₂.', icon: Navigation, color: 'text-cyan-400' },
            { id: 'live_tracking', title: 'Live Transport Tracking', desc: 'Real-time telemetry for buses, metro & cabs on Leaflet map.', icon: Radio, color: 'text-blue-400' },
            { id: 'parking', title: 'Smart Parking Hub', desc: 'Find & reserve open garage spots with digital passes.', icon: ParkingSquare, color: 'text-indigo-400' },
            { id: 'ev_charging', title: 'EV Charging Grid', desc: '150kW fast charger finder, connector filter & range tool.', icon: Zap, color: 'text-emerald-400' },
            { id: 'ride_booking', title: 'Ride Hailing', desc: 'Instant EV cabs, auto rickshaws & premium rentals.', icon: Car, color: 'text-purple-400' },
            { id: 'emergency', title: 'Emergency Center', icon: ShieldAlert, desc: 'One-tap SOS location broadcast & roadside towing.', color: 'text-red-400' },
            { id: 'traffic', title: 'Traffic Intelligence', desc: 'Congestion heatmap & municipal incident reporting.', icon: SlidersHorizontal, color: 'text-amber-400' },
            { id: 'carbon', title: 'Carbon Tracking', desc: 'Track CO₂ saved per trip & view mobility green score.', icon: Leaf, color: 'text-teal-400' }
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <div 
                key={i} 
                onClick={() => setActiveTab(f.id)}
                className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 cursor-pointer group transition duration-200 hover:-translate-y-1 shadow-lg"
              >
                <div className={`w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mb-4 ${f.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition">{f.title}</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>


      {/* WHY MOBILIX SECTION */}
      <section className="max-w-6xl mx-auto px-4 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-slate-800 rounded-3xl p-8 sm:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Why MOBILIX?</span>
            <h2 className="text-3xl font-extrabold text-white mt-2 leading-tight">
              Built for the Future of Connected Cities
            </h2>
            <p className="text-sm text-slate-300 mt-4 leading-relaxed">
              Urban transportation is often fragmented across multiple disjointed apps. MOBILIX unifies public transit, private vehicles, EV networks, and emergency services into one seamless digital cockpit.
            </p>

            <div className="space-y-3 mt-6 text-xs font-semibold text-slate-200">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Fast • Multi-modal routing engine</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Connected • Integrated Leaflet GIS telemetry</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Safe • Instant SOS emergency broadcast</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Sustainable • Active carbon footprint offset analytics</div>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-2">
              <Leaf className="w-8 h-8 animate-pulse" />
            </div>
            <h3 className="text-xl font-bold text-white">Environmental Impact</h3>
            <p className="text-xs text-slate-400">Join thousands of commuters reducing urban emissions daily.</p>
            <div className="grid grid-cols-2 gap-3 text-center pt-2">
              <div className="bg-slate-900 p-3 rounded-xl">
                <strong className="text-2xl font-black text-emerald-400 block">31.8 kg</strong>
                <span className="text-[10px] text-slate-400">Avg Monthly CO₂ Saved</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl">
                <strong className="text-2xl font-black text-cyan-400 block">4.2 Trees</strong>
                <span className="text-[10px] text-slate-400">Equivalent Planted</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* FINAL CTA SECTION */}
      <section className="text-center max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-3xl sm:text-5xl font-black text-white">
          Your city is moving. <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Move smarter.
          </span>
        </h2>
        <p className="text-sm text-slate-400 mt-4 max-w-md mx-auto">
          Start exploring MOBILIX now with zero setup. Test commuter features, driver portals, and admin command centers.
        </p>
        <button
          onClick={() => setActiveTab('user_dashboard')}
          className="mt-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-slate-950 font-black text-base hover:scale-105 transition shadow-2xl shadow-cyan-500/30"
        >
          Start Your Journey
        </button>
      </section>

    </div>
  );
};
