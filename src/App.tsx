import { useState } from 'react'
import './App.css'
import Login from './components/login'
import Register from './components/register'


function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="App">
      <Register />
      <Login />
    </main>
  )
}

export default App
