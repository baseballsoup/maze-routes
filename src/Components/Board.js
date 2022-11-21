import React from "react";
import Square from "./Square";

// Creates an X by X grid of squares

class Board extends React.Component {
    render() {
        const board = [];

        // Iterate through 10 rows
        for (let row = 0; row < 10; row++) {
            board.push([])

            // Add 10 columns per row
            for (let col = 0; col < 10; col++) {
                board[row].push(<Square key={`${row}${col}`} />);
            }
        }

        return (
            <div className='grid-board'>
                {board}
            </div>
        )
    }
}

// Exporting the component
export default Board;