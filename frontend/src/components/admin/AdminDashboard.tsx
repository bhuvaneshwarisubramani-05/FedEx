import {
  DollarSign,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Filter,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  recoveryTrendData,
  ageingDistributionData,
  dcaPerformance,
  mockCases,
} from '../../data/mockData';
import { useState } from 'react';

interface AdminDashboardProps {
  onViewCases: () => void;
}

export default function AdminDashboard({ onViewCases }: AdminDashboardProps) {
  const [dateRange, setDateRange] = useState('last-30-days');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedDCA, setSelectedDCA] = useState('all');

  const totalOverdue = mockCases.reduce(
    (sum, c) => sum + c.invoiceAmount,
    0
  );
  const recoveredAmount = 6700000;
  const activeCases = mockCases.filter(
    (c) => c.status !== 'Closed'
  ).length;
  const slaBreaches = mockCases.filter(
    (c) => c.slaStatus === 'Breached'
  ).length;

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
        <Kpi
          icon={<DollarSign className="w-6 h-6 text-red-600" />}
          label="Total Overdue"
          value={`$${(totalOverdue / 1_000_000).toFixed(2)}M`}
          note={`${mockCases.length} cases`}
          trend="↑ 8%"
          trendClass="text-red-600 bg-red-50"
        />

        <Kpi
          icon={<CheckCircle className="w-6 h-6 text-green-600" />}
          label="Recovered Amount"
          value={`$${(recoveredAmount / 1_000_000).toFixed(2)}M`}
          note="65% recovery rate"
          trend="↑ 12%"
          trendClass="text-green-600 bg-green-50"
        />

        <Kpi
          icon={<TrendingUp className="w-6 h-6 text-[#263744]" />}
          label="Active Cases"
          value={activeCases}
          note="Across 3 DCAs"
          trend="Active"
          trendClass="text-[#263744] bg-[#f1f2f6]"
        />

        <Kpi
          icon={<AlertCircle className="w-6 h-6 text-orange-600" />}
          label="SLA Breaches"
          value={slaBreaches}
          note="Requires attention"
          trend="Alert"
          trendClass="text-orange-600 bg-orange-50"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Recovery Trend */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg text-gray-900 mb-4">
            Recovery Trend (Last 6 Months)
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={recoveryTrendData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
              />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                formatter={(value: any) =>
                  `$${(value / 1000).toFixed(0)}k`
                }
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="recovered"
                stroke="#263744"
                strokeWidth={3}
                name="Recovered"
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="#9ca3af"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Target"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Ageing Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg text-gray-900 mb-4">
            Ageing Bucket Distribution
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageingDistributionData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
              />
              <XAxis dataKey="bucket" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="cases"
                fill="#263744"
                name="Cases"
              />
              <Bar
                dataKey="amount"
                fill="#8fa3ad"
                name="Amount ($)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* DCA Performance */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg text-gray-900 mb-4">
          DCA Performance Comparison
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <Th>DCA Name</Th>
                <Th align="right">Total</Th>
                <Th align="right">Closed</Th>
                <Th align="right">Recovered</Th>
                <Th align="right">Recovery %</Th>
                <Th align="right">Avg Days</Th>
                <Th align="right">SLA Breach</Th>
              </tr>
            </thead>
            <tbody>
              {dcaPerformance.map((dca, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <Td>{dca.name}</Td>
                  <Td align="right">{dca.totalCases}</Td>
                  <Td align="right">{dca.closedCases}</Td>
                  <Td align="right">
                    ${(dca.recoveredAmount / 1_000_000).toFixed(2)}M
                  </Td>
                  <Td align="right">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        dca.recoveryRate >= 67
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {dca.recoveryRate}%
                    </span>
                  </Td>
                  <Td align="right">
                    {dca.avgResolutionDays} days
                  </Td>
                  <Td align="right">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        dca.slaBreach <= 5
                          ? 'bg-green-100 text-green-700'
                          : dca.slaBreach <= 10
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {dca.slaBreach}
                    </span>
                  </Td>
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
          className="bg-[#263744] text-white p-6 rounded-lg shadow-sm hover:bg-[#1b2833] transition-colors text-left"
        >
          <h4 className="text-lg mb-2">View All Cases</h4>
          <p className="text-sm text-gray-200">
            Manage and assign cases
          </p>
        </button>

        <button className="bg-white border-2 border-[#263744] text-[#263744] p-6 rounded-lg shadow-sm hover:bg-[#f1f2f6] transition-colors text-left">
          <h4 className="text-lg mb-2">Generate Report</h4>
          <p className="text-sm">Export performance data</p>
        </button>

        <button className="bg-white border-2 border-[#263744] text-[#263744] p-6 rounded-lg shadow-sm hover:bg-[#f1f2f6] transition-colors text-left">
          <h4 className="text-lg mb-2">AI Insights</h4>
          <p className="text-sm">View recommendations</p>
        </button>
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */

function Kpi({
  icon,
  label,
  value,
  note,
  trend,
  trendClass,
}: any) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-[#f1f2f6] rounded-lg">{icon}</div>
        <span className={`text-xs px-2 py-1 rounded ${trendClass}`}>
          {trend}
        </span>
      </div>
      <h3 className="text-gray-600 text-sm mb-1">{label}</h3>
      <p className="text-3xl text-gray-900">{value}</p>
      <p className="text-xs text-gray-500 mt-2">{note}</p>
    </div>
  );
}

function Th({
  children,
  align = 'left',
}: {
  children: React.ReactNode;
  align?: 'left' | 'right';
}) {
  return (
    <th
      className={`py-3 px-4 text-sm text-gray-600 text-${align}`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  align = 'left',
}: {
  children: React.ReactNode;
  align?: 'left' | 'right';
}) {
  return (
    <td
      className={`py-4 px-4 text-sm text-gray-900 text-${align}`}
    >
      {children}
    </td>
  );
}
