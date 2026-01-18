// src/components/CreditManager/CMDashboard.jsx
import { useState, useEffect } from 'react';
import { caseService } from '../../services/caseService';
import { formatCurrency, formatDate, getStatusColor, truncateId } from '../../utils/helpers';

export default function CMDashboard() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    setLoading(true);
    try {
      const result = await caseService.getAllCases();
      if (result.success) setCases(result.data.cases || []);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading cases...</div>;

  const openCases = cases.filter(c => c.caseStatus !== 'CLOSED').length;
  const closedCases = cases.filter(c => c.caseStatus === 'CLOSED').length;
  const totalAmount = cases.reduce((sum, c) => sum + (c.amountDue || 0), 0);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm">Assigned Cases</p>
          <p className="text-4xl font-bold text-blue-900 mt-2">{cases.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
          <p className="text-gray-600 text-sm">Open Cases</p>
          <p className="text-4xl font-bold text-yellow-900 mt-2">{openCases}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm">Closed Cases</p>
          <p className="text-4xl font-bold text-green-900 mt-2">{closedCases}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-bold">My Assigned Cases</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Case ID</th>
              <th className="px-6 py-4 text-left font-semibold">Customer</th>
              <th className="px-6 py-4 text-right font-semibold">Amount</th>
              <th className="px-6 py-4 text-left font-semibold">Status</th>
              <th className="px-6 py-4 text-right font-semibold">Days Overdue</th>
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
                <td className="px-6 py-4 text-right font-bold text-gray-900">{c.daysOverdue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}