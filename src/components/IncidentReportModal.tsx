import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { AlertTriangle, Camera, MapPin, Send, CheckCircle2, ShieldAlert } from 'lucide-react';

export const IncidentReportModal: React.FC = () => {
  const { isIncidentModalOpen, setIsIncidentModalOpen, addNotification } = useAuth();
  const [type, setType] = useState<'Pothole' | 'Accident' | 'Violation' | 'Broken Signal' | 'Road Blockage' | 'Flooding'>('Pothole');
  const [location, setLocation] = useState('Cyber Towers Main Junction');
  const [description, setDescription] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>('https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=300&auto=format&fit=crop&q=80');
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  if (!isIncidentModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fallbackId = 'INC-' + Math.floor(1000 + Math.random() * 9000);
    try {
      const res = await fetch('/api/incidents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, location, description })
      });
      const data = await res.json();
      const incId = data.incident?.id || fallbackId;
      setSubmittedId(incId);
      addNotification('Incident Submitted', `Ticket #${incId} logged for municipal verification.`, 'warning');
    } catch (err) {
      setSubmittedId(fallbackId);
      addNotification('Incident Submitted', `Ticket #${fallbackId} logged for municipal verification.`, 'warning');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 relative">
        
        <button 
          onClick={() => { setIsIncidentModalOpen(false); setSubmittedId(null); }}
          className="absolute top-5 right-5 text-slate-400 hover:text-white font-bold text-sm"
        >
          ✕
        </button>

        {!submittedId ? (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white">Report Road Incident</h3>
                <p className="text-xs text-slate-400">Alert Smart City Command to potholes, hazards, or broken signals</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Category */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Incident Type</label>
                <select
                  value={type}
                  onChange={(e: any) => setType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-100 focus:border-amber-500 focus:outline-none"
                >
                  <option value="Pothole">🚧 Severe Pothole / Road Damage</option>
                  <option value="Accident">💥 Traffic Accident</option>
                  <option value="Violation">🚨 Traffic Violation</option>
                  <option value="Broken Signal">🚦 Broken Traffic Signal</option>
                  <option value="Road Blockage">⛔ Construction / Debris Blockage</option>
                  <option value="Flooding">🌊 Water Logging / Flooding</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">GPS Location</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-amber-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs font-medium text-slate-100 focus:border-amber-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Details & Description</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Describe the issue, lane obstruction, or hazard level..."
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                  required
                />
              </div>

              {/* Photo Upload Mock Preview */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Attach Photo Evidence</label>
                {photoPreview ? (
                  <div className="relative rounded-2xl overflow-hidden h-32 border border-slate-800">
                    <img src={photoPreview} alt="Incident" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setPhotoPreview(null)}
                      className="absolute top-2 right-2 bg-slate-950/80 text-white text-[10px] font-bold px-2 py-1 rounded-lg"
                    >
                      Remove Photo
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-24 rounded-2xl border-2 border-dashed border-slate-800 bg-slate-950 hover:border-amber-500/50 cursor-pointer transition">
                    <Camera className="w-6 h-6 text-slate-500 mb-1" />
                    <span className="text-[11px] text-slate-400 font-medium">Click to upload photo evidence</span>
                    <input type="file" className="hidden" onChange={() => setPhotoPreview('https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=300&auto=format&fit=crop&q=80')} />
                  </label>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-extrabold text-sm hover:brightness-110 transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Incident Report</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold text-white">Report Logged</h3>
            <p className="text-xs text-slate-400 mt-1">Incident ID: <strong className="text-cyan-400">{submittedId}</strong></p>
            
            {/* Pipeline Tracker */}
            <div className="my-6 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-3">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Live Verification Pipeline</div>
              <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">Reported ✓</div>
                <div className="p-2 rounded-xl bg-slate-800 text-slate-400">Verified</div>
                <div className="p-2 rounded-xl bg-slate-800 text-slate-400">Assigned</div>
                <div className="p-2 rounded-xl bg-slate-800 text-slate-400">Resolved</div>
              </div>
            </div>

            <button
              onClick={() => { setIsIncidentModalOpen(false); setSubmittedId(null); }}
              className="w-full py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
