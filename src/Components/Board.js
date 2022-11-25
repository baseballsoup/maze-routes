import React from "react";
import Square from "./Square";

// Creates an X by X grid of squares

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: []
        };
    }

    componentDidMount() {
        let tempBoard = [];
        let size = this.props.size;
        let borders = '';

        // Iterate through 10 rows
        for (let row = 0; row < size; row++) {
            tempBoard.push([]);

            // Add 10 columns per row
            for (let col = 0; col < size; col++) {
                let id = row + ',' + col;
                tempBoard[row].push({
                    'id': id,
                    'borders': borders
                });
            }
        }

        this.setState({ board: tempBoard });
    }

    render() {
        return (
            <div className='grid-board' >
                {this.state.board.map((row, index) => {
                    return (
                        <div className='grid-row' key={index}>

                            {row.map((square, index) => {
                                return (
                                    <Square key={index} id={square.id} border={square.borders} />
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