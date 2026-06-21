import React from 'react';
import { CheckCircle, Clock, FileText, UploadCloud, ArrowRight, User, BarChart3, Users } from 'lucide-react';

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
  const documentsCount = project.documents?.length || 0;
  const unreadNotifications = project.notifications?.filter(n => !n.isRead).length || 0;

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

        {/* Stat Card 2: Documents */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Docs Submitted</span>
              <span className="text-xl font-black text-amber-600 tracking-tight">{documentsCount} Files</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <FileText className="w-5 h-5" />
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
                Your project is <strong className="text-indigo-600">{project.progress}% complete</strong>. Keep up the great work — submit your latest update and upload your documents on time.
              </p>
              
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <button 
                  onClick={() => setActiveTab('upload-project')}
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-indigo-200"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Upload Project File</span>
                </button>

              </div>
            </div>
          </div>

          {/* Project Performance Analytics Section */}
          <div className="bg-white border border-slate-200 rounded-[24px] p-6 sm:p-8 shadow-premium space-y-8 relative overflow-hidden group/card">
            {/* Subtle glow background */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none transition-all duration-500 group-hover/card:bg-indigo-100/50"></div>

            {/* Header */}
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center transition-transform duration-300 group-hover/card:scale-110">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#0B1220] tracking-tight">Project Performance Analytics</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Monthly Insights & Work Progress</p>
              </div>
            </div>



            {/* Performance Stats Footer Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
              
              {/* Stat 1: Documents */}
              <div className="bg-white border border-slate-200 hover:border-indigo-300 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all group/stat cursor-pointer flex flex-col justify-between space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Documents Submitted</span>
                    <span className="text-lg font-black text-slate-800 tracking-tight">8 / 10</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center transition-transform duration-300 group-hover/stat:rotate-12">
                    <FileText className="w-4 h-4" />
                  </div>
                </div>
                {/* Custom Progress Bar */}
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>

              {/* Stat 2: Meetings */}
              <div className="bg-white border border-slate-200 hover:border-indigo-300 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all group/stat cursor-pointer flex flex-col justify-between space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Guide Meetings</span>
                    <span className="text-lg font-black text-slate-800 tracking-tight">6 Meetings</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center transition-transform duration-300 group-hover/stat:rotate-12">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                {/* Success Indicator */}
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">On Track</span>
                </div>
              </div>

              {/* Stat 3: Feedback Resolved */}
              <div className="bg-white border border-slate-200 hover:border-indigo-300 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all group/stat cursor-pointer flex flex-col justify-between space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Feedback Resolved</span>
                    <span className="text-lg font-black text-slate-800 tracking-tight">12 Issues</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center transition-transform duration-300 group-hover/stat:rotate-12">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                </div>
                {/* Progress Indicator */}
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">100% Resolved</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          
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
