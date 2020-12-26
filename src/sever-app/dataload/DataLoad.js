/*
    File: DataLoad.js
    Author: Chris Mowry
    Date: 10/25/2020
    Email: cmowry84@gmail.com
    Description:

        This is a class handles the initial data load.
*/

const spots = require('../data/surf-spots.json'); // holds surf spot data
const Firestore = require('./Firestore'); // handles database calls
const Gage = require('./Gage'); // handles calls to USGS API

class DataLoad{

    constructor(spots){
        this.HISTORY_YEARS = 10;
        this.spots = spots;
        this.db = new Firestore();
    }

    loadSpots(spots){
        this.db.loadSpots(spots);
    }

    loadSpot(spot){
        this.db.loadSpot(spot);
    }

    getGages(spots){
        // maps the gages to an array
        let gages = spots.map((spot) => {
            let gage = {};
            gage.id = spot.site;
            gage.parameter = spot.parameter;

            return gage;
        })

        let uniqueGages = []; // holds only unique gages
        gages.forEach((gage)=>{
            let result = false;

            // checks to see if the gage is in the unique array
            uniqueGages.forEach((item) => {
                if ( gage.id === item.id && gage.parameter === item.parameter){
                    result = true;
                }
            })

            // if the gage doesn't exist in the unique array, add it
            if (!result){
                uniqueGages.push(gage);
            }
        });

        return uniqueGages;
    }

    buildGageHistoryTables(gages){
        gages.forEach( (gage) => {
            this.db.buildGageDocs(`${gage.id}`, gage.parameter);
        })
    }

    loadGageHistory(gages){
        for ( let month = 1; month <= 12; month++ ){
            gages.forEach( (gage) => {
                let site = new Gage(gage.id, gage.parameter);
                site.getMonthHistoryValues(month, this.HISTORY_YEARS)
                .then(async (result) => {
                    console.log( await JSON.stringify(result));
                    await this.db.loadGageMonthHistory(`${gage.id}`, gage.parameter, result);
                });
            })
        }
    }

    loadGageCurrentDay(gages){
        gages.forEach( (gage) => {
            let site = new Gage(gage.id, gage.parameter);
            site.getCurrentDayValues()
            .then(async (result) => {
                await this.db.loadCurrentDay(`${gage.id}`, gage.parameter, result);
            });
        })        
    }

    populateSpotHistory(spots){
        spots.forEach((spot) => {
            this.db.populateSpotHistory(spot)
        })
    }

    populateSpotValues(spots){
        spots.forEach((spot) => {
            this.db.populateSpotValues(spot)
        })        
    }

}

// creates the load object
var load = new DataLoad();
var gages = load.getGages(spots);

// builds gage data 
//load.buildGageHistoryTables(gages);
//load.loadGageCurrentDay(gages);
//load.loadGageHistory(gages);

// loads spot history & recent values
//load.loadSpots(spots);
//load.populateSpotValues(spots);
load.populateSpotHistory(spots);

//var newSpots = spots.slice(8, spots.length)
//load.loadSpots(newSpots);

//console.log(newSpots);



