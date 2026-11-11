import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.js'
import Message from './Message.jsx'

function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return <Message type="loading">Checking authentication...</Message>
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute
