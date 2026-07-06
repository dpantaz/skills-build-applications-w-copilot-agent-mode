import { NavLink, Navigate, Route, Routes } from 'react-router-dom'

import { apiBaseUrl, apiEnvironment } from './api.js'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import logoUrl from '/docs/octofitapp-small.png'

/**
 * Main App Component
 * 
 * Provides application shell with:
 * - Sidebar navigation using react-router-dom NavLink
 * - API status indicator showing current API base URL and environment
 * - Route definitions for all major sections
 * 
 * API Configuration:
 * - Uses import.meta.env.VITE_CODESPACE_NAME for Codespaces URL
 * - Falls back to localhost:8000 for local development
 * - See .env.local.example for configuration
 */
function App() {
  const navItems = [
    { to: '/users', label: 'Users' },
    { to: '/teams', label: 'Teams' },
    { to: '/activities', label: 'Activities' },
    { to: '/leaderboard', label: 'Leaderboard' },
    { to: '/workouts', label: 'Workouts' },
  ]

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <img src={logoUrl} alt="OctoFit Tracker" />
          <div>
            <span className="eyebrow">OctoFit</span>
            <strong>Tracker</strong>
          </div>
        </div>

        {/* Navigation using react-router-dom */}
        <nav className="nav flex-column gap-2" aria-label="OctoFit sections">
          {navItems.map((item) => (
            <NavLink className="nav-link" key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="main-stage">
        {/* Status strip displays current API configuration */}
        <section className="status-strip">
          <div>
            <span className="eyebrow">API</span>
            <p>{apiBaseUrl}</p>
          </div>
          <span className="environment-pill">{apiEnvironment}</span>
        </section>

        {/* React Router Routes */}
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
