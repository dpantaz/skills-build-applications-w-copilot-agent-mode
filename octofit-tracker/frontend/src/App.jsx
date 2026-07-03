import { NavLink, Navigate, Route, Routes } from 'react-router-dom'

import { apiBaseUrl, apiEnvironment } from './api'
import './App.css'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import logoUrl from '../../../docs/octofitapp-small.png'

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

        <nav className="nav flex-column gap-2" aria-label="OctoFit sections">
          {navItems.map((item) => (
            <NavLink className="nav-link" key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="main-stage">
        <section className="status-strip">
          <div>
            <span className="eyebrow">API</span>
            <p>{apiBaseUrl}</p>
          </div>
          <span className="environment-pill">{apiEnvironment}</span>
        </section>

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
