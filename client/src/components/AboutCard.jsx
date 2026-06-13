import React from 'react';
import { Info, Sparkles } from 'lucide-react';

export default function AboutCard() {
  return (
    <section 
      id="about" 
      className="pt-20 pb-12 bg-slate-50/50 scroll-mt-20"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 animate-fade-in-up">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-750 select-none">
          <Info className="w-3.5 h-3.5" />
          <span className="text-[9px] font-bold uppercase tracking-[0.1em]">Platform Core</span>
        </div>
        
        {/* Centered Bold Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1220] tracking-[-0.03em]">
          About ProjectTracker
        </h2>
        
        {/* Centered Bold Tagline */}
        <p className="text-sm sm:text-base font-semibold text-indigo-650 flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4 text-indigo-505 animate-pulse" />
          <span>One Platform. Complete Project Visibility.</span>
        </p>

        {/* Centered Descriptions */}
        <div className="space-y-5 pt-4 max-w-2xl mx-auto">
          <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed tracking-[-0.005em]">
            ProjectTracker is a web-based platform that helps students, guides, and HODs manage final-year projects in one place. It replaces manual tracking through WhatsApp and spreadsheets with real-time progress updates, guide feedback, and project status monitoring.
          </p>
          <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed tracking-[-0.005em]">
            From project registration to final submission, every stage is tracked to ensure better collaboration, transparency, and timely project completion.
          </p>
        </div>
      </div>
    </section>
  );
}

