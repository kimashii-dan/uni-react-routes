import { useLocation, useNavigate } from 'react-router-dom'

function OfflinePage() {
  const navigate = useNavigate()
  const { state } = useLocation()

  return (
    <section className="panel not-found">
      <h1 className="page-title">You are offline</h1>
      <p>
        This page could not be loaded without an internet connection. Previously visited pages and products are still
        available.
      </p>
      <button className="button button-primary" onClick={() => navigate(state?.from || '/', { replace: true })}>
        Retry Connection
      </button>
    </section>
  )
}

export default OfflinePage
