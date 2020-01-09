const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sampleLink.firebaseio.com"
  });

let db = admin.firestore();

let spots = db.collection('surf-spots')

// adds surf spots to Google firestore
let setSpots = spots.add(
    {
        "spot_id": 1,
        "name":"Corbin",
        "location":{"lat":47.70021727910125,"lon":-116.97708380778425},
        "min":17500,
        "max":24000,
        "site":12419000,
        "unit":"ft3/s"
    },
    {
        "spot_id": 2,
        "name":"Dead Dog",
        "location":{"lat":47.69770807509211,"lon":-117.0434135627691},
        "min":11000,
        "max":25000,
        "site":12419000,
        "unit":"ft3/s"
    },   
    {
        "spot_id": 3,
        "name":"Duplex",
        "location":{"lat":47.67477353595273,"lon":-117.1781224579654},
        "min":6000,
        "max":9000,
        "site":12419000,
        "unit":"ft3/s"
    },
    {
        "spot_id": 4,
        "name":"Flower Power",
        "location":{"lat":47.65939132083675,"lon":-117.38654740670046},
        "min":4.4,
        "max":4.7,
        "site":12424000,
        "unit":"ft"
    },
    {
        "spot_id": 5,
        "name":"Mini Climax",
        "location":{"lat":47.67477353595273,"lon":-117.1781224579654},
        "min":5700,
        "max":7500,
        "site":12419000,
        "unit":"ft3/s"
    },
    {
        "spot_id": 6,
        "name":"Sullivan",
        "location":{"lat":47.67477353595273,"lon":-117.1781224579654},
        "min":2600,
        "max":3400,
        "site":12419000,
        "unit":"ft3/s"
    },
    {
        "spot_id": 7,
        "name":"Trailer Park",
        "location":{"lat":47.708462536926184,"lon":-116.9685738316694},
        "min":3500,
        "max":6500,
        "site":12419000,
        "unit":"ft3/s"
    },
    {
        "spot_id": 8,
        "name":"Zoo",
        "location":{"lat":47.67169970283049,"lon":-117.17658045912367},
        "min":2400,
        "max":2750,
        "site":12419000,
        "unit":"ft3/s"
    }
).then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});