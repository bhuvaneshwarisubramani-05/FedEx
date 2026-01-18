// src/components/Admin/AdminSOP.jsx
import { useState, useEffect } from 'react';
import { sopService } from '../../services/sopService';

export default function AdminSOP() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const result = await sopService.getAllTemplates();
      if (result.success) setTemplates(result.data.templates || []);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading SOP Templates...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">SOP Templates</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => (
          <div key={template.sopId} className="bg-white rounded-lg shadow p-6 border-l-4 border-indigo-500">
            <h3 className="text-lg font-bold text-gray-900 mb-2">{template.sopName}</h3>
            <p className="text-sm text-gray-600 mb-4">{template.description || 'No description'}</p>

            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-700">
                <strong>Risk Level:</strong> <span className="font-mono text-indigo-600">{template.applicableRiskLevel}</span>
              </p>
              <p className="text-sm text-gray-700">
                <strong>Version:</strong> {template.version}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Steps:</strong> {template.steps?.length || 0}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Status:</strong> <span className={`px-2 py-1 rounded text-xs font-semibold ${template.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {template.isActive ? 'Active' : 'Inactive'}
                </span>
              </p>
            </div>

            {template.steps && template.steps.length > 0 && (
              <div className="border-t pt-4">
                <h4 className="font-semibold text-sm text-gray-900 mb-3">Steps:</h4>
                <div className="space-y-2">
                  {template.steps.map((step, idx) => (
                    <div key={step.stepId} className="bg-gray-50 p-2 rounded text-xs">
                      <div className="flex justify-between">
                        <span className="font-semibold">{idx + 1}. {step.actionType}</span>
                        <span className="text-gray-600">{step.dueInDays}d</span>
                      </div>
                      <p className="text-gray-600 mt-1">{step.description || 'No description'}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {templates.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500 text-lg">No SOP templates found</p>
        </div>
      )}
    </div>
  );
}