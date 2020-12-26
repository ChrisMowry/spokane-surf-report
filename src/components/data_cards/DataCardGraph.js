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
import * as d3 from "d3";
import {getSpotStatus} from '../../resource/Util';

import '../../style/datacard.scss'

 class DataCardGraph extends Component {


    drawLineGraph(values, min, max){

        // set up graph size
        const svgWidth = 400;
        const svgHeight = 400;

        // gets the max value in the values object
        const maxDataValue = Math.max.apply( Math, values.map((record) => parseInt(record.value)));

        // Uses max value if larger than surf sport surfable max value
        const maxChartValue = maxDataValue > max ? maxDataValue : max

        const margin = { top: 0, right: 0, bottom: 0, left: 0 }
            ,width = svgWidth - margin.left - margin.right
            ,height = svgHeight - margin.top - margin.bottom;

        // normalizes the data for use in the graph
        const data = values.map((value) => {
            return {
                value : parseInt(value.value),
                date : new Date(value.dateTime)
            }
        });

        // set the ranges
        const x = d3.scaleTime()
                .domain(d3.extent(data, (d) => { return d.date; }))
                .range([0, width]);

        const y = d3.scaleLinear()
                .domain([0, maxChartValue])
                .range([height, 0]);

        // append the svg obgect to the body of the page
        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        const svg = d3.select(`#card-display-graph-${this.props.spot.spot_id}`).append("svg")
                    .attr("viewBox", `0 0 400 400`)
                    .append("g")
                    .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")");

        // Add the valueline path.
        svg.append("path")
            .datum(data)
            .attr("class", "area")
            .attr("stroke", "none")
            .attr("stroke-width", 0)
            .attr("d", d3.area()
                .x((d) => { return x(d.date) })
                .y0((d) => { return y(min)})
                .y1((d) => { return y(max)})
            )

        // Add the valueline path.
        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "white")
            .attr("stroke-width", 30)
            .attr("d", d3.line()
                .x((d) => { return x(d.date) })
                .y((d) => { return y(d.value) })
            )
    }

    componentDidMount() {
        // render the graph
        const {values, min, max } = this.props.spot;
        this.drawLineGraph( values, min, max );
    }

    render() {

        const { values = [] } = this.props.spot;
        const length = values.length;

        return (

            <div id={`card-display-graph-${this.props.spot.spot_id}`} 
                className={`card-display-graph ${getSpotStatus(this.props.spot)}`}>
                {
                    length === 0 || getSpotStatus(this.props.spot) === 'NoData'
                    ? <img src={require("../../imgs/icon-no-data.svg")} alt="No Data Icon" />
                    : ""
                }
            </div>
            
            );
    }
 }


export default DataCardGraph;