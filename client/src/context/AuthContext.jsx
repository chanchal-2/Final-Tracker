import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      // --- MOCK BYPASS (no MongoDB needed) ---
      // Commented out to ensure it uses the live database API
      /*
      if (token === 'mock-token-hod') {
        setUser({ _id: 'mock-hod-123', name: 'Prof. H.R. Gowda', email: 'hod@projecttracker.edu', role: 'hod', department: 'Computer Science' });
        setLoading(false);
        return;
      }
      if (token === 'mock-token-student') {
        setUser({ _id: 'mock-student-123', name: 'Naveen Malviya', email: 'student@tracker.com', role: 'student', department: 'Computer Science' });
        setLoading(false);
        return;
      }
      if (token === 'mock-token-guide') {
        setUser({ _id: 'user_guide_rao', name: 'Dr. Ananya Rao', email: 'guide@tracker.com', role: 'guide', department: 'Computer Science' });
        setLoading(false);
        return;
      }
      */
      // ----------------------------------------

      try {
        const res = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
        } else {
          localStorage.removeItem('token');
          setToken('');
          setUser(null);
        }
      } catch (err) {
        // Network error (server offline) — clear invalid token so we don't get stuck
        console.warn('Auth server unreachable:', err.message);
        localStorage.removeItem('token');
        setToken('');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    // --- MOCK BYPASS ---
    // Commented out to ensure it uses the live database API
    /*
    if (email === 'hod' || email.toLowerCase().includes('hod')) {
      const u = { _id: 'mock-hod-123', name: 'Prof. H.R. Gowda', email: 'hod@projecttracker.edu', role: 'hod', department: 'Computer Science' };
      localStorage.setItem('token', 'mock-token-hod');
      setToken('mock-token-hod');
      setUser(u);
      return { success: true };
    }
    if (email.toLowerCase().includes('student') || email === 'student@tracker.com') {
      const u = { _id: 'mock-student-123', name: 'Naveen Malviya', email: 'student@tracker.com', role: 'student', department: 'Computer Science' };
      localStorage.setItem('token', 'mock-token-student');
      setToken('mock-token-student');
      setUser(u);
      return { success: true };
    }
    if (email.toLowerCase().includes('guide') || email === 'guide@tracker.com') {
      const u = { _id: 'mock-guide-123', name: 'Dr. S. Sharma', email: 'guide@tracker.com', role: 'guide', department: 'Computer Science' };
      localStorage.setItem('token', 'mock-token-guide');
      setToken('mock-token-guide');
      setUser(u);
      return { success: true };
    }
    */
    // -------------------

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser({ _id: data._id, name: data.name, email: data.email, role: data.role, department: data.department, projectId: data.projectId });
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
