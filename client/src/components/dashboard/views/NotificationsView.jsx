import React, { useEffect } from 'react';
import { Bell, Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

export default function NotificationsView({ project, setProject, token }) {
  const notifications = project.notifications || [];

  useEffect(() => {
    // Mark notifications as read when the view is opened
    const unreadExists = notifications.some(n => !n.isRead);
    
    if (unreadExists && project._id) {
      fetch(`/api/projects/${project._id}/notifications/read`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(() => {
        // Update local state to mark all as read
        const updatedNotifications = notifications.map(n => ({ ...n, isRead: true }));
        setProject({ ...project, notifications: updatedNotifications });
      })
      .catch(err => console.error('Failed to mark notifications as read', err));
    }
  }, [project._id, notifications, setProject, token]);

  const getIcon = (type) => {
    switch(type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'error': return <XCircle className="w-5 h-5 text-rose-500" />;
      default: return <Info className="w-5 h-5 text-indigo-500" />;
    }
  };

  const getBgClass = (type) => {
    switch(type) {
      case 'success': return 'bg-emerald-50';
      case 'warning': return 'bg-amber-50';
      case 'error': return 'bg-rose-50';
      default: return 'bg-indigo-50';
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-extrabold text-[#0B1220] tracking-tight">Notifications</h2>
        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
          {notifications.length} Alerts
        </span>
      </div>

      {notifications.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <Bell className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#0B1220]">All caught up!</h3>
          <p className="text-sm text-slate-500 font-medium mt-2">
            You don't have any new notifications or alerts right now.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Sort notifications by date descending */}
          {[...notifications].sort((a, b) => new Date(b.date) - new Date(a.date)).map((n, idx) => (
            <div key={idx} className={`flex items-start gap-4 p-5 rounded-2xl border transition-all ${
              !n.isRead ? 'bg-white border-indigo-100 shadow-sm' : 'bg-slate-50 border-slate-100'
            }`}>
              
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${getBgClass(n.type)}`}>
                {getIcon(n.type)}
              </div>
              
              <div className="flex-1 pt-0.5">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-sm font-bold text-[#0B1220] tracking-tight">{n.title}</h3>
                  <span className="text-[10px] font-bold text-slate-400">
                    {new Date(n.date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {n.message}
                </p>
              </div>

              {!n.isRead && (
                <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0 mt-2"></div>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
