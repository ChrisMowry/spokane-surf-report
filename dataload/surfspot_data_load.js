const Firestore = require('@google-cloud/firestore');


const db = new Firestore({
    projectId: 'spokane-surf',
    keyFilename: '../spokane-surf-b4752809a27e.json',
});

// define collection
let spots = db.collection('surf-spots')

// adds surf spots to Google firestore
let setSpots = spots.add(
    {"spots" : [{
        "spot_id": 1,
        "name":"Corbin",
        "desc":"",
        "kayakable":true,
        "boardable":true,
        "location":{"lat":47.704182,"lon":-116.9874425},
        "access_loc":{"lat":47.70435,"lon":-116.9884265},
        "min":17500,
        "max":24000,
        "site":12419000,
        "unit":"ft3/s"
    },
    {
        "spot_id": 2,
        "name":"Dead Dog",
        "desc":"",
        "kayakable":true,
        "boardable":false,
        "location":{"lat":47.6859465,"lon":-117.0445785},
        "access_loc":{"lat":47.699826,"lon":-117.0439355},
        "min":11000,
        "max":25000,
        "site":12419000,
        "unit":"ft3/s"
    },   
    {
        "spot_id": 3,
        "name":"Duplex",
        "desc":"",
        "kayakable":true,
        "boardable":false,
        "location":{"lat":47.673752,"lon":-117.1821145},
        "access_loc":{"lat":47.671522,"lon":-117.1812995},
        "min":6000,
        "max":9000,
        "site":12419000,
        "unit":"ft3/s"
    },
    {
        "spot_id": 4,
        "name":"Flower Power",
        "desc":"",
        "kayakable":true,
        "boardable":true,
        "location":{"lat":47.641002,"lon":-117.4448485},
        "access_loc":{"lat":47.640574,"lon":-117.4437135},
        "min":4.4,
        "max":4.7,
        "site":12424000,
        "unit":"ft"
    },
    {
        "spot_id": 5,
        "name":"Mini Climax",
        "desc":"",
        "kayakable":true,
        "boardable":true,
        "location":{"lat":47.676342,"lon":-117.1808905},
        "access_loc":{"lat":47.671522,"lon":-117.1812995},
        "min":5700,
        "max":7500,
        "site":12419000,
        "unit":"ft3/s"
    },
    {
        "spot_id": 6,
        "name":"Sullivan",
        "desc":"",
        "kayakable":true,
        "boardable":false,
        "location":{"lat":47.673758,"lon":-117.1819745},
        "access_loc":{"lat":47.671522,"lon":-117.1812995},
        "min":2600,
        "max":3400,
        "site":12419000,
        "unit":"ft3/s"
    },
    {
        "spot_id": 7,
        "name":"Trailer Park",
        "desc":"",
        "kayakable":true,
        "boardable":true,
        "location":{"lat":47.70945,"lon":-116.9673115},
        "access_loc":{"lat":47.71043,"lon":-116.9695835},
        "min":3500,
        "max":6500,
        "site":12419000,
        "unit":"ft3/s"
    },
    {
        "spot_id": 8,
        "name":"Zoo",
        "desc":"",
        "kayakable":true,
        "boardable":true,
        "location":{"lat":47.678954,"lon":-117.2108855},
        "access_loc":{"lat":47.681555,"lon":-117.2235425},
        "min":2400,
        "max":2750,
        "site":12419000,
        "unit":"ft3/s"
    }]}
).then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});