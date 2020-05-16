import React, { Component } from 'react';
import Header from './components/header/Header';
import MapContainer from './components/map/MapContainer';
import './style/app.css';


class App extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            surfSpots: [],
            mapVisible: false
        }

        this.toggleMapVisibility = this.toggleMapVisibility.bind(this);
    }

    toggleMapVisibility(self){
        this.setState({mapVisible: !this.state.mapVisible})
    }

    render() {
        return (
            <div>
                <Header mapVisible={this.state.mapVisible} toggleMapVisibility={this.toggleMapVisibility}/>
                <div className='content'>
                    <MapContainer mapVisible={this.state.mapVisible} />
                </div>
            </div>
        );
    }
}

export default App;
