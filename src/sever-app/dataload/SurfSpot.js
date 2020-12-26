/*
    File: SurfSpot.js
    Author: Chris Mowry
    Date: 12/12/2020
    Email: cmowry84@gmail.com
    Description:

        This is a class handles processes with surf spots.
*/

module.exports = class SurfSpot{
    
    constructor(spot){
        this.spot = spot;
    }

    // determines if the daily value falls in the site value
    isActive(dayMin, dayMax){
        if(dayMax - this.spot.min < 0.0 || dayMin - this.spot.max > 0.0){ return false; }
        else if( dayMin - this.spot.min >= 0.0 && dayMin - this.spot.max <= 0.0){ return true; }
        else if( dayMin - this.spot.min >= 0.0 && dayMax - this.spot.max <= 0.0){ return true; }
        else if( dayMin - this.spot.min <= 0.0 && dayMax - this.spot.max >= 0.0){ return true; }
        else if( dayMin - this.spot.min >= 0.0 && dayMax - this.spot.max <= 0.0){ return true; }
        else {return false;}
    }

    getCurrentValue(values){
        let maxVal = values.sort(
            (a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())[values.length - 1];
            
        return maxVal;
    }

    async getCurrentData(db){
        let values = [];
        await db.collection('gage-data')
                .doc(`${this.spot.site}`)
                .collection(this.spot.parameter)
                .doc('current-values').get()
                .then((doc) => {
                    if(doc.exists) {
                        values = doc.data().values
                    }
                })
        return values;
    }

    // gets the history of the site per parameter
    async getHistory(db){
        const values = await db.collection('gage-data')
        .doc(`${this.spot.site}`)
        .collection(this.spot.parameter)
        .doc('history')
        .collection('history')
        .get().then((querySnapshot) => {
            let historyValues = [];
            querySnapshot.forEach((doc) => {

                let activeCount = 0;
                const data = doc.data().values
                const totalDailyRecords = data.length;

                if(data){
                    data.forEach((record) => {
                        if (this.isActive(record.min, record.max)){ activeCount += 1; }
                    })
    
                    let historyRecord = this.parseMonthYear(doc.id);
                    historyRecord.value = activeCount/totalDailyRecords;
                    historyValues.push(historyRecord);
                }
            });
            return historyValues;
         });

        return values;
    }

    parseMonthYear(text){
        let value = {};
        let monthVal = parseInt(text.split('-')[0]);
        let dayVal = parseInt(text.split('-')[1]);

        value.month = monthVal;
        value.day = dayVal;

        return value;
    }
}