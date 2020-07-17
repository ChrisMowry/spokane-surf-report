/*
    File: DataCardDeck.js
    Author: Chris Mowry
    Date: 05/16/2020
    Email: cmowry84@gmail.com
    Description:

        This component holds the collection of data cards.
*/


import React, { Component } from 'react';
import DataCard from './DataCard';
import '../../style/datacard.scss'

 class DataCardDeck extends Component {

    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div className='data-card-deck'>
                <ul>
                    {this.props.spots.map(
                        (spot) => <DataCard key={spot.spot_id} spot={spot} expanded={this.props.expanded}/>
                    )}
                </ul>
            </div>
        );
    }
 }

export default DataCardDeck;