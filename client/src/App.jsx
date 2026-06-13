import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutCard from './components/AboutCard';
import FeaturesSection from './components/FeaturesSection';
import Workflow from './components/Workflow';

import CtaSection from './components/CtaSection';
import LoginModal from './components/LoginModal';
import StudentLoginPage from './components/StudentLoginPage';
import StudentRegisterPage from './components/StudentRegisterPage';
import GuideLoginPage from './components/GuideLoginPage';
import StudentDashboard from './components/StudentDashboard';
import GuideDashboard from './components/GuideDashboard';
import HodDashboard from './components/HodDashboard';
import { useAuth } from './context/AuthContext';

function AppContent() {
  const { user, loading, logout } = useAuth();
  const [loginRole, setLoginRole] = useState(null); // 'student' | 'guide' | 'hod' | null

  // AGGRESSIVE BACK-BUTTON TRAP
  React.useEffect(() => {
    if (user) {
      // FORCE the browser history to have the homepage beneath the dashboard.
      // This completely overrides the history stack for this tab, guaranteeing
      // that swiping back goes to '/' and NEVER exits the app.
      window.history.replaceState(null, '', '/');
      window.history.pushState(null, '', '/#dashboard');
    } else {
      // Clean URL if logged out
      if (window.location.hash === '#dashboard') {
        window.history.replaceState(null, '', '/');
      }
    }
  }, [user]);

  // Handle Back/Forward Navigation
  React.useEffect(() => {
    const handlePopState = () => {
      // If we popped out of the dashboard back to the home page (hash removed)
      if (user && window.location.hash !== '#dashboard') {
        logout();
      }
      
      // If we popped out of a login modal
      if (!user && loginRole && window.location.hash !== '#login') {
        setLoginRole(null);
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [user, loginRole, logout]);

  const handleSetLoginRole = (role) => {
    if (role === loginRole) return;

    if (role && !loginRole) {
      window.history.pushState(null, '', '/#login');
      setLoginRole(role);
    } else if (role && loginRole) {
      window.history.replaceState(null, '', '/#login');
      setLoginRole(role);
    } else if (!role && loginRole) {
      // If closing manually, go back to clean history
      if (window.location.hash === '#login') {
        window.history.back();
      } else {
        setLoginRole(null);
      }
    }
  };

  // Function to smooth scroll to landing sections
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLearnMore = () => {
    scrollToSection('about');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest animate-pulse">
            Verifying Session...
          </span>
        </div>
      </div>
    );
  }

  // Full-screen Student Login Page
  if (!user && loginRole === 'student') {
    return (
      <StudentLoginPage 
        onBack={() => handleSetLoginRole(null)} 
        onRegister={() => handleSetLoginRole('student-register')} 
      />
    );
  }

  // Full-screen Student Registration Page
  if (!user && loginRole === 'student-register') {
    return (
      <StudentRegisterPage 
        onBack={() => handleSetLoginRole(null)} 
        onGoToLogin={() => handleSetLoginRole('student')} 
      />
    );
  }

  // Full-screen Guide Login Page
  if (!user && loginRole === 'guide') {
    return <GuideLoginPage onBack={() => handleSetLoginRole(null)} />;
  }

  return (
    <div className="min-h-screen font-sans selection:bg-indigo-600 selection:text-white flex flex-col justify-between">
      {/* Shared fixed Navbar (hidden for student dashboard since it has its own) */}
      {!(user && user.role === 'student') && (
        <Navbar onLoginClick={handleSetLoginRole} onScrollToSection={scrollToSection} />
      )}

      {/* Main Content Area */}
      {user && user.role === 'student' ? (
        <StudentDashboard />
      ) : (
        <main className="flex-grow">
          {user ? (
            // Logged in Workspace Dashboard Views
            user.role === 'guide' ? (
              <GuideDashboard />
            ) : (
              <HodDashboard />
            )
          ) : (
            // Logged out Landing Homepage Views
            <>
              <Hero onGetStarted={handleSetLoginRole} onLearnMore={handleLearnMore} />
              <AboutCard />
              <FeaturesSection />
              <Workflow />
              <CtaSection onCtaClick={handleSetLoginRole} />
            </>
          )}
        </main>
      )}

      {/* Footer (hidden for student dashboard) */}
      {!(user && user.role === 'student') && (
        <footer className="bg-[#0B1220] border-t border-slate-800 text-slate-400 py-10 text-center text-[10px] font-bold uppercase tracking-wider relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <span>© {new Date().getFullYear()} ProjectTracker. All rights reserved.</span>
            <div className="flex items-center gap-6">
              <button onClick={() => scrollToSection('home')} className="hover:text-white transition-colors">Home</button>
              <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">About</button>
              <button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">Features</button>
              <button onClick={() => scrollToSection('workflow')} className="hover:text-white transition-colors">Workflow</button>
            </div>
          </div>
        </footer>
      )}

      {/* Login Modals (for HOD only) */}
      <LoginModal 
        role={loginRole} 
        isOpen={!!loginRole && loginRole !== 'student' && loginRole !== 'student-register' && loginRole !== 'guide'} 
        onClose={() => handleSetLoginRole(null)} 
      />
    </div>
  );
}

export default function App() {
  return <AppContent />;
}

