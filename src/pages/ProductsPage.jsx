import { useSearchParams } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts.js'
import Message from '../components/Message.jsx'
import Pagination from '../components/Pagination.jsx'
import ProductCard from '../components/ProductCard.jsx'
import ProductFilters from '../components/ProductFilters.jsx'
import '../styles/ProductsPage.css'

const PAGE_SIZE = 12

const sorters = {
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating,
  title: (a, b) => a.title.localeCompare(b.title),
}

function ProductsPage() {
  const { products, loading, error } = useProducts()
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('q') || ''
  const category = searchParams.get('category') || ''
  const stock = searchParams.get('stock') || ''
  const sort = searchParams.get('sort') || ''

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams)
    if (value) {
      next.set(key, value)
    } else {
      next.delete(key)
    }
    if (key !== 'page') {
      next.delete('page')
    }
    setSearchParams(next, { replace: key === 'q' })
  }

  const categories = [...new Set(products.map((product) => product.category))]
  const text = search.trim().toLowerCase()

  let filtered = products.filter(
    (product) =>
      (product.title.toLowerCase().includes(text) || (product.brand || '').toLowerCase().includes(text)) &&
      (!category || product.category === category) &&
      (!stock || product.availabilityStatus === stock),
  )
  if (sorters[sort]) {
    filtered = filtered.toSorted(sorters[sort])
  }
  const totalPages = Math.max(Math.ceil(filtered.length / PAGE_SIZE), 1)
  const page = Math.min(Math.max(Math.floor(Number(searchParams.get('page'))) || 1, 1), totalPages)
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  let content
  if (loading) {
    content = <Message type="loading">Loading products...</Message>
  } else if (error) {
    content = <Message type="error">{error}</Message>
  } else if (pageItems.length === 0) {
    content = <Message type="empty">No products found</Message>
  } else {
    content = (
      <div className="product-grid">
        {pageItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    )
  }

  return (
    <div className="products-page">
      <div className="list-header">
        <h1 className="page-title">Products</h1>
        {!loading && !error && <span className="list-count">{filtered.length}</span>}
      </div>
      <ProductFilters
        search={search}
        category={category}
        stock={stock}
        sort={sort}
        categories={categories}
        onChange={updateParam}
      />
      {content}
      {!loading && !error && (
        <Pagination
          page={page}
          total={filtered.length}
          pageSize={PAGE_SIZE}
          onPageChange={(value) => {
            updateParam('page', String(value))
            window.scrollTo(0, 0)
          }}
        />
      )}
    </div>
  )
}

export default ProductsPage
