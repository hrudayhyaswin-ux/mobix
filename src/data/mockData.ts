import { JourneyOption, LiveVehicle, ParkingSpot, EvStation, Incident, Vehicle, Ticket, WalletTransaction } from '../types';

export const INITIAL_USER = {
  id: 'usr-1',
  name: 'Hruday',
  email: 'hruday@mobilix.io',
  role: 'User' as const,
  mobilityScore: 87,
  walletBalance: 1240.50,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
};

export const MOCK_JOURNEYS: JourneyOption[] = [
  {
    id: 'opt-metro',
    mode: 'Metro + Walking',
    badge: 'Smart Recommended',
    icon: 'Subway',
    timeMins: 32,
    costINR: 35,
    distanceKm: 14.2,
    co2Kg: 4.2,
    co2SavedKg: 3.8,
    crowd: 'Moderate (65%)',
    route: ['Walk 3m to HITEC Metro', 'Board Blue Line Train', 'Disembark at Raidurg', 'Walk 4m to destination'],
    whyText: 'Metro + Walking is recommended because it saves 18 minutes, ₹145 and approximately 3.8 kg CO₂ compared with taking a cab.'
  },
  {
    id: 'opt-bus',
    mode: 'Electric City Bus',
    badge: 'Cheapest',
    icon: 'Bus',
    timeMins: 45,
    costINR: 25,
    distanceKm: 15.0,
    co2Kg: 3.1,
    co2SavedKg: 4.9,
    crowd: 'High (80%)',
    route: ['Board Bus #216 at Mindspace', '12 stops via Cyber Towers', 'Disembark at Jubilee Hills Checkpost'],
    whyText: 'Bus is the most economical mode and produces the lowest net carbon per passenger.'
  },
  {
    id: 'opt-ev-cab',
    mode: 'Mobilix EV Cab',
    badge: 'Fastest Direct',
    icon: 'Car',
    timeMins: 24,
    costINR: 190,
    distanceKm: 13.8,
    co2Kg: 2.1,
    co2SavedKg: 5.9,
    crowd: 'Private AC',
    route: ['Door pickup by Tesla Model 3 EV', 'Direct via Durgam Cheruvu Cable Bridge'],
    whyText: 'Direct zero-emission electric cab avoiding main junction congestion.'
  },
  {
    id: 'opt-carpool',
    mode: 'Mobilix Carpool',
    badge: 'Eco-Share',
    icon: 'Users',
    timeMins: 30,
    costINR: 65,
    distanceKm: 14.0,
    co2Kg: 3.0,
    co2SavedKg: 4.8,
    crowd: '2 Seats Free',
    route: ['Meet Driver Alex at Cyber Towers', 'Shared ride with 2 commuters'],
    whyText: 'Split trip costs by 70% while reducing city traffic congestion.'
  },
  {
    id: 'opt-standard-cab',
    mode: 'Standard Auto / Taxi',
    badge: 'Available Now',
    icon: 'CarTaxiFront',
    timeMins: 28,
    costINR: 220,
    distanceKm: 14.5,
    co2Kg: 7.8,
    co2SavedKg: 0,
    crowd: 'Private',
    route: ['Door-to-door standard gas cab'],
    whyText: 'Standard direct cab route without shared pooling.'
  }
];

