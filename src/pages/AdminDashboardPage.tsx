import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MOCK_ADMIN_KPIS, MOCK_INCIDENTS } from '../data/mockData';
import { Building2, Activity, Radio, Car, Bus, ParkingSquare, Zap, AlertTriangle, ShieldCheck, TrendingUp, Users, CheckCircle2 } from 'lucide-react';
import { MapContainer } from '../components/MapContainer';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const AdminDashboardPage: React.FC = () => {
  const { user, addNotification } = useAuth();
  const [incidents, setIncidents] = useState(MOCK_INCIDENTS);

  const handleResolveIncident = async (id: string, location: string) => {
    setIncidents(prev => prev.filter(i => i.id !== id));
    addNotification('Incident Resolved', `Hazard ticket ${id} at ${location} closed by Command Admin.`, 'success');
    try {
      await fetch(`/api/incidents/${id}`, { method: 'DELETE' });
    } catch (e) {
      // client updated
    }
  };

  const demandTrend = [
    { hour: '06 AM', Passengers: 12000, Congestion: 35 },
    { hour: '08 AM', Passengers: 48000, Congestion: 88 },
    { hour: '10 AM', Passengers: 54200, Congestion: 72 },
    { hour: '12 PM', Passengers: 32000, Congestion: 45 },
    { hour: '02 PM', Passengers: 28000, Congestion: 40 },
    { hour: '05 PM', Passengers: 62000, Congestion: 94 },
    { hour: '07 PM', Passengers: 51000, Congestion: 78 }
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Command Control Room Header */}
      <div className="bg-gradient-to-r from-purple-950/80 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-3xl border border-purple-500/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-black text-cyan-400 uppercase tracking-widest">SMART CITY MUNICIPAL COMMAND CENTER</span>
          </div>
          <h1 className="text-3xl font-black text-white mt-1">MOBILIX Control Operations</h1>
          <p className="text-xs text-slate-300 mt-1">
            Real-time urban transit telemetry, fleet dispatch monitoring, automated incident response & traffic signal grid.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-950 px-4 py-2 rounded-2xl border border-purple-500/30 text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">City Mobility Score</span>
            <strong className="text-2xl font-black text-purple-400">82 / 100</strong>
          </div>
        </div>
      </div>

      {/* Real-Time KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex justify-between text-slate-400 text-xs mb-1">
            <span>Active City Fleets</span>
            <Car className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white">{MOCK_ADMIN_KPIS.activeVehicles}</div>
          <span className="text-[10px] text-emerald-400 font-bold">100% Telemetry Online</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex justify-between text-slate-400 text-xs mb-1">
            <span>Active Journeys</span>
            <Activity className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-white">{MOCK_ADMIN_KPIS.activeTrips}</div>
          <span className="text-[10px] text-indigo-300">54.2K Passengers Today</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex justify-between text-slate-400 text-xs mb-1">
            <span>Traffic Hazards</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">{MOCK_ADMIN_KPIS.trafficIncidents} Reported</div>
          <span className="text-[10px] text-amber-300 font-bold">2 Assigned to Crews</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex justify-between text-slate-400 text-xs mb-1">
            <span>CO₂ Saved Today</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">{MOCK_ADMIN_KPIS.co2SavedTonnes} Tonnes</div>
          <span className="text-[10px] text-slate-400">Net City Offset</span>
        </div>
      </div>

      {/* Main Command Room Split: Map + Transit Demand Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left GIS Telemetry Map */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
            <span className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-cyan-400" /> Master Smart City Overlay
            </span>
            <span className="text-emerald-400 font-mono">100ms Low-Latency Stream</span>
          </div>
          <MapContainer height="h-[480px]" showTrafficOverlay={true} />
        </div>

        {/* Right Demand Heatmap & Traffic Chart */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white">Peak Transit Demand vs Congestion</h3>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={demandTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="hour" stroke="#64748b" fontSize={10} />
                  <YAxis stroke="#64748b" fontSize={10} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                  <Area type="monotone" dataKey="Passengers" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} name="Passenger Count" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Incident Resolution Queue */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-300 uppercase">Emergency Incident Priority Queue</h4>
              <span className="text-[10px] font-bold text-amber-400">{incidents.length} Active</span>
            </div>
            <div className="space-y-2 text-xs max-h-56 overflow-y-auto pr-1 custom-scrollbar">
              {incidents.length === 0 ? (
                <div className="p-4 text-center text-slate-500 text-xs">
                  All reported road incidents resolved! 🟢
                </div>
              ) : (
                incidents.map(inc => (
                  <div key={inc.id} className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center justify-between gap-2">
                    <div>
                      <strong className="block font-bold">{inc.type}: {inc.location}</strong>
                      <span className="text-[10px] opacity-80">{inc.description}</span>
                    </div>
                    <button 
                      onClick={() => handleResolveIncident(inc.id, inc.location)}
                      className="px-2.5 py-1 rounded bg-amber-500 text-slate-950 font-bold text-[10px] flex-shrink-0 hover:bg-amber-400 transition"
                    >
                      Resolve
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
