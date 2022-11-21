import React from "react";

class Square extends React.Component {
    render() {
        const classes = 'grid-square'
        return (
            <div className={classes} />
        )
    }
}

// Exporting the component
export default Square;