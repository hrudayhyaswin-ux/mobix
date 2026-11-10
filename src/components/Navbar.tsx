import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Search, Bell, Sparkles, AlertTriangle, Moon, Sun, Wallet, 
  Shield, UserCheck, ChevronDown, Bot, Menu, Activity 
} from 'lucide-react';
import { UserRole } from '../types';

export const Navbar: React.FC<{ onToggleSidebar?: () => void }> = ({ onToggleSidebar }) => {
  const { 
    user, setUserRole, theme, toggleTheme, walletBalance, 
    notifications, setIsGlobalSearchOpen, setIsAiAssistantOpen, 
    setIsEmergencyOpen, setIsAuthModalOpen, setActiveTab 
  } = useAuth();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const rolesList: { role: UserRole; label: string; icon: string }[] = [
    { role: 'User', label: 'Commuter Dashboard', icon: '👤' },
    { role: 'Driver', label: 'Driver Portal', icon: '🚖' },
    { role: 'Operator', label: 'Transit Operator', icon: '🚌' },
    { role: 'Admin', label: 'Smart City Command', icon: '🏢' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left Brand & Mobile Menu */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onToggleSidebar}
            className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div 
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-200">
              <Activity className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
                MOBILIX
              </span>
              <span className="hidden sm:inline-block text-[10px] font-semibold text-cyan-400 uppercase tracking-widest block -mt-1">
                Smart Mobility
              </span>
            </div>
          </div>
        </div>

        {/* Center Universal Search Trigger */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <button
            onClick={() => setIsGlobalSearchOpen(true)}
            className="w-full flex items-center justify-between px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 text-slate-400 hover:text-slate-200 transition group shadow-inner"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Where do you want to go?</span>
            </div>
            <kbd className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* AI Assistant Button */}
          <button
            onClick={() => setIsAiAssistantOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/40 text-indigo-300 hover:text-white hover:border-indigo-400 text-xs sm:text-sm font-medium transition shadow-sm"
          >
            <Bot className="w-4 h-4 text-indigo-400 animate-bounce" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>

          {/* Wallet Balance Badge */}
          <button
            onClick={() => setActiveTab('wallet')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 text-emerald-400 text-xs font-semibold transition"
          >
            <Wallet className="w-4 h-4" />
            <span>₹{walletBalance.toFixed(2)}</span>
          </button>

          {/* Demo Role Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 hover:border-cyan-400 text-xs font-medium transition"
            >
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-semibold">{user.role}</span>
              <ChevronDown className="w-3 h-3 text-cyan-400" />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  Switch Demo Role
                </div>
                {rolesList.map(r => (
                  <button
                    key={r.role}
                    onClick={() => {
                      setUserRole(r.role);
                      setShowRoleDropdown(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition ${
                      user.role === r.role ? 'bg-cyan-500/10 text-cyan-400 font-bold' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{r.icon}</span>
                      <span>{r.label}</span>
                    </span>
                    {user.role === r.role && <UserCheck className="w-3.5 h-3.5 text-cyan-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50 max-h-96 overflow-y-auto">
                <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-slate-200">Smart Notifications</span>
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full font-semibold">
                    {notifications.length} Live
                  </span>
                </div>
                <div className="divide-y divide-slate-800/60">
                  {notifications.map(n => (
                    <div key={n.id} className="p-3 hover:bg-slate-800/50 transition">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-cyan-300">{n.title}</span>
                        <span className="text-[10px] text-slate-500">{n.time}</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-snug">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Emergency Red SOS Button */}
          <button
            onClick={() => setIsEmergencyOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 text-white font-extrabold text-xs tracking-wider uppercase hover:scale-105 transition shadow-lg shadow-red-600/30 animate-pulse"
          >
            <AlertTriangle className="w-4 h-4 fill-white text-red-600" />
            <span>SOS</span>
          </button>

          {/* User Profile Avatar / Login */}
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-slate-800 transition"
          >
            <img 
              src={user.avatarUrl} 
              alt={user.name} 
              className="w-8 h-8 rounded-lg object-cover ring-2 ring-cyan-500/40"
            />
          </button>

        </div>

      </div>
    </header>
  );
};
