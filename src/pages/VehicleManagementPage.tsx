import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MOCK_VEHICLES } from '../data/mockData';
import { Vehicle } from '../types';
import { Wrench, ShieldAlert, Battery, Calendar, AlertTriangle, Plus, FileText, CheckCircle2 } from 'lucide-react';

export const VehicleManagementPage: React.FC = () => {
  const { addNotification } = useAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>(MOCK_VEHICLES);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800">
        <div>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
            <Wrench className="w-3.5 h-3.5" /> Garage & Maintenance Vault
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-1">My Vehicles</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage personal cars, bikes, scooters & EVs. Monitor insurance, PUC, and service reminders.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Vehicle
        </button>
      </div>

      {/* Reminder Cards Alert Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3 text-amber-300">
          <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 animate-bounce" />
          <div className="text-xs">
            <strong className="block font-bold">Insurance Expiration Warning</strong>
            <span>Insurance for <strong>TS 09 EV 4421 (Tesla Model 3)</strong> expires in 24 days. Renewal discount available.</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center gap-3 text-cyan-300">
          <Wrench className="w-6 h-6 text-cyan-400 flex-shrink-0" />
          <div className="text-xs">
            <strong className="block font-bold">Scheduled Maintenance Alert</strong>
            <span>Service due in <strong>850 km</strong> for Tesla Model 3 EV. Book authorized service slot.</span>
          </div>
        </div>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vehicles.map(v => (
          <div key={v.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 hover:border-cyan-500/40 transition shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">{v.make} {v.model}</h3>
                <span className="text-xs font-mono text-cyan-400 font-bold">{v.licensePlate}</span>
              </div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
                {v.type}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div>
                <span className="text-slate-400 block">EV Battery Health</span>
                <strong className="text-emerald-400 font-bold">{v.batteryHealth || 100}% Optimal</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Insurance Status</span>
                <strong className="text-amber-400 font-bold">{v.insuranceExpiryDays} Days Left</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Next Service Due</span>
                <strong className="text-cyan-300 font-bold">In {v.nextServiceKm} km</strong>
              </div>
              <div>
                <span className="text-slate-400 block">PUC Certificate</span>
                <strong className="text-emerald-400 font-bold">Verified ✓</strong>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => addNotification('Document Vault', `Displaying digital RC & Insurance for ${v.licensePlate}.`, 'info')}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-200 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Document Vault</span>
              </button>
              <button
                onClick={() => addNotification('Service Booked', `Appointment scheduled for ${v.make} ${v.model}.`, 'success')}
                className="py-2.5 px-4 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400"
              >
                Book Service
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
