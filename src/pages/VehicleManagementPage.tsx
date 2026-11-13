import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MOCK_VEHICLES } from '../data/mockData';
import { Vehicle } from '../types';
import { Wrench, ShieldAlert, Battery, Calendar, AlertTriangle, Plus, FileText, CheckCircle2 } from 'lucide-react';

export const VehicleManagementPage: React.FC = () => {
  const { addNotification } = useAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>(MOCK_VEHICLES);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    make: '',
    model: '',
    licensePlate: '',
    type: 'ev_car' as Vehicle['type'],
    batteryHealth: 95,
    insuranceExpiryDays: 365,
    nextServiceKm: 5000
  });

  const handleAddVehicleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVehicle.make || !newVehicle.model || !newVehicle.licensePlate) return;

    const created: Vehicle = {
      id: 'v-' + Date.now(),
      make: newVehicle.make,
      model: newVehicle.model,
      licensePlate: newVehicle.licensePlate.toUpperCase(),
      type: newVehicle.type,
      batteryHealth: newVehicle.batteryHealth,
      insuranceExpiryDays: newVehicle.insuranceExpiryDays,
      nextServiceKm: newVehicle.nextServiceKm
    };

    setVehicles(prev => [created, ...prev]);
    setShowAddModal(false);
    addNotification('Vehicle Registered', `${created.make} ${created.model} added to your garage vault.`, 'success');

    try {
      await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          make: created.make,
          model: created.model,
          licensePlate: created.licensePlate,
          type: created.type,
          batteryHealth: created.batteryHealth,
          insuranceDays: created.insuranceExpiryDays,
          serviceKm: created.nextServiceKm
        })
      });
    } catch (err) {
      // client-side state already updated
    }

    setNewVehicle({
      make: '',
      model: '',
      licensePlate: '',
      type: 'ev_car',
      batteryHealth: 95,
      insuranceExpiryDays: 365,
      nextServiceKm: 5000
    });
  };

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

      {/* Add Vehicle Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl relative">
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white font-bold text-sm"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-2">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Add New Vehicle</h3>
                <p className="text-xs text-slate-400">Register vehicle in your digital garage vault</p>
              </div>
            </div>

            <form onSubmit={handleAddVehicleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Make / Brand</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tata, Tesla"
                    value={newVehicle.make}
                    onChange={e => setNewVehicle({ ...newVehicle, make: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Model Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nexon EV, Model 3"
                    value={newVehicle.model}
                    onChange={e => setNewVehicle({ ...newVehicle, model: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">License Plate</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TS 09 AB 1234"
                  value={newVehicle.licensePlate}
                  onChange={e => setNewVehicle({ ...newVehicle, licensePlate: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-cyan-400 uppercase focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Vehicle Type</label>
                  <select
                    value={newVehicle.type}
                    onChange={e => setNewVehicle({ ...newVehicle, type: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="ev_car">EV Car</option>
                    <option value="ev_scooter">EV Scooter</option>
                    <option value="car">Gasoline Car</option>
                    <option value="bike">Motorcycle</option>
                    <option value="scooter">Scooter</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Battery Health (%)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={newVehicle.batteryHealth}
                    onChange={e => setNewVehicle({ ...newVehicle, batteryHealth: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-emerald-400 font-bold focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Insurance Validity (Days)</label>
                  <input
                    type="number"
                    min="1"
                    value={newVehicle.insuranceExpiryDays}
                    onChange={e => setNewVehicle({ ...newVehicle, insuranceExpiryDays: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Service Due (Km)</label>
                  <input
                    type="number"
                    min="100"
                    step="100"
                    value={newVehicle.nextServiceKm}
                    onChange={e => setNewVehicle({ ...newVehicle, nextServiceKm: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition"
              >
                Register & Save Vehicle
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
