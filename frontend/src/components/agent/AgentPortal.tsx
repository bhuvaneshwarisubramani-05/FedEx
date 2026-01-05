import { useState } from 'react';
import AgentLayout from './AgentLayout';
import AgentDashboard from './AgentDashboard';
import MyCases from './MyCases';
import CaseUpdate from './CaseUpdate';
import Notifications from './Notifications';
import AgentProfile from './AgentProfile';

interface AgentPortalProps {
  onLogout: () => void;
}

export default function AgentPortal({ onLogout }: AgentPortalProps) {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'cases' | 'case-update' | 'notifications' | 'profile'>('dashboard');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  const handleUpdateCase = (caseId: string) => {
    setSelectedCaseId(caseId);
    setCurrentPage('case-update');
  };

  const handleBackToCases = () => {
    setSelectedCaseId(null);
    setCurrentPage('cases');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <AgentDashboard onViewCases={() => setCurrentPage('cases')} />;
      case 'cases':
        return <MyCases onUpdateCase={handleUpdateCase} />;
      case 'case-update':
        return <CaseUpdate caseId={selectedCaseId!} onBack={handleBackToCases} />;
      case 'notifications':
        return <Notifications onViewCase={handleUpdateCase} />;
      case 'profile':
        return <AgentProfile />;
      default:
        return <AgentDashboard onViewCases={() => setCurrentPage('cases')} />;
    }
  };

  return (
    <AgentLayout
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      onLogout={onLogout}
    >
      {renderContent()}
    </AgentLayout>
  );
}
