import {
  BrowserRouter as Router, Route, Routes
} from 'react-router-dom'
import './App.css'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import ErrorPage from './ErrorPage'
import About from './About'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  )
}

export default App