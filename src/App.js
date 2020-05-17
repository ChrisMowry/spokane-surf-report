/*
    File: App.js
    Author: Chris Mowry
    Date: 05/16/2020
    Email: cmowry84@gmail.com
    Description:

        This component utilizes all of the high level components to allow the user
        to interact with the web application. It also makes the inital data request 
        from the server-side data source.
*/

import React, { Component } from 'react';
import Header from './components/header/Header';
import MapContainer from './components/map/MapContainer';
import DataCardDeck from './components/data_cards/DataCardDeck';
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

    componentDidMount(){
        // make api fetch here.
        console.log('hello world!');

        this.setState({
            surfSpots: [
                {id: 1, surfable: true},
                {id: 2, surfable: true},
                {id: 3, surfable: false},
                {id: 4, surfable: false},
                {id: 5, surfable: false}
            ]
        })
    }

    render() {
        return (
            <div className='container'>
                <Header mapVisible={this.state.mapVisible} toggleMapVisibility={this.toggleMapVisibility}/>
                <div className='content'>
                    <MapContainer spots={ this.state.surfSpots } mapVisible={ this.state.mapVisible } />
                    <DataCardDeck spots={ this.state.surfSpots }/>
                </div>
            </div>
        );
    }
}

export default App;
