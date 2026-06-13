import React from 'react';
import { MessageSquareOff, EyeOff, Hourglass } from 'lucide-react';

export default function ProblemSection() {
  const problems = [
    {
      title: 'Scattered Communication',
      desc: 'Progress updates are shared through WhatsApp and emails, making it impossible to audit past updates or reviews.',
      icon: MessageSquareOff,
      iconColor: 'text-red-500 bg-red-50'
    },
    {
      title: 'No Project Visibility',
      desc: 'HODs and coordinators cannot easily monitor all active final-year projects or track guide allocations.',
      icon: EyeOff,
      iconColor: 'text-amber-500 bg-amber-50'
    },
    {
      title: 'Last Minute Work',
      desc: 'Without continuous tracking, students delay development and write-up work until the final submission deadlines.',
      icon: Hourglass,
      iconColor: 'text-rose-500 bg-rose-50'
    }
  ];

  return (
    <section id="features" className="py-20 bg-slate-50/50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-100/60 select-none">
            <span className="text-[9px] font-black uppercase tracking-widest text-red-600">The Problem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] tracking-tight">
            Why Project Tracking is Difficult?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold max-w-xl mx-auto leading-relaxed">
            Managing dozens of final-year groups leads to systemic issues that hinder grading and delay evaluation gates.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {problems.map((prob, idx) => {
            const IconComponent = prob.icon;
            return (
              <div 
                key={idx}
                className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-premium shadow-premium-hover flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Icon & Close Indicator */}
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${prob.iconColor}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold text-red-500 select-none">❌</span>
                  </div>

                  {/* Title & Desc */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[#0B1220]">{prob.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-semibold">
                      {prob.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
