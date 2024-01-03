
import './App.css'

function App() {
  const api_key = import.meta.env.VITE_REACT_APP_API_KEY
  return (
    <>
      <h3>Hello World</h3>
      {console.log(api_key)}
    </>
  )
}

export default App
