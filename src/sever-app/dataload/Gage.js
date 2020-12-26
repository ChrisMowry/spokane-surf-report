/*
    File: Gage.js
    Author: Chris Mowry
    Date: 12/12/2020
    Email: cmowry84@gmail.com
    Description:

        This is a class handles interactions with the USGS REST API.
*/

// used for async API calls
const fetch = require('node-fetch');
const AbortController = require("abort-controller");

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
        let startDateString = `startDT=${year}-${this.twoDigitInt(month)}-${this.twoDigitInt(day)}`;
        let endDataString = `endDT=${year}-${this.twoDigitInt(month)}-${this.twoDigitInt(day)}`;
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

    // returns the number as a two digit string
    twoDigitInt(number){
        return `${("0" + number).slice(-2)}`;
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

    buildHistoryDataModel(){
        let data = []; // holds data structure

        // builds data structure to hold data
        for ( let month = 1; month <= 12; month++){
            // 2020 used because it's a leap year.
            let lastDay = new Date(2020, month, 0)
            for (let day = 1; day <= lastDay; day++ ){
                let record = {};
                record.month = month;
                record.day = day;
                record.values = [];

                data.push(record);
            }
        }

        return data;
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
        return Math.max.apply(Math, values.map(record => parseFloat(record.value)));
    }

    // gets the min value in a collection of daily values
    getDailyMinValue(values){
        return Math.min.apply(Math, values.map(record => parseFloat(record.value)));
    }

    // gets the current day's values 
    async getCurrentDayValues(){
        const url = this.getCurrentDayUrl(this.parameter);
        let values = []
        // fetches data from the provided url
        try{
            const response = await fetch(url);//this.fetchTimeOut(url, { timeout: 10000 });
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

    // gets the min & max values for each day for the number of years provided.
    async getMonthHistoryValues(month, yearCount){

        // holds data for the given month for the given number of years
        let values = []; 
        let currentDate = new Date()
        let currentYear = currentDate.getFullYear();
        let currentMonth = currentDate.getMonth();
        let currentDay = currentDate.getDate();

        // creates object to hold monthly values
        let monthData = {};
        monthData.month = month;
        monthData.values = [];

        for ( let year = currentYear - yearCount; year <= currentYear; year++ ){
            let yearData = {};
            yearData.year = year;
            yearData.values = [];

            let lastDayOfMonth = new Date(year, month, 0).getDate();

            // loops through the days of the month
            for (let day = 1; day <= lastDayOfMonth; day ++) {

                if ( day >= currentDay && month >= currentMonth && year >= currentYear ) {
                    break;
                }

                // stores daily data
                let dayData = {}
                dayData.day = day;

                let url = this.getDateUrl(year, month, day);

                try{
                    console.log(url)
                    const response = await this.fetchTimeOut(url, { timeout: 10000 });
                    if ( response.ok ) {
                        try{
                            const result = await response.json();
                            const records = await result.value.timeSeries[0].values;
                            
                
                            let dailyValues = records[0].value;
                            let min = this.getDailyMinValue(dailyValues);
                            let max = this.getDailyMaxValue(dailyValues);
        
                            // sets the daily min and max values
                            dayData.min = min;
                            dayData.max = max;
                        } catch(error){ console.log(error) }
                    }

                } catch(error){ console.log(error) }

                yearData.values.push(dayData);
            }

            monthData.values.push(yearData);
            values.push(monthData);
        }

        return values;
    }
}

// var gageID = '12419000'
// var gageParameter = '00060'
// var gage = new Gage(gageID, gageParameter);

// (async() => {console.log(await gage.getCurrentDayValues())})()

// function b = 

// // //console.log(gage.fetchMonthValues(gageParameter, 12, 25))
// var b = (async () => {
//         return await gage.getMonthHistoryValues(12, 1)

//     )()

// console.log(b);
        



//console.log(gage.fetchCurrentDayValues())
// console.log(gage.getDateUrl( 2020, 1, 1))