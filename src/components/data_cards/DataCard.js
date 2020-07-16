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
import {properties} from '../../resource/Config';
import '../../style/datacard.scss'

 class DataCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            details:{}
        }
        this.onChangeExpand = this.onChangeExpand.bind(this);
    }

    async onChangeExpand(event){
        if(event.target.checked){
            fetch(process.env.PUBLIC_URL + properties.detail_url, {
                headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                 }})
            .then((response) => response.json())
            .then((spots) => {
                console.log(spots.find(spot => spot.spot_id === this.props.spot.spot_id));
                this.setState({
                    details : spots.find(spot => spot.spot_id === this.props.spot.spot_id)
                })
            })
        }
    }

    render() {
        return (
            <li className='data-card'>
                <input id={'detail-button-' + this.props.spot.spot_id}
                 className='detail-button'
                 type="checkbox"
                 onChange={this.onChangeExpand}
                 defaultChecked={false}
                 />
                <label htmlFor={'detail-button-' + this.props.spot.spot_id} className='detail-button-view'>
                    <DataCardDisplay spot={this.props.spot} />
                    <DataCardDetail spot={this.state.details} unit={this.props.spot.unit}/>
                </label>
            </li>
        );
    }
 }

 DataCard.defaultProps = {
    spot:{id:0}
 }

export default DataCard;