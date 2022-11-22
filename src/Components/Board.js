import React from "react";
import Square from "./Square";

// Creates an X by X grid of squares

class Board extends React.Component {
    render() {
        const board = [];
        let borders = '';

        // Iterate through 10 rows
        for (let row = 0; row < 30; row++) {
            board.push([])

            // Add 10 columns per row
            for (let col = 0; col < 30; col++) {
                let id = row + ',' + col;
                board[row].push(<Square id={id} borders={borders} />);
            }
        }

        return (
            <div className='grid-board' >
                {board}
            </div>
        )
    }
}

// Exporting the component
export default Board;