import { TrendingUp, Award, AlertCircle, Clock } from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
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
      {/* KPI Overview */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gray-100 rounded-lg">
              <Award className="w-5 h-5 text-[#263744]" />
            </div>
            <span className="text-sm text-gray-600">Top Performer</span>
          </div>
          <p className="text-lg text-gray-900">CollectPro Solutions</p>
          <p className="text-sm text-green-600 mt-1">67.6% recovery rate</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-gray-600">Total Recovered</span>
          </div>
          <p className="text-lg text-gray-900">$10.87M</p>
          <p className="text-sm text-gray-500 mt-1">Across all DCAs</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm text-gray-600">Avg Resolution</span>
          </div>
          <p className="text-lg text-gray-900">31 days</p>
          <p className="text-sm text-gray-500 mt-1">Across DCAs</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-sm text-gray-600">SLA Breaches</span>
          </div>
          <p className="text-lg text-gray-900">25</p>
          <p className="text-sm text-gray-500 mt-1">Needs attention</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg text-gray-900 mb-4">DCA Performance Overview</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {[
                  'DCA',
                  'Total',
                  'Closed',
                  'Success',
                  'Recovered',
                  'Recovery %',
                  'Avg Days',
                  'SLA Breach',
                ].map((h) => (
                  <th key={h} className="py-3 px-4 text-sm text-gray-600 text-right first:text-left">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dcaPerformance.map((dca, index) => {
                const successRate = ((dca.closedCases / dca.totalCases) * 100).toFixed(1);
                return (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-sm text-gray-900">{dca.name}</td>
                    <td className="py-4 px-4 text-sm text-right">{dca.totalCases}</td>
                    <td className="py-4 px-4 text-sm text-right">{dca.closedCases}</td>
                    <td className="py-4 px-4 text-sm text-right">{successRate}%</td>
                    <td className="py-4 px-4 text-sm text-right">
                      ${(dca.recoveredAmount / 1_000_000).toFixed(2)}M
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={`px-2 py-1 rounded text-xs ${
                        dca.recoveryRate >= 67
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {dca.recoveryRate}%
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      {dca.avgResolutionDays}d
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={`px-2 py-1 rounded text-xs ${
                        dca.slaBreach <= 5
                          ? 'bg-green-100 text-green-700'
                          : dca.slaBreach <= 10
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {dca.slaBreach}
                      </span>
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
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg text-gray-900 mb-4">Recovery Trend by DCA</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line dataKey="collectpro" stroke="#263744" strokeWidth={2} />
              <Line dataKey="debtcare" stroke="#4b5563" strokeWidth={2} />
              <Line dataKey="recovernow" stroke="#9ca3af" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg text-gray-900 mb-4">Average Resolution Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={resolutionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="dca" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avgDays" fill="#263744" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
