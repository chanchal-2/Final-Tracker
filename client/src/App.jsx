import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutCard from './components/AboutCard';
import FeaturesSection from './components/FeaturesSection';
import Workflow from './components/Workflow';
import Footer from './components/Footer';

import CtaSection from './components/CtaSection';
import HodLoginPage from './components/HodLoginPage';
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

  // Full-screen HOD Login Page
  if (!user && loginRole === 'hod') {
    return <HodLoginPage onBack={() => handleSetLoginRole(null)} />;
  }

  return (
    <div className="min-h-screen font-sans selection:bg-indigo-600 selection:text-white flex flex-col justify-between">
      {/* Shared fixed Navbar (hidden for student, guide, and hod dashboards since they have their own) */}
      {!(user && (user.role === 'student' || user.role === 'guide' || user.role === 'hod')) && (
        <Navbar 
          onLoginClick={handleSetLoginRole} 
          onScrollToSection={scrollToSection} 
        />
      )}

      {/* Main Content Area */}
      <main className="flex-grow">
        {user ? (
          user.role === 'student' ? <StudentDashboard /> : 
          user.role === 'guide' ? <GuideDashboard /> : 
          <HodDashboard />
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

      {/* Footer (hidden for student, guide, and hod dashboards) */}
      {!(user && (user.role === 'student' || user.role === 'guide' || user.role === 'hod')) && (
        <Footer onScrollToSection={scrollToSection} />
      )}
    </div>
  );
}

export default function App() {
  return <AppContent />;
}

