import { toBeDisabled } from "@testing-library/jest-dom/dist/matchers";
import React from "react";

class Square extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.border} id={this.props.id} />
        )
    }
}

// Exporting the component
export default Square;