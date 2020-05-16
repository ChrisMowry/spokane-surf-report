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
                {id: 1},
                {id: 2},
                {id: 3},
                {id: 4},
                {id: 5}
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
