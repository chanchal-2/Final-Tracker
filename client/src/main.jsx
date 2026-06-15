import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

// Error Boundary to catch silent React crashes
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, info) {
    console.error('App crashed:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ fontFamily: 'sans-serif', padding: 40, background: '#0B1220', minHeight: '100vh', color: 'white' }}>
          <h2 style={{ color: '#f87171' }}>⚠️ Something went wrong</h2>
          <pre style={{ background: '#1e293b', padding: 20, borderRadius: 12, fontSize: 13, color: '#fca5a5', overflowX: 'auto' }}>
            {this.state.error?.toString()}
          </pre>
          <button
            onClick={() => { localStorage.clear(); window.location.href = '/'; }}
            style={{ marginTop: 20, background: '#4f46e5', color: 'white', border: 'none', padding: '10px 24px', borderRadius: 8, cursor: 'pointer', fontSize: 14 }}
          >
            Clear Session & Reload
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>,
)
