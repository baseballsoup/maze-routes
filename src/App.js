import logo from './logo.svg';
import './App.css';

import Board from './Components/Board';
import { useRef, useState } from 'react';

function App() {
  const childRef = useRef(null);
  const [size, setSize] = useState(15);

  function generateMaze() {
    childRef.current.generate_maze();
  }

  function resetMaze() {
    childRef.current.resetMaze(size);
  }

  function changeSize(event) {
    console.log("Size it should be => " + event.target.value);
    setSize(event.target.value);
    childRef.current.resetMaze(event.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='App-title'>Maze Routes</h1>
      </header>
      <br></br>
      <Board ref={childRef} size={size} />
      <br></br>
      <div className='controls'>
        <button className='control-button' onClick={resetMaze}>Reset</button>

        <button className='control-button' onClick={(e) => {

        }}>Watch</button>

        <button className='control-button' onClick={generateMaze}>Run</button>
        <input
          id="typeinp"
          type="range"
          min="1" max="25"
          value={size}
          onChange={changeSize}
          step="1" />
      </div>
    </div>
  );
}

export default App;
