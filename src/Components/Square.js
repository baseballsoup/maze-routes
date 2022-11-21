import { toBeDisabled } from "@testing-library/jest-dom/dist/matchers";
import React from "react";

class Square extends React.Component {
    render() {
        const classes = `grid-square ${this.props.borders}`
        return (
            <div className={classes} id={this.props.id} />
        )
    }
}

// Exporting the component
export default Square;