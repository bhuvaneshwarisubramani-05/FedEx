// ============================================
// FILE 1: src/components/Shared/Header.jsx
// ============================================
import React from 'react';
import { LogOut, User } from 'lucide-react';

export default function Header({ user, onLogout, title }) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">{title}</h1>
          <p className="text-gray-600 text-sm">FedEx DCA Management</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <User size={20} className="text-gray-600" />
            <div>
              <p className="font-semibold text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.role === 'ADMIN' ? '👨‍💼 Admin' : '👤 Credit Manager'}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

