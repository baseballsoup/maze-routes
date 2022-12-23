import './App.css';

import Board from './Components/Board';
import ButtonContainer from './Components/Header';
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

      <ButtonContainer
        onChange={handleButtonClicked}
        {...config}
        buttonClicked={buttonClicked} />


      <div className='main-container'>

        <Board
          onChange={handleButtonClicked}
          {...config}
          buttonClicked={buttonClicked} />

      </div>

    </div>
  );
}

export default App;
