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
            details : {}
        }

        this.onChangeExpand = this.onChangeExpand.bind(this);
    }

    fetchData(){
        fetch(properties.detail_url, {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }})
        .then((response) => response.json())
        .then((spots) => {
            this.setState({
                details : spots.find(spot => spot.spot_id === this.props.spot.spot_id)
            })
        })
    }

    async onChangeExpand(event){
        if(event.target.checked){
            this.fetchData();
        }
    }

    componentDidMount(){
        this.fetchData();
    }

    render() {
        return (
            <li className='data-card'>
                <input id={'detail-button-' + this.props.spot.spot_id}
                 className='detail-button'
                 type="checkbox"
                 onChange={this.onChangeExpand}
                 defaultChecked={ this.props.expanded } />
                    <label htmlFor={'detail-button-' + this.props.spot.spot_id} className='detail-button-view'>
                        <DataCardDisplay spot={this.props.spot} />
                        <DataCardDetail spotDetail={this.state.details} spot={this.props.spot}/>
                    </label>
            </li>
        );
    }
 }

 DataCard.defaultProps = {
    spot:{ spot_id : 0 }
 }

export default DataCard;