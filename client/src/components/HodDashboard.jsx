import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Plus, Check, ShieldAlert, Sparkles, FolderKanban, Users, Clock, AlertTriangle } from 'lucide-react';

export default function HodDashboard() {
  const { user, token } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [msg, setMsg] = useState('');

  // Register form fields
  const [projId, setProjId] = useState('');
  const [title, setTitle] = useState('');
  const [team, setTeam] = useState('');
  const [guide, setGuide] = useState('Dr. Ananya Rao');

  const fetchAllProjects = async () => {
    try {
      const res = await fetch('/api/projects', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProjects();
  }, [token]);

  // Create project proposal
  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!projId.trim() || !title.trim() || !team.trim()) return;

    setSubmitLoading(true);
    setMsg('');

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          projectId: projId,
          title,
          team,
          guide
        })
      });

      const data = await res.json();

      if (res.ok) {
        setProjects([...projects, data]);
        setProjId('');
        setTitle('');
        setTeam('');
        setMsg(`Project proposal registered successfully!`);
        setTimeout(() => setMsg(''), 3000);
      } else {
        setMsg(data.message || 'Could not register project.');
      }
    } catch (err) {
      console.error(err);
      setMsg('Network error occurred.');
    } finally {
      setSubmitLoading(false);
    }
  };

  // Approve project proposal
  const handleApprove = async (id) => {
    try {
      const res = await fetch(`/api/projects/${id}/approve`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        const updated = await res.json();
        setProjects(projects.map(p => p._id === updated._id ? updated : p));
        setMsg(`Project proposal approved!`);
        setTimeout(() => setMsg(''), 3000);
      } else {
        setMsg('Could not approve project.');
      }
    } catch (err) {
      console.error(err);
      setMsg('Error approving project.');
    }
  };

  // Helper metric calculators
  const metrics = {
    total: projects.length,
    approved: projects.filter(p => p.status === 'Approved').length,
    pending: projects.filter(p => p.status === 'Pending').length,
    delayed: projects.filter(p => p.status === 'Delayed' || p.status === 'At Risk').length
  };

  if (loading) {
    return (
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 text-center font-bold text-slate-500">
        Loading Coordinator console...
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
          <h2 className="text-2xl font-black text-[#0B1220] tracking-tight">HOD Dashboard</h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{user.department} Engineering Projects</p>
        </div>
        <div className="bg-white border border-slate-150 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-650 flex items-center justify-center font-bold text-xs">
            HOD
          </div>
          <div className="text-left">
            <span className="text-xs font-bold block text-slate-800">{user.name}</span>
            <span className="text-[10px] text-slate-400 font-bold block">Department Coordinator</span>
          </div>
        </div>
      </div>

      {/* Statistics Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8 select-none">
        <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-28">
          <div className="flex justify-between items-center text-slate-400">
            <FolderKanban className="w-5 h-5 text-indigo-500" />
            <span className="text-[8px] font-black uppercase tracking-wider bg-slate-50 border border-slate-100 px-2 py-0.5 rounded">All</span>
          </div>
          <div>
            <span className="text-2xl font-black text-slate-800 block">{metrics.total}</span>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Registered Projects</span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-28">
          <div className="flex justify-between items-center text-slate-405">
            <Users className="w-5 h-5 text-emerald-500" />
            <span className="text-[8px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded">Active</span>
          </div>
          <div>
            <span className="text-2xl font-black text-emerald-500 block">{metrics.approved}</span>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Approved Proposals</span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-28">
          <div className="flex justify-between items-center text-slate-405">
            <Clock className="w-5 h-5 text-amber-500" />
            <span className="text-[8px] font-black uppercase tracking-wider bg-amber-50 text-amber-600 border border-amber-100 px-2 py-0.5 rounded">Pending</span>
          </div>
          <div>
            <span className="text-2xl font-black text-amber-500 block">{metrics.pending}</span>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Pending Reviews</span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-28">
          <div className="flex justify-between items-center text-slate-405">
            <AlertTriangle className="w-5 h-5 text-rose-500" />
            <span className="text-[8px] font-black uppercase tracking-wider bg-rose-50 text-rose-600 border border-rose-100 px-2 py-0.5 rounded">Delayed</span>
          </div>
          <div>
            <span className="text-2xl font-black text-rose-500 block">{metrics.delayed}</span>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Delayed / Risked</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Proposals Roster */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-slate-100 rounded-[24px] p-6 shadow-premium">
            <div className="flex justify-between items-center mb-6 pb-2 border-b border-slate-50">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Active Proposals Roster
              </h3>
              <span className="text-[10px] text-slate-500 font-semibold">{projects.length} groups total</span>
            </div>

            {projects.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400 font-bold">
                No active projects registered yet. Use the sidebar form to add.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="text-[9px] uppercase font-black text-slate-400 border-b border-slate-150">
                      <th className="pb-3 pr-2">ID & Project Title</th>
                      <th className="pb-3 pr-2">Students & Guide</th>
                      <th className="pb-3 pr-2 text-center">Status</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-xs">
                    {projects.map((p) => (
                      <tr key={p._id} className="hover:bg-slate-50/50">
                        <td className="py-4 pr-3 max-w-[200px]">
                          <span className="text-[9px] font-mono text-slate-400 block font-bold">{p.projectId}</span>
                          <span className="font-bold text-[#0B1220] block truncate" title={p.title}>{p.title}</span>
                        </td>
                        <td className="py-4 pr-3 text-slate-500">
                          <span className="block font-medium truncate max-w-[150px]">{p.team}</span>
                          <span className="text-[10px] block text-indigo-500 font-bold">Supervisor: {p.guide}</span>
                        </td>
                        <td className="py-4 text-center">
                          <span className={`inline-block text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                            p.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                            p.status === 'Pending' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                            'bg-rose-50 text-rose-500 border border-rose-100'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          {p.status === 'Pending' ? (
                            <button
                              onClick={() => handleApprove(p._id)}
                              className="text-[10px] font-bold bg-[#0B1220] hover:bg-[#1e293b] text-white px-3 py-1.5 rounded-lg shadow-sm cursor-pointer transition-colors"
                            >
                              Approve
                            </button>
                          ) : (
                            <span className="text-[10px] text-slate-400 font-bold flex items-center justify-end gap-1 select-none">
                              <Check className="w-3.5 h-3.5 text-emerald-555" />
                              <span>Ready</span>
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar New Proposal Form */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-100 rounded-[24px] p-6 shadow-premium">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-50">
              New Proposal Registration
            </h3>
            
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Project Code / ID
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CSE-22"
                  value={projId}
                  onChange={(e) => setProjId(e.target.value)}
                  className="w-full text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-555 bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Quadcopter Autonomous Search"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-555 bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Team Members List
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sanjay V., Deepa K."
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                  className="w-full text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-555 bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Allocated Guide
                </label>
                <select
                  value={guide}
                  onChange={(e) => setGuide(e.target.value)}
                  className="w-full text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-indigo-555"
                >
                  <option>Dr. Ananya Rao</option>
                  <option>Prof. Rajesh Gowda</option>
                  <option>Dr. Srinivas Murthy</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={submitLoading}
                className="w-full mt-2 text-xs font-bold text-white px-5 py-3 rounded-xl bg-[#0B1220] hover:bg-indigo-650 transition-all flex items-center justify-center gap-1.5 shadow-sm shadow-slate-300 cursor-pointer disabled:bg-slate-400"
              >
                <Plus className="w-4 h-4" />
                <span>{submitLoading ? 'Registering...' : 'Register Project'}</span>
              </button>
            </form>
          </div>

          {/* Quick Notice Card */}
          <div className="bg-gradient-to-r from-indigo-50 to-indigo-100/40 border border-indigo-100/50 rounded-[24px] p-6">
            <h4 className="text-xs font-black text-slate-800 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>Upcoming Presentation Panel</span>
            </h4>
            <p className="text-[10px] text-slate-500 font-semibold leading-relaxed mb-3">
              The internal review panels are scheduled starting June 22nd, 2026. HODs can monitor live update streams here.
            </p>
            <span className="text-[9px] font-black text-indigo-650 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full inline-block">
              10 Days Remaining
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
