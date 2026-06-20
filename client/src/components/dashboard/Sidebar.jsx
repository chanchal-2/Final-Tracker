import React from 'react';
import { 
  LayoutDashboard, 
  FolderGit2, 
  UploadCloud, 
  ClipboardList, 
  FileText, 
  Milestone, 
  Bell, 
  MessageSquare, 
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Activity,
  CheckSquare,
  Video,
  PieChart,
  Database,
  Settings,
  FolderKanban,
  Users,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar({ activeTab, setActiveTab, isCollapsed, setIsCollapsed }) {
  const { user, logout } = useAuth();

  const studentNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'progress-updates', label: 'Upload', icon: UploadCloud },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
  ];

  const guideNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'assigned-projects', label: 'Assigned Projects', icon: FolderGit2 },
    { id: 'approvals', label: 'Project Approvals', icon: CheckSquare },
    { id: 'reviews', label: 'Reviews', icon: CheckSquare },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'feedback', label: 'HOD Feedback', icon: MessageSquare },
  ];

  const hodNavItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'guides', label: 'Guide Management', icon: Users },
    { id: 'risk', label: 'Risk Monitoring', icon: AlertTriangle },
    { id: 'announcements', label: 'Announcements & Deadlines', icon: Bell },
    { id: 'repository', label: 'Document Repository', icon: Database }
  ];

  const navItems = user?.role === 'hod' ? hodNavItems : user?.role === 'guide' ? guideNavItems : studentNavItems;

  return (
    <aside 
      className={`fixed top-0 left-0 h-screen bg-[#0B1220] border-r border-slate-800 flex flex-col transition-all duration-300 z-40
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}
    >
      {/* Sidebar Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 shrink-0">
        {!isCollapsed && (
          <span className="text-base font-extrabold text-white tracking-tight">
            Project<span className="text-indigo-400">Tracker</span>
          </span>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center mx-auto text-white font-bold text-xs">
            PT
          </div>
        )}
        
        {/* Toggle Button for Desktop */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`hidden md:flex items-center justify-center w-6 h-6 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ${isCollapsed ? 'absolute -right-3 bg-[#0B1220] border border-slate-700' : ''}`}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
                isActive 
                  ? 'bg-indigo-600/10 text-indigo-400' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              } ${isCollapsed ? 'justify-center' : 'justify-start'}`}
              title={isCollapsed ? item.label : ''}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
              {!isCollapsed && (
                <span className={`text-xs font-semibold ${isActive ? 'font-bold' : ''}`}>
                  {item.label}
                </span>
              )}
              {/* Optional Badges could go here */}
            </button>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-slate-800 shrink-0">
        <button
          onClick={logout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all ${isCollapsed ? 'justify-center' : 'justify-start'}`}
          title={isCollapsed ? 'Logout' : ''}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span className="text-xs font-semibold">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
