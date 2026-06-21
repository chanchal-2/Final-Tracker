import React, { useState, useEffect } from 'react';
import { Save, User, Calendar, FileText, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export default function ReviewsFeedbackView({ projects, setProjects, token, user }) {
  const [selectedProjId, setSelectedProjId] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState('');

  const selectedProj = projects.find(p => p._id === selectedProjId);

  const handleSelect = (id) => {
    setSelectedProjId(id);
    const proj = projects.find(p => p._id === id);
    if (proj) {
      setStatus(proj.status);
      setProgress(proj.progress);
    }
  };

  useEffect(() => {
    if (projects && projects.length > 0 && !selectedProjId) {
      handleSelect(projects[0]._id);
    }
  }, [projects, selectedProjId]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!selectedProj) return;

    setLoading(true);
    setMsg('');

    try {
      // 1. Update Project Status/Progress
      const resPut = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/projects/${selectedProj._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          status,
          progress: Number(progress)
        })
      });

      if (!resPut.ok) {
        setMsg('Failed to update project details.');
        return;
      }

      // 2. Submit Feedback if present (triggers notification)
      let updatedProj = await resPut.json();
      if (feedbackComment.trim()) {
        const resFb = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/projects/${selectedProj._id}/feedback`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ comment: feedbackComment.trim() })
        });

        if (resFb.ok) {
          const newFb = await resFb.json();
          updatedProj.feedback = [...(updatedProj.feedback || []), newFb];
        }
      }

      setProjects(projects.map(p => p._id === updatedProj._id ? updatedProj : p));
      setMsg('Review submitted successfully!');
      setFeedbackComment(''); // Clear input
      setTimeout(() => setMsg(''), 3000);

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
        <h2 className="text-2xl font-black text-[#0B1220] tracking-tight">Reviews</h2>
        <p className="text-sm text-slate-500 font-semibold mt-1">Evaluate student submissions and provide official project feedback.</p>
      </div>

      {msg && (
        <div className="bg-indigo-50 border border-indigo-100 text-indigo-600 px-4 py-3 rounded-xl text-sm font-bold animate-fade-in">
          {msg}
        </div>
      )}

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Select Student to Review</label>
        <select 
          value={selectedProjId}
          onChange={(e) => handleSelect(e.target.value)}
          className="w-full sm:max-w-md bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-indigo-500"
        >
          <option value="" disabled>-- Select a Project --</option>
          {projects.map(p => (
            <option key={p._id} value={p._id}>[{p.uucms || p.projectId}] {p.team}</option>
          ))}
        </select>
      </div>

      {selectedProj && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
          
          {/* Left Col: Submission Details */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="text-sm font-black text-slate-800 mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-500" />
                Latest Documents
              </h3>
              <div className="space-y-3">
                {selectedProj.documents && selectedProj.documents.length > 0 ? (
                  selectedProj.documents.map((doc, idx) => (
                    <a key={idx} href={doc.url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50 hover:border-indigo-200 transition-colors group">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{doc.title}</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">{doc.type}</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">{new Date(doc.uploadDate).toLocaleDateString()}</span>
                    </a>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 font-semibold text-center py-4">No documents uploaded yet.</p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="text-sm font-black text-slate-800 mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-500" />
                Previous Feedback Log
              </h3>
              <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                {selectedProj.feedback && selectedProj.feedback.length > 0 ? (
                  selectedProj.feedback.map((fb, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50 relative">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-black uppercase text-indigo-600">{fb.guideName}</span>
                        <span className="text-[9px] font-bold text-slate-400">{new Date(fb.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-700 leading-relaxed">{fb.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 font-semibold text-center py-4">No feedback provided yet.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Col: Evaluation Form */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
            <h3 className="text-base font-black text-slate-800 mb-6">Evaluation & Review Form</h3>
            
            <form onSubmit={handleSave} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Project Approval Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full text-xs font-semibold px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
                  >
                    <option value="Pending">Pending Evaluation</option>
                    <option value="Approved">Approved / On Track</option>
                    <option value="Delayed">Delayed / Blocked</option>
                    <option value="At Risk">At Risk / Critical</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Completion Progress (%)</label>
                    <span className="text-[10px] font-black text-indigo-600">{progress}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={progress}
                    onChange={(e) => setProgress(e.target.value)}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 mt-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">New Official Feedback</label>
                <textarea
                  required
                  rows="5"
                  placeholder="Provide constructive feedback, required changes, or approval notes..."
                  value={feedbackComment}
                  onChange={(e) => setFeedbackComment(e.target.value)}
                  className="w-full text-sm font-medium px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors resize-none"
                ></textarea>
                <p className="text-[9px] font-bold text-slate-400 mt-2">This feedback will be instantly visible to the student group on their dashboard.</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto text-xs font-bold text-white px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm shadow-indigo-200 disabled:bg-slate-400"
                >
                  <Save className="w-4 h-4" />
                  <span>{loading ? 'Submitting Review...' : 'Submit Official Review'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
