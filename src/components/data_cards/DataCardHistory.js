/*
    File: DataCardHistory.js
    Author: Chris Mowry
    Date: 05/16/2020
    Email: cmowry84@gmail.com
    Description:

        This component displays a color coded calendar depicting the average percent 
        over a given time the a surf spot is at a surfable level.
*/

import React, { Component } from 'react';
import '../../style/datacard.scss'

 class DataCardHistory extends Component {

    // constructor(props) {
    //     super(props);
    // }

    render() {

        let date = new Date();
        date.setMonth(1)
        return (
            <div className='data-card-history'>
                <table>
                    <tr>
                        <th></th>
                        <th>J</th>
                        <th>F</th>
                        <th>M</th>
                        <th>A</th>
                        <th>M</th>
                        <th>J</th>
                        <th>J</th>
                        <th>A</th>
                        <th>S</th>
                        <th>O</th>
                        <th>N</th>
                        <th>D</th>
                    </tr>
                    {
                        //self.props.history.foreach()

                    }
                </table>
            </div>
        );
    }
 }

export default DataCardHistory;