import React from "react";
import { MAX_DELAY } from "./constants";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    handleResetClicked = () => {
        this.props.onChange(['button', 'RESET']);
    }

    handleRunClicked = () => {
        this.props.onChange(['button', 'RUN']);
    }

    handleSolveClicked = () => {
        this.props.onChange(['button', 'SOLVE']);
    }

    handleSpeedChange = (event) => {
        this.props.onChange(['speed', event.target.value]);
    }

    handleSizeChange = (event) => {
        this.props.onChange(['size', event.target.value]);
    }

    render() {
        return (
            <header className="App-header">
                <h1 className='App-title'>A(Maze) Me</h1>
                <div className="flex-row">
                    <label className="label" htmlFor="size-slider">Size:</label>
                    <input
                        id="size-slider"
                        type="range"
                        min="0"
                        max="25"
                        value={this.props.size}
                        onChange={this.handleSizeChange}
                    />
                </div>
                <div className="flex-row">
                    <label className="label" htmlFor="speed-slider">Speed:</label>
                    <input
                        id="speed-slider"
                        className="slider"
                        type="range"
                        min="0"
                        max={MAX_DELAY}
                        step="5"
                        value={this.props.speed}
                        onChange={this.handleSpeedChange}
                    />
                </div>
                <div className="flex-row">
                    <button className="button" onClick={this.handleResetClicked}>Reset</button>
                </div>

                <div className="flex-row">
                    <button className="button" onClick={this.handleRunClicked}>Generate Maze</button>
                </div>

                <div className="flex-row">
                    <button className="button" onClick={this.handleSolveClicked}>Visualize</button>
                </div>
            </header >



        );
    }
}

export default Header;