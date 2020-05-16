import React, { Component } from 'react';
import DataCard from './DataCard';
import '../../style/datacard.css'

 class DataCardDeck extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='data-card-deck'>
                <ul>
                    {this.props.spots.map(
                        (spot) => <li><DataCard key={spot.id} surfSpot={spot}/></li>
                    )}
                </ul>
            </div>
        );
    }
 }

export default DataCardDeck;