import React from 'react';
import { Eye, Calendar, Sparkles } from 'lucide-react';

export default function DashboardPreview() {
  const mockupLogs = [
    { title: 'AI Water shortage model complete', author: 'Rajesh Kumar', time: '10m ago', tag: 'On Track', tagColor: 'bg-emerald-500 text-white' },
    { title: 'Initial prototype design drafts', author: 'Vinay T.', time: '2h ago', tag: 'Delayed', tagColor: 'bg-amber-500 text-white' },
    { title: 'Guide review and marks update', author: 'Dr. Ananya Rao', time: '5h ago', tag: 'On Track', tagColor: 'bg-emerald-500 text-white' }
  ];

  return (
    <section id="preview" className="py-20 bg-slate-50/50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Mockup Description */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100/60 select-none">
              <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600">SaaS Live Preview</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] tracking-tight leading-tight">
              Real-Time Tracking <br />
              At Your Fingertips
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
              Get complete visibility of every project from proposal to final submission with real-time insights.
            </p>
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Eye className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0B1220]">Granular Progress Logs</h4>
                  <p className="text-xs text-slate-450 font-medium leading-relaxed">Audit code reviews, tasks completed, and supervisors comments.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0B1220]">Automatic Notifications</h4>
                  <p className="text-xs text-slate-450 font-medium leading-relaxed">System alters when submission deadlines or evaluation reviews approach.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Mockup Dashboard Container */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-100 rounded-[28px] p-6 sm:p-8 shadow-xl shadow-slate-200/60 relative overflow-hidden">
              {/* Blur Blob inside mockup */}
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

              {/* Mockup Top Header */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-150/70 mb-6">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Overview Console</span>
                  <h3 className="text-sm font-extrabold text-[#0B1220] flex items-center gap-1.5">
                    <span>Department Workspace</span>
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  </h3>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                </div>
              </div>

              {/* Mockup Stat Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-slate-50 border border-slate-100/50 p-4 rounded-2xl text-center">
                  <span className="text-lg font-black text-slate-800 block">64</span>
                  <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest block mt-0.5">Total Projects</span>
                </div>
                <div className="bg-emerald-50/50 border border-emerald-100/30 p-4 rounded-2xl text-center">
                  <span className="text-lg font-black text-emerald-600 block">48</span>
                  <span className="text-[8px] text-emerald-500/80 font-bold uppercase tracking-widest block mt-0.5">On Track</span>
                </div>
                <div className="bg-amber-50/50 border border-amber-100/30 p-4 rounded-2xl text-center">
                  <span className="text-lg font-black text-amber-600 block">12</span>
                  <span className="text-[8px] text-amber-500/80 font-bold uppercase tracking-widest block mt-0.5">Delayed</span>
                </div>
                <div className="bg-rose-50/50 border border-rose-100/30 p-4 rounded-2xl text-center">
                  <span className="text-lg font-black text-rose-500 block">4</span>
                  <span className="text-[8px] text-rose-400/85 font-bold uppercase tracking-widest block mt-0.5">At Risk</span>
                </div>
              </div>

              {/* Mockup Log Feed */}
              <div className="space-y-4">
                <h4 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider pb-1 border-b border-slate-50">
                  Recent Progress Updates
                </h4>
                <div className="space-y-3">
                  {mockupLogs.map((log, i) => (
                    <div 
                      key={i} 
                      className="flex items-center justify-between p-3.5 bg-slate-50/60 border border-slate-100 rounded-xl text-left"
                    >
                      <div className="space-y-1">
                        <h5 className="text-xs font-bold text-[#0B1220]">{log.title}</h5>
                        <p className="text-[10px] text-slate-400 font-semibold">
                          By {log.author} • <span className="text-indigo-500 font-bold">{log.time}</span>
                        </p>
                      </div>
                      <span className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md ${log.tagColor}`}>
                        {log.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
