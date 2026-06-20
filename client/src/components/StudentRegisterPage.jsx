import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, GraduationCap, Eye, EyeOff, AlertCircle, UserPlus, BookOpen, Users, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function StudentRegisterPage({ onBack, onGoToLogin }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [uucms, setUucms] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!fullName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName,
          email,
          password,
          role: 'student',
          uucms: uucms || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Registration failed.');
      }

      setSuccessMsg('Account created successfully! Redirecting to login...');
      setTimeout(() => onGoToLogin(), 2000);
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
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

        {/* Top — Back to Login */}
        <div className="relative z-10">
          <button
            onClick={onGoToLogin}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Login</span>
          </button>
        </div>

        {/* Center — Main branding content */}
        <div className="relative z-10 space-y-8 -mt-8">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center">
            <UserPlus className="w-8 h-8 text-white" />
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-4xl xl:text-5xl font-extrabold text-white tracking-[-0.03em] leading-[1.1]">
              Start Your<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-400">
                Project Journey.
              </span>
            </h1>
            <p className="mt-5 text-sm text-slate-400 font-medium leading-relaxed max-w-sm tracking-[-0.005em]">
              Join ProjectTracker to manage your final-year project, submit weekly progress, receive guide feedback, and stay on track.
            </p>
          </div>

          {/* Benefit cards */}
          <div className="grid grid-cols-2 gap-3 max-w-sm">
            {[
              { icon: BookOpen, label: 'Project Tracking', value: 'End-to-End', color: 'text-emerald-400' },
              { icon: Users, label: 'Guide Connect', value: 'Direct Access', color: 'text-indigo-300' },
              { icon: Award, label: 'Progress Reports', value: 'Auto Generated', color: 'text-amber-300' },
              { icon: GraduationCap, label: 'Final Submission', value: 'One Click', color: 'text-sky-300' },
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

        {/* Bottom — Already registered */}
        <div className="relative z-10 space-y-3">
          <p className="text-xs text-slate-500 font-medium">Already registered?</p>
          <button
            onClick={onGoToLogin}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white/80 hover:text-white border border-white/15 hover:border-white/30 bg-transparent hover:bg-white/5 transition-all cursor-pointer"
          >
            <span>Sign In to Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════ */}
      {/* RIGHT PANEL — Registration Form           */}
      {/* ══════════════════════════════════════════ */}
      <div className="flex-1 lg:ml-[48%] min-h-screen flex items-center justify-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-md space-y-7">
          
          {/* Mobile back button */}
          <div className="lg:hidden">
            <button
              onClick={onGoToLogin}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Login</span>
            </button>
          </div>

          {/* Header */}
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-100/50 flex items-center justify-center shadow-sm">
              <UserPlus className="w-7 h-7 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#020817] tracking-[-0.03em]">
                Student Registration
              </h2>
              <p className="mt-2 text-sm text-slate-500 font-medium leading-relaxed max-w-xs mx-auto tracking-[-0.005em]">
                Create your ProjectTracker account to start managing your final-year project.
              </p>
            </div>
          </div>

          {/* Success Alert */}
          {successMsg && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-2xl text-xs flex items-center gap-2.5 font-semibold animate-fade-in">
              <Award className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Error Alert */}
          {errorMsg && (
            <div className="p-3.5 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-xs flex items-center gap-2.5 font-semibold animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-[0.06em]">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={isSubmitting}
                autoComplete="off"
                className="w-full text-sm font-medium px-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all bg-white placeholder:text-slate-350"
              />
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-[0.06em]">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                autoComplete="new-email"
                className="w-full text-sm font-medium px-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all bg-white placeholder:text-slate-350"
              />
            </div>

            {/* UUCMS ID */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-[0.06em]">
                UUCMS ID
              </label>
              <input
                type="text"
                placeholder="e.g. 1RV22CS089"
                value={uucms}
                onChange={(e) => setUucms(e.target.value)}
                disabled={isSubmitting}
                autoComplete="off"
                className="w-full text-sm font-medium px-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all bg-white placeholder:text-slate-350"
              />
            </div>

            {/* Create Password */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-[0.06em]">
                Create Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Min. 6 characters"
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

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-[0.06em]">
                Confirm Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isSubmitting}
                  autoComplete="new-password"
                  className="w-full text-sm font-medium px-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all bg-white placeholder:text-slate-350 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-xs font-semibold text-white px-6 py-4 rounded-2xl bg-[#020817] hover:bg-[#0B1220] hover:shadow-xl hover:shadow-slate-900/10 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-slate-900/5 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer uppercase tracking-[0.08em]"
            >
              <span>{isSubmitting ? 'Creating Account...' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.1em]">Or continue with</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          {/* Social Sign Up */}
          <button className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all text-sm font-semibold text-slate-700 cursor-pointer shadow-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>Sign up with Google</span>
          </button>

          {/* Login link for mobile */}
          <div className="text-center lg:hidden">
            <p className="text-xs text-slate-500 font-medium">
              Already have an account?{' '}
              <button onClick={onGoToLogin} className="text-indigo-600 font-semibold hover:text-indigo-700 cursor-pointer">
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
