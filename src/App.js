import logo from './logo.svg';
import './App.css';

import Board from './Components/Board';
import { useRef } from 'react';

function App() {
  const childRef = useRef(null);
  const SIZE = 25;

  function generateMaze() {
    childRef.current.generate_maze();
  }

  function resetMaze() {
    childRef.current.resetMaze();
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='App-title'>Maze Routes</h1>
      </header>
      <br></br>
      <Board ref={childRef} size={SIZE} />
      <br></br>
      <div className='controls'>
        <button className='control-button' onClick={resetMaze}>Reset</button>

        <button className='control-button' onClick={(e) => {

        }}>Watch</button>

        <button className='control-button' onClick={generateMaze}>Run</button>
      </div>
    </div>
  );
}

export default App;
