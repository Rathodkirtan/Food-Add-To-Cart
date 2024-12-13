import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Home from './componets/Home';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Home/>
    </>
  )
}

export default App
