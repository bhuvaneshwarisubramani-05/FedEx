// src/components/Admin/AdminDCAs.jsx
import { useState, useEffect } from 'react';
import { dcaService } from '../../services/dcaService';
import { Plus } from 'lucide-react';

export default function AdminDCAs() {
  const [dcas, setDcas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    dcaName: '',
    specialization: '',
    contactEmail: '',
    contactPhone: ''
  });

  useEffect(() => {
    fetchDCAs();
  }, []);

  const fetchDCAs = async () => {
    setLoading(true);
    try {
      const result = await dcaService.getAllDCAs();
      if (result.success) setDcas(result.data.dcas || []);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDCA = async () => {
    if (!formData.dcaName || !formData.specialization) {
      alert('Fill all required fields');
      return;
    }

    const result = await dcaService.createDCA(formData);
    if (result.success) {
      alert('DCA added successfully');
      setFormData({ dcaName: '', specialization: '', contactEmail: '', contactPhone: '' });
      setShowModal(false);
      fetchDCAs();
    } else {
      alert(result.error);
    }
  };

  if (loading) return <div className="text-center py-8">Loading DCAs...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Debt Collection Agencies ({dcas.length})</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          <Plus size={18} /> Add DCA
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Name</th>
              <th className="px-6 py-4 text-left font-semibold">Specialization</th>
              <th className="px-6 py-4 text-center font-semibold">Success Rate</th>
              <th className="px-6 py-4 text-center font-semibold">SOP Score</th>
              <th className="px-6 py-4 text-left font-semibold">Status</th>
              <th className="px-6 py-4 text-left font-semibold">Contact</th>
            </tr>
          </thead>
          <tbody>
            {dcas.map((dca) => (
              <tr key={dca.dcaId} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold text-gray-900">{dca.dcaName}</td>
                <td className="px-6 py-4 text-gray-700">{dca.specialization}</td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                    {dca.successRate}%
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
                    {dca.sopComplianceScore}%
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${dca.activeStatus ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {dca.activeStatus ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{dca.contactEmail || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add DCA Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Add New DCA</h3>

            <input
              type="text"
              placeholder="DCA Name *"
              value={formData.dcaName}
              onChange={(e) => setFormData({ ...formData, dcaName: e.target.value })}
              className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Specialization *"
              value={formData.specialization}
              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              placeholder="Email"
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="tel"
              placeholder="Phone"
              value={formData.contactPhone}
              onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
              className="w-full p-3 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex gap-3">
              <button
                onClick={handleAddDCA}
                className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 font-semibold"
              >
                Add DCA
              </button>
              <button
                onClick={() => setShowModal(false)}
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