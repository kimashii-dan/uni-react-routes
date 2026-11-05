import { useState } from 'react'
import '../styles/LoginPage.css'

function LoginPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="login-page">
      <form className="panel login-form" onSubmit={handleSubmit}>
        <h1 className="page-title">Login</h1>
        <label className="form-field">
          <span className="form-label">Email</span>
          <input type="email" name="email" placeholder="you@example.com" />
        </label>
        <label className="form-field">
          <span className="form-label">Password</span>
          <input type="password" name="password" placeholder="••••••••" />
        </label>
        <button type="submit" className="button button-primary">
          Sign in
        </button>
        {submitted && <p className="login-note">Authentication coming soon</p>}
      </form>
    </div>
  )
}

export default LoginPage
