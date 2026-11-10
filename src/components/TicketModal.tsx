import React from 'react';
import { Ticket } from '../types';
import { QrCode, Download, Share2, CheckCircle2, Ticket as TicketIcon } from 'lucide-react';

interface TicketModalProps {
  ticket: Ticket | null;
  onClose: () => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({ ticket, onClose }) => {
  if (!ticket) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden relative">
        
        {/* Ticket Top Banner */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-6 text-slate-950 text-center relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-900 hover:text-white font-bold text-sm"
          >
            ✕
          </button>
          <TicketIcon className="w-8 h-8 mx-auto mb-2 opacity-90" />
          <h3 className="text-xl font-extrabold uppercase tracking-wide">MOBILIX DIGITAL PASS</h3>
          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-slate-950 text-cyan-400 uppercase mt-1 inline-block">
            {ticket.bookingType}
          </span>
        </div>

        {/* Ticket Content Body */}
        <div className="p-6 space-y-4">
          
          {/* Simulated Scannable QR Code */}
          <div className="w-44 h-44 bg-white p-3 rounded-2xl mx-auto flex flex-col items-center justify-center border-4 border-cyan-500 shadow-inner">
            <div className="grid grid-cols-6 gap-1 w-full h-full opacity-90">
              {Array.from({ length: 36 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`rounded-xs ${ (i * 7) % 3 === 0 || i % 5 === 0 ? 'bg-slate-950' : 'bg-transparent' }`} 
                />
              ))}
            </div>
          </div>
          <p className="text-[10px] text-center font-mono text-cyan-400 font-bold tracking-widest">{ticket.ticketCode}</p>

          {/* Details List */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Route / Slot:</span>
              <strong className="text-slate-100">{ticket.origin} → {ticket.destination}</strong>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Fare Paid:</span>
              <strong className="text-emerald-400 font-bold">₹{ticket.amount.toFixed(2)}</strong>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Issued Date:</span>
              <strong className="text-slate-200">{ticket.date}</strong>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Status:</span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {ticket.status}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => alert(`Downloading ticket PDF for ${ticket.ticketCode}...`)}
              className="py-2.5 rounded-xl bg-slate-800 text-slate-200 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Save Ticket</span>
            </button>
            <button
              onClick={() => alert(`Share ticket link copied to clipboard!`)}
              className="py-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-cyan-500/30 transition"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Pass</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
