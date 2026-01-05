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
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-gray-600">On Track</span>
          </div>
          <p className="text-3xl text-gray-900">{onTrack.length}</p>
          <p className="text-sm text-gray-500 mt-1">
            {((onTrack.length / mockCases.length) * 100).toFixed(0)}% of total
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-sm text-gray-600">At Risk</span>
          </div>
          <p className="text-3xl text-orange-600">{slaAtRisk.length}</p>
          <p className="text-sm text-gray-500 mt-1">Requires attention</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-sm text-gray-600">Breached</span>
          </div>
          <p className="text-3xl text-red-600">{slaBreached.length}</p>
          <p className="text-sm text-gray-500 mt-1">Immediate action needed</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm text-gray-600">Compliance Rate</span>
          </div>
          <p className="text-3xl text-gray-900">
            {((onTrack.length / mockCases.length) * 100).toFixed(0)}%
          </p>
          <p className="text-sm text-gray-500 mt-1">Overall performance</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
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
            Showing {filteredCases.length} of {mockCases.length} cases
          </span>
        </div>
      </div>

      {/* SLA Status Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Case ID</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Customer</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Amount</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Assigned DCA</th>
                <th className="text-center py-3 px-4 text-sm text-gray-600">Case Status</th>
                <th className="text-center py-3 px-4 text-sm text-gray-600">SLA Deadline</th>
                <th className="text-center py-3 px-4 text-sm text-gray-600">Days Remaining</th>
                <th className="text-center py-3 px-4 text-sm text-gray-600">SLA Status</th>
                <th className="text-center py-3 px-4 text-sm text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.map((caseItem) => {
                const daysRemaining = calculateDaysRemaining(caseItem.slaDeadline);
                return (
                  <tr key={caseItem.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-sm text-gray-900">{caseItem.caseNumber}</td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-sm text-gray-900">{caseItem.customerName}</p>
                        <p className="text-xs text-gray-500">{caseItem.invoiceNumber}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-900 text-right">
                      ${caseItem.invoiceAmount.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-900">{caseItem.assignedDCA}</td>
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-flex px-2 py-1 rounded text-xs ${
                        caseItem.status === 'Closed' ? 'bg-gray-100 text-gray-700' :
                        caseItem.status === 'Payment Promised' ? 'bg-green-100 text-green-700' :
                        caseItem.status === 'Escalated' ? 'bg-red-100 text-red-700' :
                        caseItem.status === 'Disputed' ? 'bg-orange-100 text-orange-700' :
                        caseItem.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {caseItem.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-900 text-center">
                      {new Date(caseItem.slaDeadline).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`text-sm ${
                        daysRemaining < 0 ? 'text-red-600' :
                        daysRemaining <= 5 ? 'text-orange-600' :
                        'text-green-600'
                      }`}>
                        {daysRemaining < 0 ? `${Math.abs(daysRemaining)}d overdue` : `${daysRemaining}d`}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-flex px-2 py-1 rounded text-xs ${
                        caseItem.slaStatus === 'On Track' ? 'bg-green-100 text-green-700' :
                        caseItem.slaStatus === 'At Risk' ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {caseItem.slaStatus}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => onViewCase(caseItem.id)}
                        className="p-1 text-purple-600 hover:bg-purple-50 rounded"
                        title="View Details"
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
      </div>

      {/* Alert Banner for Breached Cases */}
      {slaBreached.length > 0 && (
        <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-red-900 mb-2">SLA Breach Alert</h3>
              <p className="text-sm text-red-700 mb-4">
                {slaBreached.length} case{slaBreached.length > 1 ? 's have' : ' has'} breached the SLA deadline. 
                Immediate action is required to address these cases.
              </p>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700">
                  Escalate All
                </button>
                <button className="px-4 py-2 border border-red-600 text-red-700 rounded-lg text-sm hover:bg-red-50">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
