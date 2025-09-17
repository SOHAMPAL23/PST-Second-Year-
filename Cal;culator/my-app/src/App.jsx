import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Calculator from './Calculator'
import API from './API'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Calculator/> */}
      <API/>
    </>
  )
}

export default App
