import { useState } from 'react'
import Logo from '/Logo.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const getData = async () => {
    let data
    //const response = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Hayden%20idaho?unitGroup=us&key=K9L2PYB8W29VGJU8L6TBM4G9Z&contentType=json", {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
      "method": "GET",
      "headers": {
      }
      })
    .catch(err => {
      console.error(err)
    })

    data = await response.json()
    return data
}

;(async () => {
  const data = await getData()
  console.log(data)
})()

  return (
    <>
      <div>
        <a>
          <img src={Logo} className="logo" alt="logo" />
        </a>
      </div>
      <h1>data</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
