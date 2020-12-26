/*
    File: util.js
    Author: Chris Mowry
    Date: 12/12/2020
    Email: cmowry84@gmail.com
    Description:

        This is a class handles misc helper functions.
*/


module.exports = class Util {

    // returns the number as a two digit string
    static twoDigitInt(number){
        return `${("0" + number).slice(-2)}`;
    }

    // removes duplicates from gage array
    static getUniqeGages(gages){
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


    static getMaxDateTimeValue(values){
        let maxVal = values.sort(
            (a,b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());
            
        return maxVal[0];
    }
}