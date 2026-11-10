import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let db: Database;

// Initialize SQLite database and seed initial data
async function initDb() {
  db = await open({
    filename: ':memory:',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT,
      email TEXT,
      role TEXT,
      mobility_score INTEGER DEFAULT 87,
      wallet_balance REAL DEFAULT 1240.50
    );

    CREATE TABLE IF NOT EXISTS vehicles (
      id TEXT PRIMARY KEY,
      licensePlate TEXT,
      make TEXT,
      model TEXT,
      type TEXT,
      batteryHealth INTEGER,
      insuranceDays INTEGER,
      serviceKm INTEGER
    );

    CREATE TABLE IF NOT EXISTS incidents (
      id TEXT PRIMARY KEY,
      type TEXT,
      location TEXT,
      description TEXT,
      status TEXT,
      createdAt TEXT
    );

    CREATE TABLE IF NOT EXISTS parking (
      id TEXT PRIMARY KEY,
      name TEXT,
      address TEXT,
      available INTEGER,
      total INTEGER,
      hourlyRate REAL,
      distance TEXT
    );

    CREATE TABLE IF NOT EXISTS ev_stations (
      id TEXT PRIMARY KEY,
      name TEXT,
      operator TEXT,
      available INTEGER,
      total INTEGER,
      kw INTEGER,
      ratePerKwh REAL
    );
  `);

  // Seed sample data
  await db.run(`INSERT INTO users VALUES ('usr-1', 'Hruday (User)', 'hruday@mobilix.io', 'User', 87, 1240.50)`);
  await db.run(`INSERT INTO users VALUES ('drv-1', 'Rajesh Sharma (Driver)', 'rajesh@mobilix.io', 'Driver', 95, 3450.00)`);
  await db.run(`INSERT INTO users VALUES ('op-1', 'TSRTC Operations', 'ops@tsrtc.gov', 'Operator', 99, 50000.00)`);
  await db.run(`INSERT INTO users VALUES ('adm-1', 'Smart City Command Admin', 'admin@mobilix.gov', 'Admin', 98, 999999.00)`);

  // Seed Vehicles
  const vehicles = [
    ['v-1', 'TS 09 EV 4421', 'Tesla', 'Model 3 EV', 'ev_car', 94, 24, 850],
    ['v-2', 'TS 07 FC 1928', 'Ather', '450X EV Scooter', 'ev_scooter', 88, 110, 3200],
    ['v-3', 'TS 10 UB 8844', 'Hyundai', 'Ioniq 5', 'ev_car', 98, 310, 14000],
    ['v-4', 'TS 08 AB 1100', 'Tata', 'Nexon EV', 'ev_car', 91, 145, 4500]
  ];
  for (const v of vehicles) {
    await db.run(`INSERT INTO vehicles VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, v);
  }

  // Seed Incidents
  const incidents = [
    ['INC-4091', 'Pothole', 'Outer Ring Road Exit 4', 'Deep pothole causing slow traffic', 'Verified', new Date().toISOString()],
    ['INC-4092', 'Broken Signal', 'Cyber Towers Junction', 'Signal light flickering red', 'Assigned', new Date().toISOString()],
    ['INC-4093', 'Road Blockage', 'Gachibowli Main Rd', 'Construction debris on left lane', 'Reported', new Date().toISOString()]
  ];
  for (const inc of incidents) {
    await db.run(`INSERT INTO incidents VALUES (?, ?, ?, ?, ?, ?)`, inc);
  }

  // Seed Parking
  const parkingData = [
    ['p-1', 'City Center Hub Parking', 'HiTech City Flyover Rd', 127, 300, 30, '450m'],
    ['p-2', 'Cyber Towers Smart Garage', 'Madhapur Sector 2', 45, 150, 40, '1.2km'],
    ['p-3', 'Metro Station Multi-Level', 'HITEC Station', 210, 500, 20, '800m'],
    ['p-4', 'IKEA Mobility Lot', 'Raidurg Metro', 88, 200, 25, '1.8km']
  ];
  for (const p of parkingData) {
    await db.run(`INSERT INTO parking VALUES (?, ?, ?, ?, ?, ?, ?)`, p);
  }

  // Seed EV Stations
  const evData = [
    ['ev-1', 'Mobilix Ultra-Fast Hub', 'HiTech City Phase II', 6, 10, 150, 18],
    ['ev-2', 'Tata Power EZ Charge', 'Madhapur Metro', 4, 6, 60, 16],
    ['ev-3', 'Ather Grid Station', 'Financial District', 8, 8, 120, 15],
    ['ev-4', 'Jio-bp pulse Station', 'Gachibowli Junction', 3, 12, 180, 20]
  ];
  for (const e of evData) {
    await db.run(`INSERT INTO ev_stations VALUES (?, ?, ?, ?, ?, ?, ?)`, e);
  }

  console.log('Database initialized & seeded successfully.');
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'online', name: 'MOBILIX API Server', timestamp: new Date() });
});

