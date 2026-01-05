import { Package, Building2, Users } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (role: 'admin' | 'agent') => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-700 to-purple-900 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Package className="w-12 h-12 text-white" />
            <h1 className="text-white text-5xl">FedEx</h1>
          </div>
          <h2 className="text-white text-3xl mb-3">DCA Management Platform</h2>
          <p className="text-purple-100 text-lg">Smart Debt Collection & Recovery System</p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* FedEx Admin Card */}
          <button
            onClick={() => onLogin('admin')}
            className="bg-white rounded-2xl p-10 shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building2 className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl text-gray-900 mb-3">FedEx Admin</h3>
              <p className="text-gray-600 mb-6">
                Finance & Operations Team
              </p>
              <ul className="text-sm text-gray-500 space-y-2 mb-6">
                <li>• Manage all overdue cases</li>
                <li>• Assign cases to DCAs</li>
                <li>• Monitor performance & SLAs</li>
                <li>• View AI-powered insights</li>
              </ul>
              <div className="px-6 py-3 bg-purple-600 text-white rounded-lg group-hover:bg-purple-700 transition-colors">
                Login as Admin
              </div>
            </div>
          </button>

          {/* DCA Agent Card */}
          <button
            onClick={() => onLogin('agent')}
            className="bg-white rounded-2xl p-10 shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105 group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl text-gray-900 mb-3">DCA Agent</h3>
              <p className="text-gray-600 mb-6">
                External Collection Agency
              </p>
              <ul className="text-sm text-gray-500 space-y-2 mb-6">
                <li>• View assigned cases</li>
                <li>• Update case status</li>
                <li>• Record recovery actions</li>
                <li>• Upload documents</li>
              </ul>
              <div className="px-6 py-3 bg-indigo-600 text-white rounded-lg group-hover:bg-indigo-700 transition-colors">
                Login as Agent
              </div>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-purple-100 text-sm">
            FedEx Smart Hackathon 2026 • Intelligent Debt Collection Platform
          </p>
        </div>
      </div>
    </div>
  );
}
