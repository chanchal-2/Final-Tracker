import React, { useState } from 'react';
import { UploadCloud, User, Calendar, FileCheck2 } from 'lucide-react';

export default function ProgressUpdatesView({ project, logs, setLogs, token }) {
  const [newLogText, setNewLogText] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleAddLog = async (e) => {
    e.preventDefault();
    if (!newLogText.trim() || !project) return;

    setSubmitLoading(true);
    setMsg('');

    try {
      const res = await fetch(`/api/logs/${project._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ log: newLogText })
      });

      if (res.ok) {
        const newLog = await res.json();
        setLogs([newLog, ...logs]);
        setNewLogText('');
        setMsg('Work log submitted successfully!');
        setTimeout(() => setMsg(''), 3000);
      } else {
        const errData = await res.json();
        setMsg(errData.message || 'Failed to submit log');
      }
    } catch (err) {
      console.error(err);
      setMsg('Network error occurred.');
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* Submit Form */}
      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#0B1220] tracking-tight">Submit Weekly Log</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Progress Entry</p>
            </div>
          </div>

          {msg && (
            <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl border border-emerald-100">
              {msg}
            </div>
          )}

          <form onSubmit={handleAddLog} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Detailed Update Description
              </label>
              <textarea
                required
                rows={6}
                disabled={submitLoading}
                placeholder="Detail tasks completed this week, any blockages encountered, and code repository links..."
                value={newLogText}
                onChange={(e) => setNewLogText(e.target.value)}
                className="w-full text-sm font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 resize-none bg-slate-50 focus:bg-white transition-colors"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitLoading}
              className="w-full text-xs font-bold text-white px-5 py-3.5 rounded-xl bg-[#0B1220] hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:bg-slate-400 uppercase tracking-widest"
            >
              <UploadCloud className="w-4 h-4" />
              <span>{submitLoading ? 'Submitting...' : 'Upload Work Log'}</span>
            </button>
          </form>
        </div>
      </div>

      {/* History */}
      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#0B1220] tracking-tight">Updates History</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Past Submissions</p>
            </div>
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
            {logs.length === 0 ? (
              <div className="text-center py-10 text-xs text-slate-400 font-bold bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                No work logs submitted yet.
              </div>
            ) : (
              logs.map((wl, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm hover:border-indigo-100 transition-colors">
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold mb-3 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-indigo-400" /> {wl.author}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-400" /> {new Date(wl.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed">
                    {wl.log}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
