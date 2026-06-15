import React from 'react';
import { GraduationCap, Mail } from 'lucide-react';

export default function Footer({ onScrollToSection }) {
  return (
    <footer className="bg-[#0B1220] border-t border-slate-800 pt-16 pb-8 relative z-10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-indigo-500/10 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">Project<span className="text-indigo-400">Tracker</span></span>
            </div>
            <p className="text-sm text-slate-400 font-medium leading-relaxed mb-6 max-w-xs">
              The ultimate academic hub for centralizing student capstone projects, simplifying milestone evaluations, and streamlining feedback.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Platform</h4>
            <ul className="space-y-3">
              <li><button onClick={() => onScrollToSection('home')} className="text-sm text-slate-400 hover:text-indigo-400 transition-colors font-medium">Home</button></li>
              <li><button onClick={() => onScrollToSection('features')} className="text-sm text-slate-400 hover:text-indigo-400 transition-colors font-medium">Features</button></li>
              <li><button onClick={() => onScrollToSection('workflow')} className="text-sm text-slate-400 hover:text-indigo-400 transition-colors font-medium">How it Works</button></li>
              <li><button onClick={() => onScrollToSection('about')} className="text-sm text-slate-400 hover:text-indigo-400 transition-colors font-medium">About Us</button></li>
            </ul>
          </div>

          {/* Roles */}
          <div>
            <h4 className="text-white font-bold mb-6">Solutions For</h4>
            <ul className="space-y-3">
              <li><a href="#login" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors font-medium">Students</a></li>
              <li><a href="#login" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors font-medium">Faculty & Guides</a></li>
              <li><a href="#login" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors font-medium">Department HODs</a></li>
              <li><a href="#login" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors font-medium">Administrators</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-indigo-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white">Support</p>
                  <a href="mailto:support@projecttracker.edu" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">support@projecttracker.edu</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-indigo-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white">Academic Office</p>
                  <p className="text-sm text-slate-400">123 University Campus, Block B, Tech Wing.</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 font-medium">
            © {new Date().getFullYear()} ProjectTracker Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-500 font-medium">
            <a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
