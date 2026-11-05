import { useEffect, useState } from 'react'
import { getProduct, getProducts } from '../services/service.js'

export function useProducts() {
  const [state, setState] = useState({ loaded: false, data: [], error: null })

  useEffect(() => {
    getProducts()
      .then((data) => setState({ loaded: true, data, error: null }))
      .catch((error) => setState({ loaded: true, data: [], error: error.message }))
  }, [])

  return { products: state.data, loading: !state.loaded, error: state.error }
}

export function useProduct(id) {
  const [results, setResults] = useState({})

  useEffect(() => {
    getProduct(id)
      .then((data) => setResults((prev) => ({ ...prev, [id]: { data } })))
      .catch((error) => setResults((prev) => ({ ...prev, [id]: { error: error.message } })))
  }, [id])

  const result = results[id]
  return { product: result?.data, loading: !result, error: result?.error }
}
