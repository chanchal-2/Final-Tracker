import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from './dashboard/Sidebar';
import Topbar from './dashboard/Topbar';

// HOD Views
import HodHomeView from './dashboard/hod-views/HodHomeView';
import ProjectApprovalView from './dashboard/hod-views/ProjectApprovalView';
import GuideManagementView from './dashboard/hod-views/GuideManagementView';
import AnnouncementsView from './dashboard/hod-views/AnnouncementsView';
import RiskMonitoringView from './dashboard/hod-views/RiskMonitoringView';
import DocumentRepositoryView from './dashboard/hod-views/DocumentRepositoryView';
import PlaceholderViews from './dashboard/hod-views/PlaceholderViews';

export default function HodDashboard() {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllProjects = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/projects`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error('Error fetching HOD dashboard data:', err);
      // Fallback to empty array on error (HOD views use simulated data)
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProjects();
    
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarCollapsed(true);
      } else {
        setIsSidebarCollapsed(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center font-sans gap-4">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest animate-pulse">
          Loading Command Center...
        </span>
      </div>
    );
  }

  const renderActiveView = () => {
    const props = { projects, setProjects, token, user, setActiveTab };
    
    switch (activeTab) {
      case 'dashboard': return <HodHomeView {...props} />;
      case 'approvals': return <ProjectApprovalView {...props} />;
      case 'guides': return <GuideManagementView {...props} />;
      case 'risk': return <RiskMonitoringView {...props} />;
      case 'repository': return <DocumentRepositoryView {...props} />;
      case 'announcements': return <AnnouncementsView {...props} />;
      default: return <HodHomeView {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-indigo-600 selection:text-white flex">
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        
        {/* Topbar */}
        <Topbar 
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          activeTab={activeTab}
        />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar relative">
          
          {/* Subtle Background Glow for HOD Premium Feel */}
          <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-[#0B1220]/5 to-transparent pointer-events-none -z-10"></div>
          
          <div className="max-w-7xl mx-auto">
            {renderActiveView()}
          </div>
        </main>
      </div>
    </div>
  );
}
