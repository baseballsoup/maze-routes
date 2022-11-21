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
      <Board />
      <br></br>
      <Controls />
    </div>
  );
}

export default App;
