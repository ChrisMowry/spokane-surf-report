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
import { formatNumber } from '../../resource/Util';
import '../../style/datacard-detail.scss'

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
    }

    render() {
        const { optimumFlowLow_i:optLow = 0, optimumFlowHigh_i:optHigh = 0 } = this.props.spotDetail;
        const { unit:optUnit = 'unk' } = this.props.spot;
        return (
            <div className='data-card-detail'>
                <div className='detail-header'>
                    <h4>{`optimum range: ${ formatNumber(optLow) } - ${ formatNumber(optHigh) } ${optUnit}`}</h4>
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
                        ? <DataCardDesc spotDetail={ this.props.spotDetail } spot={ this.props.spot } />
                        : <DataCardHistory spotDetail={ this.props.spotDetail }/>
                    }
                </div>
            </div>
        );
    }
 }

export default DataCardDetail;