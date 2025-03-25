import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Signup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSignup = () => {
    localStorage.setItem(username, JSON.stringify({ username, password }))
    navigate('/')
  }

  return (
    <div>
      <h2>Signup</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Sign up</button>
      <p>Already have an account? <Link to="/">Login</Link></p>
    </div>
  )
}

export default Signup