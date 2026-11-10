-- MOBILIX PRODUCTION DATABASE SCHEMA (PostgreSQL / Relational)
-- Comprehensive Schema for Smart Transport Mobility Platform

-- Roles table
CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO roles (name, description) VALUES 
  ('User', 'Regular commuter and platform user'),
  ('Driver', 'Ride-share / taxi / transit driver'),
  ('Operator', 'Public transport authority & fleet manager'),
  ('Admin', 'Smart city command center administrator')
ON CONFLICT DO NOTHING;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  phone VARCHAR(20),
  password_hash VARCHAR(255) NOT NULL,
  role_id INT REFERENCES roles(id),
  avatar_url TEXT,
  mobility_score INT DEFAULT 85,
  wallet_balance DECIMAL(10, 2) DEFAULT 1240.50,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vehicles table (User & Operator vehicles)
CREATE TABLE IF NOT EXISTS vehicles (
  id VARCHAR(36) PRIMARY KEY,
  owner_id VARCHAR(36) REFERENCES users(id),
  license_plate VARCHAR(30) NOT NULL UNIQUE,
  make VARCHAR(50) NOT NULL,
  model VARCHAR(50) NOT NULL,
  type VARCHAR(30) CHECK (type IN ('car', 'bike', 'scooter', 'ev_car', 'ev_scooter', 'bus', 'train', 'metro')),
  year INT,
  fuel_efficiency_kmpl DECIMAL(5,2),
  battery_health_pct INT DEFAULT 100,
  insurance_expiry DATE,
  puc_expiry DATE,
  last_service_date DATE,
  next_service_km INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Drivers table
CREATE TABLE IF NOT EXISTS drivers (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) REFERENCES users(id) ON DELETE CASCADE,
  vehicle_id VARCHAR(36) REFERENCES vehicles(id),
  license_number VARCHAR(50) UNIQUE NOT NULL,
  rating DECIMAL(3, 2) DEFAULT 4.9,
  total_trips INT DEFAULT 0,
  is_online BOOLEAN DEFAULT false,
  current_lat DECIMAL(10, 8),
  current_lng DECIMAL(11, 8),
  status VARCHAR(30) DEFAULT 'available'
);

-- Stations & Stops table
CREATE TABLE IF NOT EXISTS stations (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(20),
  type VARCHAR(30) CHECK (type IN ('bus_stop', 'metro_station', 'railway_station', 'airport', 'interchange')),
  lat DECIMAL(10, 8) NOT NULL,
  lng DECIMAL(11, 8) NOT NULL,
  lines TEXT[],
  crowd_level VARCHAR(20) DEFAULT 'Moderate'
);

-- Routes table
CREATE TABLE IF NOT EXISTS routes (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  mode VARCHAR(30) CHECK (mode IN ('bus', 'metro', 'train')),
  route_code VARCHAR(30),
  start_station_id VARCHAR(36) REFERENCES stations(id),
  end_station_id VARCHAR(36) REFERENCES stations(id),
  distance_km DECIMAL(6, 2),
  avg_duration_mins INT,
  fare_base DECIMAL(8, 2)
);

-- Trips (Active & Historical)
CREATE TABLE IF NOT EXISTS trips (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) REFERENCES users(id),
  driver_id VARCHAR(36) REFERENCES drivers(id),
  mode VARCHAR(30) NOT NULL,
  origin_name VARCHAR(150) NOT NULL,
  destination_name VARCHAR(150) NOT NULL,
  distance_km DECIMAL(6, 2),
  duration_mins INT,
  fare DECIMAL(8, 2),
  co2_emitted_kg DECIMAL(5, 2),
  co2_saved_kg DECIMAL(5, 2),
  status VARCHAR(30) CHECK (status IN ('requested', 'active', 'completed', 'cancelled')),
  started_at TIMESTAMP,
  completed_at TIMESTAMP
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) REFERENCES users(id),
  trip_id VARCHAR(36) REFERENCES trips(id),
  booking_type VARCHAR(30) CHECK (booking_type IN ('ride', 'bus', 'metro', 'parking', 'ev_charging', 'carpool')),
  amount DECIMAL(8, 2) NOT NULL,
  status VARCHAR(30) DEFAULT 'confirmed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Digital Tickets table
CREATE TABLE IF NOT EXISTS tickets (
  id VARCHAR(36) PRIMARY KEY,
  booking_id VARCHAR(36) REFERENCES bookings(id),
  user_id VARCHAR(36) REFERENCES users(id),
  ticket_code VARCHAR(50) UNIQUE NOT NULL,
  qr_data TEXT NOT NULL,
  origin VARCHAR(100),
  destination VARCHAR(100),
  valid_until TIMESTAMP,
  is_used BOOLEAN DEFAULT false
);

-- Parking Lots & Slots table
CREATE TABLE IF NOT EXISTS parking_lots (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  address TEXT,
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  total_spots INT NOT NULL,
  available_spots INT NOT NULL,
  hourly_rate DECIMAL(6, 2) NOT NULL,
  security_rating DECIMAL(3, 1) DEFAULT 4.8
);

-- EV Stations & Charging Sessions
CREATE TABLE IF NOT EXISTS ev_stations (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  operator VARCHAR(80),
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  total_chargers INT NOT NULL,
  available_chargers INT NOT NULL,
  max_kw INT DEFAULT 150,
  rate_per_kwh DECIMAL(6, 2) NOT NULL,
  connector_types TEXT[]
);

-- Incidents table
CREATE TABLE IF NOT EXISTS incidents (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) REFERENCES users(id),
  type VARCHAR(50) CHECK (type IN ('pothole', 'accident', 'violation', 'broken_light', 'blockage', 'flooding')),
  description TEXT,
  photo_url TEXT,
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  location_name VARCHAR(200),
  status VARCHAR(30) CHECK (status IN ('Reported', 'Verified', 'Assigned', 'Resolved')) DEFAULT 'Reported',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Emergency Requests
CREATE TABLE IF NOT EXISTS emergency_requests (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) REFERENCES users(id),
  service_type VARCHAR(50) CHECK (service_type IN ('ambulance', 'police', 'fire', 'roadside')),
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  status VARCHAR(30) DEFAULT 'dispatched',
  dispatched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Wallet Transactions
CREATE TABLE IF NOT EXISTS wallet_transactions (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) REFERENCES users(id),
  amount DECIMAL(10, 2) NOT NULL,
  type VARCHAR(20) CHECK (type IN ('credit', 'debit')),
  description VARCHAR(200),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Carbon Records
CREATE TABLE IF NOT EXISTS carbon_records (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) REFERENCES users(id),
  month VARCHAR(7), -- YYYY-MM
  co2_emitted_kg DECIMAL(8, 2),
  co2_saved_kg DECIMAL(8, 2),
  trees_equivalent DECIMAL(5, 2)
);

-- Indexes for maximum performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_trips_user ON trips(user_id);
CREATE INDEX IF NOT EXISTS idx_incidents_status ON incidents(status);
CREATE INDEX IF NOT EXISTS idx_stations_type ON stations(type);
