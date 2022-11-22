import logo from './logo.svg';
import './App.css';

import Board from './Components/Board';
import Controls from './Components/Controls';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='App-title'>Maze Routes</h1>
      </header>
      <br></br>
      <Board size='30' />
      <br></br>
      <Controls size='30' />
    </div>
  );
}

export default App;
