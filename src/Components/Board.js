import React from "react";
import Square from "./Square";

// Creates an X by X grid of squares

class Board extends React.Component {
    render() {
        const board = [];
        let borders = 'no-border-right no-border-left'

        // Iterate through 10 rows
        for (let row = 0; row < 10; row++) {
            board.push([])

            // Add 10 columns per row
            for (let col = 0; col < 10; col++) {
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