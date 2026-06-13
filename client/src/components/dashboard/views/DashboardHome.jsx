import React from 'react';
import { CheckCircle, Clock, FileText, UploadCloud, ArrowRight, User } from 'lucide-react';

// Custom SVG Donut Chart
const DonutChart = ({ percentage }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <svg className="transform -rotate-90 w-full h-full">
        {/* Background track */}
        <circle cx="64" cy="64" r={radius} stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
        {/* Progress track */}
        <circle 
          cx="64" 
          cy="64" 
          r={radius} 
          stroke="currentColor" 
          strokeWidth="12" 
          fill="transparent" 
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="text-indigo-600 transition-all duration-1000 ease-out" 
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-black text-[#0B1220] tracking-tight">{percentage}%</span>
      </div>
    </div>
  );
};

export default function DashboardHome({ project, logs, setActiveTab }) {
  // Stats calculations
  const totalMilestones = project.milestones?.length || 0;
  const completedMilestones = project.milestones?.filter(m => m.status === 'done').length || 0;
  const pendingTasks = totalMilestones - completedMilestones;
  
  const documentsCount = project.documents?.length || 0;
  const unreadNotifications = project.notifications?.filter(n => !n.isRead).length || 0;
  
  // Get upcoming milestone
  const upcomingMilestone = project.milestones?.find(m => m.status === 'active' || m.status === 'locked');

  return (
    <div className="space-y-6">
      
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Stat Card 1: Status */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Project Status</span>
              <span className="text-xl font-black text-emerald-600 tracking-tight">{project.status}</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Stat Card 2: Pending Tasks */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Pending Milestones</span>
              <span className="text-xl font-black text-amber-600 tracking-tight">{pendingTasks} Tasks</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <Clock className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Stat Card 3: Documents */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Docs Uploaded</span>
              <span className="text-xl font-black text-blue-600 tracking-tight">{documentsCount} Files</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <FileText className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Stat Card 4: Notifications */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Alerts</span>
              <span className="text-xl font-black text-rose-600 tracking-tight">{unreadNotifications} Unread</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
              <Clock className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Progress & Quick Action Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center gap-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-50 rounded-full blur-3xl pointer-events-none"></div>

            <div className="shrink-0 relative z-10">
              <DonutChart percentage={project.progress} />
            </div>
            
            <div className="flex-1 text-center sm:text-left relative z-10">
              <h3 className="text-xl font-extrabold text-[#0B1220] tracking-tight mb-2">
                You're making great progress!
              </h3>
              <p className="text-sm text-slate-500 font-medium mb-6 max-w-md">
                You have completed {completedMilestones} out of {totalMilestones} milestones. Keep up the good work and submit your next update on time.
              </p>
              
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <button 
                  onClick={() => setActiveTab('upload-project')}
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-indigo-200"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Upload Project File</span>
                </button>
                <button 
                  onClick={() => setActiveTab('progress-updates')}
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold px-5 py-2.5 rounded-xl transition-all"
                >
                  <span>Submit Update</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Recent Updates */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-extrabold text-[#0B1220] uppercase tracking-wider">Recent Logs</h3>
              <button onClick={() => setActiveTab('progress-updates')} className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-widest">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {logs.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400 font-bold bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                  No updates submitted yet.
                </div>
              ) : (
                logs.slice(0, 3).map((wl, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-slate-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-[#0B1220]">{wl.author}</span>
                        <span className="text-[10px] font-semibold text-slate-400">{new Date(wl.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium line-clamp-2 leading-relaxed">
                        {wl.log}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          
          {/* Upcoming Deadline */}
          <div className="bg-[#0B1220] border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
             {/* Glow effect */}
             <div className="absolute -right-10 -top-10 w-32 h-32 bg-indigo-500 rounded-full blur-[60px] opacity-30 pointer-events-none"></div>

             <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Upcoming Deadline</h3>
             
             {upcomingMilestone ? (
               <div>
                 <div className="text-2xl font-black text-white tracking-tight mb-1">
                   {upcomingMilestone.date}
                 </div>
                 <div className="text-sm font-semibold text-indigo-300 mb-6">
                   {upcomingMilestone.title}
                 </div>
                 <button 
                  onClick={() => setActiveTab('milestones')}
                  className="w-full py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-colors backdrop-blur-sm border border-white/10"
                 >
                   View Timeline
                 </button>
               </div>
             ) : (
               <div className="text-sm text-emerald-400 font-bold py-6">
                 All milestones completed!
               </div>
             )}
          </div>

          {/* Guide Info */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Project Guide</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                <User className="w-6 h-6 text-slate-400" />
              </div>
              <div>
                <span className="block text-sm font-bold text-[#0B1220]">{project.guide}</span>
                <span className="block text-xs font-semibold text-slate-500">Department Guide</span>
              </div>
            </div>
            <button 
              onClick={() => setActiveTab('feedback')}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>View Feedback</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
