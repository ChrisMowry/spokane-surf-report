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
import '../../style/datacard.css'

 class DataCardDetail extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='data-card-detail'>
                this is some details and shit!
            </div>
        );
    }
 }

export default DataCardDetail;