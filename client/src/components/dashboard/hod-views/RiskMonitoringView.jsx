import React, { useState } from 'react';
import { ShieldAlert, AlertCircle, Mail, Calendar, ExternalLink, Activity, CheckCircle2, X, AlertTriangle, FileText, Database, Users } from 'lucide-react';

export default function RiskMonitoringView() {
  const [warningsSent, setWarningsSent] = useState({});
  const [meetingsScheduled, setMeetingsScheduled] = useState({});
  const [selectedProject, setSelectedProject] = useState(null);

  const handleSendWarning = async (project) => {
    try {
      const res = await fetch('http://localhost:5000/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          title: `⚠️ Urgent: Action Required for ${project.id}`,
          message: `Your project "${project.title}" has been flagged by the HOD due to: ${project.reason}. Please meet with your guide immediately to resolve this.`,
          type: 'error',
          targetRoles: ['student', 'guide']
        })
      });

      if (!res.ok) throw new Error('Failed to send notification');

      setWarningsSent(prev => ({ ...prev, [project.id]: true }));
      setTimeout(() => alert(`Warning successfully sent to the Guide and Students of project ${project.id}. They will receive a notification immediately.`), 100);
    } catch (error) {
      console.error(error);
      alert('Error sending warning: ' + error.message);
    }
  };

  const handleSchedule = (id) => {
    setMeetingsScheduled(prev => ({ ...prev, [id]: true }));
    setTimeout(() => alert(`Intervention meeting scheduled for project ${id}. Calendar invites have been sent.`), 100);
  };

  const handleViewProject = (project) => {
    setSelectedProject(project);
  };

  const highRiskProjects = [
    { id: 'CSE-42', title: 'AI Driven Autonomous Swarm Drones', group: 'Team Alpha', guide: 'Dr. Ananya Rao', progress: 35, riskLevel: 'High', riskScore: 85, lastActivity: 'June 01, 2026', reason: 'No update in 14 days' },
    { id: 'CSE-18', title: 'Blockchain Based Land Registry', group: 'Team Block', guide: 'Prof. Rajesh Gowda', progress: 15, riskLevel: 'High', riskScore: 70, lastActivity: 'June 03, 2026', reason: 'Missed Milestone 2' },
    { id: 'CSE-09', title: 'Predictive Maintenance IoT System', group: 'IoT Wizards', guide: 'Dr. Srinivas', progress: 60, riskLevel: 'Medium', riskScore: 65, lastActivity: 'June 08, 2026', reason: 'Pending document review' },
    { id: 'CSE-55', title: 'Smart Grid Load Balancer', group: 'Grid Ops', guide: 'Dr. Kavitha S.', progress: 40, riskLevel: 'Low', riskScore: 40, lastActivity: 'June 10, 2026', reason: 'Behind schedule by 2 days' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      
      {/* Warning Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-950 via-[#0B1220] to-[#0B1220] rounded-[24px] p-8 shadow-xl border border-indigo-900/50">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-[80px] pointer-events-none"></div>
        
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
              <button 
                onClick={() => handleViewProject(p)}
                className="flex-1 bg-white hover:bg-slate-50 text-slate-700 text-[10px] font-bold uppercase tracking-wider py-2.5 rounded-lg transition-colors border border-slate-200 flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-3.5 h-3.5" /> View Project
              </button>
              
              <button 
                onClick={() => handleSendWarning(p)}
                disabled={warningsSent[p.id]}
                className={`flex-1 text-[10px] font-bold uppercase tracking-wider py-2.5 rounded-lg transition-colors border flex items-center justify-center gap-2 ${
                  warningsSent[p.id] 
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                  : 'bg-white hover:bg-rose-50 text-rose-600 border-rose-200'
                }`}
              >
                {warningsSent[p.id] ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Mail className="w-3.5 h-3.5" />}
                {warningsSent[p.id] ? 'Warning Sent' : 'Send Warning'}
              </button>
              
              <button 
                onClick={() => handleSchedule(p.id)}
                disabled={meetingsScheduled[p.id]}
                className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors border ${
                  meetingsScheduled[p.id]
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-600 cursor-default'
                    : 'bg-rose-50 hover:bg-rose-100 text-rose-600 border-rose-200'
                }`}
                title={meetingsScheduled[p.id] ? "Meeting Scheduled" : "Schedule Intervention"}
              >
                {meetingsScheduled[p.id] ? <CheckCircle2 className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
              </button>
            </div>
            
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1220]/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${
                  selectedProject.riskLevel === 'High' ? 'bg-rose-100 text-rose-700' :
                  selectedProject.riskLevel === 'Medium' ? 'bg-amber-100 text-amber-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {selectedProject.riskLevel} Risk
                </span>
                <h3 className="text-lg font-black text-slate-800 tracking-tight">{selectedProject.id} Details</h3>
              </div>
              <button 
                onClick={() => setSelectedProject(null)}
                className="text-slate-400 hover:text-rose-500 transition-colors p-1 rounded-md hover:bg-rose-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800 leading-tight mb-2">{selectedProject.title}</h2>
                <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-500">
                  <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {selectedProject.group}</span>
                  <span className="flex items-center gap-1.5"><ShieldAlert className="w-4 h-4" /> Guide: {selectedProject.guide}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Current Progress</p>
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-2xl font-black text-indigo-600">{selectedProject.progress}%</span>
                    <span className="text-xs font-semibold text-slate-500 mb-1">Complete</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${selectedProject.progress}%` }}></div>
                  </div>
                </div>
                
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Risk Score</p>
                  <div className="flex items-end gap-2">
                    <span className={`text-2xl font-black ${
                      selectedProject.riskLevel === 'High' ? 'text-rose-600' : 'text-amber-600'
                    }`}>{selectedProject.riskScore}</span>
                    <span className="text-xs font-semibold text-slate-500 mb-1">/ 100</span>
                  </div>
                  <p className="text-xs font-medium text-slate-500 mt-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" /> {selectedProject.reason}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Recent Activity</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-white border border-slate-100 p-3 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">Last System Update</p>
                      <p className="text-xs font-medium text-slate-500">{selectedProject.lastActivity}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white border border-slate-100 p-3 rounded-lg opacity-60">
                    <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">Previous Document Submission</p>
                      <p className="text-xs font-medium text-slate-500">2 weeks prior</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 text-xs font-bold text-slate-600 uppercase tracking-wider hover:bg-slate-200 rounded-xl transition-colors"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  setSelectedProject(null);
                  handleSendWarning(selectedProject);
                }}
                disabled={warningsSent[selectedProject.id]}
                className={`flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white uppercase tracking-wider rounded-xl transition-all shadow-md ${
                  warningsSent[selectedProject.id] ? 'bg-emerald-500 shadow-emerald-500/25' : 'bg-rose-600 hover:bg-rose-500 shadow-rose-500/25'
                }`}
              >
                {warningsSent[selectedProject.id] ? <CheckCircle2 className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                {warningsSent[selectedProject.id] ? 'Warning Sent' : 'Send Warning'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
