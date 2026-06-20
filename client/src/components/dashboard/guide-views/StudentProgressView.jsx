import React, { useState, useEffect } from 'react';
import { Activity, User, Calendar, FileText, CheckCircle } from 'lucide-react';

export default function StudentProgressView({ projects, token }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProjId, setSelectedProjId] = useState('All');

  useEffect(() => {
    const fetchAllLogs = async () => {
      setLoading(true);
      try {
        let fetchedLogs = [];
        const projectIdsToFetch = selectedProjId === 'All' 
          ? projects.map(p => p._id) 
          : [selectedProjId];

        for (const pid of projectIdsToFetch) {
          const res = await fetch(`/api/logs/${pid}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            // Attach project info to each log for display
            const projInfo = projects.find(p => p._id === pid);
            const annotatedData = data.map(log => ({ ...log, projectInfo: projInfo }));
            fetchedLogs = [...fetchedLogs, ...annotatedData];
          }
        }
        
        // Sort by date descending
        fetchedLogs.sort((a, b) => new Date(b.date) - new Date(a.date));
        setLogs(fetchedLogs);
      } catch (err) {
        console.error('Error fetching logs:', err);
      } finally {
        setLoading(false);
      }
    };

    if (projects.length > 0) {
      fetchAllLogs();
    } else {
      setLoading(false);
    }
  }, [selectedProjId, projects, token]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#0B1220] tracking-tight">Student Progress Logs</h2>
          <p className="text-sm text-slate-500 font-semibold mt-1">Review weekly work logs submitted by your assigned students.</p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Filter by Project:</label>
        <select 
          value={selectedProjId}
          onChange={(e) => setSelectedProjId(e.target.value)}
          className="flex-1 max-w-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold focus:outline-none focus:border-indigo-500"
        >
          <option value="All">All Assigned Projects</option>
          {projects.map(p => (
            <option key={p._id} value={p._id}>[{p.uucms || p.projectId}] {p.team}</option>
          ))}
        </select>
      </div>

      {/* Logs Feed */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-800">Activity Feed</h3>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{logs.length} Submissions Found</p>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6 max-h-[600px] overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="text-center py-12 text-slate-400 font-bold text-sm">
              Loading progress logs...
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-12 text-slate-400 font-bold text-sm">
              No work logs have been submitted by the students yet.
            </div>
          ) : (
            logs.map((log) => (
              <div key={log._id} className="relative pl-6 sm:pl-8 border-l-2 border-slate-100">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-white bg-indigo-500"></div>
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:border-indigo-200 transition-colors">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-3">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        <User className="w-4 h-4 text-indigo-500" />
                        {log.author}
                      </h4>
                      <p className="text-[10px] font-black text-indigo-600 uppercase tracking-wider mt-1">
                        Group: {log.projectInfo?.projectId} • {log.projectInfo?.title}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-slate-400 bg-white px-3 py-1 rounded-lg border border-slate-200 flex items-center gap-1.5 shadow-sm">
                      <Calendar className="w-3 h-3" />
                      {new Date(log.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    {log.log}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
