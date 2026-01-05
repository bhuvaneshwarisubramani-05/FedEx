import { ArrowLeft, Brain, TrendingUp, AlertTriangle, Clock, MessageSquare, FileText, Download } from 'lucide-react';
import { mockCases } from '../../data/mockData';

interface CaseDetailProps {
  caseId: string;
  onBack: () => void;
}

export default function CaseDetail({ caseId, onBack }: CaseDetailProps) {
  const caseItem = mockCases.find(c => c.id === caseId);

  if (!caseItem) {
    return (
      <div className="p-8">
        <p className="text-gray-600">Case not found</p>
      </div>
    );
  }

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

  return (
    <div className="p-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Cases
      </button>

      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl text-gray-900 mb-2">{caseItem.caseNumber}</h1>
            <p className="text-gray-600">{caseItem.customerName}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded text-sm ${getStatusBadge(caseItem.status)}`}>
              {caseItem.status}
            </span>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              Edit Case
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700">
              Reassign
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-6 mt-6 pt-6 border-t border-gray-200">
          <div>
            <p className="text-sm text-gray-600 mb-1">Invoice Amount</p>
            <p className="text-xl text-gray-900">${caseItem.invoiceAmount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Ageing Days</p>
            <p className="text-xl text-gray-900">{caseItem.ageingDays} days</p>
            <p className="text-xs text-gray-500">{caseItem.ageingBucket} bucket</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Assigned DCA</p>
            <p className="text-sm text-gray-900">{caseItem.assignedDCA}</p>
            {caseItem.assignedAgent && (
              <p className="text-xs text-gray-500">{caseItem.assignedAgent}</p>
            )}
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">SLA Deadline</p>
            <p className="text-sm text-gray-900">{new Date(caseItem.slaDeadline).toLocaleDateString()}</p>
            <span className={`inline-flex px-2 py-1 rounded text-xs mt-1 ${
              caseItem.slaStatus === 'On Track' ? 'bg-green-100 text-green-700' :
              caseItem.slaStatus === 'At Risk' ? 'bg-orange-100 text-orange-700' :
              'bg-red-100 text-red-700'
            }`}>
              {caseItem.slaStatus}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Customer Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg text-gray-900 mb-4">Customer Information</h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-gray-600">Name:</span>
              <p className="text-gray-900 mt-1">{caseItem.customerName}</p>
            </div>
            <div>
              <span className="text-gray-600">Email:</span>
              <p className="text-gray-900 mt-1">{caseItem.customerEmail}</p>
            </div>
            <div>
              <span className="text-gray-600">Phone:</span>
              <p className="text-gray-900 mt-1">{caseItem.customerPhone}</p>
            </div>
            <div>
              <span className="text-gray-600">Region:</span>
              <p className="text-gray-900 mt-1">{caseItem.region}</p>
            </div>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg text-gray-900 mb-4">Invoice Details</h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-gray-600">Invoice Number:</span>
              <p className="text-gray-900 mt-1">{caseItem.invoiceNumber}</p>
            </div>
            <div>
              <span className="text-gray-600">Amount:</span>
              <p className="text-gray-900 mt-1">${caseItem.invoiceAmount.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-gray-600">Due Date:</span>
              <p className="text-gray-900 mt-1">{new Date(caseItem.dueDate).toLocaleDateString()}</p>
            </div>
            <div>
              <span className="text-gray-600">Days Overdue:</span>
              <p className="text-gray-900 mt-1">{caseItem.ageingDays} days</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg text-gray-900 mb-4">Quick Stats</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Risk Level:</span>
              <span className={`px-2 py-1 rounded text-xs ${
                caseItem.riskLevel === 'Critical' ? 'bg-red-100 text-red-700' :
                caseItem.riskLevel === 'High' ? 'bg-orange-100 text-orange-700' :
                caseItem.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                {caseItem.riskLevel}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">AI Priority:</span>
              <span className="text-gray-900">{caseItem.aiPriorityScore}/100</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Recovery Prob:</span>
              <span className="text-gray-900">{caseItem.recoveryProbability}%</span>
            </div>
            <div className="pt-3 border-t border-gray-200">
              <span className="text-gray-600">Total Activities:</span>
              <p className="text-gray-900 mt-1">{caseItem.timeline.length} events</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-purple-600 rounded-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg text-gray-900 mb-2">AI-Powered Insights</h3>
            <div className="grid grid-cols-3 gap-6 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-gray-700">Recovery Probability</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-600"
                      style={{ width: `${caseItem.recoveryProbability}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-900">{caseItem.recoveryProbability}%</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-orange-600" />
                  <span className="text-sm text-gray-700">Risk Assessment</span>
                </div>
                <span className={`inline-flex px-3 py-1 rounded text-sm ${
                  caseItem.riskLevel === 'Critical' ? 'bg-red-100 text-red-700' :
                  caseItem.riskLevel === 'High' ? 'bg-orange-100 text-orange-700' :
                  caseItem.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {caseItem.riskLevel} Risk
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm text-gray-700">Priority Score</span>
                </div>
                <span className="text-2xl text-gray-900">{caseItem.aiPriorityScore}<span className="text-sm text-gray-600">/100</span></span>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="text-sm text-gray-900 mb-2">Recommended Action:</h4>
              <p className="text-sm text-gray-700">{caseItem.recommendedAction}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Timeline */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Case Timeline
          </h3>
          <div className="space-y-4">
            {caseItem.timeline.map((event) => (
              <div key={event.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-purple-600 rounded-full" />
                  <div className="w-px h-full bg-gray-200 mt-2" />
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm text-gray-900">{event.action}</p>
                    <span className="text-xs text-gray-500">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{event.details}</p>
                  <p className="text-xs text-gray-500 mt-1">by {event.user}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comments & Documents */}
        <div className="space-y-6">
          {/* Comments */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Comments ({caseItem.comments.length})
            </h3>
            <div className="space-y-4">
              {caseItem.comments.length > 0 ? (
                caseItem.comments.map((comment) => (
                  <div key={comment.id} className="border-l-2 border-purple-600 pl-4">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm text-gray-900">{comment.user}</p>
                      <span className="text-xs text-gray-500">
                        {new Date(comment.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{comment.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No comments yet</p>
              )}
              <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                Add Comment
              </button>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Documents ({caseItem.documents.length})
            </h3>
            <div className="space-y-3">
              {caseItem.documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-900">{doc.name}</p>
                      <p className="text-xs text-gray-500">
                        {doc.uploadedBy} • {new Date(doc.uploadedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <button className="p-1 text-purple-600 hover:bg-purple-50 rounded">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                Upload Document
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