export const MOCK_LIVE_VEHICLES: LiveVehicle[] = [
  { id: 'BUS-216', type: 'Bus', number: 'TSRTC BUS 216', lat: 17.4435, lng: 78.3772, speed: '38 km/h', eta: '8 min', occupancy: 72, status: 'On Time', destination: 'Secunderabad Station' },
  { id: 'BUS-47V', type: 'Bus', number: 'EV BUS 47V', lat: 17.4489, lng: 78.3810, speed: '42 km/h', eta: '3 min', occupancy: 45, status: 'On Time', destination: 'Kondapur Bus Depot' },
  { id: 'METRO-BLUE-04', type: 'Metro', number: 'BLUE LINE TRAIN 04', lat: 17.4410, lng: 78.3850, speed: '65 km/h', eta: '2 min', occupancy: 58, status: 'On Time', destination: 'Nagole Terminal' },
  { id: 'EV-CAB-99', type: 'EV', number: 'MOBILIX EV CAB #99', lat: 17.4370, lng: 78.3720, speed: '48 km/h', eta: '5 min', occupancy: 25, status: 'Active Ride', destination: 'RGIA Airport Express' },
  { id: 'TRAIN-MMTS-12', type: 'Train', number: 'MMTS LOCAL 47102', lat: 17.4520, lng: 78.3900, speed: '55 km/h', eta: '12 min', occupancy: 82, status: '5 min Delay', destination: 'Lingampally' },
  { id: 'AUTO-EV-07', type: 'Ride', number: 'MOBILIX E-AUTO #07', lat: 17.4390, lng: 78.3740, speed: '28 km/h', eta: '4 min', occupancy: 33, status: 'Available', destination: 'HiTech City' }
];

export const MOCK_PARKING: ParkingSpot[] = [
  { id: 'p-1', name: 'City Center Hub Parking', address: 'HiTech City Flyover Rd', lat: 17.4440, lng: 78.3780, available: 127, total: 300, hourlyRate: 30, distance: '450m', securityRating: 4.9 },
  { id: 'p-2', name: 'Cyber Towers Smart Garage', address: 'Madhapur Sector 2', lat: 17.4490, lng: 78.3820, available: 45, total: 150, hourlyRate: 40, distance: '1.2km', securityRating: 4.8 },
  { id: 'p-3', name: 'Metro Station Multi-Level', address: 'HITEC Station Gate 3', lat: 17.4415, lng: 78.3860, available: 210, total: 500, hourlyRate: 20, distance: '800m', securityRating: 4.7 },
  { id: 'p-4', name: 'IKEA Mobility Underground', address: 'Raidurg Metro Circle', lat: 17.4360, lng: 78.3730, available: 88, total: 200, hourlyRate: 25, distance: '1.8km', securityRating: 4.9 }
];

export const MOCK_EV_STATIONS: EvStation[] = [
  { id: 'ev-1', name: 'Mobilix Ultra-Fast Hub', operator: 'Mobilix Power', lat: 17.4430, lng: 78.3760, available: 6, total: 10, maxKw: 150, ratePerKwh: 18, connectors: ['CCS2', 'Type 2', 'CHAdeMO'] },
  { id: 'ev-2', name: 'Tata Power EZ Charge', operator: 'Tata Power', lat: 17.4470, lng: 78.3800, available: 4, total: 6, maxKw: 60, ratePerKwh: 16, connectors: ['CCS2', 'GB/T'] },
  { id: 'ev-3', name: 'Ather Grid Fast Station', operator: 'Ather Energy', lat: 17.4380, lng: 78.3710, available: 8, total: 8, maxKw: 120, ratePerKwh: 15, connectors: ['Ather Fast', 'Type 2'] },
  { id: 'ev-4', name: 'Jio-bp pulse Station', operator: 'Jio-bp', lat: 17.4510, lng: 78.3880, available: 3, total: 12, maxKw: 180, ratePerKwh: 20, connectors: ['CCS2', 'Type 2'] }
];

export const MOCK_INCIDENTS: Incident[] = [
  { id: 'INC-4091', type: 'Pothole', location: 'Outer Ring Road Exit 4', description: 'Deep pothole on left lane causing severe slowdown', status: 'Verified', createdAt: '10 mins ago' },
  { id: 'INC-4092', type: 'Broken Signal', location: 'Cyber Towers Junction', description: 'Northbound traffic light stuck on red', status: 'Assigned', createdAt: '25 mins ago' },
  { id: 'INC-4093', type: 'Road Blockage', location: 'Gachibowli Main Rd', description: 'Metro construction debris on lane 2', status: 'Reported', createdAt: '42 mins ago' },
  { id: 'INC-4090', type: 'Flooding', location: 'Mindspace Underpass', description: 'Water accumulation following heavy rain', status: 'Resolved', createdAt: '3 hours ago' }
];

