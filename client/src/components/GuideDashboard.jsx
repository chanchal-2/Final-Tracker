import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Eye, CheckCircle, Clock, AlertCircle, Save, Calendar, User, List } from 'lucide-react';

export default function GuideDashboard() {
  const { user, token } = useAuth();
  const [projects, setProjects] = useState([]);
  const [selectedProj, setSelectedProj] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [msg, setMsg] = useState('');

  // Editable state fields
  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState(0);
  const [milestones, setMilestones] = useState([]);

  // Fetch assigned projects
  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
        if (data.length > 0) {
          handleSelectProject(data[0]);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [token]);

  const handleSelectProject = async (proj) => {
    setSelectedProj(proj);
    setStatus(proj.status);
    setProgress(proj.progress);
    setMilestones(proj.milestones);
    setLogs([]);

    // Fetch logs for this project
    try {
      const logsRes = await fetch(`/api/logs/${proj._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (logsRes.ok) {
        const logsData = await logsRes.json();
        setLogs(logsData);
      }
    } catch (err) {
      console.error('Error fetching logs for project:', err);
    }
  };

  // Modify local milestones array status/grade
  const handleMilestoneChange = (index, field, value) => {
    const updated = [...milestones];
    updated[index] = { ...updated[index], [field]: value };
    setMilestones(updated);
  };

  // Save updates to server
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (!selectedProj) return;

    setSaveLoading(true);
    setMsg('');

    try {
      const res = await fetch(`/api/projects/${selectedProj._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          status,
          progress: Number(progress),
          milestones
        })
      });

      if (res.ok) {
        const updatedProj = await res.json();
        setProjects(projects.map(p => p._id === updatedProj._id ? updatedProj : p));
        setSelectedProj(updatedProj);
        setMsg('Project details updated successfully!');
        setTimeout(() => setMsg(''), 3000);
      } else {
        const errData = await res.json();
        setMsg(errData.message || 'Failed to save changes');
      }
    } catch (err) {
      console.error(err);
      setMsg('Error saving details.');
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 text-center font-bold text-slate-500">
        Loading Guide Panel...
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Toast Alert */}
      {msg && (
        <div className="fixed top-24 right-6 z-50 bg-[#0B1220] text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl animate-bounce flex items-center gap-2">
          <span>💡</span>
          <span>{msg}</span>
        </div>
      )}

      {/* Header Info Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black text-[#0B1220] tracking-tight">Guide Workspace</h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Project Supervision Board</p>
        </div>
        <div className="bg-white border border-slate-150 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-650 flex items-center justify-center font-bold text-xs">
            GD
          </div>
          <div className="text-left">
            <span className="text-xs font-bold block text-slate-800">{user.name}</span>
            <span className="text-[10px] text-slate-400 font-bold block">Supervisor • {user.department}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Projects List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-slate-100 rounded-[24px] p-6 shadow-premium">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-50">
              <List className="w-4.5 h-4.5 text-indigo-500" />
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-450">
                Assigned Proposals ({projects.length})
              </h3>
            </div>
            
            {projects.length === 0 ? (
              <div className="py-6 text-center text-xs font-bold text-slate-400">
                No projects allocated to you yet.
              </div>
            ) : (
              <div className="space-y-3">
                {projects.map((proj) => (
                  <button
                    key={proj._id}
                    onClick={() => handleSelectProject(proj)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-1.5 ${
                      selectedProj?._id === proj._id
                        ? 'border-indigo-650 bg-indigo-50/20 shadow-sm'
                        : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-mono font-bold text-slate-405">
                        Group {proj.projectId}
                      </span>
                      <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                        proj.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                        proj.status === 'Pending' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                        'bg-red-50 text-red-500 border border-red-100'
                      }`}>
                        {proj.status}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-[#0B1220] line-clamp-1">{proj.title}</h4>
                    <div className="flex items-center justify-between text-[9px] text-slate-400 font-bold uppercase mt-1">
                      <span>Progress: {proj.progress}%</span>
                      <span>{proj.team.split(',')[0]} & team</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Project Evaluation Details */}
        {selectedProj ? (
          <div className="lg:col-span-8 space-y-8 animate-fade-in">
            {/* Form Container */}
            <form onSubmit={handleSaveChanges} className="bg-white border border-slate-100 rounded-[24px] p-6 sm:p-8 shadow-premium space-y-6">
              
              {/* Project Header info inside right pane */}
              <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#0B1220]">{selectedProj.title}</h3>
                  <span className="text-xs text-slate-400 font-semibold block mt-1">
                    Team: {selectedProj.team} • ID: <span className="font-mono">{selectedProj.projectId}</span>
                  </span>
                </div>
                
                <button
                  type="submit"
                  disabled={saveLoading}
                  className="w-full sm:w-auto text-xs font-bold text-white px-5 py-2.5 bg-indigo-650 hover:bg-indigo-600 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm shadow-indigo-200 cursor-pointer disabled:bg-slate-400"
                >
                  <Save className="w-4 h-4" />
                  <span>{saveLoading ? 'Saving...' : 'Save Settings'}</span>
                </button>
              </div>

              {/* Status and Progress Adjusters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-405 uppercase tracking-wider mb-2">Project Progress Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
                  >
                    <option value="Pending">Pending Evaluation</option>
                    <option value="Approved">Approved / On Track</option>
                    <option value="Delayed">Delayed / Blocked</option>
                    <option value="At Risk">At Risk / Critical</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-[10px] font-extrabold text-slate-405 uppercase tracking-wider">Completion Matrix (%)</label>
                    <span className="text-xs font-extrabold text-indigo-650">{progress}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={progress}
                    onChange={(e) => setProgress(e.target.value)}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              </div>

              {/* Milestones Modification Checklist */}
              <div>
                <h4 className="text-[10px] font-extrabold text-slate-405 uppercase tracking-wider mb-4 pb-1 border-b border-slate-50">
                  Update Academic Milestones Gates
                </h4>
                <div className="space-y-4">
                  {milestones.map((m, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                      <div className="flex items-center gap-3 shrink-0">
                        {m.status === 'done' ? (
                          <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                        ) : m.status === 'active' ? (
                          <Clock className="w-4.5 h-4.5 text-indigo-500 shrink-0" />
                        ) : (
                          <AlertCircle className="w-4.5 h-4.5 text-slate-300 shrink-0" />
                        )}
                        <div>
                          <span className="font-bold text-slate-800">{m.title}</span>
                          <span className="text-[9px] text-slate-400 font-bold block">{m.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <select
                          value={m.status}
                          onChange={(e) => handleMilestoneChange(idx, 'status', e.target.value)}
                          className="text-[11px] font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                        >
                          <option value="locked">Locked</option>
                          <option value="active">Active</option>
                          <option value="done">Completed</option>
                        </select>
                        
                        <input
                          type="text"
                          placeholder="Grade (e.g. A+)"
                          value={m.grade}
                          onChange={(e) => handleMilestoneChange(idx, 'grade', e.target.value)}
                          className="w-20 text-[11px] font-bold px-2 py-1.5 rounded-lg border border-slate-200 text-center"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </form>

            {/* Students logs stream */}
            <div className="bg-white border border-slate-100 rounded-[24px] p-6 shadow-premium max-h-[350px] overflow-y-auto">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-50">
                <Eye className="w-4.5 h-4.5 text-indigo-500" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Logs stream submissions ({logs.length})
                </h3>
              </div>

              <div className="space-y-4">
                {logs.length === 0 ? (
                  <div className="text-center py-6 text-xs text-slate-400 font-bold">
                    No weekly work logs submitted by student group yet.
                  </div>
                ) : (
                  logs.map((wl, i) => (
                    <div key={i} className="text-xs border-b border-slate-50 last:border-0 pb-3 last:pb-0">
                      <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold mb-1.5 uppercase">
                        <span className="flex items-center gap-1"><User className="w-3 h-3 text-indigo-400" /> {wl.author}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(wl.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-slate-650 leading-relaxed font-semibold bg-slate-50 border border-slate-100/55 p-3 rounded-xl">
                        {wl.log}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-8 bg-white border border-slate-100 rounded-[24px] p-12 shadow-premium text-center font-bold text-slate-400">
            No proposal selected. Please choose a group from the list.
          </div>
        )}
      </div>
    </div>
  );
}
