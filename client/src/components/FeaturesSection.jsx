import React from 'react';
import { ClipboardList, UserCheck, TrendingUp, MessageCircle, Activity, FolderUp } from 'lucide-react';

const features = [
  {
    icon: ClipboardList,
    emoji: '📋',
    title: 'Project Registration',
    desc: 'Manage project details and team information easily.',
    color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
  },
  {
    icon: UserCheck,
    emoji: '👨‍🏫',
    title: 'Guide Assignment',
    desc: 'Assign guides to student projects efficiently.',
    color: 'text-violet-600 bg-violet-50 border-violet-100',
  },
  {
    icon: TrendingUp,
    emoji: '📈',
    title: 'Progress Tracking',
    desc: 'Monitor weekly project updates and progress.',
    color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
  },
  {
    icon: MessageCircle,
    emoji: '💬',
    title: 'Guide Feedback',
    desc: 'Review updates and provide valuable suggestions.',
    color: 'text-sky-600 bg-sky-50 border-sky-100',
  },
  {
    icon: Activity,
    emoji: '🚦',
    title: 'Status Monitoring',
    desc: 'Track projects as On Track, Delayed, or At Risk.',
    color: 'text-amber-600 bg-amber-50 border-amber-100',
  },
  {
    icon: FolderUp,
    emoji: '📁',
    title: 'Final Submission',
    desc: 'Upload and manage final reports and documents.',
    color: 'text-rose-600 bg-rose-50 border-rose-100',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-white to-slate-50/80 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full select-none">
            <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-indigo-600">Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] tracking-[-0.03em] leading-tight">
            Powerful Features for Smarter<br />Project Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed max-w-xl mx-auto tracking-[-0.005em]">
            Everything students, guides, and HODs need to track and manage final-year projects efficiently.
          </p>
        </div>

        {/* 3x2 Feature Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, idx) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={idx}
                className="group bg-white rounded-[22px] border border-slate-100/80 p-7 sm:p-8 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-300 ease-out cursor-default"
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${feature.color} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-5 h-5" strokeWidth={2.2} />
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-semibold text-[#0B1220] mb-2 tracking-[-0.02em]">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
