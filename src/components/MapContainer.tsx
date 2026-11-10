import React, { useState } from 'react';
import { LiveVehicle, ParkingSpot, EvStation, Incident } from '../types';
import { Bus, Train, Car, Zap, ParkingSquare, AlertTriangle, Navigation, Info } from 'lucide-react';

interface MapContainerProps {
  vehicles?: LiveVehicle[];
  parkingSpots?: ParkingSpot[];
  evStations?: EvStation[];
  incidents?: Incident[];
  onSelectVehicle?: (v: LiveVehicle) => void;
  onSelectParking?: (p: ParkingSpot) => void;
  onSelectEv?: (e: EvStation) => void;
  height?: string;
  showTrafficOverlay?: boolean;
}

export const MapContainer: React.FC<MapContainerProps> = ({
  vehicles = [],
  parkingSpots = [],
  evStations = [],
  incidents = [],
  onSelectVehicle,
  onSelectParking,
  onSelectEv,
  height = 'h-[500px]',
  showTrafficOverlay = true
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'transit' | 'parking' | 'ev' | 'traffic'>('all');
  const [selectedMarker, setSelectedMarker] = useState<any>(null);

  return (
    <div className={`relative w-full ${height} rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl group`}>
      
      {/* Map Control Bar Overlay */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-xl border border-slate-800 shadow-lg">
        <button 
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1 rounded-lg text-xs font-bold transition ${activeTab === 'all' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
        >
          All Layers
        </button>
        <button 
          onClick={() => setActiveTab('transit')}
          className={`px-3 py-1 rounded-lg text-xs font-bold transition ${activeTab === 'transit' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
        >
          Live Transit
        </button>
        <button 
          onClick={() => setActiveTab('parking')}
          className={`px-3 py-1 rounded-lg text-xs font-bold transition ${activeTab === 'parking' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
        >
          Parking
        </button>
        <button 
          onClick={() => setActiveTab('ev')}
          className={`px-3 py-1 rounded-lg text-xs font-bold transition ${activeTab === 'ev' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
        >
          EV Charging
        </button>
      </div>

      {/* Simulated High-Tech Futuristic Map Canvas Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-70">
        
        {/* Map Grid Roads */}
        <svg className="w-full h-full opacity-60 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          {/* Main Arterial Road Lines */}
          <path d="M 0 180 Q 300 220 600 160 T 1200 240" fill="none" stroke="#1e293b" strokeWidth="24" />
          <path d="M 0 180 Q 300 220 600 160 T 1200 240" fill="none" stroke="#0ea5e9" strokeWidth="4" strokeDasharray="8 8" className="animate-pulse" />
          
          <path d="M 250 0 L 350 700" fill="none" stroke="#1e293b" strokeWidth="18" />
          <path d="M 250 0 L 350 700" fill="none" stroke="#3b82f6" strokeWidth="3" />

          <path d="M 650 0 C 600 250 750 450 700 800" fill="none" stroke="#1e293b" strokeWidth="20" />
          <path d="M 650 0 C 600 250 750 450 700 800" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="12 6" />

          {/* Traffic Congestion Visual Overlay */}
          {showTrafficOverlay && (
            <>
              {/* Heavy Traffic Red Zone */}
              <circle cx="300" cy="210" r="45" fill="#ef4444" fillOpacity="0.15" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" className="animate-ping" />
              {/* Moderate Traffic Yellow Zone */}
              <circle cx="670" cy="320" r="55" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2" />
            </>
          )}
        </svg>

        {/* Live Vehicle Markers Overlay */}
        {(activeTab === 'all' || activeTab === 'transit') && vehicles.map((v, i) => {
          // Dynamic positions for demo grid canvas
          const coords = [
            { x: '25%', y: '38%' },
            { x: '45%', y: '28%' },
            { x: '62%', y: '42%' },
            { x: '35%', y: '65%' },
            { x: '78%', y: '30%' },
            { x: '52%', y: '72%' }
          ][i % 6];

          return (
            <div
              key={v.id}
              onClick={() => {
                setSelectedMarker({ type: 'vehicle', data: v });
                if (onSelectVehicle) onSelectVehicle(v);
              }}
              style={{ left: coords.x, top: coords.y }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 group/pin"
            >
              <div className="relative">
                <span className="absolute -inset-2 rounded-full bg-cyan-500/30 animate-ping" />
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-cyan-500/40 border-2 border-cyan-300 group-hover/pin:scale-125 transition-transform">
                  {v.type === 'Bus' ? <Bus className="w-5 h-5" /> : v.type === 'Metro' ? <Train className="w-5 h-5" /> : <Car className="w-5 h-5" />}
                </div>
                {/* Tooltip Tag */}
                <div className="absolute top-11 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/90 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-cyan-500/40 shadow-md">
                  {v.number} • {v.eta}
                </div>
              </div>
            </div>
          );
        })}

        {/* Parking Markers Overlay */}
        {(activeTab === 'all' || activeTab === 'parking') && parkingSpots.map((p, i) => {
          const coords = [
            { x: '30%', y: '50%' },
            { x: '70%', y: '25%' },
            { x: '40%', y: '80%' },
            { x: '82%', y: '60%' }
          ][i % 4];

          return (
            <div
              key={p.id}
              onClick={() => {
                setSelectedMarker({ type: 'parking', data: p });
                if (onSelectParking) onSelectParking(p);
              }}
              style={{ left: coords.x, top: coords.y }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 group/pin"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/40 border-2 border-indigo-300 group-hover/pin:scale-125 transition-transform">
                <ParkingSquare className="w-5 h-5" />
              </div>
              <div className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/90 text-indigo-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-indigo-500/40 shadow-md">
                {p.available}/{p.total} Free
              </div>
            </div>
          );
        })}

        {/* EV Station Markers Overlay */}
        {(activeTab === 'all' || activeTab === 'ev') && evStations.map((e, i) => {
          const coords = [
            { x: '20%', y: '22%' },
            { x: '58%', y: '20%' },
            { x: '18%', y: '75%' },
            { x: '75%', y: '78%' }
          ][i % 4];

          return (
            <div
              key={e.id}
              onClick={() => {
                setSelectedMarker({ type: 'ev', data: e });
                if (onSelectEv) onSelectEv(e);
              }}
              style={{ left: coords.x, top: coords.y }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 group/pin"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/40 border-2 border-emerald-300 group-hover/pin:scale-125 transition-transform">
                <Zap className="w-5 h-5" />
              </div>
              <div className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/90 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-500/40 shadow-md">
                {e.available} Plugs ({e.maxKw}kW)
              </div>
            </div>
          );
        })}

        {/* Incident Alerts Overlay */}
        {incidents.map((inc, i) => (
          <div
            key={inc.id}
            style={{ left: '48%', top: '35%' }}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30"
          >
            <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold border-2 border-amber-300 animate-bounce shadow-lg shadow-amber-500/50">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
        ))}

      </div>

      {/* Selected Marker Detail Card Popover */}
      {selectedMarker && (
        <div className="absolute bottom-4 right-4 z-40 w-80 bg-slate-900/95 backdrop-blur-md border border-slate-700 p-4 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              {selectedMarker.type} Detail
            </span>
            <button 
              onClick={() => setSelectedMarker(null)}
              className="text-slate-400 hover:text-white text-xs font-bold"
            >
              ✕
            </button>
          </div>

          {selectedMarker.type === 'vehicle' && (
            <div>
              <h4 className="text-sm font-bold text-white">{selectedMarker.data.number}</h4>
              <p className="text-xs text-slate-400">Destination: {selectedMarker.data.destination}</p>
              <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                <div className="bg-slate-800 p-2 rounded-xl">
                  <span className="text-[10px] text-slate-400 block">Speed</span>
                  <strong className="text-cyan-300">{selectedMarker.data.speed}</strong>
                </div>
                <div className="bg-slate-800 p-2 rounded-xl">
                  <span className="text-[10px] text-slate-400 block">Occupancy</span>
                  <strong className="text-emerald-400">{selectedMarker.data.occupancy}%</strong>
                </div>
              </div>
            </div>
          )}

          {selectedMarker.type === 'parking' && (
            <div>
              <h4 className="text-sm font-bold text-white">{selectedMarker.data.name}</h4>
              <p className="text-xs text-slate-400">{selectedMarker.data.address}</p>
              <div className="flex items-center justify-between mt-3 text-xs">
                <span className="text-emerald-400 font-bold">{selectedMarker.data.available} / {selectedMarker.data.total} Available</span>
                <span className="text-cyan-300 font-bold">₹{selectedMarker.data.hourlyRate}/hr</span>
              </div>
            </div>
          )}

          {selectedMarker.type === 'ev' && (
            <div>
              <h4 className="text-sm font-bold text-white">{selectedMarker.data.name}</h4>
              <p className="text-xs text-slate-400">Operator: {selectedMarker.data.operator}</p>
              <div className="flex items-center justify-between mt-3 text-xs">
                <span className="text-emerald-400 font-bold">{selectedMarker.data.available} Chargers Free</span>
                <span className="text-cyan-300 font-bold">₹{selectedMarker.data.ratePerKwh}/kWh</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Map Footer Info */}
      <div className="absolute bottom-2 left-4 z-20 text-[10px] text-slate-400 flex items-center gap-3 bg-slate-950/80 px-3 py-1 rounded-lg border border-slate-800">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /> Live Telemetry Feed</span>
        <span>CartoDB Dark Vector • 100ms sync</span>
      </div>

    </div>
  );
};
