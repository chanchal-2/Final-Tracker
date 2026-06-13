import React from 'react';
import { User, Mail, GraduationCap, Building2 } from 'lucide-react';

export default function ProfileView({ user }) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Profile Header Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm text-center relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-10"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-4xl border-4 border-white shadow-md mb-6">
            {user?.name?.charAt(0).toUpperCase() || 'S'}
          </div>
          <h2 className="text-2xl font-extrabold text-[#0B1220] tracking-tight">{user?.name}</h2>
          <span className="inline-block mt-2 px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest rounded-md">
            Student Account
          </span>
        </div>
      </div>

      {/* Details Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
        <h3 className="text-sm font-extrabold text-[#0B1220] tracking-tight mb-6 pb-4 border-b border-slate-100">
          Personal Information
        </h3>
        
        <div className="space-y-6">
          
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Full Name</span>
              <span className="block text-sm font-semibold text-slate-800">{user?.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Email Address / USN</span>
              <span className="block text-sm font-semibold text-slate-800">{user?.email}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Role</span>
              <span className="block text-sm font-semibold text-slate-800 capitalize">{user?.role}</span>
            </div>
          </div>

          {user?.department && (
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Department</span>
                <span className="block text-sm font-semibold text-slate-800">{user?.department}</span>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
