import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle, AlertTriangle, Info, Clock, Check } from 'lucide-react';

export default function NotificationsView({ projects, token }) {
  const [allNotifications, setAllNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/notifications`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setAllNotifications(data);
        }
      } catch (err) {
        console.error('Failed to fetch notifications', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, [token]);

  const markAsRead = async (id) => {
    try {
      const res = await fetch(`/api/notifications/${id}/read`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setAllNotifications(prev => prev.map(n => 
          n._id === id ? { ...n, isRead: true } : n
        ));
      }
    } catch (err) {
      console.error('Failed to mark notification as read', err);
    }
  };

  const getIcon = (type) => {
    switch(type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'error': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default: return <Info className="w-5 h-5 text-indigo-500" />;
    }
  };

  const unreadCount = allNotifications.filter(n => !n.isRead).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center relative">
            <Bell className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 border-2 border-white rounded-full"></span>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-black text-[#0B1220] tracking-tight">Notifications Center</h2>
            <p className="text-sm text-slate-500 font-semibold mt-1">
              You have <span className="text-indigo-600 font-bold">{unreadCount} unread</span> alerts across your assigned projects.
            </p>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        {allNotifications.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-sm font-bold text-slate-700">All Caught Up!</h3>
            <p className="text-xs text-slate-500 mt-1">There are no notifications to show right now.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {allNotifications.map((notif, idx) => (
              <div 
                key={idx} 
                className={`p-6 transition-colors hover:bg-slate-50 flex gap-4 ${!notif.isRead ? 'bg-indigo-50/30' : 'bg-white'}`}
              >
                <div className="shrink-0 mt-1">
                  {getIcon(notif.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                    <h4 className={`text-sm font-bold ${!notif.isRead ? 'text-[#0B1220]' : 'text-slate-700'}`}>
                      {notif.title}
                    </h4>
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-wider">
                      <Clock className="w-3 h-3" />
                      {new Date(notif.createdAt || notif.date || new Date()).toLocaleString()}
                    </span>
                  </div>
                  
                  <p className={`text-xs mb-3 ${!notif.isRead ? 'text-slate-600 font-medium' : 'text-slate-500'}`}>
                    {notif.message}
                  </p>
                  
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                        {notif.projectId ? 'PROJECT UPDATE' : 'GLOBAL ALERT'}
                      </span>
                    </div>
                    
                    {!notif.isRead && (
                      <button 
                        onClick={() => markAsRead(notif._id)}
                        className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 uppercase tracking-wider"
                      >
                        <Check className="w-3 h-3" /> Mark as Read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
