import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="panel not-found">
      <h1 className="page-title">404</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="button button-primary">
        Go home
      </Link>
    </section>
  )
}

export default NotFoundPage