// Authentication Mock / Login Endpoint
app.post('/api/auth/login', async (req, res) => {
  const { role, email } = req.body;
  const user = await db.get('SELECT * FROM users WHERE role = ? OR email = ?', [role || 'User', email || '']);
  if (user) {
    return res.json({ success: true, user, token: 'demo-jwt-token-mobilix-' + Date.now() });
  }
  return res.json({
    success: true,
    user: { id: 'usr-demo', name: 'Hruday (Demo)', email: email || 'demo@mobilix.io', role: role || 'User', mobility_score: 87, wallet_balance: 1240.50 },
    token: 'demo-jwt-token-mobilix'
  });
});

// Journey Planner API
app.post('/api/journey/plan', (req, res) => {
  const { from, to } = req.body;
  const options = [
    {
      id: 'opt-metro',
      mode: 'Metro + Walking',
      badge: 'Smart Recommended',
      icon: 'Subway',
      timeMins: 32,
      costINR: 35,
      distanceKm: 14.2,
      co2Kg: 4.2,
      crowd: 'Moderate (65%)',
      co2SavedKg: 3.8,
      route: ['Walk 3m to HITEC Station', 'Board Blue Line Metro', 'Disembark at Raidurg', 'Walk 4m to destination'],
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
      crowd: 'High (80%)',
      co2SavedKg: 4.9,
      route: ['Board Bus #216 at Mindspace', '12 stops', 'Get off at Jubilee Hills Checkpost'],
      whyText: 'Bus is the most affordable mode and produces the lowest net carbon per passenger.'
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
      crowd: 'Private',
      co2SavedKg: 5.9,
      route: ['Pickup at current door', 'Direct via Durgam Cheruvu Flyover'],
      whyText: 'Direct zero-emission electric cab avoiding main junction congestion.'
    },
    {
      id: 'opt-regular-cab',
      mode: 'Standard Auto / Cab',
      badge: 'Convenient',
      icon: 'CarTaxiFront',
      timeMins: 28,
      costINR: 220,
      distanceKm: 14.5,
      co2Kg: 7.8,
      crowd: 'Private',
      co2SavedKg: 0,
      route: ['Direct door-to-door cab'],
      whyText: 'Standard direct cab route.'
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
      crowd: '2 Seats Available',
      co2SavedKg: 4.8,
      route: ['Meet Driver Alex at Cyber Towers', 'Shared ride with 2 commuters'],
      whyText: 'Split trip costs by 70% while reducing city traffic congestion.'
    }
  ];

  res.json({ success: true, query: { from, to }, options });
});

// Live Transport Vehicles API
app.get('/api/transport/live', (req, res) => {
  const liveVehicles = [
    { id: 'BUS-216', type: 'Bus', number: 'TSRTC BUS 216', lat: 17.4435, lng: 78.3772, speed: '38 km/h', eta: '8 min', occupancy: 72, status: 'On Time', destination: 'Secunderabad' },
    { id: 'BUS-47V', type: 'Bus', number: 'EV BUS 47V', lat: 17.4489, lng: 78.3810, speed: '42 km/h', eta: '3 min', occupancy: 45, status: 'On Time', destination: 'Kondapur' },
    { id: 'METRO-BLUE-04', type: 'Metro', number: 'BLUE LINE TRAIN 04', lat: 17.4410, lng: 78.3850, speed: '65 km/h', eta: '2 min', occupancy: 58, status: 'On Time', destination: 'Nagole' },
    { id: 'EV-CAB-99', type: 'Ride', number: 'MOBILIX EV CAB #99', lat: 17.4370, lng: 78.3720, speed: '48 km/h', eta: '5 min', occupancy: 25, status: 'Active Ride', destination: 'Airport Express' }
  ];
  res.json({ success: true, vehicles: liveVehicles });
});

