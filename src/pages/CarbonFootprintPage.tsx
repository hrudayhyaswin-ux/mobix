import React from 'react';
import { Leaf, Sparkles, TrendingUp, CheckCircle2 } from 'lucide-react';
import { MOCK_CARBON_HISTORY } from '../data/mockData';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const CarbonFootprintPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800">
        <span className="text-xs font-bold text-teal-400 uppercase tracking-widest flex items-center gap-1.5">
          <Leaf className="w-3.5 h-3.5" /> Environmental Sustainability Analytics
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">Carbon Footprint Dashboard</h1>
        <p className="text-xs text-slate-400 mt-1">
          Track your monthly transportation emissions offset, CO₂ saved per passenger km, and environmental impact.
        </p>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Monthly CO₂ Emitted</span>
          <div className="text-3xl font-black text-slate-200">72.4 kg</div>
          <span className="text-[10px] text-slate-500">Public Transit & EV Cabs</span>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-teal-400 uppercase">Monthly CO₂ Saved</span>
          <div className="text-3xl font-black text-teal-300">31.8 kg</div>
          <span className="text-[10px] text-teal-400">Saved vs. Solo Gasoline Cars</span>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-950/60 to-emerald-950/60 border border-teal-500/40 space-y-2">
          <span className="text-xs font-bold text-emerald-400 uppercase">Trees Equivalent</span>
          <div className="text-3xl font-black text-emerald-400">4.2 Trees</div>
          <span className="text-[10px] text-emerald-300">Absorbed carbon equivalent</span>
        </div>
      </div>

      {/* Chart Box */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white">Monthly Emissions & Savings Trend (kg CO₂)</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MOCK_CARBON_HISTORY}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
              <Bar dataKey="emitted" fill="#38bdf8" name="CO₂ Emitted (kg)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="saved" fill="#34d399" name="CO₂ Saved (kg)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Smart Recommendations */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-teal-400" />
          <h3 className="text-base font-bold text-white">AI Green Travel Recommendation</h3>
        </div>
        <p className="text-xs text-slate-300 bg-slate-950 p-4 rounded-2xl border border-slate-800 leading-relaxed">
          💡 Switching two weekly car trips to metro could reduce approximately 12 kg CO₂/month and save ₹580 in fuel costs.
        </p>
      </div>

    </div>
  );
};
