import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const navigate = useNavigate()
  const { isAuthenticated, login } = useAuth()
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  const [credentials, setCredentials] = useState({ email: '', password: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add your validation logic here
    login({ 
      name: 'User', 
      email: credentials.email 
    })
    navigate('/dashboard')
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login to Expense Tracker</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={credentials.email}
            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            autoComplete="current-password"
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
