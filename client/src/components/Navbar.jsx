import React, { useState } from 'react';
import { GraduationCap, Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onLoginClick, onScrollToSection }) {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0B1220] text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left Side: Logo */}
        <div 
          onClick={() => onScrollToSection('home')} 
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-lg font-extrabold tracking-[-0.03em] block">
              Project<span className="text-indigo-400">Tracker</span>
            </span>
            <span className="text-[8px] uppercase tracking-widest text-slate-400 font-bold block -mt-1">
              Academic Hub
            </span>
          </div>
        </div>

        {/* Center: Navigation (only if not logged in or on landing context) */}
        {!user && (
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
            <button 
              onClick={() => onScrollToSection('home')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <button 
              onClick={() => onScrollToSection('about')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              About
            </button>
            <button 
              onClick={() => onScrollToSection('features')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Features
            </button>
            <button 
              onClick={() => onScrollToSection('workflow')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Workflow
            </button>
          </nav>
        )}

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-full text-slate-200">
                <span className={`w-2 h-2 rounded-full ${
                  user.role === 'hod' ? 'bg-amber-400' : user.role === 'guide' ? 'bg-indigo-400' : 'bg-emerald-400'
                }`}></span>
                <span className="capitalize">{user.role}: {user.name}</span>
              </span>
              <button
                onClick={logout}
                className="text-xs font-bold text-red-400 hover:bg-red-500/10 px-4 py-2.5 rounded-xl border border-red-500/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => onLoginClick('student')}
                className="text-[11px] font-semibold bg-[#1e293b] hover:bg-indigo-600 border border-slate-700 hover:border-indigo-500 text-white px-4 py-2.5 rounded-xl transition-all cursor-pointer"
              >
                Student Login
              </button>
              <button
                onClick={() => onLoginClick('guide')}
                className="text-[11px] font-semibold bg-[#1e293b] hover:bg-indigo-600 border border-slate-700 hover:border-indigo-500 text-white px-4 py-2.5 rounded-xl transition-all cursor-pointer"
              >
                Guide Login
              </button>
              <button
                onClick={() => onLoginClick('hod')}
                className="text-[11px] font-semibold bg-[#1e293b] hover:bg-indigo-600 border border-slate-700 hover:border-indigo-500 text-white px-4 py-2.5 rounded-xl transition-all cursor-pointer"
              >
                HOD Login
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          {user && (
            <button
              onClick={logout}
              className="p-2 text-red-400 hover:bg-red-500/10 rounded-xl"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 text-slate-200 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0F172A] border-t border-slate-800 px-4 py-6 space-y-4 text-xs font-bold uppercase tracking-wider text-slate-300 animate-fade-in">
          {!user ? (
            <>
              <button 
                onClick={() => { setMobileMenuOpen(false); onScrollToSection('home'); }} 
                className="block w-full text-left py-2 hover:text-white"
              >
                Home
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); onScrollToSection('about'); }} 
                className="block w-full text-left py-2 hover:text-white"
              >
                About
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); onScrollToSection('features'); }} 
                className="block w-full text-left py-2 hover:text-white"
              >
                Features
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); onScrollToSection('workflow'); }} 
                className="block w-full text-left py-2 hover:text-white"
              >
                Workflow
              </button>
              <hr className="border-slate-800 my-2" />
              <button
                onClick={() => { setMobileMenuOpen(false); onLoginClick('student'); }}
                className="block w-full text-center bg-[#1e293b] hover:bg-indigo-600 py-3 rounded-xl border border-slate-700 hover:border-indigo-500 text-white"
              >
                Student Login
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onLoginClick('guide'); }}
                className="block w-full text-center bg-[#1e293b] hover:bg-indigo-600 py-3 rounded-xl border border-slate-700 hover:border-indigo-500 text-white"
              >
                Guide Login
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onLoginClick('hod'); }}
                className="block w-full text-center bg-[#1e293b] hover:bg-indigo-600 py-3 rounded-xl border border-slate-700 hover:border-indigo-500 text-white"
              >
                HOD Login
              </button>
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 py-2 text-slate-200">
                <User className="w-5 h-5 text-indigo-400" />
                <span className="capitalize">{user.role}: {user.name}</span>
              </div>
              <button
                onClick={() => { setMobileMenuOpen(false); logout(); }}
                className="w-full py-3 bg-red-600/20 text-red-400 border border-red-500/20 text-center rounded-xl uppercase tracking-wider font-bold"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
