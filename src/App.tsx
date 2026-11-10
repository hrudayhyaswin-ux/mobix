import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { AuthModal } from './components/AuthModal';
import { AiAssistantModal } from './components/AiAssistantModal';
import { IncidentReportModal } from './components/IncidentReportModal';
import { EmergencySosModal } from './components/EmergencySosModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { JourneyPlannerPage } from './pages/JourneyPlannerPage';
import { LiveTrackingPage } from './pages/LiveTrackingPage';
import { PublicTransportPage } from './pages/PublicTransportPage';
import { RideBookingPage } from './pages/RideBookingPage';
import { CarpoolPage } from './pages/CarpoolPage';
import { ParkingPage } from './pages/ParkingPage';
import { EvMobilityPage } from './pages/EvMobilityPage';
import { VehicleManagementPage } from './pages/VehicleManagementPage';
import { TrafficIntelligencePage } from './pages/TrafficIntelligencePage';
import { EmergencyPage } from './pages/EmergencyPage';
import { FuelFinderPage } from './pages/FuelFinderPage';
import { WalletPage } from './pages/WalletPage';
import { DigitalTicketsPage } from './pages/DigitalTicketsPage';
import { CarbonFootprintPage } from './pages/CarbonFootprintPage';
import { TripHistoryPage } from './pages/TripHistoryPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { OperatorDashboardPage } from './pages/OperatorDashboardPage';
import { DriverDashboardPage } from './pages/DriverDashboardPage';

const AppContent: React.FC = () => {
  const { activeTab } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'landing': return <LandingPage />;
      case 'user_dashboard': return <UserDashboardPage />;
      case 'journey_planner': return <JourneyPlannerPage />;
      case 'live_tracking': return <LiveTrackingPage />;
      case 'public_transport': return <PublicTransportPage />;
      case 'ride_booking': return <RideBookingPage />;
      case 'carpool': return <CarpoolPage />;
      case 'parking': return <ParkingPage />;
      case 'ev_charging': return <EvMobilityPage />;
      case 'vehicles': return <VehicleManagementPage />;
      case 'traffic': return <TrafficIntelligencePage />;
      case 'emergency': return <EmergencyPage />;
      case 'fuel': return <FuelFinderPage />;
      case 'wallet': return <WalletPage />;
      case 'tickets': return <DigitalTicketsPage />;
      case 'carbon': return <CarbonFootprintPage />;
      case 'history': return <TripHistoryPage />;
      case 'favorites': return <FavoritesPage />;
      case 'admin_dashboard': return <AdminDashboardPage />;
      case 'operator_dashboard': return <OperatorDashboardPage />;
      case 'driver_dashboard': return <DriverDashboardPage />;
      default: return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 overflow-y-auto px-4 lg:px-8 py-6 max-w-7xl mx-auto w-full custom-scrollbar">
          {renderActiveView()}
        </main>
      </div>

      {/* Global Modals & Overlay Drawers */}
      <GlobalSearchModal />
      <AuthModal />
      <AiAssistantModal />
      <IncidentReportModal />
      <EmergencySosModal />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
