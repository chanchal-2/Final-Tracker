import React from 'react';
import { MessageSquare, Quote, User } from 'lucide-react';

export default function FeedbackView({ project }) {
  const feedbackList = project.feedback || [];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-extrabold text-[#0B1220] tracking-tight">Guide Feedback</h2>
        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
          {feedbackList.length} Comments
        </span>
      </div>

      {feedbackList.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-400 flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#0B1220]">No feedback yet</h3>
          <p className="text-sm text-slate-500 font-medium mt-2 max-w-sm mx-auto">
            Your project guide hasn't left any comments or feedback on your submissions yet.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Sort feedback by date descending */}
          {[...feedbackList].sort((a, b) => new Date(b.date) - new Date(a.date)).map((f, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
              <Quote className="absolute top-6 right-6 w-12 h-12 text-slate-50" />
              
              <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0B1220] tracking-tight">{f.guideName}</h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Project Guide • {new Date(f.date).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 relative z-10">
                <p className="text-sm text-slate-700 font-medium leading-relaxed italic">
                  "{f.comment}"
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