export const MOCK_VEHICLES: Vehicle[] = [
  { id: 'v-1', licensePlate: 'TS 09 EV 4421', make: 'Tesla', model: 'Model 3 EV', type: 'ev_car', batteryHealth: 94, insuranceExpiryDays: 24, nextServiceKm: 850, fuelEfficiencyKmpl: 0 },
  { id: 'v-2', licensePlate: 'TS 07 FC 1928', make: 'Ather', model: '450X EV Scooter', type: 'ev_scooter', batteryHealth: 88, insuranceExpiryDays: 110, nextServiceKm: 3200, fuelEfficiencyKmpl: 0 },
  { id: 'v-3', licensePlate: 'TS 10 UB 8844', make: 'Hyundai', model: 'Ioniq 5 EV', type: 'ev_car', batteryHealth: 98, insuranceExpiryDays: 310, nextServiceKm: 14000, fuelEfficiencyKmpl: 0 },
  { id: 'v-4', licensePlate: 'TS 08 AB 1100', make: 'Tata', model: 'Nexon EV Prime', type: 'ev_car', batteryHealth: 91, insuranceExpiryDays: 145, nextServiceKm: 4500, fuelEfficiencyKmpl: 0 }
];

export const MOCK_TICKETS: Ticket[] = [
  { id: 'TCK-8839', bookingType: 'Metro Pass', ticketCode: 'MBLX-MET-99381', qrData: 'MOBILIX-METRO-VALID-2026-10-07', origin: 'HITEC City', destination: 'Raidurg', amount: 35, date: 'Today, 08:30 AM', status: 'Active' },
  { id: 'TCK-8840', bookingType: 'Smart Parking', ticketCode: 'MBLX-PRK-10294', qrData: 'MOBILIX-PARK-CITYCTR-SLOT-B12', origin: 'City Center Hub', destination: 'Slot B-12', amount: 30, date: 'Today, 10:15 AM', status: 'Active' },
  { id: 'TCK-8821', bookingType: 'EV Bus Ticket', ticketCode: 'MBLX-BUS-44910', qrData: 'MOBILIX-BUS-216-VALID', origin: 'Mindspace', destination: 'Jubilee Hills', amount: 25, date: 'Yesterday', status: 'Used' }
];

export const MOCK_TRANSACTIONS: WalletTransaction[] = [
  { id: 'TXN-901', title: 'Metro Ticket Purchase', category: 'Public Transport', amount: 35.00, type: 'debit', date: 'Today, 08:30 AM' },
  { id: 'TXN-902', title: 'City Center Parking Booking', category: 'Parking', amount: 30.00, type: 'debit', date: 'Today, 10:15 AM' },
  { id: 'TXN-903', title: 'Wallet Auto-Topup', category: 'Add Money', amount: 1000.00, type: 'credit', date: 'Yesterday' },
  { id: 'TXN-904', title: 'Mobilix EV Cab Ride', category: 'Ride Hailing', amount: 190.00, type: 'debit', date: '05 Oct 2026' }
];

export const MOCK_CARBON_HISTORY = [
  { month: 'May', emitted: 98.4, saved: 22.1, trees: 2.8 },
  { month: 'Jun', emitted: 85.2, saved: 28.4, trees: 3.5 },
  { month: 'Jul', emitted: 79.1, saved: 30.0, trees: 3.9 },
  { month: 'Aug', emitted: 74.8, saved: 31.2, trees: 4.1 },
  { month: 'Sep', emitted: 72.4, saved: 31.8, trees: 4.2 }
];

export const MOCK_ADMIN_KPIS = {
  activeVehicles: 1420,
  activeTrips: 582,
  trafficIncidents: 4,
  emergencyRequests: 1,
  availableParking: 470,
  evChargersAvailable: 21,
  dailyPassengers: 54200,
  cityScore: 82,
  co2SavedTonnes: 14.8
};
