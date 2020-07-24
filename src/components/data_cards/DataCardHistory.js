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

    constructor(props) {
        super(props);

        this.months = [
            "January",
            "Febuary",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "November",
            "December",
        ]
    }

    getColorValue(month, day){
        return "";
    }

    getDays(){
        let days = [];

        for (let i = 0; i < 31; i ++){
            days.push(i + 1);
        }

        return days;
    }

    render() {

        let date = new Date();
        date.setMonth(1)
        return (
            <div className='data-card-history'>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            {
                                this.months.map(
                                    (month) => <th><div>{month}</div></th>
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.getDays().map(
                                (day) => <tr>
                                            <td>{day}</td>
                                            {
                                                this.months.map(
                                                    (month) => <th className={this.getColorValue()}><div></div></th>
                                                )
                                            }
                                        </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
 }

export default DataCardHistory;