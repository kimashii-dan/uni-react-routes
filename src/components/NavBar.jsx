import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.js'
import '../styles/NavBar.css'

function NavBar() {
  const { user, loading, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  return (
    <header className="header">
      <nav className="header-nav">
        <Link to="/" className="header-logo" onClick={() => setOpen(false)}>
          Product Catalog
        </Link>
        <button
          className="button button-secondary header-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? '✕' : '☰'}
        </button>
        <div className={`header-links${open ? ' open' : ''}`} onClick={() => setOpen(false)}>
          <NavLink to="/" end className="header-link">
            Home
          </NavLink>
          <NavLink to="/products" className="header-link">
            Products
          </NavLink>
          <NavLink to="/dashboard" className="header-link">
            Dashboard
          </NavLink>
          <NavLink to="/about" className="header-link">
            About
          </NavLink>
          {!loading && user && (
            <>
              <NavLink to="/profile" className="header-link">
                Profile
              </NavLink>
              <button className="button button-primary" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
          {!loading && !user && (
            <>
              <NavLink to="/login" className="button button-primary">
                Login
              </NavLink>
              <NavLink to="/signup" className="header-link">
                Signup
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default NavBar
