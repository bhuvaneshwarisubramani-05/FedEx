import type { ReactNode } from "react";

import { LayoutDashboard, FolderOpen, TrendingUp, Clock, Settings, LogOut, Package, Bell } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: 'dashboard' | 'cases' | 'performance' | 'sla' | 'settings') => void;
  onLogout: () => void;
}

export default function AdminLayout({ children, currentPage, onNavigate, onLogout }: AdminLayoutProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'cases', label: 'Case Management', icon: FolderOpen },
    { id: 'performance', label: 'DCA Performance', icon: TrendingUp },
    { id: 'sla', label: 'SLA Monitoring', icon: Clock },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-purple-700 to-indigo-800 text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-purple-600">
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8" />
            <div>
              <h1 className="text-xl">FedEx DCA</h1>
              <p className="text-sm text-purple-200">Admin Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id || (currentPage === 'case-detail' && item.id === 'cases');
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-white text-purple-700'
                        : 'text-purple-100 hover:bg-purple-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-purple-600">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-purple-100 hover:bg-purple-600 rounded-lg transition-colors"
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
                {navItems.find(item => item.id === currentPage || (currentPage === 'case-detail' && item.id === 'cases'))?.label || 'Dashboard'}
              </h2>
              <p className="text-sm text-gray-600 mt-1">FedEx Finance & Operations Team</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white">
                  AD
                </div>
                <div>
                  <p className="text-sm text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">FedEx Admin</p>
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
