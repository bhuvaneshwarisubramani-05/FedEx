import type { ReactNode } from "react";

import { LayoutDashboard, FolderOpen, Bell, User, LogOut, Users } from 'lucide-react';

interface AgentLayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: 'dashboard' | 'cases' | 'notifications' | 'profile') => void;
  onLogout: () => void;
}

export default function AgentLayout({ children, currentPage, onNavigate, onLogout }: AgentLayoutProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'cases', label: 'My Cases', icon: FolderOpen },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: 3 },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-indigo-700 to-purple-800 text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-indigo-600">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8" />
            <div>
              <h1 className="text-xl">DCA Portal</h1>
              <p className="text-sm text-indigo-200">Agent View</p>
            </div>
          </div>
        </div>

        {/* Agent Info */}
        <div className="p-4 border-b border-indigo-600">
          <div className="bg-indigo-600 bg-opacity-50 rounded-lg p-3">
            <p className="text-sm text-indigo-100">Logged in as</p>
            <p className="text-white">Sarah Johnson</p>
            <p className="text-xs text-indigo-200 mt-1">CollectPro Solutions</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id || (currentPage === 'case-update' && item.id === 'cases');
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id as any)}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-white text-indigo-700'
                        : 'text-indigo-100 hover:bg-indigo-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-2 py-1 bg-red-500 text-white rounded-full text-xs">
                        {item.badge}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-indigo-600">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-indigo-100 hover:bg-indigo-600 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl text-gray-900">
                {navItems.find(item => item.id === currentPage || (currentPage === 'case-update' && item.id === 'cases'))?.label || 'Dashboard'}
              </h2>
              <p className="text-sm text-gray-600 mt-1">CollectPro Solutions - DCA Agent</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                  SJ
                </div>
                <div>
                  <p className="text-sm text-gray-900">Sarah Johnson</p>
                  <p className="text-xs text-gray-500">DCA Agent</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
