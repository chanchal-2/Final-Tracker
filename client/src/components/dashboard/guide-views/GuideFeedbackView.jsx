import React, { useState, useEffect } from 'react';
import { MessageSquare, Calendar, Loader } from 'lucide-react';

export default function GuideFeedbackView({ token }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await fetch('/api/notifications', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          // Filter only the HOD feedback notifications
          const hodFeedback = data.filter(n => n.title === 'New Feedback from HOD');
          // Sort by date descending
          hodFeedback.sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));
          setFeedbackList(hodFeedback);
        }
      } catch (err) {
        console.error('Failed to fetch feedback:', err);
      } finally {
        setLoading(false);
      }
    };
    
    if (token) {
      fetchFeedback();
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-black text-[#0B1220] tracking-tight">HOD Feedback</h2>
        <p className="text-sm text-slate-500 font-semibold mt-1">Review official performance feedback and notes provided by the Head of Department.</p>
      </div>

      <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-6 lg:p-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400">
            <Loader className="w-8 h-8 animate-spin mb-4 text-indigo-500" />
            <p className="text-sm font-semibold">Loading feedback...</p>
          </div>
        ) : feedbackList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-700 mb-1">No Feedback Yet</h3>
            <p className="text-sm text-slate-500 font-medium max-w-sm">
              You haven't received any official performance feedback from the HOD yet. Keep up the great work!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {feedbackList.map((item) => (
              <div key={item._id} className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row gap-4 sm:items-start group hover:bg-indigo-50/50 hover:border-indigo-100 transition-colors">
                <div className="shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center text-indigo-500">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-slate-800">Feedback Review</h4>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-sm">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(item.date || item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {item.message.replace('HOD left feedback regarding your performance: ', '').replace(/^"|"$/g, '')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
