import React, { useState } from 'react';
import { Save, CheckCircle, Clock, AlertCircle, Milestone } from 'lucide-react';

export default function GuideMilestonesView({ projects, setProjects, token }) {
  const [selectedProjId, setSelectedProjId] = useState('');
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const selectedProj = projects.find(p => p._id === selectedProjId);

  const handleSelect = (id) => {
    setSelectedProjId(id);
    const proj = projects.find(p => p._id === id);
    if (proj) {
      setMilestones(proj.milestones);
    }
  };

  const handleMilestoneChange = (index, field, value) => {
    const updated = [...milestones];
    updated[index] = { ...updated[index], [field]: value };
    setMilestones(updated);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!selectedProj) return;

    setLoading(true);
    setMsg('');

    try {
      const res = await fetch(`/api/projects/${selectedProj._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          milestones
        })
      });

      if (res.ok) {
        const updatedProj = await res.json();
        setProjects(projects.map(p => p._id === updatedProj._id ? updatedProj : p));
        setMsg('Milestones updated successfully!');
        setTimeout(() => setMsg(''), 3000);
      } else {
        setMsg('Failed to update milestones');
      }
    } catch (err) {
      console.error(err);
      setMsg('Error saving details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-[#0B1220] tracking-tight">Milestones Gatekeeper</h2>
        <p className="text-sm text-slate-500 font-semibold mt-1">Unlock, approve, or grade academic milestones for your project groups.</p>
      </div>

      {msg && (
        <div className="bg-indigo-50 border border-indigo-100 text-indigo-600 px-4 py-3 rounded-xl text-sm font-bold animate-fade-in">
          {msg}
        </div>
      )}

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="w-full sm:w-auto flex-1">
          <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Select Project Group</label>
          <select 
            value={selectedProjId}
            onChange={(e) => handleSelect(e.target.value)}
            className="w-full sm:max-w-md bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-indigo-500"
          >
            <option value="" disabled>-- Select a Project --</option>
            {projects.map(p => (
              <option key={p._id} value={p._id}>[{p.projectId}] {p.title} ({p.team})</option>
            ))}
          </select>
        </div>
        
        {selectedProj && (
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full sm:w-auto text-xs font-bold text-white px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm shadow-indigo-200 mt-6 sm:mt-0 disabled:bg-slate-400"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Saving...' : 'Save Milestones'}</span>
          </button>
        )}
      </div>

      {selectedProj ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden animate-fade-in">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <Milestone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-800">{selectedProj.title}</h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Milestones Timeline</p>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="relative border-l-2 border-indigo-100 ml-4 pl-8 space-y-8">
              {milestones.map((m, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline Node */}
                  <div className={`absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-white flex items-center justify-center ${
                    m.status === 'done' ? 'bg-emerald-500' :
                    m.status === 'active' ? 'bg-indigo-500' :
                    'bg-slate-300'
                  }`}></div>
                  
                  <div className="bg-white border border-slate-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all group">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">{m.title}</h4>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1 block">Scheduled: {m.date}</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <select
                          value={m.status}
                          onChange={(e) => handleMilestoneChange(idx, 'status', e.target.value)}
                          className={`text-xs font-bold px-3 py-2 rounded-lg border ${
                            m.status === 'done' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                            m.status === 'active' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                            'bg-slate-50 text-slate-500 border-slate-200'
                          }`}
                        >
                          <option value="locked">Locked</option>
                          <option value="active">Active</option>
                          <option value="done">Completed / Approved</option>
                        </select>
                        
                        <input
                          type="text"
                          placeholder="Grade"
                          value={m.grade}
                          onChange={(e) => handleMilestoneChange(idx, 'grade', e.target.value)}
                          className="w-16 sm:w-20 text-xs font-bold px-3 py-2 rounded-lg border border-slate-200 text-center placeholder:font-medium focus:border-indigo-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-12 text-center text-slate-400 font-bold text-sm">
          Please select a project to view and evaluate its milestones.
        </div>
      )}
    </div>
  );
}
