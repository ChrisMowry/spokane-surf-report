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
import '../../style/datacard.scss'

 class DataCardGraph extends Component {

    // constructor(props) {
    //     super(props);
    // }

    getSpotStatus(){
        let value = this.props.spot.currentValue;
        let min = this.props.spot.min;
        let max = this.props.spot.max;
        let optMin = this.props.spot.optimumFlowLow_i;
        let optMax = this.props.spot.optimumFlowHigh_i;

        let status = value > min && value < max
                    ? value > optMin && value < optMax 
                        ? 'spot-optimum' 
                        : 'spot-in'
                    : 'spot-out';

        return status;
    }

    drawLineGraph(values, min, max){

        // set up graph size
        var svgWidth = 400;
        var svgHeight = 400;

        // gets the max value in the values object
        var maxDataValue = Math.max.apply( Math, values.map((record) => parseInt(record.value)));

        // Uses max value if larger than surf sport surfable max value
        var maxChartValue = maxDataValue > max ? maxDataValue : max

        var margin = { top: 0, right: 0, bottom: 0, left: 0 }
            ,width = svgWidth - margin.left - margin.right
            ,height = svgHeight - margin.top - margin.bottom;


        var data = values.map((value) => {
            return {
                value : parseInt(value.value),
                date : new Date(value.dateTime)
            }
        });

        // set the ranges
        var x = d3.scaleTime()
                .domain(d3.extent(data, (d) => { return d.date; }))
                .range([0, width]);

        var y = d3.scaleLinear()
                .domain([0, maxChartValue])
                .range([height, 0]);

        // append the svg obgect to the body of the page
        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        var svg = d3.select(`#card-display-graph-${this.props.spot.spot_id}`).append("svg")
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
        this.drawLineGraph(this.props.spot.values, this.props.spot.min, this.props.spot.max);
    }

    render() {

        // let length = this.props.spot.values.length;
        // let values = this.props.spot.values;

        return (

            <div id={`card-display-graph-${this.props.spot.spot_id}`} 
                className={`card-display-graph ${this.getSpotStatus()}`}>
                {
                    // length === 0 ||  values === undefined
                    // ? <img src={require("../../imgs/no-data.svg")} alt="No Data Icon" />
                    // : ""
                }
            </div>
            
            );
    }
 }


export default DataCardGraph;