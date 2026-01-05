import { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import AdminPortal from './components/admin/AdminPortal';
import AgentPortal from './components/agent/AgentPortal';
import './index.css'

export default function App() {
  const [userRole, setUserRole] = useState<'admin' | 'agent' | null>(null);

  const handleLogin = (role: 'admin' | 'agent') => {
    setUserRole(role);
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  if (!userRole) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (userRole === 'admin') {
    return <AdminPortal onLogout={handleLogout} />;
  }

  return <AgentPortal onLogout={handleLogout} />;
}
