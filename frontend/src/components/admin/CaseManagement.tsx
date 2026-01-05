import { useState } from 'react';
import { Search, Filter, Download, Plus, Eye, UserPlus } from 'lucide-react';
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

  const filteredCases = mockCases.filter(c => {
    const matchesSearch = c.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchesDCA = dcaFilter === 'all' || c.assignedDCA === dcaFilter;
    return matchesSearch && matchesStatus && matchesDCA;
  });

  const handleAssignClick = (caseId: string) => {
    setSelectedCase(caseId);
    setShowAssignModal(true);
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'New': 'bg-blue-100 text-blue-700',
      'In Progress': 'bg-yellow-100 text-yellow-700',
      'Payment Promised': 'bg-green-100 text-green-700',
      'Disputed': 'bg-orange-100 text-orange-700',
      'Closed': 'bg-gray-100 text-gray-700',
      'Escalated': 'bg-red-100 text-red-700',
    };
    return styles[status] || 'bg-gray-100 text-gray-700';
  };

  const getRiskBadge = (risk: string) => {
    const styles: Record<string, string> = {
      'Low': 'bg-green-100 text-green-700',
      'Medium': 'bg-yellow-100 text-yellow-700',
      'High': 'bg-orange-100 text-orange-700',
      'Critical': 'bg-red-100 text-red-700',
    };
    return styles[risk] || 'bg-gray-100 text-gray-700';
  };

  const getPriorityColor = (score: number) => {
    if (score >= 80) return 'text-red-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <div className="p-8">
      {/* Header Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by case number or customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>

          {/* Filters */}
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

          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-purple-700">
            <Plus className="w-4 h-4" />
            New Case
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Total Cases</p>
          <p className="text-2xl text-gray-900">{filteredCases.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">High Priority</p>
          <p className="text-2xl text-orange-600">{filteredCases.filter(c => c.aiPriorityScore >= 80).length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">SLA At Risk</p>
          <p className="text-2xl text-red-600">{filteredCases.filter(c => c.slaStatus !== 'On Track').length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Total Value</p>
          <p className="text-2xl text-gray-900">${(filteredCases.reduce((sum, c) => sum + c.invoiceAmount, 0) / 1000000).toFixed(2)}M</p>
        </div>
      </div>

      {/* Cases Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Case ID</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Customer</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Invoice Amount</th>
                <th className="text-center py-3 px-4 text-sm text-gray-600">Ageing Days</th>
                <th className="text-center py-3 px-4 text-sm text-gray-600">AI Priority</th>
                <th className="text-center py-3 px-4 text-sm text-gray-600">Risk Level</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Assigned DCA</th>
                <th className="text-center py-3 px-4 text-sm text-gray-600">Status</th>
                <th className="text-center py-3 px-4 text-sm text-gray-600">SLA</th>
                <th className="text-center py-3 px-4 text-sm text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.map((caseItem) => (
                <tr key={caseItem.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-sm text-gray-900">{caseItem.caseNumber}</td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-sm text-gray-900">{caseItem.customerName}</p>
                      <p className="text-xs text-gray-500">{caseItem.invoiceNumber}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900 text-right">${caseItem.invoiceAmount.toLocaleString()}</td>
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-flex px-2 py-1 rounded text-xs ${
                      caseItem.ageingDays > 90 ? 'bg-red-100 text-red-700' :
                      caseItem.ageingDays > 60 ? 'bg-orange-100 text-orange-700' :
                      caseItem.ageingDays > 30 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {caseItem.ageingDays}d
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`text-sm ${getPriorityColor(caseItem.aiPriorityScore)}`}>
                      {caseItem.aiPriorityScore}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-flex px-2 py-1 rounded text-xs ${getRiskBadge(caseItem.riskLevel)}`}>
                      {caseItem.riskLevel}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">{caseItem.assignedDCA}</td>
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-flex px-2 py-1 rounded text-xs ${getStatusBadge(caseItem.status)}`}>
                      {caseItem.status}
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
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onViewCase(caseItem.id)}
                        className="p-1 text-purple-600 hover:bg-purple-50 rounded"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleAssignClick(caseItem.id)}
                        className="p-1 text-indigo-600 hover:bg-indigo-50 rounded"
                        title="Assign/Reassign"
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

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredCases.length} of {mockCases.length} cases
        </p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Previous</button>
          <button className="px-3 py-1 bg-purple-600 text-white rounded text-sm">1</button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">2</button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">3</button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Next</button>
        </div>
      </div>

      {/* Assign Case Modal */}
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
