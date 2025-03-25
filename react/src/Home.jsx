import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Clear the local storage
    localStorage.removeItem('token')
    // Redirect to login page
    navigate('/')
  }

  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home