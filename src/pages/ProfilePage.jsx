import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.js'
import '../styles/LoginPage.css'

function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  return (
    <div className="login-page">
      <div className="panel login-form">
        <h1 className="page-title">Profile</h1>
        <p>
          <span className="form-label">Email:</span> {user.email}
        </p>
        <p>
          <span className="form-label">UID:</span> {user.uid}
        </p>
        <button className="button button-primary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default ProfilePage
