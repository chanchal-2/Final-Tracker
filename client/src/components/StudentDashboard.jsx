import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from './dashboard/Sidebar';
import Topbar from './dashboard/Topbar';
import { AlertCircle } from 'lucide-react';

// Placeholder Views
import DashboardHome from './dashboard/views/DashboardHome';
import UploadProjectView from './dashboard/views/UploadProjectView';
import ProgressUpdatesView from './dashboard/views/ProgressUpdatesView';
import DocumentsView from './dashboard/views/DocumentsView';
import NotificationsView from './dashboard/views/NotificationsView';
import FeedbackView from './dashboard/views/FeedbackView';

export default function StudentDashboard() {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  const [project, setProject] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock project data for UI testing (when MongoDB is offline)
  const mockProject = {
    _id: 'proj_cse_04',
    title: 'AI-Powered Capstone Project Tracker',
    description: 'A full-stack web application for managing final year capstone projects with real-time tracking, guide feedback, and milestone management.',
    status: 'In Progress',
    progress: 72,
    guide: 'Dr. Ananya Rao',
    department: 'Computer Science',
    teamMembers: ['Naveen Malviya', 'Priya Patel', 'Rahul Kumar'],
    milestones: [
      { title: 'Project Proposal Submission', date: 'Jan 15, 2026', status: 'done' },
      { title: 'Literature Review', date: 'Feb 10, 2026', status: 'done' },
      { title: 'System Design Document', date: 'Mar 5, 2026', status: 'done' },
      { title: 'Prototype Development', date: 'Apr 20, 2026', status: 'active' },
      { title: 'Testing & QA', date: 'May 30, 2026', status: 'locked' },
      { title: 'Final Viva & Submission', date: 'Jun 25, 2026', status: 'locked' },
    ],
    documents: [
      { title: 'Project Proposal', type: 'PDF', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', uploadDate: new Date('2026-01-15') },
      { title: 'System Architecture Diagram', type: 'DOC', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', uploadDate: new Date('2026-03-05') },
    ],
    notifications: [
      { _id: 'n1', title: 'Milestone Due Soon', message: 'Prototype Development is due in 5 days.', isRead: false, type: 'warning' },
      { _id: 'n2', title: 'Guide Feedback Available', message: 'Dr. Ananya Rao has reviewed your system design document.', isRead: false, type: 'info' },
    ],
    feedback: [
      { _id: 'f1', comment: 'Good progress on the system design. Please add more detail to the API section.', date: new Date('2026-03-10'), guideName: 'Dr. Ananya Rao' }
    ]
  };

  // Fetch project details and logs
  const fetchData = async () => {
    try {
      // 1. Get project
      const projectRes = await fetch('/api/projects', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (projectRes.ok) {
        const projectData = await projectRes.json();
        if (projectData && projectData.length > 0) {
          const proj = projectData[0];
          setProject(proj);
          
          // 2. Get logs for this project
          const logsRes = await fetch(`/api/logs/${proj._id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (logsRes.ok) {
            const logsData = await logsRes.json();
            setLogs(logsData);
          }
          return; // Real data loaded, skip mock
        }
      }
      // Fallback to mock data if API fails or returns empty
      setProject(mockProject);
      setLogs([]);
    } catch (err) {
      console.error('Error fetching student dashboard data:', err);
      // Fallback to mock data on error
      setProject(mockProject);
      setLogs([]);
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
          Loading Workspace...
        </span>
      </div>
    );
  }

  // Handle No Project State
  if (!project) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
        <div className="bg-white border border-slate-100 rounded-[24px] p-12 shadow-premium text-center space-y-6 max-w-lg">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-[#0B1220]">No Registered Project Found</h2>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed max-w-md mx-auto">
            You are not currently linked to any active project group. Please contact the HOD/Department Coordinator to register your group and allocate your supervisor.
          </p>
        </div>
      </div>
    );
  }

  // Render the active view
  const renderActiveView = () => {
    const props = { project, setProject, logs, setLogs, token, user, setActiveTab };
    
    switch (activeTab) {
      case 'dashboard': return <DashboardHome {...props} />;
      case 'upload-project': return <ProgressUpdatesView {...props} />;  // merged into progress-updates
      case 'progress-updates': return <ProgressUpdatesView {...props} />;
      case 'documents': return <DocumentsView {...props} />;
      case 'notifications': return <NotificationsView {...props} />;
      case 'feedback': return <FeedbackView {...props} />;
      default: return <DashboardHome {...props} />;
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
