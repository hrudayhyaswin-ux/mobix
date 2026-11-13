import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// In-memory data store for resilient serverless & container operation
interface MemoryStore {
  users: any[];
  vehicles: any[];
  incidents: any[];
  parking: any[];
  ev_stations: any[];
}

const memoryStore: MemoryStore = {
  users: [
    { id: 'usr-1', name: 'Hruday (User)', email: 'hruday@mobilix.io', role: 'User', mobility_score: 87, wallet_balance: 1240.50 },
    { id: 'drv-1', name: 'Rajesh Sharma (Driver)', email: 'rajesh@mobilix.io', role: 'Driver', mobility_score: 95, wallet_balance: 3450.00 },
    { id: 'op-1', name: 'TSRTC Operations', email: 'ops@tsrtc.gov', role: 'Operator', mobility_score: 99, wallet_balance: 50000.00 },
    { id: 'adm-1', name: 'Smart City Command Admin', email: 'admin@mobilix.gov', role: 'Admin', mobility_score: 98, wallet_balance: 999999.00 }
  ],
  vehicles: [
    { id: 'v-1', licensePlate: 'TS 09 EV 4421', make: 'Tesla', model: 'Model 3 EV', type: 'ev_car', batteryHealth: 94, insuranceDays: 24, serviceKm: 850 },
    { id: 'v-2', licensePlate: 'TS 07 FC 1928', make: 'Ather', model: '450X EV Scooter', type: 'ev_scooter', batteryHealth: 88, insuranceDays: 110, serviceKm: 3200 },
    { id: 'v-3', licensePlate: 'TS 10 UB 8844', make: 'Hyundai', model: 'Ioniq 5', type: 'ev_car', batteryHealth: 98, insuranceDays: 310, serviceKm: 14000 },
    { id: 'v-4', licensePlate: 'TS 08 AB 1100', make: 'Tata', model: 'Nexon EV', type: 'ev_car', batteryHealth: 91, insuranceDays: 145, serviceKm: 4500 }
  ],
  incidents: [
    { id: 'INC-4091', type: 'Pothole', location: 'Outer Ring Road Exit 4', description: 'Deep pothole causing slow traffic', status: 'Verified', createdAt: new Date().toISOString() },
    { id: 'INC-4092', type: 'Broken Signal', location: 'Cyber Towers Junction', description: 'Signal light flickering red', status: 'Assigned', createdAt: new Date().toISOString() },
    { id: 'INC-4093', type: 'Road Blockage', location: 'Gachibowli Main Rd', description: 'Construction debris on left lane', status: 'Reported', createdAt: new Date().toISOString() }
  ],
  parking: [
    { id: 'p-1', name: 'City Center Hub Parking', address: 'HiTech City Flyover Rd', available: 127, total: 300, hourlyRate: 30, distance: '450m' },
    { id: 'p-2', name: 'Cyber Towers Smart Garage', address: 'Madhapur Sector 2', available: 45, total: 150, hourlyRate: 40, distance: '1.2km' },
    { id: 'p-3', name: 'Metro Station Multi-Level', address: 'HITEC Station', available: 210, total: 500, hourlyRate: 20, distance: '800m' },
    { id: 'p-4', name: 'IKEA Mobility Lot', address: 'Raidurg Metro', available: 88, total: 200, hourlyRate: 25, distance: '1.8km' }
  ],
  ev_stations: [
    { id: 'ev-1', name: 'Mobilix Ultra-Fast Hub', operator: 'HiTech City Phase II', available: 6, total: 10, kw: 150, ratePerKwh: 18 },
    { id: 'ev-2', name: 'Tata Power EZ Charge', operator: 'Madhapur Metro', available: 4, total: 6, kw: 60, ratePerKwh: 16 },
    { id: 'ev-3', name: 'Ather Grid Station', operator: 'Financial District', available: 8, total: 8, kw: 120, ratePerKwh: 15 },
    { id: 'ev-4', name: 'Jio-bp pulse Station', operator: 'Gachibowli Junction', available: 3, total: 12, kw: 180, ratePerKwh: 20 }
  ]
};

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    name: 'MOBILIX Smart City API Server',
    deployment: process.env.VERCEL ? 'Vercel Serverless' : (process.env.SPACE_ID ? 'Hugging Face Space' : 'Local Node Server'),
    huggingFaceConfigured: Boolean(process.env.HF_TOKEN || process.env.HUGGINGFACE_API_KEY),
    timestamp: new Date()
  });
});

