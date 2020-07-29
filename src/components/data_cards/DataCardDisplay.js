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
// import DataCardGraph from './DataCardGraph';
import { getSpotStatus } from '../../resource/Util';

import '../../style/datacard.scss'

 class DataCardDisplay extends Component {

    // constructor(props) {
    //     super(props);
    // }

    getStatusIcon(){

        const status = getSpotStatus(this.props.spot);

        switch(status) {
            case 'spot-optimum' :
              return <img src={require("../../imgs/icon-ok-hand.svg")} alt="Optimum Icon" />
            case 'spot-in':
              return <img src={require("../../imgs/icon-thumbs-up.svg")} alt="Surfable Icon" />
            case 'spot-out':
                return <img src={require("../../imgs/icon-thumbs-down.svg")} alt="Not Surfable Icon" />
            default:
              return "";
          }
    }

    render() {

        // destructures the surf spot object
        const {name = 'Unknown', currentValue = 0, min = 0, max = 0, unit = 'unk'} = this.props.spot;
        

        return (
            <div className='data-card-display'>
                <div className='status-icon'>
                    { this.getStatusIcon() }
                </div>
                {/* <DataCardGraph spot={this.props.spot}/> */}
                <h2>{ name }</h2>
                <div className='spot-values'>
                    <h3>{ `${currentValue} ${unit}` }</h3>
                    <h4>{ `range: ${ min } - ${ max } ${ unit }` }</h4>
                </div>

            </div>
        );
    }
 }

 DataCardDisplay.defaultProps = {
     spot:{}
}

export default DataCardDisplay;