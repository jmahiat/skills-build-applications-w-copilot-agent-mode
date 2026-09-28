import { NavLink, Route, Routes } from 'react-router-dom'

function OctofitApp() {
  return (
    <div className="min-vh-100 bg-light">
      <header className="navbar border-bottom bg-white">
        <div className="container">
          <NavLink to="/" className="navbar-brand d-flex align-items-center gap-2">
            <img src="/octofitapp-small.png" width="36" height="36" alt="" />
            <span>OctoFit Tracker</span>
          </NavLink>
        </div>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <main className="container py-5">
              <h1 className="h2">Your fitness, in one place</h1>
              <p className="text-secondary mb-0">
                Your activity dashboard is ready to build.
              </p>
            </main>
          }
        />
      </Routes>
    </div>
  )
}

export default OctofitApp