import { User, Mail, Phone, Building2, Calendar, Award, TrendingUp, Target } from 'lucide-react';

export default function AgentProfile() {
  const agentData = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@collectpro.com',
    phone: '+1-555-0199',
    dca: 'CollectPro Solutions',
    role: 'Senior Collection Agent',
    joinDate: '2024-03-15',
    employeeId: 'CP-2024-156',
    region: 'North America',
  };

  const performanceStats = {
    totalCasesHandled: 156,
    activeCases: 3,
    closedCases: 12,
    recoveryRate: 72,
    avgResolutionDays: 26,
    slaCompliance: 95,
    customerSatisfaction: 4.6,
  };

  const recentAchievements = [
    { title: 'Top Performer - December 2025', date: 'Dec 2025', icon: Award },
    { title: '100 Cases Milestone', date: 'Nov 2025', icon: Target },
    { title: 'Excellent SLA Compliance', date: 'Oct 2025', icon: TrendingUp },
  ];

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl">
              SJ
            </div>
            <div className="flex-1">
              <h1 className="text-3xl text-gray-900 mb-2">{agentData.name}</h1>
              <p className="text-lg text-gray-600 mb-4">{agentData.role}</p>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{agentData.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{agentData.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{agentData.dca}</span>
                </div>
              </div>
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Employee ID:</span>
                <span className="text-gray-900">{agentData.employeeId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">DCA:</span>
                <span className="text-gray-900">{agentData.dca}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Role:</span>
                <span className="text-gray-900">{agentData.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Region:</span>
                <span className="text-gray-900">{agentData.region}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Join Date:</span>
                <span className="text-gray-900">{new Date(agentData.joinDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tenure:</span>
                <span className="text-gray-900">10 months</span>
              </div>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Performance Summary
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Cases Handled:</span>
                <span className="text-gray-900">{performanceStats.totalCasesHandled}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Cases:</span>
                <span className="text-yellow-600">{performanceStats.activeCases}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Closed This Month:</span>
                <span className="text-green-600">{performanceStats.closedCases}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Recovery Rate:</span>
                <span className="text-green-600">{performanceStats.recoveryRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Resolution Time:</span>
                <span className="text-gray-900">{performanceStats.avgResolutionDays} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">SLA Compliance:</span>
                <span className="text-green-600">{performanceStats.slaCompliance}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg text-gray-900 mb-6">Performance Metrics</h3>
          <div className="grid grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">Cases Resolved</p>
              <p className="text-3xl text-gray-900 mb-2">{performanceStats.totalCasesHandled}</p>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: '85%' }} />
              </div>
              <p className="text-xs text-gray-500 mt-1">85% of target</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Recovery Rate</p>
              <p className="text-3xl text-green-600 mb-2">{performanceStats.recoveryRate}%</p>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: `${performanceStats.recoveryRate}%` }} />
              </div>
              <p className="text-xs text-gray-500 mt-1">Above average</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">SLA Compliance</p>
              <p className="text-3xl text-green-600 mb-2">{performanceStats.slaCompliance}%</p>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: `${performanceStats.slaCompliance}%` }} />
              </div>
              <p className="text-xs text-gray-500 mt-1">Excellent</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Satisfaction</p>
              <p className="text-3xl text-indigo-600 mb-2">{performanceStats.customerSatisfaction}/5</p>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500" style={{ width: `${(performanceStats.customerSatisfaction / 5) * 100}%` }} />
              </div>
              <p className="text-xs text-gray-500 mt-1">Customer rating</p>
            </div>
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Recent Achievements
          </h3>
          <div className="space-y-4">
            {recentAchievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-900">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.date}</p>
                  </div>
                  <div className="px-3 py-1 bg-purple-600 text-white rounded text-sm">
                    Achieved
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Monthly Performance Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg text-gray-900 mb-4">Monthly Performance (Last 6 Months)</h3>
          <div className="space-y-4">
            {[
              { month: 'Aug 2025', cases: 22, recovery: 68 },
              { month: 'Sep 2025', cases: 25, recovery: 71 },
              { month: 'Oct 2025', cases: 28, recovery: 70 },
              { month: 'Nov 2025', cases: 26, recovery: 73 },
              { month: 'Dec 2025', cases: 30, recovery: 75 },
              { month: 'Jan 2026', cases: 12, recovery: 72 },
            ].map((data, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700">{data.month}</span>
                  <div className="flex items-center gap-6">
                    <span className="text-sm text-gray-600">{data.cases} cases</span>
                    <span className="text-sm text-green-600">{data.recovery}% recovery</span>
                  </div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500" style={{ width: `${data.recovery}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
