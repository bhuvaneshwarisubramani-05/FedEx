import {
  User,
  Mail,
  Phone,
  Building2,
  Award,
  TrendingUp,
  Target,
} from 'lucide-react';

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
            <div className="w-24 h-24 bg-[#263744] rounded-full flex items-center justify-center text-white text-3xl">
              SJ
            </div>

            <div className="flex-1">
              <h1 className="text-3xl text-gray-900 mb-2">
                {agentData.name}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                {agentData.role}
              </p>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{agentData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{agentData.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  <span>{agentData.dca}</span>
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
              {[
                ['Employee ID', agentData.employeeId],
                ['DCA', agentData.dca],
                ['Role', agentData.role],
                ['Region', agentData.region],
                [
                  'Join Date',
                  new Date(agentData.joinDate).toLocaleDateString(),
                ],
                ['Tenure', '10 months'],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-gray-600">{label}:</span>
                  <span className="text-gray-900">{value}</span>
                </div>
              ))}
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
                <span className="text-gray-600">Total Cases:</span>
                <span>{performanceStats.totalCasesHandled}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Cases:</span>
                <span className="text-yellow-600">
                  {performanceStats.activeCases}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Closed This Month:</span>
                <span className="text-green-600">
                  {performanceStats.closedCases}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Recovery Rate:</span>
                <span className="text-green-600">
                  {performanceStats.recoveryRate}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">SLA Compliance:</span>
                <span className="text-green-600">
                  {performanceStats.slaCompliance}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Recent Achievements
          </h3>

          <div className="space-y-4">
            {recentAchievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-[#f1f2f6] rounded-lg border border-gray-200"
                >
                  <div className="p-3 bg-[#d6d6e3] rounded-lg">
                    <Icon className="w-6 h-6 text-[#263744]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-900">
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {achievement.date}
                    </p>
                  </div>
                  <div className="px-3 py-1 bg-[#263744] text-white rounded text-sm">
                    Achieved
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
