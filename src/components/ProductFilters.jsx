import '../styles/ProductFilters.css'

function ProductFilters({ search, category, stock, sort, categories, onChange }) {
  return (
    <div className="filters">
      <input
        type="search"
        className="filters-search"
        placeholder="Search by title or brand"
        aria-label="Search"
        value={search}
        onChange={(e) => onChange('q', e.target.value)}
      />
      <select aria-label="Filter by category" value={category} onChange={(e) => onChange('category', e.target.value)}>
        <option value="">All categories</option>
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <select aria-label="Filter by availability" value={stock} onChange={(e) => onChange('stock', e.target.value)}>
        <option value="">Any availability</option>
        <option value="In Stock">In Stock</option>
        <option value="Low Stock">Low Stock</option>
        <option value="Out of Stock">Out of Stock</option>
      </select>
      <select aria-label="Sort" value={sort} onChange={(e) => onChange('sort', e.target.value)}>
        <option value="">Default order</option>
        <option value="price-asc">Price: low to high</option>
        <option value="price-desc">Price: high to low</option>
        <option value="rating">Top rated</option>
        <option value="title">Title A–Z</option>
      </select>
    </div>
  )
}

export default ProductFilters
