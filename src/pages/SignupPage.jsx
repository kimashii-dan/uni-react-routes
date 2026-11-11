import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.js'
import '../styles/LoginPage.css'

function SignupPage() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    setError('')
    setSubmitting(true)
    try {
      await signup(email, password)
      navigate('/profile')
    } catch (err) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <div className="login-page">
      <form className="panel login-form" onSubmit={handleSubmit}>
        <h1 className="page-title">Sign up</h1>
        <label className="form-field">
          <span className="form-label">Email</span>
          <input type="email" name="email" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="form-field">
          <span className="form-label">Password</span>
          <input type="password" name="password" placeholder="••••••••" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label className="form-field">
          <span className="form-label">Confirm password</span>
          <input type="password" name="confirm" placeholder="••••••••" required value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        </label>
        <button type="submit" className="button button-primary" disabled={submitting}>
          Create account
        </button>
        {error && <p className="login-note">{error}</p>}
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  )
}

export default SignupPage
