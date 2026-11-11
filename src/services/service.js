const BASE_URL = 'https://dummyjson.com'

export async function getProducts(signal) {
  const res = await fetch(`${BASE_URL}/products?limit=0`, { signal })
  if (!res.ok) {
    throw new Error('Failed to load products')
  }
  const data = await res.json()
  return data.products
}

export async function getProduct(id, signal) {
  const res = await fetch(`${BASE_URL}/products/${encodeURIComponent(id)}`, { signal })
  if (res.status === 404) {
    throw new Error('Product not found')
  }
  if (!res.ok) {
    throw new Error('Failed to load product')
  }
  return res.json()
}

export async function deleteProduct(id) {
  const res = await fetch(`${BASE_URL}/products/${encodeURIComponent(id)}`, { method: 'DELETE' })
  if (!res.ok) {
    throw new Error('Failed to delete product')
  }
  return res.json()
}
