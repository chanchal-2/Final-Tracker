import React, { useState } from 'react';
import { Users, Star, Clock, FileCheck, FileClock, RefreshCw, X, Send, Trash2 } from 'lucide-react';

export default function GuideManagementView({ token }) {
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add Guide Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGuideName, setNewGuideName] = useState('');
  const [newGuideCapacity, setNewGuideCapacity] = useState('10');

  const [guides, setGuides] = useState([]);
  
  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/auth/users?role=guide`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          // Transform user data to match expected guide object structure for the table
          const transformedGuides = data.map(u => ({
            id: u._id,
            userId: u._id,
            name: u.name,
            groups: 0, // Real implementation would aggregate this from projects
            maxGroups: 10,
            students: 0,
            completedReviews: 0,
            pendingReviews: 0,
            avgResponse: 'N/A',
            rating: 0
          }));
          setGuides(transformedGuides);
        }
      } catch (err) {
        console.error('Error fetching guides:', err);
      }
    };
    fetchGuides();
  }, [token]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-black text-[#0B1220] tracking-tight">Guide Management</h2>
          <p className="text-sm text-slate-500 font-semibold mt-1">Monitor faculty workload, review performance, and reassign projects.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#0B1220] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-indigo-600 transition-colors shadow-sm"
        >
          <Users className="w-4 h-4" />
          Add New Guide
        </button>
      </div>

      <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200 text-[10px] uppercase font-black text-slate-500 tracking-wider">
                <th className="py-4 px-6">Guide Name</th>
                <th className="py-4 px-6 w-48">Workload (Assigned)</th>
                <th className="py-4 px-6 text-center">Completed Reviews</th>
                <th className="py-4 px-6 text-center">Pending Reviews</th>
                <th className="py-4 px-6 text-right">Feedback</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {guides.map((guide, idx) => {
                const workloadPct = (guide.groups / guide.maxGroups) * 100;
                let workloadColor = 'bg-emerald-500';
                if (workloadPct > 70) workloadColor = 'bg-amber-500';
                if (workloadPct >= 100) workloadColor = 'bg-rose-500';

                return (
                  <tr key={guide.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs border-2 border-white shadow-sm overflow-hidden">
                          <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(guide.name)}&background=e0e7ff&color=4f46e5`} alt={guide.name} />
                        </div>
                        <div>
                          <span className="font-bold text-[#0B1220] block flex items-center gap-2">
                            {guide.name}

                          </span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{guide.students || guide.groups} Students Supervised</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex justify-between text-[10px] font-bold mb-1">
                        <span className="text-slate-600">{guide.groups} / {guide.maxGroups}</span>
                        <span className={workloadPct >= 100 ? 'text-rose-600' : 'text-slate-400'}>{workloadPct.toFixed(0)}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${workloadColor} rounded-full transition-all duration-1000`} style={{ width: `${workloadPct}%` }}></div>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-center">
                      <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-lg border border-emerald-100 font-bold">
                        <FileCheck className="w-4 h-4" />
                        {guide.completedReviews}
                      </div>
                    </td>

                    <td className="py-4 px-6 text-center">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-bold ${
                        guide.pendingReviews > 10 
                          ? 'bg-rose-50 text-rose-600 border-rose-100' 
                          : guide.pendingReviews > 5 
                            ? 'bg-amber-50 text-amber-600 border-amber-100' 
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}>
                        <FileClock className="w-4 h-4" />
                        {guide.pendingReviews}
                      </div>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => setSelectedGuide(guide)}
                          className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 px-4 py-2 rounded-lg transition-colors shadow-sm"
                        >
                          Give Feedback
                        </button>
                        <button 
                          onClick={() => {
                            if(window.confirm(`Are you sure you want to remove ${guide.name}?`)) {
                              setGuides(guides.filter(g => g.id !== guide.id));
                            }
                          }}
                          className="opacity-0 group-hover:opacity-100 inline-flex items-center justify-center bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 p-2 rounded-lg transition-all shadow-sm"
                          title="Remove Guide"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Feedback Modal */}
      {selectedGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1220]/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-lg font-black text-slate-800 tracking-tight">Provide Feedback</h3>
              <button 
                onClick={() => { setSelectedGuide(null); setFeedbackText(''); }}
                className="text-slate-400 hover:text-rose-500 transition-colors p-1 rounded-md hover:bg-rose-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-sm font-semibold text-slate-600 mb-4">
                Sending feedback to <span className="font-black text-indigo-600">{selectedGuide.name}</span>
              </p>
              
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Write your feedback regarding workload, student reviews, or overall performance here..."
                className="w-full h-32 p-4 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all resize-none"
              ></textarea>
            </div>
            
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button 
                onClick={() => { setSelectedGuide(null); setFeedbackText(''); }}
                className="px-5 py-2.5 text-xs font-bold text-slate-600 uppercase tracking-wider hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={async () => {
                  if (!feedbackText.trim()) return alert('Please write some feedback first.');
                  setIsSubmitting(true);
                  try {
                    await fetch(`${import.meta.env.VITE_API_URL || ''}/api/notifications`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                      },
                      body: JSON.stringify({
                        title: 'New Feedback from HOD',
                        message: `HOD left feedback regarding your performance: "${feedbackText}"`,
                        type: 'info',
                        targetRoles: [],
                        targetUsers: [selectedGuide.name]
                      })
                    });
                    setIsSubmitting(false);
                    const guideName = selectedGuide.name;
                    setSelectedGuide(null);
                    setFeedbackText('');
                    alert(`Feedback successfully sent to ${guideName}!`);
                  } catch (err) {
                    console.error('Failed to send feedback', err);
                    setIsSubmitting(false);
                    alert('Error sending feedback.');
                  }
                }}
                disabled={isSubmitting}
                className={`flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white uppercase tracking-wider rounded-xl transition-all shadow-md ${
                  isSubmitting ? 'bg-indigo-400 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/25'
                }`}
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    <Send className="w-4 h-4" /> Send Feedback
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Guide Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1220]/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-lg font-black text-slate-800 tracking-tight">Add New Guide</h3>
              <button 
                onClick={() => { setShowAddModal(false); setNewGuideName(''); setNewGuideCapacity('10'); }}
                className="text-slate-400 hover:text-rose-500 transition-colors p-1 rounded-md hover:bg-rose-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Guide Name</label>
                <input
                  type="text"
                  value={newGuideName}
                  onChange={(e) => setNewGuideName(e.target.value)}
                  placeholder="e.g. Dr. Jane Smith"
                  className="w-full px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Max Group Capacity</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={newGuideCapacity}
                  onChange={(e) => setNewGuideCapacity(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all"
                />
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button 
                onClick={() => { setShowAddModal(false); setNewGuideName(''); setNewGuideCapacity('10'); }}
                className="px-5 py-2.5 text-xs font-bold text-slate-600 uppercase tracking-wider hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  if (!newGuideName.trim()) return alert('Please enter a guide name.');
                  const newGuide = {
                    id: Date.now(),
                    name: newGuideName,
                    groups: 0,
                    maxGroups: parseInt(newGuideCapacity) || 10,
                    completedReviews: 0,
                    pendingReviews: 0,
                    avgResponse: '0.0 days',
                    rating: 0.0
                  };
                  setGuides([...guides, newGuide]);
                  setShowAddModal(false);
                  setNewGuideName('');
                  setNewGuideCapacity('10');
                }}
                className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white uppercase tracking-wider bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-md shadow-indigo-500/25"
              >
                Add Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
