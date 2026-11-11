import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteProduct, getProduct, getProducts } from '../services/service.js'

export function useProducts() {
  const { data, isPending, error } = useQuery({
    queryKey: ['products'],
    queryFn: ({ signal }) => getProducts(signal),
  })

  return { products: data ?? [], loading: isPending, error: error?.message }
}

export function useProduct(id) {
  const { data, isPending, error } = useQuery({
    queryKey: ['products', id],
    queryFn: ({ signal }) => getProduct(id, signal),
  })

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
