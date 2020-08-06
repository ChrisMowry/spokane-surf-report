import React, { Component } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import { getSpotStatus } from '../../resource/Util';
import '../../style/map.scss'
import ThumbsUp from '../../imgs/map-icon-thumbs-up.svg'
import ThumbsDown from '../../imgs/map-icon-thumbs-down.svg'
import OkHand from '../../imgs/map-icon-ok-hand.svg'
import NoData from '../../imgs/map-icon-no-data.svg'

 class MapContainer extends Component {

    constructor(props) {
        super(props);

        let pixelWidth = 0

        this.state = {
            center: this.getCenter(this.props.spots), // centers the map
            zoom: this.getZoom(this.props.spots, pixelWidth), // calculates zoom level
            showingInfoWindow: false,  //Hides or the shows the infoWindow
            activeMarker: {},          //Shows the active marker upon click
            selectedSpot: {}          //Shows the infoWindow to the selected place upon a marker
        }
        
        this.googleBaseUrl = 'http://maps.google.com/maps?q=loc:';

        this.containerRef = React.createRef()

    }

    getIcon(spot){

        // determines which map icon to use
        const status = getSpotStatus(spot);

        if( status === 'spot-optimum' ){
            return OkHand;
        } else if ( status === 'spot-in') {
            return ThumbsUp;
        } else if ( status === 'spot-out'){
            return ThumbsDown;
        } else {
            return NoData;
        }
    }

    getCenter(spots){

        if (spots.length === 1){
            return { lat: spots[0].location.lat, lng: spots[0].location.lon }
        }
        else if (spots.length > 1){
            // calculates min and max longitute
            let minLat = Math.min(...spots.map((spot) => spot.location.lat));
            let maxLat = Math.max(...spots.map((spot) => spot.location.lat));
            let minLng = Math.min(...spots.map((spot) => spot.location.lon));
            let maxLng = Math.max(...spots.map((spot) => spot.location.lon));

            let lat = (minLat + maxLat) / 2.0;
            let lng = (minLng + maxLng) / 2.0;;

            return { lat: lat, lng: lng}
        }
        else{
            return { lat: 47.7061299, lng: -117.1419032 }
        }
    }

    getZoom(spots, pixelWidth){
        let zoom = 11;
        if(pixelWidth > 0){
            // default google value
            let GLOBE_WIDTH = 256;

            // calculates min and max longitute
            let minLng = Math.min(...spots.map((spot) => spot.location.lon));
            let maxLng = Math.max(...spots.map((spot) => spot.location.lon));

            // gets the angle
            let angle = maxLng - minLng;
            if( angle < 0 ){
                angle += 360;
            }

            // calculates zoom level
            zoom = Math.floor(Math.log(pixelWidth * 360 / angle / GLOBE_WIDTH) / Math.LN2);

            if (zoom === Infinity){
                zoom = 15;
            }

            if (zoom > 15) {
                zoom = 15
            }
        }

        return zoom;
    }

    handleMarkerClick = (props, marker) => {
        this.props.filterSpots(props.id);
        this.setState({
            selectedSpot : props,
            activeMarker : marker,
            showingInfoWindow : true,
            center: {lat : props.position.lat, lng : props.position.lng}
        });
    }

    onInfoWindowClose = () =>
        this.setState({
          activeMarker: null,
          showingInfoWindow: false
        },() => { this.props.unfilterSpots() });


    componentDidMount(){
        let pixelWidth = parseInt(this.containerRef.current.offsetWidth);
        this.setState({zoom: this.getZoom(this.props.spots, pixelWidth)});
    }

    render() {
        return (
            <div className={ this.props.mapVisible ? 'map-container' : 'map-container hidden' } 
                ref={this.containerRef}>
                <Map
                    className='map'
                    google={this.props.google}
                    zoom={this.state.zoom}
                    initialCenter={{lat: this.state.center.lat, lng: this.state.center.lng}}
                    center={{lat: this.state.center.lat, lng: this.state.center.lng}}
                    onMouseout={this.handleMapMouseOut}>            
                    {
                        this.props.spots.map(
                            spot => (
                                <Marker 
                                    key={spot.spot_id}
                                    name={spot.name}
                                    id={spot.spot_id}
                                    value={spot.currentValue}
                                    unit={spot.unit}
                                    parkingLat={spot.accessLoc.lat }
                                    parkingLng={ spot.accessLoc.lon }
                                    position={{lat: spot.location.lat, lng: spot.location.lon}}
                                    icon={this.getIcon(spot)}
                                    onClick={this.handleMarkerClick} />
                            )
                        )
                    }
                    {
                        this.props.spots.map(
                            spot => (
                                <InfoWindow 
                                    key={spot.spot_id} 
                                    marker={this.state.activeMarker}
                                    visible={this.state.showingInfoWindow}
                                    onClose={this.onInfoWindowClose} >
                                    <div className='info-window'
                                    > 
                                        <h2>
                                            {
                                                `${this.state.selectedSpot.name} : ` +
                                                `${this.state.selectedSpot.value} ` +
                                                `${this.state.selectedSpot.unit}`
                                            }
                                        </h2>
                                        <a
                                            href={ `${this.googleBaseUrl}${this.state.selectedSpot.parkingLat},${this.state.selectedSpot.parkingLng}` } 
                                            target="_blank" 
                                            rel='noopener noreferrer'
                                        >
                                            Get Directions
                                        </a>
                                    </div>

                                </InfoWindow>
                            ))
                    }
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper((props) => ({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    language: props.language
}))( MapContainer );
    
  

    
  