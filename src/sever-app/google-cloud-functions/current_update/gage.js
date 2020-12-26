/*
    File: gage.js
    Author: Chris Mowry
    Date: 12/12/2020
    Email: cmowry84@gmail.com
    Description:

        This is a class handles gage processes.
*/

// used for async API calls
const fetch = require('node-fetch');
const AbortController = require("abort-controller");
const Util = require("./util");

module.exports = class Gage {

    constructor(site, parameter){
        this.gage = site;
        this.parameter = parameter;
        this.base_url = 'https://waterservices.usgs.gov/nwis/iv/';
        this.format = 'format=json';
        this.siteStatus = 'siteStatus=all';
    }

    // Returns a url to get a specific date's data
    getDateUrl( year, month, day) {
        // builds variable strings
        let startDateString = `startDT=${year}-${Util.twoDigitInt(month)}-${Util.twoDigitInt(day)}`;
        let endDataString = `endDT=${year}-${Util.twoDigitInt(month)}-${Util.twoDigitInt(day)}`;
        let parameterString = `parameterCd=${this.parameter}`;
        let siteString = `sites=${this.gage}`

        // concatenates url parts 
        let url = `${this.base_url}?${this.format}`; // base url
        url = url + `&${siteString}`; // site code
        url = url + `&${startDateString}&${endDataString}`; // start and end dates
        url = url + `&${parameterString}`; // parameter codes
        url = url + `&${this.siteStatus}`; // site status

        // returns the url
        return url;
    }

    // Returns a url to fetch current data 
    getCurrentDayUrl(){
        // constants for the REST URL
        const period = 'period=P1D' // set to get the full day's data

        // builds variable strings
        let parameterString = `parameterCd=${this.parameter}`;
        let siteString = `sites=${this.gage}`

        // concatenates url parts 
        let url = `${this.base_url}?${this.format}`; // base url
        url = url + `&${siteString}`; // site code
        url = url + `&${period}`; // period of time code
        url = url + `&${parameterString}`; // parameter codes
        url = url + `&${this.siteStatus}`; // site status

        // returns the url
        return url;
    }

    // performs a API call but includes a timeout time
    async fetchTimeOut(url, options){
        const { timeout = 5000 } = options;
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, { ...options, signal: controller.signal} )
        clearTimeout();

        return response;  
    }

    // normalizes gage data 
    normalizeCurrentData(data){
        records = {};
        valueArray = [];
        let values = data.value.timeSeries[0].values[0].value;

        values.forEach((item) => {
            let timeValue = {};
            timeValue.value = item.value;
            timeValue.dateTime = item.dateTime;
            valueArray.push(timeValue);
        })

        records.values = valueArray;
    }

    // gets the max date from an array of objects
    getCurrentValue(values){
        let currentVal = values.sort((a,b) => 
            new Date(b.date).getTime() - new Date(a.date).getTime())[values.length - 1];
            
        return currentVal;
    }

    // gets the max value in a collecion of daily values
    getDailyMaxValue(values){
        return Math.max.apply(Math, values.map(record => parseInt(record.value)));
    }

    // gets the min value in a collection of daily values
    getDailyMinValue(values){
        return Math.min.apply(Math, values.map(record => parseInt(record.value)));
    }

    // gets the current day's values 
    async getCurrentDayValues(){
        const url = this.getCurrentDayUrl(this.parameter);
        let values = []
        // fetches data from the provided url
        try{
            const response = await this.fetchTimeOut(url, { timeout: 10000 });
            if (response.ok){
                const result = await response.json();
                const records = await result.value.timeSeries[0].values;
    
                // gets the current day values
                records[0].value.forEach((value)=>{
                    let timeValue = {};
                    timeValue.value = value.value;
                    timeValue.dateTime = value.dateTime;
                    values.push(timeValue);
                })
            }
        } catch(error){ console.log(error) }

        return values;
    }
}