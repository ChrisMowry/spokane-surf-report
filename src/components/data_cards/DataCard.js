/*
    File: DataCard.js
    Author: Chris Mowry
    Date: 05/16/2020
    Email: cmowry84@gmail.com
    Description:

        This component serves as the high level wrapper for the suf spot 
        data display. It assembles all of the various components used 
        to present information on each surf spot.
*/

import React, { Component } from 'react';
import DataCardDisplay from './DataCardDisplay';
import DataCardDetail from './DataCardDetail';

import '../../style/datacard.css'

 class DataCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className='data-card'>
                <input id={'detail-button-' + this.props.spot.id}
                 className='detail-button'
                 type="checkbox"
                 />
                <label htmlFor={'detail-button-' + this.props.spot.id} className='detail-button-view'>
                    <DataCardDisplay spot={this.props.spot} />
                    <DataCardDetail spot={this.props.spot} />
                </label>
            </li>
        );
    }
 }

 DataCard.defaultProps = {
    spot:{id:0}
 }

export default DataCard;