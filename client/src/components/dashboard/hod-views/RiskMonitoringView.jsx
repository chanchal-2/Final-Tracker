import React from 'react';
import { ShieldAlert, AlertCircle, Mail, Calendar, ExternalLink, Activity } from 'lucide-react';

export default function RiskMonitoringView() {
  const highRiskProjects = [
    { id: 'CSE-42', title: 'AI Driven Autonomous Swarm Drones', group: 'Team Alpha', guide: 'Dr. Ananya Rao', progress: 35, riskLevel: 'High', riskScore: 85, lastActivity: 'June 01, 2026', reason: 'No update in 14 days' },
    { id: 'CSE-18', title: 'Blockchain Based Land Registry', group: 'Team Block', guide: 'Prof. Rajesh Gowda', progress: 15, riskLevel: 'High', riskScore: 70, lastActivity: 'June 03, 2026', reason: 'Missed Milestone 2' },
    { id: 'CSE-09', title: 'Predictive Maintenance IoT System', group: 'IoT Wizards', guide: 'Dr. Srinivas', progress: 60, riskLevel: 'Medium', riskScore: 65, lastActivity: 'June 08, 2026', reason: 'Pending document review' },
    { id: 'CSE-55', title: 'Smart Grid Load Balancer', group: 'Grid Ops', guide: 'Dr. Kavitha S.', progress: 40, riskLevel: 'Low', riskScore: 40, lastActivity: 'June 10, 2026', reason: 'Behind schedule by 2 days' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      
      {/* Warning Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-rose-950 via-rose-900 to-[#0B1220] rounded-[24px] p-8 shadow-xl border border-rose-800/50">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/20 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-[10px] font-bold uppercase tracking-widest mb-4">
              <ShieldAlert className="w-3.5 h-3.5" /> Action Required
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight mb-2">
              Smart Risk Monitoring
            </h1>
            <p className="text-sm text-rose-200/70 font-medium leading-relaxed">
              AI-detected alerts for delayed or struggling project groups. Take immediate action to ensure on-time project completion.
            </p>
          </div>
          
          <div className="bg-[#0B1220]/50 border border-white/10 rounded-2xl p-5 shrink-0 flex items-center gap-6 backdrop-blur-md">
            <div className="text-center">
              <span className="block text-3xl font-black text-rose-500">{highRiskProjects.filter(p => p.riskLevel === 'High').length}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">High Risk</span>
            </div>
            <div className="w-px h-10 bg-white/10"></div>
            <div className="text-center">
              <span className="block text-3xl font-black text-amber-500">{highRiskProjects.filter(p => p.riskLevel === 'Medium').length}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Medium Risk</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {highRiskProjects.map((p, idx) => (
          <div key={idx} className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-6 relative overflow-hidden group">
            {/* Risk Indicator Strip */}
            <div className={`absolute top-0 left-0 bottom-0 w-1.5 ${
              p.riskLevel === 'High' ? 'bg-rose-500' : p.riskLevel === 'Medium' ? 'bg-amber-500' : 'bg-yellow-400'
            }`}></div>
            
            <div className="flex justify-between items-start mb-4 pl-2">
              <div>
                <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded uppercase tracking-widest mb-2 inline-block">
                  {p.id}
                </span>
                <h3 className="text-lg font-bold text-[#0B1220] leading-snug pr-4">{p.title}</h3>
              </div>
              <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center shrink-0 ${
                p.riskLevel === 'High' ? 'border-rose-100 text-rose-600 bg-rose-50' : 
                p.riskLevel === 'Medium' ? 'border-amber-100 text-amber-600 bg-amber-50' : 
                'border-yellow-100 text-yellow-600 bg-yellow-50'
              }`}>
                <span className="text-sm font-black">{p.riskScore}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 pl-2">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Group & Guide</p>
                <p className="text-sm font-semibold text-slate-700">{p.group}</p>
                <p className="text-xs font-medium text-slate-500">Dr. {p.guide}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Timeline & Activity</p>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                  <Activity className="w-3.5 h-3.5 text-slate-400" /> {p.progress}% Complete
                </div>
                <p className="text-[10px] font-medium text-slate-500 mt-0.5">Last active: {p.lastActivity}</p>
              </div>
            </div>

            <div className={`mt-2 p-3 rounded-xl border flex items-start gap-2 pl-2 ml-2 ${
              p.riskLevel === 'High' ? 'bg-rose-50 border-rose-100' : 
              p.riskLevel === 'Medium' ? 'bg-amber-50 border-amber-100' : 
              'bg-yellow-50 border-yellow-100'
            }`}>
              <AlertCircle className={`w-4 h-4 shrink-0 mt-0.5 ${
                p.riskLevel === 'High' ? 'text-rose-500' : p.riskLevel === 'Medium' ? 'text-amber-500' : 'text-yellow-500'
              }`} />
              <div>
                <p className={`text-xs font-bold ${
                  p.riskLevel === 'High' ? 'text-rose-700' : p.riskLevel === 'Medium' ? 'text-amber-700' : 'text-yellow-700'
                }`}>{p.reason}</p>
                <p className="text-[10px] font-medium mt-1 opacity-80">
                  System Suggestion: {p.riskLevel === 'High' ? 'Require immediate meeting with guide.' : 'Send automated warning email.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-slate-100 pl-2">
              <button className="flex-1 bg-white hover:bg-slate-50 text-slate-700 text-[10px] font-bold uppercase tracking-wider py-2.5 rounded-lg transition-colors border border-slate-200 flex items-center justify-center gap-2">
                <ExternalLink className="w-3.5 h-3.5" /> View Project
              </button>
              <button className="flex-1 bg-white hover:bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider py-2.5 rounded-lg transition-colors border border-slate-200 hover:border-indigo-200 flex items-center justify-center gap-2">
                <Mail className="w-3.5 h-3.5" /> Send Warning
              </button>
              <button className="w-10 h-10 flex items-center justify-center bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors border border-rose-200" title="Schedule Intervention">
                <Calendar className="w-4 h-4" />
              </button>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
