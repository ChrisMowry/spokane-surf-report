import React, { Component } from 'react';
import Header from './components/header/Header';
import Map from './components/map/Map';
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
            <div className='container'>
                <Header mapVisible={this.state.mapVisible} toggleMapVisibility={this.toggleMapVisibility}/>
                <div className='content'>
                    <Map mapVisible={this.state.mapVisible} />
                </div>
            </div>
        );
    }
}

export default App;
