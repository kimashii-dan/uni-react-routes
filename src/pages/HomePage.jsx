import { Link } from 'react-router-dom'
import heroImg from '../assets/hero.png'
import '../styles/HomePage.css'

function HomePage() {
  return (
    <section className="home">
      <div className="home-text">
        <h1 className="page-title">Find your next product</h1>
        <p className="home-intro">
          Browse a catalog of products from the DummyJSON API. Search, filter and sort the list, open any product for
          details, or check the dashboard for quick statistics.
        </p>
        <div className="home-links">
          <Link to="/products" className="button button-primary">
            Browse products
          </Link>
          <Link to="/dashboard" className="button button-secondary">
            Dashboard
          </Link>
          <Link to="/about" className="button button-secondary">
            About
          </Link>
        </div>
      </div>
      <img className="home-image" src={heroImg} alt="Product Catalog" />
    </section>
  )
}

export default HomePage
