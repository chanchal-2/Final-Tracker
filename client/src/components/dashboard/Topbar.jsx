import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, Menu, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Topbar({ isCollapsed, setIsCollapsed, activeTab }) {
  const { user, token } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef(null);

  const fetchNotifications = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/notifications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    } catch (err) {
      console.error('Failed to fetch notifications', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Poll every 30 seconds for new notifications
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [token]);

  useEffect(() => {
    // Close dropdown if clicked outside
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAsRead = async (id) => {
    try {
      await fetch(`/api/notifications/${id}/read`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
    } catch (err) {
      console.error(err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch(`/api/notifications/read-all`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (err) {
      console.error(err);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getTitle = () => {
    const titles = {
      'dashboard': user?.role === 'hod' ? 'HOD Command Center' : user?.role === 'guide' ? 'Guide Dashboard' : 'Student Dashboard',
      'assigned-projects': 'Assigned Projects',
      'upload-project': 'Upload Project',
      'progress-updates': 'Upload',
      'student-progress': 'Student Progress',
      'documents': 'Documents',
      'milestones': 'Milestones',
      'notifications': 'Notifications',
      'feedback': user?.role === 'guide' ? 'HOD Feedback' : 'Feedback',
      'reviews': 'Reviews',
      'meetings': 'Meetings',
      'approvals': 'Project Approvals',
      'projects': 'Department Projects',
      'guides': 'Guide Management',
      'groups': 'Student Groups',
      'analytics': 'Analytics & Reports',
      'announcements': 'Announcements',
      'viva': 'Viva & Evaluation',
      'repository': 'Project Repository',
      'activity': 'Activity Logs',
      'settings': 'System Settings'
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

        {/* Department Selector for HOD */}
        {user?.role === 'hod' && (
          <select className="hidden md:block bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold px-3 py-2 focus:outline-none focus:border-indigo-500 text-slate-700">
            <option>Computer Science (CSE)</option>
            <option>Information Science (ISE)</option>
            <option>Artifical Intelligence (AIML)</option>
            <option>Data Science (DS)</option>
          </select>
        )}

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors focus:outline-none"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500 border border-white"></span>
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="text-sm font-bold text-slate-800">Notifications</h3>
                {unreadCount > 0 && (
                  <button onClick={markAllAsRead} className="text-xs font-bold text-indigo-600 hover:text-indigo-700">
                    Mark all as read
                  </button>
                )}
              </div>
              
              <div className="max-h-80 overflow-y-auto custom-scrollbar">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                    <p className="text-sm font-medium text-slate-500">You're all caught up!</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {notifications.map((notif) => (
                      <div 
                        key={notif._id} 
                        onClick={() => { if(!notif.isRead) markAsRead(notif._id) }}
                        className={`p-4 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3 ${!notif.isRead ? 'bg-indigo-50/30' : ''}`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {notif.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : 
                           notif.type === 'warning' ? <AlertCircle className="w-5 h-5 text-amber-500" /> : 
                           <Info className="w-5 h-5 text-indigo-500" />}
                        </div>
                        <div>
                          <p className={`text-sm ${!notif.isRead ? 'font-bold text-slate-800' : 'font-semibold text-slate-600'}`}>
                            {notif.title}
                          </p>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2">{notif.message}</p>
                          <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wider">
                            {new Date(notif.createdAt || new Date()).toLocaleDateString()}
                          </p>
                        </div>
                        {!notif.isRead && (
                          <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-[1px] h-6 bg-slate-200 hidden sm:block"></div>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="block text-xs font-bold text-slate-800">{user?.name}</span>
            <span className="block text-[10px] font-bold text-slate-400">
              {user?.role === 'guide' ? 'Guide / Faculty' : user?.role === 'hod' ? 'Head of Department' : 'Student'}
            </span>
          </div>
          <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm border-2 border-white shadow-sm">
            {user?.role === 'guide' ? 'GD' : user?.role === 'hod' ? 'HOD' : user?.name?.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}
