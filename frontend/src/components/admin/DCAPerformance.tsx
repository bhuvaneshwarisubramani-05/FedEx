import { TrendingUp, Award, AlertCircle, Clock } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { dcaPerformance } from '../../data/mockData';

export default function DCAPerformance() {
  const performanceTrendData = [
    { month: 'Jul', collectpro: 720000, debtcare: 680000, recovernow: 550000 },
    { month: 'Aug', collectpro: 780000, debtcare: 720000, recovernow: 580000 },
    { month: 'Sep', collectpro: 650000, debtcare: 590000, recovernow: 480000 },
    { month: 'Oct', collectpro: 890000, debtcare: 820000, recovernow: 710000 },
    { month: 'Nov', collectpro: 810000, debtcare: 760000, recovernow: 620000 },
    { month: 'Dec', collectpro: 920000, debtcare: 850000, recovernow: 680000 },
  ];

  const resolutionData = [
    { dca: 'CollectPro', avgDays: 28 },
    { dca: 'DebtCare', avgDays: 31 },
    { dca: 'RecoverNow', avgDays: 35 },
  ];

  return (
    <div className="p-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Award className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm text-gray-600">Top Performer</span>
          </div>
          <p className="text-xl text-gray-900">CollectPro Solutions</p>
          <p className="text-sm text-green-600 mt-1">67.6% recovery rate</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-gray-600">Total Recovered</span>
          </div>
          <p className="text-xl text-gray-900">$10.87M</p>
          <p className="text-sm text-gray-500 mt-1">Across all DCAs</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm text-gray-600">Avg Resolution</span>
          </div>
          <p className="text-xl text-gray-900">31 days</p>
          <p className="text-sm text-gray-500 mt-1">Average across DCAs</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-sm text-gray-600">Total SLA Breach</span>
          </div>
          <p className="text-xl text-gray-900">25</p>
          <p className="text-sm text-gray-500 mt-1">Needs improvement</p>
        </div>
      </div>

      {/* Performance Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg text-gray-900 mb-4">DCA Performance Overview</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm text-gray-600">DCA Name</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Total Cases</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Closed Cases</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Success Rate</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Recovered Amount</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Recovery Rate</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Avg Resolution</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">SLA Breach</th>
                <th className="text-center py-3 px-4 text-sm text-gray-600">Performance</th>
              </tr>
            </thead>
            <tbody>
              {dcaPerformance.map((dca, index) => {
                const successRate = ((dca.closedCases / dca.totalCases) * 100).toFixed(1);
                return (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-sm text-purple-700">{dca.name.substring(0, 2)}</span>
                        </div>
                        <span className="text-sm text-gray-900">{dca.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-900 text-right">{dca.totalCases}</td>
                    <td className="py-4 px-4 text-sm text-gray-900 text-right">{dca.closedCases}</td>
                    <td className="py-4 px-4 text-sm text-gray-900 text-right">{successRate}%</td>
                    <td className="py-4 px-4 text-sm text-gray-900 text-right">
                      ${(dca.recoveredAmount / 1000000).toFixed(2)}M
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={`inline-flex px-2 py-1 rounded text-xs ${
                        dca.recoveryRate >= 67 ? 'bg-green-100 text-green-700' :
                        dca.recoveryRate >= 60 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {dca.recoveryRate}%
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={`inline-flex px-2 py-1 rounded text-xs ${
                        dca.avgResolutionDays <= 30 ? 'bg-green-100 text-green-700' :
                        dca.avgResolutionDays <= 35 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {dca.avgResolutionDays}d
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={`inline-flex px-2 py-1 rounded text-xs ${
                        dca.slaBreach <= 5 ? 'bg-green-100 text-green-700' :
                        dca.slaBreach <= 10 ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {dca.slaBreach}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={star <= (index === 0 ? 5 : index === 1 ? 4 : 3) ? 'text-yellow-400' : 'text-gray-300'}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* Recovery Trend by DCA */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg text-gray-900 mb-4">Recovery Trend by DCA</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                formatter={(value: any) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Legend />
              <Line type="monotone" dataKey="collectpro" stroke="#7c3aed" strokeWidth={2} name="CollectPro" />
              <Line type="monotone" dataKey="debtcare" stroke="#6366f1" strokeWidth={2} name="DebtCare" />
              <Line type="monotone" dataKey="recovernow" stroke="#8b5cf6" strokeWidth={2} name="RecoverNow" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Average Resolution Time */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg text-gray-900 mb-4">Average Resolution Time (Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={resolutionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="dca" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                formatter={(value: any) => `${value} days`}
              />
              <Bar dataKey="avgDays" fill="#7c3aed" name="Days" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Individual DCA Details */}
      <div className="mt-6 grid grid-cols-3 gap-6">
        {dcaPerformance.map((dca, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-gray-900">{dca.name}</h4>
              <button className="text-sm text-purple-600 hover:text-purple-700">View Details</button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Active Cases:</span>
                <span className="text-gray-900">{dca.totalCases - dca.closedCases}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Closed Cases:</span>
                <span className="text-gray-900">{dca.closedCases}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Recovery Rate:</span>
                <span className={dca.recoveryRate >= 67 ? 'text-green-600' : 'text-orange-600'}>
                  {dca.recoveryRate}%
                </span>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Performance:</span>
                  <span className="text-gray-900">{Math.round((dca.recoveryRate / 70) * 100)}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      dca.recoveryRate >= 67 ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${(dca.recoveryRate / 70) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
