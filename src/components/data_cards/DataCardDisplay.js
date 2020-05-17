/*
    File: DataCardDisplay.js
    Author: Chris Mowry
    Date: 05/16/2020
    Email: cmowry84@gmail.com
    Description:

        This component displays the basic information about the surf spot.
        It is intended display the name, current status, and other basic information 
        about the spot.
*/

import React, { Component } from 'react';
import DataCardGraph from './DataCardGraph';
import '../../style/datacard.css'

 class DataCardDisplay extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let currentFlow = this.props.spot.currentFlow !== undefined ? this.props.spot.currentFlow : 0;
        let min = this.props.spot.min !== undefined ? this.props.spot.min : 0;
        let max = this.props.spot.max !== undefined ? this.props.spot.max : 0;
        let units = this.props.spot.units !== undefined ? this.props.spot.units : 'unk';

        return (
            <div className='data-card-display'>
                <DataCardGraph surfable={this.props.spot.surfable}/>
                <h2>Spot</h2>
                <div className='spot-values'>
                    <h3>{ currentFlow +' '+ units }</h3>
                    <h4>{ 'range: ' + min + ' - ' + max + ' ' + units }</h4>
                </div>

            </div>
        );
    }
 }

 DataCardDisplay.defaultProps = {
     spot:{}
}

export default DataCardDisplay;