import React, { useState } from 'react';
import { Search, Filter, MoreVertical, ArrowUpRight, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export default function AssignedProjectsView({ projects, setProjects, setActiveTab }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const handleAction = async (projId, action) => {
    const project = projects.find(p => p._id === projId);
    let currentAction = null;
    if (project.status === 'Approved') currentAction = 'accept';
    if (project.status === 'Rejected') currentAction = 'reject';
    if (project.status === 'On Hold') currentAction = 'hold';

    const newAction = currentAction === action ? null : action;
    const newStatusStr = newAction === 'accept' ? 'Approved' 
                       : newAction === 'reject' ? 'Rejected' 
                       : newAction === 'hold' ? 'On Hold' 
                       : 'Pending';

    // Update global state immediately for fast UI that persists across tabs
    if (setProjects) {
      setProjects(prevProjects => prevProjects.map(p => 
        p._id === projId ? { ...p, status: newStatusStr } : p
      ));
    }

    try {
      await fetch(`/api/projects/${projId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatusStr })
      });

      // Send automated notification to the student if the status was changed to something definitive
      if (newStatusStr !== 'Pending') {
        const title = newAction === 'accept' ? `✅ Project Accepted: ${project.projectId}` 
                    : newAction === 'reject' ? `❌ Project Rejected: ${project.projectId}`
                    : `⏳ Project On Hold: ${project.projectId}`;
        
        const message = newAction === 'accept' ? `Great news! Your guide has officially accepted your project "${project.title}". You may now begin your work and start submitting progress updates.`
                      : newAction === 'reject' ? `Your guide has rejected your project "${project.title}". Please consult with your guide and submit a revised proposal.`
                      : `Your guide has placed your project "${project.title}" on hold. Please review any feedback and wait for further instructions.`;

        const type = newAction === 'accept' ? 'success' : newAction === 'reject' ? 'error' : 'warning';

        await fetch('/api/notifications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            title,
            message,
            type,
            targetRoles: ['student'],
            projectId: projId
          })
        });
      }

    } catch (err) {
      console.error('Failed to update project status', err);
    }
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.projectId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (p.student || p.team || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Approved': return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'Delayed': return <Clock className="w-4 h-4 text-amber-500" />;
      case 'At Risk': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <div className="w-2 h-2 rounded-full bg-slate-300 mx-1"></div>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#0B1220] tracking-tight">Assigned Projects</h2>
          <p className="text-sm text-slate-500 font-semibold mt-1">Manage and track all {projects.length} individual projects under your supervision.</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Search by ID, Title, or Team..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold px-3 py-2 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Statuses</option>
            <option value="Approved">On Track</option>
            <option value="Pending">Pending</option>
            <option value="Delayed">Delayed</option>
            <option value="At Risk">At Risk</option>
          </select>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[10px] uppercase tracking-wider font-black text-slate-400">
                <th className="p-4 rounded-tl-2xl">Project ID & Title</th>
                <th className="p-4">Student</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredProjects.map((proj) => (
                <tr key={proj._id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-indigo-500 uppercase tracking-wider mb-0.5">{proj.projectId}</span>
                      <span className="text-sm font-bold text-slate-800 line-clamp-1">{proj.title}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-xs font-semibold text-slate-600">
                      {proj.student || proj.team}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {proj.status === 'Pending' ? (
                        <>
                          <button 
                            onClick={() => handleAction(proj._id, 'hold')}
                            className="px-3 py-1.5 text-[10px] font-black rounded-md uppercase tracking-wider transition-all bg-amber-50 text-amber-600 hover:bg-amber-100"
                          >
                            On Hold
                          </button>
                          <button 
                            onClick={() => handleAction(proj._id, 'accept')}
                            className="px-3 py-1.5 text-[10px] font-black rounded-md uppercase tracking-wider transition-all bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                          >
                            Accept
                          </button>
                          <button 
                            onClick={() => handleAction(proj._id, 'reject')}
                            className="px-3 py-1.5 text-[10px] font-black rounded-md uppercase tracking-wider transition-all bg-red-50 text-red-600 hover:bg-red-100"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={() => handleAction(proj._id, proj.status === 'Approved' ? 'accept' : proj.status === 'Rejected' ? 'reject' : 'hold')}
                          className={`px-4 py-1.5 text-[10px] font-black rounded-md uppercase tracking-wider transition-all shadow-sm flex items-center gap-1.5 ${
                            proj.status === 'On Hold' ? 'bg-amber-500 text-white shadow-amber-500/20' :
                            proj.status === 'Approved' ? 'bg-emerald-500 text-white shadow-emerald-500/20' :
                            'bg-red-500 text-white shadow-red-500/20'
                          }`}
                          title="Click to change"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          {proj.status === 'On Hold' ? 'On Hold' :
                           proj.status === 'Approved' ? 'Accepted' : 'Rejected'}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProjects.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-sm font-bold text-slate-400">
                    No projects found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
