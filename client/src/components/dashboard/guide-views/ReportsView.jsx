import React from 'react';
import { PieChart, Download, TrendingUp, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export default function ReportsView({ projects }) {
  // --- Data Aggregation ---
  const totalProjects = projects.length;
  
  // Progress Brackets
  const progressBrackets = {
    '0-25%': 0,
    '26-50%': 0,
    '51-75%': 0,
    '76-100%': 0
  };

  // Status Counts
  const statusCounts = {
    'Approved': 0,
    'Pending': 0,
    'Delayed': 0,
    'At Risk': 0
  };

  let totalMilestones = 0;
  let completedMilestones = 0;

  projects.forEach(p => {
    // Progress
    if (p.progress <= 25) progressBrackets['0-25%']++;
    else if (p.progress <= 50) progressBrackets['26-50%']++;
    else if (p.progress <= 75) progressBrackets['51-75%']++;
    else progressBrackets['76-100%']++;

    // Status
    if (statusCounts[p.status] !== undefined) {
      statusCounts[p.status]++;
    }

    // Milestones
    if (p.milestones) {
      totalMilestones += p.milestones.length;
      completedMilestones += p.milestones.filter(m => m.status === 'done').length;
    }
  });

  const milestoneCompletionRate = totalMilestones === 0 ? 0 : Math.round((completedMilestones / totalMilestones) * 100);

  // --- CSV Export Logic ---
  const downloadCSV = () => {
    const headers = ['Project ID', 'Title', 'Team', 'Status', 'Progress (%)', 'Guide', 'Completed Milestones', 'Latest Grade'];
    
    const rows = projects.map(p => {
      // Find the latest completed milestone grade if any
      const completedList = (p.milestones || []).filter(m => m.status === 'done');
      const latestGrade = completedList.length > 0 ? completedList[completedList.length - 1].grade : 'N/A';
      
      return [
        p.projectId,
        `"${p.title.replace(/"/g, '""')}"`, // escape quotes in title
        `"${p.team.replace(/"/g, '""')}"`,
        p.status,
        p.progress,
        `"${p.guide}"`,
        `${completedList.length}/${p.milestones?.length || 0}`,
        latestGrade || 'N/A'
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `ProjectTracker_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <PieChart className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-[#0B1220] tracking-tight">Analytics & Reports</h2>
            <p className="text-sm text-slate-500 font-semibold mt-1">Export data and analyze performance across {totalProjects} projects.</p>
          </div>
        </div>
        
        <button 
          onClick={downloadCSV}
          disabled={totalProjects === 0}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm shadow-indigo-200 disabled:bg-slate-400"
        >
          <Download className="w-4 h-4" />
          <span>Export to CSV</span>
        </button>
      </div>

      {totalProjects === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-100 shadow-sm text-center">
          <p className="text-slate-500 font-semibold">No data available to generate reports.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Progress Distribution */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h3 className="text-sm font-black text-slate-800 mb-6 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-500" />
              Progress Distribution
            </h3>
            
            <div className="space-y-4">
              {Object.entries(progressBrackets).map(([label, count]) => {
                const percentage = Math.round((count / totalProjects) * 100) || 0;
                return (
                  <div key={label}>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-600">{label} Completion</span>
                      <span className="text-slate-800">{count} Groups ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Status Breakdown */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h3 className="text-sm font-black text-slate-800 mb-6 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-indigo-500" />
              Status Overview
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-center">
                <CheckCircle className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                <div className="text-2xl font-black text-emerald-700">{statusCounts['Approved']}</div>
                <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mt-1">On Track</div>
              </div>
              
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 text-center">
                <Clock className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                <div className="text-2xl font-black text-amber-700">{statusCounts['Delayed']}</div>
                <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mt-1">Delayed</div>
              </div>
              
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <Clock className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                <div className="text-2xl font-black text-slate-700">{statusCounts['Pending']}</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">Pending</div>
              </div>
              
              <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-center">
                <AlertTriangle className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <div className="text-2xl font-black text-red-700">{statusCounts['At Risk']}</div>
                <div className="text-[10px] font-bold text-red-600 uppercase tracking-wider mt-1">At Risk</div>
              </div>
            </div>
          </div>

          {/* Milestone Metrics */}
          <div className="bg-[#0B1220] rounded-2xl border border-slate-800 p-6 shadow-sm relative overflow-hidden text-center flex flex-col justify-center">
            {/* Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-500/20 rounded-full blur-[40px] pointer-events-none"></div>
            
            <div className="relative z-10">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Overall Milestone Rate</h3>
              <div className="text-5xl font-black text-white tracking-tight mb-2">
                {milestoneCompletionRate}%
              </div>
              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                {completedMilestones} / {totalMilestones} Milestones Completed
              </p>
            </div>
          </div>

          {/* Project Evaluation Data Table */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mt-2">
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-800">Project Evaluation Summary</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[10px] uppercase tracking-wider font-black text-slate-400 border-b border-slate-100">
                    <th className="p-4">Group ID</th>
                    <th className="p-4">Project Title</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Progress</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {projects.map(proj => {
                    return (
                      <tr key={proj._id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4">
                          <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded border border-indigo-100 uppercase tracking-wider">
                            {proj.projectId}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-xs font-bold text-slate-800 line-clamp-1">{proj.title}</span>
                          <span className="text-[9px] font-semibold text-slate-400 block mt-0.5">Team: {proj.team}</span>
                        </td>
                        <td className="p-4">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${
                            proj.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' :
                            proj.status === 'Delayed' ? 'bg-amber-50 text-amber-600' :
                            proj.status === 'At Risk' ? 'bg-red-50 text-red-600' :
                            'bg-slate-100 text-slate-600'
                          }`}>
                            {proj.status === 'Approved' ? 'On Track' : proj.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-slate-100 rounded-full h-1.5">
                              <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${proj.progress}%` }}></div>
                            </div>
                            <span className="text-[10px] font-bold text-slate-600">{proj.progress}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
