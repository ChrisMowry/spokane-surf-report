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
import '../../style/datacard-history.scss'

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
            "October",
            "November",
            "December",
        ]
    }

    isToday(month, day){

        let className = "not-today"
        const today = new Date();
        const todayMonth = today.getUTCMonth() + 1;
        const todayDay = today.getUTCDate();

        const monthNumber = this.months.indexOf(month) + 1;

        if(monthNumber === todayMonth && day === todayDay){
            className = "today"
        }

        return className;
    }

    getColorValue(month, day){
        const percent = this.getPercent(month, day);

        let breakpointClass = "";

        if (percent > 0.0 && percent <= 0.10){
            breakpointClass = "break-point-1";
        } else if (percent > 0.10 && percent - 0.25 < 0.001) {
            breakpointClass = "break-point-2";
        } else if (percent > 0.25 && percent - 0.5 < 0.001) {
            breakpointClass = "break-point-3";
        } else if (percent > 0.50 && percent - 0.75 < 0.001) {
            breakpointClass = "break-point-4";
        } else if (percent > 0.75) {
            breakpointClass = "break-point-5";
        }

        return breakpointClass;
    }

    getPercent(month, day){

        const monthNumber = this.months.indexOf(month) + 1;
        const { history = [] } = this.props.spot;
        const object = history.find((record) => record.month === monthNumber && record.day === day, {});

        return object === undefined ? 0 : object.percent;
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
                <h4>Daily Surf Probability</h4>
                <table className='legend'>
                    <thead>
                        <tr>
                            <th>&lt; 10%</th>
                            <th>10% - 25%</th>
                            <th>25% - 50%</th>
                            <th>50% - 75%</th>
                            <th>75% - 100%</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><div className='break-point-1'></div></td>
                            <td><div className='break-point-2'></div></td>
                            <td><div className='break-point-3'></div></td>
                            <td><div className='break-point-4'></div></td>
                            <td><div className='break-point-5'></div></td>
                        </tr>
                    </tbody>
                </table> 
                <div className='history-chart-container'>
                    <table className='history-chart'>
                        <thead>
                            <tr>
                                <th> </th>
                                {
                                    // maps the days of the month to the header row
                                    this.getDays().map(
                                        (day) => <th key={day} className={`day-${day}`}>{ day }</th>
                                    )
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                // maps the months and day cells
                                this.months.map(
                                    (month) => 
                                        <tr key={month}>
                                            <th className='label-col'>{ month }</th>
                                            {
                                                
                                                this.getDays().map(
                                                    (day) => 
                                                        <td key={day} className={this.isToday(month, day)}>
                                                            <div className={`day-${day} ${ this.getColorValue(month, day) }`}> </div>
                                                        </td>
                                                )
                                            }
                                        </tr>     
                                )
                            }
                        </tbody>
                    </table>   
                </div>
            </div>
        );
    }
 }

export default DataCardHistory;