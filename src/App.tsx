import { useState } from 'react'
import './App.css'
import Register from './components/register/register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="App">
      <Register />
    </main>
  )
}

export default App
