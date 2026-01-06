import { Save, Settings as SettingsIcon, Users, AlertCircle, Brain } from 'lucide-react';
import { useState } from 'react';

export default function Settings() {
  const [slaDays, setSlaDays] = useState('30');
  const [escalationThreshold, setEscalationThreshold] = useState('80');
  const [autoAssignment, setAutoAssignment] = useState(true);
  const [aiEnabled, setAiEnabled] = useState(true);

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl text-gray-900 mb-1">System Settings</h2>
          <p className="text-gray-600">
            Configure SLA rules, DCA capacity, automation and AI controls
          </p>
        </div>

        {/* SLA CONFIG */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="text-lg text-gray-900">SLA Configuration</h3>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Default SLA Period (Days)
              </label>
              <input
                type="number"
                value={slaDays}
                onChange={(e) => setSlaDays(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Time allowed to resolve a case after assignment
              </p>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                SLA Warning Threshold (Days)
              </label>
              <input
                type="number"
                defaultValue="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                When a case is marked as “At Risk”
              </p>
            </div>
          </div>

          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-gray-600">Ageing Bucket</th>
                  <th className="text-right py-3 px-4 text-gray-600">SLA Days</th>
                  <th className="text-center py-3 px-4 text-gray-600">Auto Escalate</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['0–30 Days', 30],
                  ['31–60 Days', 21],
                  ['61–90 Days', 14],
                  ['90+ Days', 7],
                ].map(([label, days]) => (
                  <tr key={label} className="border-t border-gray-200">
                    <td className="py-3 px-4">{label}</td>
                    <td className="py-3 px-4 text-right">
                      <input
                        type="number"
                        defaultValue={days}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-right"
                      />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <input type="checkbox" defaultChecked />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* DCA CAPACITY */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Users className="w-5 h-5 text-[#263744]" />
            </div>
            <h3 className="text-lg text-gray-900">DCA Capacity Management</h3>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <input
              type="checkbox"
              checked={autoAssignment}
              onChange={(e) => setAutoAssignment(e.target.checked)}
            />
            <span className="text-sm text-gray-700">
              Enable automatic case assignment
            </span>
          </div>

          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-gray-600">DCA</th>
                  <th className="text-right py-3 px-4 text-gray-600">Max Capacity</th>
                  <th className="text-right py-3 px-4 text-gray-600">Current Load</th>
                  <th className="text-center py-3 px-4 text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['CollectPro Solutions', 200, 145],
                  ['DebtCare Associates', 180, 132],
                  ['RecoverNow Inc', 150, 118],
                ].map(([name, cap, load]) => (
                  <tr key={name} className="border-t border-gray-200">
                    <td className="py-3 px-4">{name}</td>
                    <td className="py-3 px-4 text-right">
                      <input
                        type="number"
                        defaultValue={cap}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-right"
                      />
                    </td>
                    <td className="py-3 px-4 text-right">{load}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI CONFIG */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Brain className="w-5 h-5 text-[#263744]" />
            </div>
            <h3 className="text-lg text-gray-900">AI & Automation</h3>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <input
              type="checkbox"
              checked={aiEnabled}
              onChange={(e) => setAiEnabled(e.target.checked)}
            />
            <span className="text-sm text-gray-700">
              Enable AI-based prioritization and recommendations
            </span>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                High Priority Threshold
              </label>
              <input
                type="number"
                value={escalationThreshold}
                onChange={(e) => setEscalationThreshold(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Auto Escalation Score
              </label>
              <input
                type="number"
                defaultValue="90"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>
        </div>

        {/* SAVE */}
        <div className="flex justify-end gap-3">
          <button className="px-6 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
            Reset
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-[#263744] text-white rounded-lg text-sm flex items-center gap-2 hover:bg-[#1b2833]"
          >
            <Save className="w-4 h-4" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
