/*
    File: DataCardDetail.js
    Author: Chris Mowry
    Date: 05/16/2020
    Email: cmowry84@gmail.com
    Description:

        This component displayes the detailed description and history. 
        This component is hidden and expands when the user clicks on the display.
*/

import React, { Component } from 'react';
import DataCardDesc from './DataCardDesc';
import DataCardHistory from './DataCardHistory';
import '../../style/datacard.scss'

 class DataCardDetail extends Component {

    constructor(props) {
        super(props);
        this.state={
            activeTab:'describe'
        }
        this.handleHeaderButtonClick = this.handleHeaderButtonClick.bind(this);
    }

    handleHeaderButtonClick(button){
        this.setState({ activeTab : button });
        this.forceUpdate();
    }

    render() {
        let optLow = this.props.spot.optimumFlowLow_i !== undefined ? this.props.spot.optimumFlowLow_i : 0;
        let optHigh = this.props.spot.optimumFlowHigh_i !== undefined ? this.props.spot.optimumFlowHigh_i : 0;
        let optUnit = this.props.unit !== undefined ? this.props.unit : 'unk';
        return (
            <div className='data-card-detail'>
                <div className='detail-header'>
                    <h4>{'optimum range: ' + optLow + ' - ' + optHigh + ' ' + optUnit}</h4>
                    <div className='tab-bar'>
                        <button 
                            className={this.state.activeTab === 'describe' ? 'tab-button active': 'tab-button'}
                            onClick={()=>this.handleHeaderButtonClick('describe')} >
                            Description
                        </button>
                        <button 
                            className={this.state.activeTab === 'history' ? 'tab-button active': 'tab-button'}
                            onClick={()=>this.handleHeaderButtonClick('history')} >
                            History
                        </button>
                    </div>
                </div>
                <div className='detail-content'>
                    {
                        this.state.activeTab === 'describe' 
                        ? <DataCardDesc />
                        : <DataCardHistory />
                    }
                </div>
            </div>
        );
    }
 }

export default DataCardDetail;