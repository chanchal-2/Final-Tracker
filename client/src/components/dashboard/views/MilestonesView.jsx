import React from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function MilestonesView({ project }) {
  const milestones = project.milestones || [];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      <div className="text-center space-y-2 mb-10">
        <h2 className="text-2xl font-extrabold text-[#0B1220] tracking-tight">Project Milestones</h2>
        <p className="text-sm text-slate-500 font-medium">
          Track your progress through the academic gates and project deadlines.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm relative">
        {/* Timeline line */}
        <div className="absolute left-10 sm:left-14 top-10 bottom-10 w-[2px] bg-slate-100"></div>

        <div className="space-y-10">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative flex items-start gap-6 sm:gap-8 z-10">
              
              {/* Icon */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-4 border-white shadow-sm ${
                m.status === 'done' ? 'bg-emerald-100 text-emerald-600' : 
                m.status === 'active' ? 'bg-indigo-100 text-indigo-600' : 
                'bg-slate-100 text-slate-400'
              }`}>
                {m.status === 'done' ? <CheckCircle className="w-5 h-5" /> : 
                 m.status === 'active' ? <Clock className="w-5 h-5" /> : 
                 <AlertCircle className="w-5 h-5" />}
              </div>

              {/* Content */}
              <div className={`flex-1 pt-1.5 ${m.status === 'locked' ? 'opacity-50' : ''}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h3 className="text-base font-bold text-[#0B1220] tracking-tight">{m.title}</h3>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md">
                    {m.date}
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md ${
                    m.status === 'done' ? 'bg-emerald-50 text-emerald-700' :
                    m.status === 'active' ? 'bg-indigo-50 text-indigo-700' :
                    'bg-slate-100 text-slate-500'
                  }`}>
                    {m.status === 'done' ? 'Completed' : m.status === 'active' ? 'In Progress' : 'Locked'}
                  </span>
                  
                  {m.grade && (
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md ${
                      m.grade === 'TBD' ? 'bg-slate-100 text-slate-500' : 'bg-violet-50 text-violet-700'
                    }`}>
                      Grade: {m.grade}
                    </span>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
