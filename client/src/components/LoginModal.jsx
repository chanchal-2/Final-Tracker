import React, { useState, useEffect } from 'react';
import { X, Lock, User, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginModal({ role, isOpen, onClose }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clear inputs when modal opens/closes
  useEffect(() => {
    setEmail('');
    setPassword('');
    setErrorMsg('');
  }, [isOpen, role]);

  if (!isOpen) return null;

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

    if (res.success) {
      onClose();
    } else {
      setErrorMsg(res.error || 'Invalid credentials. Please try again.');
    }
  };

  const getRoleDetails = () => {
    switch (role) {
      case 'student':
        return {
          title: 'Student Work Desk',
          subtitle: 'Access your final year capstone progress and log updates.',
          label: 'University USN / Roll ID or Email',
          placeholder: 'e.g. 1RV22CS089 or student@tracker.com',
          mockHint: 'Default: student@tracker.com / password123'
        };
      case 'guide':
        return {
          title: 'Guide Access Portal',
          subtitle: 'Review logged weekly tasks and add evaluation marks.',
          label: 'Guide Email Address',
          placeholder: 'e.g. guide@tracker.com',
          mockHint: 'Default: guide@tracker.com / password123'
        };
      case 'hod':
        return {
          title: 'HOD / Coordinator Panel',
          subtitle: 'Configure departments, register groups, and check milestones.',
          label: 'Official Email Address',
          placeholder: 'e.g. hod@tracker.com',
          mockHint: 'Default: hod@tracker.com / password123'
        };
      default:
        return {};
    }
  };

  const details = getRoleDetails();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark overlay backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-[#0B1220]/60 backdrop-blur-sm transition-opacity"
      ></div>

      {/* Modal Content */}
      <div className="bg-white rounded-[24px] border border-slate-100 shadow-2xl max-w-md w-full p-8 relative z-10 animate-fade-in-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            {role === 'student' ? <User className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-[#0B1220]">
              {details.title}
            </h3>
            <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">
              Secure Sign In
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-500 font-semibold mb-6 leading-relaxed">
          {details.subtitle}
        </p>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-650 rounded-xl text-xs flex items-center gap-2 font-bold animate-fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-extrabold text-slate-405 uppercase tracking-wider mb-1">
              {details.label}
            </label>
            <input
              type="text"
              required
              disabled={isSubmitting}
              placeholder={details.placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-xs font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 transition-colors bg-slate-50 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-[10px] font-extrabold text-slate-405 uppercase tracking-wider mb-1">
              Secret Password
            </label>
            <input
              type="password"
              required
              disabled={isSubmitting}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-xs font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 transition-colors bg-slate-50 focus:bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 text-xs font-bold text-white px-5 py-3.5 rounded-xl bg-[#0B1220] hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 shadow-md disabled:bg-slate-400 disabled:cursor-not-allowed cursor-pointer"
          >
            <span>{isSubmitting ? 'Authenticating...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Mock Credentials Help */}
        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <span className="text-[10px] font-bold text-slate-400 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-full inline-block">
            💡 {details.mockHint}
          </span>
        </div>
      </div>
    </div>
  );
}
