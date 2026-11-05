const BASE_URL = 'https://dummyjson.com'

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products?limit=0`)
  if (!res.ok) {
    throw new Error('Failed to load products')
  }
  const data = await res.json()
  return data.products
}

export async function getProduct(id) {
  const res = await fetch(`${BASE_URL}/products/${encodeURIComponent(id)}`)
  if (res.status === 404) {
    throw new Error('Product not found')
  }
  if (!res.ok) {
    throw new Error('Failed to load product')
  }
  return res.json()
}
