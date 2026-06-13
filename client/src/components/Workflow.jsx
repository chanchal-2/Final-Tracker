import React from 'react';
import { UploadCloud, Users, Calendar, MessageSquare, LineChart, FileCheck } from 'lucide-react';

export default function Workflow() {
  const steps = [
    {
      title: 'Submit Project',
      desc: 'Submit concept abstract and roster details.',
      icon: UploadCloud,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Guide Assignment',
      desc: 'HODs assign supervisors based on domain match.',
      icon: Users,
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      title: 'Weekly Updates',
      desc: 'Students submit continuous logs of tasks.',
      icon: Calendar,
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      title: 'Guide Feedback',
      desc: 'Supervisors review and add corrective actions.',
      icon: MessageSquare,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Status Tracking',
      desc: 'Progress metrics automatically update.',
      icon: LineChart,
      color: 'bg-amber-50 text-amber-600'
    },
    {
      title: 'Final Submission',
      desc: 'Generate reports and secure viva grading.',
      icon: FileCheck,
      color: 'bg-rose-50 text-rose-600'
    }
  ];

  return (
    <section id="workflow" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100/60 select-none">
            <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-indigo-600">The Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] tracking-[-0.03em]">
            Standard Project Milestones Flow
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-xl mx-auto leading-relaxed tracking-[-0.005em]">
            A structured phase-by-phase approach guiding your final-year project from registration to dissertation.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative max-w-6xl mx-auto">
          {/* Horizontal Line connecting steps on large screens */}
          <div className="hidden lg:block absolute top-12 left-12 right-12 h-0.5 bg-slate-100 -z-10"></div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
            {steps.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <div key={idx} className="flex flex-col items-center group space-y-4">
                  {/* Step Bubble */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm transition-all group-hover:scale-105 group-hover:shadow-md ${step.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Step Info */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold tracking-widest block">
                      PHASE 0{idx + 1}
                    </span>
                    <h4 className="text-xs sm:text-sm font-semibold text-[#0B1220] group-hover:text-indigo-600 transition-colors tracking-[-0.01em]">
                      {step.title}
                    </h4>
                    <p className="text-[10px] sm:text-xs text-slate-450 leading-relaxed font-medium max-w-[150px] mx-auto">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
