import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, GraduationCap, Eye, EyeOff, AlertCircle, FolderOpen, TrendingUp, MessageSquare, CalendarCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function StudentLoginPage({ onBack }) {
  const { login } = useAuth();
  const [guideName, setGuideName] = useState('');
  const [uucms, setUucms] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!uucms.trim() || !password.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const res = await login(uucms, password);
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
      <div className="hidden lg:flex lg:w-[48%] fixed top-0 left-0 h-screen overflow-hidden flex-col justify-between p-10 bg-gradient-to-br from-[#020817] via-[#0B1220] to-[#4F46E5]">
        
        {/* Decorative abstract shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[80px] pointer-events-none"></div>
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}></div>

        {/* Top — Back to Home */}
        <div className="relative z-10">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Center — Main branding content */}
        <div className="relative z-10 space-y-8 -mt-8">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-4xl xl:text-5xl font-extrabold text-white tracking-[-0.03em] leading-[1.1]">
              Project Progress<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-400">
                Made Smarter.
              </span>
            </h1>
            <p className="mt-5 text-sm text-slate-400 font-medium leading-relaxed max-w-sm tracking-[-0.005em]">
              Manage your final year journey with seamless project tracking, regular updates, and direct guide interaction.
            </p>
          </div>

          {/* Floating info cards */}
          <div className="grid grid-cols-2 gap-3 max-w-sm">
            {[
              { icon: FolderOpen, emoji: '📁', label: 'Project Status', value: 'On Track', color: 'text-emerald-400' },
              { icon: TrendingUp, emoji: '📈', label: 'Progress', value: '75% Completed', color: 'text-indigo-300' },
              { icon: MessageSquare, emoji: '👨‍🏫', label: 'Guide Feedback', value: '3 New Reviews', color: 'text-amber-300' },
              { icon: CalendarCheck, emoji: '🗓', label: 'Weekly Updates', value: 'Week 5 Submitted', color: 'text-sky-300' },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-2xl p-4 space-y-1.5 hover:bg-white/[0.1] transition-colors"
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
              <span>Back to Home</span>
            </button>
          </div>

          {/* Header */}
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-100/50 flex items-center justify-center shadow-sm">
              <GraduationCap className="w-7 h-7 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#020817] tracking-[-0.03em]">
                Student Portal
              </h2>
              <p className="mt-2 text-sm text-slate-500 font-medium leading-relaxed max-w-xs mx-auto tracking-[-0.005em]">
                Access your projects, submit progress updates, and communicate with your guide.
              </p>
            </div>
          </div>

          {/* Error Alert */}
          {errorMsg && (
            <div className="p-3.5 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-xs flex items-center gap-2.5 font-semibold animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
            {/* Guide Name */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-[0.06em]">
                Guide Name
              </label>
              <input
                type="text"
                placeholder="e.g. Dr. Ananya Rao"
                value={guideName}
                onChange={(e) => setGuideName(e.target.value)}
                disabled={isSubmitting}
                autoComplete="off"
                className="w-full text-sm font-medium px-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all bg-white placeholder:text-slate-350"
              />
            </div>

            {/* UUCMS Number */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-[0.06em]">
                UUCMS Number <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Enter your UUCMS ID"
                value={uucms}
                onChange={(e) => setUucms(e.target.value)}
                disabled={isSubmitting}
                autoComplete="off"
                className="w-full text-sm font-medium px-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all bg-white placeholder:text-slate-350"
              />
            </div>



            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-[0.06em]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                  autoComplete="new-password"
                  className="w-full text-sm font-medium px-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all bg-white placeholder:text-slate-350 pr-12"
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

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
                />
                <span className="text-xs font-medium text-slate-500">Remember me</span>
              </label>
              <button type="button" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors cursor-pointer">
                Forgot Password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-xs font-semibold text-white px-6 py-4 rounded-2xl bg-[#020817] hover:bg-[#0B1220] hover:shadow-xl hover:shadow-slate-900/10 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-slate-900/5 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer uppercase tracking-[0.08em]"
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Enter Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>


          {/* Mock credentials hint */}
          <div className="text-center pt-2">
            <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 border border-slate-150 px-4 py-2 rounded-full inline-block">
              💡 Default UUCMS: U03AI23S0015 / password123
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
