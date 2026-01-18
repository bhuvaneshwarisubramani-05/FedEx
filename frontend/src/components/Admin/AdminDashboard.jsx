import { useState, useEffect } from 'react';
import { outcomeService } from '../../services/outcomeService';
import { StatsCard } from '../Shared/StatsCard';
import { formatCurrency } from '../../utils/helpers';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const result = await outcomeService.getRecoveryStats();
      if (result.success) setStats(result.data.statistics);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading dashboard...</div>;

  if (!stats) {
    return (
      <div className="text-center py-12 bg-white rounded-lg">
        <p className="text-gray-500 text-lg">No data available yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard label="Total Cases" value={stats.totalCases} icon="📊" color="blue" />
        <StatsCard label="Successful" value={stats.successfulCases} icon="✅" color="green" />
        <StatsCard label="Failed Cases" value={stats.failedCases} icon="❌" color="red" />
        <StatsCard label="Success Rate" value={stats.successRate} icon="📈" color="orange" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Total Recovered</h3>
          <p className="text-4xl font-bold text-green-600">{formatCurrency(stats.totalRecovered)}</p>
          <p className="text-gray-600 mt-2">Average per case: {formatCurrency(stats.averageRecovered)}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Average Recovery Time</h3>
          <p className="text-4xl font-bold text-blue-600">{stats.averageRecoveryDays} days</p>
          <p className="text-gray-600 mt-2">Time taken on average to recover</p>
        </div>
      </div>
    </div>
  );
}