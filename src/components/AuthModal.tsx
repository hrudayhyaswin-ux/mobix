import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { Shield, Key, Mail, User as UserIcon, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, user, setUserRole, addNotification } = useAuth();
  const [view, setView] = useState<'login' | 'register' | 'otp' | 'forgot'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>(user.role);
  const [email, setEmail] = useState('hruday@mobilix.io');
  const [otpCode, setOtpCode] = useState(['4', '8', '2', '9']);

  if (!isAuthModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUserRole(selectedRole);
    addNotification('Authentication Successful', `Welcome back to MOBILIX as ${selectedRole}.`, 'success');
    setIsAuthModalOpen(false);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setView('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setUserRole(selectedRole);
    addNotification('Account Verified', `Your MOBILIX profile is verified and active!`, 'success');
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 relative">
        
        <button 
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 text-slate-400 hover:text-white font-bold text-sm"
        >
          ✕
        </button>

        {/* Auth Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center mx-auto mb-3">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-extrabold text-white">
            {view === 'login' && 'Sign in to MOBILIX'}
            {view === 'register' && 'Create Your Account'}
            {view === 'otp' && 'OTP Security Verification'}
            {view === 'forgot' && 'Reset Password'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {view === 'login' && 'Access smart city transport, tickets & AI recommendations'}
            {view === 'register' && 'Join the futuristic unified urban mobility network'}
            {view === 'otp' && `Enter the 4-digit code sent to ${email}`}
            {view === 'forgot' && 'We will send a reset authorization link to your email'}
          </p>
        </div>

        {/* Role Selector Tabs */}
        {(view === 'login' || view === 'register') && (
          <div className="grid grid-cols-4 gap-1 p-1 bg-slate-950 rounded-2xl mb-6 border border-slate-800">
            {(['User', 'Driver', 'Operator', 'Admin'] as UserRole[]).map(r => (
              <button
                key={r}
                onClick={() => setSelectedRole(r)}
                className={`py-1.5 text-xs font-bold rounded-xl transition ${
                  selectedRole === r ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        )}

        {/* Form View: LOGIN */}
        {view === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-100 font-medium focus:border-cyan-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-300">Password</label>
                <button 
                  type="button" 
                  onClick={() => setView('forgot')}
                  className="text-xs text-cyan-400 hover:underline"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  type="password"
                  defaultValue="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-100 font-medium focus:border-cyan-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold text-sm hover:brightness-110 transition shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
            >
              <span>Sign In as {selectedRole}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center mt-4">
              <span className="text-xs text-slate-400">Don't have an account? </span>
              <button 
                type="button" 
                onClick={() => setView('register')} 
                className="text-xs font-bold text-cyan-400 hover:underline"
              >
                Register Now
              </button>
            </div>
          </form>
        )}

        {/* Form View: REGISTER */}
        {view === 'register' && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  type="text"
                  defaultValue="Hruday"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-100 font-medium focus:border-cyan-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-100 font-medium focus:border-cyan-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold text-sm hover:brightness-110 transition shadow-lg shadow-cyan-500/25"
            >
              Continue to OTP Verification
            </button>

            <div className="text-center mt-4">
              <span className="text-xs text-slate-400">Already registered? </span>
              <button 
                type="button" 
                onClick={() => setView('login')} 
                className="text-xs font-bold text-cyan-400 hover:underline"
              >
                Sign In
              </button>
            </div>
          </form>
        )}

        {/* Form View: OTP */}
        {view === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="flex justify-center gap-3">
              {otpCode.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={e => {
                    const next = [...otpCode];
                    next[idx] = e.target.value;
                    setOtpCode(next);
                  }}
                  className="w-12 h-14 bg-slate-950 border border-slate-700 rounded-2xl text-center text-xl font-bold text-cyan-400 focus:border-cyan-500 focus:outline-none"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-sm hover:brightness-110 transition shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Verify & Launch Dashboard</span>
            </button>
          </form>
        )}

        {/* Form View: FORGOT */}
        {view === 'forgot' && (
          <form onSubmit={(e) => { e.preventDefault(); addNotification('Reset Link Sent', 'Check your email inbox.', 'info'); setView('login'); }} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Your Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 font-medium focus:border-cyan-500 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-cyan-500 text-slate-950 font-extrabold text-sm"
            >
              Send Reset Link
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
