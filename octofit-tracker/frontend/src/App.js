import './App.css';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const navigationItems = [
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  return (
    <div className="app-shell min-vh-100">
      <nav className="navbar navbar-expand-lg app-navbar">
        <div className="container d-flex flex-column flex-lg-row align-items-lg-center gap-3">
          <span className="navbar-brand d-inline-flex align-items-center gap-3 fw-semibold">
            <span className="brand-mark">
              <img src={`${process.env.PUBLIC_URL}/octofitapp-small.png`} alt="OctoFit logo" />
            </span>
            <span>
              <span className="brand-title d-block">OctoFit Tracker</span>
              <span className="brand-subtitle d-block">Move with purpose</span>
            </span>
          </span>
          <div className="navbar-nav flex-row flex-wrap ms-lg-auto gap-2">
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded-pill ${isActive ? 'active fw-semibold' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <main className="container py-4 py-lg-5">
        <section className="hero-card card border-0 shadow-sm mb-4 overflow-hidden">
          <div className="card-body p-4 p-lg-5">
            <div className="row g-4 align-items-center">
              <div className="col-lg-8">
                <p className="hero-eyebrow fw-semibold small mb-2">
                  React frontend connected to the Django REST API
                </p>
                <h1 className="display-6 fw-bold mb-3">OctoFit activity dashboard</h1>
                <p className="hero-copy mb-4">
                  Browse users, teams, activities, leaderboard entries, and workouts from a
                  single Bootstrap-based control center with consistent tables and details views.
                </p>
                <div className="d-flex flex-wrap gap-2">
                  <NavLink className="btn btn-primary" to="/users">
                    Explore users
                  </NavLink>
                  <a className="btn btn-outline-secondary" href="#resource-content">
                    Jump to data
                  </a>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card dashboard-summary border-0 h-100">
                  <div className="card-body">
                    <h2 className="h5 mb-3">Frontend standards applied</h2>
                    <ul className="list-group list-group-flush small">
                      <li className="list-group-item px-0">Bootstrap navigation and headings</li>
                      <li className="list-group-item px-0">Card-based section framing</li>
                      <li className="list-group-item px-0">Shared forms, buttons, links, and modals</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div id="resource-content">
          <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
