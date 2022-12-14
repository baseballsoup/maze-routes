import React from "react";
import Square from "./Square";
import { MAX_DELAY } from "./constants";

// Creates an X by X grid of squares

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: []
        };

        //Initializing Constants and Configurations
        this.N = 0; this.S = 1; this.E = 2; this.W = 3;
        this.DROW = [-1, 1, 0, 0];
        this.DCOL = [0, 0, 1, -1];
        this.OPPOSITE = [1, 0, 3, 2];
        this.timesTicked = 0;
        this.timerID = false;
        this.queue = [];
        this.size = this.props.size;
        this.cols = this.props.size * 2;
        this.speed = MAX_DELAY - this.props.speed;
    }

    /* Initialization and Rendering Functions */
    componentDidMount() {
        this.resetMaze(this.props.size);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.size !== this.props.size) {
            console.log("Update Size");
            this.resetMaze(this.props.size);
        }
        if (prevProps.speed !== this.props.speed) {
            console.log("Update Speed");
            this.updateSpeed(this.props.speed);
        }
        if (prevProps.buttonClicked !== this.props.buttonClicked) {
            if (this.props.buttonClicked === 'RUN') {
                console.log("Begin Running");
                this.generate_maze();
            }
            if (this.props.buttonClicked === 'RESET') {
                console.log("Reset Clicked");
                this.resetMaze(this.size);
            }
            if (this.props.buttonClicked === 'SOLVE') {
                console.log("Solve Clicked");
            }
        }

    }

    /* ---- Button Action Functions ---- */
    generate_maze() {
        this.resetTimerInterval();
        this.startTimerInterval();
    }

    updateSpeed(speed) {
        this.speed = MAX_DELAY - speed;
        console.log(this.speed);

        if (this.timerID != false) {
            this.resetTimerInterval();
            this.startTimerInterval();
        }
    }

    updateSizeFormatting() {
        // Get the width of the board container element
        const container = document.querySelector('#grid-board');

        // Check if the container element exists
        if (container) {
            // Get the smallest width of the container
            const width = container.offsetWidth;
            const height = container.offsetHeight;
            const size = Math.min(width, height);

            // Update the tile sizes
            const newSize = size / this.size;
            document.documentElement.style.setProperty('--tile-size', `${newSize}px`);

            // Output the width to the console
            console.log(`The width of the container is ${width}px.`);
        } else {
            // Output an error message if the container does not exist
            console.error('The container element does not exist.');
        }
    }

    resetMaze(size) {
        let tempBoard = [];
        this.size = size;
        this.cols = size * 2;
        this.queue = [];

        // Reset iteration variables
        this.resetTimerInterval();

        // Update the size formatting of each square
        this.updateSizeFormatting()

        // Iterate through  rows
        for (let row = 0; row < size; row++) {
            tempBoard.push([]);

            // Add 10 columns per row
            for (let col = 0; col < this.cols; col++) {
                let id = row + ',' + col;
                tempBoard[row].push({
                    'id': id,
                    'borders': ['grid-square']
                });
            }
        }

        this.setState({ board: tempBoard });
    }

    resetTimerInterval() {
        clearInterval(this.timerID);
        this.timerID = false;
        this.timesTicked = 0;
    }

    startTimerInterval() {
        this.timerID = setInterval(
            () => this.carve_next_passage(),
            this.speed
        );
    }

    /* ---- Logic for Solving Maze w/ Dijkstra's Algorithm ---- */


    /* ---- Logic for Generating Maze (Backtracking algorithm) --- */

    carve_passages_from(x, y) {
        let directions = this.shuffle([this.N, this.S, this.E, this.W]);
        this.set_is_visited(x, y);

        for (let direction of Object.values(directions)) {
            let newX = x + this.DROW[direction];
            let newY = y + this.DCOL[direction];

            if ((newY >= 0 && newY < this.cols) && (newX >= 0 && newX < this.size) && !this.getIsVisited(newX, newY)) {
                this.carve_wall(x, y, direction);
                this.carve_wall(newX, newY, this.OPPOSITE[direction]);
                //console.log('---------');
                this.x = newX;
                this.y = newY;
                this.carve_passages_from(newX, newY);
            }
        }
    }

    carve_next_passage() {
        this.timesTicked++;
        //console.log("Times ticked: " + this.timesTicked);

        if (this.queue.length == 0) {

            // Initialize Queue
            if (this.timesTicked == 1) {
                //console.log("Initial Call");
                // Choose initial cell
                let startX = 0;
                let startY = 0;

                // Mark it as visited
                this.set_is_visited(startX, startY);

                // Push cell to stack
                this.add_to_queue(startX, startY);
            }

            // Empty queue means the maze is done being generated
            else {
                console.log("Done with Maze generating");
                this.remove_is_current(0, 0);
                this.resetTimerInterval();
            }
        }

        else {
            // Pop Cell from stack
            let currentCell = this.queue.pop();
            let currentX = currentCell['x'];
            let currentY = currentCell['y'];
            this.remove_is_current(currentX, currentY);

            //console.log("Current Cell => " + currentX + ',' + currentY);

            let neighbors = this.get_unvisited_neighbors(currentX, currentY);

            // If current cell has any non visited neighbors
            if (neighbors.length > 0) {
                // Push the current cell to stack
                this.add_to_queue(currentX, currentY);

                // Choose one of the unvisited neighbors 
                let nextCell = neighbors.pop();
                let nextX = nextCell['x'];
                let nextY = nextCell['y'];
                let nextDirection = nextCell['direction'];
                //console.log("Next Cell" + nextX + ',' + nextY);

                // Remove the wall between the current and chosen cell
                this.carve_wall(currentX, currentY, nextDirection);
                this.carve_wall(nextX, nextY, this.OPPOSITE[nextDirection]);

                // Mark the chosen cell as visited and push to stack
                this.set_is_visited(nextX, nextY);
                this.set_is_current(nextX, nextY);
                this.add_to_queue(nextX, nextY);
                //console.log("Next Cell => " + nextX + ',' + nextY);
            }
            else {
                //Set current to next item in the queue
                if (this.queue.length > 0) {
                    let nextInQueue = this.queue.at(-1);
                    this.set_is_current(nextInQueue['x'], nextInQueue['y']);
                    //console.log("Next Cell => " + nextInQueue['x'] + ',' + nextInQueue['y']);
                }
            }
        }
    }

    get_unvisited_neighbors(x, y) {
        let directions = this.shuffle([this.N, this.S, this.E, this.W]);
        let neighbors = [];

        for (let direction of Object.values(directions)) {
            let newX = x + this.DROW[direction];
            let newY = y + this.DCOL[direction];

            if ((newY >= 0 && newY < this.cols) && (newX >= 0 && newX < this.size) && !this.get_is_visited(newX, newY)) {
                neighbors.push({ 'x': newX, 'y': newY, 'direction': direction });
            }
        }

        return neighbors;
    }

    shuffle(array) {
        array.sort(() => Math.random() - 0.5);
        return array;
    }

    add_to_queue(x, y) {
        this.queue.push({ 'x': x, 'y': y });
    }

    get_is_visited(x, y) {
        let tempSquare = this.state.board[x][y];

        return tempSquare['borders'].includes('visited');
    }

    set_is_visited(x, y) {
        let tempSquare = this.state.board[x][y];

        if (!tempSquare['borders'].includes('visited')) {
            tempSquare['borders'].push('visited');
        }
    }

    set_is_current(x, y) {
        let tempBoard = this.state.board;
        let tempBorders = tempBoard[x][y]['borders'];

        if (!tempBorders.includes('current')) {
            tempBorders.push('current');
            this.setState({ board: tempBoard });
        }
    }

    remove_is_current(x, y) {
        let tempBoard = this.state.board;
        let tempBorders = tempBoard[x][y]['borders'];

        if (tempBorders.includes('current')) {
            let index = tempBorders.indexOf('current');

            tempBorders.splice(index, 1);
            this.setState({ board: tempBoard });
        }
    }

    carve_wall(x, y, direction) {
        //console.log("Carving Wall" + x + ',' + y);
        let tempBoard = this.state.board;
        let tempBorders = tempBoard[x][y]['borders'];

        switch (direction) {
            case 0:
                if (!tempBorders.includes('no-border-top')) {
                    //console.log("Removing top");
                    tempBorders.push('no-border-top');
                    this.setState({ board: tempBoard });
                }
                break;
            case 1:
                if (!tempBorders.includes('no-border-bottom')) {
                    //console.log("Removing bottom");
                    tempBorders.push('no-border-bottom');
                    this.setState({ board: tempBoard });
                }
                break;
            case 2:
                if (!tempBorders.includes('no-border-right')) {
                    //console.log("Removing right");
                    tempBorders.push('no-border-right');
                    this.setState({ board: tempBoard });
                }
                break;
            case 3:
                if (!tempBorders.includes('no-border-left')) {
                    //console.log("Removing top");
                    tempBorders.push('no-border-left');
                    this.setState({ board: tempBoard });
                }
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div id='grid-board' className='grid-board' >
                {this.state.board.map((row, index) => {
                    return (
                        <div className='grid-row' key={index}>

                            {row.map((square, index) => {
                                return (
                                    <Square key={index} id={square.id} border={square.borders.join(' ')} />
                                );
                            })}

                        </div>
                    );
                })}
            </div>
        )
    }
}

// Exporting the component
export default Board;