import { useState } from 'react';
import AdminLayout from './AdminLayout';
import AdminDashboard from './AdminDashboard';
import CaseManagement from './CaseManagement';
import CaseDetail from './CaseDetail';
import DCAPerformance from './DCAPerformance';
import SLAMonitoring from './SLAMonitoring';
import Settings from './Settings';

interface AdminPortalProps {
  onLogout: () => void;
}

export default function AdminPortal({ onLogout }: AdminPortalProps) {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'cases' | 'case-detail' | 'performance' | 'sla' | 'settings'>('dashboard');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  const handleViewCase = (caseId: string) => {
    setSelectedCaseId(caseId);
    setCurrentPage('case-detail');
  };

  const handleBackToCases = () => {
    setSelectedCaseId(null);
    setCurrentPage('cases');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <AdminDashboard onViewCases={() => setCurrentPage('cases')} />;
      case 'cases':
        return <CaseManagement onViewCase={handleViewCase} />;
      case 'case-detail':
        return <CaseDetail caseId={selectedCaseId!} onBack={handleBackToCases} />;
      case 'performance':
        return <DCAPerformance />;
      case 'sla':
        return <SLAMonitoring onViewCase={handleViewCase} />;
      case 'settings':
        return <Settings />;
      default:
        return <AdminDashboard onViewCases={() => setCurrentPage('cases')} />;
    }
  };

  return (
    <AdminLayout 
      currentPage={currentPage} 
      onNavigate={setCurrentPage}
      onLogout={onLogout}
    >
      {renderContent()}
    </AdminLayout>
  );
}
