import React from "react";

class ButtonContainer extends React.Component {
    constructor(props) {
        super(props);

        this.MAX_DELAY = 300;
        this.MAX_SIZE = 25;
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
            <div>
                <button onClick={this.handleResetClicked}>Reset</button>
                <button onClick={this.handleRunClicked}>Run</button>
                <input
                    type="range"
                    min="0"
                    max={this.MAX_DELAY}
                    step="10"
                    value={this.props.speed}
                    onChange={this.handleSpeedChange}
                />
                <input
                    type="range"
                    min="0"
                    max="25"
                    value={this.props.size}
                    onChange={this.handleSizeChange}
                />
            </div>
        );
    }
}

export default ButtonContainer;