import logo from './logo.svg';
import './App.css';

import Board from './Components/Board';
import ButtonContainer from './Components/ButtonContainer';
import { useRef, useState } from 'react';

//TODO: Edit formatting
//TODO: Add solving algorithms

function App() {
  const INITIAL_SPEED = 50;
  const INITIAL_SIZE = 15;

  const [size, setSize] = useState(INITIAL_SIZE);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [buttonClicked, setButtonClicked] = useState('');

  function handleButtonClicked(change) {
    let changeKey = change[0];
    let changeValue = change[1];

    if (changeKey === 'size') {
      setSize(changeValue);
    }
    else if (changeKey === 'speed') {
      setSpeed(changeValue);
    }
    else {
      setButtonClicked(changeValue);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='App-title'>Maze Routes</h1>
      </header>
      <br></br>
      <Board
        onChange={handleButtonClicked}
        size={size}
        speed={speed}
        buttonClicked={buttonClicked} />
      <br></br>
      <ButtonContainer
        onChange={handleButtonClicked}
        size={size}
        speed={speed}
        buttonClicked={buttonClicked} />
    </div>
  );
}

export default App;
