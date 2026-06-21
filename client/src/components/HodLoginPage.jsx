import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Eye, EyeOff, AlertCircle, Shield, Users, Building, Activity, FileText, CheckSquare, BarChart2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function HodLoginPage({ onBack }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter all credentials.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const res = await login(email, password);
    setIsSubmitting(false);

    if (!res.success) {
      setErrorMsg(res.error || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex font-sans bg-[#F8FAFC]">
      {/* ══════════════════════════════════════════ */}
      {/* LEFT PANEL — Branding & Info              */}
      {/* ══════════════════════════════════════════ */}
      <div className="hidden lg:flex lg:w-[48%] fixed top-0 left-0 h-screen overflow-hidden flex-col justify-between p-10 bg-gradient-to-br from-[#0B1220] via-[#0F172A] to-[#1E293B]">
        
        {/* Decorative abstract shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/3 w-[250px] h-[250px] bg-teal-500/5 rounded-full blur-[80px] pointer-events-none"></div>
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}></div>

        {/* Top — Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shadow-lg shadow-slate-900/20">
            <Building className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <span className="text-base font-extrabold text-white tracking-[-0.02em] block">
              Project<span className="text-emerald-400">Tracker</span>
            </span>
            <span className="text-[7px] uppercase tracking-[0.15em] text-slate-400 font-bold block">
              HOD Portal
            </span>
          </div>
        </div>

        {/* Center — Main branding content */}
        <div className="relative z-10 space-y-7 -mt-4">
          {/* Heading */}
          <div>
            <h1 className="text-4xl xl:text-5xl font-extrabold text-white tracking-[-0.03em] leading-[1.1]">
              Oversee. Approve.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-400">
                Command.
              </span>
            </h1>
            <p className="mt-5 text-sm text-slate-400 font-medium leading-relaxed max-w-sm tracking-[-0.005em]">
              Access the departmental overview, approve project proposals, manage faculty guides, and monitor overall student progress — all from one central dashboard.
            </p>
          </div>

          {/* Floating stat cards */}
          <div className="grid grid-cols-2 gap-3 max-w-sm">
            {[
              { label: 'Total Projects', value: '45 Registered', color: 'text-emerald-300' },
              { label: 'Pending Approvals', value: '12 Waiting', color: 'text-amber-300' },
              { label: 'Active Guides', value: '8 Faculty', color: 'text-cyan-400' },
              { label: 'Risk Alerts', value: '3 High Priority', color: 'text-rose-300' },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white/[0.04] backdrop-blur-md border border-white/5 rounded-2xl p-4 space-y-1.5 hover:bg-white/[0.08] transition-colors"
              >
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.08em] block">
                  {card.label}
                </span>
                <span className={`text-sm font-bold ${card.color} block`}>
                  {card.value}
                </span>
              </div>
            ))}
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2.5">
            {[
              { icon: BarChart2, label: 'Department Overview' },
              { icon: CheckSquare, label: 'Project Approvals' },
              { icon: Users, label: 'Guide Management' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] backdrop-blur-sm border border-white/5 text-xs font-semibold text-slate-300">
                  <Icon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom — Back to home */}
        <div className="relative z-10">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white/50 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 backdrop-blur-sm transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════ */}
      {/* RIGHT PANEL — Login Form                  */}
      {/* ══════════════════════════════════════════ */}
      <div className="flex-1 lg:ml-[48%] min-h-screen flex items-center justify-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
          
          {/* Mobile back button */}
          <div className="lg:hidden">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          </div>

          {/* Header */}
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shadow-sm">
              <Shield className="w-7 h-7 text-slate-800" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1220] tracking-[-0.03em]">
                HOD Access
              </h2>
              <p className="mt-2 text-sm text-slate-500 font-medium leading-relaxed max-w-xs mx-auto tracking-[-0.005em]">
                Please authenticate to access the department command center.
              </p>
            </div>
          </div>

          {/* Error Alert */}
          {errorMsg && (
            <div className="p-3.5 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-xs flex items-center gap-2.5 font-semibold animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
            {/* Work Email */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-[0.06em]">
                Department Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="hod@tracker.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  autoComplete="new-email"
                  className="w-full text-sm font-medium px-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-800/10 transition-all bg-white placeholder:text-slate-300"
                />
              </div>
            </div>

            {/* Access Key */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-[0.06em]">
                  Security Key
                </label>
                <button type="button" className="text-[11px] font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                  autoComplete="new-password"
                  className="w-full text-sm font-medium px-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-800/10 transition-all bg-white placeholder:text-slate-300 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-xs font-semibold text-white px-6 py-4 rounded-2xl bg-[#0B1220] hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/10 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-slate-900/5 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer uppercase tracking-[0.08em]"
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Authenticate Access'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
