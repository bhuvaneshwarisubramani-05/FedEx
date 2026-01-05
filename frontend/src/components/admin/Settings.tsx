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
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-2xl text-gray-900 mb-2">System Settings</h2>
          <p className="text-gray-600">Configure SLA rules, DCA capacity, and AI thresholds</p>
        </div>

        {/* SLA Configuration */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg text-gray-900">SLA Configuration</h3>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
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
                  Number of days from case assignment to resolution deadline
                </p>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  SLA Warning Threshold (Days)
                </label>
                <input
                  type="number"
                  value="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Days before deadline to mark case as "At Risk"
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                SLA Rules by Case Type
              </label>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 text-gray-600">Case Type</th>
                      <th className="text-right py-3 px-4 text-gray-600">SLA Days</th>
                      <th className="text-center py-3 px-4 text-gray-600">Auto-Escalate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-200">
                      <td className="py-3 px-4">0-30 Days Overdue</td>
                      <td className="py-3 px-4 text-right">
                        <input type="number" defaultValue="30" className="w-20 px-2 py-1 border border-gray-300 rounded text-right" />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <input type="checkbox" defaultChecked />
                      </td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="py-3 px-4">31-60 Days Overdue</td>
                      <td className="py-3 px-4 text-right">
                        <input type="number" defaultValue="21" className="w-20 px-2 py-1 border border-gray-300 rounded text-right" />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <input type="checkbox" defaultChecked />
                      </td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="py-3 px-4">61-90 Days Overdue</td>
                      <td className="py-3 px-4 text-right">
                        <input type="number" defaultValue="14" className="w-20 px-2 py-1 border border-gray-300 rounded text-right" />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <input type="checkbox" defaultChecked />
                      </td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="py-3 px-4">90+ Days Overdue</td>
                      <td className="py-3 px-4 text-right">
                        <input type="number" defaultValue="7" className="w-20 px-2 py-1 border border-gray-300 rounded text-right" />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <input type="checkbox" defaultChecked />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* DCA Capacity Management */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Users className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="text-lg text-gray-900">DCA Capacity Management</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <input
                type="checkbox"
                id="autoAssignment"
                checked={autoAssignment}
                onChange={(e) => setAutoAssignment(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="autoAssignment" className="text-sm text-gray-700">
                Enable automatic case assignment based on capacity and performance
              </label>
            </div>

            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-gray-600">DCA Name</th>
                    <th className="text-right py-3 px-4 text-gray-600">Max Capacity</th>
                    <th className="text-right py-3 px-4 text-gray-600">Current Load</th>
                    <th className="text-center py-3 px-4 text-gray-600">Auto-Assign</th>
                    <th className="text-center py-3 px-4 text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200">
                    <td className="py-3 px-4">CollectPro Solutions</td>
                    <td className="py-3 px-4 text-right">
                      <input type="number" defaultValue="200" className="w-20 px-2 py-1 border border-gray-300 rounded text-right" />
                    </td>
                    <td className="py-3 px-4 text-right">145</td>
                    <td className="py-3 px-4 text-center">
                      <input type="checkbox" defaultChecked />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Active</span>
                    </td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-3 px-4">DebtCare Associates</td>
                    <td className="py-3 px-4 text-right">
                      <input type="number" defaultValue="180" className="w-20 px-2 py-1 border border-gray-300 rounded text-right" />
                    </td>
                    <td className="py-3 px-4 text-right">132</td>
                    <td className="py-3 px-4 text-center">
                      <input type="checkbox" defaultChecked />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Active</span>
                    </td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-3 px-4">RecoverNow Inc</td>
                    <td className="py-3 px-4 text-right">
                      <input type="number" defaultValue="150" className="w-20 px-2 py-1 border border-gray-300 rounded text-right" />
                    </td>
                    <td className="py-3 px-4 text-right">118</td>
                    <td className="py-3 px-4 text-center">
                      <input type="checkbox" defaultChecked />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Active</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* AI Configuration */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Brain className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg text-gray-900">AI & Automation Settings</h3>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="aiEnabled"
                checked={aiEnabled}
                onChange={(e) => setAiEnabled(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="aiEnabled" className="text-sm text-gray-700">
                Enable AI-powered priority scoring and recommendations
              </label>
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
                  min="0"
                  max="100"
                />
                <p className="text-xs text-gray-500 mt-1">
                  AI scores above this value are marked as high priority
                </p>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Auto-Escalation Score
                </label>
                <input
                  type="number"
                  defaultValue="90"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                  min="0"
                  max="100"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Automatically escalate cases with scores above this threshold
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-3">
                AI Model Configuration
              </label>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-gray-900">Recovery Probability Model</p>
                    <p className="text-xs text-gray-600">Predicts likelihood of successful recovery</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Active</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-gray-900">Risk Assessment Model</p>
                    <p className="text-xs text-gray-600">Evaluates customer payment risk level</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Active</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-gray-900">Action Recommendation Engine</p>
                    <p className="text-xs text-gray-600">Suggests optimal recovery strategies</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <SettingsIcon className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg text-gray-900">Notification Preferences</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <label className="text-sm text-gray-700">Email alerts for SLA breaches</label>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <label className="text-sm text-gray-700">Daily performance summary reports</label>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <label className="text-sm text-gray-700">Weekly DCA performance reviews</label>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" className="w-4 h-4" />
              <label className="text-sm text-gray-700">Real-time case status updates</label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end gap-3">
          <button className="px-6 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
            Reset to Defaults
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
