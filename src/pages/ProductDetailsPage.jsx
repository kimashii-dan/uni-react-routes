import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDeleteProduct, useProduct } from '../hooks/useProducts.js'
import Message from '../components/Message.jsx'
import '../styles/ProductDetailsPage.css'

function ProductDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { product, loading, error } = useProduct(id)
  const { deleteProduct, deleting, deleteError } = useDeleteProduct()

  let content
  if (loading) {
    content = <Message type="loading">Loading product...</Message>
  } else if (error) {
    content = <Message type="error">{error}</Message>
  } else {
    const fields = [
      ['Price', `$${product.price}`],
      ['Discount', `${product.discountPercentage}%`],
      ['Rating', `★ ${product.rating}`],
      ['Stock', product.stock],
      ['Availability', product.availabilityStatus],
      ['Brand', product.brand || '—'],
      ['Category', product.category],
      ['SKU', product.sku],
      ['Warranty', product.warrantyInformation],
      ['Shipping', product.shippingInformation],
      ['Return policy', product.returnPolicy],
    ]

    content = (
      <article className="detail">
        <div className="detail-top">
          <img className="detail-image" src={product.thumbnail} alt={product.title} />
          <div>
            <h1 className="page-title">{product.title}</h1>
            <p className="detail-description">{product.description}</p>
          </div>
        </div>
        <dl className="detail-fields">
          {fields.map(([label, value]) => (
            <div key={label} className="detail-field">
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </article>
    )
  }

  return (
    <div className="detail-page">
      <div className="detail-nav">
        <button className="button button-secondary" onClick={() => (location.key === 'default' ? navigate('/products') : navigate(-1))}>
          ← Back
        </button>
        <Link to="/products" className="button button-secondary">
          All products
        </Link>
        {product && (
          <button className="button button-secondary" disabled={deleting} onClick={() => deleteProduct(id, { onSuccess: () => navigate('/products') })}>
            Delete
          </button>
        )}
      </div>
      {deleteError && <Message type="error">{deleteError}</Message>}
      {content}
    </div>
  )
}

export default ProductDetailsPage
