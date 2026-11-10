export type UserRole = 'User' | 'Driver' | 'Operator' | 'Admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  mobilityScore: number;
  walletBalance: number;
}

export interface JourneyOption {
  id: string;
  mode: string;
  badge?: string;
  icon: string;
  timeMins: number;
  costINR: number;
  distanceKm: number;
  co2Kg: number;
  co2SavedKg: number;
  crowd: string;
  route: string[];
  whyText: string;
}

export interface LiveVehicle {
  id: string;
  type: 'Bus' | 'Metro' | 'Train' | 'Ride' | 'EV';
  number: string;
  lat: number;
  lng: number;
  speed: string;
  eta: string;
  occupancy: number;
  status: string;
  destination: string;
}

export interface ParkingSpot {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  available: number;
  total: number;
  hourlyRate: number;
  distance: string;
  securityRating: number;
}

export interface EvStation {
  id: string;
  name: string;
  operator: string;
  lat: number;
  lng: number;
  available: number;
  total: number;
  maxKw: number;
  ratePerKwh: number;
  connectors: string[];
}

export interface Incident {
  id: string;
  type: 'Pothole' | 'Accident' | 'Violation' | 'Broken Signal' | 'Road Blockage' | 'Flooding';
  location: string;
  description: string;
  photoUrl?: string;
  status: 'Reported' | 'Verified' | 'Assigned' | 'Resolved';
  createdAt: string;
}

export interface Vehicle {
  id: string;
  licensePlate: string;
  make: string;
  model: string;
  type: 'car' | 'bike' | 'scooter' | 'ev_car' | 'ev_scooter';
  batteryHealth?: number;
  insuranceExpiryDays: number;
  nextServiceKm: number;
  fuelEfficiencyKmpl?: number;
}

export interface Ticket {
  id: string;
  bookingType: string;
  ticketCode: string;
  qrData: string;
  origin: string;
  destination: string;
  amount: number;
  date: string;
  status: 'Active' | 'Used' | 'Expired';
}

export interface WalletTransaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  type: 'debit' | 'credit';
  date: string;
}
