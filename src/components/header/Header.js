import React, { Component } from 'react';
import '../../style/header.css'

 class Header extends Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event){
        this.props.toggleMapVisibility();
    }

    render() {
        return (
            <header>
                <img src={require("../../imgs/surf-spokane.svg")} alt="Spokane Surf Logo" />
                <h1>Spokane Surf Report</h1>
                <input id="map-button" className="map-button" type="checkbox" 
                checked={this.props.mapVisible} onClick={this.handleClick}/>
				<label htmlFor="map-button" className="map-button-display">
					<h2>Map</h2>
                    <svg version="1.1" 
                        id="arrow" 
                        xmlns="http://www.w3.org/2000/svg" 
                        x="0px" y="0px"
                        viewBox="0 0 50 50" 
                        enableBackground="new 0 0 50 50" >
                        <polygon points="25,6.555 50.009,6.555 37.505,25 25,43.445 12.496,25 -0.008,6.555 "/>
                    </svg>
				</label>
            </header>
        );
    }
}

export default Header