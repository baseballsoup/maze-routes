import './App.css';

import Board from './Components/Board';
import ButtonContainer from './Components/ButtonContainer';
import { useState } from 'react';

const INITIAL_CONFIG = {
  size: 15,
  speed: 50
};

//TODO: Edit formatting
//TODO: Add solving algorithms

function App() {
  const [config, setConfig] = useState(INITIAL_CONFIG);
  const [buttonClicked, setButtonClicked] = useState('');

  function handleButtonClicked(change) {
    let changeKey = change[0];
    let changeValue = change[1];

    switch (changeKey) {
      case 'size':
        setConfig((prevConfig) => ({ ...prevConfig, size: changeValue }));
        setButtonClicked('');
        break;
      case 'speed':
        setConfig((prevConfig) => ({ ...prevConfig, speed: changeValue }));
        break;
      default:
        setButtonClicked(changeValue);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='App-title'>Mazes and Mazes</h1>
      </header>

      <div className='main-container'>
        <br></br>

        <div className='col-span-2 left'>
          <Board
            onChange={handleButtonClicked}
            {...config}
            buttonClicked={buttonClicked} />
        </div>
        <div className='col-span-2 right'>
          <ButtonContainer
            onChange={handleButtonClicked}
            {...config}
            buttonClicked={buttonClicked} />
        </div>


        <br></br>
      </div>

    </div>
  );
}

export default App;
