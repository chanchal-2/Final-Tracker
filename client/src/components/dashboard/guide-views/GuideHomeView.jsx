import React from 'react';
import { Users, CheckCircle, Clock, AlertTriangle, FileText, ArrowUpRight } from 'lucide-react';

export default function GuideHomeView({ projects, setActiveTab }) {
  // Compute Stats
  const totalProjects = projects.length;
  const onTrack = projects.filter(p => p.status === 'Approved').length;
  const delayed = projects.filter(p => p.status === 'Delayed').length;
  const atRisk = projects.filter(p => p.status === 'At Risk').length;
  const pendingReviews = projects.filter(p => p.status === 'Pending').length;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-650 to-indigo-800 rounded-[24px] p-8 text-white shadow-premium relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-black mb-2 tracking-tight">Overview Dashboard</h2>
          <p className="text-indigo-100 font-semibold text-sm leading-relaxed">
            Monitor and manage all your assigned student project groups. You have {pendingReviews} projects awaiting initial evaluation.
          </p>
        </div>
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl"></div>
      </div>

      {/* Summary Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black text-slate-800">{totalProjects}</span>
          </div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Assigned</h3>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black text-slate-800">{onTrack}</span>
          </div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Projects On Track</h3>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black text-slate-800">{delayed}</span>
          </div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Delayed Status</h3>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black text-slate-800">{atRisk}</span>
          </div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">At Risk / Critical</h3>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Active Projects Quick List */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-black text-slate-800">Assigned Projects Overview</h3>
            <button onClick={() => setActiveTab('assigned-projects')} className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
              View All <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          
          <div className="space-y-4">
            {projects.slice(0, 5).map(proj => (
              <div key={proj._id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{proj.projectId}</span>
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${
                      proj.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' :
                      proj.status === 'Delayed' ? 'bg-amber-50 text-amber-600' :
                      proj.status === 'At Risk' ? 'bg-red-50 text-red-600' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {proj.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 line-clamp-1">{proj.title}</h4>
                  <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase">Team: {proj.team}</p>
                </div>
                
                <div className="w-full sm:w-48">
                  <div className="flex justify-between text-[10px] font-bold mb-1">
                    <span className="text-slate-500">Progress</span>
                    <span className="text-indigo-600">{proj.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5">
                    <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${proj.progress}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
            {projects.length === 0 && (
              <div className="text-center py-8 text-slate-400 font-bold text-xs uppercase tracking-wider">
                No projects assigned yet
              </div>
            )}
          </div>
        </div>

        {/* Action Required Panel */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h3 className="text-base font-black text-slate-800 mb-6">Action Required</h3>
          
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/30 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">Pending Reviews</h4>
                <p className="text-[10px] font-semibold text-slate-500 mt-1">You have {pendingReviews} projects awaiting initial evaluation or feedback.</p>
                <button onClick={() => setActiveTab('reviews')} className="mt-2 text-[10px] font-bold text-amber-600 hover:text-amber-700 uppercase tracking-wider">
                  Review Now &rarr;
                </button>
              </div>
            </div>
            
            <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/30 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">Upcoming Milestones</h4>
                <p className="text-[10px] font-semibold text-slate-500 mt-1">Check the milestones timeline to approve upcoming gate requirements.</p>
                <button onClick={() => setActiveTab('milestones')} className="mt-2 text-[10px] font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-wider">
                  View Timeline &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
