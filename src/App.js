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
import Footer from './components/footer/Footer';
import MapContainer from './components/map/MapContainer';
import DataCardDeck from './components/data_cards/DataCardDeck';
import {properties} from './resource/Config';
import {compareSpots} from './resource/Util';
import './style/app.scss';


class App extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            surfSpots: [],
            filteredSpots: [],
            mapVisible: false,
            expandedCards: false,
            filtered: false,
            isLoaded: false
        }

        this.toggleMapVisibility = this.toggleMapVisibility.bind(this);
        this.toggleCardExpand = this.toggleCardExpand.bind(this);
        this.filterSpots = this.filterSpots.bind(this);
        this.unfilterSpots = this.unfilterSpots.bind(this);
    }

    toggleMapVisibility(){
        this.setState({mapVisible: !this.state.mapVisible})
    }

    toggleCardExpand(){
        this.setState({expandedCards: !this.state.expandedCards})
    }

    filterSpots(spot_id){
        this.setState({ 
            filtered : true, // sets the filtered spots true
            filteredSpots : this.state.surfSpots.filter((spot) => spot.spot_id === spot_id).sort(compareSpots)
        }); 
    }

    unfilterSpots(){
        this.setState({ 
            filtered : false // sets the filtered spots false
        }); 

        this.getSurfSpots(); // gets all of the spots
    }

    getSurfSpots(){

       // fetches surf spots from url
       fetch( properties.overview_url, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }})
        .then((response) => response.json())
        .then((spots) => {

            let spotName = this.props.match.params.spot;
            let gageNumber = parseInt(this.props.match.params.gage);

            // filters for url paramater for spot
            if (spotName){
                spots = spots.filter((spot) => spot.name.toLowerCase() === spotName.toLowerCase());
                this.setState({ mapVisible : true, expandedCards : true });
            }

            // filters for path parameter for gage number
            if (gageNumber){
                spots = spots.filter((spot) => spot.site === gageNumber );

                // if there is only 1 record, expand the map and the card
                if (spots.length === 1){
                    this.setState({ mapVisible: true, expandedCards : true  })
                }
            }

            this.setState({ 
                surfSpots : spots,
                filteredSpots : spots.sort(compareSpots)
            })
        })
    }

    componentDidMount(){
        // refreshes the data every 10 minutes while the app is running
        if(!this.state.isLoaded){
            this.getSurfSpots();
            this.setState({ isLoaded: true });
        }
        this.interval = setInterval(() => this.getSurfSpots(), 600000);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className='container'>
                <Header mapVisible={this.state.mapVisible} toggleMapVisibility={this.toggleMapVisibility}/>
                <div className='content'>
                    <MapContainer spots={ this.state.surfSpots } 
                                  mapVisible={ this.state.mapVisible }
                                  filterSpots={this.filterSpots} 
                                  unfilterSpots={this.unfilterSpots} />
                    <DataCardDeck spots={ this.state.filteredSpots } expanded={this.state.expandedCards}/>
                    <Footer />
                </div>
                
            </div>
        );
    }
}

export default App;
