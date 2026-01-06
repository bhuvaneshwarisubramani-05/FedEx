import { useState } from 'react';
import { Search, Download, Plus, Eye, UserPlus } from 'lucide-react';
import { mockCases } from '../../data/mockData';
import AssignCaseModal from './AssignCaseModal';

interface CaseManagementProps {
  onViewCase: (caseId: string) => void;
}

export default function CaseManagement({ onViewCase }: CaseManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dcaFilter, setDcaFilter] = useState('all');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState<string | null>(null);

  const filteredCases = mockCases.filter((c) => {
    const matchesSearch =
      c.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchesDCA = dcaFilter === 'all' || c.assignedDCA === dcaFilter;
    return matchesSearch && matchesStatus && matchesDCA;
  });

  const handleAssignClick = (caseId: string) => {
    setSelectedCase(caseId);
    setShowAssignModal(true);
  };

  const badge = (cls: string) =>
    `inline-flex px-2 py-1 rounded text-xs ${cls}`;

  return (
    <div className="p-8">
      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by case number or customer name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">All Status</option>
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Payment Promised">Payment Promised</option>
            <option value="Disputed">Disputed</option>
            <option value="Escalated">Escalated</option>
            <option value="Closed">Closed</option>
          </select>

          <select
            value={dcaFilter}
            onChange={(e) => setDcaFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">All DCAs</option>
            <option value="CollectPro Solutions">CollectPro Solutions</option>
            <option value="DebtCare Associates">DebtCare Associates</option>
            <option value="RecoverNow Inc">RecoverNow Inc</option>
          </select>

          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export
          </button>

          <button className="px-4 py-2 bg-[#263744] text-white rounded-lg text-sm flex items-center gap-2 hover:bg-[#1b2833]">
            <Plus className="w-4 h-4" />
            New Case
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Total Cases</p>
          <p className="text-2xl text-gray-900">{filteredCases.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">High Priority</p>
          <p className="text-2xl text-orange-600">
            {filteredCases.filter((c) => c.aiPriorityScore >= 80).length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">SLA At Risk</p>
          <p className="text-2xl text-red-600">
            {filteredCases.filter((c) => c.slaStatus !== 'On Track').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Total Value</p>
          <p className="text-2xl text-gray-900">
            $
            {(
              filteredCases.reduce(
                (sum, c) => sum + c.invoiceAmount,
                0
              ) / 1_000_000
            ).toFixed(2)}
            M
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {[
                  'Case ID',
                  'Customer',
                  'Amount',
                  'Ageing',
                  'Priority',
                  'Risk',
                  'Assigned DCA',
                  'Status',
                  'SLA',
                  'Actions',
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left py-3 px-4 text-sm text-gray-600"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredCases.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {c.caseNumber}
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm text-gray-900">{c.customerName}</p>
                    <p className="text-xs text-gray-500">
                      {c.invoiceNumber}
                    </p>
                  </td>
                  <td className="px-4 py-4 text-right text-sm">
                    ${c.invoiceAmount.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span
                      className={badge(
                        c.ageingDays > 90
                          ? 'bg-red-100 text-red-700'
                          : c.ageingDays > 60
                          ? 'bg-orange-100 text-orange-700'
                          : c.ageingDays > 30
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      )}
                    >
                      {c.ageingDays}d
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center text-sm">
                    {c.aiPriorityScore}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span
                      className={badge(
                        c.riskLevel === 'Critical'
                          ? 'bg-red-100 text-red-700'
                          : c.riskLevel === 'High'
                          ? 'bg-orange-100 text-orange-700'
                          : c.riskLevel === 'Medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      )}
                    >
                      {c.riskLevel}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {c.assignedDCA}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span
                      className={badge(
                        c.status === 'New'
                          ? 'bg-blue-100 text-blue-700'
                          : c.status === 'In Progress'
                          ? 'bg-yellow-100 text-yellow-700'
                          : c.status === 'Payment Promised'
                          ? 'bg-green-100 text-green-700'
                          : c.status === 'Escalated'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-700'
                      )}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span
                      className={badge(
                        c.slaStatus === 'On Track'
                          ? 'bg-green-100 text-green-700'
                          : c.slaStatus === 'At Risk'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-red-100 text-red-700'
                      )}
                    >
                      {c.slaStatus}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onViewCase(c.id)}
                        className="p-1 text-[#263744] hover:bg-gray-200 rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleAssignClick(c.id)}
                        className="p-1 text-[#263744] hover:bg-gray-200 rounded"
                      >
                        <UserPlus className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing {filteredCases.length} of {mockCases.length} cases
        </p>
      </div>

      {showAssignModal && selectedCase && (
        <AssignCaseModal
          caseId={selectedCase}
          onClose={() => {
            setShowAssignModal(false);
            setSelectedCase(null);
          }}
        />
      )}
    </div>
  );
}
