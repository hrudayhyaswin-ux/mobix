# 🚀 MOBILIX — Smart City Transport & Mobility Platform

> **“Move Smarter. Travel Better.”**  
> *One City. Every Journey. One Intelligent Mobility Platform.*

**MOBILIX** is a production-quality, futuristic smart-city urban transportation ecosystem designed to unify public transport, ride hailing, EV charging grids, smart parking, traffic intelligence, municipal emergency SOS, mobility wallets, and carbon footprint tracking into a single web application.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React Icons, Recharts, Custom GIS Map Visualizer / Leaflet
- **Backend API**: Node.js, Express.js REST API, SQLite in-memory / file database with automatic seed telemetry
- **Database Schema**: Full relational PostgreSQL schema in `schema.sql` (Users, Vehicles, Routes, Stations, Trips, Bookings, Tickets, Parking, EV Stations, Incidents, Emergency Requests, Carbon Records)
- **Tooling**: Vite 6, TSX, Concurrently

---

## 🌟 Core Features & Modules

1. **Futuristic Landing Page**: Hero section ("Move Smarter. Travel Better."), animated smart-city transit visualizer, live statistics counters (50K+ daily journeys, 1,200+ partners, 850+ EV hubs, 98% accuracy), How It Works, 8 Feature cards, Sustainability section, and CTA.
2. **Universal Global Search**: Search bar with autocomplete for locations, bus stops, metro stations, parking, EV stations, hospitals, fuel stations, airports, railway stations, restaurants, vehicle services.
3. **Smart Journey Planner**: Multi-modal matrix (Walking, Bicycle, Bus, Metro, Train, Cab, EV, Carpool) with side-by-side Time, Cost, Distance, and CO₂ comparison, plus sorting by Fastest, Cheapest, Greenest, and Convenient.
4. **AI Route Intelligence**: "Smart Recommendation" engine with "Why this route?" drawer explaining weather, crowd level, traffic predictions, and emissions saved.
5. **Live Transport Telemetry**: Interactive map displaying animated buses, metro trains, local rail, and EV cabs with speed (38 km/h), occupancy (72%), ETA (8m), and status ("On Time").
6. **Public Transport Module**: Bus route timetables, Metro station interchange map & crowd indicator, MMTS local train delay status, digital pass issuance.
7. **Ride Hailing & Booking**: Electric cabs, e-autos, economy sedans, XL SUVs, driver details, fare calculation, safety PIN verification, live driver tracking.
8. **Carpool / Ride Sharing**: Create/join carpool rides, seat reservation, split cost calculator, emissions offset stats.
9. **Smart Parking Discovery**: Nearby multi-level garages, real-time spot availability (127/300), hourly rates, spot reservation, digital parking passes.
10. **EV Mobility Grid**: 150kW CCS2 ultra-fast charger finder, plug availability (6/10), pricing (₹18/kWh), EV Range & Battery Health Calculator.
11. **My Vehicles Garage**: Vehicle registration, insurance expiration alerts ("Insurance expires in 24 days"), scheduled service alerts ("Service due in 850 km"), digital document vault.
12. **Traffic Intelligence & Incident Reporting**: Congestion levels (🟢 Low, 🟡 Moderate, 🔴 Heavy), municipal incident reporting (potholes, accidents, broken signals, blockages) with photo upload preview, auto Incident ID generation, tracking pipeline.
13. **Emergency Center & Roadside Assistance**: Prominent Emergency SOS button with live GPS location share, 🚑 Ambulance, 🚓 Police, 🚒 Fire dispatch, and roadside towing/jumpstart/flat tyre repair units.
14. **Fuel & Energy Station Finder**: Petrol, Diesel, CNG, EV stations near you with prices and open hours.
15. **Mobility Wallet & Digital Tickets**: Mobility Wallet balance (₹1,240.50), top-up modal, transactions log, scannable QR ticket generator with download/print & share options.
16. **Carbon Footprint Dashboard**: Sustainability analytics with Recharts monthly emission charts, trees equivalent (4.2 trees), green travel recommendations.
17. **Smart City Command Center (Admin Dashboard)**: Control room interface, real-time KPIs, City Mobility Score (82/100), passenger demand trend charts, incident resolution queue.
18. **Transport Operator & Driver Portals**: Fleet frequency controls, driver online/offline toggle, ride requests accept/decline, earnings telemetry.
19. **Smart Mobility AI ("Ask Mobilix AI")**: Floating AI assistant drawer answering travel questions based on live platform data.
20. **Demo Mode Role Switcher**: Instant switcher in navbar to test as **Commuter User**, **Driver**, **Transit Operator**, or **Smart City Admin**.

---

## 📦 Project Structure

```
mobilix/
 ├── index.html
 ├── package.json
 ├── schema.sql                # PostgreSQL Relational Database Schema
 ├── server/
 │    └── index.ts             # Express REST API Server + SQLite DB
 ├── src/
 │    ├── main.tsx
 │    ├── App.tsx
 │    ├── index.css
 │    ├── context/
 │    │    └── AuthContext.tsx # Global Auth, Role & State Management
 │    ├── types/
 │    │    └── index.ts        # TypeScript Interfaces
 │    ├── data/
 │    │    └── mockData.ts     # Seed Telemetry Data
 │    ├── components/
 │    │    ├── Navbar.tsx
 │    │    ├── Sidebar.tsx
 │    │    ├── MapContainer.tsx
 │    │    ├── GlobalSearchModal.tsx
 │    │    ├── AuthModal.tsx
 │    │    ├── AiAssistantModal.tsx
 │    │    ├── IncidentReportModal.tsx
 │    │    ├── EmergencySosModal.tsx
 │    │    └── TicketModal.tsx
 │    └── pages/
 │         ├── LandingPage.tsx
 │         ├── UserDashboardPage.tsx
 │         ├── JourneyPlannerPage.tsx
 │         ├── LiveTrackingPage.tsx
 │         ├── PublicTransportPage.tsx
 │         ├── RideBookingPage.tsx
 │         ├── CarpoolPage.tsx
 │         ├── ParkingPage.tsx
 │         ├── EvMobilityPage.tsx
 │         ├── VehicleManagementPage.tsx
 │         ├── TrafficIntelligencePage.tsx
 │         ├── EmergencyPage.tsx
 │         ├── FuelFinderPage.tsx
 │         ├── WalletPage.tsx
 │         ├── DigitalTicketsPage.tsx
 │         ├── CarbonFootprintPage.tsx
 │         ├── TripHistoryPage.tsx
 │         ├── FavoritesPage.tsx
 │         ├── AdminDashboardPage.tsx
 │         ├── OperatorDashboardPage.tsx
 │         └── DriverDashboardPage.tsx
```

---

## ⚡ Quick Start

```bash
# Navigate to the Desktop folder
cd /Users/ksvhrudayhyaswin/Desktop/mobilix

# Run both Backend API Server and Frontend concurrently
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

- To build for production: `npm run build`
- To run the backend server only: `npm run server`
- To run the frontend client only: `npm run client`
