import React from 'react';
import { FileText, CheckCircle, PlusCircle, Megaphone, Clock, Activity } from 'lucide-react';

export default function ActivityLogsView() {
  const activities = [
    { id: 1, type: 'upload', message: 'Student Group 12 uploaded their Final SRS Report', time: '10 mins ago', date: 'June 14, 2026', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' },
    { id: 2, type: 'approve', message: 'Dr. Ananya Rao approved Milestone 3 for Team Alpha', time: '1 hour ago', date: 'June 14, 2026', icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    { id: 3, type: 'new', message: 'New AI project proposal submitted by Team Neural', time: '3 hours ago', date: 'June 14, 2026', icon: PlusCircle, color: 'text-indigo-500', bg: 'bg-indigo-50', border: 'border-indigo-200' },
    { id: 4, type: 'announcement', message: 'HOD published a department announcement regarding Mid-terms', time: '1 day ago', date: 'June 13, 2026', icon: Megaphone, color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-200' },
    { id: 5, type: 'upload', message: 'Team WebDev updated their source code repository link', time: '1 day ago', date: 'June 13, 2026', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' },
    { id: 6, type: 'approve', message: 'Prof. Rajesh Gowda graded the Project Proposal Defence for CSE-18', time: '2 days ago', date: 'June 12, 2026', icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-black text-[#0B1220] tracking-tight">Department Activity Logs</h2>
          <p className="text-sm text-slate-500 font-semibold mt-1">Real-time timeline of events happening across all projects.</p>
        </div>
        <div className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Live Feed
        </div>
      </div>

      <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-8">
        <div className="relative border-l-2 border-slate-100 ml-4 space-y-10">
          
          {activities.map((act) => {
            const Icon = act.icon;
            return (
              <div key={act.id} className="relative pl-8 group">
                {/* Timeline dot/icon */}
                <div className={`absolute -left-[21px] top-0 w-10 h-10 rounded-full ${act.bg} ${act.border} border flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-5 h-5 ${act.color}`} />
                </div>
                
                {/* Content */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:bg-white hover:border-indigo-100 hover:shadow-md transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h4 className="text-sm font-bold text-slate-800 leading-snug">{act.message}</h4>
                    <span className="text-[10px] font-bold text-slate-400 bg-white border border-slate-200 px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1 shrink-0">
                      <Clock className="w-3 h-3" />
                      {act.time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{act.date}</p>
                </div>
              </div>
            );
          })}

          <div className="relative pl-8 pt-4">
            <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-slate-200 border-4 border-white"></div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">End of recent history</p>
          </div>
          
        </div>
      </div>

    </div>
  );
}
