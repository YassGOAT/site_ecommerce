import React, {use, useEffect, useState} from 'react'





function App() {
  
  const [data, setData] = useState([]),
  
  useEffect(() => {
    fetch('localhost:8081/utilisateur')
    .then(res => res.json())
    .then(data => setData(data))
    .then (err => console.log(err));
  }, [])
  return (
    <div></div>
  
  )
}

export default App