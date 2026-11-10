import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft, ShieldCheck, CreditCard } from 'lucide-react';

export const WalletPage: React.FC = () => {
  const { walletBalance, addWalletMoney, transactions } = useAuth();
  const [amount, setAmount] = useState<number>(500);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
          <Wallet className="w-3.5 h-3.5" /> Mobility Financial Gateway
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">Mobility Wallet</h1>
        <p className="text-xs text-slate-400 mt-1">
          Seamless single-tap payments for Metro tokens, bus tickets, smart parking slots, EV charging & cabs.
        </p>
      </div>

      {/* Wallet Balance Card */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 border border-emerald-500/40 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Active Wallet Balance</span>
          <div className="text-4xl sm:text-5xl font-black text-white mt-1">
            ₹{walletBalance.toFixed(2)}
          </div>
          <span className="text-xs text-slate-400 mt-2 block">Auto-Debit Active • Linked to UPI / Cards</span>
        </div>

        {/* Quick Add Money Box */}
        <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-2xl border border-slate-800">
          {[200, 500, 1000].map(amt => (
            <button
              key={amt}
              onClick={() => addWalletMoney(amt)}
              className="px-4 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 font-bold text-xs transition"
            >
              + ₹{amt}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions History Table */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white">Recent Transactions</h3>
        <div className="divide-y divide-slate-800/80">
          {transactions.map(t => (
            <div key={t.id} className="py-3.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${t.type === 'credit' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-300'}`}>
                  {t.type === 'credit' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                </div>
                <div>
                  <h4 className="font-bold text-white">{t.title}</h4>
                  <span className="text-[10px] text-slate-400">{t.category} • {t.date}</span>
                </div>
              </div>

              <span className={`font-mono font-bold text-sm ${t.type === 'credit' ? 'text-emerald-400' : 'text-slate-200'}`}>
                {t.type === 'credit' ? '+' : '-'}₹{t.amount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