// Authentication Mock / Login Endpoint
app.post('/api/auth/login', (req, res) => {
  const { role, email } = req.body;
  const user = memoryStore.users.find(u => u.role === role || u.email === email);
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
  const origin = from || 'HITEC City Junction';
  const destination = to || 'Raidurg Tech Park';

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
      route: [`Walk 3m from ${origin}`, 'Board Blue Line Metro', 'Disembark at Raidurg', `Walk 4m to ${destination}`],
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
      route: [`Board Bus #216 near ${origin}`, '12 stops', `Disembark near ${destination}`],
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
      route: [`Direct pickup at ${origin}`, `Dropoff at ${destination} via Durgam Cheruvu Flyover`],
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
      route: [`Direct cab from ${origin} to ${destination}`],
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
      route: [`Meet Carpool Driver at ${origin}`, `Shared ride to ${destination}`],
      whyText: 'Split trip costs by 70% while reducing city traffic congestion.'
    }
  ];

  res.json({ success: true, query: { from: origin, to: destination }, options });
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

// Incident Report Endpoints
app.post('/api/incidents', (req, res) => {
  const { type, location, description } = req.body;
  const id = 'INC-' + Math.floor(1000 + Math.random() * 9000);
  const status = 'Reported';
  const createdAt = new Date().toISOString();

  const incident = { id, type: type || 'Hazard', location: location || 'City Junction', description: description || '', status, createdAt };
  memoryStore.incidents.unshift(incident);

  res.json({ success: true, incident });
});

app.get('/api/incidents', (req, res) => {
  res.json({ success: true, incidents: memoryStore.incidents });
});

app.delete('/api/incidents/:id', (req, res) => {
  const { id } = req.params;
  memoryStore.incidents = memoryStore.incidents.filter(i => i.id !== id);
  res.json({ success: true, message: `Incident ${id} resolved successfully.` });
});

// Vehicles API Endpoints
app.get('/api/vehicles', (req, res) => {
  res.json({ success: true, vehicles: memoryStore.vehicles });
});

