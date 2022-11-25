import logo from './logo.svg';
import './App.css';

import Board from './Components/Board';

function App() {

  const N = 0; const S = 1; const E = 2; const W = 3;
  const DROW = [-1, 1, 0, 0];
  const DCOL = [0, 0, 1, -1];
  const OPPOSITE = [1, 0, 3, 2];
  const SIZE = getComputedStyle(document.body).getPropertyValue('--rows-cols');

  function generateMaze() {
    carve_passages_from(0, 0);
  }

  function resetMaze() {
    for (let elem of document.getElementsByClassName("grid-square")) {
      elem.classList.remove("visited");
      elem.classList.remove("no-border-top");
      elem.classList.remove("no-border-bottom");
      elem.classList.remove("no-border-right");
      elem.classList.remove("no-border-left");
    }
  }

  function carve_passages_from(x, y) {
    let directions = shuffle([N, S, E, W]);
    setIsVisited(x, y);

    for (let direction of Object.values(directions)) {
      let newX = x + DROW[direction];
      let newY = y + DCOL[direction];

      if ((newY >= 0 && newY < SIZE) && (newX >= 0 && newX < SIZE) && !getIsVisited(newX, newY)) {
        carve_wall(x, y, direction);
        carve_wall(newX, newY, OPPOSITE[direction]);
        console.log('---------');
        carve_passages_from(newX, newY);
      }
    }
  }

  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array
  }

  function getIsVisited(x, y) {
    let id = x + ',' + y;
    const elem = document.getElementById(id);

    if (elem.classList.contains('visited')) {
      return true;
    }

    return false;
  }

  function setIsVisited(x, y) {
    let id = x + ',' + y;
    const elem = document.getElementById(id);

    if (!elem.classList.contains('visited')) {
      elem.classList.add('visited');
    }
  }

  function carve_wall(x, y, direction) {
    console.log("Carving Wall" + x + ',' + y);
    let id = x + ',' + y;
    const elem = document.getElementById(id);

    switch (direction) {
      case 0:
        elem.classList.add('no-border-top');
        console.log("Removing top");
        break;
      case 1:
        elem.classList.add('no-border-bottom');
        console.log("Removing bottom");
        break;
      case 2:
        elem.classList.add('no-border-right');
        console.log("Removing right");
        break;
      case 3:
        elem.classList.add('no-border-left');
        console.log("Removing left");
        break;
      default:
        break;
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='App-title'>Maze Routes</h1>
      </header>
      <br></br>
      <Board size={SIZE} />
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
