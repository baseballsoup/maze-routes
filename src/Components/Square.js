import { toBeDisabled } from "@testing-library/jest-dom/dist/matchers";
import React from "react";

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: ['grid-square']
        }
    }

    removeTop() {
        if (!this.state.classes.includes('no-border-top')) {
            this.setState({ classes: [...this.state.classes, 'no-border-top'] });
        }
    }

    removeBottom() {
        if (!this.state.classes.includes('no-border-bottom')) {
            this.setState({ classes: [...this.state.classes, 'no-border-bottom'] });
        }
    }

    removeRight() {
        if (!this.state.classes.includes('no-border-right')) {
            this.setState({ classes: [...this.state.classes, 'no-border-right'] });
        }
    }

    removeLeft() {
        if (!this.state.classes.includes('no-border-left')) {
            this.setState({ classes: [...this.state.classes, 'no-border-left'] });
        }
    }

    getClassList() {
        return this.state.classes.join(' ');
    }

    render() {
        return (
            <div className={this.getClassList()} id={this.props.id} />
        )
    }
}

// Exporting the component
export default Square;