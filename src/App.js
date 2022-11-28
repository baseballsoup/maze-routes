import logo from './logo.svg';
import './App.css';

import Board from './Components/Board';
import { useRef, useState } from 'react';

//TODO: Edit formatting
//TODO: Add solving algorithms

function App() {
  const MAX_DELAY = 300;
  const INITIAL_SPEED = 50;
  const INITIAL_SIZE = 15;
  const childRef = useRef(null);
  const [size, setSize] = useState(INITIAL_SIZE);
  const [speed, setSpeed] = useState(INITIAL_SPEED);

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

  function changeSpeed(event) {
    let speed = MAX_DELAY - event.target.value;
    console.log("Speed it should be => " + event.target.value);
    setSpeed(event.target.value);
    childRef.current.changeSpeed(speed);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='App-title'>Maze Routes</h1>
      </header>
      <br></br>
      <Board ref={childRef} size={size} speed={MAX_DELAY - INITIAL_SPEED} />
      <br></br>
      <div className='controls'>
        <input
          id="speedInput"
          type="range"
          min="0" max={MAX_DELAY}
          value={speed}
          onChange={changeSpeed}
          step="10" />

        <button className='control-button' onClick={resetMaze}>Reset</button>

        <button className='control-button' onClick={(e) => {

        }}>Watch</button>

        <button className='control-button' onClick={generateMaze}>Run</button>

        <input
          id="sizeInput"
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
