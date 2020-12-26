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
import { getSpotStatus, formatNumber } from '../../resource/Util';

import '../../style/datacard.scss'

 class DataCardDisplay extends Component {

    // constructor(props) {
    //     super(props);
    // }

    getFlowChange(){

        const { values = [], currentValue = 0 , currentValueTime = new Date() } = this.props.spot;

        // converts the current value's time to a date object
        const readingTime = new Date(currentValueTime);

        if ( values !== undefined && values.length > 0 ){

            // filters the value array to all value object with a timestamp at least 1 hour previous
            // to the current value timestamp
            let valueArray = values.filter(
                (value) => Date.parse(value.dateTime) <= readingTime.setHours(readingTime.getHours() - 1)
            )
            
            // reduces the array to the max timestamp of values 1 hour less than the current value timestamp
            let hourPreviousValue = valueArray.reduce((prevValue, currentValue) => 
                ( new Date(prevValue.dateTime) > new Date(currentValue.dateTime)
                    ? prevValue
                    : currentValue
                ), new Date(valueArray[0].dateTime)
            )

            // returns the difference of the current time and 1 hour previous
            return (currentValue - hourPreviousValue.value).toFixed(2);

        } else {
            return 0;
        }     
    }

    getFlowChangeClass(){
        if ( this.props.spot.currentChange > 0) {
            return 'flow-positive';
        } else if ( this.props.spot.currentChange  < 0 ) {
            return 'flow-negative';
        } else {
            return 'flow-flat'
        }
    }

    getStatusIcon(){

        const status = getSpotStatus(this.props.spot);

        switch(status) {
            case 'spot-optimum' :
              return <img src={require("../../imgs/icon-ok-hand.svg").default} alt="Optimum Icon" />
            case 'spot-in':
              return <img src={require("../../imgs/icon-thumbs-up.svg").default} alt="Surfable Icon" />
            case 'spot-out':
                return <img src={require("../../imgs/icon-thumbs-down.svg").default} alt="Not Surfable Icon" />
            default:
              return "";
          }
    }

    render() {

        // destructures the surf spot object
        const {name = 'Unknown', currentValue = 0, min = 0, max = 0, unit = 'unk'} = this.props.spot;
        const flowChange = this.props.spot.currentChange;
        return (
            <div className='data-card-display'>
                <div className='status-icon'>
                    { this.getStatusIcon() }
                </div>
                {/* <DataCardGraph spot={this.props.spot}/> */}
                <h2>{ name }</h2>
                <div className='spot-values'>
                    <div>
                        <h3>{ `${ formatNumber(currentValue) } ${unit}` }</h3>
                        <h5 className={ this.getFlowChangeClass() }>
                            { `${ flowChange  > 0 ? "+" : "" }${ formatNumber(flowChange.toFixed(2)) }` }
                        </h5>
                    </div>
                    <h4>{ `range: ${ formatNumber(min) } - ${ formatNumber(max) } ${ unit }` }</h4>
                </div>

            </div>
        );
    }
 }

 DataCardDisplay.defaultProps = {
     spot:{}
}

export default DataCardDisplay;