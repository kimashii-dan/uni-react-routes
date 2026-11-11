import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.js'
import '../styles/LoginPage.css'

function LoginPage() {
  const { login, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function run(action) {
    setError('')
    setSubmitting(true)
    try {
      await action()
      navigate('/profile')
    } catch (err) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    run(() => login(email, password))
  }

  return (
    <div className="login-page">
      <form className="panel login-form" onSubmit={handleSubmit}>
        <h1 className="page-title">Login</h1>
        <label className="form-field">
          <span className="form-label">Email</span>
          <input type="email" name="email" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="form-field">
          <span className="form-label">Password</span>
          <input type="password" name="password" placeholder="••••••••" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit" className="button button-primary" disabled={submitting}>
          Sign in
        </button>
        <button type="button" className="button button-secondary" disabled={submitting} onClick={() => run(loginWithGoogle)}>
          Sign in with Google
        </button>
        {error && <p className="login-note">{error}</p>}
        <p>
          No account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  )
}

export default LoginPage
