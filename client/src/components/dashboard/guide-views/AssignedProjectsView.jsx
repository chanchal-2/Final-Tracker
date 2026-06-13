import React, { useState } from 'react';
import { Search, Filter, MoreVertical, ArrowUpRight, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export default function AssignedProjectsView({ projects, setActiveTab }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.projectId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.team.toLowerCase().includes(searchTerm.toLowerCase());
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
          <p className="text-sm text-slate-500 font-semibold mt-1">Manage and track all {projects.length} project groups under your supervision.</p>
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
                <th className="p-4">Team Members</th>
                <th className="p-4">Progress</th>
                <th className="p-4">Status</th>
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
                    <span className="text-xs font-semibold text-slate-600 line-clamp-2 max-w-[200px]">
                      {proj.team}
                    </span>
                  </td>
                  <td className="p-4 w-48">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-slate-100 rounded-full h-1.5 w-24">
                        <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${proj.progress}%` }}></div>
                      </div>
                      <span className="text-xs font-bold text-slate-700">{proj.progress}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(proj.status)}
                      <span className={`text-xs font-bold ${
                        proj.status === 'Approved' ? 'text-emerald-600' :
                        proj.status === 'Delayed' ? 'text-amber-600' :
                        proj.status === 'At Risk' ? 'text-red-600' :
                        'text-slate-600'
                      }`}>
                        {proj.status === 'Approved' ? 'On Track' : proj.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => setActiveTab('reviews')}
                      className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors inline-flex"
                      title="View Details"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
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
