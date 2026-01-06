import { X } from 'lucide-react';
import { mockCases } from '../../data/mockData';
import { useState } from 'react';

interface AssignCaseModalProps {
  caseId: string;
  onClose: () => void;
}

export default function AssignCaseModal({
  caseId,
  onClose,
}: AssignCaseModalProps) {
  const caseItem = mockCases.find((c) => c.id === caseId);
  const [selectedDCA, setSelectedDCA] = useState(
    caseItem?.assignedDCA || ''
  );
  const [notes, setNotes] = useState('');

  if (!caseItem) return null;

  const dcaOptions = [
    { name: 'CollectPro Solutions', capacity: 12, activeLoad: 145 },
    { name: 'DebtCare Associates', capacity: 15, activeLoad: 132 },
    { name: 'RecoverNow Inc', capacity: 18, activeLoad: 118 },
  ];

  const handleAssign = () => {
    alert(
      `Case ${caseItem.caseNumber} assigned to ${selectedDCA}`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl text-gray-900">
              Assign Case to DCA
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {caseItem.caseNumber} – {caseItem.customerName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Case Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm text-gray-900 mb-3">
              Case Details
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">
                  Invoice Amount:
                </span>
                <span className="text-gray-900 ml-2">
                  ${caseItem.invoiceAmount.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-gray-600">
                  Ageing Days:
                </span>
                <span className="text-gray-900 ml-2">
                  {caseItem.ageingDays} days
                </span>
              </div>
              <div>
                <span className="text-gray-600">
                  AI Priority Score:
                </span>
                <span className="text-gray-900 ml-2">
                  {caseItem.aiPriorityScore}
                </span>
              </div>
              <div>
                <span className="text-gray-600">
                  Risk Level:
                </span>
                <span className="text-gray-900 ml-2">
                  {caseItem.riskLevel}
                </span>
              </div>
            </div>
          </div>

          {/* DCA Selection */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Select DCA
            </label>

            <div className="space-y-3">
              {dcaOptions.map((dca) => {
                const loadPercentage =
                  (dca.activeLoad /
                    (dca.activeLoad + dca.capacity)) *
                  100;

                return (
                  <button
                    key={dca.name}
                    onClick={() => setSelectedDCA(dca.name)}
                    className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                      selectedDCA === dca.name
                        ? 'border-[#263744] bg-[#f1f2f6]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-900">
                        {dca.name}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          loadPercentage < 70
                            ? 'bg-green-100 text-green-700'
                            : loadPercentage < 85
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {loadPercentage.toFixed(0)}% Load
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span>Active: {dca.activeLoad}</span>
                      <span>Capacity: {dca.capacity}</span>
                    </div>

                    <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          loadPercentage < 70
                            ? 'bg-green-500'
                            : loadPercentage < 85
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        style={{
                          width: `${loadPercentage}%`,
                        }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* AI Recommendation */}
          <div className="bg-[#f1f2f6] border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm text-gray-900 mb-2">
              AI Recommendation
            </h4>
            <p className="text-sm text-gray-700">
              {caseItem.recommendedAction}
            </p>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Assignment Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              placeholder="Add any special instructions or notes..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedDCA}
            className="px-4 py-2 bg-[#263744] text-white rounded-lg text-sm hover:bg-[#1b2833] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Assign Case
          </button>
        </div>
      </div>
    </div>
  );
}
