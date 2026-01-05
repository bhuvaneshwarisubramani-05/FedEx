import { DollarSign, AlertCircle, CheckCircle, TrendingUp, Filter } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { recoveryTrendData, ageingDistributionData, dcaPerformance, mockCases } from '../../data/mockData';
import { useState } from 'react';

interface AdminDashboardProps {
  onViewCases: () => void;
}

export default function AdminDashboard({ onViewCases }: AdminDashboardProps) {
  const [dateRange, setDateRange] = useState('last-30-days');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedDCA, setSelectedDCA] = useState('all');

  const totalOverdue = mockCases.reduce((sum, c) => sum + c.invoiceAmount, 0);
  const recoveredAmount = 6700000;
  const activeCases = mockCases.filter(c => c.status !== 'Closed').length;
  const slaBreaches = mockCases.filter(c => c.slaStatus === 'Breached').length;

  const COLORS = ['#7c3aed', '#6366f1', '#8b5cf6', '#a855f7'];

  return (
    <div className="p-8">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <div className="flex gap-4 flex-1">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="last-7-days">Last 7 Days</option>
              <option value="last-30-days">Last 30 Days</option>
              <option value="last-90-days">Last 90 Days</option>
              <option value="ytd">Year to Date</option>
            </select>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Regions</option>
              <option value="north">North</option>
              <option value="south">South</option>
              <option value="east">East</option>
              <option value="west">West</option>
            </select>
            <select
              value={selectedDCA}
              onChange={(e) => setSelectedDCA(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All DCAs</option>
              <option value="collectpro">CollectPro Solutions</option>
              <option value="debtcare">DebtCare Associates</option>
              <option value="recovernow">RecoverNow Inc</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">↑ 8%</span>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Total Overdue</h3>
          <p className="text-3xl text-gray-900">${(totalOverdue / 1000000).toFixed(2)}M</p>
          <p className="text-xs text-gray-500 mt-2">{mockCases.length} cases</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">↑ 12%</span>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Recovered Amount</h3>
          <p className="text-3xl text-gray-900">${(recoveredAmount / 1000000).toFixed(2)}M</p>
          <p className="text-xs text-gray-500 mt-2">65% recovery rate</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded">Active</span>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Active Cases</h3>
          <p className="text-3xl text-gray-900">{activeCases}</p>
          <p className="text-xs text-gray-500 mt-2">Across 3 DCAs</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">Alert</span>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">SLA Breaches</h3>
          <p className="text-3xl text-gray-900">{slaBreaches}</p>
          <p className="text-xs text-gray-500 mt-2">Requires attention</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Recovery Trend */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg text-gray-900 mb-4">Recovery Trend (Last 6 Months)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={recoveryTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                formatter={(value: any) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Legend />
              <Line type="monotone" dataKey="recovered" stroke="#7c3aed" strokeWidth={3} name="Recovered" />
              <Line type="monotone" dataKey="target" stroke="#9ca3af" strokeWidth={2} strokeDasharray="5 5" name="Target" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Ageing Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg text-gray-900 mb-4">Ageing Bucket Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageingDistributionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="bucket" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Legend />
              <Bar dataKey="cases" fill="#7c3aed" name="Cases" />
              <Bar dataKey="amount" fill="#6366f1" name="Amount ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* DCA Performance Comparison */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg text-gray-900 mb-4">DCA Performance Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm text-gray-600">DCA Name</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Total Cases</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Closed Cases</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Recovered Amount</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Recovery Rate</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Avg Resolution</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">SLA Breach</th>
              </tr>
            </thead>
            <tbody>
              {dcaPerformance.map((dca, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-sm text-gray-900">{dca.name}</td>
                  <td className="py-4 px-4 text-sm text-gray-900 text-right">{dca.totalCases}</td>
                  <td className="py-4 px-4 text-sm text-gray-900 text-right">{dca.closedCases}</td>
                  <td className="py-4 px-4 text-sm text-gray-900 text-right">${(dca.recoveredAmount / 1000000).toFixed(2)}M</td>
                  <td className="py-4 px-4 text-right">
                    <span className={`inline-flex px-2 py-1 rounded text-xs ${
                      dca.recoveryRate >= 67 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {dca.recoveryRate}%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900 text-right">{dca.avgResolutionDays} days</td>
                  <td className="py-4 px-4 text-right">
                    <span className={`inline-flex px-2 py-1 rounded text-xs ${
                      dca.slaBreach <= 5 ? 'bg-green-100 text-green-700' : 
                      dca.slaBreach <= 10 ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {dca.slaBreach}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-6">
        <button
          onClick={onViewCases}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h4 className="text-lg mb-2">View All Cases</h4>
          <p className="text-sm text-purple-100">Manage and assign cases</p>
        </button>
        <button className="bg-white border-2 border-purple-600 text-purple-700 p-6 rounded-lg shadow-sm hover:bg-purple-50 transition-colors">
          <h4 className="text-lg mb-2">Generate Report</h4>
          <p className="text-sm text-purple-600">Export performance data</p>
        </button>
        <button className="bg-white border-2 border-indigo-600 text-indigo-700 p-6 rounded-lg shadow-sm hover:bg-indigo-50 transition-colors">
          <h4 className="text-lg mb-2">AI Insights</h4>
          <p className="text-sm text-indigo-600">View recommendations</p>
        </button>
      </div>
    </div>
  );
}
