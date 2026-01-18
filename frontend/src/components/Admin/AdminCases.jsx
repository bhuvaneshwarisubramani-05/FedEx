// FILE 4: src/components/Admin/AdminCases.jsx
// ============================================
import { useState, useEffect } from 'react';
import { caseService } from '../../services/caseService';
import { dcaService } from '../../services/dcaService';
import { formatCurrency, formatDate, getStatusColor, getRiskColor, truncateId } from '../../utils/helpers';
import { Eye } from 'lucide-react';

export default function AdminCases() {
  const [cases, setCases] = useState([]);
  const [dcas, setDcas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedDCA, setSelectedDCA] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [casesRes, dcasRes] = await Promise.all([
        caseService.getAllCases(),
        dcaService.getAllDCAs()
      ]);

      if (casesRes.success) setCases(casesRes.data.cases || []);
      if (dcasRes.success) setDcas(dcasRes.data.dcas || []);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async () => {
    if (!selectedCase || !selectedDCA) {
      alert('Please select a DCA');
      return;
    }

    const result = await caseService.assignCase(selectedCase.caseId, selectedDCA);
    if (result.success) {
      alert('Case assigned successfully');
      setShowAssignModal(false);
      setSelectedDCA('');
      fetchData();
    } else {
      alert(result.error);
    }
  };

  if (loading) return <div className="text-center py-8">Loading cases...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Recovery Cases ({cases.length})</h2>
        <button
          onClick={fetchData}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-gray-900">Case ID</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-900">Customer</th>
              <th className="px-6 py-4 text-right font-semibold text-gray-900">Amount</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-900">Status</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-900">Risk Level</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-900">Days Overdue</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => (
              <tr key={c.caseId} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-mono text-sm text-gray-900">{truncateId(c.caseId)}</td>
                <td className="px-6 py-4 text-gray-900">{c.customer?.customerName || 'N/A'}</td>
                <td className="px-6 py-4 text-right font-semibold text-gray-900">{formatCurrency(c.amountDue)}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(c.caseStatus)}`}>
                    {c.caseStatus}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getRiskColor(c.riskLevel)}`}>
                    {c.riskLevel || 'N/A'}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-900 font-semibold">{c.daysOverdue}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      setSelectedCase(c);
                      setShowAssignModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                  >
                    <Eye size={16} /> Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Assign Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Assign Case to DCA</h3>
            <p className="text-gray-600 mb-4">Case ID: {truncateId(selectedCase?.caseId)}</p>

            <select
              value={selectedDCA}
              onChange={(e) => setSelectedDCA(e.target.value)}
              className="w-full p-3 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a DCA...</option>
              {dcas.map((dca) => (
                <option key={dca.dcaId} value={dca.dcaId}>
                  {dca.dcaName} (Success: {dca.successRate}%)
                </option>
              ))}
            </select>

            <div className="flex gap-3">
              <button
                onClick={handleAssign}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold"
              >
                Assign
              </button>
              <button
                onClick={() => setShowAssignModal(false)}
                className="flex-1 bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}