// Incident Report Endpoint
app.post('/api/incidents', async (req, res) => {
  const { type, location, description } = req.body;
  const id = 'INC-' + Math.floor(1000 + Math.random() * 9000);
  const status = 'Reported';
  const createdAt = new Date().toISOString();
  await db.run('INSERT INTO incidents VALUES (?, ?, ?, ?, ?, ?)', [id, type, location, description, status, createdAt]);
  res.json({ success: true, incident: { id, type, location, description, status, createdAt } });
});

app.get('/api/incidents', async (req, res) => {
  const list = await db.all('SELECT * FROM incidents ORDER BY createdAt DESC');
  res.json({ success: true, incidents: list });
});

// Emergency SOS Endpoint
app.post('/api/emergency', (req, res) => {
  const { type, lat, lng } = req.body;
  res.json({
    success: true,
    message: 'EMERGENCY SOS DISPATCHED IMMEDIATELY',
    dispatchId: 'SOS-DISPATCH-' + Date.now(),
    type: type || 'Ambulance & Police',
    location: { lat: lat || 17.4435, lng: lng || 78.3772 },
    nearestHospital: 'Medicover Hospital (1.2 km away - Dispatching Ambulance #04)',
    nearestPolice: 'Madhapur Police Station (800m away - Unit En Route)'
  });
});

// AI Mobilix Assistant API
app.post('/api/ai/ask', (req, res) => {
  const { question } = req.body;
  const q = (question || '').toLowerCase();
  let answer = "I'm MOBILIX AI Assistant. I can help you find optimal travel routes, EV charging hubs, parking spots, ticket details, and traffic alerts.";

  if (q.includes('airport')) {
    answer = "To get to Rajiv Gandhi International Airport (RGIA):\n• Recommended: EV Airport Express Bus #AJ (45 mins, ₹265, zero hassle).\n• Fastest: Direct Mobilix EV Cab (32 mins, ₹650).\n• Current Traffic: ORR Exit 4 is clear with 85 km/h average speed.";
  } else if (q.includes('cheapest') || q.includes('college')) {
    answer = "The cheapest mode to reach College/University is the Student Transit Metro Pass (₹25 per trip) or City Bus #216 (₹20). Switching to public transport saves ~₹180 daily compared to cabs.";
  } else if (q.includes('ev charger') || q.includes('charging')) {
    answer = "Nearest EV Charging Hub: 'Mobilix Ultra-Fast Hub' at HiTech City Phase II (450m away). It has 6/10 150kW CCS2 chargers available right now at ₹18/kWh.";
  } else if (q.includes('traffic') || q.includes('slower')) {
    answer = "Traffic is currently 24% slower at Cyber Towers Junction due to signal maintenance. Taking the Durgam Cheruvu cable bridge bypass saves 14 minutes.";
  } else if (q.includes('co2') || q.includes('carbon')) {
    answer = "Great job! This month you've saved 31.8 kg of CO₂ by taking public transport & EV rides. That is equivalent to planting 4.2 trees!";
  }

  res.json({ success: true, answer });
});

// City Pulse & Analytics KPI
app.get('/api/analytics/city-pulse', (req, res) => {
  res.json({
    success: true,
    cityScore: 82,
    breakdown: {
      traffic: 72,
      publicTransport: 91,
      roadSafety: 84,
      sustainability: 88,
      parkingAvailability: 68
    },
    kpis: {
      activeVehicles: 1420,
      activeTrips: 582,
      trafficIncidents: 4,
      emergencyRequests: 1,
      availableParking: 470,
      evChargersAvailable: 21,
      dailyPassengers: 54200
    }
  });
});

const startServer = (port: number) => {
  const server = app.listen(port, () => {
    console.log(`⚡ MOBILIX Backend Express server running on port ${port}`);
  });
  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} in use, trying ${port + 1}...`);
      startServer(port + 1);
    }
  });
};

initDb().then(() => {
  startServer(Number(PORT));
});
