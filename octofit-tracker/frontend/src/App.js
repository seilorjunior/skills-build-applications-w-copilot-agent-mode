import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <span className="navbar-brand">
            <img src="/octofitapp-small.png" alt="OctoFit logo" />
            OctoFit Tracker
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {[
                { to: '/users',       label: 'Users' },
                { to: '/teams',       label: 'Teams' },
                { to: '/activities',  label: 'Activities' },
                { to: '/leaderboard', label: 'Leaderboard' },
                { to: '/workouts',    label: 'Workouts' },
              ].map(({ to, label }) => (
                <li className="nav-item" key={to}>
                  <NavLink
                    className={({ isActive }) => 'nav-link' + (isActive ? ' active fw-semibold' : '')}
                    to={to}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <div className="octofit-hero text-center">
        <h1>OctoFit Tracker</h1>
        <p>Track activities, compete with teams, and crush your fitness goals.</p>
      </div>

      <div className="container pb-5">
        <Routes>
          <Route path="/"            element={<Leaderboard />} />
          <Route path="/users"       element={<Users />} />
          <Route path="/teams"       element={<Teams />} />
          <Route path="/activities"  element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts"    element={<Workouts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
