import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Bookmark, Home, GraduationCap, Briefcase, Navigation, ArrowRight } from 'lucide-react';

export const FavoritesPage: React.FC = () => {
  const { setActiveTab } = useAuth();

  const favorites = [
    { title: 'Home', address: 'Madhapur Sector 2', icon: Home },
    { title: 'College / University', address: 'JNTU Campus Hub', icon: GraduationCap },
    { title: 'Office Tech Park', address: 'Mindspace Cyber City Gate 4', icon: Briefcase }
  ];

  return (
    <div className="space-y-8 pb-16">
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
          <Bookmark className="w-3.5 h-3.5" /> Bookmarked Locations & Routes
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">Favorite Places & Shortcuts</h1>
        <p className="text-xs text-slate-400 mt-1">One-click journey planner triggers for daily commute destinations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {favorites.map((f, i) => {
          const Icon = f.icon;
          return (
            <div key={i} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 hover:border-cyan-500/40 transition shadow-xl">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">{f.title}</h3>
              <p className="text-xs text-slate-400">{f.address}</p>

              <button
                onClick={() => setActiveTab('journey_planner')}
                className="w-full py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition flex items-center justify-center gap-1.5"
              >
                <span>Quick Plan Journey</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
