import { FolderOpen, Clock, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockCases } from '../../data/mockData';

interface AgentDashboardProps {
  onViewCases: () => void;
}

export default function AgentDashboard({ onViewCases }: AgentDashboardProps) {
  // Filter only cases assigned to Sarah Johnson
  const myCases = mockCases.filter(c => c.assignedAgent === 'Sarah Johnson');
  const assignedCases = myCases.length;
  const pendingCases = myCases.filter(c => c.status === 'New' || c.status === 'In Progress').length;
  const closedCases = myCases.filter(c => c.status === 'Closed').length;
  const slaRiskCases = myCases.filter(c => c.slaStatus === 'At Risk' || c.slaStatus === 'Breached').length;

  const statusData = [
    { name: 'New', value: myCases.filter(c => c.status === 'New').length, color: '#3b82f6' },
    { name: 'In Progress', value: myCases.filter(c => c.status === 'In Progress').length, color: '#f59e0b' },
    { name: 'Payment Promised', value: myCases.filter(c => c.status === 'Payment Promised').length, color: '#10b981' },
    { name: 'Disputed', value: myCases.filter(c => c.status === 'Disputed').length, color: '#f97316' },
    { name: 'Escalated', value: myCases.filter(c => c.status === 'Escalated').length, color: '#ef4444' },
  ].filter(d => d.value > 0);

  const activityData = [
    { day: 'Mon', calls: 8, emails: 12, updates: 5 },
    { day: 'Tue', calls: 12, emails: 15, updates: 7 },
    { day: 'Wed', calls: 10, emails: 10, updates: 6 },
    { day: 'Thu', calls: 15, emails: 18, updates: 9 },
    { day: 'Fri', calls: 14, emails: 16, updates: 8 },
  ];

  return (
    <div className="p-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 mb-8 text-white">
        <h2 className="text-2xl mb-2">Welcome back, Sarah!</h2>
        <p className="text-indigo-100">You have {pendingCases} pending cases that require your attention.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FolderOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Assigned Cases</h3>
          <p className="text-3xl text-gray-900">{assignedCases}</p>
          <p className="text-xs text-gray-500 mt-2">Total cases</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Pending Cases</h3>
          <p className="text-3xl text-yellow-600">{pendingCases}</p>
          <p className="text-xs text-gray-500 mt-2">Requires action</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Closed Cases</h3>
          <p className="text-3xl text-green-600">{closedCases}</p>
          <p className="text-xs text-gray-500 mt-2">This month</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">SLA At Risk</h3>
          <p className="text-3xl text-orange-600">{slaRiskCases}</p>
          <p className="text-xs text-gray-500 mt-2">Needs attention</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Case Status Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg text-gray-900 mb-4">My Cases by Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg text-gray-900 mb-4">Weekly Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Legend />
              <Bar dataKey="calls" fill="#6366f1" name="Calls Made" />
              <Bar dataKey="emails" fill="#8b5cf6" name="Emails Sent" />
              <Bar dataKey="updates" fill="#a855f7" name="Case Updates" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Cases */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg text-gray-900">Recent Cases</h3>
          <button
            onClick={onViewCases}
            className="text-sm text-indigo-600 hover:text-indigo-700"
          >
            View All →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Case ID</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Customer</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Amount</th>
                <th className="text-center py-3 px-4 text-sm text-gray-600">Status</th>
                <th className="text-center py-3 px-4 text-sm text-gray-600">SLA</th>
                <th className="text-center py-3 px-4 text-sm text-gray-600">Priority</th>
              </tr>
            </thead>
            <tbody>
              {myCases.slice(0, 5).map((caseItem) => (
                <tr key={caseItem.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">{caseItem.caseNumber}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{caseItem.customerName}</td>
                  <td className="py-3 px-4 text-sm text-gray-900 text-right">${caseItem.invoiceAmount.toLocaleString()}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-flex px-2 py-1 rounded text-xs ${
                      caseItem.status === 'New' ? 'bg-blue-100 text-blue-700' :
                      caseItem.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                      caseItem.status === 'Payment Promised' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {caseItem.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-flex px-2 py-1 rounded text-xs ${
                      caseItem.slaStatus === 'On Track' ? 'bg-green-100 text-green-700' :
                      caseItem.slaStatus === 'At Risk' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {caseItem.slaStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`text-sm ${
                      caseItem.aiPriorityScore >= 80 ? 'text-red-600' :
                      caseItem.aiPriorityScore >= 60 ? 'text-orange-600' :
                      'text-green-600'
                    }`}>
                      {caseItem.aiPriorityScore}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h4 className="text-gray-900">This Month</h4>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Cases Resolved:</span>
              <span className="text-gray-900">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Recovery Rate:</span>
              <span className="text-green-600">72%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg Resolution:</span>
              <span className="text-gray-900">26 days</span>
            </div>
          </div>
        </div>

        <button
          onClick={onViewCases}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-left"
        >
          <h4 className="text-lg mb-2">View All Cases</h4>
          <p className="text-sm text-indigo-100">Manage your assigned cases</p>
        </button>

        <button className="bg-white border-2 border-indigo-600 text-indigo-700 p-6 rounded-lg shadow-sm hover:bg-indigo-50 transition-colors text-left">
          <h4 className="text-lg mb-2">Quick Update</h4>
          <p className="text-sm text-indigo-600">Update case status</p>
        </button>
      </div>
    </div>
  );
}
