import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteProduct, getProduct, getProducts } from '../services/service.js'

function useOfflineRedirect(paused) {
  const navigate = useNavigate()
  const { pathname, search } = useLocation()

  useEffect(() => {
    if (paused) {
      navigate('/offline', { replace: true, state: { from: pathname + search } })
    }
  }, [paused, navigate, pathname, search])
}

export function useProducts() {
  const { data, isPending, error, fetchStatus } = useQuery({
    queryKey: ['products'],
    queryFn: ({ signal }) => getProducts(signal),
  })
  useOfflineRedirect(isPending && fetchStatus === 'paused')

  return { products: data ?? [], loading: isPending, error: error?.message }
}

export function useProduct(id) {
  const { data, isPending, error, fetchStatus } = useQuery({
    queryKey: ['products', id],
    queryFn: ({ signal }) => getProduct(id, signal),
  })
  useOfflineRedirect(isPending && fetchStatus === 'paused')

  return { product: data, loading: isPending, error: error?.message }
}

export function useDeleteProduct() {
  const queryClient = useQueryClient()
  const { mutate, isPending, error } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  })

  return { deleteProduct: mutate, deleting: isPending, deleteError: error?.message }
}
