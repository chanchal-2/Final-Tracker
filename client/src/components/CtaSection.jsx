import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CtaSection({ onCtaClick }) {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#0B1220] rounded-[32px] p-10 sm:p-16 text-center text-white relative overflow-hidden shadow-2xl">
        {/* Glow Decorators */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800/60 border border-slate-700/50 rounded-full text-indigo-400 select-none">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-[9px] font-bold uppercase tracking-[0.1em]">Get Started Today</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] leading-tight">
            Ready to Transform <br />
            Project Monitoring?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed max-w-lg mx-auto tracking-[-0.005em]">
            Replace spreadsheets and WhatsApp tracking with one centralized platform. Simplify milestones evaluation.
          </p>
          <div className="pt-4">
            <button
              onClick={() => onCtaClick('student')}
              className="w-full sm:w-auto text-xs font-semibold bg-white text-[#0B1220] hover:bg-slate-100 px-8 py-4 rounded-2xl transition-all inline-flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-white/5"
            >
              <span>Start Tracking</span>
              <ArrowRight className="w-4 h-4 text-[#0B1220]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
