import React from "react";
import { MAX_DELAY } from "./constants";

class ButtonContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    handleResetClicked = () => {
        this.props.onChange(['button', 'RESET']);
    }

    handleRunClicked = () => {
        this.props.onChange(['button', 'RUN']);
    }

    handleSpeedChange = (event) => {
        this.props.onChange(['speed', event.target.value]);
    }

    handleSizeChange = (event) => {
        this.props.onChange(['size', event.target.value]);
    }

    render() {
        return (
            <div className="controls-container">
                <div className="flex-row">
                    <label htmlFor="size-slider">Size:</label>
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
                    <label htmlFor="speed-slider">Speed:</label>
                    <input
                        id="speed-slider"
                        type="range"
                        min="0"
                        max={MAX_DELAY}
                        step="10"
                        value={this.props.speed}
                        onChange={this.handleSpeedChange}
                    />
                </div>
                <div className="flex-row">
                    <div className="col-span-2">
                        <button className="button" onClick={this.handleResetClicked}>Reset</button>
                    </div>
                    <div className="col-span-2">
                        <button className="button" onClick={this.handleRunClicked}>Run</button>
                    </div>
                </div>
            </div>


        );
    }
}

export default ButtonContainer;