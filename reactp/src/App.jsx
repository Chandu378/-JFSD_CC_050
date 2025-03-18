import './App.css'
import Component from './Component.jsx'
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <>
      <Component />
      <p>Count: {count}</p>
      <button onClick={incrementCount}>Increment</button>
    </>
  )
}

export default App