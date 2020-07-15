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
import {properties} from './resource/Config';
import './style/app.scss';


class App extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            surfSpots: [],
            mapVisible: false
        }

        this.toggleMapVisibility = this.toggleMapVisibility.bind(this);
    }

    toggleMapVisibility(){
        this.setState({mapVisible: !this.state.mapVisible})
    }

    componentDidMount(){
        //this.setState({ surfSpots : spots })
        // fetches surf spots from url
        fetch(properties.overview_url, {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }})
        .then((response) => response.json())
        .then((spots) => {
            this.setState({ surfSpots : spots })
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
