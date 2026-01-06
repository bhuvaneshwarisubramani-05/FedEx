import { AlertTriangle, Clock, Eye, Filter } from 'lucide-react';
import { mockCases } from '../../data/mockData';
import { useState } from 'react';

interface SLAMonitoringProps {
  onViewCase: (caseId: string) => void;
}

export default function SLAMonitoring({ onViewCase }: SLAMonitoringProps) {
  const [filterStatus, setFilterStatus] = useState('all');

  const slaAtRisk = mockCases.filter(c => c.slaStatus === 'At Risk');
  const slaBreached = mockCases.filter(c => c.slaStatus === 'Breached');
  const onTrack = mockCases.filter(c => c.slaStatus === 'On Track');

  const filteredCases = mockCases.filter(c => {
    if (filterStatus === 'all') return true;
    return c.slaStatus === filterStatus;
  });

  const calculateDaysRemaining = (deadline: string) => {
    const today = new Date('2026-01-05');
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-8">
      {/* SUMMARY */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-gray-600">On Track</span>
          </div>
          <p className="text-3xl text-gray-900">{onTrack.length}</p>
          <p className="text-sm text-gray-500 mt-1">
            {((onTrack.length / mockCases.length) * 100).toFixed(0)}% compliant
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-sm text-gray-600">At Risk</span>
          </div>
          <p className="text-3xl text-orange-600">{slaAtRisk.length}</p>
          <p className="text-sm text-gray-500 mt-1">Needs attention</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-sm text-gray-600">Breached</span>
          </div>
          <p className="text-3xl text-red-600">{slaBreached.length}</p>
          <p className="text-sm text-gray-500 mt-1">Immediate action</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gray-100 rounded-lg">
              <Clock className="w-5 h-5 text-[#263744]" />
            </div>
            <span className="text-sm text-gray-600">Compliance Rate</span>
          </div>
          <p className="text-3xl text-gray-900">
            {((onTrack.length / mockCases.length) * 100).toFixed(0)}%
          </p>
          <p className="text-sm text-gray-500 mt-1">Overall SLA health</p>
        </div>
      </div>

      {/* FILTER */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">All Status</option>
            <option value="On Track">On Track</option>
            <option value="At Risk">At Risk</option>
            <option value="Breached">Breached</option>
          </select>
          <div className="flex-1" />
          <span className="text-sm text-gray-600">
            Showing {filteredCases.length} of {mockCases.length}
          </span>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {[
                'Case ID', 'Customer', 'Amount', 'Assigned DCA',
                'Status', 'SLA Deadline', 'Days Left', 'SLA', 'Action'
              ].map(h => (
                <th key={h} className="text-left py-3 px-4 text-sm text-gray-600">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredCases.map(c => {
              const days = calculateDaysRemaining(c.slaDeadline);
              return (
                <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-sm">{c.caseNumber}</td>
                  <td className="py-4 px-4">
                    <p className="text-sm">{c.customerName}</p>
                    <p className="text-xs text-gray-500">{c.invoiceNumber}</p>
                  </td>
                  <td className="py-4 px-4 text-sm text-right">
                    ${c.invoiceAmount.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-sm">{c.assignedDCA}</td>
                  <td className="py-4 px-4 text-sm">{c.status}</td>
                  <td className="py-4 px-4 text-sm text-center">
                    {new Date(c.slaDeadline).toLocaleDateString()}
                  </td>
                  <td className={`py-4 px-4 text-sm text-center ${
                    days < 0 ? 'text-red-600' :
                    days <= 5 ? 'text-orange-600' :
                    'text-green-600'
                  }`}>
                    {days < 0 ? `${Math.abs(days)}d overdue` : `${days}d`}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`px-2 py-1 rounded text-xs ${
                      c.slaStatus === 'On Track'
                        ? 'bg-green-100 text-green-700'
                        : c.slaStatus === 'At Risk'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {c.slaStatus}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => onViewCase(c.id)}
                      className="p-1 text-[#263744] hover:bg-gray-100 rounded"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ALERT */}
      {slaBreached.length > 0 && (
        <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-red-900 mb-2">SLA Breach Alert</h3>
          <p className="text-sm text-red-700 mb-4">
            {slaBreached.length} cases have breached SLA. Immediate escalation required.
          </p>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm">
              Escalate All
            </button>
            <button className="px-4 py-2 border border-red-600 text-red-700 rounded-lg text-sm">
              Generate Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
