import React, { Component } from 'react';
import '../../style/map.css'

 class Map extends Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event){
        console.log('Map click');
    }

    render() {
        return (
            <div className={ this.props.mapVisible ? 'map-canvas' : 'map-canvas hidden' }>
                here
            </div>
        );
    }
}

export default Map