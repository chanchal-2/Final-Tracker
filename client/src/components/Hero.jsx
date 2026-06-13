import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Hero({ onGetStarted, onLearnMore }) {
  return (
    <section 
      id="home" 
      className="relative pt-36 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden text-center"
    >
      {/* Decorative Blob */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/60 shadow-sm animate-fade-in select-none">
          <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-indigo-700">
            Powered by Smart Project Monitoring
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-[#0B1220] tracking-[-0.04em] leading-[1.08] animate-fade-in-up">
          Track Final Year Projects <br />
          <span className="text-gradient-accent">
            Before They Fall Behind
          </span>
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium tracking-[-0.01em] animate-fade-in-up">
          ProjectTracker helps students, guides, and HODs manage final-year projects from proposal to viva with real-time progress tracking, feedback management, and project status monitoring.
        </p>

        {/* CTAs */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up">
          <button
            onClick={() => onGetStarted('student')}
            className="w-full sm:w-auto text-xs font-semibold text-white px-8 py-4 bg-[#0B1220] hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/20 rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onLearnMore}
            className="w-full sm:w-auto text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:border-slate-350 hover:bg-slate-50 px-8 py-4 rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <span>Learn More</span>
          </button>
        </div>
      </div>
    </section>
  );
}
