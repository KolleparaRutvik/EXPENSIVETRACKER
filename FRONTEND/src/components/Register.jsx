import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Auth.css'

function Register() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add your registration logic here
    navigate('/login')
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={userData.name}
            onChange={(e) => setUserData({...userData, name: e.target.value})}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={userData.email}
            onChange={(e) => setUserData({...userData, email: e.target.value})}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={userData.password}
            onChange={(e) => setUserData({...userData, password: e.target.value})}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={userData.confirmPassword}
            onChange={(e) => setUserData({...userData, confirmPassword: e.target.value})}
            required
          />
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
