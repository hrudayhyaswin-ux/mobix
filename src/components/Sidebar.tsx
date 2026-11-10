import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, Navigation, Radio, Car, Bus, ParkingSquare, 
  Zap, Wrench, AlertTriangle, ShieldAlert, Fuel, Calculator, 
  Leaf, Wallet, Ticket as TicketIcon, History, Bookmark, 
  Building2, Users, SlidersHorizontal, Layers, LogOut, Crosshair
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { activeTab, setActiveTab, user, setIsIncidentModalOpen } = useAuth();

  const mainNav = [
    { id: 'user_dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'journey_planner', label: 'Journey Planner', icon: Navigation },
    { id: 'live_tracking', label: 'Live Transport', icon: Radio },
    { id: 'ride_booking', label: 'Ride Booking', icon: Car },
    { id: 'carpool', label: 'Carpool Share', icon: Users },
    { id: 'public_transport', label: 'Public Transport', icon: Bus },
    { id: 'parking', label: 'Smart Parking', icon: ParkingSquare },
    { id: 'ev_charging', label: 'EV Mobility', icon: Zap },
  ];

  const servicesNav = [
    { id: 'vehicles', label: 'My Vehicles', icon: Wrench },
    { id: 'traffic', label: 'Traffic Intelligence', icon: SlidersHorizontal },
    { id: 'emergency', label: 'Emergency Center', icon: ShieldAlert },
    { id: 'fuel', label: 'Fuel Station Finder', icon: Fuel },
    { id: 'carbon', label: 'Carbon Footprint', icon: Leaf },
    { id: 'wallet', label: 'Mobility Wallet', icon: Wallet },
    { id: 'tickets', label: 'Digital Tickets', icon: TicketIcon },
    { id: 'history', label: 'Trip History', icon: History },
    { id: 'favorites', label: 'Favorites', icon: Bookmark },
  ];

  const adminNav = [
    { id: 'admin_dashboard', label: 'Smart City Command', icon: Building2, roleBadge: 'Admin' },
    { id: 'operator_dashboard', label: 'Fleet Operations', icon: Layers, roleBadge: 'Operator' },
    { id: 'driver_dashboard', label: 'Driver Portal', icon: Car, roleBadge: 'Driver' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="lg:hidden fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      {/* Sidebar Drawer */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900/95 border-r border-slate-800/80 
        flex flex-col pt-16 lg:pt-0 transition-transform duration-300 ease-in-out
        lg:static lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        {/* User Card Header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center gap-3">
          <img 
            src={user.avatarUrl} 
            alt={user.name} 
            className="w-10 h-10 rounded-xl object-cover ring-2 ring-cyan-500/50"
          />
          <div className="overflow-hidden">
            <h4 className="text-sm font-bold text-slate-100 truncate">{user.name}</h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 uppercase">
                {user.role}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">
                Score: <strong className="text-emerald-400">{user.mobilityScore}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 custom-scrollbar">
          
          {/* Main Commuter Nav */}
          <div>
            <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Commuter Hub
            </div>
            <nav className="space-y-1">
              {mainNav.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                      isActive 
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Services & Utilities */}
          <div>
            <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Services & Mobility
            </div>
            <nav className="space-y-1">
              {servicesNav.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                      isActive 
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Admin & Command Center Portals */}
          <div>
            <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Command & Portals
            </div>
            <nav className="space-y-1">
              {adminNav.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                      isActive 
                        ? 'bg-gradient-to-r from-purple-500/20 to-indigo-500/10 text-purple-300 border border-purple-500/30 shadow-sm' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-900/50 text-purple-300 border border-purple-500/30 font-bold uppercase">
                      {item.roleBadge}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Incident Reporting Trigger Card */}
          <div className="p-3 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 text-center">
            <AlertTriangle className="w-6 h-6 text-amber-400 mx-auto mb-1 animate-bounce" />
            <h5 className="text-xs font-bold text-slate-200">Spot a Traffic Issue?</h5>
            <p className="text-[10px] text-slate-400 mb-2">Report potholes, accidents, or broken signals instantly.</p>
            <button
              onClick={() => setIsIncidentModalOpen(true)}
              className="w-full py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 text-xs font-bold transition"
            >
              Report Incident
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800/80 text-center">
          <div className="text-[10px] text-slate-400">MOBILIX OS v2.4 • Smart City</div>
        </div>

      </aside>
    </>
  );
};
