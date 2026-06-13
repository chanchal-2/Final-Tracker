import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from './dashboard/Sidebar';
import Topbar from './dashboard/Topbar';
import { AlertCircle } from 'lucide-react';

// Guide Views
import GuideHomeView from './dashboard/guide-views/GuideHomeView';
import AssignedProjectsView from './dashboard/guide-views/AssignedProjectsView';
import StudentProgressView from './dashboard/guide-views/StudentProgressView';
import GuideMilestonesView from './dashboard/guide-views/GuideMilestonesView';
import ReviewsFeedbackView from './dashboard/guide-views/ReviewsFeedbackView';
import PlaceholderViews from './dashboard/guide-views/PlaceholderViews';

export default function GuideDashboard() {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all assigned projects
  const fetchData = async () => {
    try {
      const res = await fetch('/api/projects', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error('Error fetching guide dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Auto-collapse sidebar on small screens
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarCollapsed(true);
      } else {
        setIsSidebarCollapsed(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    return () => window.removeEventListener('resize', handleResize);
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center font-sans gap-4">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest animate-pulse">
          Loading Guide Workspace...
        </span>
      </div>
    );
  }

  // Render the active view
  const renderActiveView = () => {
    const props = { projects, setProjects, token, user, setActiveTab };
    
    switch (activeTab) {
      case 'dashboard': return <GuideHomeView {...props} />;
      case 'assigned-projects': return <AssignedProjectsView {...props} />;
      case 'student-progress': return <StudentProgressView {...props} />;
      case 'milestones': return <GuideMilestonesView {...props} />;
      case 'reviews': return <ReviewsFeedbackView {...props} />;
      case 'documents': return <PlaceholderViews.Documents {...props} />;
      case 'meetings': return <PlaceholderViews.Meetings {...props} />;
      case 'notifications': return <PlaceholderViews.Notifications {...props} />;
      case 'reports': return <PlaceholderViews.Reports {...props} />;
      case 'profile': return <PlaceholderViews.Profile {...props} />;
      default: return <GuideHomeView {...props} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isCollapsed={isSidebarCollapsed} 
        setIsCollapsed={setIsSidebarCollapsed} 
      />
      
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Topbar 
          activeTab={activeTab} 
          isCollapsed={isSidebarCollapsed} 
          setIsCollapsed={setIsSidebarCollapsed} 
        />
        
        <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            {renderActiveView()}
          </div>
        </main>
      </div>
    </div>
  );
}
