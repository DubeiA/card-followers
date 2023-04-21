// import logo from './logo.svg';
import { useState } from "react";
import "./App.css";

function App() {
  const [inc, setInc] = useState(0);

  const counter = () => {
    setInc((prevInc) => prevInc + 1);
  };
  return (
    <div className="App">
      <p>Hi there</p>
      <h1> I create a new project</h1>

      <button onClick={counter}> + 1 {inc}</button>
    </div>
  );
}

export default App;
