import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import '../../style/map.css'
import ThumbsUp from '../../imgs/thumbs-up.svg'
import ThumbsDown from '../../imgs/thumbs-down.svg'

 class MapContainer extends Component {

    constructor(props) {
        super(props);

        this.defaultCenter = {lat: 47.7061299, lng: -117.1419032};

        this.state = {
            center: this.defaultCenter,
            zoom: 11
        }

        this.positions = [{id:1, lat:47.704182, lng:-116.9874425, status: ThumbsDown},
             {id:2, lat:47.6859465, lng:-117.0445785, status: ThumbsUp},
             {id:3, lat:47.673752, lng:-117.1821145, status: ThumbsDown},]

        this.handleMarkerClick = this.handleMarkerClick.bind(this);
        this.handleMapMouseOut = this.handleMapMouseOut.bind(this);
    }

    handleMarkerClick(position){
        // if the user clicks on a spot, the map centers on that spot and zooms in.
        this.setState({
            center:{lat: position.lat, lng: position.lng},
            zoom: 16
        });
    }

    handleMapMouseOut(event){
        // if the mouse moves off the window, the map returns back to center
        if(this.state.zoom === 16){
            this.setState({
                center: this.defaultCenter,
                zoom: 11
            });
        }
    }

    render() {
        return (
            <div className={ this.props.mapVisible ? 'map-container' : 'map-container hidden' }>
                <Map
                    className='map'
                    google={this.props.google}
                    zoom={this.state.zoom}
                    initialCenter={{ lat: 47.7061299, lng: -117.1419032 }}
                    center={{lat: this.state.center.lat, lng: this.state.center.lng}}
                    onMouseout={this.handleMapMouseOut}>                   
                    {
                        this.positions.map(
                            position => (
                                <Marker 
                                    key={position.id}
                                    position={{lat: position.lat, lng: position.lng}}
                                    icon={position.status}
                                    onClick={()=>this.handleMarkerClick(position)}
                                 />
                            )
                        )
                    }
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper((props) => ({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    language: props.language
}))(MapContainer);
    
  

    
  