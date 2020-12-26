/*
    File: Firestore.js
    Author: Chris Mowry
    Date: 10/25/2020
    Email: cmowry84@gmail.com
    Description:

        This is a class handles interactions with the Google Firestore.
*/

const { packSiblings } = require("d3");


// sets up environment variables for API keys, etc
require("dotenv").config();

// Required for side-effects
require("firebase/firestore");
const SurfSpot = require('./SurfSpot'); // handles calls to USGS API
// establishes firebase object
const firebase = require("firebase");

module.exports = class Firestore{

    // sets up class dependancies
    constructor(){

        // Initialize Cloud Firestore through Firebase
        firebase.initializeApp({
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            projectId: process.env.FIREBASE_PROJECT_ID
        });

        // sets up db object
        this.db = firebase.firestore();
    }

    // returns the number as a two digit string
    twoDigitInt(number){
        return `${("0" + number).slice(-2)}`;
    }

    // loads an individual spot to the Firestore
    async loadSpot(spot){

        spot.history = [];
        spot.values = [];
        spot.currentValue = 0;
        //spot.currentValueTime = null;

        let collection = this.db.collection("surf-spots");
        collection.doc(spot.name).set(spot, {merge: false});
    }

    // loads a collection of spots to the Firestore
    async loadSpots(spots){
        spots.forEach((spot) => {
            this.loadSpot(spot);
        });
    }

    async populateSpotHistory(spot){
        const surfSpot = new SurfSpot(spot);
        await surfSpot.getHistory(this.db)
        .then(async (historyVals) => {
            //console.log(historyVals);
            if(historyVals){
                await this.db.collection('surf-spots').doc(spot.name).set({ history: historyVals }, {merge: true})
            }
        })
    }

    async populateSpotValues(spot){
        const surfSpot = new SurfSpot(spot);
        await surfSpot.getCurrentData(this.db)
        .then((currentVals) => {

            // gets most recent value from daily values
            const recent = surfSpot.getCurrentValue(currentVals);

            // adds current values to surf spot
            this.db.collection('surf-spots')
                   .doc(spot.name)
                   .set({ 
                        values: currentVals,
                        currentValue: recent.value
                 }, {merge: true})

            // adds current value time to surf spot
            this.db.collection('surf-spots')
            .doc(spot.name)
            .set({ currentValueTime: recent.dateTime }, {merge: true});
        });
    }

    // checks if document exits in a collection.
    async docExists(docName, collection){
        let result = false;
        const query = await collection.get()
        if (!query.empty) {
            query.docs.forEach((doc) => {
                if(doc.id === docName){
                    result = true;
                }
            });
        } 

        return result;
    }

    // builds the document in Google Firestore to hold USGS gage data.
    buildGageDocs( gage, parameter ){
        // creates document to hold current gage data
        this.db.collection('gage-data')
               .doc(gage)
               .collection(parameter)
               .doc('current-values')
               .set({values : [] }, { merge : true })
               .then( ( ) => { console.log(`${gage} - ${parameter} written`); })
               .catch((error) => { console.log(`!!! Error writing ${gage} - ${parameter} !!!`); })
               
        // creates document to hold gage history
        for ( let month = 1; month <= 12; month++ ){

            // 2020 is used because it is a leap year.
            let lastDateOfMonth = new Date(2020, month, 0);

            for (let day = 1; day <= lastDateOfMonth.getDate(); day++ ){
                this.db.collection('gage-data')
                        .doc(gage)
                        .collection(parameter)
                        .doc('history')
                        .collection('history')
                        .doc(`${this.twoDigitInt(month)} - ${this.twoDigitInt(day)}`)
                        .set({values : [] }, { merge : true })
                        .then( ( ) => { console.log(`${month} - ${day} written`); })
                        .catch((error) => { 
                            console.log(`!!! Error writing ${this.twoDigitInt(month)} - ${this.twoDigitInt(day)} !!!`); 
                        })                
            }
        }
    }

    // loads the gage's current daily values
    loadGageCurrentDay( gage, parameter, values ){
        // gets a reference to the database
        let ref = this.db.collection('gage-data')
                            .doc(gage)
                            .collection(parameter)
                            .doc('current-values');
        
        // deletes former value
        ref.update({ values : firebase.firestore.FieldValue.delete() });
        
        values.forEach((value) => {
            // Updates the firestore database
            ref.update({values : firebase.firestore.FieldValue.arrayUnion({
                value: value.value,
                dateTime: value.dateTime
            })});
        });  

    }

    // loads the gage history
    loadGageMonthHistory( gage, parameter, values ){
        if(values){
            if(Array.isArray(values)){
                values.forEach((monthlyValue) => {
                    monthlyValue.values.forEach((yearlyValue) => {
                        yearlyValue.values.forEach(async (dailyValue) => {

                            // gets a reference to the database
                            let ref = this.db.collection('gage-data')
                                            .doc(gage)
                                            .collection(parameter)
                                            .doc('history')
                                            .collection('history')
                                            .doc(`${this.twoDigitInt(monthlyValue.month)} - ${this.twoDigitInt(dailyValue.day)}`)
                            
                            // deletes former value
                            //ref.update({values : firebase.firestore.FieldValue.delete() })
                            
                            // Updates the firestore database
                            if(yearlyValue.year && dailyValue.min && dailyValue.max){
                                await ref.update({values : firebase.firestore.FieldValue.arrayUnion({
                                                    year: yearlyValue.year,
                                                    min: dailyValue.min,
                                                    max: dailyValue.max
                                                })
                                });
                            }            
                        })
                    });
                });
            }
        } else{ console.log(`${gage} - ${parameter}: No values!`); }
    }
}
