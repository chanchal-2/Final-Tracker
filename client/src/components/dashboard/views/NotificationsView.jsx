import React, { useState, useEffect } from 'react';
import { Bell, Info, CheckCircle, AlertTriangle, XCircle, Clock, Check } from 'lucide-react';

export default function NotificationsView({ token }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/notifications`, {
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
    fetchNotifications();
  }, [token]);

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
          {[...notifications].sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)).map((n, idx) => (
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
                    {new Date(n.createdAt || n.date || new Date()).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {n.message}
                </p>
                {!n.isRead && (
                  <button 
                    onClick={() => markAsRead(n._id)}
                    className="mt-3 text-[10px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 uppercase tracking-wider"
                  >
                    <Check className="w-3 h-3" /> Mark as Read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
