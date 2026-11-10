import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Ticket as TicketIcon, QrCode, Download, Share2 } from 'lucide-react';
import { TicketModal } from '../components/TicketModal';
import { Ticket } from '../types';

export const DigitalTicketsPage: React.FC = () => {
  const { tickets } = useAuth();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
          <TicketIcon className="w-3.5 h-3.5" /> Scannable QR Boarding Passes
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">Digital Tickets & Passes</h1>
        <p className="text-xs text-slate-400 mt-1">
          Access all active metro QR tokens, bus tickets, parking reservations, and EV charger passes.
        </p>
      </div>

      {/* Tickets List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tickets.map(t => (
          <div key={t.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 hover:border-cyan-500/40 transition shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
                {t.bookingType}
              </span>
              <span className="text-xs font-bold text-emerald-400">₹{t.amount}</span>
            </div>

            <h3 className="text-base font-bold text-white">{t.origin} → {t.destination}</h3>
            <p className="text-xs text-slate-400 font-mono">Code: {t.ticketCode}</p>

            <button
              onClick={() => setSelectedTicket(t)}
              className="w-full py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-extrabold text-xs hover:bg-cyan-400 transition flex items-center justify-center gap-1.5"
            >
              <QrCode className="w-4 h-4" />
              <span>Show QR Code Pass</span>
            </button>
          </div>
        ))}
      </div>

      <TicketModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />

    </div>
  );
};