app.post('/api/vehicles', (req, res) => {
  const { make, model, licensePlate, type, batteryHealth, insuranceDays, serviceKm } = req.body;
  const id = 'v-' + Date.now();
  const v = {
    id,
    licensePlate: licensePlate || 'TS 09 DEMO 0001',
    make: make || 'Mobilix',
    model: model || 'EV Model',
    type: type || 'ev_car',
    batteryHealth: batteryHealth || 100,
    insuranceDays: insuranceDays || 365,
    serviceKm: serviceKm || 5000
  };

  memoryStore.vehicles.unshift(v);
  res.json({ success: true, vehicle: v });
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

// AI Status & Hugging Face Connection Endpoint
app.get('/api/ai/status', (req, res) => {
  const hasHfToken = Boolean(process.env.HF_TOKEN || process.env.HUGGINGFACE_API_KEY);
  res.json({
    success: true,
    huggingFaceConnected: hasHfToken,
    model: hasHfToken ? 'Hugging Face (Mistral-7B-Instruct-v0.3)' : 'Rule-Based Smart Heuristics Engine',
    info: hasHfToken 
      ? 'Connected to Hugging Face Serverless Inference API' 
      : 'Running local smart transit heuristics. Provide HF_TOKEN to enable live Hugging Face LLM responses.'
  });
});

// AI Mobilix Assistant API (Hugging Face Inference + Local Heuristics Fallback)
app.post('/api/ai/ask', async (req, res) => {
  const { question } = req.body;
  const q = (question || '').toLowerCase();
  const hfToken = process.env.HF_TOKEN || process.env.HUGGINGFACE_API_KEY;

  // 1. Try Hugging Face Inference API if HF_TOKEN is configured
  if (hfToken) {
    try {
      const hfResponse = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${hfToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: `<s>[INST] You are MOBILIX AI Assistant, an expert urban mobility advisor for Hyderabad smart city. User question: "${question}". Answer concisely in 2-3 sentences with clear, practical transit recommendations. [/INST]`,
          parameters: { max_new_tokens: 150, temperature: 0.7 }
        })
      });

      if (hfResponse.ok) {
        const data = await hfResponse.json();
        let answerText = '';
        if (Array.isArray(data) && data[0]?.generated_text) {
          const parts = data[0].generated_text.split('[/INST]');
          answerText = (parts[1] || parts[0]).trim();
        } else if (typeof data === 'string') {
          answerText = data.trim();
        }

        if (answerText) {
          return res.json({
            success: true,
            answer: answerText,
            source: 'Hugging Face (Mistral-7B-Instruct)'
          });
        }
      }
    } catch (hfErr) {
      console.warn('Hugging Face inference error, falling back to heuristics:', hfErr);
    }
  }

  // 2. High-Speed Urban Mobility Heuristics (Instant, 100% Reliable Fallback)
  let answer = "I'm MOBILIX AI Assistant. I can help you find optimal travel routes, EV charging hubs, parking spots, ticket details, and traffic alerts.";

  if (q.includes('airport')) {
    answer = "To get to Rajiv Gandhi International Airport (RGIA):\n• Recommended: EV Airport Express Bus #AJ (45 mins, ₹265, zero hassle).\n• Fastest: Direct Mobilix EV Cab (32 mins, ₹650).\n• Current Traffic: ORR Exit 4 is clear with 85 km/h average speed.";
  } else if (q.includes('cheapest') || q.includes('college')) {
    answer = "The cheapest mode to reach College/University is the Student Transit Metro Pass (₹25 per trip) or City Bus #216 (₹20). Switching to public transport saves ~₹180 daily compared to cabs.";
  } else if (q.includes('ev charger') || q.includes('charging') || q.includes('charger')) {
    answer = "Nearest EV Charging Hub: 'Mobilix Ultra-Fast Hub' at HiTech City Phase II (450m away). It has 6/10 150kW CCS2 chargers available right now at ₹18/kWh.";
  } else if (q.includes('traffic') || q.includes('slower') || q.includes('congestion')) {
    answer = "Traffic is currently 24% slower at Cyber Towers Junction due to signal maintenance. Taking the Durgam Cheruvu cable bridge bypass saves 14 minutes.";
  } else if (q.includes('co2') || q.includes('carbon') || q.includes('emission')) {
    answer = "Great job! This month you've saved 31.8 kg of CO₂ by taking public transport & EV rides. That is equivalent to planting 4.2 trees!";
  } else if (q.includes('parking') || q.includes('park')) {
    answer = "Smart Parking Alert: 'City Center Hub Parking' has 127/300 slots open at ₹30/hour. 'Cyber Towers Smart Garage' has 45 open spots.";
  } else if (q.includes('metro') || q.includes('train')) {
    answer = "Hyderabad Metro Blue Line is running on time (2 min headway). Next train towards Raidurg departs in 4 minutes from HITEC City Station Platform 2.";
  } else if (q.includes('sos') || q.includes('emergency') || q.includes('accident')) {
    answer = "For immediate emergencies, tap the red SOS button on your screen or dial 108 (Ambulance) / 100 (Police). Nearby Medicover Hospital is 1.2 km away.";
  } else if (q.includes('carpool') || q.includes('share')) {
    answer = "Mobilix Eco-Carpool lets you split rides with verified commuters starting at just ₹45/seat, saving over 4 kg of CO₂ per trip!";
  }

  res.json({
    success: true,
    answer,
    source: hfToken ? 'Hugging Face (Fallback Heuristics)' : 'MOBILIX Smart Engine'
  });
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

export default app;
