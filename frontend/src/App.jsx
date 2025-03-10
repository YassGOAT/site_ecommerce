import React, {useEffect} from 'react'





function App() {
  useEffect(() => {
    fetch('localhost:8081/utilisateur')
    .then(res => res.json())
    .then(data => console.log(data))
    .then (err => console.log(err))
  }, [])
  return (
    <div></div>
  
  )
}

export default App