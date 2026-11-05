import { Link, NavLink } from 'react-router-dom'
import '../styles/NavBar.css'

function NavBar() {
  return (
    <header className="header">
      <nav className="header-nav">
        <Link to="/" className="header-logo">
          Product Catalog
        </Link>
        <div className="header-links">
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
          <NavLink to="/login" className="button button-primary">
            Login
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default NavBar
