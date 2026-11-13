import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Car, Bike, ShieldCheck, Star, MapPin, CheckCircle2, User, PhoneCall, Key, ArrowRight } from 'lucide-react';

export const RideBookingPage: React.FC = () => {
  const { walletBalance, deductWalletMoney, addTicket, addNotification, setActiveTab } = useAuth();
  
  const [pickup, setPickup] = useState('Cyber Towers Main Gate');
  const [drop, setDrop] = useState('Inorbit Mall Entrance');
  const [step, setStep] = useState<'select' | 'confirm' | 'tracking' | 'done'>('select');
  const [selectedCategory, setSelectedCategory] = useState<string>('ev');
  const [ridePin] = useState('4921');

  const rideOptions = [
    { id: 'ev', name: 'Mobilix EV Cab', desc: 'Tesla Model 3 • Zero Emissions', price: 190, eta: '4 min', icon: Car, driver: 'Rajesh Sharma', rating: 4.9, plate: 'TS 09 EV 4421' },
    { id: 'auto', name: 'Mobilix E-Auto', desc: 'Electric Auto Rickshaw', price: 65, eta: '2 min', icon: Bike, driver: 'Vikram Singh', rating: 4.8, plate: 'TS 07 EA 1204' },
    { id: 'economy', name: 'Economy Sedan', desc: 'Comfortable AC Ride', price: 140, eta: '5 min', icon: Car, driver: 'Suresh Kumar', rating: 4.7, plate: 'TS 10 UB 9901' },
    { id: 'xl', name: 'Mobilix XL SUV', desc: '6 Seater Spacious SUV', price: 280, eta: '7 min', icon: Car, driver: 'David Miller', rating: 4.9, plate: 'TS 08 XL 5500' }
  ];

  const currentOption = rideOptions.find(r => r.id === selectedCategory) || rideOptions[0];

  const handleConfirmBooking = () => {
    const ok = deductWalletMoney(currentOption.price);
    if (ok) {
      const code = 'MBLX-RIDE-' + Math.floor(10000 + Math.random() * 90000);
      addTicket({
        id: 'TCK-' + Date.now(),
        bookingType: currentOption.name,
        ticketCode: code,
        qrData: `RIDE-PASS-${code}-PIN-${ridePin}`,
        origin: pickup,
        destination: drop,
        amount: currentOption.price,
        date: 'Today',
        status: 'Active'
      });
      setStep('tracking');
      addNotification('Ride Confirmed', `Driver ${currentOption.driver} is arriving in ${currentOption.eta}. Safety PIN: ${ridePin}`, 'success');
    }
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
          <Car className="w-3.5 h-3.5" /> Zero-Emission Fleet Network
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">Ride Booking</h1>
        <p className="text-xs text-slate-400 mt-1">
          Book instant EV cabs, e-autos, or premium rentals with verified driver PIN safety tracking.
        </p>

        {/* Pickup Drop Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Pickup Location</label>
            <input
              type="text"
              value={pickup}
              onChange={e => setPickup(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white font-medium focus:border-cyan-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Dropoff Destination</label>
            <input
              type="text"
              value={drop}
              onChange={e => setDrop(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white font-medium focus:border-cyan-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* STEP 1: SELECT RIDE CATEGORY */}
      {step === 'select' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rideOptions.map(r => {
            const Icon = r.icon;
            const isSel = selectedCategory === r.id;
            return (
              <div
                key={r.id}
                onClick={() => setSelectedCategory(r.id)}
                className={`p-6 rounded-3xl border cursor-pointer transition ${
                  isSel ? 'bg-slate-900 border-cyan-500 shadow-xl shadow-cyan-500/10' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">{r.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{r.desc}</p>

                <div className="flex items-center justify-between mt-4 text-xs font-bold">
                  <span className="text-emerald-400 text-lg">₹{r.price}</span>
                  <span className="text-cyan-300 font-semibold">{r.eta} away</span>
                </div>

                <button
                  onClick={() => setStep('confirm')}
                  className="w-full mt-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-extrabold text-xs hover:bg-cyan-400 transition"
                >
                  Choose {r.name}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* STEP 2: CONFIRM RIDE & PAY */}
      {step === 'confirm' && (
        <div className="max-w-xl mx-auto p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white">Confirm Booking & Payment</h2>
          
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between"><span className="text-slate-400">Selected Vehicle:</span> <strong className="text-white">{currentOption.name}</strong></div>
            <div className="flex justify-between"><span className="text-slate-400">Estimated Fare:</span> <strong className="text-emerald-400 font-bold">₹{currentOption.price}.00</strong></div>
            <div className="flex justify-between"><span className="text-slate-400">Payment Method:</span> <strong className="text-cyan-300">MOBILIX Wallet (Bal: ₹{walletBalance.toFixed(2)})</strong></div>
            <div className="flex justify-between"><span className="text-slate-400">Driver Assigned:</span> <strong className="text-white">{currentOption.driver} ({currentOption.rating} ★)</strong></div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep('select')}
              className="w-1/3 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
            >
              Back
            </button>
            <button
              onClick={handleConfirmBooking}
              className="w-2/3 py-3 rounded-xl bg-cyan-500 text-slate-950 font-extrabold text-xs hover:bg-cyan-400 transition shadow-lg shadow-cyan-500/20"
            >
              Confirm & Pay ₹{currentOption.price}
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: LIVE DRIVER TRACKING & SAFETY PIN */}
      {step === 'tracking' && (
        <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500 flex items-center justify-center mx-auto animate-pulse">
            <Car className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white">Driver Arriving in 3 Mins</h2>
          
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">{currentOption.driver}</h4>
                <p className="text-xs text-slate-400">{currentOption.desc} • {currentOption.plate}</p>
              </div>
              <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
                <Star className="w-4 h-4 fill-amber-400" /> {currentOption.rating}
              </div>
            </div>

            {/* SAFETY START PIN CARD */}
            <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                <Key className="w-4 h-4 text-cyan-400" /> Safety Start PIN:
              </span>
              <strong className="text-xl font-mono text-white tracking-widest bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                {ridePin}
              </strong>
            </div>
          </div>

          <button
            onClick={() => setStep('done')}
            className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs hover:bg-emerald-400 transition"
          >
            Complete Ride Demo
          </button>
        </div>
      )}

      {/* STEP 4: TRIP COMPLETED */}
      {step === 'done' && (
        <div className="max-w-md mx-auto p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500 flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white">Trip Completed!</h2>
          <p className="text-xs text-slate-400">You saved 2.1 kg of CO₂ by choosing an Electric Cab!</p>

          <button
            onClick={() => { setStep('select'); setActiveTab('user_dashboard'); }}
            className="w-full py-3 rounded-xl bg-slate-800 text-white font-bold text-xs"
          >
            Return to Dashboard
          </button>
        </div>
      )}

    </div>
  );
};
