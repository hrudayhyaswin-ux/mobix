import React, { createContext, useContext, useState } from 'react';
import { User, UserRole, Ticket, WalletTransaction } from '../types';
import { INITIAL_USER, MOCK_TICKETS, MOCK_TRANSACTIONS } from '../data/mockData';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'warning' | 'emergency';
}

interface AuthContextType {
  user: User;
  setUserRole: (role: UserRole) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  walletBalance: number;
  addWalletMoney: (amount: number) => void;
  deductWalletMoney: (amount: number) => boolean;
  tickets: Ticket[];
  addTicket: (ticket: Ticket) => void;
  transactions: WalletTransaction[];
  notifications: Notification[];
  addNotification: (title: string, message: string, type?: Notification['type']) => void;
  isGlobalSearchOpen: boolean;
  setIsGlobalSearchOpen: (open: boolean) => void;
  isAiAssistantOpen: boolean;
  setIsAiAssistantOpen: (open: boolean) => void;
  isIncidentModalOpen: boolean;
  setIsIncidentModalOpen: (open: boolean) => void;
  isEmergencyOpen: boolean;
  setIsEmergencyOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [walletBalance, setWalletBalance] = useState<number>(1240.50);
  const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);
  const [transactions, setTransactions] = useState<WalletTransaction[]>(MOCK_TRANSACTIONS);
  const [activeTab, setActiveTab] = useState<string>('landing');

  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isIncidentModalOpen, setIsIncidentModalOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'Bus Approaching', message: 'TSRTC Bus 216 arriving in 3 minutes at Mindspace stop.', time: '2m ago', type: 'info' },
    { id: '2', title: 'Parking Reservation', message: 'Slot B-12 confirmed at City Center Garage.', time: '15m ago', type: 'success' },
    { id: '3', title: 'Traffic Disruption Alert', message: 'Heavy congestion at Cyber Towers Flyover. Take bypass.', time: '1h ago', type: 'warning' }
  ]);

  const setUserRole = (role: UserRole) => {
    let name = 'Hruday (User)';
    if (role === 'Driver') name = 'Rajesh Sharma (Driver)';
    if (role === 'Operator') name = 'TSRTC Operator';
    if (role === 'Admin') name = 'Smart City Admin';

    setUser(prev => ({
      ...prev,
      role,
      name
    }));

    if (role === 'Admin') setActiveTab('admin_dashboard');
    else if (role === 'Operator') setActiveTab('operator_dashboard');
    else if (role === 'Driver') setActiveTab('driver_dashboard');
    else setActiveTab('user_dashboard');

    addNotification('Demo Role Changed', `Switched view to ${role} interface.`, 'info');
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const addWalletMoney = (amount: number) => {
    setWalletBalance(prev => {
      const next = prev + amount;
      setUser(u => ({ ...u, walletBalance: next }));
      return next;
    });
    const newTxn: WalletTransaction = {
      id: 'TXN-' + Math.floor(Math.random() * 10000),
      title: 'Wallet Top-Up',
      category: 'Add Money',
      amount,
      type: 'credit',
      date: 'Just Now'
    };
    setTransactions(prev => [newTxn, ...prev]);
    addNotification('Wallet Updated', `Added ₹${amount.toFixed(2)} to MOBILIX Wallet.`, 'success');
  };

  const deductWalletMoney = (amount: number): boolean => {
    if (walletBalance < amount) {
      addNotification('Insufficient Balance', `Please add ₹${(amount - walletBalance).toFixed(2)} to continue.`, 'warning');
      return false;
    }
    setWalletBalance(prev => {
      const next = prev - amount;
      setUser(u => ({ ...u, walletBalance: next }));
      return next;
    });
    return true;
  };

  const addTicket = (ticket: Ticket) => {
    setTickets(prev => [ticket, ...prev]);
    addNotification('Ticket Generated', `Digital Ticket ${ticket.ticketCode} issued.`, 'success');
  };

  const addNotification = (title: string, message: string, type: Notification['type'] = 'info') => {
    const newNotif: Notification = {
      id: 'n-' + Date.now(),
      title,
      message,
      time: 'Just now',
      type
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUserRole,
      theme,
      toggleTheme,
      walletBalance,
      addWalletMoney,
      deductWalletMoney,
      tickets,
      addTicket,
      transactions,
      notifications,
      addNotification,
      isGlobalSearchOpen,
      setIsGlobalSearchOpen,
      isAiAssistantOpen,
      setIsAiAssistantOpen,
      isIncidentModalOpen,
      setIsIncidentModalOpen,
      isEmergencyOpen,
      setIsEmergencyOpen,
      isAuthModalOpen,
      setIsAuthModalOpen,
      activeTab,
      setActiveTab
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
