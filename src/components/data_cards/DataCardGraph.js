/*
    File: DataCardGraph.js
    Author: Chris Mowry
    Date: 05/16/2020
    Email: cmowry84@gmail.com
    Description:

        This component displays a svg graph of the flow over a given time for
        a given surf spot.
*/

import React, { Component } from 'react';
import '../../style/datacard.scss'

import GraphPlaceholder from '../../imgs/graph-placeholder.svg'
import NotGraphPlaceholder from '../../imgs/graph-placeholder-not-in.svg'

 class DataCardGraph extends Component {

    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <img src={this.props.surfable ? GraphPlaceholder : NotGraphPlaceholder} alt='flow graph' />
        );
    }
 }


export default DataCardGraph;