import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Topbar({ isCollapsed, setIsCollapsed, activeTab }) {
  const { user } = useAuth();

  // Simple title mapper
  const getTitle = () => {
    const titles = {
      'dashboard': user?.role === 'guide' ? 'Guide Dashboard' : 'Student Dashboard',
      'my-projects': 'My Projects',
      'assigned-projects': 'Assigned Projects',
      'upload-project': 'Upload Project',
      'progress-updates': 'Progress Updates',
      'student-progress': 'Student Progress',
      'documents': 'Documents',
      'milestones': 'Milestones',
      'notifications': 'Notifications',
      'feedback': 'Guide Feedback',
      'reviews': 'Reviews & Feedback',
      'meetings': 'Meetings',
      'reports': 'Reports',
      'profile': 'My Profile'
    };
    return titles[activeTab] || 'Dashboard';
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
      
      {/* Left section */}
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="md:hidden p-2 -ml-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <h1 className="text-lg font-bold text-slate-800 tracking-tight hidden sm:block">
          {getTitle()}
        </h1>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4 sm:gap-6">
        
        {/* Search */}
        <div className="hidden lg:flex items-center relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="pl-9 pr-4 py-2 w-64 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-rose-500 border-2 border-white rounded-full"></span>
        </button>

        {/* Divider */}
        <div className="w-[1px] h-6 bg-slate-200 hidden sm:block"></div>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="block text-xs font-bold text-slate-800">{user?.name}</span>
            <span className="block text-[10px] font-bold text-slate-400">
              {user?.role === 'guide' ? 'Guide / Faculty' : 'Student'}
            </span>
          </div>
          <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm border-2 border-white shadow-sm">
            {user?.role === 'guide' ? 'GD' : user?.name?.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}
