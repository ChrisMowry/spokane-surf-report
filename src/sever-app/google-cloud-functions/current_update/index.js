
const Gage = require('./gage');
const Util = require('./util');
const key = require('./key.json');

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp(key);


exports.updateCurrent = (event, context) => {

    db = admin.firestore();

    // updates gage readings
    console.log('Getting Surf Spots');
    db.collection('surf-spots').get()
    .then((querySnapshot) => {

        let gages = []
        let spots = []
        querySnapshot.forEach((doc) => {
            let spot = doc.data();

            // gets gages
            let gage = {};
            gage.site = spot.site;
            gage.parameter = spot.parameter;
            gages.push(gage);

            // adds surf spots to abbreviated object
            let surfSpot = {};
            surfSpot.name = spot.name;
            surfSpot.site = spot.site;
            surfSpot.parameter = spot.parameter;
            spots.push(surfSpot);
        })

        console.log('Getting unique gages and parameters')
        gages = Util.getUniqeGages(gages);
 
        // iterates through each gage, gets the current values, and writes to firestore.
        console.log('Updating gages');
        gages.forEach((gage) => {
            const site = new Gage(gage.site, gage.parameter);
            site.getCurrentDayValues()
            .then(async (result) => {
				
				if (Array.isArray(result) && result.length > 0){
					console.log(`Updating ${gage.site}`);

					// gets reference to gage document
					let gageRef = db.collection('gage-data')
									.doc(`${gage.site}`)
									.collection(gage.parameter)
									.doc('current-values');

					const recent = Util.getMaxDateTimeValue(result);
					console.log(`Recent: ${recent.value} ${recent.dateTime}`);

					// gets gage reading values filtered by an hour less than the most recent
					const hourLessValues = result.filter((value) => {
						let maxDateTime= new Date(recent.dateTime);
						let valTime = new Date( value.dateTime );
						let hourPrev = new Date(maxDateTime.setHours(maxDateTime.getHours() - 1 ));
						return valTime.getTime() <= hourPrev.getTime();
					});

					// gets the most recent of the filtered values
					const hourPreviousValue = Util.getMaxDateTimeValue(hourLessValues);
					
					// gets change in gage reading
					let change = 0
					if(typeof recent.value != 'undefined'){
						change = parseFloat(recent.value) - parseFloat(hourPreviousValue.value);
					}
					console.log(`Change: ${change}`);

					await gageRef.set({ values: result }, {merge: false});
					spots.forEach(async (location) => {
						if (location.site === gage.site && location.parameter == gage.parameter) {
							await db.collection('gage-data')
							.doc(`${location.site}`)
							.collection(location.parameter)
							.doc('current-values').get()
							.then(async (gageDoc) => {
								if(gageDoc.exists) {
									let values = gageDoc.data().values
				
									// adds current values to surf spot
									console.log(`Updating ${location.name}`);
									await db.collection('surf-spots')
										.doc(location.name)
										.set({
												values: values,
												currentValue: recent.value,
												currentValueTime: recent.dateTime,
												currentChange: change
										}, {merge: true})
								}
							})  
						}      
					});
				} else { console.log('gage data request failed'); }
            });
        });
    });
};
