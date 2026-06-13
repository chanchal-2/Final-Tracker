import React from 'react';
import { User, Users, Hash, ShieldCheck, BadgeCheck } from 'lucide-react';

export default function MyProjectsView({ project }) {
  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#020817] via-[#0B1220] to-[#3730A3] rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-xs font-black text-indigo-300 uppercase tracking-widest mb-4">
            <Hash className="w-3.5 h-3.5" />
            Group {project.projectId}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2 max-w-2xl">
            {project.title}
          </h2>
          <div className="flex items-center gap-2 mt-4 text-emerald-400 font-bold text-sm bg-emerald-500/10 border border-emerald-500/20 w-fit px-4 py-2 rounded-xl backdrop-blur-sm">
            <ShieldCheck className="w-5 h-5" />
            <span>Status: {project.status}</span>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Team Members */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#0B1220] tracking-tight">Team Members</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Project Group</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Split comma separated team members if possible, else just show the string */}
            {project.team.split(',').map((member, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-slate-400" />
                </div>
                <span className="text-sm font-semibold text-slate-700">{member.trim()}</span>
                {idx === 0 && (
                  <span className="ml-auto text-[9px] font-black bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md uppercase tracking-wider">
                    Leader
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Guide Details */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600">
              <BadgeCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#0B1220] tracking-tight">Project Guide</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Supervisor</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50">
            <div className="w-12 h-12 rounded-full bg-indigo-100 border-2 border-white shadow-sm flex items-center justify-center shrink-0">
              <span className="font-bold text-indigo-700 text-lg">{project.guide.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <span className="block text-sm font-bold text-slate-800">{project.guide}</span>
              <span className="block text-xs font-semibold text-slate-500">Department Faculty</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
