import {
  ArrowLeft,
  Phone,
  Mail,
  MessageSquare,
  AlertCircle,
  Upload,
  Save,
  Clock,
} from 'lucide-react';
import { mockCases } from '../../data/mockData';
import { useState } from 'react';

interface CaseUpdateProps {
  caseId: string;
  onBack: () => void;
}

export default function CaseUpdate({ caseId, onBack }: CaseUpdateProps) {
  const caseItem = mockCases.find((c) => c.id === caseId);
  const [status, setStatus] = useState(caseItem?.status || 'In Progress');
  const [actionType, setActionType] = useState('');
  const [notes, setNotes] = useState('');
  const [nextContactDate, setNextContactDate] = useState('');

  if (!caseItem) {
    return (
      <div className="p-8">
        <p className="text-gray-600">Case not found</p>
      </div>
    );
  }

  const handleSave = () => {
    alert('Case updated successfully!');
    onBack();
  };

  const calculateDaysRemaining = (deadline: string) => {
    const today = new Date('2026-01-05');
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysRemaining = calculateDaysRemaining(caseItem.slaDeadline);

  return (
    <div className="p-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#263744] hover:text-[#1b2833] mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to My Cases
      </button>

      {/* Case Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl text-gray-900 mb-2">
              {caseItem.caseNumber}
            </h1>
            <p className="text-lg text-gray-700">
              {caseItem.customerName}
            </p>
            <p className="text-sm text-gray-600">
              {caseItem.invoiceNumber}
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl text-gray-900">
              ${caseItem.invoiceAmount.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {caseItem.ageingDays} days overdue
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-200">
          <div>
            <p className="text-xs text-gray-600 mb-1">Customer Email</p>
            <p className="text-sm">{caseItem.customerEmail}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Customer Phone</p>
            <p className="text-sm">{caseItem.customerPhone}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">SLA Deadline</p>
            <p
              className={`text-sm ${
                daysRemaining < 0
                  ? 'text-red-600'
                  : daysRemaining <= 5
                  ? 'text-orange-600'
                  : 'text-gray-900'
              }`}
            >
              {new Date(caseItem.slaDeadline).toLocaleDateString()} (
              {daysRemaining < 0
                ? `${Math.abs(daysRemaining)}d overdue`
                : `${daysRemaining}d left`}
              )
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Current Status</p>
            <span className="inline-flex px-2 py-1 rounded text-xs bg-[#f1f2f6] text-[#263744]">
              {caseItem.status}
            </span>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-[#f1f2f6] border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg text-gray-900 mb-3">
          AI-Powered Insights
        </h3>

        <div className="grid grid-cols-3 gap-6 mb-4">
          <div>
            <p className="text-sm text-gray-700 mb-2">Priority Score</p>
            <p className="text-2xl text-[#263744]">
              {caseItem.aiPriorityScore}/100
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-700 mb-2">
              Recovery Probability
            </p>
            <p className="text-2xl text-[#263744]">
              {caseItem.recoveryProbability}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-700 mb-2">Risk Level</p>
            <p className="text-2xl text-[#263744]">
              {caseItem.riskLevel}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4">
          <h4 className="text-sm text-gray-900 mb-2">
            Recommended Action
          </h4>
          <p className="text-sm text-gray-700">
            {caseItem.recommendedAction}
          </p>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-[#263744] text-white rounded-lg text-sm hover:bg-[#1b2833] flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Update
        </button>
      </div>
    </div>
  );
}
