import React, {useState, useEffect} from 'react';
import logo from "./logo.svg";
import "./App.css";

function App() {

  let [payload, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api")
      .then(response => response.json())
      .then(
        (data) => {
          setData(data)
        },
        (error) => {
          console.log("Uh-oh!");
          console.log(error.message);
        }
      )
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!payload ? "Loading..." : payload.message}</p>
      </header>
    </div>
  );
}

export default App;
