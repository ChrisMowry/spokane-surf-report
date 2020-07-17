import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import '../../style/map.scss'
import ThumbsUp from '../../imgs/thumbs-up.svg'
import ThumbsDown from '../../imgs/thumbs-down.svg'

 class MapContainer extends Component {

    constructor(props) {
        super(props);

        let pixelWidth = 0

        this.state = {
            center: this.getCenter(this.props.spots),
            zoom: this.getZoom(this.props.spots, pixelWidth),
        }

        this.handleMarkerClick = this.handleMarkerClick.bind(this);
        this.handleMapMouseOut = this.handleMapMouseOut.bind(this);

        this.containerRef = React.createRef()
    }

    getStatus(spot){
        if( spot.currentValue <= spot.max && spot.currentValue >= spot.min){
            return ThumbsUp
        }
        else{
            return ThumbsDown
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

            console.log(zoom);
        }

        return zoom;
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
                                    position={{lat: spot.location.lat, lng: spot.location.lon}}
                                    icon={this.getStatus(spot)}
                                    onClick={()=>this.handleMarkerClick(spot)}
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
    
  

    
  