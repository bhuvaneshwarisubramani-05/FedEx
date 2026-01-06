import { useState } from 'react';
import { Search, Eye, Clock, AlertCircle } from 'lucide-react';
import { mockCases } from '../../data/mockData';

interface MyCasesProps {
  onUpdateCase: (caseId: string) => void;
}

export default function MyCases({ onUpdateCase }: MyCasesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter only cases assigned to Sarah Johnson
  const myCases = mockCases.filter(
    (c) => c.assignedAgent === 'Sarah Johnson'
  );

  const filteredCases = myCases.filter((c) => {
    const matchesSearch =
      c.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || c.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const calculateDaysRemaining = (deadline: string) => {
    const today = new Date('2026-01-05');
    const deadlineDate = new Date(deadline);
    return Math.ceil(
      (deadlineDate.getTime() - today.getTime()) /
        (1000 * 60 * 60 * 24)
    );
  };

  return (
    <div className="p-8">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
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
          </select>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <SummaryCard label="Total Assigned" value={myCases.length} />
        <SummaryCard
          label="In Progress"
          value={myCases.filter((c) => c.status === 'In Progress').length}
          valueClass="text-yellow-600"
        />
        <SummaryCard
          label="Payment Promised"
          value={
            myCases.filter((c) => c.status === 'Payment Promised').length
          }
          valueClass="text-green-600"
        />
        <SummaryCard
          label="SLA At Risk"
          value={
            myCases.filter((c) => c.slaStatus !== 'On Track').length
          }
          valueClass="text-orange-600"
        />
      </div>

      {/* Cases List */}
      <div className="space-y-4">
        {filteredCases.map((caseItem) => {
          const daysRemaining = calculateDaysRemaining(
            caseItem.slaDeadline
          );

          return (
            <div
              key={caseItem.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg text-gray-900">
                      {caseItem.caseNumber}
                    </h3>

                    <span className="inline-flex px-2 py-1 rounded text-xs bg-[#f1f2f6] text-[#263744]">
                      {caseItem.status}
                    </span>

                    {(caseItem.slaStatus === 'At Risk' ||
                      caseItem.slaStatus === 'Breached') && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">
                        <AlertCircle className="w-3 h-3" />
                        SLA {caseItem.slaStatus}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-900 mb-1">
                    {caseItem.customerName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {caseItem.invoiceNumber}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-2xl text-gray-900">
                    ${caseItem.invoiceAmount.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {caseItem.ageingDays} days overdue
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-4 pb-4 border-b border-gray-200">
                <InfoBlock
                  label="AI Priority"
                  value={`${caseItem.aiPriorityScore}/100`}
                  valueClass={
                    caseItem.aiPriorityScore >= 80
                      ? 'text-red-600'
                      : caseItem.aiPriorityScore >= 60
                      ? 'text-orange-600'
                      : 'text-green-600'
                  }
                />
                <InfoBlock
                  label="Recovery Prob."
                  value={`${caseItem.recoveryProbability}%`}
                />
                <InfoBlock
                  label="Risk Level"
                  value={caseItem.riskLevel}
                />
                <div>
                  <p className="text-xs text-gray-600 mb-1">
                    SLA Deadline
                  </p>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gray-600" />
                    <p
                      className={`text-sm ${
                        daysRemaining < 0
                          ? 'text-red-600'
                          : daysRemaining <= 5
                          ? 'text-orange-600'
                          : 'text-gray-900'
                      }`}
                    >
                      {daysRemaining < 0
                        ? `${Math.abs(daysRemaining)}d overdue`
                        : `${daysRemaining}d left`}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs text-gray-600 mb-1">
                    AI Recommendation
                  </p>
                  <p className="text-sm text-gray-900">
                    {caseItem.recommendedAction}
                  </p>
                </div>

                <button
                  onClick={() => onUpdateCase(caseItem.id)}
                  className="ml-4 px-4 py-2 bg-[#263744] text-white rounded-lg text-sm hover:bg-[#1b2833] flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Update Case
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCases.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-600">
            No cases found matching your filters.
          </p>
        </div>
      )}
    </div>
  );
}

/* ---------- Small helper components ---------- */

function SummaryCard({
  label,
  value,
  valueClass = 'text-gray-900',
}: {
  label: string;
  value: number;
  valueClass?: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className={`text-2xl ${valueClass}`}>{value}</p>
    </div>
  );
}

function InfoBlock({
  label,
  value,
  valueClass = 'text-gray-900',
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div>
      <p className="text-xs text-gray-600 mb-1">{label}</p>
      <p className={`text-sm ${valueClass}`}>{value}</p>
    </div>
  );
}
