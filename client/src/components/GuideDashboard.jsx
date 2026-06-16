import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from './dashboard/Sidebar';
import Topbar from './dashboard/Topbar';

// Guide Views
import GuideHomeView from './dashboard/guide-views/GuideHomeView';
import AssignedProjectsView from './dashboard/guide-views/AssignedProjectsView';
import StudentProgressView from './dashboard/guide-views/StudentProgressView';
import GuideMilestonesView from './dashboard/guide-views/GuideMilestonesView';
import ReviewsFeedbackView from './dashboard/guide-views/ReviewsFeedbackView';
import ReportsView from './dashboard/guide-views/ReportsView';
import DocumentsView from './dashboard/guide-views/DocumentsView';
import NotificationsView from './dashboard/guide-views/NotificationsView';
import PlaceholderViews from './dashboard/guide-views/PlaceholderViews';
import ProjectApprovalView from './dashboard/hod-views/ProjectApprovalView';

// ── Mock data defined at module level so it's always stable ──────────────────
const MOCK_PROJECTS = [
  {
    _id: 'proj_cse_04',
    projectId: 'CSE-2026-001',
    title: 'AI-Powered Capstone Project Tracker',
    description: 'A full-stack web application for managing final year capstone projects with real-time tracking, guide feedback, and milestone management.',
    status: 'Approved',
    progress: 72,
    student: 'Naveen Malviya',
    team: 'Naveen Malviya, Priya Patel, Rahul Kumar',
    department: 'Computer Science',
    guide: 'Dr. Ananya Rao',
    documents: [
      { title: 'Project Proposal', type: 'Report', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', uploadDate: '2026-01-15' },
      { title: 'System Architecture Diagram', type: 'Report', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', uploadDate: '2026-03-05' },
    ],
    milestones: [
      { title: 'Project Proposal Submission', date: 'Jan 15, 2026', status: 'done' },
      { title: 'Literature Review', date: 'Feb 10, 2026', status: 'done' },
      { title: 'System Design Document', date: 'Mar 5, 2026', status: 'done' },
      { title: 'Prototype Development', date: 'Apr 20, 2026', status: 'active' },
    ],
    feedback: [
      { _id: 'f1', message: 'Good progress on the system design. Please add more detail to the API section.', createdAt: new Date('2026-03-10'), guide: 'Dr. Ananya Rao' }
    ],
    logs: [
      { log: 'Completed authentication module and connected to MongoDB. Starting UI polish.', createdAt: '2026-04-01' }
    ],
  },
  {
    _id: 'mock-proj-002',
    projectId: 'CSE-2026-002',
    title: 'Smart Campus Navigation System',
    description: 'An IoT-based indoor navigation system using BLE beacons and a mobile app to help students navigate campus buildings.',
    status: 'Approved',
    progress: 58,
    student: 'Ananya Singh',
    team: 'Ananya Singh',
    department: 'Computer Science',
    guide: 'Dr. Ananya Rao',
    documents: [
      { title: 'BLE Research Paper', type: 'Report', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', uploadDate: '2026-02-10' },
    ],
    milestones: [
      { title: 'Hardware Setup & BLE Config', date: 'Feb 01, 2026', status: 'done' },
      { title: 'Mobile App Prototype', date: 'Apr 10, 2026', status: 'active' },
      { title: 'Final System Integration', date: 'May 30, 2026', status: 'locked' },
    ],
    feedback: [],
    logs: [
      { log: 'BLE beacon firmware flashed successfully. Starting mobile app UI development.', createdAt: '2026-03-20' }
    ],
  },
  {
    _id: 'mock-proj-003',
    projectId: 'CSE-2026-003',
    title: 'Blockchain-Based Certificate Verification',
    description: 'A decentralized system for issuing and verifying academic certificates using Ethereum smart contracts and IPFS storage.',
    status: 'Delayed',
    progress: 35,
    student: 'Rohan Mehta',
    team: 'Rohan Mehta',
    department: 'Computer Science',
    guide: 'Dr. Ananya Rao',
    documents: [],
    milestones: [
      { title: 'Smart Contract Draft', date: 'Mar 01, 2026', status: 'done' },
      { title: 'Backend API Development', date: 'Apr 15, 2026', status: 'active' },
      { title: 'Frontend & Testing', date: 'May 20, 2026', status: 'locked' },
    ],
    feedback: [
      { message: 'Submission is behind schedule. Please share an updated timeline by this week.', guideName: 'Dr. Ananya Rao', date: '2026-04-05' }
    ],
    logs: [],
  },
  {
    _id: 'mock-proj-004',
    projectId: 'CSE-2026-004',
    title: 'Predictive Health Monitoring Dashboard',
    description: 'A real-time health monitoring web dashboard that uses ML models to predict early signs of common diseases from wearable sensor data.',
    status: 'Pending',
    progress: 20,
    student: 'Meera Joshi',
    team: 'Meera Joshi',
    department: 'Computer Science',
    guide: 'Dr. Ananya Rao',
    documents: [
      { title: 'Initial Proposal Document', type: 'Report', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', uploadDate: '2026-01-20' },
    ],
    milestones: [
      { title: 'Dataset Collection & Preprocessing', date: 'Feb 20, 2026', status: 'done' },
      { title: 'ML Model Training', date: 'Apr 30, 2026', status: 'active' },
      { title: 'Dashboard Development', date: 'Jun 01, 2026', status: 'locked' },
    ],
    feedback: [],
    logs: [
      { log: 'Collected 10,000 patient records. Model accuracy at 78%. Starting hyperparameter tuning.', createdAt: '2026-03-15' }
    ],
  },
  {
    _id: 'mock-proj-005',
    projectId: 'CSE-2026-005',
    title: 'E-Learning Platform with Adaptive Quizzes',
    description: 'An adaptive online learning platform that personalizes quiz difficulty based on student performance using collaborative filtering.',
    status: 'At Risk',
    progress: 15,
    student: 'Deepak Verma',
    team: 'Deepak Verma',
    department: 'Computer Science',
    guide: 'Dr. Ananya Rao',
    documents: [],
    milestones: [
      { title: 'UI/UX Design Mockups', date: 'Mar 10, 2026', status: 'active' },
      { title: 'Backend REST API', date: 'May 01, 2026', status: 'locked' },
      { title: 'ML Recommendation Engine', date: 'Jun 10, 2026', status: 'locked' },
    ],
    feedback: [
      { message: 'Progress is critically behind schedule. Immediate corrective action is required.', guideName: 'Dr. Ananya Rao', date: '2026-04-10' }
    ],
    logs: [],
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function GuideDashboard() {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Initialize with mock data immediately so views are never empty
  const [projects, setProjects] = useState(MOCK_PROJECTS);
  const [loading, setLoading] = useState(false);

  // Try to fetch real data from API (replaces mock if successful)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/projects', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setProjects(data);
          }
          // else keep mock data
        }
        // else keep mock data (401, 403, etc.)
      } catch (err) {
        // Network error — keep mock data
        console.warn('API unavailable, using mock data:', err.message);
      }
    };

    fetchData();

    // Auto-collapse sidebar on small screens
    const handleResize = () => {
      setIsSidebarCollapsed(window.innerWidth < 1024);
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
      case 'approvals': return <ProjectApprovalView {...props} />;
      case 'milestones': return <GuideMilestonesView {...props} />;
      case 'reviews': return <ReviewsFeedbackView {...props} />;
      case 'documents': return <DocumentsView {...props} />;
      case 'meetings': return <PlaceholderViews.Meetings {...props} />;
      case 'notifications': return <NotificationsView {...props} />;
      case 'reports': return <ReportsView {...props} />;
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
