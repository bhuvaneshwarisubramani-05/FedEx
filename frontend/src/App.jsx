// src/App.jsx
import React, { useState, useEffect } from 'react';
import { authService } from './services/authService';
import LoginPage from './components/Auth/LoginPage';
import Header from './components/Shared/Header';
import AdminLayout from './components/Admin/AdminLayout';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminCases from './components/Admin/AdminCases';
import AdminCustomers from './components/Admin/AdminCustomers';
import AdminDCAs from './components/Admin/AdminDCAs';
import AdminSOP from './components/Admin/AdminSOP';
import CMDashboard from './components/CreditManager/CMDashboard';

export default function App() {
  const [user, setUser] = useState(null);
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = authService.getUser();
    const token = authService.getToken();
    
    if (savedUser && token) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const handleLogin = (role, userData) => {
    setUser(userData);
    setCurrentTab('dashboard');
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setCurrentTab('dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Not logged in - show login page
  if (!user) {
    console.log('No user found, showing login page');
    return <LoginPage onLogin={handleLogin} />;
  }

  console.log('User:', user);

  // Admin Portal
  if (user.role === 'ADMIN') {
    const adminTabs = [
      { id: 'dashboard', label: 'Dashboard', icon: '📊' },
      { id: 'cases', label: 'Cases', icon: '📋' },
      { id: 'customers', label: 'Customers', icon: '👥' },
      { id: 'dcas', label: 'DCAs', icon: '🏢' },
      { id: 'sop', label: 'SOP', icon: '📑' }
    ];

    const renderAdminTab = () => {
      switch (currentTab) {
        case 'dashboard':
          return <AdminDashboard />;
        case 'cases':
          return <AdminCases />;
        case 'customers':
          return <AdminCustomers />;
        case 'dcas':
          return <AdminDCAs />;
        case 'sop':
          return <AdminSOP />;
        default:
          return <AdminDashboard />;
      }
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          user={user} 
          onLogout={handleLogout} 
          title="Admin Dashboard" 
        />
        <AdminLayout
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          tabs={adminTabs}
        >
          {renderAdminTab()}
        </AdminLayout>
      </div>
    );
  }

  // Credit Manager Portal
  if (user.role === 'CREDIT_MANAGER') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          user={user} 
          onLogout={handleLogout} 
          title="Credit Manager Portal" 
        />
        <div className="max-w-7xl mx-auto px-6 py-8">
          <CMDashboard />
        </div>
      </div>
    );
  }

  // Unknown role
  console.error('Unknown role:', user.role);
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-600 text-lg">Unknown user role: {user?.role}</p>
        <button 
          onClick={() => handleLogout()}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Logout & Try Again
        </button>
      </div>
    </div>
  );
}