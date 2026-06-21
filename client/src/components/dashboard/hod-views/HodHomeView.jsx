import React from 'react';
import { 
  Users, FolderKanban, GraduationCap, CheckCircle2, 
  Clock, AlertTriangle, CheckSquare, Video, 
  Activity, ArrowUpRight, ArrowDownRight,
  TrendingUp, AlertCircle, ShieldAlert,
  Calendar, Mail, MoreHorizontal, FileText
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

// Inline Icon Components for ones not directly imported
const SparklesIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
);
const PieChartIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
);

export default function HodHomeView({ projects }) {
  const { user } = useAuth();

  const metrics = {
    totalStudents: projects.reduce((acc, p) => acc + (p.team ? p.team.split(',').length : 1), 0),
    totalGroups: projects.length,
    totalGuides: new Set(projects.map(p => p.guide)).size,
    activeProjects: projects.length,
    completedProjects: projects.filter(p => p.status === 'Approved').length,
    delayedProjects: projects.filter(p => p.status === 'Delayed' || p.status === 'At Risk').length,
    pendingApprovals: projects.filter(p => p.status === 'Pending').length,
    upcomingVivas: projects.filter(p => p.progress >= 90 && p.status !== 'Approved').length
  };

  // High-risk projects
  const highRiskProjects = projects
    .filter(p => p.status === 'Delayed' || p.status === 'At Risk')
    .map(p => ({
      id: p.projectId,
      title: p.title,
      group: p.team,
      guide: p.guide,
      progress: p.progress,
      riskScore: p.status === 'At Risk' ? 85 : 65,
      reason: p.status === 'At Risk' ? 'Critical Delays' : 'Missed Milestone'
    }));

  const StatCard = ({ title, value, icon: Icon, trend, colorClass, bgClass, trendUp }) => (
    <div className="relative overflow-hidden bg-white/70 backdrop-blur-md border border-slate-200/60 p-5 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group">
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${bgClass} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity rounded-full -mr-8 -mt-8`}></div>
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`p-2.5 rounded-xl ${colorClass} bg-white border border-slate-100 shadow-sm`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${trendUp ? 'text-emerald-600 bg-emerald-50 border border-emerald-100' : 'text-rose-600 bg-rose-50 border border-rose-100'}`}>
          {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trend}
        </div>
      </div>
      <div className="relative z-10">
        <h3 className="text-3xl font-black text-[#0B1220] mb-1">{value}</h3>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{title}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Premium Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0B1220] via-[#111827] to-[#1e293b] rounded-[24px] p-8 shadow-xl border border-slate-800">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-[10px] font-bold uppercase tracking-widest mb-4">
            <SparklesIcon className="w-3.5 h-3.5" /> Academic Term 2026
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
            Welcome Back, HOD 👨‍🎓
          </h1>
          <p className="text-sm text-slate-400 font-medium leading-relaxed">
            Monitor your department's projects, faculty performance, and academic progress all in one unified command center.
          </p>
        </div>
      </div>

      {/* Dashboard Overview Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
            <Activity className="w-4 h-4 text-indigo-500" />
            Department Overview
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Total Students" value={metrics.totalStudents} icon={Users} trend="+12%" colorClass="text-indigo-600" bgClass="from-indigo-400 to-indigo-600" trendUp={true} />
          <StatCard title="Project Groups" value={metrics.totalGroups} icon={FolderKanban} trend="+5%" colorClass="text-blue-600" bgClass="from-blue-400 to-blue-600" trendUp={true} />
          <StatCard title="Total Guides" value={metrics.totalGuides} icon={GraduationCap} trend="0%" colorClass="text-emerald-600" bgClass="from-emerald-400 to-emerald-600" trendUp={true} />
          <StatCard title="Active Projects" value={metrics.activeProjects} icon={Activity} trend="+8%" colorClass="text-purple-600" bgClass="from-purple-400 to-purple-600" trendUp={true} />
          <StatCard title="Completed" value={metrics.completedProjects} icon={CheckCircle2} trend="+15%" colorClass="text-emerald-600" bgClass="from-emerald-400 to-emerald-600" trendUp={true} />
          <StatCard title="Delayed Projects" value={metrics.delayedProjects} icon={AlertTriangle} trend="-2%" colorClass="text-rose-600" bgClass="from-rose-400 to-rose-600" trendUp={false} />
          <StatCard title="Pending Approvals" value={metrics.pendingApprovals} icon={CheckSquare} trend="-5%" colorClass="text-amber-600" bgClass="from-amber-400 to-amber-600" trendUp={true} />
          <StatCard title="Upcoming Vivas" value={metrics.upcomingVivas} icon={Video} trend="+2%" colorClass="text-sky-600" bgClass="from-sky-400 to-sky-600" trendUp={true} />
        </div>
      </div>

      {/* Main Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel: Department Project Progress */}
        <div className="lg:col-span-2 bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-[24px] p-6 shadow-sm relative overflow-hidden">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-6 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-500" />
            Project Progress & Milestones
          </h3>
          
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center h-[250px]">
            {/* Circular Progress */}
            <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-slate-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-indigo-600" strokeDasharray="68, 100" strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-[#0B1220]">68%</span>
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Overall</span>
              </div>
            </div>

            {/* Milestone Bars */}
            <div className="flex-1 w-full space-y-4">
              {[
                { name: 'Proposal', pct: 95, color: 'bg-emerald-500' },
                { name: 'Design', pct: 75, color: 'bg-indigo-500' },
                { name: 'Development', pct: 40, color: 'bg-blue-500' },
                { name: 'Testing', pct: 15, color: 'bg-amber-500' },
                { name: 'Final Submission', pct: 5, color: 'bg-slate-300' }
              ].map((m, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-slate-600 uppercase tracking-wider">{m.name}</span>
                    <span className="text-slate-800">{m.pct}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${m.color} rounded-full`} style={{ width: `${m.pct}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel: Domain Distribution */}
        <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-[24px] p-6 shadow-sm">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-6 flex items-center gap-2">
            <PieChartIcon className="w-4 h-4 text-indigo-500" />
            Domain Distribution
          </h3>
          
          <div className="relative h-[250px] flex items-center justify-center">
            {/* Mock CSS Donut Chart */}
            <div className="w-48 h-48 rounded-full border-[16px] border-slate-50 relative flex items-center justify-center">
              {/* Note: A real implementation would use Recharts or Chart.js here. This is a visual representation using borders. */}
              <div className="absolute inset-[-16px] border-[16px] border-transparent border-t-indigo-500 border-r-indigo-500 rounded-full transform -rotate-45"></div>
              <div className="absolute inset-[-16px] border-[16px] border-transparent border-b-emerald-400 rounded-full transform rotate-45"></div>
              <div className="absolute inset-[-16px] border-[16px] border-transparent border-l-blue-400 rounded-full transform -rotate-12"></div>
              
              <div className="flex flex-col items-center">
                <span className="text-xl font-black text-[#0B1220]">60</span>
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Projects</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600"><span className="w-2 h-2 rounded-full bg-indigo-500"></span> AI / ML (35%)</div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Web Dev (25%)</div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600"><span className="w-2 h-2 rounded-full bg-blue-400"></span> Cloud (20%)</div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600"><span className="w-2 h-2 rounded-full bg-slate-200"></span> Other (20%)</div>
          </div>
        </div>
      </div>

      {/* Recent Department Activity Section */}
      <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-[24px] p-6 shadow-sm">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-6 flex items-center gap-2">
          <Activity className="w-4 h-4 text-indigo-500" />
          Recent Department Activity
        </h3>

        <div className="relative border-l-2 border-slate-100 ml-4 space-y-6">
          {[
            { id: 1, message: 'Group 12 uploaded final report', time: '10 minutes ago', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' },
            { id: 2, message: 'Guide Dr. Sharma approved Milestone 3', time: '30 minutes ago', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200' },
            { id: 3, message: 'New AI project proposal submitted', time: '1 hour ago', icon: FolderKanban, color: 'text-indigo-500', bg: 'bg-indigo-50', border: 'border-indigo-200' },
            { id: 4, message: 'Announcement published by HOD', time: 'Today', icon: Mail, color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-200' }
          ].map((act) => {
            const Icon = act.icon;
            return (
              <div key={act.id} className="relative pl-6 group">
                <div className={`absolute -left-[17px] top-0.5 w-8 h-8 rounded-full ${act.bg} ${act.border} border flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-3.5 h-3.5 ${act.color}`} />
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 hover:bg-white hover:border-indigo-100 hover:shadow-sm transition-all flex justify-between items-center">
                  <h4 className="text-xs font-bold text-slate-800">{act.message}</h4>
                  <span className="text-[10px] font-bold text-slate-400 bg-white border border-slate-200 px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1 shrink-0">
                    <Clock className="w-3 h-3" />
                    {act.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
