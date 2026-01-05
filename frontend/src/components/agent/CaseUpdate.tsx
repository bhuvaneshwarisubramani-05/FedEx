import { ArrowLeft, Phone, Mail, MessageSquare, AlertCircle, Upload, Save, Clock } from 'lucide-react';
import { mockCases } from '../../data/mockData';
import { useState } from 'react';

interface CaseUpdateProps {
  caseId: string;
  onBack: () => void;
}

export default function CaseUpdate({ caseId, onBack }: CaseUpdateProps) {
  const caseItem = mockCases.find(c => c.id === caseId);
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
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = calculateDaysRemaining(caseItem.slaDeadline);

  return (
    <div className="p-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to My Cases
      </button>

      {/* Case Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl text-gray-900 mb-2">{caseItem.caseNumber}</h1>
            <p className="text-lg text-gray-700">{caseItem.customerName}</p>
            <p className="text-sm text-gray-600">{caseItem.invoiceNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl text-gray-900">${caseItem.invoiceAmount.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-1">{caseItem.ageingDays} days overdue</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-200">
          <div>
            <p className="text-xs text-gray-600 mb-1">Customer Email</p>
            <p className="text-sm text-gray-900">{caseItem.customerEmail}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Customer Phone</p>
            <p className="text-sm text-gray-900">{caseItem.customerPhone}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">SLA Deadline</p>
            <p className={`text-sm ${
              daysRemaining < 0 ? 'text-red-600' :
              daysRemaining <= 5 ? 'text-orange-600' :
              'text-gray-900'
            }`}>
              {new Date(caseItem.slaDeadline).toLocaleDateString()} ({daysRemaining < 0 ? `${Math.abs(daysRemaining)}d overdue` : `${daysRemaining}d left`})
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Current Status</p>
            <span className={`inline-flex px-2 py-1 rounded text-xs ${
              caseItem.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
              caseItem.status === 'Payment Promised' ? 'bg-green-100 text-green-700' :
              'bg-blue-100 text-blue-700'
            }`}>
              {caseItem.status}
            </span>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg text-gray-900 mb-3">AI-Powered Insights</h3>
        <div className="grid grid-cols-3 gap-6 mb-4">
          <div>
            <p className="text-sm text-gray-700 mb-2">Priority Score</p>
            <p className="text-2xl text-purple-600">{caseItem.aiPriorityScore}/100</p>
          </div>
          <div>
            <p className="text-sm text-gray-700 mb-2">Recovery Probability</p>
            <p className="text-2xl text-purple-600">{caseItem.recoveryProbability}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-700 mb-2">Risk Level</p>
            <p className="text-2xl text-purple-600">{caseItem.riskLevel}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4">
          <h4 className="text-sm text-gray-900 mb-2">Recommended Action:</h4>
          <p className="text-sm text-gray-700">{caseItem.recommendedAction}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Update Form */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg text-gray-900 mb-4">Update Case Status</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Case Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Payment Promised">Payment Promised</option>
                  <option value="Disputed">Disputed</option>
                  <option value="Escalated">Escalated</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Action Taken</label>
                <select
                  value={actionType}
                  onChange={(e) => setActionType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="">Select action...</option>
                  <option value="call-made">Call Made</option>
                  <option value="email-sent">Email Sent</option>
                  <option value="payment-promised">Payment Promised</option>
                  <option value="dispute-raised">Dispute Raised</option>
                  <option value="left-voicemail">Left Voicemail</option>
                  <option value="no-response">No Response</option>
                </select>
              </div>

              {actionType === 'payment-promised' && (
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Payment Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm text-gray-700 mb-2">Notes / Comments</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="Enter details about your interaction with the customer..."
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Next Contact Date</label>
                <input
                  type="date"
                  value={nextContactDate}
                  onChange={(e) => setNextContactDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="px-4 py-3 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Log Call
              </button>
              <button className="px-4 py-3 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Send Email
              </button>
              <button className="px-4 py-3 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Add Comment
              </button>
              <button className="px-4 py-3 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Escalate
              </button>
            </div>
          </div>

          {/* Upload Documents */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg text-gray-900 mb-4">Upload Documents</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-500 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500">PDF, DOC, or image files</p>
            </div>
          </div>
        </div>

        {/* Case History & Documents */}
        <div className="space-y-6">
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
                    <div className="w-3 h-3 bg-indigo-600 rounded-full" />
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

          {/* Comments */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg text-gray-900 mb-4">Comments</h3>
            <div className="space-y-4">
              {caseItem.comments.length > 0 ? (
                caseItem.comments.map((comment) => (
                  <div key={comment.id} className="border-l-2 border-indigo-600 pl-4">
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
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg text-gray-900 mb-4">Documents</h3>
            <div className="space-y-2">
              {caseItem.documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-900">{doc.name}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(doc.uploadedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-700 text-sm">
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
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
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Update
        </button>
      </div>
    </div>
  );
}
