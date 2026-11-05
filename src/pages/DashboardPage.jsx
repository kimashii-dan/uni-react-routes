import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts.js'
import Message from '../components/Message.jsx'
import '../styles/DashboardPage.css'

const STATUSES = ['In Stock', 'Low Stock', 'Out of Stock']

function average(list, key) {
  if (list.length === 0) {
    return 0
  }
  return list.reduce((sum, item) => sum + item[key], 0) / list.length
}

function DashboardPage() {
  const { products, loading, error } = useProducts()
  const [category, setCategory] = useState('')

  if (loading) {
    return <Message type="loading">Loading dashboard...</Message>
  }

  if (error) {
    return <Message type="error">{error}</Message>
  }

  const categories = [...new Set(products.map((product) => product.category))]
  const list = category ? products.filter((product) => product.category === category) : products

  const stats = [
    ['Products', list.length],
    ['Average price', `$${average(list, 'price').toFixed(2)}`],
    ['Average rating', average(list, 'rating').toFixed(2)],
    ['Total stock', list.reduce((sum, product) => sum + product.stock, 0)],
    ['Low or out of stock', list.filter((product) => product.availabilityStatus !== 'In Stock').length],
  ]

  const topRated = list.toSorted((a, b) => b.rating - a.rating).slice(0, 5)

  function stockLink(status) {
    const params = new URLSearchParams({ stock: status })
    if (category) {
      params.set('category', category)
    }
    return `/products?${params}`
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="page-title">Dashboard</h1>
        <select aria-label="Filter by category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="stats">
        {stats.map(([label, value]) => (
          <div key={label} className="stat">
            <span className="stat-label">{label}</span>
            <span className="stat-value">{value}</span>
          </div>
        ))}
      </div>

      <div className="breakdowns">
        <section className="panel">
          <h2>By availability</h2>
          <ul className="breakdown-list">
            {STATUSES.map((status) => (
              <li key={status}>
                <Link to={stockLink(status)} className="breakdown-row">
                  <span>{status}</span>
                  <span className="breakdown-value">
                    {list.filter((product) => product.availabilityStatus === status).length}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel">
          <h2>Top rated</h2>
          <ol className="breakdown-list">
            {topRated.map((product) => (
              <li key={product.id}>
                <Link to={`/products/${product.id}`} className="breakdown-row">
                  <span>{product.title}</span>
                  <span className="breakdown-value">★ {product.rating}</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <Link to={category ? `/products?category=${encodeURIComponent(category)}` : '/products'} className="button button-primary dashboard-all">
        View all products
      </Link>
    </div>
  )
}

export default DashboardPage
