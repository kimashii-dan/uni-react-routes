import { Link } from 'react-router-dom'
import '../styles/ProductCard.css'

function ProductCard({ product }) {
  return (
    <Link to={`/products/${product.id}`} className="card">
      <img className="card-image" src={product.thumbnail} alt={product.title} loading="lazy" />
      <div className="card-body">
        <h2 className="card-title">{product.title}</h2>
        <div className="card-meta">
          {product.brand && <span>{product.brand}</span>}
          <span className="card-category">{product.category}</span>
        </div>
        <div className="card-bottom">
          <span className="card-price">${product.price}</span>
          <span className="card-meta">★ {product.rating}</span>
        </div>
        <span className="card-stock">{product.availabilityStatus}</span>
      </div>
    </Link>
  )
}

export default ProductCard
